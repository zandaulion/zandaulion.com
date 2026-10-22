"""Check local links and the privacy URLs registered with Google Play.

Run: python scripts/check_site.py [--url http://127.0.0.1:8765]
"""
import argparse
import json
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit
from urllib.request import urlopen
from build_locales import LANGUAGES
from project_locales import PROJECTS, PATHS, FILES
from site_contracts import ORIGIN, PRIVACY_PATHS, PRIVACY_CANONICAL
from discovery import PageMetadata, SITEMAP_NS, XHTML_NS, social_images

ROOT = Path(__file__).resolve().parents[1]


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.targets = []
        self.ids = []
        self.lang = None
        self.direction = None
        self.canonicals = []
        self.alternates = {}
        self.meta = {}

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            key = attrs.get('property') or attrs.get('name')
            if key:
                self.meta.setdefault(key, []).append(attrs.get('content', ''))
        if tag == 'html':
            self.lang, self.direction = attrs.get('lang'), attrs.get('dir')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs.get('href'))
        if tag == 'link' and attrs.get('rel') == 'alternate':
            self.alternates[attrs.get('hreflang')] = attrs.get('href')
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for attr in ("href", "src"):
            if attr in attrs:
                self.targets.append(attrs[attr])
        if attrs.get('srcset'):
            self.targets.extend(candidate.strip().split()[0] for candidate in attrs['srcset'].split(','))


