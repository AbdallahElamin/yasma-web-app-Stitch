# 🏗️ YASMA Contracting Co. - Website Modernization

![YASMA Logo](images/logo%20and%20other%20images/logo.png)

A professional, high-performance website for **YASMA Contracting Co.**, modernized from a utility-first CSS framework to a specialized, clean, and maintainable **Vanilla CSS & JavaScript** architecture. This project delivers a premium digital presence for one of Saudi Arabia's leading construction and contracting firms.

---

## 🌟 Project Overview

The YASMA website has undergone a complete architectural transformation. Originally built with Tailwind CSS, the project has been refactored to use semantic HTML5, modern Vanilla CSS, and robust Vanilla JavaScript. 

### Why Modernization?
- **Performance**: Reduced external dependencies and eliminated thousands of lines of unused utility classes.
- **Maintainability**: Centralized styles and logic for easier updates and consistent branding.
- **User Experience**: Enhanced with premium features like native dark mode and seamless multi-language support.

---

## 🚀 Core Features

### 🌓 Intelligent Theme Toggle
- **Dark/Light Mode**: User-selectable themes with high-contrast dark mode for better readability.
- **Persistence**: Remembers user preference across sessions using `localStorage`.
- **Dynamic Icons**: Fluid transition between light and dark mode iconography.

### 🌐 Multi-Language Support (EN/AR)
- **Bilingual Interface**: Full support for English and Arabic.
- **RTL Support**: Automatic layout switching to Right-to-Left (RTL) for Arabic users.
- **Context-Aware**: Navigation and content adjust dynamically without page reloads.

### 📱 Fully Responsive Design
- **Mobile-First**: Optimized for all devices—from smartphones to large desktop monitors.
- **Hamburger Menu**: Sleek, animated mobile navigation for smaller screens.
- **Responsive Grids**: Dynamic project and gallery layouts that adapt to screen size.

### 🏗️ Dynamic Portfolio
- **Project Grid**: Showcases YASMA's extensive portfolio including luxury villas, fuel stations, and commercial towers.
- **Data-Driven**: Projects are managed through structured JavaScript data for easy updates.

---

## 🛠️ Tech Stack

- **Structure**: Semantic HTML5 for SEO and accessibility.
- **Styling**: Vanilla CSS with modern features (CSS Variables, Flexbox, CSS Grid).
- **Logic**: Vanilla JavaScript (ES6+) for interactive components and state management.
- **Testing**: Jest & JSDOM for automated unit testing of core logic.
- **Assets**: 100% local assets—no external CDN dependencies for maximum reliability.

---

## 📁 Project Structure

```text
├── css/                # Centralized CSS stylesheets (styles.css)
├── js/                 # JavaScript modules (main.js, projects-data.js, etc.)
├── images/             # Optimized project imagery and branding
├── tests/              # Jest unit tests for JS and CSS logic
├── index.html          # Homepage (Refactored)
├── About_Us.html       # Company profile page
├── Our_Projects.html   # Portfolio showcase
├── Services.html       # Service offerings
├── Contact_Us.html     # Lead generation form
└── package.json        # Project metadata and test scripts
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (for running tests)

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Install development dependencies:
   ```bash
   npm install
   ```

### Running Locally
Simply open `index.html` in any modern web browser. No complex build steps are required!

---

## 🧪 Testing & Verification

### Automated Testing
We use **Jest** to ensure the reliability of our interactive components.
- **Run all tests**: `npm test`
- **Watch mode**: `npm run test:watch`
- **Coverage report**: `npm run test:coverage`

### Manual Verification
Refer to the [TESTING_GUIDE.md](TESTING_GUIDE.md) for a comprehensive checklist of manual verification steps, including theme toggling, language switching, and responsive layout checks.

---

## 🏢 Sister Companies
YASMA is part of a robust ecosystem of trusted partners:
- **Enwani Real Estate**
- **United Step Co.**
- **Al Sharq Stations**

---

## 📄 License & Credits
© 2026 **YASMA Contracting Co.** All rights reserved. 
Building the future of Saudi Arabia with excellence and integrity.
