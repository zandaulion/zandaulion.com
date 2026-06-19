document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const icon = mobileBtn.querySelector('i') || mobileBtn;
      if (navLinks.classList.contains('show')) {
        mobileBtn.innerHTML = '✕'; // Close icon
      } else {
        mobileBtn.innerHTML = '☰'; // Hamburger icon
      }
    });
  }

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

  // Inject Ko-fi floating button
  const kofiButton = document.createElement('a');
  kofiButton.href = 'https://ko-fi.com/zandaulion';
  kofiButton.target = '_blank';
  kofiButton.className = 'floating-kofi';
  kofiButton.setAttribute('aria-label', 'Support me on Ko-fi');
  kofiButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.4-.604-3.31.823-1.683 2.368-2.325 4.744-1.116l.099.052c.107.06.261.054.343-.015.084-.07.149-.241.149-.241.387-1.141 1.764-2.148 3.523-1.895 2.568.368 3.559 1.733 3.535 3.125-.018 1.054-.424 2.112-1.226 3.447h-.096zm10.026.177c-.496 1.879-1.745 2.127-1.745 2.127s-.766.126-1.57.173v-5.226c.723.047 1.442.067 1.442.067s1.378-.063 1.93.928c.518.932.443 1.931.443 1.931z" />
    </svg>
    Buy me a coffee
  `;
  document.body.appendChild(kofiButton);
});
