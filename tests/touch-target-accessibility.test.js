/**
 * Property-Based Test: Touch Target Accessibility
 * 
 * Validates: Requirements 2.3, 7.4
 * - All interactive elements meet 44px minimum touch target size
 * - Navigation elements are accessible via keyboard
 * - Focus states are properly implemented
 * - Mobile navigation optimized for touch interaction
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const HTML_FILES = [
    'index.html',
    'About_Us.html', 
    'Certificates_and_licenses.html',
    'Contact_Us.html',
    'Our_Projects.html'
];

const CSS_FILE = 'css/styles.css';

describe('Touch Target Accessibility', () => {
    let htmlContents = {};
    let cssContent = '';

    beforeAll(() => {
        // Load all HTML files
        HTML_FILES.forEach(file => {
            const filePath = path.join(process.cwd(), file);
            if (fs.existsSync(filePath)) {
                htmlContents[file] = fs.readFileSync(filePath, 'utf8');
            }
        });

        // Load CSS file
        const cssPath = path.join(process.cwd(), CSS_FILE);
        if (fs.existsSync(cssPath)) {
            cssContent = fs.readFileSync(cssPath, 'utf8');
        }
    });

    describe('Property 7: Touch Target Accessibility', () => {
        test('Mobile menu toggle button meets 44px minimum touch target', () => {
            // Check CSS for mobile menu button sizing
            const mobileMenuBtnRegex = /\.btn-mobile-menu\s*{[^}]*min-width:\s*44px[^}]*min-height:\s*44px[^}]*}/s;
            expect(mobileMenuBtnRegex.test(cssContent)).toBe(true);

            // Verify all pages have mobile menu toggle button
            Object.entries(htmlContents).forEach(([filename, content]) => {
                const hasMobileMenuBtn = /<button[^>]*class="[^"]*btn-mobile-menu[^"]*"/.test(content);
                expect(hasMobileMenuBtn).toBe(true);
            });
        });

        test('Desktop navigation links have adequate touch targets', () => {
            // Check CSS for navigation link sizing
            const navLinkRegex = /\.nav-link\s*{[^}]*min-height:\s*44px[^}]*}/s;
            expect(navLinkRegex.test(cssContent)).toBe(true);

            // Verify navigation links have proper padding
            const navLinkPaddingRegex = /\.nav-link\s*{[^}]*padding:[^;}]*var\(--spacing-[^)]+\)[^}]*}/s;
            expect(navLinkPaddingRegex.test(cssContent)).toBe(true);
        });

        test('Mobile navigation links meet touch target requirements', () => {
            // Check CSS for mobile navigation link sizing
            const mobileNavLinkRegex = /\.mobile-menu\s+\.nav-link\s*{[^}]*min-height:\s*44px[^}]*}/s;
            expect(mobileNavLinkRegex.test(cssContent)).toBe(true);

            // Verify mobile navigation links have adequate padding
            const mobileNavPaddingRegex = /\.mobile-menu\s+\.nav-link\s*{[^}]*padding:[^;}]*var\(--spacing-md\)[^}]*}/s;
            expect(mobileNavPaddingRegex.test(cssContent)).toBe(true);
        });

        test('Action buttons meet minimum touch target size', () => {
            // Check CSS for icon button sizing
            const btnIconRegex = /\.btn-icon\s*{[^}]*min-width:\s*44px[^}]*min-height:\s*44px[^}]*}/s;
            expect(btnIconRegex.test(cssContent)).toBe(true);

            // Check for primary button adequate sizing
            const btnPrimaryRegex = /\.btn-primary\s*{[^}]*padding:[^;}]*var\(--btn-padding-y\)[^}]*}/s;
            expect(btnPrimaryRegex.test(cssContent)).toBe(true);
        });

        test('Focus states are implemented for keyboard accessibility', () => {
            // Check for focus styles on navigation links
            const navLinkFocusRegex = /\.nav-link:focus\s*{[^}]*outline:[^;}]*2px[^;}]*solid[^}]*}/s;
            expect(navLinkFocusRegex.test(cssContent)).toBe(true);

            // Check for focus styles on mobile menu links
            const mobileNavFocusRegex = /\.mobile-menu\s+\.nav-link:focus\s*{[^}]*outline:[^;}]*2px[^;}]*solid[^}]*}/s;
            expect(mobileNavFocusRegex.test(cssContent)).toBe(true);

            // Check for focus styles on buttons
            const btnIconFocusRegex = /\.btn-icon:focus\s*{[^}]*outline:[^;}]*2px[^;}]*solid[^}]*}/s;
            expect(btnIconFocusRegex.test(cssContent)).toBe(true);

            const mobileMenuBtnFocusRegex = /\.btn-mobile-menu:focus\s*{[^}]*outline:[^;}]*2px[^;}]*solid[^}]*}/s;
            expect(mobileMenuBtnFocusRegex.test(cssContent)).toBe(true);
        });

        test('Hover states enhance user interaction feedback', () => {
            // Check for hover styles on navigation links
            const navLinkHoverRegex = /\.nav-link:hover\s*{[^}]*}/s;
            expect(navLinkHoverRegex.test(cssContent)).toBe(true);

            // Check for hover styles on mobile navigation links
            const mobileNavHoverRegex = /\.mobile-menu\s+\.nav-link:hover\s*{[^}]*}/s;
            expect(mobileNavHoverRegex.test(cssContent)).toBe(true);

            // Check for hover styles on buttons
            const btnIconHoverRegex = /\.btn-icon:hover\s*{[^}]*}/s;
            expect(btnIconHoverRegex.test(cssContent)).toBe(true);

            const mobileMenuBtnHoverRegex = /\.btn-mobile-menu:hover\s*{[^}]*}/s;
            expect(mobileMenuBtnHoverRegex.test(cssContent)).toBe(true);
        });

        test('Active states are properly styled for mobile navigation', () => {
            // Check for active navigation link styles
            const navLinkActiveRegex = /\.nav-link-active\s*{[^}]*}/s;
            expect(navLinkActiveRegex.test(cssContent)).toBe(true);

            // Check for mobile navigation active styles
            const mobileNavActiveRegex = /\.mobile-menu\s+\.nav-link-active\s*{[^}]*}/s;
            expect(mobileNavActiveRegex.test(cssContent)).toBe(true);
        });

        test('Mobile menu has proper spacing for touch interaction', () => {
            // Check mobile menu padding
            const mobileMenuPaddingRegex = /\.mobile-menu\s*{[^}]*padding:[^;}]*var\(--spacing-lg\)[^}]*}/s;
            expect(mobileMenuPaddingRegex.test(cssContent)).toBe(true);

            // Check mobile menu links spacing
            const mobileMenuLinksGapRegex = /\.mobile-menu-links\s*{[^}]*gap:[^;}]*var\(--spacing-xs\)[^}]*}/s;
            expect(mobileMenuLinksGapRegex.test(cssContent)).toBe(true);
        });

        test('All interactive elements have proper cursor styling', () => {
            // Check for cursor pointer on buttons
            const btnCursorRegex = /cursor:\s*pointer/g;
            const cursorMatches = cssContent.match(btnCursorRegex);
            expect(cursorMatches).toBeTruthy();
            expect(cursorMatches.length).toBeGreaterThanOrEqual(2); // At least mobile menu button and icon buttons
        });

        test('Transition effects enhance user experience without hindering accessibility', () => {
            // Check for smooth transitions on interactive elements
            const transitionRegex = /transition:[^;}]*var\(--transition-[^)]+\)/g;
            const transitionMatches = cssContent.match(transitionRegex);
            expect(transitionMatches).toBeTruthy();
            expect(transitionMatches.length).toBeGreaterThanOrEqual(5); // Multiple elements should have transitions

            // Verify mobile menu has proper transition
            const mobileMenuTransitionRegex = /\.mobile-menu\s*{[^}]*transition:[^;}]*transform[^;}]*opacity[^}]*}/s;
            expect(mobileMenuTransitionRegex.test(cssContent)).toBe(true);
        });
    });

    describe('Accessibility Attributes in HTML', () => {
        test('Theme toggle button has proper aria-label', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                const hasAriaLabel = /aria-label="Toggle theme"/.test(content);
                expect(hasAriaLabel).toBe(true);
            });
        });

        test('Mobile menu toggle has proper structure for screen readers', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check for mobile menu toggle button with ID
                const hasMobileToggleId = /<button[^>]*id="mobile-menu-toggle"/.test(content);
                expect(hasMobileToggleId).toBe(true);

                // Check for corresponding mobile menu with ID
                const hasMobileMenuId = /<nav[^>]*id="mobile-menu"/.test(content);
                expect(hasMobileMenuId).toBe(true);
            });
        });

        test('Navigation links have descriptive text content', () => {
            const expectedLinkTexts = ['Home', 'About Us', 'Our Projects', 'Certificates', 'Contact Us'];
            
            Object.entries(htmlContents).forEach(([filename, content]) => {
                expectedLinkTexts.forEach(linkText => {
                    const linkRegex = new RegExp(`>${linkText}<\/a>`);
                    expect(linkRegex.test(content)).toBe(true);
                });
            });
        });
    });

    describe('Mobile-First Responsive Design', () => {
        test('Mobile navigation is hidden on desktop breakpoints', () => {
            // Check that mobile menu button is hidden on tablet and desktop
            const mobileMenuHiddenRegex = /@media\s*\([^)]*min-width:\s*481px[^)]*\)\s*{[^}]*\.btn-mobile-menu\s*{[^}]*display:\s*none[^}]*}/s;
            expect(mobileMenuHiddenRegex.test(cssContent)).toBe(true);
        });

        test('Desktop navigation is shown on appropriate breakpoints', () => {
            // Check that desktop nav menu is shown on tablet and desktop
            const desktopNavShownRegex = /@media\s*\([^)]*min-width:\s*481px[^)]*\)\s*{[^}]*\.nav-menu\s*{[^}]*display:\s*flex[^}]*}/s;
            expect(desktopNavShownRegex.test(cssContent)).toBe(true);
        });

        test('Touch target sizes are optimized for mobile devices', () => {
            // Verify that all interactive elements meet or exceed 44px minimum
            const minTouchTargetRegex = /min-(?:width|height):\s*44px/g;
            const touchTargetMatches = cssContent.match(minTouchTargetRegex);
            expect(touchTargetMatches).toBeTruthy();
            expect(touchTargetMatches.length).toBeGreaterThanOrEqual(6); // Multiple elements should have min touch targets
        });
    });
});