document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollEffects();
  initAnimations();
  console.log('✨ Premium EdTech Platform Loaded');
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarLinksHTML = `
    <a href="/" class="navbar-logo">📚 Devanshu.Sir</a>
    <div class="navbar-links">
      <a href="/">Home</a>
      <a href="/class9.html">Class 9</a>
      <a href="/class10.html">Class 10</a>
      <a href="/class11.html">Class 11</a>
      <a href="/class12.html">Class 12</a>
      <a href="#contact" class="btn btn-secondary btn-sm" style="margin: 0; padding: 8px 20px;">Contact</a>
    </div>
  `;
  
  if (navbar) {
    navbar.innerHTML = navbarLinksHTML;
  }
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.course-card, .feature-item').forEach(el => {
    observer.observe(el);
  });
}

function initAnimations() {
  // Smooth scroll for buttons
  document.querySelectorAll('[onclick*="scrollIntoView"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
}

// Initialize footer
document.addEventListener('DOMContentLoaded', () => {
  const footerElement = document.getElementById('footer');
  if (footerElement) {
    const currentYear = new Date().getFullYear();
    footerElement.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Courses</h4>
            <ul>
              <li><a href="/class9.html">Class 9</a></li>
              <li><a href="/class10.html">Class 10</a></li>
              <li><a href="/class11.html">Class 11</a></li>
              <li><a href="/class12.html">Class 12</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="/sitemap.xml">Sitemap</a></li>
              <li><a href="/robots.txt">Robots</a></li>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="https://youtube.com" target="_blank">YouTube</a></li>
              <li><a href="https://telegram.org" target="_blank">Telegram</a></li>
              <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${currentYear} Study with Devanshu Sir. All rights reserved. | Made with ❤️</p>
        </div>
      </div>
    `;
  }
});
