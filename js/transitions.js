// ===================================
// YASMA Contracting Co. - Page Transitions
// Smooth page transitions using View Transitions API with fallback
// ===================================

(function () {
    'use strict';

    // Check if View Transitions API is supported
    const supportsViewTransitions = 'startViewTransition' in document;

    /**
     * Navigate to a new page with smooth transition
     */
    function navigateWithTransition(url) {
        if (supportsViewTransitions) {
            // Use View Transitions API for supported browsers
            document.startViewTransition(() => {
                window.location.href = url;
            });
        } else {
            // Fallback: CSS-based fade out animation
            document.body.classList.add('page-transition-exit');

            setTimeout(() => {
                window.location.href = url;
            }, 300); // Match CSS animation duration
        }
    }

    /**
     * Intercept navigation link clicks
     */
    function interceptLinks() {
        // Get all internal navigation links
        const links = document.querySelectorAll('a[href]');

        links.forEach(link => {
            const href = link.getAttribute('href');

            // Only intercept internal HTML page links (not anchors, external links, or mailto)
            if (href &&
                href.endsWith('.html') &&
                !href.startsWith('http') &&
                !href.startsWith('mailto:') &&
                !href.startsWith('tel:')) {

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigateWithTransition(href);
                });
            }
        });
    }

    /**
     * Add page enter animation on load
     */
    function addPageEnterAnimation() {
        // For browsers without View Transitions API, add enter animation
        if (!supportsViewTransitions) {
            document.body.classList.add('page-transition-enter');

            // Remove the class after animation completes
            setTimeout(() => {
                document.body.classList.remove('page-transition-enter');
            }, 300);
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            interceptLinks();
            addPageEnterAnimation();
        });
    } else {
        interceptLinks();
        addPageEnterAnimation();
    }

})();
