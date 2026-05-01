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
});
