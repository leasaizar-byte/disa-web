# Brief para Claude Code — construir la web de DISA Uruguay

> Este documento es el encargo. El sistema de diseño (`design-system.md`, `CLAUDE.md`, `tokens/`, `code/`, `assets/`) define **cómo** se ve y se mueve todo. Acá está **qué** construir, en qué orden y cómo verificarlo. Si algo choca, gana `design-system.md`.

## 0. Prompt para pegar en Claude Code

```
Construí el sitio web de DISA Uruguay siguiendo docs/brief-web-claude-code.md.
Antes de escribir código leé, en este orden: CLAUDE.md, design-system.md (completo), tokens/tokens.json,
code/disa.css, code/disa-motion.js, code/snippets/intro-markup.html y assets/motion/intro-sequence.html.
Usá SOLO tokens, clases d-* y assets del paquete. No inventes datos: lo que falte va como [A confirmar].
Trabajá por fases (§3), mostrame capturas a 1920, 768 y 390 px al cerrar cada fase y no avances sin verificar §8.
```

## 1. Contexto
- **Cliente:** DISA Uruguay S.A., segundo distribuidor de combustibles del país. Tiene 93 estaciones, DISA Shop, lubricantes Mobil (distribuidor oficial desde 2024), fertilizantes líquidos FERTEC y combustibles para transporte terrestre, aviación y marino. Es parte del Grupo DISA (Canarias, 1933).
- **Concepto:** «Sentí nuestra energía». Debe ser cercana, confiable, en movimiento y uruguaya, con voseo.
- **Sitio actual de referencia de contenido (no de estilo):** https://www.disagrupo.com.uy

## 2. Stack recomendado
- **Astro** (salida estática, cero JS por defecto, componentes `.astro`), con CSS plano: `tokens/tokens.css` + `code/disa.css` como base global. Si el equipo prefiere otro stack (Next.js, HTML plano), las reglas son las mismas: no cambiar nombres de clases ni tokens.
- JS: `code/disa-motion.js` tal cual, cargado con `defer` al final del body. **No sumar** GSAP, Lenis, AOS ni librerías de scroll. GSAP + ScrollTrigger solo si una página necesita una secuencia fijada de más de 3 pasos, y solo en esa página.
- Íconos: inyectar `assets/icons/sprite-bicolor.svg` inline al inicio del `<body>` (para que `<use href="#icon-…">` funcione también en local).
- Logo del header: SVG **inline** (necesario para la intro FLIP y para cambiar de color). Versión blanca dentro de `.d-logo-white` y versión color dentro de `.d-logo-color`.
- Imágenes: `<picture>` con AVIF, WebP y JPG, `srcset` 480/768/1200/1600/2400 y `loading="lazy"` salvo el hero.
- Estructura sugerida:
```
src/
  layouts/Base.astro          ← <head>, fuentes, OG, sprite, intro, header, footer, scripts
  components/                 ← Header, MobileMenu, Footer, Hero, ServiceCard, StatBand, Locator, StationCard,
                                 PromoCard, Countdown, Steps, ProductCard, Tabs, Accordion, ContactForm, SedeCard,
                                 PartnerMarquee, Modal, CookieBanner, Breadcrumb
  pages/                      ← ver §4
  data/                       ← stations.json, promos.json, products.json, rules.json, sedes.json
public/assets/ ← copia de assets/ ;  src/styles/ ← tokens.css + disa.css
```

## 3. Fases (en este orden)
1. **Base:** layout, tokens, fuentes, sprite, header (transparente → sólido), menú móvil, footer, skip link, 404 y mantenimiento.
2. **Intro de marca + home** (§5 y §6). Es la pieza más visible: tiene que quedar exacta.
3. **Red de Estaciones + localizador** (§4.3).
4. **Lubricantes + Centro Técnico**, **Promociones** (listado + detalle con plantilla §17), **Prevención DISA**, **Conoce DISA** y **Contacto**.
5. **Pulido:** SEO, datos estructurados, cookies, rendimiento y accesibilidad (§8).

## 4. Mapa del sitio y secciones
Todas las páginas: header, migas de pan (salvo la home) y footer con emergencias (2200 7185, CIAT 1722), redes, «Ir al sitio de España» y legales.

