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
    <footer style="background-color: #0f172a; color: #94a3b8; padding: 4rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.05); font-family: 'Inter', sans-serif;">
        <div style="max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem;">
            
            <!-- Column 1: Brand & Bio -->
            <div>
                <h3 style="color:white; margin-bottom:1.5rem; font-weight:700; font-size:1.5rem;">Devanshu<span style="color:#6366f1">.Sir</span></h3>
                <p style="font-size:0.95rem; line-height:1.7; margin-bottom:1.5rem;">
                    Empowering students with premium Computer Science education. Mastering Python, SQL, and Logic Building for Board Exams.
                </p>
                <div style="display:flex; gap:1rem;">
                    <a href="https://www.youtube.com/@DevanshuSirCS" target="_blank" style="color:white; background:rgba(255,255,255,0.1); width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:all 0.3s;" onmouseover="this.style.background='#ef4444'" onmouseout="this.style.background='rgba(255,255,255,0.1)'"><i class="fab fa-youtube"></i></a>
                    <a href="https://t.me/DevanshuSirCS" target="_blank" style="color:white; background:rgba(255,255,255,0.1); width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:all 0.3s;" onmouseover="this.style.background='#0088cc'" onmouseout="this.style.background='rgba(255,255,255,0.1)'"><i class="fab fa-telegram"></i></a>
                    <a href="mailto:devanshu.bps599@gmail.com" style="color:white; background:rgba(255,255,255,0.1); width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:all 0.3s;" onmouseover="this.style.background='#ea4335'" onmouseout="this.style.background='rgba(255,255,255,0.1)'"><i class="fas fa-envelope"></i></a>
                </div>
            </div>

            <!-- Column 2: Quick Links -->
            <div>
                <h4 style="color:white; margin-bottom:1.5rem; font-weight:600; font-size:1.1rem;">Quick Links</h4>
                <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:0.8rem;">
                    <li><a href="${rootPath}index.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Home</a></li>
                    <li><a href="${rootPath}about.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">About Us</a></li>
                    <li><a href="${rootPath}contact.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Contact</a></li>
                    <li><a href="${rootPath}practice.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Practice Quizzes</a></li>
                </ul>
            </div>

            <!-- Column 3: Resources -->
            <div>
                <h4 style="color:white; margin-bottom:1.5rem; font-weight:600; font-size:1.1rem;">Resources</h4>
                <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:0.8rem;">
                    <li><a href="${rootPath}notes/digital.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Digital Notes</a></li>
                    <li><a href="${rootPath}notes/handwritten.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Handwritten Notes</a></li>
                    <li><a href="${rootPath}excelbydev/index.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Excel Training</a></li>
                    <li><a href="${rootPath}presentations/python-presentations.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Python PPTs</a></li>
                </ul>
            </div>

            <!-- Column 4: Legal -->
            <div>
                <h4 style="color:white; margin-bottom:1.5rem; font-weight:600; font-size:1.1rem;">Legal</h4>
                <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:0.8rem;">
                    <li><a href="${rootPath}privacy.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Privacy Policy</a></li>
                    <li><a href="${rootPath}terms.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Terms of Use</a></li>
                    <li><a href="${rootPath}disclaimer.html" style="text-decoration:none; color:inherit; transition:color 0.2s;" onmouseover="this.style.color='#6366f1'" onmouseout="this.style.color='inherit'">Disclaimer</a></li>
                </ul>
            </div>
        </div>

        <div style="max-width: 1280px; margin: 3rem auto 0; padding-top:2rem; border-top:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <p style="font-size:0.9rem;">&copy; ${new Date().getFullYear()} Study with Devanshu Sir. All rights reserved.</p>
            <p style="font-size:0.9rem;">Made with ❤️ for Students.</p>
        </div>
    </footer>
    `;

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;
});
