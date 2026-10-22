"""Published origin and privacy routes; keep existing app-policy URLs stable."""
ORIGIN = 'https://zandaulion.com/'
PRIVACY_PATHS = (
    'bitey-privacy.html',
    'bpdigitizer-privacy.html',
    'gravitygarden-privacy.html',
    'gravitytdg-privacy.html',
    'gravitywarp-privacy.html',
    'miscare-privacy.html',
    'omaha-privacy.html',
    'orbitpuzzles-privacy.html',
    'palebluedot-privacy.html',
    'plate-privacy.html',
)
PRIVACY_CANONICAL = {'plate-privacy.html': 'bitey-privacy.html'}


def verify_privacy_assets(root):
    """Flag unplanned edits to published notices and their original shared assets."""
    import hashlib
    import json
    hashes = json.loads((root / 'scripts/privacy_hashes.json').read_text(encoding='utf-8'))
    if set(hashes) != {*PRIVACY_PATHS, 'index.css', 'main.js'}:
        raise ValueError('Privacy baseline must cover every original notice and its shared assets')
    for filename, expected in hashes.items():
        source = root / filename
        if not source.is_file() or hashlib.sha256(source.read_bytes()).hexdigest() != expected:
            raise ValueError(f'Preserved privacy asset changed: {filename}')
