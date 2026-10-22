// Optional authoring tool; normal site builds and CI use only committed PNGs.
import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const configPath = path.join(root, 'scripts/social_images.json');
const config = JSON.parse(await readFile(configPath, 'utf8'));
const {chromium} = await import(process.argv[2] || 'playwright');
const browser = await chromium.launch({headless: true});
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
try {
  const page = await browser.newPage({viewport: {width: 1200, height: 630}, deviceScaleFactor: 1});
  // These SVGs are self-contained. Keep rendering local, including their fonts.
  await page.route(/^https?:/, route => route.abort());
  for (const record of config.generated) {
    const source = path.join(root, record.source);
    await page.goto(pathToFileURL(source).href);
    await page.evaluate(() => {
      const svg = document.documentElement;
      svg.setAttribute('width', '1200');
      svg.setAttribute('height', '630');
    });
    await page.evaluate(() => document.fonts.ready);
    const bytes = await page.screenshot({path: path.join(root, record.output), type: 'png'});
    record.source_sha256 = digest(await readFile(source));
    record.sha256 = digest(bytes);
  }
  await writeFile(configPath, JSON.stringify(config, null, 2) + '\n');
  console.log('Rendered both 1200 × 630 social PNGs and recorded their source/output hashes.');
} finally {
  await browser.close();
}
