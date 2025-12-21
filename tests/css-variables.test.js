/**
 * Property-Based Test for CSS Variable Consistency
 * Feature: website-modernization, Property 6: CSS Variable Usage Consistency
 * Validates: Requirements 4.2, 4.4
 */

const fs = require('fs');
const path = require('path');

// Read CSS file
const cssContent = fs.readFileSync(path.join(__dirname, '../css/styles.css'), 'utf8');

// Define patterns for hardcoded values that should use variables
const hardcodedPatterns = {
  colors: {
    pattern: /#[0-9A-Fa-f]{3,6}(?![0-9A-Fa-f])/g,
    exceptions: ['#FFFFFF', '#ffffff', '#000000', '#000', '#FFF', '#fff'], // Allow common basic colors
    variablePrefix: '--color-'
  },
  spacing: {
    pattern: /(?:padding|margin|gap|top|right|bottom|left|width|height):\s*([0-9.]+(?:px|rem|em))/g,
    exceptions: ['0', '0px', '1px', '2px'], // Allow basic values
    variablePrefix: '--spacing-'
  },
  borderRadius: {
    pattern: /border-radius:\s*([0-9.]+(?:px|rem|em))/g,
    exceptions: ['0', '0px'],
    variablePrefix: '--radius-'
  },
  fontSize: {
    pattern: /font-size:\s*([0-9.]+(?:px|rem|em))/g,
    exceptions: [],
    variablePrefix: '--font-size-'
  },
  fontWeight: {
    pattern: /font-weight:\s*([0-9]{3})/g,
    exceptions: [],
    variablePrefix: '--font-weight-'
  }
};

// Extract defined CSS variables
function extractCSSVariables(css) {
  const variablePattern = /--([\w-]+):\s*([^;]+);/g;
  const variables = new Map();
  let match;
  
  while ((match = variablePattern.exec(css)) !== null) {
    variables.set(match[1], match[2].trim());
  }
  
  return variables;
}

// Find hardcoded values that should use variables
function findHardcodedValues(css, pattern, exceptions = []) {
  const matches = [];
  let match;
  
  while ((match = pattern.exec(css)) !== null) {
    const value = match[1] || match[0];
    if (!exceptions.includes(value)) {
      matches.push({
        value,
        fullMatch: match[0],
        index: match.index
      });
    }
  }
  
  return matches;
}

// Get line number from index
function getLineNumber(text, index) {
  return text.substring(0, index).split('\n').length;
}

