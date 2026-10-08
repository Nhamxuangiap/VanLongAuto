'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* Navigation */
  const navbar = $('#navbar');
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');
  const siteSearchForm = $('#siteSearchForm');
  const siteSearchInput = $('#siteSearchInput');
  const siteSearchResults = $('#siteSearchResults');
  const searchItems = [
    { label: 'Độ âm thanh', href: 'do-amthanh.html' },
    { label: 'Nâng cấp ánh sáng', href: 'nang-cap-anh-sang.html' },
    { label: 'Dán phim cách nhiệt 3M', href: 'phim-cach-nhiet-3m.html' },
    { label: 'Dán phim cách nhiệt NTECH', href: 'phim-cach-nhiet-ntech.html' },
    { label: 'Dán PPF bảo vệ sơn', href: 'ppf-bao-ve-toan-dien-cap-nhat.html' },
    { label: 'Màn hình Android & Camera 360', href: 'man-hinh-android-cam-360.html' },
    { label: 'LED nội thất', href: 'led-noi-that.html' },
    { label: 'Chống ồn RAD Diamond Sinfoni Italy', href: 'chong-on-rad-diamond-sinfoni.html' },
    { label: 'Camera hành trình 70mai A210', href: 'san-pham-70mai-a210.html' },
    { label: 'Camera hành trình 70mai A510', href: 'san-pham-70mai-a510.html' },
    { label: 'Bi gầm HCLight G2 Plus', href: 'san-pham-bi-gam-hclight-g2-plus.html' },
    { label: 'Bi LED trợ sáng 3 mắt Winmax M3 Ultra', href: 'san-pham-bi-led-tro-sang-3-mat-winmax-m3-ultra.html' },
    { label: 'Android Box Bisonic V900', href: 'san-pham-bisonic-v900.html' },
    { label: 'Loa Mid-Treble BOS SM3', href: 'san-pham-bos-sm3.html' },
    { label: 'Bóng LED HCLight A50 Ultra', href: 'san-pham-hclight-a50-ultra.html' },
    { label: 'Bóng LED HCLight A65 Ultra', href: 'san-pham-hclight-a65-ultra.html' },
    { label: 'Bi gầm Henvvei GT-Pro', href: 'san-pham-henvvei-gt-pro.html' },
    { label: 'Bi LED Henvvei L81 Pro', href: 'san-pham-henvvei-l81-pro.html' },
    { label: 'Bi gầm HKC K3 Laser 3 màu', href: 'san-pham-hkc-k3-laser-3-mau.html' },
    { label: 'Sub điện I-Sotec BA6', href: 'san-pham-isotec-ba6.html' },
    { label: 'Loa sub Kenner K8', href: 'san-pham-kenner-k8.html' },
    { label: 'Loa sub điện KS Audio KS68', href: 'san-pham-ks-audio-ks68.html' },
    { label: 'Loa đồng trục Focal Access 165 AC', href: 'san-pham-loa-focal-access-165-ac.html' },
    { label: 'Loa phân tần Focal Access 165 AS', href: 'san-pham-loa-focal-access-165-as.html' },
    { label: 'Loa đồng trục Focal Auditor ACX 165', href: 'san-pham-loa-focal-auditor-acx-165.html' },
    { label: 'Loa cánh Focal Auditor ASE 165', href: 'san-pham-loa-focal-auditor-ase-165.html' },
    { label: 'Loa cánh Focal Flax Evo PS 165 FE', href: 'san-pham-loa-focal-flax-evo-ps-165-fe.html' },
    { label: 'Loa cánh Focal Flax Evo PS 165 FXE', href: 'san-pham-loa-focal-flax-evo-ps-165-fxe.html' },
    { label: 'Màn hình liền khối VF3 64GB', href: 'san-pham-man-hinh-lien-khoi-vf3-64g.html' },
    { label: 'Camera hành trình Navicom J247 Pro', href: 'san-pham-navicom-j247-pro.html' },
    { label: 'Camera hành trình Navicom J247 Pro 4K 3CH', href: 'san-pham-navicom-j247pro4k-3ch.html' },
    { label: 'Màn hình Santek 2K S600 360', href: 'san-pham-santek-2k-s600-360.html' },
    { label: 'Màn hình Santek ST900 360', href: 'san-pham-santek-st900-360.html' },
    { label: 'Màn hình Santek X620', href: 'san-pham-santek-x620.html' },
    { label: 'Loa đồng trục Sinfoni DS602', href: 'san-pham-sinfoni-ds602.html' },
    { label: 'Loa cánh 2Way Sinfoni S60 II', href: 'san-pham-sinfoni-s60ii.html' },
    { label: 'Loa sub điện Sinfoni S88', href: 'san-pham-sinfoni-s88.html' },
    { label: 'Camera hành trình VIETMAP S720', href: 'san-pham-vietmap-s720.html' },
    { label: 'Camera hành trình VIETMAP SpeedMap M1', href: 'san-pham-vietmap-speedmap-m1.html' },
    { label: 'Camera hành trình VIETMAP SpeedMap M2', href: 'san-pham-vietmap-speedmap-m2.html' },
    { label: 'Loa sub điện Vinsub VS-8 Pro', href: 'san-pham-vinsub-v8.html' },
    { label: 'Đèn bi LED KC-PRO', href: 'kc-pro.html' },
    { label: 'Bi LED trợ sáng Winmax M3 Ultra', href: 'winmax-m3.html' },
    { label: 'Loa cánh Focal Auditor ACX 165', href: 'focal-auditor-acx-165.html' }
  ];
  const normalizeSearch = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const closeSearchResults = () => {
    if (!siteSearchInput || !siteSearchResults) return;
    siteSearchResults.hidden = true;
    siteSearchInput.setAttribute('aria-expanded', 'false');
  };
  const renderSearchResults = () => {
    if (!siteSearchInput || !siteSearchResults) return;
    const query = normalizeSearch(siteSearchInput.value.trim());
    siteSearchResults.replaceChildren();
    if (query.length < 2) {
      closeSearchResults();
      return;
    }
    const matches = searchItems.filter(item => normalizeSearch(item.label).includes(query)).slice(0, 7);
    if (matches.length) {
      matches.forEach(item => {
        const link = document.createElement('a');
        link.className = 'site-search-result';
        link.href = item.href;
        link.setAttribute('role', 'option');
        link.textContent = item.label;
        siteSearchResults.append(link);
      });
    } else {
      const empty = document.createElement('div');
      empty.className = 'site-search-empty';
      empty.textContent = 'Không tìm thấy sản phẩm hoặc dịch vụ';
      siteSearchResults.append(empty);
    }
    siteSearchResults.hidden = false;
    siteSearchInput.setAttribute('aria-expanded', 'true');
  };
  siteSearchInput?.addEventListener('input', renderSearchResults);
  siteSearchForm?.addEventListener('submit', event => {
    event.preventDefault();
    const firstResult = $('.site-search-result', siteSearchResults || document);
    if (firstResult) window.location.href = firstResult.href;
  });
  document.addEventListener('click', event => {
    if (siteSearchForm && !siteSearchForm.contains(event.target)) closeSearchResults();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || siteSearchResults?.hidden) return;
    closeSearchResults();
    siteSearchInput.focus();
  });

  const mapToggle = $('#mapToggle');
  const mapMenu = $('#mapBranchMenu');
  const closeMapMenu = () => {
    if (!mapToggle || !mapMenu) return;
    mapMenu.hidden = true;
    mapToggle.setAttribute('aria-expanded', 'false');
  };

  mapToggle?.addEventListener('click', event => {
    event.stopPropagation();
    const open = mapMenu.hidden;
    mapMenu.hidden = !open;
    mapToggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => {
    if (mapMenu && !mapMenu.hidden && !mapMenu.contains(event.target) && !mapToggle.contains(event.target)) closeMapMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || mapMenu?.hidden) return;
    closeMapMenu();
    mapToggle.focus();
  });

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
      const ajaxEndpoint = form.action.replace('https://formsubmit.co/', 'https://formsubmit.co/ajax/');
      const response = await fetch(ajaxEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      const result = await response.json();
      if (!response.ok || ![true, 'true'].includes(result.success)) {
        throw new Error(result.message || 'Không thể gửi biểu mẫu');
      }
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
    const updateArtistDots = () => $$('.artist-dot', artistDotsBox).forEach((dot, index) => dot.classList.toggle('active', index === artistIndex));
    const buildArtistDots = () => {
      artistDotsBox.replaceChildren();
      for (let index = 0; index <= artistMax(); index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `artist-dot${index === artistIndex ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Xem ảnh từ vị trí ${index + 1}`);
        dot.addEventListener('click', () => moveArtist(index));
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

  // Hien moi khi load lai / vao trang
  // Ngoai tru khi quay lai tu trang san pham (.fs-btn) thi khong hien de khoi che #featured-services
  try {
    if (sessionStorage.getItem('vanlongauto_back_to_featured')) return;
  } catch (e) {}

  // Hiện popup sau 0.8 giây mỗi lần vào trang
  setTimeout(openPopup, 800);
});

