"""Prepare editable translation drafts for public project copy; never used at runtime.

Requires --fetch to send untranslated public strings to Google's translation service.
Existing translations and homepage catalogs take priority. Normal site builds are offline.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import re
import time
from urllib.parse import urlencode
from urllib.request import Request, urlopen
from project_locales import FILES, BRANDS, UI, SANKEY, project_strings
from site_locales import LANGUAGES

ROOT = Path(__file__).resolve().parents[1]
PROTECTED = sorted(BRANDS | {
    'Google Play', 'GitHub', 'Gemini', 'OpenCV', 'MediaPipe', 'Nutrition5k', 'Box2D',
    'LibGDX', 'OpenGL ES', 'NASA', 'USGS', 'ISS', 'GPS', 'GPU', 'API', 'PWA',
    'JSON', 'CSV', 'SVG', 'DXF', 'PNG', 'ZIP', 'CNC', 'CAM', 'HTTPS', 'WebGL', 'Escape',
    'Run all checks', 'Save to Projects', 'Save offline', 'New project', 'Undo/Redo',
    'GPL-3.0-or-later', 'Node/Express', 'Python/FastAPI',
    '{n}', '{total}', '{ nodes: [], links: [] }'
}, key=len, reverse=True)
PATTERN = re.compile(r'(?<!\w)(?:' + '|'.join(re.escape(word) for word in PROTECTED) + r')(?!\w)')


def read(path):
    return json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}


def write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def translate_batch(strings, target):
    tokens = {}
    def protect(match):
        token = f'ZXQ{len(tokens):04d}QXZ'
        tokens[token] = match[0]
        return token
    text = '\n'.join(PATTERN.sub(protect, ' '.join(value.split())) for value in strings)
    url = 'https://translate.googleapis.com/translate_a/single?' + urlencode(
        dict(client='gtx', sl='en', tl=target, dt='t', q=text))
    for attempt in range(4):
        try:
            with urlopen(Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30) as response:
                data = json.load(response)
            result = ''.join(part[0] for part in data[0] if part[0])
            for token, original in tokens.items():
                if token not in result:
                    raise ValueError('Translation changed a protected brand or placeholder')
                result = result.replace(token, original)
            lines = result.strip().split('\n')
            if len(lines) != len(strings) or any(not line.strip() for line in lines):
                raise ValueError('Translation changed paragraph boundaries')
            return [line.strip() for line in lines]
        except ValueError:
            if len(strings) == 1:
                raise
            middle = len(strings) // 2
            return translate_batch(strings[:middle], target) + translate_batch(strings[middle:], target)
        except Exception:
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)


def prepare(lang, pages, fetch):
    folder = ROOT / 'locales/projects' / lang
    english = read(ROOT / 'locales/en-US.json')
    home = read(ROOT / f'locales/{lang}.json')
    known = read(ROOT / '.translation-cache' / f'{lang}.json')
    for path in folder.glob('*.json'):
        known.update(read(path))
    known.update({value: home[key] for key, value in english.items()})
    known.update(read(ROOT / 'locales/projects/overrides.json').get(lang, {}))
    # A translated sentence may change, but product names must remain recognizable.
    known = {source: target for source, target in known.items()
             if all(brand not in source or brand in target for brand in BRANDS)}
    required = dict.fromkeys([*UI.values(), *SANKEY, 'Page in English', *[text for strings in pages.values() for text in strings]])
    missing = [text for text in required if text not in known]
    print(f'{lang}: {len(required)} strings, {len(missing)} new translations', flush=True)
    if missing and not fetch:
        return
    batches, batch, length = [], [], 0
    for value in missing:
        if batch and length + len(value) > 2200:
            batches.append(batch); batch, length = [], 0
        batch.append(value); length += len(value) + 1
    if batch:
        batches.append(batch)
    target = {'zh-CN': 'zh-CN', 'pt-BR': 'pt'}.get(lang, lang.split('-')[0])
    for index, batch in enumerate(batches):
        known.update(zip(batch, translate_batch(batch, target)))
        write(ROOT / '.translation-cache' / f'{lang}.json', known)
        print(f'{lang}: batch {index + 1}/{len(batches)}', flush=True)
    common = read(folder / 'common.json')
    common.update({text: known[text] for text in [*UI.values(), *SANKEY, 'Page in English']})
    write(folder / 'common.json', common)
    for filename, strings in pages.items():
        write(folder / f'{filename[:-5]}.json', {text: known[text] for text in strings})
    print(f'{lang}: DONE', flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fetch', action='store_true')
    parser.add_argument('--language', help='Limit to one locale')
    args = parser.parse_args()
    pages = {filename: project_strings(ROOT, filename) for filename in FILES}
    languages = [lang for lang, path, _, _ in LANGUAGES if path and (not args.language or lang == args.language)]
    with ThreadPoolExecutor(max_workers=3) as pool:
        list(pool.map(lambda lang: prepare(lang, pages, args.fetch), languages))
