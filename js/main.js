/**
 * RADHA 2027 — Shared Client Scripts
 * Department of Information Technology, Delhi Technological University (DTU)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle with Accessible ARIA Controls
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  // 2. Technical Track Search / Filter (on call-for-papers.html)
  const trackSearchInput = document.getElementById('track-search-input');
  const trackCards = document.querySelectorAll('.track-card');

  if (trackSearchInput && trackCards.length > 0) {
    trackSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      trackCards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'flex';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      const countDisplay = document.getElementById('track-search-count');
      if (countDisplay) {
        if (query) {
          countDisplay.textContent = `Showing ${matchCount} of ${trackCards.length} tracks`;
          countDisplay.style.display = 'block';
        } else {
          countDisplay.style.display = 'none';
        }
      }
    });
  }

  // 3. Committee Accordion Toggles
  const committeeToggles = document.querySelectorAll('.committee-toggle-btn');
  committeeToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);
      if (panel) {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        panel.style.display = isExpanded ? 'none' : 'grid';
        
        const icon = btn.querySelector('.toggle-icon');
        if (icon) {
          icon.textContent = isExpanded ? '+' : '−';
        }
      }
    });
  });
});
