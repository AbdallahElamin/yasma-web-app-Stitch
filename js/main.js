// ===================================
// YASMA Contracting Co. - Main JavaScript
// Interactive functionality for theme and mobile menu
// ===================================

(function () {
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
    themeToggle.addEventListener('click', function () {
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
    button.addEventListener('click', function () {
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
    mobileMenuToggle.addEventListener('click', function () {
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
    document.addEventListener('click', function (e) {
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
      link.addEventListener('click', function () {
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
    anchor.addEventListener('click', function (e) {
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

  // ===================================
  // PROJECT FILTERING
  // ===================================
  function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectsGrid = document.querySelector('.grid-projects');

    if (filterButtons.length > 0 && projectsGrid) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function () {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));

          // Add active class to clicked button
          this.classList.add('active');

          // Get the filter text
          const filterText = this.textContent.trim();

          // Filter projects - re-query to get dynamically loaded cards
          const projectCards = projectsGrid.querySelectorAll('.project-card');
          projectCards.forEach(card => {
            const badge = card.querySelector('.project-card-badge');

            if (!badge) {
              card.style.display = 'none';
              return;
            }

            const category = badge.textContent.trim();

            // Show all projects if "All" is selected, otherwise filter by category
            // Note: "Fuel Stations" badge might be "Fuel Station" in data
            if (filterText === 'All' ||
              category === filterText ||
              (filterText === 'Fuel Stations' && category === 'Fuel Station')) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  }

  // ===================================
  // LOAD FEATURED PROJECTS (Homepage)
  // ===================================
  function loadFeaturedProjects() {
    const featuredGrid = document.getElementById('featured-projects-grid');

    if (!featuredGrid || typeof getFeaturedProjects !== 'function') {
      return;
    }

    const featuredProjects = getFeaturedProjects(3);

    featuredProjects.forEach(project => {
      const projectCard = createProjectCard(project);
      featuredGrid.appendChild(projectCard);
    });
  }

  // ===================================
  // LOAD ALL PROJECTS (Our Projects Page)
  // ===================================
  function loadAllProjects() {
    const allProjectsGrid = document.getElementById('all-projects-grid');

    if (!allProjectsGrid || typeof getAllProjects !== 'function') {
      return;
    }

    const allProjects = getAllProjects();

    allProjects.forEach(project => {
      const projectCard = createProjectCard(project);
      allProjectsGrid.appendChild(projectCard);
    });

    // Setup filtering after projects are loaded
    setupProjectFiltering();
  }

  // ===================================
  // CREATE PROJECT CARD ELEMENT
  // ===================================
  function createProjectCard(project) {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.style.cursor = 'pointer';

    article.innerHTML = `
      <div class="project-card-image">
        <img alt="${project.title}" src="${project.thumbnail}"
             style="width: 100%; height: 100%; object-fit: cover;" />
        <div class="project-card-badge">${project.badge}</div>
      </div>
      <div class="project-card-content">
        <div class="project-card-location">
          <span class="material-symbols-outlined">location_on</span>
          ${project.location}
        </div>
        <h4 class="project-card-title">${project.title}</h4>
        <p class="project-card-description">${project.description}</p>
        <div class="project-card-footer">
          <span class="project-card-link">View Details</span>
        </div>
      </div>
    `;

    // Add click event to navigate to gallery
    article.addEventListener('click', () => {
      window.location.href = `Gallery.html?project=${project.id}`;
    });

    return article;
  }

  // Load featured projects if on homepage
  if (document.getElementById('featured-projects-grid')) {
    loadFeaturedProjects();
  }

  // Load all projects if on Our Projects page
  if (document.getElementById('all-projects-grid')) {
    loadAllProjects();
  }

})();
