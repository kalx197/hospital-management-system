// js/main.js - Enhanced with professional animations

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('show');
            body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking outside or on a link
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav') && navMenu.classList.contains('show')) {
            closeMobileMenu();
        }
    });
    
    // Close menu when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu function
    function closeMobileMenu() {
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        navMenu.classList.remove('show');
        body.style.overflow = '';
    }
    
    // Close menu when clicking on a nav link (for single page navigation)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
    // Set current year in footer
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat-item, .department-card, .doctor-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Form validation helper
    window.validateEmail = function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    window.validatePhone = function(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/[\s\-\(\)]/g, ''));
    };
    
    // Emergency banner notification
    const emergencyBanner = document.querySelector('.emergency-banner');
    if (emergencyBanner) {
        // Flash emergency banner on click
        emergencyBanner.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    }
});
