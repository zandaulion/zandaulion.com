"""Guard responsive image URLs when project pages are translated and checked."""
import unittest
from check_site import Links
from project_locales import ProjectTranslator


class ResponsiveImages(unittest.TestCase):
    def test_localized_project_candidates_keep_their_widths(self):
        parser = ProjectTranslator({}, 'ro', 'hearth.html')
        parser.feed('<img src="assets/optimized/card-640.webp" '
                    'srcset="assets/optimized/card-320.webp 320w, assets/optimized/card-640.webp 640w">')
        output = ''.join(parser.output)
        self.assertIn('src="../assets/optimized/card-640.webp"', output)
        self.assertIn('srcset="../assets/optimized/card-320.webp 320w, ../assets/optimized/card-640.webp 640w"', output)

    def test_absolute_candidates_keep_their_origin(self):
        parser = ProjectTranslator({}, 'ar', 'hearth.html')
        parser.feed('<img srcset="https://example.invalid/card.webp 640w, /assets/card.webp 1280w">')
        self.assertIn('srcset="https://example.invalid/card.webp 640w, /assets/card.webp 1280w"', ''.join(parser.output))

    def test_site_checker_visits_every_candidate(self):
        parser = Links()
        parser.feed('<img src="fallback.webp" srcset="small.webp 320w, large.webp 640w">')
        self.assertEqual(parser.targets, ['fallback.webp', 'small.webp', 'large.webp'])


if __name__ == '__main__':
    unittest.main()
