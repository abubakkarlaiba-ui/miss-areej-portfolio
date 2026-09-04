// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navLinkElements = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        lightboxImg.src = item.querySelector('img').src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

// Contact Form - Redirect to Instagram DM
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const instagramURL = `https://ig.me/m/moon.litareej/?text=${encodeURIComponent(`Hi Areej! I'm ${name}. ${message}`)}`;
    window.open(instagramURL, '_blank');
    const btn = e.target.querySelector('.btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Opening Instagram...</span> <i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)';
    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        e.target.reset();
    }, 2500);
});

// Back to Top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.stat-item, .about-content, .gallery-item, .quote-card, .interest-card, .lifestyle-card, .contact-content');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < window.innerHeight - 80) {
            el.classList.add('revealed');
        }
    });
};

// Add reveal styles
const style = document.createElement('style');
style.textContent = `
    .stat-item, .about-content, .gallery-item, .quote-card, .interest-card, .lifestyle-card, .contact-content {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Elegant Professional Background Animation =====
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const orbs = [];
const bokeh = [];
const sparkle = [];

for (let i = 0; i < 5; i++) {
    orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 150,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        hue: Math.random() * 30 + 15
    });
}

for (let i = 0; i < 25; i++) {
    bokeh.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 40 + 10,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -Math.random() * 0.3 - 0.05,
        opacity: Math.random() * 0.04 + 0.01,
        pulse: Math.random() * 0.0005 + 0.0002,
        phase: Math.random() * Math.PI * 2
    });
}

for (let i = 0; i < 12; i++) {
    sparkle.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        opacity: 0,
        maxOpacity: Math.random() * 0.4 + 0.1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.005
    });
}

let time = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.005;

    orbs.forEach(orb => {
        orb.x += orb.speedX;
        orb.y += orb.speedY;
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `hsla(${orb.hue}, 50%, 80%, 0.03)`);
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 45%, 75%, 0.015)`);
        gradient.addColorStop(1, `hsla(${orb.hue}, 40%, 70%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    bokeh.forEach(b => {
        b.x += b.speedX;
        b.y += b.speedY;
        b.phase += b.pulse;
        const currentOpacity = b.opacity * (0.7 + Math.sin(b.phase) * 0.3);

        if (b.y < -b.radius * 2) {
            b.y = canvas.height + b.radius;
            b.x = Math.random() * canvas.width;
        }

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, `rgba(200, 109, 81, ${currentOpacity * 1.5})`);
        grad.addColorStop(0.4, `rgba(200, 109, 81, ${currentOpacity})`);
        grad.addColorStop(1, `rgba(200, 109, 81, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    sparkle.forEach(s => {
        s.x += s.speedX;
        s.y += s.speedY;
        s.phase += s.speed;
        s.opacity = s.maxOpacity * Math.abs(Math.sin(s.phase));

        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = '#C86D51';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(200, 109, 81, 0.5)';
        ctx.beginPath();

        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            const x1 = s.x + Math.cos(angle) * s.size;
            const y1 = s.y + Math.sin(angle) * s.size;
            if (i === 0) ctx.moveTo(x1, y1);
            else ctx.lineTo(x1, y1);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    });

    requestAnimationFrame(animate);
}
animate();
