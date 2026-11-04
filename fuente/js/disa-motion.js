/* ==========================================================================
   DISA Uruguay — disa-motion.js (vanilla, sin dependencias, ~6 KB min)
   Stack elegido: CSS + Web Animations API + IntersectionObserver.
   GSAP/ScrollTrigger SOLO si una página necesita una secuencia fijada compleja
   (más de 3 pasos sincronizados); ver design-system.md §6.
   Todo respeta prefers-reduced-motion y deja el texto completo en el HTML.
   ========================================================================== */
/* PARCHE DISA web (nov. 2026), sin cambiar tiempos ni curvas:
   1. El empuje del colibrí usa fill 'forwards' (antes 'both'): con 'both' su estado inicial
      tapaba la escala .35→1.06→1 y la rotación del paso 1 (design-system.md §1.5).
   2. Si el header termina en color (no en blanco), las capas blancas quedan siempre ocultas:
      antes el fundido del paso 1 y del eslogan las mostraba encima de las de color. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const RM = () => reduced.matches;

  /* ---- 1. Reveals (una sola vez, no se repiten al volver) ---- */
  const once = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-in');
      e.target.dispatchEvent(new CustomEvent('d:in'));
      once.unobserve(e.target);
    }
  }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

  const initReveals = (scope = document) => {
    scope.querySelectorAll('[data-stagger]').forEach((el) => [...el.children].forEach((c, i) => c.style.setProperty('--i', i)));
    scope.querySelectorAll('[data-reveal],[data-stagger],.d-split:not([data-enter]),.d-draw,[data-count],.d-progress,[data-type]').forEach((el) => once.observe(el));
    scope.querySelectorAll('[data-enter-stagger]').forEach((el) => [...el.children].forEach((c, i) => c.style.setProperty('--i', i)));
  };

  /* ---- 2. Titulares por palabra (T1). Mantiene accesibilidad. ---- */
  const splitWords = (el) => {
    if (el.dataset.splitDone) return;
    const label = el.textContent.trim().replace(/\s+/g, ' ');
    el.setAttribute('aria-label', label);
    let wi = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
            const s = document.createElement('span'); s.textContent = part; w.style.setProperty('--wi', wi++);
            w.append(s); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) { n.setAttribute('aria-hidden', 'true'); walk(n); }
      });
    };
    walk(el); el.dataset.splitDone = '1';
  };

  /* ---- 3. Rotación de palabras (T3): 2 400 ms por palabra, pausa fuera de pantalla ---- */
  const initRotator = (el) => {
    const items = [...el.children]; if (items.length < 2) return;
    items.forEach((s, i) => { s.dataset.state = i ? '' : 'in'; if (i) s.setAttribute('aria-hidden', 'true'); });
    el.setAttribute('aria-live', 'off');
    let i = 0, timer = null, visible = false;
    const tick = () => {
      const cur = items[i]; i = (i + 1) % items.length; const nxt = items[i];
      cur.dataset.state = 'out'; cur.setAttribute('aria-hidden', 'true');
      nxt.dataset.state = 'in'; nxt.removeAttribute('aria-hidden');
      setTimeout(() => { if (cur.dataset.state === 'out') cur.dataset.state = ''; }, 300);
    };
    const run = () => { clearInterval(timer); if (visible && !RM() && root.classList.contains('is-ready')) timer = setInterval(tick, Number(el.dataset.interval || 2400)); };
    document.addEventListener('d:ready', () => setTimeout(run, 1000));
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }).observe(el);
  };

  /* ---- 4. Contadores (Números): formato es-UY, 1 600 ms, easeOutExpo, una sola vez ---- */
  const fmt = (v, dec) => new Intl.NumberFormat('es-UY', { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(v);
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
  const initCounter = (el) => {
    const target = parseFloat(el.dataset.count); const dec = Number(el.dataset.decimals || 0);
    const out = el.querySelector('[data-count-value]') || el;
    out.textContent = fmt(RM() ? target : 0, dec);
    el.addEventListener('d:in', () => {
      if (RM()) { out.textContent = fmt(target, dec); return; }
      const dur = Number(el.dataset.duration || 1600); const t0 = performance.now();
      const step = (now) => { const t = Math.min(1, (now - t0) / dur); out.textContent = fmt(target * easeOutExpo(t), dec); if (t < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, { once: true });
  };

  /* ---- 5. Máquina de escribir (T4) — solo datos técnicos, 28 ms/carácter, máx 40 caracteres ---- */
  const initType = (el) => {
    const full = el.textContent; el.setAttribute('aria-label', full);
    if (RM()) { el.dataset.done = ''; return; }
    el.textContent = ''; el.classList.add('d-type');
    el.addEventListener('d:in', () => {
      let n = 0; const id = setInterval(() => { el.textContent = full.slice(0, ++n); if (n >= full.length) { clearInterval(id); el.dataset.done = ''; } }, 28);
    }, { once: true });
  };

  /* ---- 6. Frase fijada con scroll (T5) ---- */
  const initSticky = (wrap) => {
    const items = [...wrap.querySelectorAll('.d-sticky-phrase__item')];
    wrap.style.setProperty('--steps', items.length);
    const onScroll = () => {
      const r = wrap.getBoundingClientRect(); const total = r.height - innerHeight;
      const p = Math.min(0.999, Math.max(0, -r.top / total)); const idx = Math.floor(p * items.length);
      items.forEach((it, i) => it.toggleAttribute('data-active', i === idx));
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  };

  /* ---- 7. Loops: pausar fuera de pantalla ---- */
  const pauser = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-paused', !e.isIntersecting)), { threshold: 0 });

  /* ---- 8. Header: transparente sobre el hero → sólido a 80 px; se oculta bajando y vuelve subiendo ---- */
  const initHeader = (h) => {
    let last = scrollY; const hero = document.querySelector('.d-hero');
    const onScroll = () => {
      const y = scrollY; const solid = !hero || y > 80;
      const hide = y > 640 && y > last + 4 && !document.querySelector('.d-mobile-menu[data-state="open"]');
      h.dataset.state = hide ? 'hidden' : (solid ? 'solid' : '');
      if (y < last - 4 && solid) h.dataset.state = 'solid';
      last = y;
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  };

  /* ---- 9. Dropdowns, menú móvil, tabs ---- */
  const initNav = () => {
    document.querySelectorAll('.d-nav__link[aria-expanded]').forEach((btn) => {
      const close = () => btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true')));
      btn.parentElement.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); btn.focus(); } });
      document.addEventListener('click', (e) => { if (!btn.parentElement.contains(e.target)) close(); });
    });
    const toggle = document.querySelector('.d-menu-toggle'); const menu = document.querySelector('.d-mobile-menu');
    if (toggle && menu) {
      menu.querySelectorAll('a').forEach((a, i) => a.style.setProperty('--i', i));
      const set = (open) => { menu.dataset.state = open ? 'open' : ''; toggle.setAttribute('aria-expanded', String(open)); document.body.style.overflow = open ? 'hidden' : ''; if (open) menu.querySelector('a')?.focus({ preventScroll: true }); };
      toggle.addEventListener('click', () => set(menu.dataset.state !== 'open'));
      menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); toggle.focus(); } });
      menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
    }
    document.querySelectorAll('.d-tabs').forEach((t) => {
      const tabs = [...t.querySelectorAll('[role="tab"]')];
      const sel = (tab) => tabs.forEach((x) => { const on = x === tab; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !on; });
      tabs.forEach((tab, i) => { tab.addEventListener('click', () => sel(tab)); tab.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; sel(n); n.focus(); } }); });
    });
  };

  /* ---- 10. Modal con salida animada ---- */
  window.dCloseModal = (dlg) => { if (RM()) return dlg.close(); dlg.setAttribute('data-closing', ''); dlg.addEventListener('animationend', () => { dlg.removeAttribute('data-closing'); dlg.close(); }, { once: true }); };

  /* ---- 11. Cambio de fondo entre secciones (S1) ---- */
  const initBgShift = () => {
    const secs = [...document.querySelectorAll('[data-bg-shift]')]; if (!secs.length) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) document.body.style.backgroundColor = e.target.dataset.bgShift; }), { threshold: 0.5 });
    secs.forEach((s) => io.observe(s));
  };

  /* ---- 12. Zoom del hero ligado al scroll (fallback sin scroll-timeline) — 108 % → 100 % en 1 alto de pantalla ---- */
  const initHeroZoom = () => {
    const media = document.querySelector('.d-hero__media img, .d-hero__media video'); if (!media || RM()) return;
    let ticking = false;
    addEventListener('scroll', () => { if (ticking) return; ticking = true; requestAnimationFrame(() => {
      const p = Math.min(1, scrollY / innerHeight); media.parentElement.parentElement.style.setProperty('--hero-scale', (1.08 - 0.08 * p).toFixed(4)); ticking = false; }); }, { passive: true });
  };

  /* ---- 13. Intro de marca (1.ª visita de la sesión) + entrada de la web ----
     Coreografía (ms desde t0), tokens en tokens.json → intro:
       0–700      colibrí aparece en el centro (escala .35→1.06→1, rota −16°→0)
       900–1650   las letras entran desde la derecha y empujan al colibrí a su lugar
       1500–1950  eslogan se descubre de izquierda a derecha
       2200–2950  el logo sube y se acomoda en el header (FLIP); color→blanco si el header va sobre hero oscuro
       2300–3000  el panel blanco se va hacia arriba con borde inclinado
       2600       html.is-ready → entra la web (data-enter + --enter-delay)
     Saltable con botón, clic, tecla, rueda o toque. Sin intro: is-ready inmediato. */
  const T = { birdIn: [0, 700], push: [900, 750], slogan: [1500, 450], dock: [2200, 750], panel: [2300, 700], ready: 2600, swap: 350 };
  const EZ = { energy: 'cubic-bezier(0.16, 1, 0.3, 1)', camera: 'cubic-bezier(0.65, 0, 0.35, 1)', exit: 'cubic-bezier(0.7, 0, 0.84, 0)' };
  const setReady = () => {
    if (root.classList.contains('is-ready')) return;
    root.classList.add('is-ready'); document.dispatchEvent(new CustomEvent('d:ready'));
    setTimeout(() => root.classList.add('is-settled'), 3200);
  };
  const initIntro = () => {
    const intro = document.querySelector('.d-intro');
    let seen = false; try { seen = sessionStorage.getItem('disa-intro') === '1'; sessionStorage.setItem('disa-intro', '1'); } catch (e) {}
    if (!intro || seen || RM() || new URLSearchParams(location.search).has('nointro')) { intro?.remove(); root.classList.remove('d-intro-on'); requestAnimationFrame(setReady); return; }
    root.classList.add('d-intro-on');
    const logo = intro.querySelector('.d-intro__logo'), panel = intro.querySelector('.d-intro__panel');
    const birds = logo.querySelectorAll('[data-layer="colibri"]'), words = logo.querySelectorAll('[data-layer="wordmark"]'), slogans = logo.querySelectorAll('[data-layer="eslogan"]');
    const anims = [], timers = [];
    const A = (els, kf, dur, delay, easing, fill = 'both') => els.forEach((el) => anims.push(el.animate(kf, { duration: dur, delay, easing, fill })));
    const C = 'translate(32.5%, 25.3%)'; // centro del colibrí → centro del lockup (viewBox 446×231)
    birds.forEach((b) => { b.style.transformOrigin = '17.5% 24.7%'; });
    A(birds, [{ opacity: 0, transform: `${C} scale(.35) rotate(-16deg)` }, { opacity: 1, transform: `${C} scale(1.06) rotate(2deg)`, offset: 0.7 }, { opacity: 1, transform: `${C} scale(1) rotate(0deg)` }], T.birdIn[1], T.birdIn[0], EZ.energy);
    A(birds, [{ transform: `${C}` }, { transform: 'translate(0, 0)' }], T.push[1], T.push[0], EZ.camera, 'forwards');
    A(words, [{ clipPath: 'inset(0 0 0 100%)', transform: 'translateX(8%)' }, { clipPath: 'inset(0 0 0 0%)', transform: 'translateX(0)' }], T.push[1], T.push[0], EZ.camera);
    A(slogans, [{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0% 0 0)' }], T.slogan[1], T.slogan[0], EZ.energy);
    // Dock (FLIP) hacia el logo del header
    const slot = document.querySelector('.d-header__logo');
    const targetSvg = slot && [...slot.querySelectorAll('svg, img')].find((n) => n.getBoundingClientRect().width > 0);
    if (targetSvg) {
      const a = logo.getBoundingClientRect(), b = targetSvg.getBoundingClientRect();
      const s = b.width / a.width, dx = b.left - a.left, dy = b.top - a.top;
      anims.push(logo.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${dx}px, ${dy}px) scale(${s})` }], { duration: T.dock[1], delay: T.dock[0], easing: EZ.camera, fill: 'both' }));
      const toWhite = !!targetSvg.closest('.d-logo-white');
      if (toWhite) {
        const d0 = T.dock[0] + T.dock[1] - T.swap;
        A([...logo.querySelectorAll('.is-white')], [{ opacity: 0 }, { opacity: 1 }], T.swap, d0, EZ.camera);
        A([...logo.querySelectorAll('.is-color')], [{ opacity: 1 }, { opacity: 0 }], T.swap, d0, EZ.camera);
      }
      else A([...logo.querySelectorAll('.is-white')], [{ opacity: 0 }, { opacity: 0 }], 1, 0, 'linear');
    }
    else A([...logo.querySelectorAll('.is-white')], [{ opacity: 0 }, { opacity: 0 }], 1, 0, 'linear');
    anims.push(panel.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-115%)' }], { duration: T.panel[1], delay: T.panel[0], easing: EZ.camera, fill: 'both' }));
    let ended = false;
    const finish = () => {
      if (ended) return; ended = true;
      timers.forEach(clearTimeout); setReady();
      root.classList.remove('d-intro-on'); intro.dataset.state = 'done';
      ['click', 'keydown', 'wheel', 'touchstart'].forEach((ev) => removeEventListener(ev, skip, true));
      setTimeout(() => intro.remove(), 50);
    };
    const skip = () => { anims.forEach((x) => { try { x.finish(); } catch (e) {} }); finish(); };
    timers.push(setTimeout(setReady, T.ready));
    timers.push(setTimeout(finish, Math.max(T.dock[0] + T.dock[1], T.panel[0] + T.panel[1]) + 40));
    ['click', 'keydown', 'wheel', 'touchstart'].forEach((ev) => addEventListener(ev, skip, { capture: true, passive: true }));
  };

  /* ---- 14. Cuenta regresiva (promos) ---- */
  const initCountdown = (el) => {
    const end = new Date(el.dataset.countdown).getTime(); const parts = el.querySelectorAll('b');
    const upd = () => { let s = Math.max(0, Math.floor((end - Date.now()) / 1000)); const v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      parts.forEach((b, i) => { b.textContent = String(v[i]).padStart(2, '0'); }); if (s === 0) { el.closest('[data-promo]')?.setAttribute('data-state', 'expired'); clearInterval(id); } };
    const id = setInterval(upd, 1000); upd();
  };

  const boot = () => {
    document.querySelectorAll('.d-split').forEach((el) => { if (!RM()) splitWords(el); });
    document.querySelectorAll('.d-rotator').forEach(initRotator);
    document.querySelectorAll('[data-count]').forEach(initCounter);
    document.querySelectorAll('[data-type]').forEach(initType);
    document.querySelectorAll('.d-sticky-phrase').forEach(initSticky);
    document.querySelectorAll('.d-float,.d-shine,.d-marquee,.d-energy-line,.d-logo-loop').forEach((el) => pauser.observe(el));
    document.querySelectorAll('[data-countdown]').forEach(initCountdown);
    const h = document.querySelector('.d-header'); if (h) initHeader(h);
    initNav(); initBgShift(); initHeroZoom(); initIntro(); initReveals();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.DISA = { initReveals, setReady };
})();
