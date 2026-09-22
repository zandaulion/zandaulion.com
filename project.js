// Shared workshop chrome and gallery, used only by project pages.
// Privacy notices intentionally keep their existing files and presentation.
class WorkshopHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header wrap">
        <a class="brand" href="index.html" aria-label="Zandaulion home"><img src="assets/brand/lion-light-v2.png" alt="" width="43" height="43">Zandaulion<span aria-hidden="true" style="color:var(--orange)">.</span></a>
        <nav aria-label="Main navigation"><a href="index.html#collection">The collection</a><a href="index.html#about">About</a><a class="nav-contact" href="mailto:zandaulion@gmail.com">Say hello ↗</a></nav>
      </header>`;
  }
}
customElements.define('portfolio-header', WorkshopHeader);

class WorkshopFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer class="footer wrap">
      <p>© ${new Date().getFullYear()} Zandaulion · <a href="index.html#collection">Keep exploring ↗</a></p>
      <a href="https://ko-fi.com/P7K6214YH8" target="_blank" rel="noopener noreferrer">Buy me a coffee ↗</a>
      <details><summary>App privacy policies</summary><div class="privacy-links">
        <a href="plate-privacy.html">Bitey (formerly Plate)</a><a href="bitey-privacy.html">Bitey</a><a href="bpdigitizer-privacy.html">BP Digitizer</a><a href="palebluedot-privacy.html">Pale Blue Dot</a><a href="gravitywarp-privacy.html">Gravity Warp</a><a href="gravitygarden-privacy.html">Gravity Garden</a><a href="orbitpuzzles-privacy.html">OrbitPuzzles</a><a href="gravitytdg-privacy.html">GravityTDG</a>
      </div></details></footer>`;
  }
}
customElements.define('portfolio-footer', WorkshopFooter);

const gallery = [...document.querySelectorAll('.gallery-img')];
if (gallery.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'gallery-dialog';
  dialog.setAttribute('aria-label', 'Project image viewer');
  dialog.innerHTML = `<div class="gallery-toolbar"><p class="gallery-count" role="status" aria-live="polite"></p><button type="button" class="gallery-close" aria-label="Close image viewer">Close ×</button></div>
    <figure><img alt=""><figcaption></figcaption></figure>
    <div class="gallery-navigation"><button type="button" class="gallery-previous" aria-label="Previous image">← Previous</button><button type="button" class="gallery-next" aria-label="Next image">Next →</button></div>`;
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
    counter.textContent = `Image ${current + 1} of ${gallery.length}`;
  };
  gallery.forEach((img, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-open';
    button.setAttribute('aria-label', `Enlarge: ${img.alt || `image ${index + 1}`}`);
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
