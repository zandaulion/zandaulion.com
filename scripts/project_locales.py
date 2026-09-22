"""Render translated project pages from the English source and reviewed catalogs."""
import json
import re
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlsplit
from site_locales import LANGUAGES

FILES = ('admitere.html', 'bpdigitizer.html', 'faceslice.html', 'gravitygarden.html',
         'gravitytdg.html', 'gravitywarp.html', 'intarzieri.html', 'kerfloom.html',
         'magpie.html', 'miscare.html', 'olxdeals.html', 'omaha.html', 'orbitpuzzles.html',
         'palebluedot.html', 'plate.html', 'pwainvite.html', 'pwakit.html', 'sankey.html',
         'spendosaurus.html', 'thermostat.html')
PROJECTS = {lang: FILES for lang, path, _, _ in LANGUAGES if path}
PATHS = {lang: path for lang, path, _, _ in LANGUAGES}
BRANDS = {'Zandaulion', 'Admitere Liceu Kit', 'BP Digitizer', 'Faceslice', 'Gravity Garden',
          'GravityTDG', 'Gravity Warp', 'Întârzieri Tren', 'Kerfloom', 'Magpie', 'Mișcare',
          'OLX Deals', 'Omaha', 'OrbitPuzzles', 'Pale Blue Dot', 'Bitey', 'PWA Invite',
          'PWA Kit', 'Sankey', 'Spendosaurus', 'Thermostat', 'PWAInvite', 'PWAKit'}
BRANDS.update({'Intârzieri Tren', 'OLX Deal Finder', 'Pocket Omaha', 'PWA Invite Console',
               'pwa-kit', 'Thermostat Monitor'})
UI = {
    'explore': 'Keep exploring', 'viewer': 'Project image viewer',
    'closeLabel': 'Close image viewer', 'close': 'Close ×',
    'previousLabel': 'Previous image', 'previous': '← Previous',
    'nextLabel': 'Next image', 'next': 'Next →',
    'count': 'Image {n} of {total}', 'enlarge': 'Enlarge', 'image': 'Image',
}
SANKEY = (
    'Source Node', 'Target Node', 'Edit Node', 'Remove Node', 'Edit Link', 'Remove Link',
    'Add Node', 'Add Link', 'Update', 'Node name already exists!', 'Node already exists!',
    'Please fill out source, target, and value.', 'Source and target cannot be the same node.',
    'This link already exists. Please edit the existing one or choose a different source/target.',
    'Sankey diagram imported successfully!', 'Invalid JSON format. Expected { nodes: [], links: [] }',
    'Error parsing JSON file.', 'Would you like to export your work to JSON before resetting?',
    'Data exported! Are you sure you want to completely clear the diagram now?',
    'Are you sure you want to completely reset the diagram? This cannot be undone.',
)
ORIGIN = 'https://zandaulion.com/'
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
BLOCK = re.compile(r'\s*<!-- project-locales:start -->.*?<!-- project-locales:end -->', re.S)


def seo(filename, lang):
    route = filename if lang == 'en-US' else f'{PATHS[lang]}/{filename}'
    alternates = ''.join(f'    <link rel="alternate" hreflang="{code}" href="{ORIGIN}{path + "/" if path else ""}{filename}">\n'
                         for code, path, _, _ in LANGUAGES)
    return ('\n    <!-- project-locales:start -->\n'
            f'    <link rel="canonical" href="{ORIGIN}{route}">\n'
            f'{alternates}'
            f'    <link rel="alternate" hreflang="x-default" href="{ORIGIN}{filename}">\n'
            '    <!-- project-locales:end -->')


