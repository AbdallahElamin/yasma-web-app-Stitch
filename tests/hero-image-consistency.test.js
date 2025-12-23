/**
 * Hero Image Consistency Property Test
 * Feature: website-modernization, Property 9: Hero Image Consistency
 * Validates: Requirements 8.1, 8.2, 8.3
 * 
 * Tests that all pages display the same hero background image (images/background/67.jpg)
 * with consistent positioning and responsive behavior across all viewport sizes.
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files in the project root
const getHtmlFiles = () => {
    const files = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .filter(file => !file.includes('test') && !file.includes('theme-toggle'));
    return files;
};

// Extract hero image from HTML content using regex
const extractHeroImage = (htmlContent, filename) => {
    const heroImages = [];
    
    // Look for background-image in style attributes
    const backgroundImageRegex = /style="[^"]*background-image:\s*url\(['"]?([^'")\s]+)['"]?\)[^"]*"/gi;
    let match;
    
    while ((match = backgroundImageRegex.exec(htmlContent)) !== null) {
        // Check if this is within a hero section
        const beforeMatch = htmlContent.substring(0, match.index);
        const afterMatch = htmlContent.substring(match.index);
        
        // Look for hero-related classes in the surrounding context
        const contextBefore = beforeMatch.substring(Math.max(0, beforeMatch.length - 500));
        const contextAfter = afterMatch.substring(0, 500);
        const fullContext = contextBefore + afterMatch.substring(0, match[0].length) + contextAfter;
        
        if (fullContext.includes('hero-section') || 
            fullContext.includes('hero-header') || 
            fullContext.includes('class="hero') ||
            fullContext.includes('class=\'hero')) {
            heroImages.push({
                source: 'inline-style',
                url: match[1],
                context: match[0]
            });
        }
    }
    
    // Also look for img elements with hero-related context
    const imgRegex = /<img[^>]+src=['"]([^'"]+)['"][^>]*>/gi;
    while ((match = imgRegex.exec(htmlContent)) !== null) {
        const beforeMatch = htmlContent.substring(0, match.index);
        const afterMatch = htmlContent.substring(match.index);
        const contextBefore = beforeMatch.substring(Math.max(0, beforeMatch.length - 500));
        const contextAfter = afterMatch.substring(0, 500);
        const fullContext = contextBefore + afterMatch.substring(0, match[0].length) + contextAfter;
        
        if (fullContext.includes('hero-bg') || 
            fullContext.includes('hero-section') ||
            fullContext.includes('hero-header')) {
            heroImages.push({
                source: 'img-element',
                url: match[1],
                context: match[0]
            });
        }
    }
    
    return heroImages;
};

// Normalize image path for comparison
const normalizeImagePath = (imagePath) => {
    // Remove leading ./ or /
    let normalized = imagePath.replace(/^\.?\//, '');
    
    // Convert backslashes to forward slashes
    normalized = normalized.replace(/\\/g, '/');
    
    // Convert to lowercase for case-insensitive comparison
    return normalized.toLowerCase();
};

// Check if image path points to the expected hero image
const isExpectedHeroImage = (imagePath) => {
    const normalized = normalizeImagePath(imagePath);
    const expectedPath = 'images/background/67.jpg';
    return normalized === expectedPath;
};

describe('Hero Image Consistency Property Tests', () => {
    const htmlFiles = getHtmlFiles();
    const expectedHeroImage = 'images/background/67.jpg';
    
    test('Property 9: Hero Image Consistency - All pages should use the same hero image', () => {
        const results = [];
        
        htmlFiles.forEach(filename => {
            const htmlContent = fs.readFileSync(filename, 'utf8');
            const heroImages = extractHeroImage(htmlContent, filename);
            
            results.push({
                filename,
                heroImages,
                hasHeroSection: heroImages.length > 0
            });
        });
        
        // Verify that pages with hero sections use the correct image
        const pagesWithHero = results.filter(result => result.hasHeroSection);
        
        expect(pagesWithHero.length).toBeGreaterThan(0);
        
        pagesWithHero.forEach(pageResult => {
            const { filename, heroImages } = pageResult;
            
            // Each page should have at least one hero image
            expect(heroImages.length).toBeGreaterThan(0);
            
            // All hero images should point to the expected image
            heroImages.forEach(heroImage => {
                expect(isExpectedHeroImage(heroImage.url)).toBe(true);
            });
        });
    });
    
    test('Property 9: Hero Image Consistency - Hero images should have proper fallback styling', () => {
        const cssContent = fs.readFileSync('css/styles.css', 'utf8');
        
        // Check that hero-header class has fallback background color
        expect(cssContent).toMatch(/\.hero-header\s*{[^}]*background-color:\s*#111827[^}]*}/);
        
        // Check that hero-section class exists and has proper styling
        expect(cssContent).toMatch(/\.hero-section\s*{[^}]*background-color:\s*#111827[^}]*}/);
    });
    
    test('Property 9: Hero Image Consistency - Hero sections should have responsive behavior', () => {
        const cssContent = fs.readFileSync('css/styles.css', 'utf8');
        
        // Check for responsive height adjustments
        expect(cssContent).toMatch(/@media\s*\([^)]*min-width:\s*481px[^)]*\)[^}]*\.hero-header[^}]*height:\s*400px/);
        expect(cssContent).toMatch(/@media\s*\([^)]*min-width:\s*1025px[^)]*\)[^}]*\.hero-header[^}]*height:\s*500px/);
    });
    
    test('Property 9: Hero Image Consistency - Hero sections should have proper structure', () => {
        const htmlFiles = getHtmlFiles();
        
        htmlFiles.forEach(filename => {
            const htmlContent = fs.readFileSync(filename, 'utf8');
            const heroImages = extractHeroImage(htmlContent, filename);
            
            if (heroImages.length > 0) {
                // Check that hero sections have proper overlay structure
                expect(htmlContent).toMatch(/hero-header-overlay|hero-overlay/);
                
                // Check that hero sections have proper content structure
                expect(htmlContent).toMatch(/hero-header-content|hero-content/);
                
                // Check for breadcrumbs or title structure
                expect(htmlContent).toMatch(/breadcrumbs|page-title|hero-title/);
            }
        });
    });
    
    test('Property 9: Hero Image Consistency - All hero images should exist in the file system', () => {
        const expectedImagePath = path.join('images', 'background', '67.jpg');
        
        expect(fs.existsSync(expectedImagePath)).toBe(true);
        
        // Verify the image file is not empty
        const stats = fs.statSync(expectedImagePath);
        expect(stats.size).toBeGreaterThan(0);
    });
});