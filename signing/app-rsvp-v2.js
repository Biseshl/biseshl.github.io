// Signing-day invitation: navigation, countdown, gallery, and Google Sheets RSVP.
(() => {
  const menu = document.getElementById('menu');
  const links = document.getElementById('links');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const opened = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(opened));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }
  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    reveal.forEach(element => observer.observe(element));
  } else {
    reveal.forEach(element => element.classList.add('visible'));
  }
  const target = new Date('2026-09-24T17:00:00+10:00').getTime();
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    let remaining = Math.max(0, target - Date.now());
    const days = Math.floor(remaining / 86400000); remaining %= 86400000;
    const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
    const minutes = Math.floor(remaining / 60000); remaining %= 60000;
    const seconds = Math.floor(remaining / 1000);
    [['days', days], ['hours', hours], ['minutes', minutes], ['seconds', seconds]]
      .forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = pad(value);
      });
  }
  tick();
  setInterval(tick, 1000);
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImg');
  if (lightbox && lightboxImage) {
    document.querySelectorAll('.shot').forEach(button => button.addEventListener('click', () => {
      lightboxImage.src = button.dataset.img;
      lightbox.classList.add('open');
    }));
    document.getElementById('close')?.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.classList.remove('open'); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') lightbox.classList.remove('open'); });
  }
  // Load the optional card reveal after the existing page has initialised.
  const opening = document.createElement('script');
  opening.src = './invitation-opening-2026.js?v=card-open-2';
  opening.defer = true;
  document.body.appendChild(opening);
  // Keep the legacy inline RSVP handler for compatibility; the confirmed working
  // RSVP lives on rsvp-direct-2026.html and is NOT replaced by the intro.
  const endpoint = 'https://script.google.com/macros/s/AKfycbxORudVhtZl5LUpTDf8tfaVWN_OLsJoOPfssKaO03JLMMZBtgry0iHrAn5uU_BzK6eB2A/exec';
  const form = document.getElementById('rsvpForm');
  if (!form) return;
  const submit = form.querySelector('button[type="submit"]');
  const status = document.getElementById('status');
  const nameInput = document.getElementById('guestName');
  const messageInput = document.getElementById('message');
  if (!submit || !status || !nameInput || !messageInput) return;
  nameInput.maxLength = 150;
  messageInput.maxLength = 1000;
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  let sending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const name = nameInput.value.trim();
    const attendance = document.getElementById('attendance').value;
    const guests = document.getElementById('guests').value;
    const message = messageInput.value.trim();
    if (!name || name.length > 150 || message.length > 1000 ||
        !["Yes, we'll be there!", "Sorry, we can't make it"].includes(attendance) ||
        !/^[1-5]$/.test(guests)) {
      status.textContent = 'Please check your RSVP details and try again.';
      return;
    }
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending RSVP…';
    status.textContent = 'Sending your response…';
    try {
      const body = new URLSearchParams({ name, attendance, guests, message });
      // Opaque cross-origin response cannot confirm a spreadsheet write.
      await fetch(endpoint, {method:'POST', mode:'no-cors', body, redirect:'follow', cache:'no-store'});
      status.textContent = 'Your response was sent for processing ♡ Please check our guest list if you need confirmation.';
      submit.textContent = 'Send RSVP again ♡';
    } catch (_) {
      status.textContent = 'The RSVP could not be sent. Check your connection and try again.';
      submit.textContent = 'Try again ♡';
    } finally {
      sending = false;
      submit.disabled = false;
    }
  });
})();
