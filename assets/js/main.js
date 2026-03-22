/**
 * SACHIN YADAV PORTFOLIO — main.js
 * Production-grade vanilla JS
 * Modules: Theme, Navbar, Animations, GitHub, Filter, Form, Misc
 */

'use strict';

/* ── THEME ─────────────────────────────────────────────────── */
const Theme = (() => {
  const root       = document.documentElement;
  const btn        = document.getElementById('theme-toggle');
  const iconSun    = document.getElementById('icon-sun');
  const iconMoon   = document.getElementById('icon-moon');
  const STORAGE_KEY = 'sy-theme';

  function apply(dark) {
    if (dark) {
      root.classList.add('dark');
      iconSun.classList.remove('hidden');
      iconMoon.classList.add('hidden');
    } else {
      root.classList.remove('dark');
      iconSun.classList.add('hidden');
      iconMoon.classList.remove('hidden');
    }
  }

  function init() {
    const saved    = localStorage.getItem(STORAGE_KEY);
    const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark     = saved ? saved === 'dark' : prefDark;
    apply(dark);

    btn?.addEventListener('click', () => {
      const isDark = root.classList.contains('dark');
      apply(!isDark);
      localStorage.setItem(STORAGE_KEY, isDark ? 'light' : 'dark');
    });
  }

  return { init };
})();

/* ── NAVBAR ────────────────────────────────────────────────── */
const Navbar = (() => {
  const nav       = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu= document.getElementById('mobile-menu');

  function onScroll() {
    if (window.scrollY > 20) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    mobileBtn?.addEventListener('click', () => {
      const open = mobileMenu?.classList.toggle('hidden');
      mobileBtn.setAttribute('aria-expanded', String(!open));
    });

    // Close mobile menu on link click
    mobileMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  return { init };
})();

/* ── SCROLL ANIMATIONS ─────────────────────────────────────── */
const ScrollAnimations = (() => {
  let observer;

  function init() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  }

  return { init };
})();

/* ── BACK TO TOP ───────────────────────────────────────────── */
const BackToTop = (() => {
  const btn = document.getElementById('back-to-top');

  function init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn?.classList.add('visible');
      } else {
        btn?.classList.remove('visible');
      }
    }, { passive: true });

    btn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return { init };
})();

/* ── PROJECT FILTER ────────────────────────────────────────── */
const ProjectFilter = (() => {
  function init() {
    const btns  = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#projects-grid .project-card');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show/hide cards
        cards.forEach(card => {
          const cats = card.dataset.category || '';
          const show = filter === 'all' || cats.includes(filter);
          card.classList.toggle('hidden-card', !show);
        });
      });
    });
  }

  return { init };
})();

