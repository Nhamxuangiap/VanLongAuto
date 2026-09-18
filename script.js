'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* Navigation */
  const navbar = $('#navbar');
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');
  const closeMenu = () => {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  };

  const updateNavbar = () => navbar?.classList.toggle('scrolled', scrollY > 50);
  updateNavbar();
  addEventListener('scroll', updateNavbar, { passive: true });

  navToggle?.addEventListener('click', () => {
    const open = navMenu?.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-link', navMenu || document).forEach(link => link.addEventListener('click', closeMenu));

  /* Active navigation */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link:not(.nav-cta)');
  const updateActiveLink = () => {
    const current = sections.filter(section => scrollY >= section.offsetTop - 120).at(-1)?.id;
    navLinks.forEach(link => link.classList.toggle('active-nav', link.getAttribute('href') === `#${current}`));
  };
  if (sections.length && navLinks.length) {
    updateActiveLink();
    addEventListener('scroll', updateActiveLink, { passive: true });
  }

  /* Reveal */
  const revealItems = $$('.service-card, .about-image-wrap, .about-content, .contact-info, .contact-form-wrap, .section-header');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    revealItems.forEach(item => {
      item.classList.add('reveal');
      observer.observe(item);
    });
  }

  /* Hero counters */
  const stats = $('.hero-stats');
  const counters = $$('.stat-num');
  const runCounters = () => counters.forEach(counter => {
    const match = counter.textContent.match(/\d+/);
    if (!match) return;
    const target = Number(match[0]);
    const suffix = counter.textContent.replace(match[0], '');
    let value = 0;
    const timer = setInterval(() => {
      value = Math.min(value + Math.max(1, Math.ceil(target / 45)), target);
      counter.textContent = `${value}${suffix}`;
      if (value === target) clearInterval(timer);
    }, 28);
  });
  if (stats && counters.length) {
    const statsObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      runCounters();
      statsObserver.disconnect();
    }, { threshold: .2 });
    statsObserver.observe(stats);
  }

  /* Contact form */
  const form = $('#contactForm');
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    const button = $('#submitBtn');
    const success = $('#formSuccess');
    if (!button || !success) return;

    button.disabled = true;
    try {
      const response = await fetch('https://formsubmit.co/ajax/vanlongauto3@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      if (!response.ok) throw new Error('Không thể gửi biểu mẫu');
      form.reset();
      form.style.display = 'none';
      success.style.display = 'block';
    } catch (error) {
      console.error(error);
      button.disabled = false;
      alert('Chưa gửi được thông tin. Vui lòng thử lại hoặc liên hệ qua Zalo.');
    }
  });

  /* Chọn ảnh nhỏ cho ảnh chính */
  const mainImage = $('#pdMainImage');
  const thumbs = $$('.led-thumb');
  thumbs.forEach(thumb => thumb.addEventListener('click', () => {
    if (!mainImage) return;
    thumbs.forEach(item => item.classList.remove('active'));
    thumb.classList.add('active');
    mainImage.src = thumb.dataset.src;
    mainImage.alt = $('img', thumb)?.alt || 'LED nội thất ô tô';
  }));

  /* Nghệ sĩ & KOL: tự trượt sang phải, có nút và vuốt mobile */
  const artistSlider = $('.artist-slider');
  const artistTrack = $('.artist-track');
  const artistDotsBox = $('.artist-dots');
  if (artistSlider && artistTrack && artistDotsBox) {
    const artistCards = $$('.artist-card', artistTrack);
    let artistIndex = 0;
    let artistTimer;
    let scrollFrame;

    const artistStep = () => {
      const gap = parseFloat(getComputedStyle(artistTrack).gap) || 0;
      return (artistCards[0]?.getBoundingClientRect().width || 0) + gap;
    };
    const artistMax = () => Math.max(0, Math.round((artistTrack.scrollWidth - artistTrack.clientWidth) / artistStep()));
    const updateArtistDots = () => $$('.artist-dot', artistDotsBox).forEach((dot, i) => dot.classList.toggle('active', i === artistIndex));
    const buildArtistDots = () => {
      artistDotsBox.replaceChildren();
      for (let i = 0; i <= artistMax(); i += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `artist-dot${i === artistIndex ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Xem ảnh từ vị trí ${i + 1}`);
        dot.addEventListener('click', () => moveArtist(i));
        artistDotsBox.append(dot);
      }
    };
    const moveArtist = nextIndex => {
      artistIndex = nextIndex > artistMax() ? 0 : nextIndex < 0 ? artistMax() : nextIndex;
      artistTrack.scrollTo({ left: artistIndex * artistStep(), behavior: 'smooth' });
      updateArtistDots();
    };
    const playArtists = () => {
      clearInterval(artistTimer);
      artistTimer = setInterval(() => moveArtist(artistIndex + 1), 3500);
    };

    artistTrack.addEventListener('scroll', () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        artistIndex = Math.min(artistMax(), Math.round(artistTrack.scrollLeft / artistStep()));
        updateArtistDots();
      });
    }, { passive: true });
    $('.artist-next')?.addEventListener('click', () => { moveArtist(artistIndex + 1); playArtists(); });
    $('.artist-prev')?.addEventListener('click', () => { moveArtist(artistIndex - 1); playArtists(); });
    artistSlider.addEventListener('mouseenter', () => clearInterval(artistTimer));
    artistSlider.addEventListener('mouseleave', playArtists);
    artistSlider.addEventListener('touchstart', () => clearInterval(artistTimer), { passive: true });
    artistSlider.addEventListener('touchend', playArtists, { passive: true });
    addEventListener('resize', () => { artistIndex = Math.min(artistIndex, artistMax()); buildArtistDots(); }, { passive: true });

    buildArtistDots();
    playArtists();
  }

  /* Slider ngang: 5 ảnh, tự chạy và vuốt mobile */
  const slider = $('.gallery-slider');
  const track = $('.gallery-track');
  const dotsBox = $('.gallery-dots');
  if (!slider || !track || !dotsBox) return;

  const slides = $$('.gallery-slide', track);
  if (slides.length < 2) return;

  const count = slides.length;
  track.append(slides[0].cloneNode(true));

  let index = 0;
  let timer;
  let touchX = 0;

  slides.forEach((_, dotIndex) => {
    const dot = document.createElement('button');
    dot.className = `gallery-dot${dotIndex === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Xem ảnh ${dotIndex + 1}`);
    dot.addEventListener('click', () => {
      index = dotIndex;
      move();
      autoPlay();
    });
    dotsBox.append(dot);
  });

  const dots = $$('.gallery-dot', dotsBox);
  const move = (animate = true) => {
    track.style.transition = animate ? 'transform .5s ease' : 'none';
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index % count));
  };

  const next = () => { index += 1; move(); };
  const previous = () => {
    if (index > 0) { index -= 1; move(); return; }
    index = count;
    move(false);
    requestAnimationFrame(() => requestAnimationFrame(() => { index -= 1; move(); }));
  };
  const autoPlay = () => {
    clearInterval(timer);
    timer = setInterval(next, 3500);
  };

  track.addEventListener('transitionend', () => {
    if (index !== count) return;
    index = 0;
    move(false);
  });

  $('.gallery-next')?.addEventListener('click', () => { next(); autoPlay(); });
  $('.gallery-prev')?.addEventListener('click', () => { previous(); autoPlay(); });
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', autoPlay);
  slider.addEventListener('touchstart', event => { touchX = event.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - touchX;
    if (Math.abs(distance) < 45) return;
    distance < 0 ? next() : previous();
    autoPlay();
  }, { passive: true });

  move(false);
  autoPlay();
});
