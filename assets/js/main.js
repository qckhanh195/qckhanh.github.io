/* ===========================
   Portfolio JS – main.js
   =========================== */

// ─── DOM References ────────────────────────────────────
const navbar      = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const menuToggle  = document.getElementById('menu-toggle');
const navLinks    = document.getElementById('nav-links');
const backToTop   = document.getElementById('back-to-top');
const navLinkEls  = document.querySelectorAll('.nav-link');
const sections    = document.querySelectorAll('.section');

// ─── Typing Animation ───────────────────────────────────
const typingPhrases = [
    'beautiful websites.',
    'web experiences.',
    'cool CLI tools.',
    'solutions with code.',
    'things I love. 🚀',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeLoop() {
    if (!typingEl) return;
    const currentPhrase = typingPhrases[phraseIdx];

    if (isDeleting) {
        charIdx--;
        typingEl.textContent = currentPhrase.slice(0, charIdx);
    } else {
        charIdx++;
        typingEl.textContent = currentPhrase.slice(0, charIdx);
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIdx === currentPhrase.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % typingPhrases.length;
        delay = 400;
    }

    setTimeout(typeLoop, delay);
}

// ─── Theme ──────────────────────────────────────────────
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
    localStorage.setItem('portfolio-theme', theme);
}

themeToggle?.addEventListener('click', () => {
    const current = document.body.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ─── Mobile Menu ────────────────────────────────────────
function closeMenu() {
    navLinks?.classList.remove('open');
    menuToggle?.classList.remove('open');
}

menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('open');
    menuToggle?.classList.toggle('open', isOpen);
});

document.addEventListener('click', (e) => {
    if (!navbar?.contains(e.target)) closeMenu();
});

// ─── Smooth Navigation ──────────────────────────────────
function navigateTo(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const navH = navbar?.offsetHeight ?? 70;
    const top = el.getBoundingClientRect().top + window.scrollY - (targetId === 'hero' ? 0 : navH);
    window.scrollTo({ top, behavior: 'smooth' });
    history.pushState(null, '', targetId === 'hero' ? '/' : `/${targetId}`);
}

document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(el.dataset.target);
        closeMenu();
    });
});

// ─── Scroll Behaviors ───────────────────────────────────
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
    }
}, { passive: true });

function onScroll() {
    const scrollY = window.scrollY;

    // Navbar glass effect
    navbar?.classList.toggle('scrolled', scrollY > 10);

    // Back to top
    backToTop?.classList.toggle('visible', scrollY > 400);

    // Active nav link highlight
    let currentSection = 'hero';
    sections.forEach(sec => {
        const top = sec.offsetTop - (navbar?.offsetHeight ?? 70) - 40;
        if (scrollY >= top) currentSection = sec.id;
    });
    navLinkEls.forEach(link => {
        link.classList.toggle('active', link.dataset.target === currentSection);
    });

    ticking = false;
}

// Back to top click
backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', '/');
});

// ─── Reveal on Scroll (Intersection Observer) ───────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Skill Bars Animation ───────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                const width = fill.dataset.width;
                fill.style.width = width + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

// ─── Stat Counter Animation ─────────────────────────────
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(num => {
                const target = parseInt(num.dataset.count, 10);
                let current = 0;
                const step = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    num.textContent = current + (num.dataset.count === '100' ? '+' : '+');
                    if (current >= target) clearInterval(timer);
                }, 35);
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stats').forEach(el => statObserver.observe(el));

// ─── Keyboard navigation ────────────────────────────────
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

// ─── Browser back/forward ───────────────────────────────
window.addEventListener('popstate', () => {
    const path = window.location.pathname.replace('/', '') || 'hero';
    const el = document.getElementById(path);
    if (el) {
        const navH = navbar?.offsetHeight ?? 70;
        const top = path === 'hero' ? 0 : el.offsetTop - navH;
        window.scrollTo({ top, behavior: 'smooth' });
    }
});

// ─── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial scroll check
    onScroll();

    // Start typing animation after brief delay
    setTimeout(typeLoop, 600);

    // Read initial URL path
    const path = window.location.pathname.replace('/', '') || 'hero';
    if (path && path !== 'hero') {
        setTimeout(() => navigateTo(path), 100);
    }
});