def check(base_url=None):
    errors = []
    images, dimensions = social_images(ROOT, FILES)
    sitemap_pages = {}
    social_count = 0
    pages = sorted(ROOT.glob("*.html"))
    for _, path, _, _ in LANGUAGES:
        if not path:
            continue
        localized = ROOT / path / 'index.html'
        if not localized.is_file():
            errors.append(f'Missing language homepage: /{path}/')
        else:
            pages.append(localized)
    for route in PRIVACY_PATHS:
        if not (ROOT / route).is_file():
            errors.append(f"Missing established privacy URL: /{route}")
            continue
        parser = Links()
        parser.feed((ROOT / route).read_text(encoding="utf-8"))
        # plate-privacy.html duplicates the Bitey notice; Search Console should index one URL.
        expected = ORIGIN + PRIVACY_CANONICAL.get(route, route)
        if parser.canonicals != [expected]:
            errors.append(f"{route}: canonical must be {expected}")
    for lang, filenames in PROJECTS.items():
        for filename in filenames:
            page = ROOT / PATHS[lang] / filename
            if page.is_file():
                pages.append(page)
            else:
                errors.append(f'Missing translated project: {lang}/{filename}')
    for page in pages:
        parser = Links()
        content = page.read_text(encoding="utf-8")
        parser.feed(content)
        if page.name in FILES or page.name == 'index.html':
            social_count += 1
            lang = next((lang for lang, path in PATHS.items() if path and page.parent == ROOT / path), 'en-US')
            image = images['home'] if page.name == 'index.html' else images['projects'][page.name]
            meta = PageMetadata(content)
            if page.name == 'index.html':
                catalog = json.loads((ROOT / f'locales/{lang}.json').read_text(encoding='utf-8'))
                title, description = 'Zandaulion — ' + catalog['title'], catalog['social']
            else:
                title, description = ' '.join(meta.title.split()) + ' — Zandaulion', meta.description
            image_url = ORIGIN + quote(image, safe='/')
            expected_social = {
                'og:site_name': 'Zandaulion', 'og:type': 'website', 'og:title': title,
                'og:description': description, 'og:url': meta.canonical, 'og:image': image_url,
                'og:image:type': 'image/jpeg' if image.endswith(('.jpg', '.jpeg')) else 'image/png',
                'og:image:width': str(dimensions[image][0]), 'og:image:height': str(dimensions[image][1]),
                'og:image:alt': title, 'twitter:card': 'summary_large_image',
                'twitter:title': title, 'twitter:description': description,
                'twitter:image': image_url, 'twitter:image:alt': title,
            }
            for key, value in expected_social.items():
                if not value or parser.meta.get(key) != [value]:
                    errors.append(f'{page.relative_to(ROOT)}: incorrect or duplicate {key}')
            sitemap_pages[meta.canonical] = meta.alternates
        if page.name in PRIVACY_PATHS:
            sitemap_pages[parser.canonicals[0]] = {}
        if page.name in FILES:
            expected_lang = next((lang for lang, path in PATHS.items() if path and page.parent == ROOT / path), 'en-US')
            expected_canonical = ORIGIN + page.relative_to(ROOT).as_posix()
            expected_alternates = {lang: ORIGIN + (path + '/' if path else '') + page.name for lang, path in PATHS.items()}
            expected_alternates['x-default'] = ORIGIN + page.name
            if parser.lang != expected_lang or parser.canonicals != [expected_canonical] or parser.alternates != expected_alternates:
                errors.append(f'{page.relative_to(ROOT)}: incorrect language or reciprocal SEO links')
            if expected_lang == 'ar' and parser.direction != 'rtl':
                errors.append(f'{page.relative_to(ROOT)}: Arabic page must use RTL layout')
        if page.name == '404.html':
            if parser.meta.get('robots') != ['noindex, follow'] or parser.canonicals:
                errors.append('404.html: must be noindex and have no canonical URL')
            if any(target.startswith(('../', 'assets/')) for target in parser.targets):
                errors.append('404.html: assets must work at nested missing URLs')
        # Published vendor-generated notice markup is intentionally preserved.
        if page.name not in PRIVACY_PATHS and len(parser.ids) != len(set(parser.ids)):
            errors.append(f"{page.name}: duplicate element IDs")
        for target in parser.targets:
            url = urlsplit(target)
            if url.scheme or url.netloc or not url.path:
                continue
            resolved = (ROOT if url.path.startswith('/') else page.parent) / unquote(url.path.lstrip("/"))
            if resolved.is_dir():
                errors.append(f"{page.relative_to(ROOT)}: link opens a folder from disk; use index.html: {target}")
                resolved = resolved / 'index.html'
            if not resolved.exists():
                errors.append(f"{page.name}: missing target {target}")
        if base_url:
            try:
                route = page.relative_to(ROOT).as_posix()
                with urlopen(base_url.rstrip("/") + "/" + route, timeout=10) as response:
                    content = response.read()
                    if response.status != 200:
                        errors.append(f"{page.name}: HTTP {response.status}")
                    if page.name in PRIVACY_PATHS and content != page.read_bytes():
                        errors.append(f"{page.name}: served notice differs from the local file")
            except Exception as exc:
                errors.append(f"{page.name}: {exc}")
    sitemap = ET.parse(ROOT / 'sitemap.xml').getroot()
    found = {}
    for node in sitemap.findall(f'{{{SITEMAP_NS}}}url'):
        location = node.findtext(f'{{{SITEMAP_NS}}}loc')
        if location in found:
            errors.append(f'Duplicate sitemap URL: {location}')
        found[location] = {link.attrib['hreflang']: link.attrib['href'] for link in node.findall(f'{{{XHTML_NS}}}link')}
    if found != sitemap_pages:
        errors.append('Sitemap must contain exactly the canonical pages with matching language alternates')
    expected_robots = f'User-agent: *\nAllow: /\n\nSitemap: {ORIGIN}sitemap.xml\n'
    if (ROOT / 'robots.txt').read_text(encoding='utf-8') != expected_robots:
        errors.append('robots.txt must allow crawling and point to the public sitemap')
    if base_url:
        for filename in ('sitemap.xml', 'robots.txt'):
            with urlopen(base_url.rstrip('/') + '/' + filename, timeout=10) as response:
                if response.status != 200 or response.read() != (ROOT / filename).read_bytes():
                    errors.append(f'{filename}: served discovery file differs from source')
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {len(pages)} pages, local links, and all {len(PRIVACY_PATHS)} established privacy paths.")
    print(f'PASS: sharing metadata for {social_count} pages; {len(found)} canonical sitemap URLs and robots.txt.')
    if base_url:
        print("PASS: all pages return HTTP 200; served privacy notices match their source files.")


if __name__ == "__main__":
    args = argparse.ArgumentParser(description=__doc__)
    args.add_argument("--url", help="Optional running preview URL")
    check(args.parse_args().url)
