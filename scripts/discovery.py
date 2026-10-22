"""Generate sharing metadata and crawl discovery from the same published pages."""
import hashlib
import json
import re
import struct
import xml.etree.ElementTree as ET
from html import escape
from html.parser import HTMLParser
from urllib.parse import quote
from site_contracts import ORIGIN, PRIVACY_PATHS

SOCIAL_BLOCK = re.compile(r'\s*<!-- social:start -->.*?<!-- social:end -->', re.S)
SITEMAP_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9'
XHTML_NS = 'http://www.w3.org/1999/xhtml'


class PageMetadata(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.title = ''
        self.description = ''
        self.canonical = ''
        self.alternates = {}
        self.in_heading = False
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1':
            self.in_heading = True
        if tag == 'meta' and attrs.get('name') == 'description':
            self.description = attrs.get('content', '')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs['href']
        if tag == 'link' and attrs.get('rel') == 'alternate' and attrs.get('hreflang'):
            self.alternates[attrs['hreflang']] = attrs['href']

    def handle_endtag(self, tag):
        if tag == 'h1':
            self.in_heading = False

    def handle_data(self, text):
        if self.in_heading:
            self.title += text


def social_images(root, filenames):
    """Verify image configuration without installing an image library in CI."""
    config = json.loads((root / 'scripts/social_images.json').read_text(encoding='utf-8'))
    if set(config['projects']) != set(filenames):
        raise ValueError('Every project must have exactly one social image in scripts/social_images.json')
    sources = json.loads((root / 'assets/optimized/manifest.json').read_text(encoding='utf-8'))['sources']
    images = {path: (record['width'], record['height']) for path, record in sources.items()}
    for record in config['generated']:
        source, output = (root / record[key] for key in ('source', 'output'))
        if hashlib.sha256(source.read_bytes()).hexdigest() != record.get('source_sha256'):
            raise ValueError(f'Render changed social image source: {record["source"]}')
        data = output.read_bytes()
        if hashlib.sha256(data).hexdigest() != record.get('sha256'):
            raise ValueError(f'Render changed social image: {record["output"]}')
        if data[:8] != b'\x89PNG\r\n\x1a\n' or struct.unpack('>II', data[16:24]) != (1200, 630):
            raise ValueError(f'Social PNG must be 1200 × 630: {record["output"]}')
        images[record['output']] = (1200, 630)
    for path in {config['home'], *config['projects'].values()}:
        if path not in images or not (root / path).is_file():
            raise ValueError(f'Missing social image or dimensions: {path}')
        if not path.endswith(('.png', '.jpg', '.jpeg')):
            raise ValueError(f'Use a PNG/JPEG social image: {path}')
    return config, images


def social_tags(title, description, canonical, image, dimensions, image_alt=None):
    title, description = title.strip(), description.strip()
    if not title or not description:
        raise ValueError(f'Sharing metadata requires title and description: {canonical}')
    width, height = dimensions
    image_url = ORIGIN + quote(image, safe='/')
    content_type = 'image/jpeg' if image.endswith(('.jpg', '.jpeg')) else 'image/png'
    values = (
        ('property', 'og:site_name', 'Zandaulion'),
        ('property', 'og:type', 'website'),
        ('property', 'og:title', title),
        ('property', 'og:description', description),
        ('property', 'og:url', canonical),
        ('property', 'og:image', image_url),
        ('property', 'og:image:type', content_type),
        ('property', 'og:image:width', str(width)),
        ('property', 'og:image:height', str(height)),
        ('property', 'og:image:alt', image_alt or title),
        ('name', 'twitter:card', 'summary_large_image'),
        ('name', 'twitter:title', title),
        ('name', 'twitter:description', description),
        ('name', 'twitter:image', image_url),
        ('name', 'twitter:image:alt', image_alt or title),
    )
    return ('\n    <!-- social:start -->\n' + '\n'.join(
        f'    <meta {attr}="{key}" content="{escape(value, quote=True)}">' for attr, key, value in values
    ) + '\n    <!-- social:end -->')


def project_social(source, image, dimensions):
    metadata = PageMetadata(source)
    title = ' '.join(metadata.title.split()) + ' — Zandaulion'
    return source.replace('</head>', social_tags(title, metadata.description, metadata.canonical, image, dimensions) + '\n</head>')


def discovery_outputs(root, pages):
    """Index canonical content once; preserve the existing HTML language contract."""
    ET.register_namespace('', SITEMAP_NS)
    ET.register_namespace('xhtml', XHTML_NS)
    urlset = ET.Element(f'{{{SITEMAP_NS}}}urlset')
    canonical_pages = {}
    candidates = [content for path, content in pages.items() if path.suffix == '.html' and path.name != '404.html']
    candidates += [(root / filename).read_text(encoding='utf-8') for filename in PRIVACY_PATHS]
    for content in candidates:
        metadata = PageMetadata(content)
        if not metadata.canonical.startswith(ORIGIN):
            raise ValueError('Missing site canonical in sitemap source')
        previous = canonical_pages.get(metadata.canonical)
        if previous and previous.alternates != metadata.alternates:
            raise ValueError(f'Conflicting canonical metadata: {metadata.canonical}')
        canonical_pages[metadata.canonical] = metadata
    for canonical, metadata in sorted(canonical_pages.items()):
        node = ET.SubElement(urlset, f'{{{SITEMAP_NS}}}url')
        ET.SubElement(node, f'{{{SITEMAP_NS}}}loc').text = canonical
        for lang, href in metadata.alternates.items():
            ET.SubElement(node, f'{{{XHTML_NS}}}link', rel='alternate', hreflang=lang, href=href)
    # No invented lastmod dates or duplicate index.html/redirect/error routes.
    ET.indent(urlset, space='  ')
    sitemap = ET.tostring(urlset, encoding='utf-8', xml_declaration=True).decode('utf-8') + '\n'
    robots = f'User-agent: *\nAllow: /\n\nSitemap: {ORIGIN}sitemap.xml\n'
    return {root / 'sitemap.xml': sitemap, root / 'robots.txt': robots}
