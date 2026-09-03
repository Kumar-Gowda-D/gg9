/* ============================================
   V2SERVICES — MAIN JAVASCRIPT
   ============================================ */
(function () {
  'use strict';

  /* ============================================
     NAVBAR SCROLL EFFECT + HEADER OFFSET
     ============================================ */
  const header = document.getElementById('header');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 60);

    const btn = document.getElementById('back-to-top');
    if (btn) btn.classList.toggle('visible', window.scrollY > 320);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  function setHeroOffset() {
    if (!header) return;
    const h = header.offsetHeight;
    const hero = document.querySelector('.hero-slider');
    if (hero) {
      hero.style.marginTop = h + 'px';
      if (window.innerWidth <= 767) {
        hero.style.height = 'auto';
      } else {
        hero.style.height = 'calc(100vh - ' + h + 'px)';
      }
    }
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
      if (window.innerWidth <= 767) {
        pageHero.style.paddingTop = (h + 35) + 'px';
      } else {
        pageHero.style.paddingTop = (h + 60) + 'px';
      }
    }
  }
  window.addEventListener('load', setHeroOffset);
  window.addEventListener('resize', setHeroOffset);
  setHeroOffset();

  /* ============================================
     MOBILE NAV TOGGLE
     ============================================ */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* Mark active nav link */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ============================================
     HERO SLIDER
     ============================================ */
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots   = Array.from(document.querySelectorAll('.slider-dot'));

  if (slides.length) {
    let cur = 0;
    let timer;

    function show(n) {
      slides[cur].classList.remove('active');
      dots[cur] && dots[cur].classList.remove('active');
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('active');
      dots[cur] && dots[cur].classList.add('active');
    }

    function next() { show(cur + 1); }
    function prev() { show(cur - 1); }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(next, 5500);
    }

    dots.forEach((d, i) => d.addEventListener('click', () => { show(i); startAuto(); }));

    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });

    /* Touch swipe */
    let tx = 0;
    const sliderEl = document.querySelector('.hero-slider');
    if (sliderEl) {
      sliderEl.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
      sliderEl.addEventListener('touchend', e => {
        const d = tx - e.changedTouches[0].screenX;
        if (Math.abs(d) > 50) { d > 0 ? next() : prev(); startAuto(); }
      }, { passive: true });
    }

    show(0);
    startAuto();
  }

  /* ============================================
     COUNTER ANIMATION
     ============================================ */
  let counted = false;
  const counters = document.querySelectorAll('[data-count]');

  function runCounters() {
    if (counted || !counters.length) return;
    const stats = document.querySelector('.stats-section');
    if (!stats) return;
    const r = stats.getBoundingClientRect();
    if (r.top > window.innerHeight - 80) return;

    counted = true;
    counters.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      let start = 0;
      const step = target / 70;
      const tick = () => {
        start += step;
        if (start >= target) { el.textContent = target.toLocaleString(); return; }
        el.textContent = Math.floor(start).toLocaleString();
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
  window.addEventListener('scroll', runCounters, { passive: true });
  setTimeout(runCounters, 400);

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-stagger');

  function checkReveal() {
    revealEls.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 70) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('load', () => setTimeout(checkReveal, 100));
  setTimeout(checkReveal, 200);

  /* ============================================
     BACK TO TOP
     ============================================ */
  const btt = document.getElementById('back-to-top');
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

})();
