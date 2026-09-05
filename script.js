// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar shadow / background on scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Testimonial Slider
const cards = document.querySelectorAll('.t-card');
const dots = document.querySelectorAll('.t-dots .dot');
let current = 0;
let sliderInterval;

function showTestimonial(index) {
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    cards[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextTestimonial() {
    current = (current + 1) % cards.length;
    showTestimonial(current);
}

sliderInterval = setInterval(nextTestimonial, 5000);

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        current = parseInt(dot.getAttribute('data-index'));
        showTestimonial(current);
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextTestimonial, 5000);
    });
});

showTestimonial(0);

// Back to Top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .work-card, .process-step, .about-content, .about-photo, .t-card, .contact-box, .faq-item, .audit-box, .section-header').forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});

// Staggered reveal for service cards
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, i * 120);
            });
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

const servicesSection = document.getElementById('services');
if (servicesSection) {
    servicesSection.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    staggerObserver.observe(servicesSection);
}

// 3D tilt on work cards (desktop with mouse)
const workTiltCards = document.querySelectorAll('.work-card');
if (window.matchMedia('(pointer: fine) and (min-width: 769px)').matches) {
    workTiltCards.forEach(card => {
        const strength = 6;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(700px) rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });
    });
}

// Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

// Magnetic hover on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
        btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Parallax on About background shapes
const aboutBg = document.querySelector('.about-bg');
if (aboutBg) {
    window.addEventListener('scroll', () => {
        const rect = aboutBg.parentElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.05;
            aboutBg.style.transform = `translateY(${offset}px)`;
        }
    });
}

// Smooth scroll with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const top = targetId === '#home' ? 0 : target.offsetTop - 75;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Typing Effect
const typedPhrases = [
    'Professional websites for businesses in Multan',
    'Clean designs that load fast on every device',
    'From school sites to restaurant pages',
    'Affordable pricing, premium quality',
    'WhatsApp support from start to finish'
];
const typedText = document.getElementById('typedText');
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;

function typeEffect() {
    const phrase = typedPhrases[phraseIdx];
    if (!deleting) {
        typedText.textContent = phrase.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === phrase.length) {
            deleting = true;
            setTimeout(typeEffect, 2200);
            return;
        }
        setTimeout(typeEffect, 50);
    } else {
        typedText.textContent = phrase.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % typedPhrases.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, 30);
    }
}

typeEffect();

// Animated Counter
const statNum = document.querySelector('.stat-num[data-target]');

function animateCounter() {
    if (!statNum) return;
    const target = parseInt(statNum.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    function update() {
        current += step;
        if (current < target) {
            statNum.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            statNum.textContent = target;
        }
    }
    update();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statNum) counterObserver.observe(statNum);

// ===== Pricing Comparison Table Toggle =====
const compareToggle = document.getElementById('compareToggle');
const compareTable = document.getElementById('compareTable');

if (compareToggle && compareTable) {
    compareToggle.addEventListener('click', () => {
        compareTable.classList.toggle('open');
        compareToggle.innerHTML = compareTable.classList.contains('open')
            ? '<i class="fas fa-table"></i> Hide Comparison'
            : '<i class="fas fa-table"></i> Compare Packages Side-by-Side';
    });
}

// ===== Sticky Mobile WhatsApp CTA =====
const stickyWa = document.getElementById('stickyWa');
let stickyWaShown = false;

window.addEventListener('scroll', () => {
    if (!stickyWa) return;
    if (window.innerWidth <= 768) {
        // Show after scrolling past the hero
        if (window.scrollY > 550 && !stickyWaShown) {
            stickyWa.classList.add('show');
            stickyWaShown = true;
        } else if (window.scrollY <= 550 && stickyWaShown) {
            stickyWa.classList.remove('show');
            stickyWaShown = false;
        }
    }
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
    });
});