// ===================================
// YASMA Contracting Co. - Main JavaScript
// Interactive functionality for theme and mobile menu
// ===================================

(function() {
  'use strict';

  // ===================================
  // THEME MANAGEMENT
  // ===================================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Get saved theme or default to 'light'
  const savedTheme = localStorage.getItem('yasma-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('yasma-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  // Also add event listeners to mobile theme toggle buttons
  const mobileThemeButtons = document.querySelectorAll('.mobile-menu-actions .btn-icon[aria-label="Toggle theme"]');
  mobileThemeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('yasma-theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Close mobile menu after theme toggle (better UX)
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        if (mobileMenuToggle) {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          const toggleIcon = mobileMenuToggle.querySelector('.material-symbols-outlined');
          if (toggleIcon) {
            toggleIcon.textContent = 'menu';
          }
        }
      }
    });
  });
  
  function updateThemeIcon(theme) {
    // Update main theme toggle button
    if (themeToggle) {
      const mainIcon = themeToggle.querySelector('.material-symbols-outlined');
      if (mainIcon) {
        mainIcon.textContent = theme === 'light' ? 'light_mode' : 'dark_mode';
      }
    }
    
    // Update mobile menu theme toggle buttons
    const mobileThemeButtons = document.querySelectorAll('.mobile-menu-actions .btn-icon[aria-label="Toggle theme"]');
    mobileThemeButtons.forEach(button => {
      const mobileIcon = button.querySelector('.material-symbols-outlined');
      if (mobileIcon) {
        mobileIcon.textContent = theme === 'light' ? 'light_mode' : 'dark_mode';
      }
    });
  }



  // ===================================
  // MOBILE MENU
  // ===================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      const isActive = mobileMenu.classList.contains('active');
      mobileMenu.classList.toggle('active');
      
      // Update ARIA attributes
      mobileMenuToggle.setAttribute('aria-expanded', !isActive);
      
      // Update icon
      const icon = mobileMenuToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = mobileMenu.classList.contains('active') ? 'close' : 'menu';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuToggle.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.textContent = 'menu';
        }
      }
    });
    
    // Close menu when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuToggle.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.textContent = 'menu';
        }
      });
    });
  }

  // ===================================
  // ACTIVE NAVIGATION STATE
  // ===================================
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('nav-link-active');
      
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('nav-link-active');
      }
    });
  }
  
  // Set active link on page load
  setActiveNavLink();

  // ===================================
  // SMOOTH SCROLLING
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

})();
