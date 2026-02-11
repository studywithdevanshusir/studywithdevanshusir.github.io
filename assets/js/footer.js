/**
 * Footer Component - Study with Devanshu Sir
 * 4-Column Layout with Dynamic Injection
 */
document.addEventListener('DOMContentLoaded', () => {
    // Path Resolution Logic (Same as Navigation)
    const scriptTag = document.querySelector('script[src*="footer.js"]');
    let rootPath = "./";
    if (scriptTag) {
        const src = scriptTag.getAttribute('src');
        if (src.includes('../')) rootPath = "../";
        if (src.includes('../../')) rootPath = "../../";
    }

    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-wrapper">
            <div class="footer-container">
                <div class="footer-grid">
                    
                    <!-- Column 1: Brand & Contact -->
                    <div class="footer-col brand-col">
                        <h3 class="footer-brand">Devanshu<span style="color:var(--primary-color)">.Sir</span></h3>
                        <p class="footer-bio">
                            Empowering students with premium Computer Science education.
                        </p>
                        <div class="contact-group">
                            <a href="mailto:studywithdevanshusir@gmail.com" class="contact-link">
                                <i class="fas fa-envelope"></i> studywithdevanshusir@gmail.com
                            </a>
                        </div>
                    </div>

                    <!-- Column 2: Company -->
                    <div class="footer-col">
                        <h4 class="footer-heading">COMPANY</h4>
                        <ul class="footer-links">
                            <li><a href="${rootPath}index.html">Home</a></li>
                            <li><a href="${rootPath}about.html">About Us</a></li>
                            <li><a href="${rootPath}contact.html">Contact</a></li>
                            <li><a href="${rootPath}courses/index.html">All Courses</a></li>
                        </ul>
                    </div>

                    <!-- Column 3: Resources -->
                    <div class="footer-col">
                        <h4 class="footer-heading">RESOURCES</h4>
                        <ul class="footer-links">
                            <li><a href="${rootPath}notes/digital.html">Digital Notes</a></li>
                            <li><a href="${rootPath}notes/handwritten.html">Handwritten Notes</a></li>
                            <li><a href="${rootPath}excelbydev/index.html">Excel Training</a></li>
                            <li><a href="${rootPath}tools.html">Student Tools</a></li>
                        </ul>
                    </div>

                    <!-- Column 4: Connect -->
                    <div class="footer-col">
                        <h4 class="footer-heading">CONNECT</h4>
                        <ul class="footer-links">
                            <li><a href="https://www.youtube.com/@DevanshuSirCS" target="_blank"><i class="fab fa-youtube" style="margin-right:8px; color:#ef4444;"></i> YouTube</a></li>
                            <li><a href="https://www.instagram.com/divyanshu_pratap5/" target="_blank"><i class="fab fa-instagram" style="margin-right:8px; color:#e1306c;"></i> Instagram</a></li>
                            <li><a href="https://github.com/devanshu5" target="_blank"><i class="fab fa-github" style="margin-right:8px; color:#fff;"></i> GitHub</a></li>
                            <li><a href="https://t.me/DevanshuSirCS" target="_blank"><i class="fab fa-telegram" style="margin-right:8px; color:#3b82f6;"></i> Telegram</a></li>
                        </ul>
                    </div>

                </div>

                <div class="footer-bottom">
                    <div class="copyright-text">
                        &copy; ${new Date().getFullYear()} Study with Devanshu Sir. All rights reserved.
                    </div>
                    <div class="legal-links">
                        <a href="${rootPath}privacy.html">Privacy</a>
                        <span class="separator">•</span>
                        <a href="${rootPath}terms.html">Terms</a>
                        <span class="separator">•</span>
                        <a href="${rootPath}disclaimer.html">Disclaimer</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    `;

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;
});
