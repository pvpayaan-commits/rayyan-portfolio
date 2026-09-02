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

window.addEventListener('scroll', () => {
    const navLinkItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.highlight-card, .menu-item, .g-item, .about-text, .about-image, .contact-card, .reservation-box').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const top = targetId === '#home' ? 0 : target.offsetTop - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// EmailJS Reservation Form
const reservationForm = document.getElementById('reservationForm');
const resButton = document.getElementById('resButton');

// EmailJS credentials — shared with your EmailJS account
const EMAILJS_PUBLIC_KEY = 'OtP5WKK3EKEV7Mis6';
const EMAILJS_SERVICE_ID = 'service_5q9oh6a';
const EMAILJS_TEMPLATE_ID = 'template_t5xdn0l';

if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const original = resButton.innerHTML;
    resButton.disabled = true;
    resButton.innerHTML = '<span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span> Sending...';

    const templateParams = {
        site_name: 'Multan Metro Restaurant',
        from_name: document.getElementById('res-name').value,
        customer_phone: document.getElementById('res-phone').value,
        res_date: document.getElementById('res-date').value,
        guests: document.getElementById('res-guests').value,
        notes: document.getElementById('res-notes').value
    };

    if (!window.emailjs) {
        resButton.disabled = false;
        resButton.innerHTML = original;
        alert('EmailJS is not loaded. Check internet connection.');
        return;
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
            resButton.innerHTML = '<span class="btn-icon"><i class="fas fa-check-circle"></i></span> Request Sent! We\'ll Call to Confirm';
            reservationForm.reset();
            setTimeout(() => { resButton.innerHTML = original; resButton.disabled = false; }, 3500);
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            resButton.innerHTML = '<span class="btn-icon"><i class="fas fa-exclamation-circle"></i></span> Failed. Please Try Again';
            setTimeout(() => { resButton.innerHTML = original; resButton.disabled = false; }, 3000);
        });
});