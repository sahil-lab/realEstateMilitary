/*
 * script.js
 *
 * This file contains the JavaScript required to
 * replicate the interactive behaviours found on the reference
 * property search page. It covers navigation toggling, login
 * modal interactions, multi‑select dropdown handling, search
 * filtering, result counting, property sorting and scroll‑to‑top
 * functionality. All handlers are registered once the DOM is
 * ready.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Navigation: toggle mobile menu
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileSubButton = mobileMenu?.querySelector('[data-dropdown-target]');
    const mobileSubMenu = document.getElementById('mobile-sub-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // Toggle desktop nav for mobile view
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('show');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            }
        });
    }

    // Toggle sub menu inside mobile nav
    if (mobileSubButton && mobileSubMenu) {
        mobileSubButton.addEventListener('click', () => {
            mobileSubMenu.classList.toggle('hidden');
        });
    }

    // Login modal handlers
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginClose = document.getElementById('login-close');

    function showLogin() {
        loginModal.classList.remove('hidden');
        loginModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function hideLogin() {
        loginModal.classList.add('hidden');
        loginModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLogin();
        });
    }

    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Hide mobile menu before showing modal
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
            showLogin();
        });
    }

    if (loginClose) {
        loginClose.addEventListener('click', hideLogin);
    }

    // Close modal when clicking outside the modal content
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                hideLogin();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !loginModal.classList.contains('hidden')) {
                hideLogin();
            }
        });
    }

    // Property type multi-select
    const typeSelectBtn = document.getElementById('type-select-btn');
    const typeDropdown = document.getElementById('type-dropdown');
    const typeCheckboxes = typeDropdown ? Array.from(typeDropdown.querySelectorAll('input[type="checkbox"]')) : [];
    const selectAllBtn = document.getElementById('type-select-all');
    const deselectAllBtn = document.getElementById('type-deselect-all');

    function updateTypeButton() {
        const selected = typeCheckboxes.filter((ch) => ch.checked);
        const label = typeSelectBtn?.querySelector('.label');
        if (label) {
            if (selected.length === 0) {
                label.textContent = 'All Types';
            } else if (selected.length === 1) {
                label.textContent = selected[0].nextElementSibling.textContent;
            } else {
                label.textContent = `${selected.length} Types Selected`;
            }
        }
    }

    if (typeSelectBtn && typeDropdown) {
        typeSelectBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            typeDropdown.classList.toggle('hidden');
        });
    }

    // Select all and deselect all functionality
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            typeCheckboxes.forEach((ch) => {
                ch.checked = true;
            });
            updateTypeButton();
        });
    }

    if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            typeCheckboxes.forEach((ch) => {
                ch.checked = false;
            });
            updateTypeButton();
        });
    }

    typeCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateTypeButton);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (
            typeDropdown &&
            !typeDropdown.contains(e.target) &&
            !typeSelectBtn?.contains(e.target)
        ) {
            typeDropdown.classList.add('hidden');
        }
    });

    // Search filtering
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            filterProperties();
        });
    }

    function filterProperties() {
        const keywordInput = document.getElementById('keyword');
        const statusSelect = document.getElementById('select-status');
        const plotSizeInput = document.getElementById('plot-size');

        const keyword = keywordInput?.value.trim().toLowerCase() || '';
        const status = statusSelect?.value || 'any';
        const selectedTypes = typeCheckboxes
            .filter((ch) => ch.checked)
            .map((ch) => ch.value);

        const propertyCards = document.querySelectorAll('.property-card');
        let count = 0;

        propertyCards.forEach((card) => {
            let visible = true;
            const title = (card.dataset.title || '').toLowerCase();
            const cardStatus = card.dataset.status || '';
            const cardTypes = card.dataset.types ? card.dataset.types.split(',') : [];

            // Keyword filter
            if (keyword && !title.includes(keyword)) {
                visible = false;
            }

            // Status filter
            if (status !== 'any' && cardStatus !== status) {
                visible = false;
            }

            // Type filter
            if (selectedTypes.length > 0) {
                const hasType = selectedTypes.some((t) => cardTypes.includes(t));
                if (!hasType) {
                    visible = false;
                }
            }

            // Show/hide card with animation
            if (visible) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.3s ease-in';
                count++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Update results count
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = count;
        }

        // Smooth scroll to results
        const propertySection = document.getElementById('property');
        if (propertySection) {
            propertySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Sorting functionality
    const sortSelect = document.getElementById('sort-properties');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProperties);
    }

    function sortProperties() {
        const sortValue = sortSelect?.value || 'default';
        const container = document.getElementById('property-list');
        if (!container) return;

        const cards = Array.from(container.querySelectorAll('.property-card'));
        let sortedCards = cards.slice();

        switch (sortValue) {
            case 'title-asc':
                sortedCards.sort((a, b) =>
                    (a.dataset.title || '').localeCompare(b.dataset.title || '')
                );
                break;
            case 'title-desc':
                sortedCards.sort((a, b) =>
                    (b.dataset.title || '').localeCompare(a.dataset.title || '')
                );
                break;
            case 'price-asc':
                sortedCards.sort(
                    (a, b) => parseFloat(a.dataset.price || 0) - parseFloat(b.dataset.price || 0)
                );
                break;
            case 'price-desc':
                sortedCards.sort(
                    (a, b) => parseFloat(b.dataset.price || 0) - parseFloat(a.dataset.price || 0)
                );
                break;
            case 'date-asc':
                sortedCards.sort(
                    (a, b) =>
                        new Date(a.dataset.date || 0).getTime() -
                        new Date(b.dataset.date || 0).getTime()
                );
                break;
            case 'date-desc':
                sortedCards.sort(
                    (a, b) =>
                        new Date(b.dataset.date || 0).getTime() -
                        new Date(a.dataset.date || 0).getTime()
                );
                break;
            default:
                // Default order remains unchanged
                break;
        }

        // Animate sorting
        container.style.opacity = '0.5';
        setTimeout(() => {
            // Reinsert sorted cards into the DOM
            sortedCards.forEach((card) => container.appendChild(card));
            container.style.opacity = '1';
        }, 150);
    }

    // Gallery filter functionality
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Remove active class from all filters
            galleryFilters.forEach(f => {
                f.classList.remove('bg-primary', 'text-white');
                f.classList.add('bg-gray-200', 'text-gray-800');
            });

            // Add active class to clicked filter
            this.classList.remove('bg-gray-200', 'text-gray-800');
            this.classList.add('bg-primary', 'text-white');
        });
    });

    // Scroll to top functionality
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Newsletter form functionality
    const newsletterForm = document.querySelector('form[action="#"]');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput?.value;

            if (email && isValidEmail(email)) {
                // Simulate newsletter subscription
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('show');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize statistics counter animation
    const statItems = document.querySelectorAll('.stat-item');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-count');
                animateValue(entry.target);
            }
        });
    }, observerOptions);

    // Observe statistics elements if they exist
    const statsSection = document.querySelector('.grid.grid-cols-2.sm\\:grid-cols-4.md\\:grid-cols-5');
    if (statsSection) {
        const statNumbers = statsSection.querySelectorAll('.text-3xl.font-bold.text-primary');
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    function animateValue(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        const suffix = text.replace(/[\d]/g, '');

        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }

    // Property card hover effects
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading effect to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.classList.remove('image-loading');
        });

        img.addEventListener('error', function () {
            this.classList.remove('image-loading');
            // You could add a fallback image here
        });

        // Add loading class initially
        if (!img.complete) {
            img.classList.add('image-loading');
        }
    });

    // Initialize page
    console.log('Real Estate Website Initialized');

    // Add fade-in animation to page elements
    const fadeElements = document.querySelectorAll('section');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });
});

// Add CSS animation for fade in effect
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style); 