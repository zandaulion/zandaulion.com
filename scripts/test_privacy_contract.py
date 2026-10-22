"""The protected notices and legacy assets must not drift during site changes."""
import hashlib
import json
from pathlib import Path
import tempfile
import unittest
from site_contracts import PRIVACY_PATHS, verify_privacy_assets


class PrivacyContractTests(unittest.TestCase):
    def fixture(self, root):
        (root / 'scripts').mkdir()
        hashes = {}
        for filename in [*PRIVACY_PATHS, 'index.css', 'main.js']:
            content = b'Synthetic policy or shared asset fixture.\n'
            (root / filename).write_bytes(content)
            hashes[filename] = hashlib.sha256(content).hexdigest()
        (root / 'scripts/privacy_hashes.json').write_text(json.dumps(hashes))

    def test_content_changes_in_notices_or_shared_assets_are_rejected(self):
        for filename in ['plate-privacy.html', 'index.css', 'main.js']:
            with self.subTest(filename=filename), tempfile.TemporaryDirectory() as folder:
                root = Path(folder)
                self.fixture(root)
                verify_privacy_assets(root)
                (root / filename).write_text('Changed synthetic content.')
                with self.assertRaisesRegex(ValueError, 'Preserved privacy asset changed'):
                    verify_privacy_assets(root)

    def test_the_old_plate_route_cannot_be_removed(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            self.fixture(root)
            (root / 'plate-privacy.html').unlink()
            with self.assertRaisesRegex(ValueError, 'plate-privacy.html'):
                verify_privacy_assets(root)
