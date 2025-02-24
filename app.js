lucide.createIcons();
// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('active');
  menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
  menuToggle.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  lucide.createIcons();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu if open
      mobileMenu.classList.remove('active');
      menuIcon.setAttribute('data-lucide', 'menu');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      lucide.createIcons();
    }
  });
});

// Intersection Observer for animations
const animateElements = document.querySelectorAll('.animate-fade-up');

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(element => {
  animateOnScroll.observe(element);
});

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.style.boxShadow = 'var(--shadow)';
    return;
  }
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling down & past navbar
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    navbar.style.transform = 'translateY(0)';
    navbar.style.boxShadow = 'var(--shadow-md)';
  }
  
  lastScroll = currentScroll;
});

// Cookie consent
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');

// Show cookie consent if not accepted
if (!localStorage.getItem('cookiesAccepted')) {
  setTimeout(() => {
    cookieConsent.classList.add('active');
  }, 2000);
}

acceptCookies.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieConsent.classList.remove('active');
});

// Form validation for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', () => {
    // Example validation - replace with actual form handling
    const confirmed = confirm('Start your 7-day free trial?');
    if (confirmed) {
      // Handle sign up process
      alert('Thank you! Check your email for next steps.');
    }
  });
});

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
  // Lazy load images that are off screen
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src; // Trigger load
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
});