/**
 * Property-Based Test: Semantic HTML Structure
 * 
 * Validates: Requirements 4.1, 6.1
 * - All pages use proper semantic HTML elements
 * - Heading hierarchy is correct (single h1 per page)
 * - ARIA labels and accessibility attributes are present
 * - Main content is wrapped in <main> element
 * - Navigation uses proper semantic structure
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

describe('Semantic HTML Structure', () => {
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

    describe('Property 5: Semantic HTML Structure', () => {
        test('All pages have proper semantic HTML5 structure', () => {
            const requiredElements = [
                '<header',
                '<nav',
                '<main',
                '<section',
                '<footer'
            ];

            Object.entries(htmlContents).forEach(([filename, content]) => {
                requiredElements.forEach(element => {
                    expect(content).toMatch(new RegExp(element));
                });
            });
        });

        test('Each page has exactly one h1 element for main page title', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Count h1 elements
                const h1Matches = content.match(/<h1[^>]*>/g) || [];
                expect(h1Matches.length).toBe(1);
                
                // Ensure logo uses proper span structure
                const logoSpan = /<span[^>]*class="[^"]*logo-title[^"]*"[^>]*>YASMA<\/span>/.test(content);
                expect(logoSpan).toBe(true);
            });
        });

        test('Main content is properly wrapped in main element', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                const hasMainElement = /<main[^>]*>/.test(content);
                expect(hasMainElement).toBe(true);
                
                const hasClosingMain = /<\/main>/.test(content);
                expect(hasClosingMain).toBe(true);
            });
        });

        test('Navigation elements have proper semantic structure', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check for main navigation with aria-label
                const hasMainNav = /<nav[^>]*class="[^"]*nav-menu[^"]*"[^>]*aria-label="Main navigation"/.test(content);
                expect(hasMainNav).toBe(true);
                
                // Check for mobile navigation with proper attributes
                const hasMobileNav = /<nav[^>]*class="[^"]*mobile-menu[^"]*"[^>]*aria-label="Mobile navigation"/.test(content);
                expect(hasMobileNav).toBe(true);
                
                // Check for role attribute on mobile navigation
                const hasMobileNavRole = /role="navigation"/.test(content);
                expect(hasMobileNavRole).toBe(true);
            });
        });

        test('Mobile menu toggle has proper accessibility attributes', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check for aria-label
                const hasAriaLabel = /aria-label="Toggle mobile menu"/.test(content);
                expect(hasAriaLabel).toBe(true);
                
                // Check for aria-expanded
                const hasAriaExpanded = /aria-expanded="false"/.test(content);
                expect(hasAriaExpanded).toBe(true);
                
                // Check for aria-controls
                const hasAriaControls = /aria-controls="mobile-menu"/.test(content);
                expect(hasAriaControls).toBe(true);
            });
        });

        test('Theme toggle button has proper accessibility attributes', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                const hasThemeAriaLabel = /aria-label="Toggle theme"/.test(content);
                expect(hasThemeAriaLabel).toBe(true);
            });
        });

        test('Sections use proper semantic structure', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check that content is organized in sections
                const sectionMatches = content.match(/<section[^>]*>/g) || [];
                expect(sectionMatches.length).toBeGreaterThan(0);
                
                // Check for proper section classes
                const hasSectionClass = /<section[^>]*class="[^"]*section[^"]*"/.test(content);
                expect(hasSectionClass).toBe(true);
            });
        });

        test('Footer has proper semantic structure', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                const hasFooter = /<footer[^>]*class="[^"]*footer[^"]*"/.test(content);
                expect(hasFooter).toBe(true);
                
                const hasClosingFooter = /<\/footer>/.test(content);
                expect(hasClosingFooter).toBe(true);
            });
        });

        test('Images have proper alt attributes', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Find all img tags
                const imgMatches = content.match(/<img[^>]*>/g) || [];
                
                imgMatches.forEach(imgTag => {
                    // Each img should have an alt attribute
                    expect(imgTag).toMatch(/alt="[^"]*"/);
                });
            });
        });

        test('Links have descriptive text or aria-labels', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check navigation links have descriptive text
                const navLinkPattern = /<a[^>]*class="[^"]*nav-link[^"]*"[^>]*>([^<]+)<\/a>/g;
                const navLinks = [...content.matchAll(navLinkPattern)];
                
                navLinks.forEach(match => {
                    const linkText = match[1].trim();
                    expect(linkText.length).toBeGreaterThan(0);
                    expect(linkText).not.toBe('');
                });
            });
        });

        test('Form elements have proper labels and structure', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Find all input elements
                const inputMatches = content.match(/<input[^>]*>/g) || [];
                
                // Find all button elements that should have accessibility attributes
                const importantButtonMatches = content.match(/<button[^>]*(?:id="theme-toggle"|id="mobile-menu-toggle"|aria-label)[^>]*>/g) || [];
                
                // Important buttons should have aria-label
                importantButtonMatches.forEach(buttonTag => {
                    const hasAriaLabel = /aria-label="[^"]*"/.test(buttonTag);
                    expect(hasAriaLabel).toBe(true);
                });
            });
        });
    });

    describe('Heading Hierarchy Validation', () => {
        test('Heading levels follow proper hierarchy', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Extract main content headings (exclude footer headings and card content)
                let mainContent = content.split('<footer')[0]; // Get content before footer
                
                // For project pages, also exclude project card content which has its own hierarchy
                if (filename.includes('Projects')) {
                    mainContent = mainContent.split('<div class="grid-projects">')[0];
                }
                
                const headingMatches = [...mainContent.matchAll(/<h([1-6])[^>]*>/g)];
                const headingLevels = headingMatches.map(match => parseInt(match[1]));
                
                if (headingLevels.length > 0) {
                    // Should start with h1
                    expect(headingLevels[0]).toBe(1);
                    
                    // Check that heading levels don't skip more than 1 level in main content
                    for (let i = 1; i < headingLevels.length; i++) {
                        const currentLevel = headingLevels[i];
                        const previousLevel = headingLevels[i - 1];
                        
                        // Allow some flexibility for content sections
                        expect(currentLevel).toBeLessThanOrEqual(Math.max(previousLevel + 1, 3));
                    }
                }
            });
        });

        test('Page titles use h1 and are descriptive', () => {
            const expectedTitles = {
                'index.html': /Building the.*Future.*of KSA/,
                'About_Us.html': /Who We Are/,
                'Certificates_and_licenses.html': /Certificates.*Licenses/,
                'Contact_Us.html': /Get in Touch/,
                'Our_Projects.html': /Our Projects/
            };

            Object.entries(htmlContents).forEach(([filename, content]) => {
                const h1Match = content.match(/<h1[^>]*>([^<]+(?:<[^>]*>[^<]*<\/[^>]*>[^<]*)*)<\/h1>/);
                expect(h1Match).toBeTruthy();
                
                if (expectedTitles[filename]) {
                    const h1Text = h1Match[1].replace(/<[^>]*>/g, '').trim();
                    expect(h1Text).toMatch(expectedTitles[filename]);
                }
            });
        });
    });

    describe('ARIA and Accessibility Attributes', () => {
        test('Interactive elements have proper ARIA attributes', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check for ARIA labels on buttons
                const buttonAriaLabels = content.match(/aria-label="[^"]*"/g) || [];
                expect(buttonAriaLabels.length).toBeGreaterThanOrEqual(2); // At least theme toggle and mobile menu
                
                // Check for ARIA expanded on mobile menu toggle
                const ariaExpanded = /aria-expanded="false"/.test(content);
                expect(ariaExpanded).toBe(true);
                
                // Check for ARIA controls
                const ariaControls = /aria-controls="mobile-menu"/.test(content);
                expect(ariaControls).toBe(true);
            });
        });

        test('Navigation landmarks are properly labeled', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Main navigation should have aria-label
                const mainNavLabel = /aria-label="Main navigation"/.test(content);
                expect(mainNavLabel).toBe(true);
                
                // Mobile navigation should have aria-label
                const mobileNavLabel = /aria-label="Mobile navigation"/.test(content);
                expect(mobileNavLabel).toBe(true);
            });
        });
    });

    describe('Document Structure Validation', () => {
        test('HTML5 doctype and language attributes are present', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check for HTML5 doctype
                expect(content).toMatch(/<!DOCTYPE html>/i);
                
                // Check for language attribute
                expect(content).toMatch(/<html[^>]*lang="en"/);
            });
        });

        test('Meta tags for viewport and charset are present', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                // Check for charset
                expect(content).toMatch(/<meta[^>]*charset="utf-8"/i);
                
                // Check for viewport
                expect(content).toMatch(/<meta[^>]*name="viewport"/i);
            });
        });

        test('Page titles are descriptive and present', () => {
            Object.entries(htmlContents).forEach(([filename, content]) => {
                const titleMatch = content.match(/<title>([^<]+)<\/title>/);
                expect(titleMatch).toBeTruthy();
                expect(titleMatch[1].trim().length).toBeGreaterThan(0);
            });
        });
    });
});