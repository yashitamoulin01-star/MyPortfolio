document.addEventListener('DOMContentLoaded', () => {
    // Hamburger mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // Scroll spy for active navbar link highlight
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPosition = window.scrollY + 150; // offset for fixed navbar

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    // Toggle project entry open/close
    window.toggleProject = function(id) {
        const entry = document.getElementById(id);
        if (!entry) return;
        const isOpen = entry.classList.contains('open');
        // Close all first
        document.querySelectorAll('.project-entry.open').forEach(e => e.classList.remove('open'));
        // Open clicked if it was closed
        if (!isOpen) entry.classList.add('open');
    };

    // Open project from grid thumbnail
    window.openProject = function(id) {
        const entry = document.getElementById(id);
        if (!entry) return;
        // Close others, open this one
        document.querySelectorAll('.project-entry.open').forEach(e => e.classList.remove('open'));
        entry.classList.add('open');
        // Smooth scroll into view
        setTimeout(() => {
            entry.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };

    // Intersection observer for fade-in animations
    const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Auto-open NeuroSync on load (flagship project)
    const neurosync = document.getElementById('neurosync');
    if (neurosync) neurosync.classList.add('open');
});
