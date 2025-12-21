/**
 * Property-Based Test for Language Functionality Absence
 * Feature: website-modernization, Property 4: Language Functionality Absence
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4
 */

const fs = require('fs');
const path = require('path');

// Read all files
const cssContent = fs.readFileSync(path.join(__dirname, '../css/styles.css'), 'utf8');
const jsMainContent = fs.readFileSync(path.join(__dirname, '../js/main.js'), 'utf8');
const jsTransitionsContent = fs.readFileSync(path.join(__dirname, '../js/transitions.js'), 'utf8');

const htmlFiles = [
  'index.html',
  'About_Us.html', 
  'Certificates_and_licenses.html',
  'Contact_Us.html',
  'Our_Projects.html'
];

// Read HTML files
const htmlContents = htmlFiles.map(file => ({
  filename: file,
  content: fs.readFileSync(path.join(__dirname, '..', file), 'utf8')
}));

// Arabic text patterns (common Arabic characters)
const arabicTextPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

// RTL and language-related patterns
const rtlPatterns = [
  /\[dir\s*=\s*["']rtl["']\]/gi,
  /direction\s*:\s*rtl/gi,
  /text-align\s*:\s*right/gi,
  /float\s*:\s*right/gi
];

const languagePatterns = [
  /lang\s*=\s*["']ar["']/gi,
  /lang-toggle/gi,
  /btn-lang/gi,
  /\blanguage\b/gi,
  /\barabic\b/gi,
  /translatePage|setLanguage|translations\s*=/gi,
  /translation\b/gi
];

// Get line number from index
function getLineNumber(text, index) {
  return text.substring(0, index).split('\n').length;
}

// Find pattern matches with line numbers
function findPatternMatches(content, patterns, filename = '') {
  const matches = [];
  
  patterns.forEach((pattern, patternIndex) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      matches.push({
        pattern: pattern.source,
        match: match[0],
        index: match.index,
        line: getLineNumber(content, match.index),
        filename
      });
    }
  });
  
  return matches;
}

describe('Language Functionality Absence', () => {
  /**
   * Property 4: Language Functionality Absence
   * For any page load or user interaction, no Arabic language content, RTL styling, 
   * or language switching functionality should be present or accessible
   * Validates: Requirements 3.1, 3.2, 3.3, 3.4
   */

  test('should not contain any Arabic text content', () => {
    const arabicMatches = [];
    
    // Check all HTML files for Arabic text
    htmlContents.forEach(({ filename, content }) => {
      if (arabicTextPattern.test(content)) {
        const matches = content.match(arabicTextPattern);
        if (matches) {
          matches.forEach(match => {
            const index = content.indexOf(match);
            arabicMatches.push({
              filename,
              text: match,
              line: getLineNumber(content, index)
            });
          });
        }
      }
    });
    
    // Check CSS for Arabic text
    if (arabicTextPattern.test(cssContent)) {
      const matches = cssContent.match(arabicTextPattern);
      if (matches) {
        matches.forEach(match => {
          const index = cssContent.indexOf(match);
          arabicMatches.push({
            filename: 'css/styles.css',
            text: match,
            line: getLineNumber(cssContent, index)
          });
        });
      }
    }
    
    // Check JavaScript for Arabic text
    [jsMainContent, jsTransitionsContent].forEach((jsContent, index) => {
      const filename = index === 0 ? 'js/main.js' : 'js/transitions.js';
      if (arabicTextPattern.test(jsContent)) {
        const matches = jsContent.match(arabicTextPattern);
        if (matches) {
          matches.forEach(match => {
            const matchIndex = jsContent.indexOf(match);
            arabicMatches.push({
              filename,
              text: match,
              line: getLineNumber(jsContent, matchIndex)
            });
          });
        }
      }
    });
    
    if (arabicMatches.length > 0) {
      const details = arabicMatches.map(m => 
        `${m.filename}:${m.line} - "${m.text}"`
      ).join('\n');
      console.warn(`Found Arabic text content:\n${details}`);
    }
    
    expect(arabicMatches).toHaveLength(0);
  });

  test('should not contain RTL styling or directional CSS', () => {
    const rtlMatches = findPatternMatches(cssContent, rtlPatterns, 'css/styles.css');
    
    if (rtlMatches.length > 0) {
      const details = rtlMatches.map(m => 
        `${m.filename}:${m.line} - ${m.match}`
      ).join('\n');
      console.warn(`Found RTL styling:\n${details}`);
    }
    
    expect(rtlMatches).toHaveLength(0);
  });

  test('should not contain language toggle buttons in HTML', () => {
    const languageToggleMatches = [];
    
    htmlContents.forEach(({ filename, content }) => {
      // Look for language toggle buttons
      const btnLangPattern = /btn-lang|lang-toggle/gi;
      let match;
      
      while ((match = btnLangPattern.exec(content)) !== null) {
        languageToggleMatches.push({
          filename,
          match: match[0],
          line: getLineNumber(content, match.index)
        });
      }
    });
    
    if (languageToggleMatches.length > 0) {
      const details = languageToggleMatches.map(m => 
        `${m.filename}:${m.line} - ${m.match}`
      ).join('\n');
      console.warn(`Found language toggle elements:\n${details}`);
    }
    
    expect(languageToggleMatches).toHaveLength(0);
  });

  test('should not contain language switching logic in JavaScript', () => {
    const jsLanguageMatches = [];
    
    // Check main.js
    const mainJsMatches = findPatternMatches(jsMainContent, languagePatterns, 'js/main.js');
    jsLanguageMatches.push(...mainJsMatches);
    
    // Check transitions.js
    const transitionsJsMatches = findPatternMatches(jsTransitionsContent, languagePatterns, 'js/transitions.js');
    jsLanguageMatches.push(...transitionsJsMatches);
    
    if (jsLanguageMatches.length > 0) {
      const details = jsLanguageMatches.map(m => 
        `${m.filename}:${m.line} - ${m.match}`
      ).join('\n');
      console.warn(`Found language-related JavaScript:\n${details}`);
    }
    
    expect(jsLanguageMatches).toHaveLength(0);
  });

  test('should not contain language-related CSS classes', () => {
    const languageCssMatches = findPatternMatches(cssContent, languagePatterns, 'css/styles.css');
    
    if (languageCssMatches.length > 0) {
      const details = languageCssMatches.map(m => 
        `${m.filename}:${m.line} - ${m.match}`
      ).join('\n');
      console.warn(`Found language-related CSS:\n${details}`);
    }
    
    expect(languageCssMatches).toHaveLength(0);
  });

  test('should have all HTML pages set to English language', () => {
    const nonEnglishPages = [];
    
    htmlContents.forEach(({ filename, content }) => {
      // Check for lang attribute
      const langMatch = content.match(/lang\s*=\s*["']([^"']+)["']/i);
      
      if (!langMatch || langMatch[1] !== 'en') {
        nonEnglishPages.push({
          filename,
          currentLang: langMatch ? langMatch[1] : 'not set',
          line: langMatch ? getLineNumber(content, content.indexOf(langMatch[0])) : 'N/A'
        });
      }
    });
    
    if (nonEnglishPages.length > 0) {
      const details = nonEnglishPages.map(p => 
        `${p.filename}:${p.line} - lang="${p.currentLang}"`
      ).join('\n');
      console.warn(`Pages not set to English:\n${details}`);
    }
    
    expect(nonEnglishPages).toHaveLength(0);
  });

  test('should not contain dir attributes for RTL support', () => {
    const dirAttributeMatches = [];
    
    htmlContents.forEach(({ filename, content }) => {
      const dirPattern = /dir\s*=\s*["'][^"']*["']/gi;
      let match;
      
      while ((match = dirPattern.exec(content)) !== null) {
        dirAttributeMatches.push({
          filename,
          match: match[0],
          line: getLineNumber(content, match.index)
        });
      }
    });
    
    if (dirAttributeMatches.length > 0) {
      const details = dirAttributeMatches.map(m => 
        `${m.filename}:${m.line} - ${m.match}`
      ).join('\n');
      console.warn(`Found dir attributes:\n${details}`);
    }
    
    expect(dirAttributeMatches).toHaveLength(0);
  });

  test('should operate exclusively in English mode', () => {
    // This test verifies that the website is configured for English-only operation
    
    // Check that all pages have English lang attribute
    const allPagesEnglish = htmlContents.every(({ content }) => {
      const langMatch = content.match(/lang\s*=\s*["']([^"']+)["']/i);
      return langMatch && langMatch[1] === 'en';
    });
    
    // Check that there are no Arabic language references in production files
    const arabicReferencePattern = /\barabic\b|ar-SA|ar_SA|\brtl\b|right-to-left/gi;
    
    let hasArabicReferences = false;
    const foundReferences = [];
    
    // Check CSS
    if (arabicReferencePattern.test(cssContent)) {
      hasArabicReferences = true;
      foundReferences.push('CSS file contains Arabic references');
    }
    
    // Check JS files
    if (arabicReferencePattern.test(jsMainContent)) {
      hasArabicReferences = true;
      foundReferences.push('main.js contains Arabic references');
    }
    
    if (arabicReferencePattern.test(jsTransitionsContent)) {
      hasArabicReferences = true;
      foundReferences.push('transitions.js contains Arabic references');
    }
    
    // Check HTML files
    htmlContents.forEach(({ filename, content }) => {
      if (arabicReferencePattern.test(content)) {
        hasArabicReferences = true;
        foundReferences.push(`${filename} contains Arabic references`);
      }
    });
    
    if (foundReferences.length > 0) {
      console.warn('Arabic references found in:', foundReferences);
    }
    
    // Check that there are no language switching mechanisms
    const hasLanguageSwitching = [jsMainContent, jsTransitionsContent].some(content =>
      /setLanguage|translatePage|lang.*toggle/gi.test(content)
    );
    
    expect(allPagesEnglish).toBe(true);
    expect(hasArabicReferences).toBe(false);
    expect(hasLanguageSwitching).toBe(false);
  });
});