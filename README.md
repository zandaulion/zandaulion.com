# Zandaulion

<!-- readme-languages:start -->
**English** · [العربية](README.ar.md) · [简体中文](README.zh-CN.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [हिन्दी](README.hi-IN.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Português (Brasil)](README.pt-BR.md) · [Română](README.ro.md) · [Español](README.es-ES.md) · [Українська](README.uk.md)
<!-- readme-languages:end -->

A playful workshop for curious ideas: apps, games, and small tools to explore.

**[Visit zandaulion.com](https://zandaulion.com/)** · [Romanian collection](https://zandaulion.com/ro/index.html)

This repository contains the Zandaulion website: a searchable collection of 20
projects, individual project pages, and an interactive Sankey diagram editor.
The homepage and every project page are available in 12 languages. The site is
static HTML, CSS, and vanilla JavaScript, hosted on GitHub Pages.

## README translations

This README is available in the same 12 languages as the website. Use the language
links at the top to switch versions. English lives in `README.md`; translated
versions use filenames such as `README.ro.md` and `README.ar.md`.

Edit the English README and the corresponding catalogs in `locales/readme/`, then
run `python scripts/build_readmes.py` to regenerate the translated files. Use
`python scripts/build_readmes.py --check` to detect stale files or missing
translations. The optional `--fetch` flag prepares missing translation drafts
through the same Google translation service used for project text. Commands,
paths, code examples, and link destinations are preserved.

## What’s here

- A collection with category filters, accent-insensitive search, and random discovery.
- Project descriptions, launch and source links, screenshot galleries, and related projects.
- Keyboard-accessible image galleries with captions, previous/next controls, and touch gestures.
- A Sankey editor with node/link editing, image export, and JSON import/export.
- Language selection, saved preferences, browser-language detection, and Arabic right-to-left layout.
- Existing English privacy notices at the URLs already registered with Google Play.

### Project collection

| Project | Website page |
| --- | --- |
| Admitere Liceu Kit | [admitere.html](admitere.html) |
| BP Digitizer — Android and PWA | [bpdigitizer.html](bpdigitizer.html) |
| Faceslice | [faceslice.html](faceslice.html) |
| Gravity Garden | [gravitygarden.html](gravitygarden.html) |
| GravityTDG | [gravitytdg.html](gravitytdg.html) |
| Gravity Warp | [gravitywarp.html](gravitywarp.html) |
| Intârzieri Tren | [intarzieri.html](intarzieri.html) |
| Kerfloom | [kerfloom.html](kerfloom.html) |
| Magpie | [magpie.html](magpie.html) |
| Mișcare | [miscare.html](miscare.html) |
| OLX Deal Finder | [olxdeals.html](olxdeals.html) |
| Pocket Omaha | [omaha.html](omaha.html) |
| OrbitPuzzles | [orbitpuzzles.html](orbitpuzzles.html) |
| Pale Blue Dot | [palebluedot.html](palebluedot.html) |
| Bitey, formerly Plate | [plate.html](plate.html) |
| PWA Invite Console | [pwainvite.html](pwainvite.html) |
| pwa-kit | [pwakit.html](pwakit.html) |
| Sankey Diagram Editor | [sankey.html](sankey.html) |
| Spendosaurus | [spendosaurus.html](spendosaurus.html) |
| Thermostat Monitor | [thermostat.html](thermostat.html) |

The app repositories are separate from this website. The renamed repositories
are [zandaulion.com](https://github.com/zandaulion/zandaulion.com),
[bitey](https://github.com/zandaulion/bitey), and
[kerfloom](https://github.com/zandaulion/kerfloom).

Bitey keeps the established `plate.html` page. BP Digitizer has one page for both
platforms; `wbpdigitizer.html` remains a compatibility redirect to
`bpdigitizer.html#web-version`.

## Preview locally

Run these commands from the repository root. Python is needed for the generator
and checks; the Python scripts use only the standard library. Node.js with the
built-in test runner is needed for the language tests. There is no npm install
or frontend bundler step.

```sh
python scripts/build_locales.py
python -m http.server 8765 --bind 127.0.0.1
```

Open [the local homepage](http://127.0.0.1:8765/index.html), or use
[explicit English](http://127.0.0.1:8765/index.html?lang=en-US) or
[Romanian](http://127.0.0.1:8765/ro/index.html) to bypass automatic language selection.

The generated HTML is also designed for direct file browsing. Open `index.html`,
not a language folder; navigation uses explicit filenames to avoid directory
listings. Language scripts are ordinary scripts rather than ES modules.
The local HTTP preview is the recommended way to review changes.

## Languages and navigation

| Language | Locale | Homepage |
| --- | --- | --- |
| English | `en-US` | `/index.html?lang=en-US` |
| Arabic | `ar` | `/ar/index.html` |
| Chinese, Simplified | `zh-CN` | `/zh-cn/index.html` |
| French | `fr-FR` | `/fr/index.html` |
| German | `de-DE` | `/de/index.html` |
| Hindi | `hi-IN` | `/hi/index.html` |
| Japanese | `ja-JP` | `/ja/index.html` |
| Korean | `ko-KR` | `/ko/index.html` |
| Portuguese, Brazil | `pt-BR` | `/pt-br/index.html` |
| Romanian | `ro` | `/ro/index.html` |
| Spanish | `es-ES` | `/es/index.html` |
| Ukrainian | `uk` | `/uk/index.html` |

Translated project pages keep the same filename under the language prefix, such
as `/fr/kerfloom.html` or `/ja/plate.html`. Language switching keeps the current
project and section anchor. Collection and related-project links stay in the
selected language. Each homepage and project page has a language declaration,
canonical URL, and reciprocal `hreflang` links.

An explicit language path, such as `/ro/`, always takes precedence. On the main
entry page only (`/` or `/index.html`), selection follows this order:

1. A supported explicit `?lang=` choice.
2. A saved language preference.
3. The first supported browser preference from `navigator.languages`.
4. English if no supported language matches.

Regional variants match their base language: for example, `fr-CA` selects French.
English links include `?lang=en-US` so an explicit choice works even when browser
storage is unavailable. Entry-page redirects preserve section anchors and other
query parameters. Project and privacy URLs never redirect based on browser language.

Homepage language links are present in the HTML and work without JavaScript.
Project headers, their language picker, gallery controls, and the Sankey editor
use JavaScript. Local-file project links carry the selected language in the URL
because browsers may isolate storage for each file.

## Editing and generating pages

| What to change | Source to edit |
| --- | --- |
| Homepage layout | `templates/home.html` |
| Homepage text in each language | `locales/<locale>.json` |
| English project content and layout | Root project HTML files, such as `kerfloom.html` |
| Translated project content | `locales/projects/<locale>/<project>.json` |
| Gallery controls and editor messages | `locales/projects/<locale>/common.json` |
| Reusable translation corrections | `locales/projects/overrides.json` |
| Supported locales and URL prefixes | `scripts/site_locales.py` |
| Project coverage and translation rendering | `scripts/project_locales.py` |
| Shared presentation | `workshop.css` and `project.css` |
| Collection, project, and language behavior | `workshop.js`, `project.js`, and `language.js` |
| Sankey editor behavior | `sankey.js` |

After editing source content or catalogs, regenerate the site:

```sh
python scripts/build_locales.py
```

The generator produces 12 homepages, 220 translated project pages, and
`language-data.js`. It also maintains canonical and alternate-language links on
the 20 English project pages. Commit these generated outputs with their sources;
GitHub Pages serves them directly without running the Python generator.

Do not edit generated homepages, translated HTML, or `language-data.js` directly:
regeneration replaces those edits. Homepage catalogs must have matching non-empty
keys. Project catalogs use source text as keys, so changes to English copy require
corresponding translation updates. Missing translations fail the build.

### Translation maintenance

Project translation drafts were prepared with Google’s translation service, then
shared wording, gallery controls, product names, and selected technical phrases
were refined. Earlier Romanian translations were retained. Native-speaker review
is still useful, particularly for technical terminology. App names, screenshots,
and technical identifiers retain their original form.

The optional authoring script can prepare missing translations for one locale:

```sh
python scripts/translate_projects.py --fetch --language ro
```

Omit `--language ro` to process all translated locales. The `--fetch` flag permits
sending missing public project text to Google’s translation service. Existing
catalogs are reused, product names are protected, and `overrides.json` corrections
are applied. Without `--fetch`, the script reports missing strings and refreshes
catalogs only where all required translations are already available. It is not a
read-only check.

Some shared phrases also occur in per-project catalogs. Put consistent wording
corrections in `overrides.json` and run the preparation script to apply them across
projects, then rebuild the HTML. Review generated translations before publishing.
The `.translation-cache/` folder is ignored by Git. Normal builds and the deployed
website never call a translation service.

## Checks before publishing

With the local preview server running, run these commands in another terminal:

```sh
python scripts/build_locales.py --check
python scripts/check_site.py --url http://127.0.0.1:8765
node --test scripts/test_language.cjs
```

- The build check detects stale generated outputs and missing translations.
- The site check covers all 261 HTML pages: 12 homepages, 240 project pages,
  eight privacy notices, and one compatibility redirect. It checks local links,
  assets, duplicate IDs outside the preserved privacy markup, project language
  metadata, reciprocal SEO links, and Arabic direction. With `--url`, it also
  checks HTTP responses and compares served privacy notices with their source files.
- The language tests cover preference precedence, regional matching, blocked
  storage, file and subdirectory roots, redirect behavior, and section preservation.

For offline link checks, run `python scripts/check_site.py` without `--url`.
Review affected pages in the browser as well: mobile layout, Arabic direction,
language switching, gallery keyboard controls, and editor interactions.

## Deployment

The live site is [zandaulion.com](https://zandaulion.com/), published from `main`
through GitHub Pages. `CNAME` keeps the custom domain configuration.

After generating and checking the site, commit the source and generated changes
and push `main`. Wait for the **pages build and deployment** workflow to complete,
then verify the changed URLs on the live domain. Keep the existing project and
privacy routes when renaming apps or their repositories.

The site uses static assets and ordinary scripts. Fonts are loaded from Google
Fonts, and the Sankey editor loads Apache ECharts from jsDelivr. No translation
service is required at runtime.

## Stable privacy URLs

These URLs are already registered with Google Play. **Do not rename, move, or
remove them, or rewrite their contents as part of website localization.**

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

The notices remain in English and retain their original presentation and shared
`index.css` / `main.js` assets. Shared-asset changes should account for these pages.
`scripts/check_site.py` guards the paths and can verify the served content.

## Repository map

```text
/
├── index.html                  # Generated English homepage
├── <project>.html              # English project sources
├── *-privacy.html              # Preserved English privacy notices
├── wbpdigitizer.html           # Compatibility redirect
├── templates/home.html         # Shared homepage template
├── README.*.md                 # Translated README files
├── locales/                    # Website and README translation catalogs
├── ar/, de/, ro/, ...           # Generated language homepages and project pages
├── scripts/                    # Generation, translation preparation, checks, tests
├── language-data.js            # Generated navigation and UI dictionaries
├── language.js                 # Language selection and navigation
├── workshop.css / workshop.js  # Workshop presentation and collection behavior
├── project.css / project.js    # Project presentation, header/footer, galleries
├── sankey.js                   # Interactive diagram editor
├── sample_sankey.json          # Sample diagram data
├── index.css / main.js         # Original shared assets, retained for privacy pages
├── assets/                     # Brand artwork, project graphics, screenshots
├── CNAME                       # GitHub Pages custom domain
└── LICENSE
```

## License and brand assets

The source code is licensed under the **GNU General Public License v3.0
(GPL-3.0)**. See [LICENSE](LICENSE).

**Trademark & Brand Exception:** The “Zandaulion” name, brand identity, and all
logo image files located in `assets/brand/` are **not** covered by the GPL license.
All rights to these trademarks and visual brand assets are reserved. You may not
use them in derivative works or to identify your own projects without permission.
