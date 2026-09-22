// The collection remains readable and navigable without JavaScript.
const cards = [...document.querySelectorAll('.collection-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#project-search');
const count = document.querySelector('#project-count');
const empty = document.querySelector('#empty-state');
let category = 'all';

function filterProjects() {
  const normalize = text => text.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase(document.documentElement.lang);
  const query = normalize(search.value.trim());
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const matchesQuery = normalize(card.textContent).includes(query);
    card.hidden = !(matchesCategory && matchesQuery);
    if (!card.hidden) visible++;
  });
  const number = new Intl.NumberFormat(document.documentElement.lang);
  count.textContent = `${count.dataset.label}: ${number.format(visible)} / ${number.format(cards.length)}`;
  empty.hidden = visible !== 0;
}

document.querySelector('.collection-controls').hidden = false;
filters.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.filter;
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  filterProjects();
}));
search.addEventListener('input', filterProjects);
document.querySelector('#clear-filters').addEventListener('click', () => {
  category = 'all';
  search.value = '';
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter.dataset.filter === 'all')));
  filterProjects();
  search.focus();
});

document.querySelector('#surprise-me').hidden = false;
document.querySelector('#surprise-me').addEventListener('click', () => {
  const choices = cards.filter(card => !card.hidden);
  const pool = choices.length ? choices : cards;
  window.location.href = pool[Math.floor(Math.random() * pool.length)].querySelector('a').href;
});
document.querySelector('#workshop-year').textContent = new Date().getFullYear();
filterProjects();
