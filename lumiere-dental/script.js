// ============================================
// LUMIÈRE DENTAL STUDIO — Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Scroll Reveal (Fade-Up) ---
    const fadeElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // --- Testimonial Carousel ---
    const track = document.getElementById('testimonialTrack');
    const slides = track ? track.querySelectorAll('.testimonial-slide') : [];
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    let currentSlide = 0;
    let autoplayInterval;

    if (slides.length && dotsContainer) {
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.testimonial-dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            resetAutoplay();
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        function prevSlide() {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        resetAutoplay();

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        track.addEventListener('mouseleave', resetAutoplay);

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide();
            if (touchEndX - touchStartX > 50) prevSlide();
        }, { passive: true });
    }

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentGalleryIndex = 0;

    if (lightbox && galleryItems.length) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        function openLightbox(index) {
            currentGalleryIndex = index;
            const item = galleryItems[index];
            const label = item.querySelector('.gallery-label');
            lightboxContent.innerHTML = `
                <div class="img-placeholder" style="min-width:500px;min-height:400px;font-size:1.2rem;border-radius:20px;">
                    <span>${label ? label.textContent : 'Gallery Image'} — Before & After</span>
                </div>
            `;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }

        lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        lightboxPrev.addEventListener('click', () => {
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
            openLightbox(currentGalleryIndex);
        });

        lightboxNext.addEventListener('click', () => {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
            openLightbox(currentGalleryIndex);
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display !== 'flex') return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrev.click();
            if (e.key === 'ArrowRight') lightboxNext.click();
        });
    }

    // --- Booking Form (EmailJS) ---
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');

    const EMAILJS_PUBLIC_KEY = 'OtP5WKK3EKEV7Mis6';
    const EMAILJS_SERVICE_ID = 'service_5q9oh6a';
    const EMAILJS_TEMPLATE_ID = 'template_t5xdn0l';

    if (window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            if (!window.emailjs) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('Email service is loading. Please try again in a moment.');
                return;
            }

            const templateParams = {
                site_name: 'Lumière Dental Studio',
                from_name: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
                customer_email: document.getElementById('email').value,
                customer_phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value || 'No additional message'
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(() => {
                    bookingForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                })
                .catch((error) => {
                    console.error('EmailJS error:', error);
                    submitBtn.textContent = 'Failed — Try Again';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }

});
