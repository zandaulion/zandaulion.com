"""Guard crawl URLs, localized sharing text, and canonical alias handling."""
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import xml.etree.ElementTree as ET
from discovery import PageMetadata, SITEMAP_NS, XHTML_NS, discovery_outputs, project_social, social_tags
from check_site import Links


class DiscoveryTests(unittest.TestCase):
    def test_social_text_is_escaped_but_remains_readable_to_crawlers(self):
        parser = Links()
        parser.feed(social_tags('A & B "demo"', 'Idei <curioase> — 日本語',
                               'https://example.invalid/demo.html', 'assets/Demo art/card.jpg', (1200, 630)))
        self.assertEqual(parser.meta['og:title'], ['A & B "demo"'])
        self.assertEqual(parser.meta['og:description'], ['Idei <curioase> — 日本語'])
        self.assertEqual(parser.meta['og:image'], ['https://zandaulion.com/assets/Demo%20art/card.jpg'])
        self.assertEqual(parser.meta['og:image:width'], ['1200'])

    def test_project_metadata_uses_translated_content_and_canonical(self):
        source = ('<html lang="ro"><head><meta name="description" content="Unelte pentru idei.">'
                  '<link rel="canonical" href="https://zandaulion.com/ro/demo.html"></head>'
                  '<body><h1>Idei &amp; unelte</h1></body></html>')
        parser = Links()
        parser.feed(project_social(source, 'assets/demo.png', (1200, 630)))
        self.assertEqual(parser.meta['og:title'], ['Idei & unelte — Zandaulion'])
        self.assertEqual(parser.meta['twitter:description'], ['Unelte pentru idei.'])
        self.assertEqual(parser.meta['og:url'], ['https://zandaulion.com/ro/demo.html'])

    def test_sitemap_deduplicates_aliases_and_keeps_language_links(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            policy = '<link rel="canonical" href="https://zandaulion.com/policy.html">'
            (root / 'policy.html').write_text(policy)
            (root / 'old-policy.html').write_text(policy)
            content = ('<link rel="canonical" href="https://zandaulion.com/ro/">'
                       '<link rel="alternate" hreflang="ro" href="https://zandaulion.com/ro/">')
            with patch('discovery.PRIVACY_PATHS', ('policy.html', 'old-policy.html')):
                outputs = discovery_outputs(root, {root / 'ro/index.html': content, root / '404.html': '<h1>Error</h1>'})
            nodes = ET.fromstring(outputs[root / 'sitemap.xml']).findall(f'{{{SITEMAP_NS}}}url')
            self.assertEqual([node.findtext(f'{{{SITEMAP_NS}}}loc') for node in nodes],
                             ['https://zandaulion.com/policy.html', 'https://zandaulion.com/ro/'])
            alternate = nodes[1].find(f'{{{XHTML_NS}}}link')
            self.assertEqual(alternate.attrib, {'rel': 'alternate', 'hreflang': 'ro', 'href': 'https://zandaulion.com/ro/'})
            self.assertNotIn('lastmod', outputs[root / 'sitemap.xml'])

    def test_missing_description_cannot_silently_publish_an_empty_preview(self):
        with self.assertRaisesRegex(ValueError, 'requires title and description'):
            social_tags('Demo', '', 'https://example.invalid/', 'assets/demo.png', (1200, 630))
