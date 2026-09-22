// Shared workshop chrome and gallery, used only by project pages.
// Privacy notices intentionally keep their existing files and presentation.
const projectRoot = new URL('./', document.currentScript.src);
const projectLocale = window.ZandaulionLocales.find(locale => locale.lang === document.documentElement.lang) || window.ZandaulionLocales[0];
const projectHome = new URL(projectLocale.path ? `${projectLocale.path}/index.html` : 'index.html?lang=en-US', projectRoot).href;
const projectCopy = projectLocale.ui;
const safeText = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
class WorkshopHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<a class="skip-link" href="#main">${safeText(projectLocale.skip)}</a>
      <header class="site-header wrap">
        <a class="brand" href="${projectHome}" aria-label="${safeText(projectLocale.home)}"><img src="${new URL('assets/brand/lion-light-v2.png', projectRoot).href}" alt="" width="43" height="43">Zandaulion<span aria-hidden="true" style="color:var(--orange)">.</span></a>
        <nav aria-label="${safeText(projectLocale.nav)}"><a href="${projectHome}#collection">${safeText(projectLocale.collection)}</a><a href="${projectHome}#about">${safeText(projectLocale.about)}</a><a class="nav-contact" href="mailto:zandaulion@gmail.com">${safeText(projectLocale.hello)} ↗</a></nav>
      </header>`;
  }
}
customElements.define('portfolio-header', WorkshopHeader);

class WorkshopFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer class="footer wrap">
      <p>© ${new Date().getFullYear()} Zandaulion · <a href="${projectHome}#collection">${safeText(projectCopy.explore)} ↗</a></p>
      <a href="https://ko-fi.com/P7K6214YH8" target="_blank" rel="noopener noreferrer">${safeText(projectLocale.coffee)} ↗</a>
      <details><summary>${safeText(projectLocale.privacy)}</summary><div class="privacy-links">
        <a href="${new URL('plate-privacy.html', projectRoot).href}" hreflang="en-US">${safeText(projectLocale.formerly)}</a><a href="${new URL('bitey-privacy.html', projectRoot).href}" hreflang="en-US">Bitey</a><a href="${new URL('bpdigitizer-privacy.html', projectRoot).href}" hreflang="en-US">BP Digitizer</a><a href="${new URL('palebluedot-privacy.html', projectRoot).href}" hreflang="en-US">Pale Blue Dot</a><a href="${new URL('gravitywarp-privacy.html', projectRoot).href}" hreflang="en-US">Gravity Warp</a><a href="${new URL('gravitygarden-privacy.html', projectRoot).href}" hreflang="en-US">Gravity Garden</a><a href="${new URL('orbitpuzzles-privacy.html', projectRoot).href}" hreflang="en-US">OrbitPuzzles</a><a href="${new URL('gravitytdg-privacy.html', projectRoot).href}" hreflang="en-US">GravityTDG</a>
      </div></details></footer>`;
  }
}
customElements.define('portfolio-footer', WorkshopFooter);

const gallery = [...document.querySelectorAll('.gallery-img')];
if (gallery.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'gallery-dialog';
  dialog.setAttribute('aria-label', projectCopy.viewer);
  dialog.innerHTML = `<div class="gallery-toolbar"><p class="gallery-count" role="status" aria-live="polite"></p><button type="button" class="gallery-close" aria-label="${safeText(projectCopy.closeLabel)}">${safeText(projectCopy.close)}</button></div>
    <figure><img alt=""><figcaption></figcaption></figure>
    <div class="gallery-navigation"><button type="button" class="gallery-previous" aria-label="${safeText(projectCopy.previousLabel)}">${safeText(projectCopy.previous)}</button><button type="button" class="gallery-next" aria-label="${safeText(projectCopy.nextLabel)}">${safeText(projectCopy.next)}</button></div>`;
  document.body.append(dialog);
  const fullImage = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  const counter = dialog.querySelector('.gallery-count');
  let current = 0;
  let previousOverflow = '';
  const show = index => {
    current = (index + gallery.length) % gallery.length;
    fullImage.src = gallery[current].src;
    fullImage.alt = gallery[current].alt;
    caption.textContent = gallery[current].alt;
    counter.textContent = projectCopy.count.replace('{n}', new Intl.NumberFormat(projectLocale.lang).format(current + 1)).replace('{total}', new Intl.NumberFormat(projectLocale.lang).format(gallery.length));
  };
  gallery.forEach((img, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-open';
    button.setAttribute('aria-label', `${projectCopy.enlarge}: ${img.alt || `${projectCopy.image} ${index + 1}`}`);
    img.before(button);
    button.append(img);
    button.addEventListener('click', () => {
      show(index);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  });
  dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.gallery-previous').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.gallery-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  let touchStart;
  fullImage.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  fullImage.addEventListener('touchend', event => {
    if (touchStart === undefined) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 50) show(current + (distance < 0 ? 1 : -1));
    touchStart = undefined;
  }, { passive: true });
  dialog.querySelector('.gallery-navigation').hidden = gallery.length < 2;
}
