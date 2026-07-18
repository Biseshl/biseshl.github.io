(() => {
    'use strict';

    const root = document.documentElement;
    const header = document.querySelector('[data-site-header]');
    const menu = document.querySelector('[data-nav-menu]');
    const menuToggle = document.querySelector('.nav-toggle');
    const themeToggle = document.querySelector('[data-theme-toggle]');
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    document.querySelectorAll('[data-current-year]').forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });

    const updateHeader = () => {
        header?.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const applyTheme = (theme, save = false) => {
        const nextTheme = theme === 'light' ? 'light' : 'dark';
        root.dataset.theme = nextTheme;

        if (themeMeta) {
            themeMeta.content = nextTheme === 'light' ? '#f4f8fa' : '#07111f';
        }

        if (themeToggle) {
            const switchingTo = nextTheme === 'dark' ? 'light' : 'dark';
            themeToggle.setAttribute('aria-label', `Switch to ${switchingTo} theme`);
            themeToggle.setAttribute('aria-pressed', String(nextTheme === 'light'));
        }

        if (save) {
            try {
                localStorage.setItem('theme', nextTheme);
            } catch (error) {
                // The selected theme still applies when storage is unavailable.
            }
        }
    };

    applyTheme(root.dataset.theme);

    themeToggle?.addEventListener('click', () => {
        applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });

    const closeMenu = (restoreFocus = false) => {
        if (!menu || !menuToggle) return;

        menu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');

        if (restoreFocus) menuToggle.focus();
    };

    menuToggle?.addEventListener('click', () => {
        if (!menu) return;

        const shouldOpen = !menu.classList.contains('is-open');
        menu.classList.toggle('is-open', shouldOpen);
        menuToggle.setAttribute('aria-expanded', String(shouldOpen));
        menuToggle.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    document.querySelectorAll('[data-nav-link]').forEach((link) => {
        link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menu?.classList.contains('is-open')) {
            closeMenu(true);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 860) closeMenu();
    }, { passive: true });

    const navLinks = [...document.querySelectorAll('[data-nav-link]')];
    const setActiveLink = (sectionId) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    setActiveLink('home');

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visible[0]?.target.id) setActiveLink(visible[0].target.id);
        }, {
            rootMargin: '-24% 0px -62% 0px',
            threshold: [0, 0.1, 0.25]
        });

        document.querySelectorAll('main section[id]').forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    const revealElements = [...document.querySelectorAll('.reveal')];

    revealElements.forEach((element) => {
        const delay = Number.parseInt(element.dataset.delay || '0', 10);
        element.style.setProperty('--reveal-delay', `${Math.max(0, delay)}ms`);
    });

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
    } else {
        root.classList.add('reveal-ready');

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.08
        });

        revealElements.forEach((element) => revealObserver.observe(element));
    }
})();
