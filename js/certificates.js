// ===================================
// YASMA Certificates Lightbox JavaScript
// Handles certificates image-viewer logic
// ===================================

(function () {
    'use strict';

    let currentCertIndex = 0;
    let certificateImages = [];

    function openLightbox(index) {
        currentCertIndex = index;
        const modal = document.getElementById('lightbox-modal');
        const image = document.getElementById('lightbox-image');

        if (modal && image) {
            image.src = certificateImages[index];
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
        currentCertIndex = (currentCertIndex + 1) % certificateImages.length;
        const image = document.getElementById('lightbox-image');
        if (image) {
            image.src = certificateImages[currentCertIndex];
        }
    }

    function showPrevImage() {
        currentCertIndex = (currentCertIndex - 1 + certificateImages.length) % certificateImages.length;
        const image = document.getElementById('lightbox-image');
        if (image) {
            image.src = certificateImages[currentCertIndex];
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Collect all certificate images
        const certImageElements = document.querySelectorAll('.cert-image-actual');
        certificateImages = Array.from(certImageElements).map(img => img.src);

        // Add click events to images
        certImageElements.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => openLightbox(index));
        });

        // Lightbox controls
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        const modal = document.getElementById('lightbox-modal');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrevImage();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showNextImage();
            });
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
