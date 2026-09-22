// Run the production language script in an isolated page stub, without a browser.
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const root = resolve(__dirname, '..');
const registry = readFileSync(resolve(root, 'language-data.js'), 'utf8');
const script = readFileSync(resolve(root, 'language.js'), 'utf8');

function visit({ url = 'https://zandaulion.com/', lang = 'en-US', saved,
  languages = ['en-US'], language = 'en-US', storageBlocked = false, home = true,
  scriptURL = 'https://zandaulion.com/language.js?v=6', languageLinks = [] } = {}) {
  let redirect;
  const writes = [];
  const location = new URL(url);
  location.replace = value => { redirect = value; };
  const context = vm.createContext({ URL, window: {}, location,
    navigator: { languages, language },
    localStorage: {
      getItem() { if (storageBlocked) throw Error('Unavailable'); return saved; },
      setItem(key, value) { if (storageBlocked) throw Error('Unavailable'); writes.push(value); }
    },
    document: {
      currentScript: { src: scriptURL }, documentElement: { lang },
      querySelector: selector => selector === '#project-grid' && home ? {} : null,
      querySelectorAll: selector => selector === '[data-language]' ? languageLinks : []
    }
  });
  vm.runInContext(registry, context);
  vm.runInContext(script, context);
  return { redirect, writes };
}

test('first visit matches each supported language, including regional variants', () => {
  for (const [language, path] of [['ar-EG','ar'], ['zh-SG','zh-cn'], ['fr-CA','fr'],
    ['de-AT','de'], ['hi','hi'], ['ja','ja'], ['ko','ko'], ['pt-PT','pt-br'],
    ['ro-MD','ro'], ['es-MX','es'], ['uk-UA','uk']]) {
    assert.equal(visit({ languages: [language] }).redirect, `https://zandaulion.com/${path}/index.html`);
  }
  assert.equal(visit({ languages: ['en-GB', 'ro'] }).redirect, undefined);
});

test('uses browser preference order, skipping unsupported languages', () => {
  assert.equal(visit({ languages: ['it-IT', 'fr-CA', 'ro'] }).redirect, 'https://zandaulion.com/fr/index.html');
  assert.equal(visit({ languages: ['ro', 'fr-FR'] }).redirect, 'https://zandaulion.com/ro/index.html');
  assert.equal(visit({ languages: ['it-IT'] }).redirect, undefined);
  assert.equal(visit({ languages: [], language: 'ro' }).redirect, 'https://zandaulion.com/ro/index.html');
});

test('saved choice wins over browser language; invalid choices are ignored', () => {
  assert.equal(visit({ saved: 'en-US', languages: ['ro'] }).redirect, undefined);
  assert.equal(visit({ saved: 'ro', languages: ['fr-FR'] }).redirect, 'https://zandaulion.com/ro/index.html');
  assert.equal(visit({ saved: 'invalid', languages: ['ro'] }).redirect, 'https://zandaulion.com/ro/index.html');
});

test('explicit English selection works even without storage and remains selected', () => {
  const options = { url: 'https://zandaulion.com/index.html?lang=en-US', languages: ['ro'], saved: 'ro' };
  assert.deepEqual(visit(options), { redirect: undefined, writes: ['en-US'] });
  assert.equal(visit({ ...options, storageBlocked: true }).redirect, undefined);
  assert.equal(visit({ url: 'https://zandaulion.com/?lang=fr-FR', saved: 'ro' }).redirect,
    'https://zandaulion.com/fr/index.html');
});

test('localized URLs override conflicting query, storage, and browser preferences', () => {
  const result = visit({ url: 'https://zandaulion.com/ro/index.html?lang=fr-FR', lang: 'ro', saved: 'de-DE', languages: ['ar'] });
  assert.deepEqual(result, { redirect: undefined, writes: ['ro'] });
});

test('redirect keeps query parameters and section anchors, without a redirect loop', () => {
  const first = visit({ url: 'https://zandaulion.com/index.html?campaign=launch#collection', languages: ['ro'] });
  assert.equal(first.redirect, 'https://zandaulion.com/ro/index.html?campaign=launch#collection');
  assert.equal(visit({ url: first.redirect, lang: 'ro', languages: ['ro'], storageBlocked: true }).redirect, undefined);
});

test('detection works with blocked storage and file or subdirectory roots', () => {
  assert.equal(visit({ storageBlocked: true, languages: ['ro'] }).redirect, 'https://zandaulion.com/ro/index.html');
  assert.equal(visit({ url: 'file:///C:/site/index.html', scriptURL: 'file:///C:/site/language.js', languages: ['ro'], storageBlocked: true }).redirect,
    'file:///C:/site/ro/index.html');
  assert.equal(visit({ url: 'https://example.com/site/', scriptURL: 'https://example.com/site/language.js', languages: ['ro'] }).redirect,
    'https://example.com/site/ro/index.html');
});

test('project and privacy URLs do not auto-redirect', () => {
  for (const page of ['kerfloom.html', 'plate-privacy.html', 'ro/kerfloom.html']) {
    assert.equal(visit({ url: `https://zandaulion.com/${page}`, lang: page.startsWith('ro/') ? 'ro' : 'en-US',
      home: false, languages: ['fr-FR'], saved: 'ar' }).redirect, undefined);
  }
});

test('language selection preserves the current project section', () => {
  const events = {};
  const link = { href: 'https://zandaulion.com/de/bpdigitizer.html', dataset: { language: 'de-DE' },
    addEventListener: (name, handler) => { events[name] = handler; } };
  const result = visit({ url: 'https://zandaulion.com/fr/bpdigitizer.html#web-version',
    lang: 'fr-FR', home: false, languageLinks: [link] });
  events.click();
  assert.equal(link.href, 'https://zandaulion.com/de/bpdigitizer.html#web-version');
  assert.equal(result.writes.at(-1), 'de-DE');
});
