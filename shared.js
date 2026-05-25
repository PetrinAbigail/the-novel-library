/* =====================================================
   The Novel Library — shared.js
   Handles: hamburger nav drawer, book search/filter,
            newsletter form feedback
   ===================================================== */

(function () {
  'use strict';

  /* ── Hamburger / Mobile Drawer ─────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.querySelector('.nav-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when a link inside it is clicked
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close drawer on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Book Search / Filter ──────────────────────────── */
  const searchInput = document.getElementById('bookSearch');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      const cards = document.querySelectorAll('.book-card');

      cards.forEach(function (card) {
        const title  = (card.querySelector('.book-title')  || {}).textContent || '';
        const author = (card.querySelector('.book-author') || {}).textContent || '';
        const genre  = (card.querySelector('.book-genre')  || {}).textContent || '';

        const match = (title + author + genre).toLowerCase().includes(query);
        card.style.display = match ? '' : 'none';
      });
    });
  }

  /* ── Newsletter Form ───────────────────────────────── */
  const nlForm = document.querySelector('.nl-form');

  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = nlForm.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.value) return;

      const btn = nlForm.querySelector('button');
      const originalText = btn ? btn.textContent : '';

      if (btn) {
        btn.textContent = 'Subscribed! ✓';
        btn.disabled = true;
        btn.style.background = '#2e7d32';
      }
      emailInput.value = '';

      // Reset button after 3 s
      setTimeout(function () {
        if (btn) {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }
      }, 3000);
    });
  }

  /* ── Bootstrap Tooltips (opt-in) ──────────────────── */
  // Initialise any elements that use data-bs-toggle="tooltip"
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
      new bootstrap.Tooltip(el);
    });
  }

})();