describe('CSS Variable Consistency', () => {
  let cssVariables;
  
  beforeAll(() => {
    cssVariables = extractCSSVariables(cssContent);
  });

  /**
   * Property 6: CSS Variable Usage Consistency
   * For any styling declaration, colors and spacing should use CSS variables 
   * rather than hardcoded values where variables are available
   * Validates: Requirements 4.2, 4.4
   */
  test('should use CSS variables instead of hardcoded colors', () => {
    // Exclude the :root section where variables are defined
    const rootSectionEnd = cssContent.indexOf('}', cssContent.indexOf(':root'));
    const cssWithoutRoot = cssContent.substring(rootSectionEnd + 1);
    
    const hardcodedColors = findHardcodedValues(
      cssWithoutRoot, 
      hardcodedPatterns.colors.pattern, 
      hardcodedPatterns.colors.exceptions
    );
    
    const violations = hardcodedColors.filter(color => {
      // Check if there's a corresponding CSS variable for this color
      const hasColorVariable = Array.from(cssVariables.keys()).some(varName => 
        varName.startsWith('color-') && cssVariables.get(varName).includes(color.value)
      );
      return hasColorVariable;
    });
    
    if (violations.length > 0) {
      const violationDetails = violations.map(v => 
        `Line ${getLineNumber(cssContent, v.index)}: ${v.fullMatch}`
      ).join('\n');
      
      expect(violations).toHaveLength(0);
    } else {
      expect(violations).toHaveLength(0);
    }
  });

  test('should use CSS variables for spacing values', () => {
    const hardcodedSpacing = [];
    let match;
    
    // Look for spacing properties with hardcoded values
    const spacingPattern = /(?:padding|margin|gap):\s*([0-9.]+(?:px|rem))/g;
    
    while ((match = spacingPattern.exec(cssContent)) !== null) {
      const value = match[1];
      if (!hardcodedPatterns.spacing.exceptions.includes(value)) {
        // Check if this value should have a corresponding CSS variable
        const hasSpacingVariable = Array.from(cssVariables.keys()).some(varName => 
          varName.startsWith('spacing-')
        );
        
        if (hasSpacingVariable) {
          hardcodedSpacing.push({
            value,
            fullMatch: match[0],
            index: match.index
          });
        }
      }
    }
    
    if (hardcodedSpacing.length > 0) {
      const violationDetails = hardcodedSpacing.map(v => 
        `Line ${getLineNumber(cssContent, v.index)}: ${v.fullMatch}`
      ).join('\n');
      
      console.warn(`Found ${hardcodedSpacing.length} hardcoded spacing values:\n${violationDetails}`);
    }
    
    expect(hardcodedSpacing).toHaveLength(0);
  });

  test('should use CSS variables for border radius values', () => {
    const hardcodedRadius = findHardcodedValues(
      cssContent,
      hardcodedPatterns.borderRadius.pattern,
      hardcodedPatterns.borderRadius.exceptions
    );
    
    const violations = hardcodedRadius.filter(radius => {
      // Check if there's a corresponding CSS variable for border radius
      const hasRadiusVariable = Array.from(cssVariables.keys()).some(varName => 
        varName.startsWith('radius-')
      );
      return hasRadiusVariable;
    });
    
    if (violations.length > 0) {
      const violationDetails = violations.map(v => 
        `Line ${getLineNumber(cssContent, v.index)}: ${v.fullMatch}`
      ).join('\n');
      
      console.warn(`Found ${violations.length} hardcoded border-radius values:\n${violationDetails}`);
    }
    
    expect(violations).toHaveLength(0);
  });

  test('should define comprehensive CSS variable system', () => {
    const requiredVariableCategories = [
      'color-primary',
      'color-bg',
      'color-text-main',
      'spacing-',
      'font-size-',
      'radius-',
      'shadow-',
      'transition-'
    ];
    
    const definedVariables = Array.from(cssVariables.keys());
    
    requiredVariableCategories.forEach(category => {
      const hasCategory = definedVariables.some(varName => varName.includes(category));
      expect(hasCategory).toBe(true);
    });
    
    // Ensure we have a reasonable number of variables for each category
    const spacingVars = definedVariables.filter(v => v.startsWith('spacing-'));
    const colorVars = definedVariables.filter(v => v.startsWith('color-'));
    const fontSizeVars = definedVariables.filter(v => v.startsWith('font-size-'));
    
    expect(spacingVars.length).toBeGreaterThanOrEqual(5);
    expect(colorVars.length).toBeGreaterThanOrEqual(8);
    expect(fontSizeVars.length).toBeGreaterThanOrEqual(6);
  });

  test('should use consistent breakpoint system', () => {
    // Check that media queries use the standardized breakpoints
    const mediaQueryPattern = /@media\s*\([^)]*min-width:\s*([0-9]+px)\)/g;
    const mediaQueries = [];
    let match;
    
    while ((match = mediaQueryPattern.exec(cssContent)) !== null) {
      mediaQueries.push({
        breakpoint: match[1],
        fullMatch: match[0],
        index: match.index
      });
    }
    
    const standardBreakpoints = ['481px', '1025px'];
    const invalidBreakpoints = mediaQueries.filter(mq => 
      !standardBreakpoints.includes(mq.breakpoint)
    );
    
    if (invalidBreakpoints.length > 0) {
      const violationDetails = invalidBreakpoints.map(v => 
        `Line ${getLineNumber(cssContent, v.index)}: ${v.fullMatch} (should use 481px or 1025px)`
      ).join('\n');
      
      console.warn(`Found ${invalidBreakpoints.length} non-standard breakpoints:\n${violationDetails}`);
    }
    
    expect(invalidBreakpoints).toHaveLength(0);
  });
});