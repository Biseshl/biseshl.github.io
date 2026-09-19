/* Deploy 3 artwork update: replace the temporary line drawing with the chosen Ganesh logo. Keep the invitation opening, venue and RSVP unchanged. */
(() => {
  'use strict';
  const cover = document.querySelector('#intro .book-cover');
  if (!cover) return;

  const makeGanesh = (inside = false) => {
    const img = document.createElement('img');
    img.className = inside ? 'ganesh-picture ganesh-inside' : 'ganesh-picture';
    img.src = './assets/ganesh-gold-invitation.png?v=20260919-gold-art-1';
    img.width = inside ? 72 : 112;
    img.height = inside ? 72 : 112;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    return img;
  };

  const oldCoverLogo = cover.querySelector('.ganesh-seal, .temple-mark');
  if (oldCoverLogo) oldCoverLogo.replaceWith(makeGanesh());
  const oldInsideLogo = document.querySelector('#intro .ganesh-inside, #intro .book-inside-motif');
  if (oldInsideLogo) oldInsideLogo.replaceWith(makeGanesh(true));

  const blessingLine = cover.querySelector('.cover-nepali');
  if (blessingLine) blessingLine.textContent = 'श्री गणेशाय नमः';
  const invitationLine = cover.querySelector('.cover-ornament');
  if (invitationLine) {
    invitationLine.textContent = 'सप्रेम निमन्त्रणा';
    invitationLine.lang = 'ne';
    invitationLine.classList.add('deploy3-invitation-label');
  }
  const insideLine = document.querySelector('#intro .inside-nepali');
  if (insideLine) insideLine.textContent = 'दुई मन, एक सुन्दर यात्रा';
  const heroLine = document.querySelector('.hero .nepali-mini');
  if (heroLine) heroLine.textContent = 'सप्रेम निमन्त्रणा · हाम्रो विशेष क्षण ♡';

  const message = cover.querySelector('.cover-message');
  if (message && !cover.querySelector('.deploy3-blessing')) {
    const blessing = document.createElement('p');
    blessing.className = 'deploy3-blessing';
    blessing.lang = 'ne';
    blessing.textContent = 'हाम्रो विशेष क्षणमा यहाँको सादर उपस्थितिको अपेक्षा गर्दछौं।';
    message.after(blessing);
  }

  document.getElementById('deploy3-nepali-styles')?.remove();
  const styles = document.createElement('style');
  styles.id = 'deploy3-nepali-styles';
  styles.textContent = `
    .ganesh-picture{display:block;flex:none;width:100px;height:100px;margin:0 auto 5px;object-fit:contain;filter:drop-shadow(0 4px 8px #21030d65);animation:ganesh-art-glow 5s ease-in-out infinite;pointer-events:none}
    .book-inside .ganesh-inside{width:70px;height:70px;margin-bottom:3px;filter:drop-shadow(0 3px 4px #52142944)}
    .book-cover .temple-mark{display:none}
    .book-cover .cover-nepali{font:500 clamp(14px,2.9vw,20px)/1.5 'Noto Serif Devanagari',serif;color:#ffe3a6;margin:0 0 2px}
    .book-cover .deploy3-invitation-label{font:500 clamp(13px,2.6vw,17px)/1.45 'Noto Serif Devanagari',serif;color:#f1d09a;letter-spacing:0;margin:3px 0 5px}
    .book-cover .deploy3-blessing{display:none;font:500 12px/1.6 'Noto Serif Devanagari',serif;color:#f1d7a9;max-width:320px;margin:3px 0 8px}
    .hero .nepali-mini{font:500 16px/1.65 'Noto Serif Devanagari',serif}
    @keyframes ganesh-art-glow{50%{filter:drop-shadow(0 3px 10px #d4a05b85)}}
    @media(min-height:800px) and (min-width:521px){.book-cover .deploy3-blessing{display:block}}
    @media(max-width:520px){.book-cover .ganesh-picture{width:82px;height:82px;margin-bottom:3px}.book-inside .ganesh-inside{width:60px;height:60px}.book-cover .cover-nepali{font-size:14px}.book-cover .deploy3-invitation-label{font-size:13px;margin:2px 0}.book-cover .cover-message{margin-bottom:9px}}
    @media(max-height:710px){.book-cover .ganesh-picture{width:55px;height:55px;margin-bottom:2px}.book-inside .ganesh-inside{width:45px;height:45px}.book-cover .deploy3-invitation-label{margin:0}}
    @media(prefers-reduced-motion:reduce){.ganesh-picture{animation:none!important}}
  `;
  document.head.append(styles);
})();