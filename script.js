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

// ===== Beautiful Background Animation =====
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0, mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? 'rgba(200, 109, 81,' : 'rgba(212, 132, 106,';
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.02 - 0.01;
        this.pulse = Math.random() * 0.02;
        this.grow = true;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;

        if (this.grow) {
            this.opacity += this.pulse;
            if (this.opacity >= 0.6) this.grow = false;
        } else {
            this.opacity -= this.pulse;
            if (this.opacity <= 0.1) this.grow = true;
        }

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            this.x -= dx * 0.01;
            this.y -= dy * 0.01;
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color + '0.3)';
        ctx.fill();
        ctx.restore();
    }
}

class FloatingRing {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 20;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.08 + 0.02;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = Math.random() * 0.005;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotSpeed;
        if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
            this.reset();
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 109, 81, ${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());
for (let i = 0; i < 8; i++) particles.push(new FloatingRing());

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            if (particles[i] instanceof FloatingRing || particles[j] instanceof FloatingRing) continue;
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(200, 109, 81, ${0.06 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
}
animateParticles();
