/**
 * Peninsula de Bataan Resort Hotel — script.js
 * Handles: navbar scroll, mobile menu, form validation, modal, toast, smooth scroll
 * Ready for backend integration — see TODO comments throughout
 */

'use strict';

/* =================================================================
   CONSTANTS & STATE
   ================================================================= */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const loginModal  = document.getElementById('loginModal');
const toast       = document.getElementById('toast');
const yearSpan    = document.getElementById('year');

// Set current year in footer
if (yearSpan) yearSpan.textContent = new Date().getFullYear();


/* =================================================================
   NAVBAR — scroll effect
   ================================================================= */
function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run on load


/* =================================================================
   MOBILE MENU — hamburger toggle
   ================================================================= */
hamburger.addEventListener('click', function () {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});


/* =================================================================
   SMOOTH SCROLLING — anchor links
   ================================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navH = navbar.offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* =================================================================
   TOAST NOTIFICATION HELPER
   ================================================================= */
let toastTimer = null;

function showToast(message, type = 'info') {
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}


/* =================================================================
   FORM VALIDATION HELPERS
   ================================================================= */

/**
 * Sets an error on an input field.
 * @param {HTMLElement} input
 * @param {HTMLElement} errorEl
 * @param {string} message
 */
function setError(input, errorEl, message) {
  input.classList.add('invalid');
  if (errorEl) errorEl.textContent = message;
}

/**
 * Clears error state on an input field.
 */
function clearError(input, errorEl) {
  input.classList.remove('invalid');
  if (errorEl) errorEl.textContent = '';
}

/**
 * Validates an email format.
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* =================================================================
   BOOKING FORM — validation + submission
   ================================================================= */


/* =================================================================
   CONTACT FORM — validation + submission
   ================================================================= */

  


/* =================================================================
   LOGIN MODAL //no submission + validation yet, just UI controls
   ================================================================= */
  // Modal controls
function openLoginModal() {
  document.getElementById('loginModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('active');
  document.body.style.overflow = '';
}
// Close when clicking the dark overlay
document.getElementById('loginModal').addEventListener('click', function(e) {
  if (e.target === this) closeLoginModal();
});
// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLoginModal();
});
// Toggle password visibility
function togglePassword() {
  const pw = document.getElementById('loginPassword');
  const icon = document.getElementById('eyeIcon');
  if (pw.type === 'password') {
    pw.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    pw.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

/* =================================================================
   REGISTER MODAL //no submission + validation yet, just UI controls
   ================================================================= */

   // Register modal controls
function openRegisterModal() {
  document.getElementById('registerModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeRegisterModal() {
  document.getElementById('registerModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Switch between modals
function switchToRegister() {
  closeLoginModal();
  setTimeout(() => openRegisterModal(), 150);
}
function switchToLogin() {
  closeRegisterModal();
  setTimeout(() => openLoginModal(), 150);
}

// Close register modal on backdrop click
document.getElementById('registerModal').addEventListener('click', function(e) {
  if (e.target === this) closeRegisterModal();
});

// Toggle password visibility for register
function toggleRegPassword() {
  const pw = document.getElementById('regPassword');
  const icon = document.getElementById('regEyeIcon');
  if (pw.type === 'password') {
    pw.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    pw.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}
function toggleRegConfirmPassword() {
  const pw = document.getElementById('regConfirmPassword');
  const icon = document.getElementById('regConfirmEyeIcon');
  if (pw.type === 'password') {
    pw.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    pw.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// Register form submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const first = document.getElementById('regFirstName').value.trim();
  const last = document.getElementById('regLastName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirmPassword').value;
  const agreed = document.getElementById('agreeTerms').checked;

  if (!first || !last || !email || !password) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }
  if (password !== confirm) {
    showToast('Passwords do not match.', 'error');
    return;
  }
  if (!agreed) {
    showToast('Please agree to the Terms & Conditions.', 'error');
    return;
  }

  // ✅ Replace this block with your backend API call
  showToast('Account created successfully! Please sign in.', 'success');
  closeRegisterModal();
  setTimeout(() => openLoginModal(), 300);
  this.reset();
});

/* =================================================================
   SCROLL REVEAL — simple intersection observer for cards
   ================================================================= */
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply reveal animation to cards
document.querySelectorAll(
  '.room-card, .amenity-card, .event-card, .about-grid, .contact-grid'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  revealObserver.observe(el);
});

// Stagger children inside grids
document.querySelectorAll('.rooms-grid, .amenities-grid, .events-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.09}s`;
  });
});