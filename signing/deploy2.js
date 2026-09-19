/* Deploy 2: opening animation, accessible navigation, gallery and countdown. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const intro = document.getElementById('intro');
  const openButton = document.getElementById('openInvite');
  const skipButton = document.getElementById('skipIntro');
  const heroTitle = document.getElementById('heroHeading');
  const sections = [...document.querySelectorAll('.site-header, main, .site-footer')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const key = 'bd-deploy2-card-opened';
  const forcePreview = new URLSearchParams(location.search).get('previewIntro') === '1';
  let visited = false;
  try { visited = sessionStorage.getItem(key) === 'yes'; } catch (_) {}
  const deepLink = !!location.hash && location.hash !== '#home';
  let finished = false;
  let opening = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    intro.hidden = true;
    intro.classList.remove('opening', 'exiting');
    document.body.classList.remove('intro-locked');
    sections.forEach(el => { el.inert = false; });
    try { sessionStorage.setItem(key, 'yes'); } catch (_) {}
    heroTitle?.setAttribute('tabindex', '-1');
    heroTitle?.focus({preventScroll:true});
  };
  const dismiss = animate => {
    if (opening || finished) return;
    opening = true;
    openButton.disabled = true;
    if (!animate || reducedMotion) { finish(); return; }
    intro.classList.add('opening');
    window.setTimeout(() => intro.classList.add('exiting'), 1270);
    window.setTimeout(finish, 1950);
  };
  if (!deepLink && (forcePreview || !visited)) {
    sections.forEach(el => { el.inert = true; });
    intro.hidden = false;
    document.body.classList.add('intro-locked');
    openButton.focus({preventScroll:true});
    openButton.addEventListener('click', () => dismiss(true));
    skipButton.addEventListener('click', () => dismiss(false));
    intro.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); dismiss(false); }
      if (event.key !== 'Tab') return;
      if (event.shiftKey && document.activeElement === openButton) { event.preventDefault(); skipButton.focus(); }
      else if (!event.shiftKey && document.activeElement === skipButton) { event.preventDefault(); openButton.focus(); }
    });
  }
  const menuButton = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const closeMenu = () => { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open menu'); };
  menuButton.addEventListener('click', () => {
    const show = mobileNav.hidden;
    mobileNav.hidden = !show;
    menuButton.setAttribute('aria-expanded', String(show));
    menuButton.setAttribute('aria-label', show ? 'Close menu' : 'Open menu');
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), {threshold:0.09});
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));
  const dialog = document.getElementById('photoDialog');
  const largePhoto = document.getElementById('largePhoto');
  const closeButton = document.getElementById('closePhoto');
  let lastTrigger = null;
  const closePhoto = () => { if (dialog.hidden) return; dialog.hidden = true; largePhoto.removeAttribute('src'); lastTrigger?.focus(); };
  document.querySelectorAll('.gallery-photo').forEach(button => button.addEventListener('click', () => {
    lastTrigger = button;
    largePhoto.src = button.dataset.photo;
    largePhoto.alt = button.dataset.alt || 'Gallery photo';
    dialog.hidden = false;
    closeButton.focus();
  }));
  closeButton.addEventListener('click', closePhoto);
  dialog.addEventListener('click', event => { if (event.target === dialog) closePhoto(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closePhoto(); });
  const target = new Date('2026-09-24T17:00:00+10:00').getTime();
  const pad = n => String(n).padStart(2,'0');
  function tick() {
    let left = Math.max(0, target - Date.now());
    const days = Math.floor(left / 86400000); left %= 86400000;
    const hours = Math.floor(left / 3600000); left %= 3600000;
    const minutes = Math.floor(left / 60000); left %= 60000;
    const seconds = Math.floor(left / 1000);
    [['days',days],['hours',hours],['minutes',minutes],['seconds',seconds]].forEach(([id,value]) => {
      const el = document.getElementById(id); if (el) el.textContent = pad(value);
    });
  }
  tick(); window.setInterval(tick,1000);
})();
/* Load the optional Nepali-themed overlay refinements after the existing page initialises. */
(() => {
  const script = document.createElement('script');
  script.src = './deploy3-nepali.js?v=20260919-ganesh-1';
  script.async = false;
  document.head.append(script);
})();