/* =====================================================
   GIU VI TRI #featured-services KHI QUAY LAI TU TRANG SAN PHAM
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const BACK_KEY = 'vanlongauto_back_to_featured';

  // Khi bam .fs-btn: danh dau de khi quay lai index se scroll ve #featured-services
  // (popup se tu an khi thay key nay nen khong che mat section)
  document.querySelectorAll('.fs-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      try {
        sessionStorage.setItem(BACK_KEY, '#featured-services');
      } catch (e) {}
    });
  });

  // Khi index.html duoc mo lai: neu co co thi scroll ve dung muc roi xoa
  let target = null;
  try { target = sessionStorage.getItem(BACK_KEY); } catch (e) {}
  if (!target) return;

  const section = document.getElementById('featured-services');
  if (!section) {
    try { sessionStorage.removeItem(BACK_KEY); } catch (e) {}
    return;
  }

  try { sessionStorage.removeItem(BACK_KEY); } catch (e) {}

  // Tat tu restore cua trinh duyet de khong nhay len dau trang
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}

  const scrollToFeatured = () => {
    const navbar = document.getElementById('navbar');
    const navH = navbar ? navbar.offsetHeight : 72;
    const top = section.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  };

  // Scroll ngay + them 1 lan sau load de chong lech do anh/font load cham
  requestAnimationFrame(() => setTimeout(scrollToFeatured, 50));
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => setTimeout(scrollToFeatured, 50), { once: true });
  }
});
