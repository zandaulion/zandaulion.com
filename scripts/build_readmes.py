"""Build README translations from editable catalogs; --fetch opts into translation requests."""
import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
import re
from site_locales import LANGUAGES
import translate_projects as translator

ROOT = Path(__file__).resolve().parents[1]
NAV = re.compile(r'<!-- readme-languages:start -->.*?<!-- readme-languages:end -->\s*', re.S)
# Protect executable examples, Markdown delimiters, paths, destinations, and names.
translator.PATTERN = re.compile(
    r'`[^`]+`|\]\([^\n)]+\)|\[|\*\*|'
    r'[\w./-]+\.(?:html|md|js|css|json|py|cjs)|'
    r'GNU General Public License v3\.0|GPL-3\.0|'
    r'GitHub Pages|Google Fonts|Apache ECharts|JavaScript|Node\.js|Python|'
    r'HTML|CSS|JSON|SEO|HTTP|Google Play|Google|jsDelivr|Sankey|npm|Android|Plate|'
    + translator.PATTERN.pattern)


def filename(lang):
    return 'README.md' if lang == 'en-US' else f'README.{lang}.md'


def navigation(lang):
    links = [f'**{name}**' if code == lang else f'[{name}]({filename(code)})'
             for code, _, name, _ in LANGUAGES]
    return '<!-- readme-languages:start -->\n' + ' · '.join(links) + '\n<!-- readme-languages:end -->\n\n'


def translate_markdown(values, target):
    try:
        return translator.translate_batch(values, target)
    except ValueError:
        if len(values) > 1:
            return [translate_markdown([value], target)[0] for value in values]
        # If the service changes a protected token, keep the markup locally and
        # translate only the prose between tokens. Never accept damaged commands.
        value, parts, start = values[0], [], 0
        def prose(fragment):
            if not any(char.isalpha() for char in fragment):
                return fragment
            translated = translator.translate_batch([fragment.strip()], target)[0]
            return (' ' if fragment.startswith(' ') else '') + translated + (' ' if fragment.endswith(' ') else '')
        for match in translator.PATTERN.finditer(value):
            parts.extend([prose(value[start:match.start()]), match[0]])
            start = match.end()
        parts.append(prose(value[start:]))
        return [''.join(parts)]


def render(source, translate, rtl=False):
    """Translate prose units without passing structural Markdown to the service."""
    lines = source.splitlines()
    output, index = [], 0
    while index < len(lines):
        line = lines[index]
        if not line.strip():
            output.append(''); index += 1; continue
        if line.startswith('```'):
            kind = line[3:]
            if rtl:
                output.extend(['<div dir="ltr">', ''])
            output.append(line); index += 1
            while index < len(lines) and not lines[index].startswith('```'):
                code = lines[index]
                if kind == 'text' and ' # ' in code:
                    prefix, comment = code.split(' # ', 1)
                    code = prefix + ' # ' + translate(comment.strip())
                output.append(code); index += 1
            if index == len(lines):
                raise ValueError('Unclosed code fence')
            output.append(lines[index]); index += 1
            if rtl:
                output.extend(['', '</div>'])
            continue
        if line.startswith('|'):
            cells = line.split('|')[1:-1]
            output.append(line if all(re.fullmatch(r'\s*:?-+:?\s*', cell) for cell in cells)
                          else '| ' + ' | '.join(translate(cell.strip()) for cell in cells) + ' |')
            index += 1; continue
        heading = re.match(r'^(#{1,6} )(.+)$', line)
        if heading:
            output.append(heading[1] + translate(heading[2])); index += 1; continue
        bullet = re.match(r'^((?:- |\d+\. ))(.*)$', line)
        prefix, paragraph = (bullet[1], bullet[2]) if bullet else ('', line.strip())
        index += 1
        while index < len(lines) and lines[index].strip() and not re.match(r'^(?:#|\||```|- |\d+\. )', lines[index]):
            paragraph += ' ' + lines[index].strip(); index += 1
        output.append(prefix + translate(paragraph))
    result = '\n'.join(output).rstrip() + '\n'
    return '<div dir="rtl">\n\n' + result + '\n</div>\n' if rtl else result


def build(check=False, fetch=False):
    source = NAV.sub('', (ROOT / 'README.md').read_text(encoding='utf-8'))
    strings = {}
    def collect(value):
        # Technical-only cells and names need no translation.
        if value in translator.BRANDS or not translator.PATTERN.sub('', value).strip(' ,·—:-()'):
            return value
        strings[value] = value
        return value
    render(source, collect)

    def prepare(locale):
        lang, _, _, direction = locale
        path = ROOT / 'locales/readme' / f'{lang}.json'
        catalog = json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
        missing = [value for value in strings if value not in catalog]
        if missing and not fetch:
            raise ValueError(f'{lang}: {len(missing)} missing README translations; update {path.relative_to(ROOT)} or use --fetch')
        batch, batches, length = [], [], 0
        for value in missing:
            if batch and length + len(value) > 1800:
                batches.append(batch); batch, length = [], 0
            batch.append(value); length += len(value) + 1
        if batch:
            batches.append(batch)
        target = {'zh-CN': 'zh-CN', 'pt-BR': 'pt'}.get(lang, lang.split('-')[0])
        for batch in batches:
            catalog.update(zip(batch, translate_markdown(batch, target)))
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        def translate(value):
            if value not in strings:
                return value
            translated = catalog[value]
            if not isinstance(translated, str) or not translated.strip():
                raise ValueError(f'{lang}: empty translation: {value}')
            # Commands, Markdown delimiters and URL targets must survive unchanged.
            protected = r'`[^`]+`|\]\([^\n)]+\)|\[|\*\*'
            if Counter(re.findall(protected, value)) != Counter(re.findall(protected, translated)):
                raise ValueError(f'{lang}: Markdown/code changed in {value}')
            if re.search(r'ZXQ\d+QXZ', translated):
                raise ValueError(f'{lang}: unresolved placeholder')
            return translated
        body = render(source, translate, direction == 'rtl')
        # Keep the language selector outside the Arabic direction wrapper.
        body = navigation(lang) + body
        print(f'{lang}: {len(strings)} README strings ready', flush=True)
        return ROOT / filename(lang), body

    outputs = {ROOT / 'README.md': source.replace('# Zandaulion\n\n', '# Zandaulion\n\n' + navigation('en-US'), 1)}
    with ThreadPoolExecutor(max_workers=3) as pool:
        outputs.update(pool.map(prepare, [locale for locale in LANGUAGES if locale[1]]))
    stale = []
    for path, content in outputs.items():
        if check:
            if not path.exists() or path.read_text(encoding='utf-8') != content:
                stale.append(path.name)
        else:
            path.write_text(content, encoding='utf-8', newline='\n')
    if stale:
        raise SystemExit('Rebuild stale READMEs: ' + ', '.join(stale))
    print(f'PASS: 12 READMEs {"verified" if check else "built"}.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group()
    group.add_argument('--check', action='store_true')
    group.add_argument('--fetch', action='store_true', help='Send missing public prose to Google for translation drafts')
    args = parser.parse_args()
    build(args.check, args.fetch)
