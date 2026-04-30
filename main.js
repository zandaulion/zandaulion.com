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
});