### 4.1 Inicio `/`
1. **Hero 16:9** (intro + entrada §5–6): video muteado en loop o foto, velo, overline «93 estaciones en todo Uruguay», H1 «Sentí nuestra energía» + rotador «en cada ruta / carga / viaje / cosecha», bajada, CTA «Encontrá tu estación» + «Ver promociones», ala amarilla e indicador «Deslizá».
2. **Servicios** (fondo `bg-servicios`): 5 tarjetas `.d-service-card` con pictograma (Estaciones, Combustibles, Lubricantes Mobil, FERTEC, DISA Shop), `data-stagger`.
3. **Cifras** (`.theme-night`, `bg-numeros`): 93 · +90 AÑOS · 5.680 · 12, con contadores. Marcar «a confirmar».
4. **Frase fijada** `.d-sticky-phrase`: «Energía que se siente» / «que te acompaña» / «uruguaya».
5. **Localizador resumido**: mapa con la lente sobre Montevideo y CTA a `/red-de-estaciones`.
6. **Promo destacada** (`.theme-energy`): cifra protagonista, título con `.d-mark`, fechas, cuenta regresiva y 3 tarjetas de promo.
7. **Lubricantes Mobil**: bloque con dato técnico `[data-type]` y CTA.
8. **Prevención DISA**: teaser con «En DISA, nuestra seguridad sos vos» (confirmar el voseo con DISA).
9. **Aliados** `.d-marquee` con `.d-partner-slot` (logos oficiales o el placeholder).
10. **Contacto rápido** y footer.

### 4.2 Conoce DISA `/conoce-disa` (+ `/conoce-disa/grupo-disa`, `/conoce-disa/responsabilidad-corporativa`)
Historia en línea de tiempo con ruta punteada `.d-draw` (1933 Canarias · 1953 primer operador de GLP en España · 2021 llega a Uruguay · 2024 distribuidor oficial Mobil). Cifras del Grupo (más de 3.600 personas, más de 600 estaciones, renovables de 64 MW en Canarias). Canal de Denuncia con enlace externo y aviso de confidencialidad.

### 4.3 Red de Estaciones `/red-de-estaciones` (+ `/combustibles`)
- **Localizador** `.d-locator`: buscador, chips de combustible (Super 95, Premium 97, Gas Oil 50 S, Gas Oil 10 S) y de servicio (DISA Shop, café, lavadero, aire y agua, baños, cajero, wifi, carga eléctrica, delivery), lista de `.d-station` y mapa con `.d-pin` y `.d-pin-cluster`.
- Mapa: Leaflet o MapLibre con teselas claras y desaturadas (sin estilo por defecto), pines del sistema y la lente amarilla al seleccionar. Animaciones: zoom al pin en 720 ms con curva camera; pin con spring.
- **Datos:** `data/stations.json` con `{id, nombre, direccion, ciudad, departamento, lat, lng, horario, combustibles[], servicios[]}`. **No hay datos públicos completos**: conectar a la fuente de DISA. Mientras tanto, usar solo las direcciones de las piezas IG (Rbla. Dr. Baltasar Brum 2746 · Av. Italia 5775 · Av. Giannattasio 8300 · Ruta 10 Km 131 · Rbla. William Parada 16 · Av. Wilson Ferreira Aldunate) con horario `[A confirmar]`.
- Estados: vacío, error de red, sin ubicación y carga con skeleton (§16).
- **Combustibles:** fichas de Super 95 (95 RON), Premium 97 (97 RON, hasta 10 % de etanol, UNIT 1122), Gas Oil 50 S (50 ppm, hasta 7 % de biodiésel, UNIT 1100) y Gas Oil 10 S (10 ppm).

### 4.4 Lubricantes `/lubricantes` (+ `/lubricantes/centro-tecnico`)
Catálogo filtrable con `.d-tabs` (Especialidades, Motor diésel, Motores livianos, Motos, Transmisiones), tarjeta de producto con «Ficha técnica (PDF)» y «Hoja de seguridad» (enlaces oficiales de ExxonMobil), catálogos Delvac Transporte, Delvac Agrícolas y Super Utilitarios. Centro Técnico: 5.680 muestras en 2023, normas ASTM, equipamiento, 6 servicios y CTA al portal `sistlabclientes.disagrupo.com.uy`. Logística Planta Bella Vista. Aviso: «único distribuidor oficial de Mobil en Uruguay».

### 4.5 Promociones `/promociones` y `/promociones/[slug]`
Listado con `.d-promo-card` (estados activa, nueva, por tiempo limitado y finalizada). Detalle con la **plantilla §17**: overline, cifra, título con énfasis, fechas, pasos `.d-steps`, CTA, bases en `.d-modal` + PDF, y aliados. Transición de página con elemento compartido (`view-transition-name: promo-<slug>`). Promos actuales: Tu experiencia DISA, Cargá y ganá un 0 km, Millas triples con Itaú, DISA te lleva a España, Canje de millas Itaú y Canje de metros OCA (fechas y bases `[A confirmar]`).

### 4.6 Prevención DISA `/prevencion`
Las 12 reglas en tarjetas numeradas con `data-stagger` (texto `[A confirmar]`: no está publicado, viene de prevenciondisa.com.uy), acordeón de política de gestión y certificaciones, y CTA a la plataforma de capacitación.

