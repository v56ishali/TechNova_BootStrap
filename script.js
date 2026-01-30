// ===================================
// TechNova Solutions - Custom JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.getElementById('mainNav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(13, 17, 23, 0.98)';
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });

    // ===================================
    // Smooth Scroll for Navigation Links
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }

                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // ===================================
    // Active Section Highlighting
    // ===================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===================================
    // Carousel Auto-play Configuration
    // ===================================
    const teamCarousel = document.getElementById('teamCarousel');
    if (teamCarousel) {
        const bsTeamCarousel = new bootstrap.Carousel(teamCarousel, {
            interval: 5000,
            wrap: true,
            keyboard: true
        });
    }

    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    if (testimonialsCarousel) {
        const bsTestimonialsCarousel = new bootstrap.Carousel(testimonialsCarousel, {
            interval: 6000,
            wrap: true,
            keyboard: true
        });
    }

    // ===================================
    // Scroll Reveal Animation
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

            // Send to FormSubmit.co via AJAX
            fetch("https://formsubmit.co/ajax/vishali.sk28@gmail.com", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Show success message
                    submitButton.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
                    submitButton.style.background = 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)';

                    // Reset form
                    setTimeout(() => {
                        contactForm.reset();
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    submitButton.innerHTML = '<i class="bi bi-exclamation-circle me-2"></i>Error!';
                    submitButton.style.background = 'linear-gradient(135deg, #f44336 0%, #e53935 100%)';

                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                    }, 3000);
                });
        });
    }

    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroSection.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
        });
    }

    // ===================================
    // Add Hover Effect to Social Links
    // ===================================
    const socialLinks = document.querySelectorAll('.social-link, .social-icon');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===================================
    // Initialize Tooltips (if needed)
    // ===================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ===================================
    // Performance: Lazy Loading Images
    // ===================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🚀 TechNova Solutions', 'color: #00bcd4; font-size: 24px; font-weight: bold;');
    console.log('%cWelcome to our website! Built with Bootstrap 5 and modern web technologies.', 'color: #1a237e; font-size: 14px;');
});
