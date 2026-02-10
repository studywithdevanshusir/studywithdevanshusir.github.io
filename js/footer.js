/**
 * Footer Component - Production Ready v2.0
 * Dynamic footer injection for all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    const scriptTag = document.querySelector('script[src*="footer.js"]');
    let rootPath = "./";

    if (scriptTag) {
        const src = scriptTag.getAttribute('src');
        if (src.includes('../')) rootPath = "../";
        if (src.includes('../../')) rootPath = "../../";
    }

    const currentYear = new Date().getFullYear();

    const footerHTML = `
    <footer style="background: #111827; color: #94a3b8; padding: 3rem 1.5rem; border-top: 1px solid rgba(99, 102, 241, 0.1);">
        <div style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2.5rem; margin-bottom: 2rem;">
            
            <!-- Brand Section -->
            <div>
                <h3 style="color: white; margin-bottom: 1rem; font-weight: 700; font-size: 1.25rem;">
                    📚 Devanshu<span style="color: #6366f1;">.Sir</span>
                </h3>
                <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">
                    Premium Computer Science & IT education for Class 9-12. Master Python, SQL, and ace your board exams.
                </p>
                <div style="display: flex; gap: 1rem;">
                    <a href="https://www.youtube.com/@DevanshuSirCS" target="_blank" style="color: white; background: rgba(255,255,255,0.1); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.3s;" onmouseover="this.style.background='#ef4444'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">▶️</a>
                    <a href="https://t.me/DevanshuSirCS" target="_blank" style="color: white; background: rgba(255,255,255,0.1); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.3s;" onmouseover="this.style.background='#0088cc'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">✈️</a>
                    <a href="mailto:devanshu@example.com" style="color: white; background: rgba(255,255,255,0.1); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.3s;" onmouseover="this.style.background='#ea4335'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">✉️</a>
                </div>
            </div>

            <!-- Quick Links -->
            <div>
                <h4 style="color: white; margin-bottom: 1rem; font-weight: 600;">Quick Links</h4>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.8rem;">
                    <li><a href="${rootPath}index.html" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Home</a></li>
                    <li><a href="${rootPath}class9.html" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Class 9</a></li>
                    <li><a href="${rootPath}class10.html" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Class 10</a></li>
                    <li><a href="${rootPath}class11.html" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Class 11</a></li>
                    <li><a href="${rootPath}class12.html" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Class 12</a></li>
                </ul>
            </div>

            <!-- Resources -->
            <div>
                <h4 style="color: white; margin-bottom: 1rem; font-weight: 600;">Resources</h4>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.8rem;">
                    <li><a href="${rootPath}sitemap.xml" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Sitemap</a></li>
                    <li><a href="${rootPath}robots.txt" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Robots.txt</a></li>
                    <li><a href="#" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Privacy Policy</a></li>
                    <li><a href="#" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Terms of Service</a></li>
                </ul>
            </div>

            <!-- Info -->
            <div>
                <h4 style="color: white; margin-bottom: 1rem; font-weight: 600;">Community</h4>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.8rem;">
                    <li><a href="#" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Blog</a></li>
                    <li><a href="#" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Forum</a></li>
                    <li><a href="#" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">FAQs</a></li>
                    <li><a href="#" style="text-decoration: none; color: inherit; transition: color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Contact</a></li>
                </ul>
            </div>
        </div>

        <!-- Bottom Footer -->
        <div style="max-width: 1280px; margin: 0 auto; padding-top: 2rem; border-top: 1px solid rgba(99, 102, 241, 0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <p style="font-size: 0.9rem;">&copy; ${currentYear} Study with Devanshu Sir. All rights reserved.</p>
            <p style="font-size: 0.9rem;">Made with ❤️ for Education | Production Ready</p>
        </div>
    </footer>
    `;

    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }

    console.log('✨ Footer loaded successfully');
});


    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;
});
