# Accessibility and mobile regression checks

The optional browser checks run real Chromium against a temporary loopback server.
The site remains static: normal page generation needs only Python's standard
library, and language unit tests still use Node's built-in test runner. Browser
checks need Node 24 and the development dependencies pinned in `package-lock.json`:

```sh
npm ci --ignore-scripts
npx --no-install playwright install chromium
npm run test:accessibility
```

On a fresh Linux host, use `npx --no-install playwright install --with-deps chromium`
to install the browser's system dependencies too. CI runs these checks on pushes
and pull requests. Nothing is bundled into production by npm.

## What the browser suite checks

- axe-core scans for tagged WCAG 2.0/2.1/2.2 A/AA rules on every English project,
  and home, Faceslice gallery and Sankey pages in all 12 languages.
- Page overflow, visible labels, caption separation, language-menu visibility and
  Escape/focus behavior at 320 and 1280 CSS pixels.
- Reflow at 640 × 450 and 320 × 225, equivalent to 200% and 400% zoom on a
  1280 × 900 viewport. Galleries keep a usable minimum image size and can scroll
  in short viewports.
- Gallery Enter/Tab/Shift+Tab/arrow/Escape behavior and focus return. The native
  dialog may let focus visit browser chrome; background page controls stay inert.
  When zoom makes the dialog overflow, the dialog itself is a tab stop so arrow
  keys can scroll it.
- Gallery thumbnails carry `width`/`height`, and `project.css` restores the ratio
  that the preserved `index.css` clears, so lazy images reserve space before they
  load and keep a usable target size.
- Visible labels on Sankey controls, visible select focus, contextual edit/delete
  names, and sensible focus after removing a row or the final row.
- Sankey rendering with the pinned ECharts version, plus PNG and JSON downloads
  from the same synthetic diagram before editing its rows.

Each test uses a fresh context with only invented `Input A` / `Output B` chart data.
It never opens an existing browser profile or copies personal browser/app state.
The test copy of ECharts matches the production version. Third-party requests are
blocked and the chart script comes from the locked local package, keeping normal
CI independent of fonts/CDN availability. Screenshots are not published by CI.

For an additional manual font/rendering review with Google Fonts available:

```sh
A11Y_WEB_FONTS=1 A11Y_EVIDENCE_DIR=/tmp/site-a11y npm run test:accessibility
```

The evidence directory is optional; keep it outside the repository. Review CJK,
Hindi and Arabic text, mobile captions, keyboard focus, and short gallery layouts.
The shared `fonts.css` provides Noto fallbacks for home, project and error pages;
Google Fonts downloads glyph subsets as needed. Without web fonts, system fonts
remain the fallback.

Automated scans and viewport checks cover common regressions. They do not certify
WCAG conformance or replace assistive-technology testing with actual users.

## Privacy-policy preservation

`scripts/site_contracts.py` lists the ten original public policy routes, including
`plate-privacy.html`. `scripts/privacy_hashes.json` records the preserved SHA-256
of each notice and its original `index.css` / `main.js` assets. The ordinary site
check rejects missing routes or changed bytes and, with `--url`, compares served
notices with source. Site generation never rewrites these files. Keep website
presentation changes in the newer workshop/project assets. A deliberate policy
change requires reviewing the affected content and the baseline update together.

References: [W3C labels](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html),
[W3C reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html),
[Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing).
