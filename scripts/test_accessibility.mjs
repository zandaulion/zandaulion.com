// Browser regressions use fresh contexts and clearly synthetic chart data only.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile, stat, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
import axe from 'axe-core';

const root = fileURLToPath(new URL('../', import.meta.url));
const evidence = process.env.A11Y_EVIDENCE_DIR;
const liveFonts = process.env.A11Y_WEB_FONTS === '1';
const types = {'.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp'};
const server = createServer(async (request, response) => {
  try {
    let filename = path.resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
    if (filename !== root.slice(0, -1) && !filename.startsWith(root)) { response.writeHead(403).end(); return; }
    if ((await stat(filename)).isDirectory()) filename = path.join(filename, 'index.html');
    const bytes = await readFile(filename);
    response.writeHead(200, {'Content-Type': types[path.extname(filename)] || 'application/octet-stream'});
    response.end(bytes);
  } catch { response.writeHead(404, {'Content-Type': 'text/html'}).end(await readFile(path.join(root, '404.html'))); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({headless: true});
const results = [];
const locales = [['en-US', ''], ['ar', 'ar'], ['zh-CN', 'zh-cn'], ['fr-FR', 'fr'], ['de-DE', 'de'], ['hi-IN', 'hi'],
  ['ja-JP', 'ja'], ['ko-KR', 'ko'], ['pt-BR', 'pt-br'], ['ro', 'ro'], ['es-ES', 'es'], ['uk', 'uk']];
const images = JSON.parse(await readFile(path.join(root, 'scripts/social_images.json'), 'utf8'));
const core = locales.flatMap(([lang, prefix]) => ['index.html', 'faceslice.html', 'sankey.html'].map(filename => ({
  lang, file: (prefix ? prefix + '/' : '') + filename + (!prefix && filename === 'index.html' ? '?lang=en-US' : '')
})));
const projects = Object.keys(images.projects).filter(name => !['faceslice.html', 'sankey.html'].includes(name)).map(file => ({file, lang: 'en-US'}));

async function scan(page, label) {
  await page.addScriptTag({content: axe.source});
  const report = await page.evaluate(() => axe.run(document, {runOnly: {type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']}}));
  assert.deepEqual(report.violations.map(v => ({id: v.id, nodes: v.nodes.map(node => node.target)})), [], label);
}
async function layout(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
  assert(!overflow, label + ': horizontal page overflow');
}
async function menu(page) {
  const summary = page.locator('.language-picker summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  assert(await page.locator('.language-picker').evaluate(element => element.open));
  const box = await page.locator('.language-list').boundingBox();
  assert(box.x >= -1 && box.x + box.width <= page.viewportSize().width + 1, 'language menu clipped');
  await page.keyboard.press('Escape');
  assert(!await page.locator('.language-picker').evaluate(element => element.open));
  assert(await summary.evaluate(element => element === document.activeElement));
}
async function gallery(page, label) {
  const trigger = page.locator('.gallery-open').first();
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.locator('.gallery-dialog[open]');
  assert.equal(await dialog.count(), 1);
  await dialog.locator('img').evaluate(image => image.decode());
  assert(await dialog.evaluate(element => element.contains(document.activeElement)));
  assert((await dialog.locator('img').boundingBox()).height >= 80, label + ': zoom makes gallery image too small');
  await dialog.locator('.gallery-next').focus();
  await page.keyboard.press('Tab');
  // Native dialogs may let Tab visit browser chrome; background page controls
  // must stay inert, and returning to the document must re-enter the dialog.
  assert(await dialog.evaluate(element => element.contains(document.activeElement) || !document.hasFocus()));
  if (!await page.evaluate(() => document.hasFocus())) await page.keyboard.press('Tab');
  // A dialog that overflows a zoomed viewport is itself a stop so keys can scroll it.
  const scrollStop = () => dialog.evaluate(element => element === document.activeElement && element.scrollHeight > element.clientHeight);
  if (await scrollStop()) await page.keyboard.press('Tab');
  assert(await dialog.locator('.gallery-close').evaluate(element => element === document.activeElement));
  await page.keyboard.press('Shift+Tab');
  assert(await dialog.evaluate(element => element.contains(document.activeElement) || !document.hasFocus()));
  if (await scrollStop()) await page.keyboard.press('Shift+Tab');
  if (!await page.evaluate(() => document.hasFocus())) await page.keyboard.press('Shift+Tab');
  assert(await dialog.locator('.gallery-next').evaluate(element => element === document.activeElement));
  await scan(page, label + ' open gallery');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.gallery-dialog[open]').count(), 0);
  assert(await trigger.evaluate(element => element === document.activeElement));
}
async function sankey(page) {
  const graph = await page.evaluate(() => {
    const chart = echarts.getInstanceByDom(document.querySelector('#echarts-container'));
    const series = chart.getOption().series[0];
    return {version: echarts.version, type: series.type, nodes: series.data.map(node => node.name), links: series.links};
  });
  assert.equal(graph.version, '6.1.0');
  assert.equal(graph.type, 'sankey');
  assert.deepEqual(graph.nodes, ['Input A', 'Output B']);
  assert.equal(graph.links[0].value, 10);
  async function downloadFrom(selector) {
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator(selector).click()]);
    const stream = await download.createReadStream(), chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return Buffer.concat(chunks);
  }
  const png = await downloadFrom('#btn-export');
  assert(png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), 'Sankey PNG export');
  assert(png.readUInt32BE(16) > 0 && png.readUInt32BE(20) > 0, 'Sankey PNG dimensions');
  const exported = JSON.parse((await downloadFrom('#btn-export-json')).toString('utf8'));
  assert.deepEqual(exported.nodes.map(node => node.name), graph.nodes);
  assert.equal(exported.links[0].value, 10);
  for (const id of ['node-name', 'node-color', 'link-source', 'link-target', 'link-value', 'height-slider', 'width-slider']) {
    assert(await page.locator('#' + id).evaluate(input => [...input.labels].some(label => label.textContent.trim() && label.getBoundingClientRect().height > 0)), id + ' needs a visible label');
  }
  const source = page.locator('#link-source');
  await source.focus();
  assert.equal(await source.evaluate(input => getComputedStyle(input).outlineStyle), 'solid');
  await page.locator('#nodes-list .edit-node-btn').first().focus();
  await page.keyboard.press('Enter');
  assert(await page.locator('#node-name').evaluate(input => input === document.activeElement));
  const remove = page.locator('#nodes-list .delete-btn').first();
  assert((await remove.getAttribute('aria-label')).includes('Input A'));
  await remove.focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#nodes-list li').count(), 1);
  assert(await page.locator('#nodes-list .delete-btn').evaluate(button => button === document.activeElement));
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#nodes-list li').count(), 0);
  assert(await page.locator('#node-name').evaluate(input => input === document.activeElement));
}

async function check(spec, width, height, interactive = false) {
  const context = await browser.newContext({viewport: {width, height}, locale: 'en-US', reducedMotion: 'reduce'});
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    if (url.href === 'https://cdn.jsdelivr.net/npm/echarts@6.1.0/dist/echarts.min.js') return route.fulfill({path: path.join(root, 'node_modules/echarts/dist/echarts.min.js'), contentType: 'text/javascript'});
    if (liveFonts && ['fonts.googleapis.com', 'fonts.gstatic.com'].includes(url.hostname)) return route.continue();
    return route.abort();
  });
  await context.addInitScript(() => {
    localStorage.setItem('zandaulion-language', 'en-US');
    localStorage.setItem('sankey_nodes', JSON.stringify([{name: 'Input A'}, {name: 'Output B'}]));
    localStorage.setItem('sankey_links', JSON.stringify([{source: 'Input A', target: 'Output B', value: 10}]));
  });
  const page = await context.newPage(), errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const label = `${spec.file} ${width}×${height}`;
  try {
    await page.goto(origin + '/' + spec.file, {waitUntil: 'load'});
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('html').getAttribute('lang'), spec.lang);
    await layout(page, label);
    await scan(page, label);
    await page.keyboard.press('Tab');
    assert(await page.locator('.skip-link').evaluate(link => link === document.activeElement), label + ': skip link');
    await menu(page);
    if (spec.file.includes('index.html')) {
      const rectangles = await page.evaluate(() => ['.art-piece span:not(.tape)', '.bench-note'].map(selector => {
        const rect = document.querySelector(selector).getBoundingClientRect(); return {top: rect.top, bottom: rect.bottom};
      }));
      if (width <= 700) assert(rectangles[1].top >= rectangles[0].bottom, label + ': overlapping captions');
    }
    if (spec.file.includes('faceslice')) await gallery(page, label);
    if (interactive && spec.file.includes('sankey')) await sankey(page);
    if (evidence && interactive) {
      await mkdir(evidence, {recursive: true});
      await page.screenshot({path: path.join(evidence, spec.file.replaceAll('/', '-').replaceAll('?', '-') + `-${width}x${height}.png`), fullPage: true});
    }
    assert.deepEqual(errors, [], label + ': script errors');
    results.push({file: spec.file, width, height, interactive, pass: true});
    if (results.length % 20 === 0) console.log(`Verified ${results.length} browser page cases.`);
  } finally { await context.close(); }
}

try {
  for (const width of [320, 1280]) {
    const specs = [...core, ...projects];
    for (let index = 0; index < specs.length; index += 2) await Promise.all(specs.slice(index, index + 2).map(spec =>
      check(spec, width, width === 320 ? 800 : 900, ['en-US', 'ar', 'ro'].includes(spec.lang))));
    console.log(`PASS: ${specs.length} pages at ${width}px; accessibility, menu keyboard behavior and layout.`);
  }
  // Equivalent reflow dimensions for 200% and 400% zoom on a 1280 × 900 viewport.
  for (const [width, height] of [[640, 450], [320, 225]]) for (const file of ['index.html?lang=en-US', 'ar/index.html', 'faceslice.html', 'sankey.html']) {
    await check({file, lang: file.startsWith('ar/') ? 'ar' : 'en-US'}, width, height, true);
  }
  if (evidence) await writeFile(path.join(evidence, 'browser-checks.json'), JSON.stringify(results, null, 2));
  console.log(`PASS: ${results.length} browser page checks; pinned axe-core WCAG A/AA scans, narrow/zoom reflow, labels, menu/gallery keys and Sankey focus recovery.`);
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
