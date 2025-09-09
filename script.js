// Cache DOM elements
const sections = document.querySelectorAll(".screen");
const sectionsArray = Array.from(sections);
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById('menuToggle');
const navItems = document.querySelector('.nav-items');
const backToTopBtn = document.getElementById("backToTop");

// State variables
let currentIndex = 0;
let isScrolling = false;
let scrollTimer;
let resizeTimer;

// Throttle function for performance optimization
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Debounce function for resize events
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Initialize page
function initializePage() {
    const path = window.location.pathname.replace("/", "") || "home";
    const index = sectionsArray.findIndex(sec => sec.id === path);
    
    if (index !== -1) {
        currentIndex = index;
        sectionsArray[currentIndex].scrollIntoView({ behavior: "instant" });
        updateURL(sectionsArray[currentIndex].id);
    }

    // Load saved theme with fallback
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);
    
    // Preload critical images
    preloadImages();
    
    // Show page after initialization
    document.body.style.opacity = "1";
}

// Update theme icon
function updateThemeIcon(theme) {
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Update URL without page reload
function updateURL(sectionId) {
    history.replaceState(null, "", "/" + sectionId);
}

// Preload critical images for better performance
function preloadImages() {
    const criticalImages = [
        'images/logo.png',
        'images/background_dark.png',
        'images/background_light.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Optimized wheel event handler
const handleWheel = throttle((e) => {
    if (isScrolling) return;
    
    // Prevent default scroll behavior
    e.preventDefault();
    isScrolling = true;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < sectionsArray.length) {
        currentIndex = nextIndex;
        sectionsArray[currentIndex].scrollIntoView({ behavior: "smooth" });
        updateURL(sectionsArray[currentIndex].id);
    }

    // Reset scroll lock after animation
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        isScrolling = false;
    }, 400); // Increased timeout for better UX
}, 100);

// Optimized scroll event handler
const handleScroll = throttle(() => {
    const vh = window.innerHeight;
    const scrollPosition = window.scrollY;
    const index = Math.round(scrollPosition / vh);
    
    if (index !== currentIndex && sectionsArray[index]) {
        currentIndex = index;
        updateURL(sectionsArray[currentIndex].id);
    }
    
    // Show/hide back to top button
    backToTopBtn.style.opacity = scrollPosition > vh ? "0.8" : "0";
    backToTopBtn.style.pointerEvents = scrollPosition > vh ? "auto" : "none";
}, 100);

// Handle window resize
const handleResize = debounce(() => {
    // Recalculate current section on resize
    const vh = window.innerHeight;
    const index = Math.round(window.scrollY / vh);
    if (index !== currentIndex && sectionsArray[index]) {
        currentIndex = index;
    }
}, 250);

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    updateThemeIcon(newTheme);
    localStorage.setItem("theme", newTheme);
}

// Navigation functionality
function navigateToSection(targetId) {
    const section = document.getElementById(targetId);
    if (section) {
        const index = sectionsArray.findIndex(s => s.id === targetId);
        if (index !== -1) {
            currentIndex = index;
        }
        section.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", "/" + targetId);
    }
}

// Close mobile menu
function closeMobileMenu() {
    navItems.classList.remove('show');
    menuToggle.textContent = '☰';
    document.body.classList.remove('nav-open');
}

// Toggle mobile menu
function toggleMobileMenu() {
    const isOpen = navItems.classList.toggle('show');
    menuToggle.textContent = isOpen ? '✕' : '☰';
    document.body.classList.toggle('nav-open', isOpen);
}

// Back to top functionality
function backToTop() {
    currentIndex = 0;
    sectionsArray[currentIndex].scrollIntoView({ behavior: "smooth" });
    updateURL(sectionsArray[currentIndex].id);
}

// Event listeners
document.addEventListener("DOMContentLoaded", initializePage);

// Wheel event with passive false for preventDefault
window.addEventListener("wheel", handleWheel, { passive: false });

// Scroll event with passive true for performance
window.addEventListener("scroll", handleScroll, { passive: true });

// Resize event
window.addEventListener("resize", handleResize, { passive: true });

// Theme toggle
themeToggle.addEventListener("click", toggleTheme);

// Mobile menu toggle
menuToggle.addEventListener('click', toggleMobileMenu);

// Back to top button
backToTopBtn.addEventListener("click", backToTop);

// Navigation links
document.querySelectorAll('.nav-items a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        navigateToSection(targetId);
        closeMobileMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && 
        !menuToggle.contains(e.target) && 
        !navItems.contains(e.target) && 
        navItems.classList.contains('show')) {
        closeMobileMenu();
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const path = window.location.pathname.replace("/", "") || "home";
    const index = sectionsArray.findIndex(sec => sec.id === path);
    if (index !== -1) {
        currentIndex = index;
        sectionsArray[currentIndex].scrollIntoView({ behavior: "smooth" });
    }
});

// Keyboard navigation (accessibility)
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, sectionsArray.length - 1);
        if (nextIndex !== currentIndex) {
            currentIndex = nextIndex;
            sectionsArray[currentIndex].scrollIntoView({ behavior: "smooth" });
            updateURL(sectionsArray[currentIndex].id);
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (prevIndex !== currentIndex) {
            currentIndex = prevIndex;
            sectionsArray[currentIndex].scrollIntoView({ behavior: "smooth" });
            updateURL(sectionsArray[currentIndex].id);
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        backToTop();
    } else if (e.key === 'End') {
        e.preventDefault();
        currentIndex = sectionsArray.length - 1;
        sectionsArray[currentIndex].scrollIntoView({ behavior: "smooth" });
        updateURL(sectionsArray[currentIndex].id);
    }
});

// Performance monitoring (optional - for development)
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart + 'ms');
        }, 0);
    });
}