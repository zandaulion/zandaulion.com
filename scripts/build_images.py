"""Build responsive variants with optional Pillow; --check uses only the standard library."""
import argparse
import hashlib
import io
import json
import re
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = 'assets/optimized/manifest.json'


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def asset(relative):
    path = PurePosixPath(relative)
    if path.is_absolute() or '..' in path.parts or not path.parts or path.parts[0] != 'assets':
        raise ValueError(f'Expected a relative asset path: {relative}')
    return ROOT / relative


def check(config):
    path = ROOT / MANIFEST
    if not path.is_file():
        raise SystemExit('Missing image manifest; run scripts/build_images.py')
    manifest = json.loads(path.read_text(encoding='utf-8'))
    if manifest['config'] != config:
        raise SystemExit('Image configuration changed; rebuild responsive images')
    expected = set(config['images']) | {config['logo']}
    if set(manifest['sources']) != expected:
        raise SystemExit('Image manifest does not match the configured sources')
    count = 0
    for source, record in manifest['sources'].items():
        if digest(asset(source)) != record['sha256']:
            raise SystemExit(f'Image source changed; rebuild responsive images: {source}')
        for variant in record['variants']:
            output = asset(variant['path'])
            if not output.is_file() or digest(output) != variant['sha256']:
                raise SystemExit(f'Missing or changed responsive image: {variant["path"]}')
            count += 1
    print(f'PASS: {count} responsive images match {len(expected)} source files and their manifest.')


def build(config):
    from PIL import Image, ImageCms, ImageOps, __version__, features

    if not features.check('webp'):
        raise SystemExit('Pillow needs WebP support; see scripts/IMAGES.md')
    manifest = {'version': 1, 'config': config,
                'encoder': {'Pillow': __version__, 'WebP': features.version('webp')}, 'sources': {}}
    for source in [config['logo'], *config['images']]:
        path = asset(source)
        with Image.open(path) as original:
            image = ImageOps.exif_transpose(original).convert('RGBA')
            if original.info.get('icc_profile'):
                alpha = image.getchannel('A')
                image = ImageCms.profileToProfile(
                    image.convert('RGB'), ImageCms.ImageCmsProfile(io.BytesIO(original.info['icc_profile'])),
                    ImageCms.createProfile('sRGB'), outputMode='RGB').convert('RGBA')
                image.putalpha(alpha)
        if image.getchannel('A').getextrema() == (255, 255):
            image = image.convert('RGB')
        image.info.clear()
        logo = source == config['logo']
        widths = sorted({min(width, image.width) for width in config['logo_widths' if logo else 'widths']})
        record = {'sha256': digest(path), 'width': image.width, 'height': image.height, 'variants': []}
        slug = re.sub(r'[^a-z0-9]+', '-', (path.parent.name + '-' + path.stem).lower()).strip('-')
        identity = hashlib.sha256(source.encode('utf-8')).hexdigest()[:8]
        for width in widths:
            height = max(1, round(image.height * width / image.width))
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            resized.info.clear()
            relative = (f'assets/brand/{path.stem}-{width}.png' if logo else
                        f'assets/optimized/{slug}-{identity}-{width}.webp')
            output = asset(relative)
            output.parent.mkdir(parents=True, exist_ok=True)
            if logo:
                resized.save(output, format='PNG', optimize=True, compress_level=9)
            else:
                resized.save(output, format='WEBP', quality=config['quality'], method=6)
            record['variants'].append({'path': relative, 'width': width, 'height': height,
                                       'bytes': output.stat().st_size, 'sha256': digest(output)})
        manifest['sources'][source] = record
    output = ROOT / MANIFEST
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    check(config)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Verify sources and committed variants without Pillow')
    args = parser.parse_args()
    config = json.loads((ROOT / 'scripts/image_sources.json').read_text(encoding='utf-8'))
    (check if args.check else build)(config)
