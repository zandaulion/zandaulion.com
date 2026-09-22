(() => {
'use strict';
const locales = window.ZandaulionLocales;

const root = new URL('./', document.currentScript.src);
// English needs an explicit marker because the root also detects first-visit language.
const homeURL = locale => new URL(locale.path ? `${locale.path}/index.html` : 'index.html?lang=en-US', root).href;
const languageKey = 'zandaulion-language';
let saved;
try { saved = localStorage.getItem(languageKey); } catch { /* Browsing still works without storage. */ }
const current = locales.find(locale => locale.lang === document.documentElement.lang) || locales[0];
const entryURL = new URL(location.href);
const requested = entryURL.searchParams.get('lang');
const isHome = Boolean(document.querySelector('#project-grid'));
const explicit = locales.find(locale => locale.lang === requested);
const stored = locales.find(locale => locale.lang === saved);

function browserLocale() {
  for (const language of navigator.languages?.length ? navigator.languages : [navigator.language]) {
    if (typeof language !== 'string') continue;
    const tag = language.toLowerCase();
    const match = locales.find(locale => locale.lang.toLowerCase() === tag) ||
      locales.find(locale => locale.lang.split('-')[0].toLowerCase() === tag.split('-')[0]);
    if (match) return match;
  }
  return locales[0];
}

// Only the unlocalized homepage selects a language automatically. Project and
// privacy URLs stay put; a locale path always wins over storage or query hints.
if (isHome && current.lang === 'en-US' &&
    (entryURL.pathname === root.pathname || entryURL.pathname === new URL('index.html', root).pathname)) {
  const selected = explicit || stored || browserLocale();
  if (selected.lang !== current.lang) {
    const destination = new URL(homeURL(selected));
    destination.search = entryURL.search;
    destination.searchParams.delete('lang');
    destination.hash = entryURL.hash;
    location.replace(destination.href);
    return;
  }
}

const preference = isHome || current.lang !== 'en-US' ? current : explicit || stored || current;
const filename = location.pathname.split('/').pop();
const projectURL = locale => {
  const translated = locale.projects.includes(filename);
  const url = new URL(translated ? `${locale.path}/${filename}` : filename, root);
  url.hash = location.hash;
  if (!translated) url.searchParams.set('lang', locale.lang);
  return url.href;
};

function remember(lang) {
  try { localStorage.setItem(languageKey, lang); } catch { /* Language links need no storage. */ }
}

// Direct links always keep their requested language. Project navigation remembers the last choice.
if (isHome || current.lang !== 'en-US') remember(current.lang);
if (isHome) { /* Static homepage already includes its language picker. */ }
else {
  const header = document.querySelector('.site-header');
  if (header) {
    const picker = document.createElement('details');
    picker.className = 'language-picker';
    const summary = document.createElement('summary');
    summary.textContent = `◎ ${preference.name}`;
    summary.lang = preference.lang;
    summary.dir = preference.dir;
    summary.setAttribute('aria-label', preference.language);
    const list = document.createElement('nav');
    list.className = 'language-list';
    list.setAttribute('aria-label', preference.language);
    for (const locale of locales) {
      const link = document.createElement('a');
      link.href = projectURL(locale);
      link.lang = link.hreflang = locale.lang;
      link.dir = locale.dir;
      link.dataset.language = locale.lang;
      link.textContent = locale.name;
      if (locale.lang === preference.lang) link.setAttribute('aria-current', 'page');
      list.append(link);
    }
    picker.append(summary, list);
    header.append(picker);
    const nav = header.querySelector('nav:not(.language-list)');
    nav.classList.add('primary-nav');
    nav.lang = preference.lang;
    nav.dir = preference.dir;
    nav.setAttribute('aria-label', preference.nav);
    const links = nav.querySelectorAll('a');
    links[0].textContent = preference.collection;
    links[0].href = `${homeURL(preference)}#collection`;
    links[1].textContent = preference.about;
    links[1].href = `${homeURL(preference)}#about`;
    links[2].textContent = `${preference.hello} ↗`;
    header.querySelector('.brand').href = homeURL(preference);
    header.querySelector('.brand').setAttribute('aria-label', preference.home);
    if (current.lang === 'en-US' && preference.lang !== 'en-US') {
      const note = document.createElement('p');
      note.className = 'translation-note wrap';
      note.lang = preference.lang;
      note.dir = preference.dir;
      note.append(`${preference.english_page} `);
      const back = document.createElement('a');
      const available = preference.projects.includes(filename);
      back.href = available ? projectURL(preference) : homeURL(preference);
      back.textContent = available ? `${preference.name} →` : preference.return_home;
      note.append(back);
      header.after(note);
      document.querySelectorAll('.back-link, .related-projects .section-heading a, .footer p a').forEach(link => {
        link.href = `${homeURL(preference)}#collection`;
      });
    }
  }
}

// Keep project discovery in the selected language where a translation exists.
document.querySelectorAll('a[href]:not([data-language])').forEach(link => {
  const url = new URL(link.href);
  const page = url.pathname.slice(root.pathname.length);
  if (url.origin === root.origin && url.pathname.startsWith(root.pathname) && preference.projects.includes(page)) {
    link.href = new URL(`${preference.path}/${page}${url.hash}`, root).href;
    link.hreflang = preference.lang;
  }
});

document.querySelectorAll('[data-language]').forEach(link => {
  link.addEventListener('click', () => {
    remember(link.dataset.language);
    const destination = new URL(link.href);
    destination.hash = location.hash;
    link.href = destination.href;
  });
});
document.querySelectorAll('.language-picker').forEach(picker => {
  picker.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      picker.open = false;
      picker.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (!picker.contains(event.target)) picker.open = false;
  });
});

// Local-file storage can be isolated per document. Carry the choice to other
// project files explicitly so returning to a translated homepage still works.
if (root.protocol === 'file:') {
  const selected = isHome ? current : preference;
  document.querySelectorAll('a[href]:not([data-language])').forEach(link => {
    const url = new URL(link.href);
    if (url.protocol === 'file:' && url.pathname.startsWith(root.pathname) &&
        url.pathname.endsWith('.html') && !url.pathname.endsWith('/index.html') &&
        !url.pathname.endsWith('-privacy.html')) {
      url.searchParams.set('lang', selected.lang);
      link.href = url.href;
    }
  });
}
})();
