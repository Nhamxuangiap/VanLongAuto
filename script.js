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

  /* Chứng chỉ & bằng khen: tự trượt, có nút và vuốt mobile */
  const certificateSlider = $('.certificate-slider');
  const certificateTrack = $('.certificate-track');
  const certificateDotsBox = $('.certificate-dots');

  let certificateIndex = 0;
  let certificateTimer;
  let certificateScrollFrame;

  if (certificateSlider && certificateTrack && certificateDotsBox) {
    const certificateCards = $$('.certificate-card', certificateTrack);
    const certificateStep = () => {
      const gap = parseFloat(getComputedStyle(certificateTrack).gap) || 0;
      return (certificateCards[0]?.getBoundingClientRect().width || 0) + gap;
    };
    const certificateMax = () => {
      const step = certificateStep();
      return step ? Math.max(0, Math.round((certificateTrack.scrollWidth - certificateTrack.clientWidth) / step)) : 0;
    };
    const updateCertificateDots = () => $$('.artist-dot', certificateDotsBox).forEach((dot, index) => dot.classList.toggle('active', index === certificateIndex));
    const moveCertificate = nextIndex => {
      const maxIndex = certificateMax();
      certificateIndex = nextIndex > maxIndex ? 0 : nextIndex < 0 ? maxIndex : nextIndex;
      certificateTrack.scrollTo({ left: certificateIndex * certificateStep(), behavior: 'smooth' });
      updateCertificateDots();
    };
    const buildCertificateDots = () => {
      certificateDotsBox.replaceChildren();
      for (let index = 0; index <= certificateMax(); index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `artist-dot${index === certificateIndex ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Xem chứng chỉ từ vị trí ${index + 1}`);
        dot.addEventListener('click', () => moveCertificate(index));
        certificateDotsBox.append(dot);
      }
    };
    const playCertificates = () => {
      clearInterval(certificateTimer);
      if (certificateMax() > 0) {
        certificateTimer = setInterval(() => moveCertificate(certificateIndex + 1), 3500);
      }
    };
    const pauseCertificates = () => clearInterval(certificateTimer);

    certificateTrack.addEventListener('scroll', () => {
      cancelAnimationFrame(certificateScrollFrame);
      certificateScrollFrame = requestAnimationFrame(() => {
        const step = certificateStep();
        if (!step) return;
        certificateIndex = Math.min(certificateMax(), Math.round(certificateTrack.scrollLeft / step));
        updateCertificateDots();
      });
    }, { passive: true });
    $('.certificate-next')?.addEventListener('click', () => { moveCertificate(certificateIndex + 1); playCertificates(); });
    $('.certificate-prev')?.addEventListener('click', () => { moveCertificate(certificateIndex - 1); playCertificates(); });
    certificateSlider.addEventListener('mouseenter', pauseCertificates);
    certificateSlider.addEventListener('mouseleave', playCertificates);
    certificateSlider.addEventListener('touchstart', pauseCertificates, { passive: true });
    certificateSlider.addEventListener('touchend', playCertificates, { passive: true });
    addEventListener('resize', () => {
      certificateIndex = Math.min(certificateIndex, certificateMax());
      buildCertificateDots();
    }, { passive: true });

    buildCertificateDots();
    playCertificates();
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
/* ----------------------------------------------------
     TÍNH NĂNG BẬT/TẮT ÂM THANH & TẠM DỪNG VIDEO DỌC
  ----------------------------------------------------- */
  const promoVideo = document.getElementById('promoVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const muteUnmuteBtn = document.getElementById('muteUnmuteBtn');

  // Các icon SVG để thay đổi trạng thái
  const iconPlay = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  const iconPause = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  const iconMute = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
  const iconUnmute = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;

  if (promoVideo && playPauseBtn && muteUnmuteBtn) {
    // 1. Xử lý Phát / Tạm dừng
    playPauseBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Ngăn chặn nhảy trang
      if (promoVideo.paused) {
        promoVideo.play();
        playPauseBtn.innerHTML = iconPause;
      } else {
        promoVideo.pause();
        playPauseBtn.innerHTML = iconPlay;
      }
    });

    // 2. Xử lý Bật âm / Tắt âm
    muteUnmuteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (promoVideo.muted) {
        promoVideo.muted = false;
        muteUnmuteBtn.innerHTML = iconUnmute;
      } else {
        promoVideo.muted = true;
        muteUnmuteBtn.innerHTML = iconMute;
      }
    });
  }
  /* =====================================================
   POPUP KHUYẾN MÃI PHIM CÁCH NHIỆT
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('promoPopup');
  const video = document.getElementById('popupVideo');
  const closeBtn = document.getElementById('closePopupBtn');
  const soundBtn = document.getElementById('popupMuteToggle');

  if (!popup || !video || !closeBtn) return;

  // Cập nhật giao diện nút âm thanh
  const updateSoundButton = () => {
    if (!soundBtn) return;

    if (video.muted) {
      soundBtn.textContent = '🔇 Bật tiếng';
      soundBtn.style.color = '#fff';
      soundBtn.style.borderColor = 'rgba(255,255,255,0.3)';
    } else {
      soundBtn.textContent = '🔊 Đang bật tiếng';
      soundBtn.style.color = 'var(--gold)';
      soundBtn.style.borderColor = 'var(--gold)';
    }
  };

  // Mở popup
  const openPopup = () => {
    popup.classList.add('active');

    // Luôn bắt đầu ở trạng thái tắt tiếng
    video.muted = true;

    updateSoundButton();

    // Chỉ phát video khi popup xuất hiện
    video.play().catch(() => {});
  };

  // Đóng popup
  const closePopup = () => {
    popup.classList.remove('active');

    // QUAN TRỌNG:
    // Dừng hoàn toàn video khi đóng popup
    video.pause();
    video.muted = true;
    video.currentTime = 0;

    updateSoundButton();
  };

  // Bật / tắt âm thanh
  soundBtn?.addEventListener('click', () => {
    video.muted = !video.muted;
    updateSoundButton();
  });

  // Đóng bằng nút X
  closeBtn.addEventListener('click', closePopup);

  // Click vùng đen ngoài popup để đóng
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  // Nhấn ESC để đóng
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
      closePopup();
    }
  });

  // Hiện popup sau 0.8 giây
  setTimeout(openPopup, 800);
});
