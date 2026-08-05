// ───────── DUST PARTICLES ─────────
(function createDust() {
    const container = document.getElementById('dust-container');
    const count = 35;

    for (let i = 0; i < count; i++) {
        const dust = document.createElement('div');
        dust.className = 'dust';

        const size = 2 + Math.random() * 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dx = (Math.random() - 0.5) * 600;
        const dy = (Math.random() - 0.5) * 600 - 200;
        const duration = 8 + Math.random() * 14;
        const delay = Math.random() * 12;

        dust.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            --dx: ${dx}px;
            --dy: ${dy}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        container.appendChild(dust);
    }
})();

// ───────── OPEN LETTER ─────────
function openLetter() {
    document.body.classList.add('open');

    // Slight haptic feedback simulation
    if (navigator.vibrate) {
        navigator.vibrate(15);
    }

    // Log the opening
    console.log('💌 Letter opened by Tanisha ❤️');
}

// ───────── CLOSE LETTER ─────────
function closeLetter() {
    document.body.classList.remove('open');

    // Reset envelope position after transition
    setTimeout(() => {
        const wrapper = document.getElementById('envelopeWrapper');
        if (wrapper) {
            wrapper.style.transition = 'none';
            wrapper.style.transform = '';
            setTimeout(() => {
                wrapper.style.transition = '';
            }, 50);
        }
    }, 300);

    // Log the closing
    console.log('📜 Letter closed');
}

// ───────── KEYBOARD SUPPORT ─────────
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('open')) {
        closeLetter();
    }
    if ((e.key === 'Enter' || e.key === ' ') && !document.body.classList.contains('open')) {
        const seal = document.querySelector('.seal');
        if (seal) seal.click();
    }
});

// ───────── MOUSE PARALLAX (desktop only) ─────────
let isDesktop = window.innerWidth > 768;
let parallaxActive = true;

window.addEventListener('resize', () => {
    isDesktop = window.innerWidth > 768;
});

document.addEventListener('mousemove', (e) => {
    if (!isDesktop || !parallaxActive) return;

    const envelope = document.querySelector('.envelope');
    if (!envelope || document.body.classList.contains('open')) return;

    const rect = envelope.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;

    const maxRotate = 8;
    const rotateX = -deltaY * maxRotate;
    const rotateY = deltaX * maxRotate;

    envelope.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});

document.addEventListener('mouseleave', () => {
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.style.transform = '';
    }
});

// ───────── SCROLL TO CONTINUE HINT ─────────
document.addEventListener('scroll', () => {
    const hint = document.querySelector('.nav-hint');
    if (!hint) return;

    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollPercent > 0.1) {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.6s ease';
    } else {
        hint.style.opacity = '1';
    }
});

// ───────── SMOOTH BREATHING ANIMATION FOR LETTER ─────────
const letterEl = document.querySelector('.letter');
if (letterEl) {
    let breathePhase = 0;
    setInterval(() => {
        if (document.body.classList.contains('open')) {
            breathePhase += 0.02;
            const scale = 1 + Math.sin(breathePhase) * 0.0015;
            letterEl.style.transform = `scale(${scale})`;
        }
    }, 50);
}

// ───────── CONSOLE EASTER EGG ─────────
console.log('%c❤️ For Tanisha, From Sanyam ❤️', 'font-size:20px; font-weight:bold; color:#8b1a2b;');
console.log('%cA letter that was always meant for you.', 'font-size:14px; color:#3d2419; font-style:italic;');
console.log('📬 8 August - 22 August Promise');
