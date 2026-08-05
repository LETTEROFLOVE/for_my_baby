// ─── DUST PARTICLES ───
(function createDust() {
    const container = document.getElementById('dust-container');
    for (let i = 0; i < 40; i++) {
        const d = document.createElement('div');
        d.className = 'dust';
        const size = 2 + Math.random() * 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dx = (Math.random() - 0.5) * 700;
        const dy = (Math.random() - 0.5) * 500 - 200;
        const dur = 10 + Math.random() * 16;
        const del = Math.random() * 14;
        d.style.cssText = `
            left:${x}%; top:${y}%;
            width:${size}px; height:${size}px;
            --dx:${dx}px; --dy:${dy}px;
            animation-duration:${dur}s; animation-delay:${del}s;
        `;
        container.appendChild(d);
    }
})();

// ─── OPEN / CLOSE ───
function openLetter() {
    document.body.classList.add('open');
    if (navigator.vibrate) navigator.vibrate(12);
    // auto-scroll to letter after animation
    setTimeout(() => {
        const wrapper = document.getElementById('letterWrapper');
        if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
}

function closeLetter() {
    document.body.classList.remove('open');
    // reset envelope position
    setTimeout(() => {
        const wrap = document.getElementById('envelopeWrapper');
        if (wrap) {
            wrap.style.transition = 'none';
            wrap.style.transform = '';
            setTimeout(() => wrap.style.transition = '', 50);
        }
    }, 300);
}

// ─── KEYBOARD ───
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('open')) closeLetter();
    if ((e.key === 'Enter' || e.key === ' ') && !document.body.classList.contains('open')) {
        document.querySelector('.seal')?.click();
    }
});

// ─── PARALLAX (desktop) ───
let isDesktop = window.innerWidth > 768;
window.addEventListener('resize', () => { isDesktop = window.innerWidth > 768; });

document.addEventListener('mousemove', (e) => {
    if (!isDesktop) return;
    const env = document.querySelector('.envelope');
    if (!env || document.body.classList.contains('open')) return;
    const rect = env.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    const max = 8;
    env.style.transform = `perspective(800px) rotateX(${-dy*max}deg) rotateY(${dx*max}deg) scale(1.02)`;
});
document.addEventListener('mouseleave', () => {
    document.querySelector('.envelope')?.style.removeProperty('transform');
});

// ─── BREATHING LETTER ───
const letterEl = document.getElementById('letter');
if (letterEl) {
    let phase = 0;
    setInterval(() => {
        if (document.body.classList.contains('open')) {
            phase += 0.02;
            const s = 1 + Math.sin(phase) * 0.0015;
            letterEl.style.transform = `scale(${s})`;
        }
    }, 50);
}

// ─── SCROLL HINT FADE ───
document.addEventListener('scroll', () => {
    const hint = document.querySelector('.nav-hint');
    if (!hint) return;
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    hint.style.opacity = pct > 0.15 ? '0' : '1';
    hint.style.transition = 'opacity 0.5s';
});

// ─── CONSOLE EASTER EGG ───
console.log('%c❤️ For Tanisha ❤️', 'font-size:22px; color:#8b1a2b; font-weight:bold;');
console.log('%cFrom Sanyam – with love', 'font-size:16px; color:#3d2419; font-style:italic;');
