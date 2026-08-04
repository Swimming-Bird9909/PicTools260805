/* ============================================
   Main JS - Site-wide interactive behaviors
   Mobile nav, FAQ accordion, smooth scroll
   ============================================ */

(function () {
  'use strict';

  // === Mobile nav toggle ===
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    // Close nav when clicking a link (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // === FAQ accordion ===
  var faqBtns = document.querySelectorAll('.faq-q');
  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      // Close all others
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('open');
      });
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  // === Smooth scroll for anchor links (hash-based) ===
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerOffset = 80;
        var elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        var offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // === Scroll to top on logo click ===
  var logoLink = document.querySelector('.logo[href="index.html"], a[href="index.html"].logo');
  if (logoLink && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    // logo click goes to index.html — native behavior is fine
  }

  console.log('🦞 ImageFitly — site interactions ready.');
})();
