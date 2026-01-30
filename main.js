// main.js - Common functionality for all pages

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('show');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav') && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Set active link based on current page
    setActiveNavLink();
    
    // Initialize any common components
    initializeModals();
    initializeTabs();
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Modal functionality
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (!modal.hasAttribute('aria-hidden') || modal.getAttribute('aria-hidden') === 'false') {
                    closeModal(modal);
                }
            });
        }
    });
}

function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId, this);
        });
    });
}

function switchTab(tabId, clickedButton) {
    // Remove active class from all buttons and panes
    const tabButtons = clickedButton.closest('.tabs').querySelectorAll('.tab-btn');
    const tabPanes = clickedButton.closest('.tabs').nextElementSibling.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked button and corresponding pane
    clickedButton.classList.add('active');
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }
}

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// LocalStorage helper for appointments
const StorageManager = {
    saveAppointment: function(appointment) {
        let appointments = JSON.parse(localStorage.getItem('medicare_appointments') || '[]');
        appointment.id = 'MED-' + Date.now();
        appointment.created = new Date().toISOString();
        appointments.push(appointment);
        localStorage.setItem('medicare_appointments', JSON.stringify(appointments));
        return appointment.id;
    },
    
    getAppointments: function() {
        return JSON.parse(localStorage.getItem('medicare_appointments') || '[]');
    },
    
    clearAppointments: function() {
        localStorage.removeItem('medicare_appointments');
    }
};
