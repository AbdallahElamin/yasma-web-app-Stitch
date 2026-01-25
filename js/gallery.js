// ===================================
// YASMA Gallery Page JavaScript
// Handles project gallery display and lightbox
// ===================================

(function () {
    'use strict';

    // Only run on Gallery.html
    if (!window.location.pathname.includes('Gallery.html')) {
        return;
    }

    // ===================================
    // URL PARAMETER READING
    // ===================================
    function getURLParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // ===================================
    // LOAD CONTENT (PROJECT OR SERVICE)
    // ===================================
    function loadContent() {
        const projectId = getURLParameter('project');
        const serviceId = getURLParameter('service');

        if (projectId) {
            handleProjectLoad(projectId);
        } else if (serviceId) {
            handleServiceLoad(serviceId);
        } else {
            // No ID specified, redirect to Our_Projects.html as default
            window.location.href = 'Our_Projects.html';
        }
    }

    function handleProjectLoad(projectId) {
        const project = getProjectById(projectId);
        if (!project) {
            window.location.href = 'Our_Projects.html';
            return;
        }
        updatePageForProject(project);
        loadGalleryImages(project);
    }

    function handleServiceLoad(serviceId) {
        // Ensure services-data.js is loaded
        if (typeof getServiceById !== 'function') {
            console.error('Services data not loaded');
            return;
        }

        const service = getServiceById(serviceId);
        if (!service) {
            window.location.href = 'Services.html';
            return;
        }
        updatePageForService(service);
        loadGalleryImages(service);
    }

    // ===================================
    // UPDATE PAGE CONTENT
    // ===================================
    function updatePageForProject(project) {
        // Update page title
        document.title = `${project.title} - YASMA Contracting Co.`;

        // Update breadcrumb
        const parentLink = document.getElementById('breadcrumb-parent-link');
        const currentItem = document.getElementById('breadcrumb-current-item');

        if (parentLink) {
            parentLink.textContent = 'Projects';
            parentLink.href = 'Our_Projects.html';
        }
        if (currentItem) currentItem.textContent = project.title;

        // Update back link
        const backLink = document.getElementById('back-link');
        const backLinkText = document.getElementById('back-link-text');

        if (backLink) backLink.href = 'Our_Projects.html';
        if (backLinkText) backLinkText.textContent = 'Back to Projects';

        // Update section title
        const galleryTitle = document.getElementById('gallery-section-title');
        if (galleryTitle) galleryTitle.textContent = 'Project Gallery';

        // Update hero title
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) heroTitle.textContent = 'Project Gallery';

        // Update details
        const titleEl = document.getElementById('project-title');
        if (titleEl) titleEl.textContent = project.title;

        const badgeEl = document.getElementById('project-badge');
        if (badgeEl) {
            badgeEl.textContent = project.badge;
            badgeEl.style.display = 'inline-block';
        }

        const descriptionEl = document.getElementById('project-description');
        if (descriptionEl) descriptionEl.textContent = project.description;

        // Show project specific elements
        const locationContainer = document.getElementById('project-location-container');
        if (locationContainer) {
            locationContainer.style.display = 'flex';
            const locationEl = document.getElementById('project-location');
            if (locationEl) locationEl.textContent = project.location;
        }

        const durationContainer = document.getElementById('project-duration-container');
        if (durationContainer) {
            durationContainer.style.display = 'flex';
            const durationEl = document.getElementById('project-duration');
            if (durationEl) durationEl.textContent = project.duration;
        }
    }

    function updatePageForService(service) {
        // Update page title
        document.title = `${service.title} - YASMA Contracting Co.`;

        // Update breadcrumb
        const parentLink = document.getElementById('breadcrumb-parent-link');
        const currentItem = document.getElementById('breadcrumb-current-item');

        if (parentLink) {
            parentLink.textContent = 'Services';
            parentLink.href = 'Services.html';
        }
        if (currentItem) currentItem.textContent = service.title;

        // Update back link
        const backLink = document.getElementById('back-link');
        const backLinkText = document.getElementById('back-link-text');

        if (backLink) backLink.href = 'Services.html';
        if (backLinkText) backLinkText.textContent = 'Back to Services';

        // Update section title
        const galleryTitle = document.getElementById('gallery-section-title');
        if (galleryTitle) galleryTitle.textContent = 'Service Gallery';

        // Update hero title
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) heroTitle.textContent = 'Service Gallery';

        // Update details
        const titleEl = document.getElementById('project-title');
        if (titleEl) titleEl.textContent = service.title;

        const badgeEl = document.getElementById('project-badge');
        if (badgeEl) {
            badgeEl.textContent = service.category;
            badgeEl.style.display = 'inline-block';
        }

        const descriptionEl = document.getElementById('project-description');
        if (descriptionEl) descriptionEl.textContent = service.description;

        // Hide project specific elements
        const locationContainer = document.getElementById('project-location-container');
        if (locationContainer) locationContainer.style.display = 'none';

        const durationContainer = document.getElementById('project-duration-container');
        if (durationContainer) durationContainer.style.display = 'none';
    }

    // ===================================
    // LOAD GALLERY IMAGES
    // ===================================
    function loadGalleryImages(item) {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;

        // Clear existing content
        galleryGrid.innerHTML = '';

        // Determine images array (handle both structures if needed, though they are similar)
        // Services might have a thumbnail that isn't in images array, let's include it if desired or just use images
        // User asked: "show the rest of the images in the folder with the Thumbnail picture"

        let imagesToDisplay = [];

        // For services, we usually have a thumbnail separately. Let's add it first if it exists
        if (item.thumbnail && !item.images.includes(item.thumbnail)) {
            // Check if thumbnail is already absolute or relative to images folder
            // Actually, in our data, thumbnail is a path string. 
            // We can just add it to the start of the list.
            imagesToDisplay.push(item.thumbnail);
        }

        if (item.images && Array.isArray(item.images)) {
            imagesToDisplay = [...imagesToDisplay, ...item.images];
        }

        // Add each image
        imagesToDisplay.forEach((imagePath, index) => {
            const imageCard = document.createElement('div');
            imageCard.className = 'project-card';
            imageCard.style.cursor = 'pointer';
            imageCard.setAttribute('data-image-index', index);

            imageCard.innerHTML = `
        <div class="project-card-image" style="height: 300px;">
          <img src="${imagePath}" alt="${item.title} - Image ${index + 1}" 
               style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem;" />
        </div>
      `;

            // Add click event to open lightbox
            imageCard.addEventListener('click', () => openLightbox(index, imagesToDisplay));

            galleryGrid.appendChild(imageCard);
        });
    }

    // ===================================
    // LIGHTBOX FUNCTIONALITY
    // ===================================
    let currentImageIndex = 0;
    let currentImages = [];

    function openLightbox(index, images) {
        currentImageIndex = index;
        currentImages = images;

        const modal = document.getElementById('lightbox-modal');
        const image = document.getElementById('lightbox-image');

        if (modal && image) {
            image.src = images[index];
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        const modal = document.getElementById('lightbox-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        const image = document.getElementById('lightbox-image');
        if (image) {
            image.src = currentImages[currentImageIndex];
        }
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        const image = document.getElementById('lightbox-image');
        if (image) {
            image.src = currentImages[currentImageIndex];
        }
    }

    // ===================================
    // EVENT LISTENERS
    // ===================================
    document.addEventListener('DOMContentLoaded', () => {
        // Load content (project or service) depending on URL
        loadContent();

        // Lightbox controls
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        const modal = document.getElementById('lightbox-modal');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', showPrevImage);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', showNextImage);
        }

        // Close lightbox when clicking outside the image
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeLightbox();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('lightbox-modal');
            if (modal && modal.style.display === 'flex') {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });
    });

})();
