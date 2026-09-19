/* The opening is decorative only: navigation, gallery, map and RSVP keep their own working code. */
(() => {
  'use strict';
  const intro = document.getElementById('invitationIntro');
  const openButton = document.getElementById('openInvitation');
  const skipButton = document.getElementById('skipInvitation');
  if (!intro || !openButton || !skipButton) return;
  const storageKey = 'bisesh-debansi-card-opened-v1';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let alreadyOpened = false;
  try { alreadyOpened = sessionStorage.getItem(storageKey) === 'yes'; } catch (_) { /* private browsing can block storage */ }
  // Deep links (particularly RSVP and the map) should never be blocked by the opening animation.
  if (alreadyOpened || (location.hash && location.hash !== '#home')) return;
  intro.hidden = false;
  document.body.classList.add('invitation-locked');
  openButton.focus({ preventScroll: true });
  let finishing = false;
  function complete() {
    if (intro.hidden) return;
    intro.hidden = true;
    document.body.classList.remove('invitation-locked');
    try { sessionStorage.setItem(storageKey, 'yes'); } catch (_) { /* continue normally */ }
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.setAttribute('tabindex', '-1');
    heroTitle?.focus({ preventScroll: true });
  }
  function dismiss(animate) {
    if (finishing) return;
    finishing = true;
    openButton.disabled = true;
    if (!animate || reducedMotion) { complete(); return; }
    intro.classList.add('is-opening');
    window.setTimeout(() => intro.classList.add('is-exiting'), 1150);
    window.setTimeout(complete, 1830);
  }
  openButton.addEventListener('click', () => dismiss(true));
  skipButton.addEventListener('click', () => dismiss(false));
  intro.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); dismiss(false); }
    if (event.key !== 'Tab') return;
    // Keep keyboard focus on the two visible intro controls while the intro is open.
    const first = openButton;
    const last = skipButton;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
})();
