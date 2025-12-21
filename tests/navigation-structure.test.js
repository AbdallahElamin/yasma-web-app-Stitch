/**
 * Property-Based Test: Navigation Structure Uniformity
 * 
 * Validates: Requirements 1.1, 7.5
 * - All pages have consistent header navigation structure
 * - Navigation links are uniform across all pages
 * - Mobile menu structure is consistent
 * - Logo structure is standardized
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

const EXPECTED_NAV_LINKS = [
    { href: 'index.html', text: 'Home' },
    { href: 'About_Us.html', text: 'About Us' },
    { href: 'Our_Projects.html', text: 'Our Projects' },
    { href: 'Certificates_and_licenses.html', text: 'Certificates' },
    { href: 'Contact_Us.html', text: 'Contact Us' }
];

describe('Navigation Structure Uniformity', () => {
    let htmlContents = {};

    beforeAll(() => {
        // Load all HTML files
        HTML_FILES.forEach(file => {
            const filePath = path.join(process.cwd(), file);
            if (fs.existsSync(filePath)) {
                htmlContents[file] = fs.readFileSync(filePath, 'utf8');
            }
        });
    });

    describe('Property 2: Navigation Structure Uniformity', () => {
        test('All pages have consistent header navigation structure', () => {
            const headerStructures = {};

            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Use regex to check for required navigation elements
                const hasHeader = /<header[^>]*class="[^"]*header-nav[^"]*"/.test(content);
                const hasNavContainer = /<div[^>]*class="[^"]*nav-container[^"]*"/.test(content);
                const hasLogo = /<div[^>]*class="[^"]*nav-logo[^"]*"/.test(content);
                const hasNavMenu = /<nav[^>]*class="[^"]*nav-menu[^"]*"/.test(content);
                const hasNavActions = /<div[^>]*class="[^"]*nav-actions[^"]*"/.test(content);
                const hasMobileMenuBtn = /<button[^>]*class="[^"]*btn-mobile-menu[^"]*"/.test(content);

                expect(hasHeader).toBe(true);
                expect(hasNavContainer).toBe(true);
                expect(hasLogo).toBe(true);
                expect(hasNavMenu).toBe(true);
                expect(hasNavActions).toBe(true);
                expect(hasMobileMenuBtn).toBe(true);

                headerStructures[filename] = {
                    hasHeader,
                    hasNavContainer,
                    hasLogo,
                    hasNavMenu,
                    hasNavActions,
                    hasMobileMenuBtn
                };
            });

            // Verify all pages have identical header structure
            const firstPageStructure = Object.values(headerStructures)[0];
            Object.entries(headerStructures).forEach(([filename, structure]) => {
                expect(structure).toEqual(firstPageStructure);
            });
        });

        test('Navigation links are uniform across all pages', () => {
            const navigationLinks = {};

            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Extract navigation links using regex
                const navMenuSection = content.match(/<nav[^>]*class="[^"]*nav-menu[^"]*"[^>]*>([\s\S]*?)<\/nav>/);
                const mobileMenuSection = content.match(/<div[^>]*class="[^"]*mobile-menu-links[^"]*"[^>]*>([\s\S]*?)<\/div>/);

                expect(navMenuSection).toBeTruthy();
                expect(mobileMenuSection).toBeTruthy();

                // Count navigation links
                const desktopLinkMatches = (navMenuSection[1].match(/<a[^>]*class="[^"]*nav-link[^"]*"/g) || []).length;
                const mobileLinkMatches = (mobileMenuSection[1].match(/<a[^>]*class="[^"]*nav-link[^"]*"/g) || []).length;

                // Check for expected links
                const hasHomeLink = /href="index\.html"[^>]*>Home<\/a>/.test(content);
                const hasAboutLink = /href="About_Us\.html"[^>]*>About Us<\/a>/.test(content);
                const hasProjectsLink = /href="Our_Projects\.html"[^>]*>Our Projects<\/a>/.test(content);
                const hasCertificatesLink = /href="Certificates_and_licenses\.html"[^>]*>Certificates<\/a>/.test(content);
                const hasContactLink = /href="Contact_Us\.html"[^>]*>Contact Us<\/a>/.test(content);

                navigationLinks[filename] = {
                    desktopCount: desktopLinkMatches,
                    mobileCount: mobileLinkMatches,
                    hasHomeLink,
                    hasAboutLink,
                    hasProjectsLink,
                    hasCertificatesLink,
                    hasContactLink
                };

                // Verify expected navigation structure
                expect(desktopLinkMatches).toBe(5);
                expect(mobileLinkMatches).toBe(5);
                expect(hasHomeLink).toBe(true);
                expect(hasAboutLink).toBe(true);
                expect(hasProjectsLink).toBe(true);
                expect(hasCertificatesLink).toBe(true);
                expect(hasContactLink).toBe(true);
            });

            // Verify all pages have identical navigation links
            const firstPageLinks = Object.values(navigationLinks)[0];
            Object.entries(navigationLinks).forEach(([filename, links]) => {
                expect(links).toEqual(firstPageLinks);
            });
        });

        test('Mobile menu structure is consistent', () => {
            const mobileMenuStructures = {};

            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check mobile menu structure using regex
                const hasMobileMenu = /<nav[^>]*class="[^"]*mobile-menu[^"]*"[^>]*id="mobile-menu"/.test(content);
                const hasMobileMenuLinks = /<div[^>]*class="[^"]*mobile-menu-links[^"]*"/.test(content);
                const hasMobileMenuActions = /<div[^>]*class="[^"]*mobile-menu-actions[^"]*"/.test(content);
                const hasCorrectId = /id="mobile-menu"/.test(content);

                expect(hasMobileMenu).toBe(true);
                expect(hasMobileMenuLinks).toBe(true);
                expect(hasMobileMenuActions).toBe(true);
                expect(hasCorrectId).toBe(true);

                mobileMenuStructures[filename] = {
                    hasMobileMenu,
                    hasMobileMenuLinks,
                    hasMobileMenuActions,
                    hasCorrectId
                };
            });

            // Verify all pages have identical mobile menu structure
            const firstPageStructure = Object.values(mobileMenuStructures)[0];
            Object.entries(mobileMenuStructures).forEach(([filename, structure]) => {
                expect(structure).toEqual(firstPageStructure);
            });
        });

        test('Logo structure is standardized', () => {
            const logoStructures = {};

            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check logo structure using regex
                const hasLogoIcon = /<div[^>]*class="[^"]*logo-icon[^"]*"/.test(content);
                const hasLogoText = /<div[^>]*class="[^"]*logo-text[^"]*"/.test(content);
                const hasLogoTitle = /<span[^>]*class="[^"]*logo-title[^"]*"[^>]*>YASMA<\/span>/.test(content);
                const hasLogoSubtitle = /<span[^>]*>Contracting Co\.<\/span>/.test(content);

                expect(hasLogoIcon).toBe(true);
                expect(hasLogoText).toBe(true);
                expect(hasLogoTitle).toBe(true);
                expect(hasLogoSubtitle).toBe(true);

                logoStructures[filename] = {
                    hasLogoIcon,
                    hasLogoText,
                    hasLogoTitle,
                    hasLogoSubtitle
                };
            });

            // Verify all pages have identical logo structure
            const firstPageStructure = Object.values(logoStructures)[0];
            Object.entries(logoStructures).forEach(([filename, structure]) => {
                expect(structure).toEqual(firstPageStructure);
            });
        });

        test('Theme toggle and action buttons are consistent', () => {
            const actionStructures = {};

            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check action buttons using regex
                const hasNavActions = /<div[^>]*class="[^"]*nav-actions[^"]*"/.test(content);
                const hasThemeToggle = /<button[^>]*id="theme-toggle"/.test(content);
                const hasPrimaryButton = /<button[^>]*class="[^"]*btn-primary[^"]*"/.test(content);
                const hasAriaLabel = /aria-label="Toggle theme"/.test(content);

                expect(hasNavActions).toBe(true);
                expect(hasThemeToggle).toBe(true);
                expect(hasPrimaryButton).toBe(true);
                expect(hasAriaLabel).toBe(true);

                actionStructures[filename] = {
                    hasNavActions,
                    hasThemeToggle,
                    hasPrimaryButton,
                    hasAriaLabel
                };
            });

            // Verify all pages have identical action structure
            const firstPageStructure = Object.values(actionStructures)[0];
            Object.entries(actionStructures).forEach(([filename, structure]) => {
                expect(structure).toEqual(firstPageStructure);
            });
        });

        test('Mobile menu toggle button has consistent structure', () => {
            const mobileToggleStructures = {};

            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check mobile toggle button using regex
                const hasMobileToggle = /<button[^>]*class="[^"]*btn-mobile-menu[^"]*"/.test(content);
                const hasCorrectId = /<button[^>]*id="mobile-menu-toggle"/.test(content);
                const hasIcon = /<span[^>]*class="[^"]*material-symbols-outlined[^"]*"[^>]*>menu<\/span>/.test(content);

                expect(hasMobileToggle).toBe(true);
                expect(hasCorrectId).toBe(true);
                expect(hasIcon).toBe(true);

                mobileToggleStructures[filename] = {
                    hasMobileToggle,
                    hasCorrectId,
                    hasIcon
                };
            });

            // Verify all pages have identical mobile toggle structure
            const firstPageStructure = Object.values(mobileToggleStructures)[0];
            Object.entries(mobileToggleStructures).forEach(([filename, structure]) => {
                expect(structure).toEqual(firstPageStructure);
            });
        });
    });

    describe('Navigation CSS Classes Consistency', () => {
        test('All navigation elements use consistent CSS classes', () => {
            const requiredClasses = [
                'header-nav',
                'nav-container', 
                'nav-logo',
                'logo-icon',
                'logo-text',
                'nav-menu',
                'nav-link',
                'nav-actions',
                'btn-icon',
                'btn-primary',
                'btn-mobile-menu',
                'mobile-menu',
                'mobile-menu-links',
                'mobile-menu-actions'
            ];

            Object.entries(htmlContents).forEach(([filename, content]) => {
                requiredClasses.forEach(className => {
                    const classRegex = new RegExp(`class="[^"]*${className}[^"]*"`);
                    expect(classRegex.test(content)).toBe(true);
                });
            });
        });
    });
});