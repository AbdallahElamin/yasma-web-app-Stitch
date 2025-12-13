// ===================================
// YASMA Contracting Co. - Main JavaScript
// Interactive functionality for theme, language, and mobile menu
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
  
  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = theme === 'light' ? 'light_mode' : 'dark_mode';
    }
  }

  // ===================================
  // LANGUAGE TOGGLE
  // ===================================
  const langToggle = document.getElementById('lang-toggle');
  
  // Get saved language or default to 'en'
  const savedLang = localStorage.getItem('yasma-lang') || 'en';
  setLanguage(savedLang);
  
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      const currentLang = html.getAttribute('lang') || 'en';
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      
      setLanguage(newLang);
      localStorage.setItem('yasma-lang', newLang);
    });
  }
  
  function setLanguage(lang) {
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'EN' : 'AR';
    }
    
    // Translate navigation and key elements
    translatePage(lang);
  }
  
  function translatePage(lang) {
    const translations = {
      en: {
        'Home': 'Home',
        'About Us': 'About Us',
        'Our Projects': 'Our Projects',
        'Certificates': 'Certificates',
        'Contact Us': 'Contact Us',
        'Get Quote': 'Get Quote'
      },
      ar: {
        'Home': 'الرئيسية',
        'About Us': 'من نحن',
        'Our Projects': 'مشاريعنا',
        'Certificates': 'الشهادات',
        'Contact Us': 'اتصل بنا',
        'Get Quote': 'احصل على عرض'
      }
    };
    
    // Translate navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-links .nav-link');
    navLinks.forEach(link => {
      const text = link.textContent.trim();
      if (translations[lang][text]) {
        link.textContent = translations[lang][text];
      } else {
        // Match against English keys
        for (let key in translations.en) {
          if (translations.en[key] === text || translations.ar[key] === text) {
            link.textContent = translations[lang][key];
            break;
          }
        }
      }
    });
    
    // Translate buttons
    const getQuoteButtons = document.querySelectorAll('.btn-primary');
    getQuoteButtons.forEach(btn => {
      if (btn.textContent.trim() === 'Get Quote' || btn.textContent.trim() === 'احصل على عرض') {
        btn.textContent = translations[lang]['Get Quote'];
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
      mobileMenu.classList.toggle('active');
      
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
    const currentPage = window.location.pathname.split('/').pop() || 'Landing_Page.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('nav-link-active');
      
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'Landing_Page.html') ||
          (currentPage === 'index.html' && linkHref === 'Landing_Page.html')) {
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
