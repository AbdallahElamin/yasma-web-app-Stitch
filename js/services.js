// ===================================
// YASMA Services Page JavaScript
// Handles service card display and filtering
// ===================================

(function () {
    'use strict';

    // Only run on Services.html
    if (!window.location.pathname.includes('Services.html')) {
        return;
    }

    // ===================================
    // LOAD ALL SERVICES
    // ===================================
    function loadAllServices() {
        const servicesGrid = document.getElementById('services-grid');

        if (!servicesGrid || typeof getAllServices !== 'function') {
            return;
        }

        const allServices = getAllServices();

        // Clear existing content
        servicesGrid.innerHTML = '';

        allServices.forEach(service => {
            const serviceCard = createServiceCard(service);
            servicesGrid.appendChild(serviceCard);
        });

        // Setup filtering after services are loaded
        setupServiceFiltering();
    }

    // ===================================
    // CREATE SERVICE CARD ELEMENT
    // ===================================
    function createServiceCard(service) {
        const card = document.createElement('div');
        card.className = 'service-work-card';
        card.setAttribute('data-category', service.category);

        // Add click event to navigate to gallery
        card.onclick = function () {
            window.location.href = `Gallery.html?service=${service.id}`;
        };

        card.innerHTML = `
      <div class="service-work-card-image">
        <img src="${service.thumbnail}" alt="${service.title}" loading="lazy" />
        <div class="service-badge">${service.category}</div>
      </div>
      <div class="service-work-card-content">
        <h3 class="service-work-card-title">${service.title}</h3>
        <p class="service-work-card-description">${service.description}</p>
        <div class="service-work-card-footer">
          View Details
          <span class="material-symbols-outlined">arrow_right_alt</span>
        </div>
      </div>
    `;

        return card;
    }

    // ===================================
    // SERVICE FILTERING
    // ===================================
    function setupServiceFiltering() {
        const filterButtons = document.querySelectorAll('.filter-button');
        const servicesGrid = document.getElementById('services-grid');

        if (filterButtons.length === 0 || !servicesGrid) {
            return;
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get the category
                const category = this.getAttribute('data-category');

                // Filter services
                const serviceCards = servicesGrid.querySelectorAll('.service-work-card');
                serviceCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    // Show all services if "all" is selected, otherwise filter by category
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex';
                        // Add fade-in animation
                        card.style.animation = 'fadeIn 0.3s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Scroll to services grid smoothly
                servicesGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });
    }

    // ===================================
    // INITIALIZE
    // ===================================
    document.addEventListener('DOMContentLoaded', () => {
        loadAllServices();
    });

})();
