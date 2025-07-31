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

// Dynamic property loading
const API_BASE = window.location.origin;

async function loadProperties() {
    const propertyList = document.getElementById('property-list');
    const loading = document.getElementById('properties-loading');

    try {
        const response = await fetch(`${API_BASE}/api/properties`);
        const properties = await response.json();

        // Hide loading indicator
        if (loading) loading.style.display = 'none';

        // Clear existing content except loading indicator
        const existingCards = propertyList.querySelectorAll('.property-card');
        existingCards.forEach(card => card.remove());

        // Add hardcoded sample properties for a mix of content
        const sampleProperties = [
            {
                title: 'Luxury Villa in Gated Project',
                partner: 'EMAAR Dubai & India',
                description: 'A beautiful villa located in a gated community with modern amenities and lush green surroundings.',
                price: 12000000,
                location: 'Dubai Marina',
                image: 'images/3954ba75-04a0-4ed0-865b-daa63bfc98d2.png',
                features: ['4329 sq ft', '4 bed', '4 bath']
            },
            {
                title: 'Modern 4 BHK Villa',
                partner: 'Bhutani Infra',
                description: 'A contemporary villa with spacious rooms, private gardens, and premium fittings and fixtures throughout.',
                price: 11600000,
                location: 'Noida',
                image: 'images/28bd084d-5797-44ac-b316-ecb32fedfe0a.png',
                features: ['3500 sq ft', '4 bed', '3 bath']
            },
            {
                title: 'Premium Apartment Complex',
                partner: 'Mahima Group',
                description: 'Luxury apartments with world-class amenities and excellent connectivity.',
                price: 8500000,
                location: 'Jaipur',
                image: 'images/046efad8-0521-47c6-8475-16daed3db340.png',
                features: ['2200 sq ft', '3 bed', '2 bath']
            }
        ];

        // Combine API properties with sample properties
        const allProperties = [...sampleProperties, ...properties];

        // Create property cards
        allProperties.forEach(property => {
            const card = createPropertyCard(property);
            propertyList.appendChild(card);
        });

        // If no properties, show message
        if (allProperties.length === 0) {
            propertyList.innerHTML = '<div class="col-span-full text-center py-8 text-gray-600">No properties found.</div>';
        }

    } catch (error) {
        console.error('Error loading properties:', error);
        if (loading) {
            loading.innerHTML = '<div class="col-span-full text-center py-8 text-red-600">Error loading properties. Please try again later.</div>';
        }
    }
}

function createPropertyCard(property) {
    const article = document.createElement('article');
    article.className = 'property-card border border-gray-200 rounded shadow-sm overflow-hidden';

    const priceFormatted = property.price > 10000000
        ? `₹${(property.price / 10000000).toFixed(1)} Cr`
        : `₹${(property.price / 100000).toFixed(0)} L`;

    const features = property.features || ['N/A sq ft', 'N/A bed', 'N/A bath'];

    article.innerHTML = `
    <div class="relative">
      <img src="${property.image}" alt="${property.title}" class="w-full h-48 object-cover" />
      <span class="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded">New Property</span>
      <span class="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">For Sale</span>
    </div>
    <div class="p-4">
      <h4 class="text-lg font-semibold mb-1">${property.title}</h4>
      <h5 class="text-primary text-base font-semibold mb-2">
        ${priceFormatted}
        <small class="text-gray-500"> - ${property.partner}</small>
      </h5>
      <p class="text-sm text-gray-600 mb-3">${property.description}</p>
      <a href="#" class="text-primary text-sm flex items-center hover:underline">More Details
        <i class="fa-solid fa-caret-right ml-1"></i></a>
      <div class="flex space-x-4 text-sm text-gray-600 mt-3">
        <span class="flex items-center space-x-1"><i class="fa-solid fa-expand"></i> <span>${features[0]}</span></span>
        <span class="flex items-center space-x-1"><i class="fa-solid fa-bed"></i> <span>${features[1]}</span></span>
        <span class="flex items-center space-x-1"><i class="fa-solid fa-bath"></i> <span>${features[2]}</span></span>
      </div>
    </div>
  `;

    return article;
}

