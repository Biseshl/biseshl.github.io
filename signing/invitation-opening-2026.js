/* The opening is decorative only. Existing navigation, gallery, map and Google Sheets RSVP remain untouched. */
(() => {
  'use strict';
  const key = 'bd-nepali-invitation-opened-v2';
  let seen = false;
  try { seen = sessionStorage.getItem(key) === 'yes'; } catch (_) {}
  // Do not cover section links or a returning visitor's page.
  if (seen || (location.hash && location.hash !== '#home')) return;
  const intro = document.createElement('div');
  intro.className = 'invitation-intro';
  intro.id = 'invitationIntro';
  intro.setAttribute('role', 'dialog');
  intro.setAttribute('aria-modal', 'true');
  intro.setAttribute('aria-label', 'Open Bisesh and Debansi invitation');
  intro.innerHTML = `
    <div class="intro-ambient" aria-hidden="true"></div>
    <p class="intro-topline">A CELEBRATION OF LOVE · FAMILY · TOGETHERNESS</p>
    <span class="intro-petal" style="--x:7%;--dur:10s;--delay:-2s" aria-hidden="true"></span>
    <span class="intro-petal" style="--x:28%;--dur:14s;--delay:-8s" aria-hidden="true"></span>
    <span class="intro-petal" style="--x:67%;--dur:12s;--delay:-6s" aria-hidden="true"></span>
    <span class="intro-petal" style="--x:91%;--dur:16s;--delay:-9s" aria-hidden="true"></span>
    <div class="intro-card">
      <div class="intro-inside" aria-hidden="true"><img src="./assets/ocean-hq.jpg" alt=""><strong>A new chapter begins ♡</strong><p>24 SEPTEMBER 2026</p></div>
      <div class="intro-door left" aria-hidden="true"><span class="door-motif">✺</span></div>
      <div class="intro-door right" aria-hidden="true"><span class="door-motif">✺</span></div>
      <div class="intro-cover">
        <p class="intro-mark" aria-hidden="true">✺ &nbsp; ♡ &nbsp; ✺</p>
        <p class="intro-nepali" lang="ne">दुई मन, एक सुन्दर यात्रा</p>
        <h2>Bisesh <em>&amp;</em> Debansi</h2>
        <p class="intro-subtitle">Our Signing Day</p>
        <div class="intro-rule" aria-hidden="true"></div>
        <p class="intro-invite-text">With love, we invite you to celebrate this beautiful new chapter with us.</p>
        <button class="intro-open" id="openInvitation" type="button">✧ &nbsp; Open Invitation &nbsp; ✧</button>
        <p class="intro-date">THURSDAY · 24 SEPTEMBER 2026</p>
      </div>
    </div>
    <p class="intro-bottomline">TRADITIONAL ROOTS · A BEAUTIFUL TOMORROW</p>
    <button class="intro-skip" id="skipInvitation" type="button">Skip intro ↗</button>`;
  document.body.prepend(intro);
  document.body.classList.add('invitation-locked');
  const openButton = document.getElementById('openInvitation');
  const skipButton = document.getElementById('skipInvitation');
  openButton.focus({preventScroll:true});
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finishing = false;
  function complete() {
    intro.remove();
    document.body.classList.remove('invitation-locked');
    try { sessionStorage.setItem(key, 'yes'); } catch (_) {}
    const heading = document.getElementById('hero-title');
    if (heading) { heading.setAttribute('tabindex','-1'); heading.focus({preventScroll:true}); }
  }
  function dismiss(animated) {
    if (finishing) return;
    finishing = true;
    openButton.disabled = true;
    if (!animated || reducedMotion) {complete(); return;}
    intro.classList.add('is-opening');
    setTimeout(() => intro.classList.add('is-exiting'), 1150);
    setTimeout(complete, 1830);
  }
  openButton.addEventListener('click', () => dismiss(true));
  skipButton.addEventListener('click', () => dismiss(false));
  intro.addEventListener('keydown', event => {
    if (event.key === 'Escape') {event.preventDefault(); dismiss(false);}
    if (event.key !== 'Tab') return;
    if (event.shiftKey && document.activeElement === openButton) {event.preventDefault();skipButton.focus();}
    else if (!event.shiftKey && document.activeElement === skipButton) {event.preventDefault();openButton.focus();}
  });
})();