class ProjectTranslator(HTMLParser):
    def __init__(self, translations, lang, filename):
        super().__init__(convert_charrefs=True)
        self.translations, self.lang, self.filename = translations, lang, filename
        self.output, self.stack = [], []
        self.english_link = False

    def translate(self, text):
        key = text.strip()
        if not key or not any(char.isalpha() for char in key) or key in BRANDS:
            return text
        if key not in self.translations:
            raise ValueError(f'{self.lang}/{self.filename}: missing translation: {key}')
        return text[:len(text) - len(text.lstrip())] + self.translations[key] + text[len(text.rstrip()):]

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == 'html':
            attrs = [(key, value) for key, value in attrs if key != 'dir'] + [('dir', 'rtl' if self.lang == 'ar' else 'ltr')]
        if tag == 'a':
            url = urlsplit(values.get('href', ''))
            local_page = not url.scheme and not url.netloc and url.path.endswith('.html')
            if local_page:
                target_lang = self.lang if url.path == 'index.html' or url.path in PROJECTS[self.lang] else 'en-US'
                attrs = [(key, value) for key, value in attrs if key != 'hreflang'] + [('hreflang', target_lang)]
                self.english_link = target_lang == 'en-US' and 'article' in self.stack
        result = []
        for key, value in attrs:
            if tag == 'html' and key == 'lang':
                value = self.lang
            elif key in ('alt', 'title', 'aria-label', 'placeholder') or (tag == 'meta' and values.get('name') == 'description' and key == 'content'):
                value = self.translate(value)
            elif key in ('href', 'src') and value:
                url = urlsplit(value)
                if not url.scheme and not url.netloc and url.path:
                    if url.path != 'index.html' and url.path not in PROJECTS[self.lang]:
                        value = '../' + value
            result.append(key if value is None else f'{key}="{escape(value, quote=True)}"')
        self.output.append('<' + tag + (' ' + ' '.join(result) if result else '') + '>')
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag == 'a' and self.english_link:
            self.output.append(f'<small>{escape(self.translate("Page in English"))}</small>')
            self.english_link = False
        self.output.append(f'</{tag}>')
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()

    def handle_data(self, text):
        if any(tag in self.stack for tag in ('script', 'style')):
            self.output.append(text)
        else:
            translated = text if 'code' in self.stack else self.translate(text)
            self.output.append(escape(translated, quote=False))

    def handle_comment(self, text):
        self.output.append(f'<!--{text}-->')

    def handle_decl(self, decl):
        self.output.append(f'<!{decl}>')


def project_strings(root, filename):
    """Extract exactly the same visible strings the renderer requires."""
    class Collector(ProjectTranslator):
        def translate(self, text):
            key = text.strip()
            if key and any(char.isalpha() for char in key) and key not in BRANDS:
                self.translations[key] = key
            return text
    parser = Collector({}, 'ro', filename)
    parser.feed(BLOCK.sub('', (root / filename).read_text(encoding='utf-8')))
    return parser.translations


def project_outputs(root):
    outputs = {}
    english = json.loads((root / 'locales/en-US.json').read_text(encoding='utf-8'))
    for lang, filenames in PROJECTS.items():
        catalog = json.loads((root / f'locales/{lang}.json').read_text(encoding='utf-8'))
        common = {value: catalog[key] for key, value in english.items()}
        common.update(json.loads((root / f'locales/projects/{lang}/common.json').read_text(encoding='utf-8')))
        for filename in filenames:
            translations = dict(common)
            translations.update(json.loads((root / f'locales/projects/{lang}/{filename[:-5]}.json').read_text(encoding='utf-8')))
            if any(not isinstance(value, str) or not value.strip() for value in translations.values()):
                raise ValueError(f'{lang}/{filename}: translations must be non-empty strings')
            source = BLOCK.sub('', (root / filename).read_text(encoding='utf-8'))
            # Earlier English pages may already have a standalone canonical.
            source = re.sub(r'^[ \t]*<link rel="canonical"[^>]*>\s*\n', '', source, flags=re.M)
            outputs[root / filename] = source.replace('</head>', seo(filename, 'en-US') + '\n</head>').rstrip() + '\n'
            parser = ProjectTranslator(translations, lang, filename)
            parser.feed(source)
            output = ''.join(parser.output).replace('</head>', seo(filename, lang) + '\n</head>')
            outputs[root / PATHS[lang] / filename] = output.rstrip() + '\n'
    return outputs
