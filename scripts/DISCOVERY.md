# Search discovery, sharing previews, and error pages

Run `python scripts/build_locales.py` after editing the sources below. The normal
build and CI use Python's standard library and committed image files; no npm
installation or external service is needed.

## Sharing previews

Every homepage and project page has static Open Graph and large-image card tags.
Project titles come from the localized heading, descriptions from the localized
page description, and URLs from the canonical link. The homepage uses its existing
translated social copy. A crawler can read these tags without JavaScript.

`scripts/social_images.json` selects the homepage artwork and one existing public
PNG/JPEG image per project. Add a mapping when adding a project. Dimensions come
from the responsive image manifest; rebuild responsive images if a source changes.
Space-containing asset paths are URL-encoded. Existing galleries are independent.

The branded homepage graphic has its SVG source in `assets/brand/social-home.svg`.
Hearth's PNG preview comes from its existing data-free SVG illustration. These two
PNGs are 1200 × 630 pixels. To regenerate them, optionally install the authoring
renderer tested with Playwright 1.63.0 and Chromium:

```sh
npm install --no-save --package-lock=false playwright@1.63.0
npx playwright install chromium
node scripts/render_social.mjs
python scripts/build_locales.py
```

The renderer uses local SVGs and system fonts, blocks HTTP requests, and records
source/output hashes in `scripts/social_images.json`. Font or browser differences
can change PNG bytes; review the images before committing the updated hashes.
Brand graphics retain the separate brand terms described in the root README.
Use previously reviewed public/synthetic artwork and inspect metadata when adding
an image. Social platforms may cache previews; changes can take time to appear.

## Sitemap and robots.txt

The locale build generates `sitemap.xml` from canonical homepage, project, and
privacy links. Language alternates match the HTML exactly. It includes each
canonical URL once, omitting the duplicate Plate privacy alias, the BP compatibility
redirect, index.html aliases, and the error page. Existing URLs remain accessible.
There are no fabricated modification dates or priority values. `robots.txt`
allows crawling and advertises the absolute sitemap URL.

## The 404 page

Edit `templates/404.html`, `not-found.css`, `not-found.js`, and the `not_found_*`
entries in each `locales/<locale>.json` catalog. The build produces one root
`404.html`, which GitHub Pages serves with HTTP 404 for missing routes.

The page contains reviewed text and collection links for all 12 languages. Its
small script selects the missing URL's language prefix first, then a valid saved
preference, then the browser language, with English as fallback. It changes the
page language, direction, title, skip link, and recovery link without redirecting.
Without JavaScript, the English message and all native-language collection links
remain available. Assets and recovery links start at the site root so they work
at nested missing URLs. Unknown URL text is never echoed into the page.
Google Fonts supplies Noto fallbacks for Chinese, Japanese, Korean, and Hindi
when the visitor's system fonts do not cover those scripts.

The error page has `noindex, follow`, no canonical link, and no sitemap entry.
The ordinary Python preview server shows its own missing-file response; preview
`http://127.0.0.1:8765/404.html` directly. Verify the actual 404 status at a deliberately
missing URL after Pages deployment.

## Verification

The existing build `--check` detects stale discovery files, metadata, error text,
and PNG source/output hashes. `scripts/check_site.py` checks every sharing field,
image path/dimension, sitemap URL/alternate, and robots directive. Its HTTP mode
also compares served sitemap and robots bytes. Python regression tests cover
localized metadata, escaping, encoded image paths, and canonical alias handling.
Browser review should cover mobile/desktop, Arabic, nested missing routes, and
JavaScript/storage unavailable. Keep privacy-policy contents unchanged.

References: [Open Graph](https://ogp.me/),
[Google language alternates](https://developers.google.com/search/docs/specialty/international/localized-versions),
[Google robots.txt guidance](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt),
[GitHub Pages custom 404](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site).
