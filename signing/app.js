// Invitation navigation and animations.
const menu = document.getElementById("menu");
const links = document.getElementById("links");
menu.addEventListener("click", () => links.classList.toggle("open"));
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
const io = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    io.unobserve(entry.target);
  }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Countdown and photo gallery.
const target = new Date("2026-09-24T17:00:00+10:00").getTime();
const pad = n => String(n).padStart(2, "0");
function tick() {
  let remaining = Math.max(0, target - Date.now());
  const days = Math.floor(remaining / 86400000);
  remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000);
  remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  remaining %= 60000;
  const seconds = Math.floor(remaining / 1000);
  document.getElementById("days").textContent = pad(days);
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}
tick();
setInterval(tick, 1000);
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImg");
document.querySelectorAll(".shot").forEach(button => button.addEventListener("click", () => {
  lightboxImage.src = button.dataset.img;
  lightbox.classList.add("open");
}));
document.getElementById("close").addEventListener("click", () => lightbox.classList.remove("open"));
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.classList.remove("open");
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") lightbox.classList.remove("open");
});

// RSVP: send a URL-encoded form POST to the Google Apps Script deployed by the hosts.
// Google Apps Script's cross-origin ContentService response cannot be read by a
// browser on GitHub Pages. A resolved no-cors request is NOT proof the row was
// saved, so the guest-facing status deliberately does not claim confirmation.
const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbxORudVhtZl5LUpTDf8tfaVWN_OLsJoOPfssKaO03JLMMZBtgry0iHrAn5uU_BzK6eB2A/exec";
const form = document.getElementById("rsvpForm");
const submitButton = form.querySelector('button[type="submit"]');
const status = document.getElementById("status");
const rsvpDescription = document.querySelector(".rsvp-copy > p:last-child");
if (rsvpDescription) rsvpDescription.textContent = "Please RSVP here. Your response will be sent directly to our guest list — no email needed.";
submitButton.textContent = "Send RSVP ♡";
status.setAttribute("role", "status");
status.setAttribute("aria-live", "polite");
form.querySelector("#guestName").maxLength = 150;
form.querySelector("#message").maxLength = 1000;
let sending = false;
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;

  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("message").value.trim();
  if (!name || name.length > 150 || message.length > 1000) {
    status.textContent = "Please check the name and message before submitting.";
    return;
  }
  if (!["Yes, we'll be there!", "Sorry, we can't make it"].includes(attendance) || !/^[1-5]$/.test(guests)) {
    status.textContent = "Please select your attendance and guest count.";
    return;
  }

  sending = true;
  submitButton.disabled = true;
  submitButton.textContent = "Sending RSVP…";
  status.textContent = "Sending your response to our guest list…";
  try {
    const body = new URLSearchParams({ name, attendance, guests, message });
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      redirect: "follow",
      cache: "no-store"
    });
    status.textContent = "Your RSVP has been sent for processing ♡ Please contact us if you need to confirm that it was recorded.";
    submitButton.textContent = "RSVP sent ♡";
  } catch (error) {
    status.textContent = "We couldn't send your RSVP. Check your connection and try again, or contact us directly.";
    submitButton.textContent = "Try sending RSVP again ♡";
  } finally {
    sending = false;
    submitButton.disabled = false;
  }
});
