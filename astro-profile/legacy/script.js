/* =============================================
   GIÁP PHOTOGRAPHER – JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar scroll effect ─────────────────────
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 50;

  const updateNavbar = () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ─── Mobile nav toggle ────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ─── Active nav link on scroll ────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

  const setActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-nav');
      }
    });
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });

  // ─── Scroll Reveal Animation ──────────────────
  const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  };

  // Add reveal class to target elements
  const addRevealTargets = () => {
    const targets = [
      '.service-card',
      '.portfolio-item',
      '.about-image-wrap',
      '.about-content',
      '.contact-info',
      '.contact-form-wrap',
      '.section-header',
    ];
    targets.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.07}s`;
      });
    });
  };

  addRevealTargets();
  window.addEventListener('scroll', revealElements, { passive: true });
  revealElements(); // run once on load

  // ─── Portfolio Filter ─────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          // Small delay for animation
          setTimeout(() => { item.style.opacity = '1'; }, 10);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ─── Smooth counter animation ─────────────────
  const counters = document.querySelectorAll('.stat-num');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      countersAnimated = true;
      counters.forEach(counter => {
        const text = counter.textContent.trim();
        const match = text.match(/(\d+)/);
        if (!match) return;
        const target = parseInt(match[1]);
        const suffix = text.replace(/\d+/, '');
        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          counter.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 30);
      });
    }
  };
  window.addEventListener('scroll', animateCounters, { passive: true });
  setTimeout(animateCounters, 1500);

  // ─── Cursor glow effect (subtle) ──────────────
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  cursor.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: top 0.6s ease, left 0.6s ease;
    z-index: 0;
    top: 50%;
    left: 50%;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // ─── Parallax on hero ─────────────────────────
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroImg.style.transform = `scale(1.08) translateY(${scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ─── Service card tilt effect ─────────────────
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});

// ─── Lightbox ─────────────────────────────────────
function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  img.src = src;
  img.alt = caption;
  cap.textContent = caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Close lightbox on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── Contact Form Handler ──────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn = document.getElementById('submitBtn');

  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Đang gửi...';
  btn.style.opacity = '0.7';

  // Simulate async submission
  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';
  }, 1200);
}
