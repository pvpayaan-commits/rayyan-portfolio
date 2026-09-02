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

document.querySelectorAll('.service-card, .work-card, .process-step, .about-content, .about-photo, .t-card, .contact-box').forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});

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