### 4.7 Contacto `/contacto`
Formulario (nombre, correo, teléfono opcional, motivo, mensaje y aceptación de privacidad) con validación en vivo al salir de cada campo, errores en voseo y envío con `aria-busy`. Tarjetas de sede: Gestión Comercial, Centro Técnico, Planta Aviación (Ruta 101 Km 19,500), Planta La Tablada (Camino Francisco Lecocq 989) y Oficinas Planta Bella Vista, con teléfono `2200 9920` + interno y correo. Mapa.

## 5. Intro de marca (paso a paso)
1. Pegá `code/snippets/intro-markup.html` como **primer hijo de `<body>`**, solo en el layout (corre en la página de entrada de la sesión, sea cual sea).
2. El header debe tener el logo inline dentro de `.d-header__logo` con la misma proporción (viewBox `60 160 446 231`). `initIntro()` mide ese elemento y lleva el logo de la intro exactamente ahí (FLIP).
3. No toques los tiempos en el código: están en `tokens.json → intro` y en la constante `T` de `disa-motion.js`. Secuencia: colibrí en el centro (0–700 ms) → las letras entran desde la derecha y empujan al colibrí a la izquierda (900–1650) → eslogan (1500–1950) → el logo sube al header (2200–2950) mientras el panel blanco sube (2300–3000) → `html.is-ready` a los 2600 ms.
4. Referencia visual exacta: abrí `assets/motion/intro-sequence.html`. Tu implementación tiene que verse igual.
5. Solo la 1.ª visita de la sesión. Saltable (botón, clic, tecla, rueda o toque). Con `?nointro` o `prefers-reduced-motion` no aparece.
6. Sin parpadeos: el `<html>` arranca con la clase `js` puesta por `disa-motion.js`. Para evitar un flash del contenido, agregá en el `<head>`: `<script>document.documentElement.classList.add('js')</script>`.

## 6. Entrada de la web y animaciones por sección
- **Primer pantallazo:** usá exactamente la tabla de `design-system.md` §9.1 (`data-enter` + `--enter-delay`).
- **Resto de la página:** reveals por scroll (§7.2), una vez cada uno.

| Sección | Animación |
|---|---|
| Títulos H2 | `.d-split` (por palabra) |
| Grillas de tarjetas | `data-stagger` |
| Imágenes grandes | `data-reveal="clip"` |
| Bandas de promo | `data-reveal="wipe"` |
| Cifras | `data-count` |
| Línea de tiempo y rutas | `.d-draw` |
| Mapa | `.d-zoom-out` al entrar + lente |
| Fondos | ondas con loop lento, pausado fuera de pantalla |
| Aliados | `.d-marquee` |
| Entre secciones | máximo 2 `data-bg-shift` por página y 1 cortina ala |
| Entre páginas | View Transitions (ya en CSS) |

- **Límites:** 2 efectos de texto y 2 loops por pantalla, nada de parallax en móvil y todo cumple con reduced-motion.

## 7. Contenido y voz
Español de Uruguay con voseo. Formato es-UY (5.680 · $ 1.500 · 07:00 h). Botones con verbo y destino. **No inventar** precios, horarios, reglas, fichas técnicas, ganadores ni fechas de promos: van como `[A confirmar]` y se listan en `CONTENIDO-PENDIENTE.md` (crealo). Logos de aliados: solo archivos oficiales y, mientras tanto, `.d-partner-slot--placeholder`. Fotos: dirección de arte §14. Mientras no haya sesión de fotos, se pueden usar como provisionales las piezas propias de @disauruguay (carpeta `disa-ig`), recortadas y sin textos sobreimpresos. Nunca fotos de stock frías.

## 8. Criterios de aceptación (verificar antes de cerrar cada fase)
- [ ] Capturas a **1920, 1440, 1024, 768, 390 y 360 px**, sin scroll horizontal.
- [ ] Intro: el logo termina **pixel a pixel** sobre el logo del header (diferencia ≤ 1 px). Con reduced-motion no aparece y todo se ve.
- [ ] Lighthouse ≥ 90 en las 4 categorías, en móvil. LCP < 2,5 s, CLS < 0,1, INP < 200 ms. Peso de la home ≤ 1,2 MB.
- [ ] axe sin errores. Navegación completa por teclado, foco visible y áreas táctiles de 44 px.
- [ ] Todo el contraste según §2.4: nunca texto blanco sobre amarillo ni sobre celeste.
- [ ] Cero hex sueltos en componentes (`grep -E "#[0-9A-Fa-f]{6}" src/components` vacío, salvo SVG).
- [ ] `docs/checklist.md` completo.

## 9. Qué NO hacer
Plantillas genéricas de IA, degradados violetas, glassmorphism, íconos de librería (Lucide, Heroicons…), tipografías por defecto (Inter, Roboto), gotas negras, llamas, fondos oscuros agresivos, smooth-scroll que secuestre la rueda, carruseles automáticos en el hero, popups al entrar ni dibujar logos de terceros.
