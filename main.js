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
        <img class="modal-content" id="modal-img">
      `;
      document.body.appendChild(modal);
    }
    
    const modalImg = document.getElementById('modal-img');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Open modal on click
    galleryImages.forEach(img => {
      img.addEventListener('click', function() {
        modal.classList.add('show');
        modalImg.src = this.src;
      });
    });
    
    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
    
    // Close modal on click outside image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
      }
    });
  }
});
