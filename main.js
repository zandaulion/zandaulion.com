// Theme management
const savedTheme = localStorage.getItem('theme') || 'system';

function applyTheme(theme) {
  let effectiveTheme = theme;
  if (theme === 'system') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  if (effectiveTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

applyTheme(savedTheme);

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
  if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
    applyTheme('system');
  }
});

class PortfolioHeader extends HTMLElement {
  connectedCallback() {
    const activePage = this.getAttribute('active-page') || 'index.html';
    const currentTheme = localStorage.getItem('theme') || 'system';
    
    let themeIcon = '💻';
    if (currentTheme === 'light') themeIcon = '☀️';
    if (currentTheme === 'dark') themeIcon = '🌙';
    
    this.innerHTML = `
      <header>
          <div class="container nav-container">
              <nav>
                  <div class="logo"><a href="index.html">Zandaulion</a></div>
                  <div class="nav-right" style="display: flex; align-items: center; gap: 24px; min-width: 0;">
                      <button id="theme-toggle" class="theme-btn" aria-label="Toggle Theme" style="background: none; border: none; color: var(--text-main); font-size: 1.2rem; cursor: pointer; transition: transform 0.3s; margin-left: auto;">
                        ${themeIcon}
                      </button>
                  </div>
              </nav>
          </div>
      </header>
    `;

    const themeToggle = this.querySelector('#theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = localStorage.getItem('theme') || 'system';
        let newTheme = 'system';
        
        if (current === 'system') {
          newTheme = 'light';
          themeToggle.innerHTML = '☀️';
        } else if (current === 'light') {
          newTheme = 'dark';
          themeToggle.innerHTML = '🌙';
        } else {
          newTheme = 'system';
          themeToggle.innerHTML = '💻';
        }

        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
        
        // Brief rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          themeToggle.style.transition = 'none';
          themeToggle.style.transform = 'rotate(0deg)';
          setTimeout(() => themeToggle.style.transition = 'transform 0.3s', 10);
        }, 300);
      });
    }
  }
}
customElements.define('portfolio-header', PortfolioHeader);

class PortfolioFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
          <div class="container">
              <div class="footer-links">
                  <a href="bpdigitizer-privacy.html">BP Digitizer Privacy</a>
                  <a href="palebluedot-privacy.html">Pale Blue Dot Privacy</a>
                  <a href="gravitywarp-privacy.html">Gravity Warp Privacy</a>
                  <a href="gravitygarden-privacy.html">Gravity Garden Privacy</a>
                  <a href="orbitpuzzles-privacy.html">OrbitPuzzles Privacy</a>
                  <a href="gravitytdg-privacy.html">GravityTDG Privacy</a>
              </div>
              <p>&copy; <span id="current-year">${new Date().getFullYear()}</span> Zandaulion. All rights reserved.</p>
              <p style="margin-top: 10px; color: var(--text-muted);"><a href="mailto:zandaulion@gmail.com" style="color: var(--accent-blue); text-decoration: none;">zandaulion@gmail.com</a></p>
          </div>
      </footer>
    `;
  }
}
customElements.define('portfolio-footer', PortfolioFooter);

document.addEventListener('DOMContentLoaded', () => {

  // Scroll Reveal Animation
  const reveals = document.querySelectorAll('.reveal');

  function reveal() {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  }

  window.addEventListener('scroll', reveal);
  // Trigger once on load
  reveal();

  // Set current year in footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Image Modal (Lightbox) Logic
  const galleryImages = document.querySelectorAll('.gallery-img');
  
  if (galleryImages.length > 0) {
    // Check if modal exists, if not, create it
    let modal = document.getElementById('image-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'image-modal';
      modal.className = 'modal';
      modal.innerHTML = `
        <span class="modal-close">&times;</span>
        <span class="modal-prev">&#10094;</span>
        <span class="modal-next">&#10095;</span>
        <img class="modal-content" id="modal-img">
      `;
      document.body.appendChild(modal);
    }
    
    const modalImg = document.getElementById('modal-img');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    
    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) {
            currentIndex = galleryImages.length - 1;
        } else if (index >= galleryImages.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        modalImg.src = galleryImages[currentIndex].src;
    }

    // Open modal on click
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', function() {
        modal.classList.add('show');
        showImage(index);
      });
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });

    // Navigation buttons
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('show')) return;
      if (e.key === 'Escape') modal.classList.remove('show');
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    // Swipe navigation
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) showImage(currentIndex + 1); // swipe left
        if (touchEndX > touchStartX + 50) showImage(currentIndex - 1); // swipe right
    }
  }


});