/* ── GITHUB REPOS ──────────────────────────────────────────── */
const GitHub = (() => {
  const USERNAME = 'sachiny26012002';
  const GRID     = document.getElementById('github-grid');

  // Language → colour map (common languages)
  const LANG_COLORS = {
    'C#':         '#178600',
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'HTML':       '#e34c26',
    'CSS':        '#563d7c',
    'Python':     '#3572A5',
    'Java':       '#b07219',
    'Shell':      '#89e051',
    'Default':    '#94a3b8',
  };

  function sanitize(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  function renderCard(repo) {
    const lang      = sanitize(repo.language) || 'Unknown';
    const desc      = sanitize(repo.description) || 'No description provided.';
    const name      = sanitize(repo.name);
    const url       = sanitize(repo.html_url);
    const stars     = parseInt(repo.stargazers_count, 10) || 0;
    const forks     = parseInt(repo.forks_count, 10) || 0;
    const langColor = LANG_COLORS[repo.language] || LANG_COLORS['Default'];

    return `
      <a href="${url}" target="_blank" rel="noopener noreferrer"
         class="gh-card" aria-label="GitHub repo: ${name}">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="flex items-center gap-2 min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
            <span class="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">${name}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">${desc}</p>
        <div class="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span class="flex items-center gap-1.5">
            <span class="gh-lang-dot" style="background:${langColor}" aria-hidden="true"></span>
            ${lang}
          </span>
          ${stars > 0 ? `<span class="flex items-center gap-1" aria-label="${stars} stars">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            ${stars}
          </span>` : ''}
          ${forks > 0 ? `<span class="flex items-center gap-1" aria-label="${forks} forks">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
            ${forks}
          </span>` : ''}
        </div>
      </a>`;
  }

  function renderFallback() {
    // Show placeholder cards when API unavailable
    const placeholders = [
      { name: 'goods-delivery-app',     language: 'C#',  description: 'Cross-platform delivery app built with .NET MAUI and Blazor Hybrid.',          html_url: 'https://github.com/sachiny26012002', stargazers_count: 0, forks_count: 0 },
      { name: 'erp-system',             language: 'C#',  description: 'Enterprise ERP web application built with ASP.NET MVC and Entity Framework.',   html_url: 'https://github.com/sachiny26012002', stargazers_count: 0, forks_count: 0 },
      { name: 'restful-api-gateway',    language: 'C#',  description: 'Centralized Web API with JWT authentication and Swagger documentation.',         html_url: 'https://github.com/sachiny26012002', stargazers_count: 0, forks_count: 0 },
      { name: 'employee-leave-manager', language: 'C#',  description: 'Mobile HR leave tracker with role-based access and push notifications.',         html_url: 'https://github.com/sachiny26012002', stargazers_count: 0, forks_count: 0 },
      { name: 'inventory-system',       language: 'C#',  description: 'Real-time inventory dashboard with barcode scanning and reorder automation.',     html_url: 'https://github.com/sachiny26012002', stargazers_count: 0, forks_count: 0 },
      { name: 'field-service-tracker',  language: 'C#',  description: 'MAUI offline-first app with background GPS sync and work-order management.',     html_url: 'https://github.com/sachiny26012002', stargazers_count: 0, forks_count: 0 },
    ];

    if (GRID) {
      GRID.innerHTML = placeholders.map(renderCard).join('');
    }
  }

  async function fetchRepos() {
    if (!GRID) return;

    try {
      const controller = new AbortController();
      const timeout    = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6&type=public`,
        {
          signal:  controller.signal,
          headers: { Accept: 'application/vnd.github.v3+json' },
        }
      );

      clearTimeout(timeout);

      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

      const repos = await res.json();

      if (!Array.isArray(repos) || repos.length === 0) {
        renderFallback();
        return;
      }

      // Sanitize and render
      GRID.innerHTML = repos.slice(0, 6).map(renderCard).join('');

    } catch {
      // Silently fall back — don't expose errors to users
      renderFallback();
    }
  }

  function init() { fetchRepos(); }

  return { init };
})();

/* ── CONTACT FORM ──────────────────────────────────────────── */
const ContactForm = (() => {
  const form    = document.getElementById('contact-form');
  const btnEl   = document.getElementById('submit-btn');
  const btnText = document.getElementById('submit-text');
  const success = document.getElementById('form-success');

  function setError(fieldId, msg) {
    const el = document.getElementById(`${fieldId}-error`);
    const input = document.getElementById(fieldId);
    if (el)    el.textContent = msg;
    if (input) input.classList.toggle('error', !!msg);
  }

  function clearErrors() {
    ['name', 'email', 'message'].forEach(id => setError(id, ''));
  }

  function validate(data) {
    let valid = true;
    clearErrors();

    if (!data.name.trim()) {
      setError('name', 'Please enter your name.'); valid = false;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      setError('email', 'Please enter your email.'); valid = false;
    } else if (!emailRe.test(data.email)) {
      setError('email', 'Please enter a valid email address.'); valid = false;
    }

    if (!data.message.trim() || data.message.trim().length < 10) {
      setError('message', 'Please enter a message (min 10 characters).'); valid = false;
    }

    return valid;
  }

  function init() {
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        name:    form.name.value,
        email:   form.email.value,
        subject: form.subject?.value || '',
        message: form.message.value,
      };

      if (!validate(data)) return;

      // Simulate submission (replace with real endpoint / Formspree / EmailJS)
      btnEl.disabled = true;
      btnText.textContent = 'Sending…';

      await new Promise(r => setTimeout(r, 1200));

      btnEl.disabled = false;
      btnText.textContent = 'Send Message';

      success?.classList.remove('hidden');
      form.reset();
      clearErrors();

      setTimeout(() => success?.classList.add('hidden'), 5000);
    });
  }

  return { init };
})();

/* ── ACTIVE NAV LINK ───────────────────────────────────────── */
const ActiveNav = (() => {
  function init() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-link');

    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => {
            l.classList.toggle(
              'text-indigo-600',
              l.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  return { init };
})();

/* ── BOOT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Navbar.init();
  ScrollAnimations.init();
  BackToTop.init();
  ProjectFilter.init();
  GitHub.init();
  ContactForm.init();
  ActiveNav.init();
});