// Load properties when page loads
if (document.getElementById('property-list')) {
    loadProperties();
}

// Query Form Functionality
document.addEventListener('DOMContentLoaded', function () {
    const queryForm = document.getElementById('queryForm');
    const whatsappSubmitBtn = document.getElementById('whatsappSubmit');
    const emailSubmitBtn = document.getElementById('emailSubmit');

    if (queryForm) {
        // WhatsApp submission
        queryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            submitQueryToWhatsApp();
        });

        // Email submission
        if (emailSubmitBtn) {
            emailSubmitBtn.addEventListener('click', function () {
                if (validateQueryForm()) {
                    submitQueryToEmail();
                }
            });
        }
    }

    function validateQueryForm() {
        const requiredFields = ['queryName', 'queryPhone', 'queryEmail', 'queryType', 'queryBudget', 'queryMessage'];
        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                isValid = false;
                if (field) {
                    field.classList.add('border-red-500');
                    field.focus();
                }
            } else {
                if (field) {
                    field.classList.remove('border-red-500');
                }
            }
        });

        // Validate email format
        const email = document.getElementById('queryEmail');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('border-red-500');
                isValid = false;
            }
        }

        // Validate phone number (basic validation)
        const phone = document.getElementById('queryPhone');
        if (phone && phone.value) {
            const phoneRegex = /^[\d\s\+\-\(\)]{10,15}$/;
            if (!phoneRegex.test(phone.value)) {
                phone.classList.add('border-red-500');
                isValid = false;
            }
        }

        if (!isValid) {
            showNotification('Please fill in all required fields correctly.', 'error');
        }

        return isValid;
    }

    function submitQueryToWhatsApp() {
        if (!validateQueryForm()) return;

        const formData = getFormData();
        const message = formatWhatsAppMessage(formData);
        const phoneNumber = '+918559067075';
        const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

        // Show success message
        showNotification('Redirecting to WhatsApp...', 'success');

        // Open WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            resetQueryForm();
        }, 1000);
    }

    function submitQueryToEmail() {
        const formData = getFormData();
        const subject = `Property Inquiry from ${formData.name}`;
        const body = formatEmailMessage(formData);
        const email = 'sahil.aps2k12@gmail.com';
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Show success message
        showNotification('Opening email client...', 'success');

        // Open email client
        setTimeout(() => {
            window.location.href = mailtoUrl;
            resetQueryForm();
        }, 1000);
    }

    function getFormData() {
        return {
            name: document.getElementById('queryName').value.trim(),
            phone: document.getElementById('queryPhone').value.trim(),
            email: document.getElementById('queryEmail').value.trim(),
            propertyType: document.getElementById('queryType').value,
            budget: document.getElementById('queryBudget').value,
            message: document.getElementById('queryMessage').value.trim()
        };
    }

    function formatWhatsAppMessage(data) {
        return `🏠 *Property Inquiry - Military Veteran Real Estate Consultancy*

👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
📧 *Email:* ${data.email}
🏡 *Property Type:* ${data.propertyType}
💰 *Budget:* ${data.budget}

💬 *Message:*
${data.message}

---
Sent via Military Veteran Real Estate Consultancy website`;
    }

    function formatEmailMessage(data) {
        return `Property Inquiry - Military Veteran Real Estate Consultancy

Dear Team,

I am interested in your real estate services. Please find my details below:

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Property Type: ${data.propertyType}
Budget Range: ${data.budget}

Message:
${data.message}

Thank you for your assistance.

Best regards,
${data.name}

---
This inquiry was submitted through the Military Veteran Real Estate Consultancy website.`;
    }

    function resetQueryForm() {
        if (queryForm) {
            queryForm.reset();
            // Remove any error styling
            const inputs = queryForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.classList.remove('border-red-500');
            });
        }
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;

        if (type === 'success') {
            notification.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        } else {
            notification.classList.add('bg-blue-500', 'text-white');
        }

        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}); 