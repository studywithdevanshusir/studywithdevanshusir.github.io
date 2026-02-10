/**
 * EdTech Navigation System - Production Ready v3.0
 * Clean, Simple, and Mobile-Optimized Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    const scriptTag = document.querySelector('script[src*="navigation.js"]');
    let rootPath = "./";

    if (scriptTag) {
        const src = scriptTag.getAttribute('src');
        if (src.includes('../')) rootPath = "../";
        if (src.includes('../../')) rootPath = "../../";
    }

    const navHTML = `
    <nav class="navbar">
        <div class="logo">
            <a href="${rootPath}index.html" style="color: #6366f1; display: flex; align-items: center; gap: 8px; text-decoration: none; font-weight: bold;">
                <span style="font-size: 1.5rem;">📚</span>
                <span>Devanshu.Sir</span>
            </a>
        </div>
        <div class="nav-links">
            <a href="${rootPath}index.html">Home</a>
            <a href="${rootPath}class9.html">Class 9</a>
            <a href="${rootPath}class10.html">Class 10</a>
            <a href="${rootPath}class11.html">Class 11</a>
            <a href="${rootPath}class12.html">Class 12</a>
            <a href="#" style="color: #a855f7;">📞 Contact</a>
        </div>
        <button class="menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>
    `;

    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
        navbarContainer.innerHTML = navHTML;
        
        // Mobile Menu Functionality
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        }
    }

    console.log('✨ Navigation loaded successfully');
});

