/**
 * EdTech Navigation System
 * Standardized v2.0 - Fixed Mobile Menu & Z-Index
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. PATH RESOLUTION LOGIC
    const scriptTag = document.querySelector('script[src*="navigation.js"]');
    let rootPath = "./";

    if (scriptTag) {
        const src = scriptTag.getAttribute('src');
        if (src.includes('../')) rootPath = "../";
        if (src.includes('../../')) rootPath = "../../";
    }

    // 2. INJECT CSS DYNAMICALLY (To ensure z-index fixes work everywhere)
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        /* CSS Variables for Nav */
        :root {
            --nav-bg: #0f172a;
            --nav-text: #e2e8f0;
            --nav-accent: #6366f1;
            --nav-hover-bg: rgba(255, 255, 255, 0.1);
            --nav-border: rgba(99, 102, 241, 0.2);
            --dropdown-bg: #1e293b;
        }

        /* Navbar Base */
        .edtech-navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 70px;
            background-color: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--nav-border);
            z-index: 9999 !important; /* CRITICAL FIX: High Z-Index */
            color: var(--nav-text);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .nav-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1.5rem;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        /* Brand */
        .nav-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
            color: white;
            font-weight: 700;
            font-size: 1.25rem;
        }

        .brand-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 800;
            font-size: 1.2rem;
        }

        /* Desktop Menu */
        .desktop-menu {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .nav-link {
            text-decoration: none;
            color: var(--nav-text);
            font-size: 0.95rem;
            font-weight: 500;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        .nav-link:hover {
            background-color: var(--nav-hover-bg);
            color: white;
            text-shadow: 0 0 10px var(--nav-accent);
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }

        .nav-link.btn-cta {
            background: var(--nav-accent);
            color: white;
            padding: 0.5rem 1.25rem;
            border-radius: 9999px;
            box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
        }

        .nav-link.btn-cta:hover {
            background: #4f46e5;
            transform: translateY(-1px);
        }

        /* Mobile Toggle */
        .mobile-toggle {
            display: none;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 10000;
        }

        .toggle-icon {
            width: 28px;
            height: 28px;
        }

        /* Mobile Menu */
        .mobile-menu {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: auto;
            max-height: 80vh;
            overflow-y: auto;
            background-color: #020617;
            border-bottom: 1px solid var(--nav-border);
            padding: 2rem 1rem;
            display: none;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 9998;
        }

        .mobile-menu.active {
            display: flex;
            animation: slideDown 0.3s ease-out;
        }

        .close-menu-btn {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            line-height: 1;
        }

        .mobile-menu .dropdown-item {
            display: block;
            padding: 0.8rem;
            width: 100%;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.03);
            margin-bottom: 0.5rem;
            color: var(--nav-text);
            text-decoration: none;
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
            .desktop-menu { display: none; }
            .mobile-toggle { display: block; }
        }
    `;
    document.head.appendChild(styleSheet);

    // 3. NAVBAR HTML STRUCTURE
    const navbarHTML = `
    <nav class="edtech-navbar">
        <div class="nav-container">
            <!-- Brand -->
            <a href="${rootPath}index.html" class="nav-brand">
                <div class="brand-icon">D</div>
                <span>Devanshu<span style="color:var(--nav-accent)">.Sir</span></span>
            </a>

            <!-- Desktop Menu -->
            <div class="desktop-menu">
                <a href="${rootPath}index.html" class="nav-link">Home</a>
                
                <!-- Courses Dropdown -->
                <div class="nav-dropdown">
                    <div class="nav-link dropdown-trigger">
                        Courses 
                        <svg class="dropdown-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <div class="dropdown-menu" style="width: 260px;">
                        <a href="${rootPath}class9-10.html" class="dropdown-item">Class 9-10 IT (402)</a>
                        <a href="${rootPath}class11.html" class="dropdown-item">Class 11 CS (083)</a>
                        <a href="${rootPath}class12.html" class="dropdown-item">Class 12 CS (083)</a>
                        <div class="dropdown-divider"></div>
                        <a href="${rootPath}courses/python-course.html" class="dropdown-item">Python Programming</a>
                        <a href="${rootPath}excelbydev/index.html" class="dropdown-item">Excel Training</a>
                    </div>
                </div>

                <!-- Notes Dropdown -->
                <div class="nav-dropdown">
                    <div class="nav-link dropdown-trigger">
                         Notes
                        <svg class="dropdown-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <div class="dropdown-menu">
                        <a href="${rootPath}notes/digital.html" class="dropdown-item">Digital Notes <span style="font-size:0.7em; background:#10B981; color:white; padding:2px 4px; border-radius:4px;">Premium</span></a>
                        <a href="${rootPath}notes/handwritten.html" class="dropdown-item">Handwritten Notes</a>
                        <div class="dropdown-divider"></div>
                        <a href="${rootPath}notes/python-notes.html" class="dropdown-item">Python Notes</a>
                        <a href="${rootPath}notes/sql-notes.html" class="dropdown-item">SQL Notes</a>
                        <a href="${rootPath}notes/networks-notes.html" class="dropdown-item">Networks Notes</a>
                        <div class="dropdown-divider"></div>
                        <a href="${rootPath}tools.html" class="dropdown-item">CS Toolkit 🛠️</a>
                    </div>
                </div>

                <a href="${rootPath}testimonials.html" class="nav-link">Testimonials</a>
                <a href="${rootPath}about.html" class="nav-link">About</a>
                <a href="${rootPath}contact.html" class="nav-link btn-cta">Contact</a>
            </div>

            <!-- Mobile Toggle -->
            <button class="mobile-toggle" onclick="toggleMobileMenu()" aria-label="Toggle Menu">
                <svg class="toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>

        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu" id="mobile-menu">
            <button class="close-menu-btn" onclick="toggleMobileMenu()" aria-label="Close Menu">&times;</button>
            
            <a href="${rootPath}index.html" class="nav-link">Home</a>
            <hr style="width:100%; border:0; border-top:1px solid rgba(255,255,255,0.1);">
            
            <strong style="color:#94a3b8; text-transform:uppercase; font-size:0.8rem;">Courses</strong>
            <a href="${rootPath}class9-10.html" class="dropdown-item">Class 9-10 IT</a>
            <a href="${rootPath}class11.html" class="dropdown-item">Class 11 CS</a>
            <a href="${rootPath}class12.html" class="dropdown-item">Class 12 CS</a>
            <a href="${rootPath}courses/python-course.html" class="dropdown-item">Python</a>
            <a href="${rootPath}excelbydev/index.html" class="dropdown-item">Excel</a>
            
            <hr style="width:100%; border:0; border-top:1px solid rgba(255,255,255,0.1);">
            <strong style="color:#94a3b8; text-transform:uppercase; font-size:0.8rem;">Study Material</strong>
            <a href="${rootPath}notes/digital.html" class="dropdown-item">Digital Notes</a>
            <a href="${rootPath}notes/handwritten.html" class="dropdown-item">Handwritten Notes</a>
            <a href="${rootPath}notes/python-notes.html" class="dropdown-item">Python Notes</a>
            <a href="${rootPath}practice.html" class="dropdown-item">Practice</a>
            <a href="${rootPath}tools.html" class="dropdown-item" style="color:#60A5FA;">CS Toolkit 🛠️</a>
            
            <hr style="width:100%; border:0; border-top:1px solid rgba(255,255,255,0.1);">
            <a href="${rootPath}testimonials.html" class="nav-link">Testimonials</a>
            <a href="${rootPath}about.html" class="nav-link">About</a>
            <a href="${rootPath}contact.html" class="nav-link btn-cta" style="margin-top:1rem;">Contact Us</a>
        </div>
    </nav>
    `;

    // 4. INJECT INTO DOM
    const navPlaceholder = document.getElementById('navbar-placeholder');

    // Auto-inject Footer Script if not present (To ensure footer appears on all pages without manual HTML edit)
    if (!document.querySelector('script[src*="footer.js"]')) {
        const footerScript = document.createElement('script');
        footerScript.src = `${rootPath}assets/js/footer.js`;
        document.body.appendChild(footerScript);
    }

    if (navPlaceholder) navPlaceholder.innerHTML = navbarHTML;
});

// Mobile Menu Toggle
window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
}

// Auto-Close Mobile Menu on Link Click
document.addEventListener('click', (e) => {
    if (e.target.matches('.mobile-menu a') || e.target.closest('.mobile-menu a')) {
        const menu = document.getElementById('mobile-menu');
        if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }
});
