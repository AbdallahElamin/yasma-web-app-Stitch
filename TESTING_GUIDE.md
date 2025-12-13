# YASMA Website - Quick Testing Guide

## ✅ All Refactoring Complete!

Your website has been successfully transformed into production-ready code. Here's how to test all the new features:

---

## 🧪 Testing Checklist

### 1. Theme Toggle (Dark/Light Mode)

**Test Steps:**
1. Look at the navbar - find the sun icon (☀️) button
2. Click it to switch to dark mode
3. **Expected Result:**
   - Background changes from white to dark gray (#1a1a1a)
   - Text changes from dark to white
   - Icon changes from light_mode to dark_mode
4. Refresh the page
5. **Expected Result:** Theme persists (stays dark)
6. Click again to return to light mode

**Current State:** In your browser at `Landing_Page.html`

---

### 2. Language Toggle (EN/AR)

**Test Steps:**
1. Look at the navbar - find the "EN" button
2. Click it to switch to Arabic
3. **Expected Result:**
   - Button changes to "AR"
   - Navigation items change to Arabic:
     - Home → الرئيسية
     - About Us → من نحن
     - Our Projects → مشاريعنا
     - Certificates → الشهادات
     - Contact Us → اتصل بنا
   - Text alignment switches to right-to-left (RTL)
4. Click "AR" button to switch back to English
5. **Expected Result:** Everything returns to English, left-to-right

---

### 3. Mobile Menu (Hamburger)

**Test Steps:**
1. **Option A - Resize Browser:**
   - Drag browser window to make it narrow (< 768px width)
   
2. **Option B - Use DevTools:**
   - Press `F12` to open DevTools
   - Press `Ctrl+Shift+M` to toggle device toolbar
   - Select a mobile device (e.g., "iPhone 12")

3. **Expected Result:**
   - Navigation links disappear
   - Hamburger menu icon (☰) appears in top-right
   
4. Click the hamburger icon
5. **Expected Result:**
   - Menu slides down
   - Navigation links appear vertically
   - Theme and language toggles visible
   - Icon changes to "X" (close)
   
6. Click a navigation link or click outside
7. **Expected Result:** Menu closes

---

### 4. Active Navigation States

**Test Each Page:**

1. **Landing_Page.html** ✓ Currently open
   - "Home" link should be highlighted in gold

2. Click "About Us" → **About_Us.html**
   - "About Us" link should be highlighted in gold

3. Click "Our Projects" → **Our_Projects.html**
   - "Our Projects" link should be highlighted in gold

4. Click "Certificates" → **Certificates_and_licenses.html**
   - "Certificates" link should be highlighted in gold

5. Click "Contact Us" → **Contact_Us.html**
   - "Contact Us" link should be highlighted in gold

**Expected Result:** Only the current page's link is gold, others are gray

---

### 5. Visual Fidelity Check

**Compare with Original:**
1. The refactored site should look **identical** to the original
2. Same colors, spacing, typography, images
3. All hover effects working
4. Smooth transitions

**Key Elements to Verify:**
- ✓ YASMA logo in header
- ✓ Hero section with background image
- ✓ Stats banner (50+ Villas, 12+ Fuel Stations, 9+ Towers)
- ✓ Sister companies section
- ✓ Featured projects grid
- ✓ Footer with links and contact info

---

### 6. Responsive Design

**Test at Different Sizes:**

1. **Mobile (375px - iPhone 13)**
   - Single column layout
   - Hamburger menu visible
   - Cards stack vertically

2. **Tablet (768px - iPad)**
   - 2-column project grid
   - Navigation visible
   - Balanced layout

3. **Desktop (1920px)**
   - 3-column project grid
   - Full navigation
   - Maximum width container

**Quick Test in DevTools:**
- `F12` → `Ctrl+Shift+M` → Try different devices

---

## 🎯 Quick Verification

Open your browser console (`F12` → Console tab) and check:
- ✅ **No errors** should appear
- ✅ CSS and JS files load successfully
- ✅ All images display

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `css/styles.css` | All styles with CSS variables (1000+ lines) |
| `js/main.js` | Interactive features (theme, language, menu) |
| `Landing_Page.html` | Refactored homepage |
| `About_Us.html` | Refactored about page |
| `Our_Projects.html` | Refactored projects page |
| `Certificates_and_licenses.html` | Refactored certificates page |
| `Contact_Us.html` | Refactored contact page |

---

## 🚀 What Changed

**Removed:**
- ❌ Tailwind CDN script (saves external request)
- ❌ Embedded Tailwind config
- ❌ Inline style tags
- ❌ 4000+ lines of utility classes

**Added:**
- ✅ Centralized `styles.css` (semantic classes)
- ✅ `main.js` (interactive features)
- ✅ Theme toggle functionality
- ✅ Language toggle with RTL
- ✅ Mobile hamburger menu
- ✅ Active navigation states

**Result:**
- 🎨 Same visual appearance
- 🧹 Much cleaner code
- 📱 Better mobile experience
- 🌓 New dark mode feature
- 🌐 New Arabic language support

---

## 💡 Tips

1. **Theme Preference Persists:** Your selected theme (light/dark) is saved in browser localStorage
2. **Language Preference Persists:** Your selected language (EN/AR) is also saved
3. **All Pages Work:** Every page has the same header and features
4. **No Internet Required:** All styles are local (no CDN dependency)

---

## ✨ Ready to Use!

Your website is now production-ready with clean, maintainable code. Enjoy testing! 🎉
