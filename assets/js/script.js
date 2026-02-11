document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // 2. Load Shared Components
    if (!document.querySelector('header.header') && !document.querySelector('.navbar')) {
        loadHeader();
    }

    if (!document.querySelector('footer')) {
        // loadFooter();
    }

    // 3. Mobile Menu
    setTimeout(initMobileMenu, 100);

    // 4. Contact Form Handler
    initContactForm();
});

function loadHeader() {
    const headerHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <a href="../index.html" class="logo">
                    Devanshu<span class="text-gradient">Sir</span>
                </a>
                <div class="menu-toggle" id="mobile-menu">
                    <i class="fas fa-bars"></i>
                </div>
                <ul class="nav-links">
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="../about.html">About</a></li>
                    <li><a href="../courses.html">Courses</a></li>
                    <li><a href="../resources.html">Resources</a></li>
                    <li><a href="../contact.html">Contact</a></li>
                </ul>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    highlightActiveLink();
}

function loadFooter() {
    const footerHTML = `
        <footer>
            <div class="footer-content" data-aos="fade-up">
                <div class="footer-section">
                    <h4>About Devanshu Sir</h4>
                    <p style="color: var(--text-secondary);">Empowering students with quality education in Computer Science, IT, and Artificial Intelligence.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="../courses.html">Courses</a></li>
                        <li><a href="../resources.html">Resources</a></li>
                        <li><a href="../about.html">About Me</a></li>
                        <li><a href="../contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Connect</h4>
                    <ul class="footer-links">
                        <li><a href="https://www.youtube.com/@DevanshuSirCS" target="_blank">YouTube</a></li>
                        <li><a href="https://www.instagram.com/divyanshu_pratap5/" target="_blank">Instagram</a></li>
                        <li><a href="https://github.com/devanshu5" target="_blank">GitHub</a></li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                &copy; ${new Date().getFullYear()} Study with Devanshu Sir. All rights reserved.
            </div>
        </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Toggle Logic
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            updateMenuIcon(menuToggle, navLinks.classList.contains('active'));
        });

        // Auto Close on Link Click
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                updateMenuIcon(menuToggle, false);
            });
        });
    }
}

function updateMenuIcon(menuToggle, isActive) {
    const icon = menuToggle.querySelector('i');
    if (isActive) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPage || link.getAttribute('href').endsWith(currentPage)) {
            link.classList.add('active');
        }
    });
}

function initContactForm() {
    const form = document.querySelector('form[name="contact"]');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
        }
    });
}

// 5. MCQ Toggle Function
window.toggleAnswer = function (id) {
    const answerDiv = document.getElementById(id);
    if (answerDiv) {
        if (answerDiv.style.display === 'none' || answerDiv.style.display === '') {
            answerDiv.style.display = 'block';
        } else {
            answerDiv.style.display = 'none';
        }
    }
}
