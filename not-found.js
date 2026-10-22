// Pages serves this one file for every missing route, including locale paths.
(() => {
  'use strict';
  const sections = [...document.querySelectorAll('[data-error-language]')];
  const match = tag => typeof tag === 'string' && (
    sections.find(section => section.lang.toLowerCase() === tag.toLowerCase()) ||
    sections.find(section => section.lang.split('-')[0] === tag.toLowerCase().split('-')[0])
  );
  let saved;
  try { saved = localStorage.getItem('zandaulion-language'); } catch { /* Native language links still work. */ }
  const browser = (navigator.languages?.length ? navigator.languages : [navigator.language]).map(match).find(Boolean);
  const selected = sections.find(section => section.dataset.path && location.pathname.startsWith(`/${section.dataset.path}/`)) ||
    match(saved) || browser || sections[0];
  for (const section of sections) section.hidden = section !== selected;
  document.documentElement.lang = selected.lang;
  document.documentElement.dir = selected.dir;
  document.title = `${selected.dataset.title} — Zandaulion`;
  document.querySelector('.skip-link').textContent = selected.dataset.skip;
  document.querySelector('.error-languages').setAttribute('aria-label', selected.dataset.languageLabel);
  const brand = document.querySelector('.brand');
  brand.href = selected.querySelector('.solid-link').href;
  brand.setAttribute('aria-label', selected.dataset.homeLabel);
})();
