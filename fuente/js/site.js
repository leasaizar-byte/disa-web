/* ==========================================================================
   DISA Uruguay · site.js (lo propio del sitio; se carga después de disa-motion.js)
   Cimientos: cada módulo corre dentro de safe(); lo funcional (menú, video,
   formulario, localizador) se monta siempre, también con «Reducir movimiento».
   Sin dependencias. Curvas y tiempos: los tokens del DS (tokens.css).
   ========================================================================== */
(() => {
  'use strict';
  const d = document;
  const html = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const safe = (name, fn) => { try { fn(); } catch (e) { console.warn('[DISA] ' + name, e); } };

  // Si el motor de animación del DS no cargó, se quita .js: todo queda visible y quieto.
  if (!window.DISA) { html.classList.remove('js'); } else { html.classList.add('motion-ok'); }

  /* ---- 1. Revelados de respaldo: bloques más altos que 3 pantallas (el umbral del 20 % no llega) ---- */
  safe('revelados altos', () => {
    if (!('IntersectionObserver' in window)) { $$('[data-reveal],[data-stagger]').forEach((el) => el.classList.add('is-in')); return; }
    const tall = $$('[data-reveal],[data-stagger]').filter((el) => el.offsetHeight > innerHeight * 3);
    if (!tall.length) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting || e.target.classList.contains('is-in')) return;
      e.target.classList.add('is-in'); e.target.dispatchEvent(new CustomEvent('d:in')); io.unobserve(e.target);
    }), { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    tall.forEach((el) => io.observe(el));
  });

  /* ---- 2. Una sola vez al aparecer: rutas punteadas, logo del footer ---- */
  safe('apariciones', () => {
    const els = $$('[data-route],[data-logo-anim]');
    if (RM || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: 0.35 });
    els.forEach((el) => io.observe(el));
  });

  /* ---- 3. Bucles (ondas, anillos del play): se pausan fuera de pantalla ---- */
  safe('bucles', () => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-paused', !e.isIntersecting)));
    $$('[data-loop]').forEach((el) => io.observe(el));
  });

  /* ---- 4. Menú: desplegables con mouse, un solo desplegable abierto, menú móvil accesible ---- */
  safe('menú', () => {
    const btns = $$('.d-nav__link[aria-expanded]');
    const closeAll = (except) => btns.forEach((b) => { if (b !== except) b.setAttribute('aria-expanded', 'false'); });
    btns.forEach((b) => {
      b.addEventListener('click', () => closeAll(b));
      if (!FINE) return;
      const item = b.parentElement; let t;
      item.addEventListener('mouseenter', () => { clearTimeout(t); closeAll(b); b.setAttribute('aria-expanded', 'true'); });
      item.addEventListener('mouseleave', () => { t = setTimeout(() => b.setAttribute('aria-expanded', 'false'), 180); });
    });
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

    const toggle = $('.d-menu-toggle'); const menu = $('.d-mobile-menu');
    if (!toggle || !menu) return;
    const sync = () => {
      const open = menu.dataset.state === 'open';
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ['data-state'] });
    sync();
    // Foco atrapado entre el botón de cerrar y los enlaces del menú
    d.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || menu.dataset.state !== 'open') return;
      const items = [toggle, ...$$('a', menu)];
      const i = items.indexOf(d.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    });
    toggle.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.dataset.state === 'open') toggle.click(); });
    matchMedia('(min-width: 1024px)').addEventListener('change', (m) => { if (m.matches && menu.dataset.state === 'open') toggle.click(); });
  });

  /* ---- 5. Video institucional: fachada propia, iframe de youtube-nocookie recién al hacer clic ---- */
  safe('video', () => {
    const dlg = $('#video-modal');
    const triggers = $$('[data-video-open]');
    if (!dlg || !triggers.length || typeof dlg.showModal !== 'function') return; // sin <dialog>: el enlace abre YouTube
    const frame = $('[data-video-frame]', dlg);
    const closeBtn = $('[data-video-close]', dlg);
    const ID = 'WCKhyrFthIc';
    const TITLE = 'DISA – Estación Oficial de la Celeste';
    let last = null;

    const open = (trigger) => {
      last = trigger;
      frame.innerHTML = '<div class="d-spinner" role="status" aria-label="Cargando el video"></div>';
      const f = d.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      f.title = `Video de YouTube: ${TITLE}`;
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      f.addEventListener('load', () => { const s = $('.d-spinner', frame); if (s) s.remove(); }, { once: true });
      frame.appendChild(f);
      dlg.showModal();
      closeBtn.focus({ preventScroll: true });
    };
    const close = () => {
      if (!dlg.open) return;
      let done = false;
      const finish = () => { if (done) return; done = true; if (dlg.open) dlg.close(); frame.innerHTML = ''; if (last) last.focus({ preventScroll: true }); };
      if (window.dCloseModal && !RM) { window.dCloseModal(dlg); dlg.addEventListener('close', finish, { once: true }); setTimeout(finish, 600); }
      else finish();
    };
    triggers.forEach((t) => t.addEventListener('click', (e) => { e.preventDefault(); open(t); }));
    closeBtn.addEventListener('click', close);
    dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });              // tecla Esc
    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });              // clic fuera del video
  });

  /* ---- 6. Localizador oficial (iframe del Grupo DISA): se carga al acercarse o con el botón ---- */
  safe('localizador', () => {
    const box = $('[data-locator]');
    if (!box) return;
    let loaded = false;
    const load = () => {
      if (loaded) return; loaded = true;
      const f = d.createElement('iframe');
      f.src = box.dataset.locator;
      f.title = 'Localizador de Estaciones DISA en Uruguay';
      f.loading = 'lazy';
      f.allow = 'geolocation';
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      box.appendChild(f);
      f.addEventListener('load', () => { const fc = $('.s-locator__facade', box); if (fc) fc.hidden = true; }, { once: true });
    };
    const btn = $('[data-locator-load]', box);
    if (btn) btn.addEventListener('click', load);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { load(); io.disconnect(); } }, { rootMargin: '200px 0px' });
      io.observe(box);
    }
    if (location.hash === '#localizador') load();
  });

  /* ---- 7. Formulario de contacto: validación en vivo, estados de carga, error y éxito ---- */
  safe('formulario', () => {
    const form = $('#form-contacto');
    if (!form) return;
    const AREAS = {
      comercial: ['Gestión Comercial', 'uruguay@disagrupo.uy'],
      estaciones: ['Gestión Comercial', 'uruguay@disagrupo.uy'],
      combustibles: ['Planta La Tablada', 'combs.uruguay@disagrupo.uy'],
      aviacion: ['Planta Aviación', 'aviacion.uruguay@disagrupo.uy'],
      lubricantes: ['Centro Técnico', 'centro.tecnico.uy@disagrupo.uy'],
      fertec: ['FERTEC', 'fertec@disagrupo.uy'],
      promociones: ['Gestión Comercial', 'uruguay@disagrupo.uy'],
      otro: ['Gestión Comercial', 'uruguay@disagrupo.uy'],
    };
    const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const rules = {
      nombre: (v) => (v.trim().length < 2 ? 'Escribí tu nombre y apellido.' : ''),
      correo: (v) => {
        const t = v.trim();
        if (!t) return 'Escribí tu correo para poder responderte.';
        if (!t.includes('@')) return 'Revisá el correo: falta la arroba (ej.: nombre@correo.com).';
        if (!EMAIL.test(t)) return 'Revisá el correo: falta el dominio (ej.: nombre@correo.com).';
        return '';
      },
      telefono: (v) => {
        const digits = v.replace(/\D/g, '');
        if (!v.trim()) return '';
        return digits.length < 8 || /[^\d\s+()-]/.test(v) ? 'Revisá el teléfono: usá solo números (ej.: 099 123 456).' : '';
      },
      motivo: (v) => (!v ? 'Elegí el motivo de tu consulta.' : ''),
      mensaje: (v) => (v.trim().length < 10 ? 'Contanos tu consulta en al menos 10 caracteres.' : ''),
      privacidad: (_, el) => (!el.checked ? 'Para enviar, aceptá la política de privacidad.' : ''),
    };
    const fields = Object.keys(rules).map((name) => {
      const el = form.elements[name];
      const wrap = el.closest('.d-field');
      const err = $(`#${name}-error`, form);
      return { name, el, wrap, err, touched: false };
    });
    const show = (f, msg) => {
      if (msg) {
        f.wrap.dataset.state = 'error';
        f.el.setAttribute('aria-invalid', 'true');
        f.err.hidden = false; $('span', f.err).textContent = msg;
      } else {
        const hasValue = f.el.type === 'checkbox' ? f.el.checked : f.el.value.trim() !== '';
        f.wrap.dataset.state = hasValue ? 'success' : '';
        f.el.removeAttribute('aria-invalid');
        f.err.hidden = true; $('span', f.err).textContent = '';
      }
    };
    const check = (f) => { const msg = rules[f.name](f.el.value, f.el); show(f, msg); return msg; };
    fields.forEach((f) => {
      const ev = f.el.type === 'checkbox' || f.el.tagName === 'SELECT' ? 'change' : 'blur';
      f.el.addEventListener(ev, () => { f.touched = true; check(f); });
      f.el.addEventListener('input', () => { if (f.touched) check(f); });
    });

    // Contador del mensaje
    const msg = form.elements.mensaje; const count = $('[data-count-chars]', form);
    const max = Number(msg.getAttribute('maxlength') || 1000);
    const upd = () => { if (count) count.textContent = `${msg.value.length.toLocaleString('es-UY')} / ${max.toLocaleString('es-UY')}`; };
    msg.addEventListener('input', upd); upd();

    const summary = $('[data-form-summary]', form);
    const failure = $('[data-form-failure]', form);
    const submit = $('button[type="submit"]', form);
    const fieldset = $('fieldset', form);
    const success = $('[data-form-success]');
    const params = new URLSearchParams(location.search);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      failure.hidden = true;
      const bad = fields.map((f) => { f.touched = true; return [f, check(f)]; }).filter(([, m]) => m);
      if (bad.length) {
        summary.hidden = false;
        $('ul', summary).innerHTML = bad.map(([f, m]) => `<li><a href="#${f.el.id}">${m}</a></li>`).join('');
        $$('a', summary).forEach((a) => a.addEventListener('click', (ev) => { ev.preventDefault(); d.getElementById(a.hash.slice(1)).focus(); }));
        summary.focus();
        return;
      }
      summary.hidden = true;
      if (form.elements.empresa_web && form.elements.empresa_web.value) { form.hidden = true; success.hidden = false; return; } // trampa anti-spam
      const data = Object.fromEntries(new FormData(form).entries());
      const area = AREAS[data.motivo] || AREAS.otro;
      submit.setAttribute('aria-busy', 'true'); submit.disabled = true; fieldset.disabled = true;
      const endpoint = form.dataset.endpoint;
      const send = endpoint
        ? fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...data, destino: area[1] }) })
          .then((r) => { if (!r.ok) throw new Error(r.status); })
        : new Promise((res, rej) => setTimeout(() => (params.get('demo') === 'error' ? rej(new Error('demo')) : res()), 1400)); // modo demostración (ver LEEME)
      send.then(() => {
        $('[data-success-area]', success).textContent = `${area[0]} (${area[1]})`;
        $('[data-success-name]', success).textContent = data.nombre.trim().split(/\s+/)[0];
        form.hidden = true; success.hidden = false;
        const h = $('h2', success); h.setAttribute('tabindex', '-1'); h.focus();
        success.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' });
      }).catch(() => {
        failure.hidden = false; failure.focus();
      }).finally(() => {
        submit.removeAttribute('aria-busy'); submit.disabled = false; fieldset.disabled = false;
      });
    });

    const again = $('[data-form-again]');
    if (again) again.addEventListener('click', () => {
      form.reset(); upd(); fields.forEach((f) => { f.touched = false; show(f, ''); f.wrap.dataset.state = ''; });
      success.hidden = true; form.hidden = false; form.elements.nombre.focus();
    });
    // Motivo preseleccionado desde un enlace (contacto.html?motivo=fertec)
    const pre = params.get('motivo');
    if (pre && form.elements.motivo.querySelector(`option[value="${pre}"]`)) form.elements.motivo.value = pre;
  });

  /* ---- 8. Pestañas: también con Inicio y Fin (las flechas ya las maneja disa-motion.js) ---- */
  safe('pestañas', () => {
    $$('.d-tabs [role="tablist"]').forEach((list) => {
      const tabs = $$('[role="tab"]', list);
      list.addEventListener('keydown', (e) => {
        if (e.key !== 'Home' && e.key !== 'End') return;
        e.preventDefault();
        const t = e.key === 'Home' ? tabs[0] : tabs[tabs.length - 1];
        t.click(); t.focus();
      });
    });
  });
})();
