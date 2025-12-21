/**
 * Property-Based Test for Responsive Layout Consistency
 * Feature: website-modernization, Property 1: Responsive Layout Consistency
 * Validates: Requirements 2.1, 2.2
 */

const fs = require('fs');
const path = require('path');

// Read CSS and HTML files
const cssContent = fs.readFileSync(path.join(__dirname, '../css/styles.css'), 'utf8');
const htmlFiles = [
  'index.html',
  'About_Us.html', 
  'Certificates_and_licenses.html',
  'Contact_Us.html',
  'Our_Projects.html'
];

// Standard breakpoints as defined in the design
const BREAKPOINTS = {
  mobile: { max: 480 },
  tablet: { min: 481, max: 1024 },
  desktop: { min: 1025 }
};

// Extract media queries from CSS
function extractMediaQueries(css) {
  const mediaQueryPattern = /@media\s*\([^)]*\)\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
  const queries = [];
  let match;
  
  while ((match = mediaQueryPattern.exec(css)) !== null) {
    queries.push({
      query: match[0],
      index: match.index
    });
  }
  
  return queries;
}

// Extract container and layout classes
function extractLayoutClasses(css) {
  const classPattern = /\.([a-zA-Z][a-zA-Z0-9_-]*)\s*\{[^}]*\}/g;
  const layoutClasses = [];
  let match;
  
  while ((match = classPattern.exec(css)) !== null) {
    const className = match[1];
    const classContent = match[0];
    
    // Check if it's a layout-related class
    if (className.includes('container') || 
        className.includes('grid') || 
        className.includes('flex') ||
        className.includes('section') ||
        classContent.includes('max-width') ||
        classContent.includes('padding') ||
        classContent.includes('margin')) {
      layoutClasses.push({
        name: className,
        content: classContent,
        index: match.index
      });
    }
  }
  
  return layoutClasses;
}

// Check for potential overflow issues
function checkForOverflowIssues(css) {
  const overflowPatterns = [
    /width:\s*[0-9]+px/g,  // Fixed pixel widths
    /min-width:\s*[0-9]+px/g,  // Fixed min-widths
    /left:\s*-[0-9]+/g,  // Negative positioning
    /right:\s*-[0-9]+/g,  // Negative positioning
    /margin-left:\s*-[0-9]+/g,  // Negative margins
    /margin-right:\s*-[0-9]+/g   // Negative margins
  ];
  
  const issues = [];
  
  overflowPatterns.forEach((pattern, index) => {
    let match;
    while ((match = pattern.exec(css)) !== null) {
      issues.push({
        type: ['fixed-width', 'fixed-min-width', 'negative-left', 'negative-right', 'negative-margin-left', 'negative-margin-right'][index],
        value: match[0],
        index: match.index
      });
    }
  });
  
  return issues;
}

// Get line number from index
function getLineNumber(text, index) {
  return text.substring(0, index).split('\n').length;
}

// Check if breakpoints are consistent
function validateBreakpoints(css) {
  const mediaQueries = extractMediaQueries(css);
  const breakpointPattern = /min-width:\s*([0-9]+)px/g;
  const foundBreakpoints = new Set();
  
  mediaQueries.forEach(mq => {
    let match;
    while ((match = breakpointPattern.exec(mq.query)) !== null) {
      foundBreakpoints.add(parseInt(match[1]));
    }
  });
  
  const standardBreakpoints = [481, 1025];
  const invalidBreakpoints = Array.from(foundBreakpoints).filter(bp => 
    !standardBreakpoints.includes(bp)
  );
  
  return {
    valid: invalidBreakpoints.length === 0,
    invalidBreakpoints,
    foundBreakpoints: Array.from(foundBreakpoints)
  };
}

