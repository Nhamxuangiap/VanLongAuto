(() => {
  const storageKey = 'van-long-auto-theme';
  const root = document.documentElement;
  let theme = 'dark';

  try {
    theme = localStorage.getItem(storageKey) === 'light' ? 'light' : 'dark';
  } catch {
    theme = 'dark';
  }

  root.dataset.theme = theme;

  const addToggle = () => {
    if (!document.body || document.querySelector('.theme-toggle')) return;

    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.type = 'button';
    toggle.setAttribute('role', 'switch');
    toggle.innerHTML = `
      <svg class="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>
      </svg>
      <span class="theme-toggle__track" aria-hidden="true"><span></span></span>
      <span class="theme-toggle__label">Chế độ sáng</span>
    `;

    const navToggle = document.querySelector('.nav-toggle');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    const placeToggle = () => {
      document.body.append(toggle);

      if (navToggle && mobileQuery.matches) {
        toggle.classList.add('theme-toggle--nav');
        const hamburgerRect = navToggle.getBoundingClientRect();
        const toggleRect = toggle.getBoundingClientRect();
        toggle.style.left = `${Math.max(8, hamburgerRect.left - toggleRect.width - 6)}px`;
        toggle.style.top = `${hamburgerRect.top + (hamburgerRect.height - toggleRect.height) / 2}px`;
        toggle.style.right = 'auto';
        toggle.style.bottom = 'auto';
        return;
      }

      toggle.classList.remove('theme-toggle--nav');
      toggle.style.removeProperty('left');
      toggle.style.removeProperty('top');
      toggle.style.removeProperty('right');
      toggle.style.removeProperty('bottom');
    };

    const applyTheme = (nextTheme, persist = true) => {
      theme = nextTheme;
      root.dataset.theme = theme;
      toggle.setAttribute('aria-checked', String(theme === 'light'));
      toggle.setAttribute('aria-label', theme === 'light' ? 'Tắt chế độ sáng' : 'Bật chế độ sáng');
      toggle.title = theme === 'light' ? 'Tắt chế độ sáng' : 'Bật chế độ sáng';

      if (persist) {
        try {
          localStorage.setItem(storageKey, theme);
        } catch {
          // Keep the selected theme for this page when storage is unavailable.
        }
      }
    };

    toggle.addEventListener('click', () => {
      applyTheme(theme === 'light' ? 'dark' : 'light');
    });
    placeToggle();
    mobileQuery.addEventListener('change', placeToggle);
    window.addEventListener('resize', placeToggle, { passive: true });
    applyTheme(theme, false);

    window.addEventListener('storage', event => {
      if (event.key === storageKey) {
        applyTheme(event.newValue === 'light' ? 'light' : 'dark', false);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addToggle, { once: true });
  } else {
    addToggle();
  }
})();