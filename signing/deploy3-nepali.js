/* Deploy 3: ornamental Nepali card enhancements. The separate RSVP page is untouched. */
(() => {
  'use strict';
  const cover = document.querySelector('#intro .book-cover');
  if (!cover) return;

  // Deliberately decorative, drawn in SVG rather than an emoji that changes by device.
  const ganesh = '<span class="ganesh-seal" aria-hidden="true"><svg viewBox="0 0 100 100" focusable="false" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" opacity=".55" stroke-width="1"/><path d="M26 38 Q15 20 32 17 L39 9 45 20 Q50 14 55 20 L61 9 68 17 Q85 20 74 38" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><path d="M37 40 Q17 25 16 48 Q16 66 34 63 M63 40 Q83 25 84 48 Q84 66 66 63" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><path d="M36 38 Q50 24 64 38 Q73 48 64 60 L54 66 Q45 70 50 80 Q54 87 62 81" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M38 48 Q42 45 46 48 M56 48 Q60 45 64 48 M35 60 Q27 70 19 69 M65 60 Q73 70 81 69" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M39 18 H61 M46 11 H54" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="50" cy="34" r="2.2" fill="currentColor"/></svg></span>';

  const temple = cover.querySelector('.temple-mark');
  if (temple) temple.outerHTML = ganesh;
  const sanskrit = cover.querySelector('.cover-nepali');
  if (sanskrit) sanskrit.textContent = 'श्री गणेशाय नमः';
  const inviteLabel = cover.querySelector('.cover-ornament');
  if (inviteLabel) {
    inviteLabel.textContent = 'सप्रेम निमन्त्रणा';
    inviteLabel.setAttribute('lang', 'ne');
    inviteLabel.classList.add('deploy3-invitation-label');
  }
  const insideMark = document.querySelector('#intro .book-inside-motif');
  if (insideMark) insideMark.outerHTML = ganesh.replace('ganesh-seal', 'ganesh-seal ganesh-inside');
  const insideNepali = document.querySelector('#intro .inside-nepali');
  if (insideNepali) insideNepali.textContent = 'दुई मन, एक सुन्दर यात्रा';
  const heroNepali = document.querySelector('.hero .nepali-mini');
  if (heroNepali) heroNepali.textContent = 'सप्रेम निमन्त्रणा · हाम्रो ऐतिहासिक क्षण ♡';

  const blessing = document.createElement('p');
  blessing.className = 'deploy3-blessing';
  blessing.lang = 'ne';
  blessing.textContent = 'हाम्रो विशेष क्षणमा यहाँको सादर उपस्थितिको अपेक्षा गर्दछौं।';
  const message = cover.querySelector('.cover-message');
  if (message) message.after(blessing);

  const css = document.createElement('style');
  css.id = 'deploy3-nepali-styles';
  css.textContent = `
    .ganesh-seal{display:grid;place-items:center;flex:none;width:76px;height:76px;margin:0 auto 9px;border-radius:50%;color:#f5d69d;background:radial-gradient(circle at 30% 25%,#b27a3c66,#52102688 72%);border:1px solid #f2d193aa;box-shadow:0 0 0 4px #c99b5433,0 9px 23px #26081177;animation:ganesh-pulse 5s ease-in-out infinite}
    .ganesh-seal svg{display:block;width:63px;height:63px}
    .ganesh-inside{color:#97652c;background:#fff2da;border-color:#b58644;margin-bottom:4px;width:57px;height:57px}
    .ganesh-inside svg{width:47px;height:47px}
    .book-cover .temple-mark{display:none}
    .book-cover .cover-nepali{font-family:'Noto Serif Devanagari',serif;font-size:clamp(14px,2.9vw,20px);line-height:1.5;margin:0 0 2px;color:#ffe3a6}
    .book-cover .deploy3-invitation-label{font:500 clamp(13px,2.6vw,17px)/1.45 'Noto Serif Devanagari',serif;color:#f1d09a;letter-spacing:0;margin:3px 0 5px}
    .book-cover .deploy3-blessing{display:none;font:500 12px/1.6 'Noto Serif Devanagari',serif;color:#f1d7a9;max-width:320px;margin:3px 0 8px}
    .hero .nepali-mini{font:500 16px/1.65 'Noto Serif Devanagari',serif}
    @keyframes ganesh-pulse{50%{box-shadow:0 0 0 4px #c99b5450,0 9px 27px #d4a05b55}}
    @media(min-height:800px) and (min-width:521px){.book-cover .deploy3-blessing{display:block}.book-cover .ganesh-seal{margin-bottom:10px}}
    @media(max-width:520px){.book-cover .ganesh-seal{width:60px;height:60px;margin-bottom:5px}.book-cover .ganesh-seal svg{width:50px;height:50px}.book-cover .cover-nepali{font-size:14px}.book-cover .deploy3-invitation-label{font-size:13px;margin:2px 0}.book-cover .cover-message{margin-bottom:9px}}
    @media(max-height:710px){.book-cover .ganesh-seal{width:48px;height:48px;margin-bottom:3px}.book-cover .ganesh-seal svg{width:42px;height:42px}.book-cover .deploy3-invitation-label{margin:0}}
    @media(prefers-reduced-motion:reduce){.ganesh-seal{animation:none!important}}
  `;
  document.head.append(css);
})();