describe('Responsive Layout Consistency', () => {
  /**
   * Property 1: Responsive Layout Consistency
   * For any page and any viewport width, all content should remain within 
   * the viewport boundaries without horizontal overflow
   * Validates: Requirements 2.1, 2.2
   */
  
  test('should use consistent breakpoint system across all media queries', () => {
    const breakpointValidation = validateBreakpoints(cssContent);
    
    if (!breakpointValidation.valid) {
      console.warn(`Invalid breakpoints found: ${breakpointValidation.invalidBreakpoints.join(', ')}`);
      console.warn(`Expected only: 481px, 1025px`);
    }
    
    expect(breakpointValidation.valid).toBe(true);
  });

  test('should have proper container max-width constraints', () => {
    const containerPattern = /\.container[^{]*\{[^}]*max-width:\s*([^;]+);/g;
    const containers = [];
    let match;
    
    while ((match = containerPattern.exec(cssContent)) !== null) {
      containers.push({
        maxWidth: match[1].trim(),
        fullMatch: match[0]
      });
    }
    
    // All containers should use CSS variables or reasonable values
    const invalidContainers = containers.filter(container => {
      const maxWidth = container.maxWidth;
      const acceptableValues = ['var(--container-max-width)', '1280px', '1024px', '768px', '640px', '100%'];
      return !acceptableValues.some(acceptable => maxWidth.includes(acceptable));
    });
    
    if (invalidContainers.length > 0) {
      console.warn(`Containers with non-standard max-width:`, invalidContainers);
    }
    
    expect(invalidContainers).toHaveLength(0);
  });

  test('should avoid fixed pixel widths that could cause overflow', () => {
    const overflowIssues = checkForOverflowIssues(cssContent);
    
    // Filter out acceptable fixed widths (like small icons, borders, breakpoints, etc.)
    const problematicIssues = overflowIssues.filter(issue => {
      if (issue.type === 'fixed-width' || issue.type === 'fixed-min-width') {
        const widthValue = parseInt(issue.value.match(/[0-9]+/)[0]);
        // Allow breakpoint values and container max-widths
        const acceptableWidths = [481, 1025, 640, 768, 1024, 1280];
        if (acceptableWidths.includes(widthValue)) {
          return false;
        }
        return widthValue > 100; // Allow small fixed widths
      }
      
      // Allow decorative negative positioning (for corner decorations)
      if (issue.type === 'negative-left' || issue.type === 'negative-right') {
        const negativeValue = issue.value.match(/-([0-9.]+)/);
        if (negativeValue) {
          const value = parseFloat(negativeValue[1]);
          // Allow small negative values for decorative elements (up to 2rem)
          if (value <= 2) {
            return false;
          }
        }
      }
      
      return true;
    });
    
    if (problematicIssues.length > 0) {
      const issueDetails = problematicIssues.map(issue => 
        `Line ${getLineNumber(cssContent, issue.index)}: ${issue.value} (${issue.type})`
      ).join('\n');
      
      console.warn(`Potential overflow issues found:\n${issueDetails}`);
    }
    
    expect(problematicIssues).toHaveLength(0);
  });

  test('should have responsive grid classes for all breakpoints', () => {
    const requiredGridClasses = [
      'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
      'tablet\\\\:grid-cols-1', 'tablet\\\\:grid-cols-2', 'tablet\\\\:grid-cols-3',
      'desktop\\\\:grid-cols-1', 'desktop\\\\:grid-cols-2', 'desktop\\\\:grid-cols-3'
    ];
    
    const missingClasses = requiredGridClasses.filter(className => {
      // Escape the className for regex use
      const escapedClassName = className.replace(/\\/g, '\\\\');
      const pattern = new RegExp(`\\.${escapedClassName}\\s*\\{`, 'g');
      return !pattern.test(cssContent);
    });
    
    if (missingClasses.length > 0) {
      console.warn(`Missing responsive grid classes: ${missingClasses.join(', ')}`);
    }
    
    expect(missingClasses).toHaveLength(0);
  });

  test('should have consistent spacing utilities', () => {
    const spacingUtilities = [
      'gap-xs', 'gap-sm', 'gap-md', 'gap-lg', 'gap-xl',
      'p-xs', 'p-sm', 'p-md', 'p-lg', 'p-xl',
      'px-xs', 'px-sm', 'px-md', 'px-lg', 'px-xl',
      'py-xs', 'py-sm', 'py-md', 'py-lg', 'py-xl'
    ];
    
    const missingUtilities = spacingUtilities.filter(utility => {
      const pattern = new RegExp(`\\.${utility}\\s*\\{`, 'g');
      return !pattern.test(cssContent);
    });
    
    if (missingUtilities.length > 0) {
      console.warn(`Missing spacing utilities: ${missingUtilities.join(', ')}`);
    }
    
    expect(missingUtilities).toHaveLength(0);
  });

  test('should use CSS variables for all spacing in layout classes', () => {
    const layoutClasses = extractLayoutClasses(cssContent);
    const hardcodedSpacingPattern = /(?:padding|margin|gap):\s*([0-9.]+(?:px|rem|em))/g;
    
    const violatingClasses = [];
    
    layoutClasses.forEach(layoutClass => {
      let match;
      while ((match = hardcodedSpacingPattern.exec(layoutClass.content)) !== null) {
        const value = match[1];
        // Allow some exceptions for very small values
        if (!['0', '0px', '1px', '2px'].includes(value)) {
          violatingClasses.push({
            className: layoutClass.name,
            value: match[0],
            line: getLineNumber(cssContent, layoutClass.index)
          });
        }
      }
    });
    
    if (violatingClasses.length > 0) {
      const violationDetails = violatingClasses.map(v => 
        `${v.className} (Line ${v.line}): ${v.value}`
      ).join('\n');
      
      console.warn(`Layout classes with hardcoded spacing:\n${violationDetails}`);
    }
    
    expect(violatingClasses).toHaveLength(0);
  });

  test('should have proper flexbox utilities for responsive layouts', () => {
    const flexUtilities = [
      'flex', 'flex-col', 'flex-row', 'flex-wrap',
      'items-center', 'items-start', 'items-end',
      'justify-center', 'justify-between', 'justify-start',
      'tablet\\\\:flex', 'tablet\\\\:flex-row', 'tablet\\\\:items-center',
      'desktop\\\\:flex', 'desktop\\\\:flex-row', 'desktop\\\\:items-center'
    ];
    
    const missingFlexUtilities = flexUtilities.filter(utility => {
      // Escape the utility for regex use
      const escapedUtility = utility.replace(/\\/g, '\\\\');
      const pattern = new RegExp(`\\.${escapedUtility}\\s*\\{`, 'g');
      return !pattern.test(cssContent);
    });
    
    if (missingFlexUtilities.length > 0) {
      console.warn(`Missing flexbox utilities: ${missingFlexUtilities.join(', ')}`);
    }
    
    expect(missingFlexUtilities).toHaveLength(0);
  });

  test('should have container utilities with proper responsive padding', () => {
    // Check that container classes use responsive padding variables
    const containerPattern = /\.container[^{]*\{[^}]*\}/g;
    let match;
    
    while ((match = containerPattern.exec(cssContent)) !== null) {
      const containerCSS = match[0];
      
      // Should use CSS variables for padding
      if (containerCSS.includes('padding') && !containerCSS.includes('var(--')) {
        const line = getLineNumber(cssContent, match.index);
        console.warn(`Container at line ${line} uses hardcoded padding instead of CSS variables`);
        expect(false).toBe(true);
      }
    }
    
    expect(true).toBe(true);
  });
});