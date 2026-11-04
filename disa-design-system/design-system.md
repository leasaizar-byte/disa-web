# DISA Uruguay — Sistema de diseño web v1.0

> Documento maestro. Orden de prioridad de las reglas: **1. Accesibilidad → 2. Legibilidad del mensaje → 3. Identidad (logo, color) → 4. Movimiento.** Si dos reglas chocan, gana la de número menor.
> Fuente de verdad de valores: `tokens/tokens.json` (se derivan `tokens.css` y `tailwind.config.js`). Este documento explica **cuándo y por qué**; los tokens dicen **cuánto**.
> Concepto rector: **«Sentí nuestra energía»**. La energía se expresa en color (amarillo + azul), en ritmo (entradas rápidas que aterrizan suave) y en una forma propia: **el ala**.

---

## 0. Origen de cada decisión

| Decisión | De dónde sale |
|---|---|
| Azul `#16478A` | Medido en el logo adjunto (píxel dominante del wordmark y el eslogan). |
| Amarillo `#FBD300` | Medido en las piezas de Instagram (02_a «Abrí la Foto»: #F8D000; 01_a «Cargá y ganá 0 km»: #FCD400). **El logo no contiene este amarillo**, lo aporta la marca en las piezas y en las estaciones. |
| Azul promo `#005CA4` | Bandas de cifras en 02_b y 04_a («Sorteamos 120 tanques gratis»). |
| Celeste `#34B0E0` | Fondos de la campaña «Estación oficial de la Celeste» (23_a–c, 27_a–f). |
| Verdes `#4CB034` / `#0E4B21` y lima `#F1E501` | Degradé del colibrí del logo. |
| Naranja `#FC6000` | Solo en la pieza co-branded Itaú/Volar (03_a, «millas x3»). Uso puntual de campaña. |
| Ángulo de marca 7° | Inclinación medida de los fustes del wordmark «DISA». |
| Forma «ala» | Esquina que se levanta en las bandas de «Abrí la Foto» (02_a) y «Visitanos en la Expo Prado» (05_a), el ala del colibrí y el alero de las estaciones (reel 07). |
| Lente amarilla | Mapas circulares de 09_b («Encontralas aquí») y 16_b (cargadores eléctricos). |
| Ruta punteada | Reel 07 (avión Montevideo → Madrid) y 01_b (estaciones adheridas). |
| CTA «Deslizá »»» » | Carruseles 01_a, 27_b–d. |
| Pasos en banderita | 25_e, 27_f («1▸ Seguí a @disauruguay»). |
| Itálica para el énfasis | Eslogan del logo «sentí nuestra energía» y titulares «Abrí la **Foto**», «Visitanos en la **Expo Prado**». |

---

## 1. Logos

Archivos en `assets/logos/` (SVG) y `assets/logos/png/` (PNG @2x, 480 px de alto).

| Versión | Archivo | Uso |
|---|---|---|
| Principal a todo color, con eslogan | `disa-logo-primary-color.svg` | Por defecto sobre blanco, crema, celeste claro (`#E3F5FC`) y azul claro (`#EEF4FB`). |
| Sin eslogan | `disa-logo-no-slogan-*.svg` | Header compacto, espacios < 120 px de ancho. |
| Horizontal con eslogan | `disa-logo-horizontal-*.svg` | Encabezados, firmas de correo y banners horizontales (relación ≈ 7,9:1). |
| Isotipo (colibrí) | `disa-logo-isotipo-*.svg` | Favicon, avatar, loader, espacios < 48 px. |
| Monocromos | `-white` (negativo), `-navy` (#0B2A55), `-black`, `-blue` (#16478A) | Ver tabla de fondos. |

**Cómo se resolvió el isotipo:** el logo sí tiene un símbolo separable, el colibrí. Se usa solo, sin redibujar.

**Vectorización:** el logo llegó como PNG de 554 px. Los SVG se obtuvieron trazando el PNG ampliado ×6, sin redibujar formas. El wordmark y el eslogan son fieles. El sombreado interno del colibrí se aproximó con dos degradados (cuerpo `#0E4B21 → #2E8A2C → #4CB034` y brillo radial `#F1E501`). **Reemplazá estos archivos por el vector oficial de DISA cuando lo tengas**: los nombres de archivo y los IDs internos (`#colibri`, `#wordmark`, `#eslogan`) se mantienen y las animaciones siguen funcionando.

### 1.1 Zona de respeto y tamaño mínimo
- **Zona de respeto** = altura de la «D» del wordmark (`x`) en los cuatro lados. En el principal a 200 px de ancho, `x` ≈ 31 px.
- **Mínimo en pantalla**: principal con eslogan, 120 px de ancho (el eslogan queda en ≈ 10 px de alto). Sin eslogan, 72 px. Isotipo, 16 px (favicon).
- **Mínimo en impresión**: principal con eslogan, 35 mm. Sin eslogan, 20 mm. Isotipo, 6 mm.

### 1.2 Logo sobre fondos (regla de contraste)
| Fondo | Versión | Motivo |
|---|---|---|
| Blanco, crema `#F7F1E6`, azul claro, celeste claro | Color | Azul sobre blanco 9,1:1. |
| Amarillo `#FBD300` | **Navy monocromo** | El verde del colibrí sobre amarillo no contrasta (≈ 2:1). |
| Azul `#16478A` / `#005CA4` / navy / noche | **Blanco** | Igual que en las piezas IG sobre azul y celeste. |
| Celeste `#34B0E0` | Blanco **solo ≥ 160 px** de ancho. Si es más chico, navy. | Blanco sobre celeste = 2,49:1. |
| Foto o video | Blanco + velo `linear-gradient(0deg, rgba(7,27,56,.78), rgba(7,27,56,0))` en el tercio del logo, o principal a color sobre placa blanca con forma de ala. | Luminancia media de la zona del logo ≤ 35 % con velo. |

### 1.3 Favicon, app y redes (`assets/logos/app/`)
`favicon.svg`, `favicon-16/32/48.png`, `app-icon-180.png` (Apple), `app-icon-192.png` y `app-icon-512.png` (colibrí sobre blanco con radio del 22 %), `app-icon-maskable-512.png` (zona segura del 56 %), `avatar-redes-1080.png` (círculo blanco con el logo sin eslogan al 62 %) y `og-image-1200x630.png`.

### 1.4 Logo animado (`assets/motion/logo-animated.html`, clases en `code/disa.css`)
| Estado | Animación | Duración | Curva |
|---|---|---|---|
| Inicial | Colibrí: opacity 0, `translate(-60px, 40px) rotate(-18deg) scale(.7)`. Wordmark: `clip-path: inset(0 100% 0 0)`. Eslogan: opacity 0, +16 px. | — | — |
| Entrada (reveal) | El colibrí vuela en arco hasta su lugar (0–720 ms). El wordmark se descubre de izquierda a derecha (360–920 ms). El eslogan sube (760–1160 ms). | **1 200 ms** en total | `--ease-energy` cubic-bezier(0.16, 1, 0.3, 1) |
| Loader | Colibrí suspendido: ±4 px en Y y ±2° (alternate). | 1 200 ms por ciclo | `--ease-camera` |
| Salida | Wordmark y eslogan: clip hacia la derecha (240 ms). Colibrí: sale arriba a la derecha `translate(80px, -60px) rotate(12deg)` (320 ms). | **320 ms** | `--ease-exit` cubic-bezier(0.7, 0, 0.84, 0) |
| Final | Logo estático completo. | — | — |

Este logo animado se usa en piezas aisladas (404, mantenimiento, cierres de video). **La apertura del sitio usa la intro de marca de §1.5**, que reemplaza al preloader.

### 1.5 Intro de marca: el logo se arma y sube al header (`assets/motion/intro-sequence.html`)
Archivos: capas del logo con el mismo viewBox (`assets/logos/layers/disa-layer-{colibri,wordmark,eslogan}-*.svg`), markup listo en `code/snippets/intro-markup.html`, estilos `.d-intro` en `disa.css`, coreografía `initIntro()` en `disa-motion.js` y tiempos en `tokens.json → intro`.

| Paso | Qué pasa | Tiempo (ms) | Curva |
|---|---|---|---|
| 1 · Colibrí | Aparece **en el centro de la pantalla** sobre blanco: opacity 0→1, escala .35 → 1,06 → 1, rotación −16° → 2° → 0°. El colibrí está desplazado `translate(32.5%, 25.3%)` del lockup, así su centro coincide con el centro de la pantalla. | 0–700 | energy |
| 2 · Las letras empujan | «DISA» entra desde la derecha (`clip-path inset(0 0 0 100%) → 0` + `translateX(8% → 0)`). **Al mismo tiempo**, el colibrí se desliza de `translate(32.5%, 25.3%)` a `0, 0`: las letras lo «corren» hacia la izquierda y arriba, hasta su posición en el logo. | 900–1650 | camera |
| 3 · Eslogan | «sentí nuestra energía» se descubre de izquierda a derecha. | 1500–1950 | energy |
| 4 · Sube al header | El logo completo viaja a la posición exacta del logo del header (técnica FLIP: medir, trasladar y escalar; origen 0 0) y se achica de 520 px a 132 px. Si el header está sobre el hero oscuro, en los últimos 350 ms cambia de color a blanco. | 2200–2950 | camera |
| 4b · Telón | El panel blanco sube (−115 %) con el borde inferior inclinado y descubre la web. | 2300–3000 | camera |
| 5 · Entra la web | `html.is-ready` dispara la entrada (ver §9.1). | desde 2600 | energy |

**Reglas:** solo en la **primera visita de la sesión** (`sessionStorage`). Total ≤ 3 000 ms. **Se puede saltar** con el botón «Saltar intro» (aparece a los 600 ms), un clic, una tecla, la rueda o un toque: todo salta a su estado final. Sin intro (visitas siguientes, `?nointro` o `prefers-reduced-motion`), la web entra directo con el paso 5. La intro lleva `aria-hidden="true"` y no contiene información: el contenido real está siempre en el HTML. Mientras corre, el logo real del header queda en opacity 0 y se muestra al terminar, en el mismo lugar exacto, sin saltos.

### 1.5 Usos incorrectos (ver lámina «Logos» en el canvas)
No deformar ni cambiar la proporción. No rotar (tampoco los 7° de marca). No recolorear el colibrí ni el wordmark. No agregar sombras, contornos ni brillos. No usarlo sobre amarillo a color. No usarlo con bajo contraste (celeste chico, fotos sin velo). No ponerlo sobre fondos saturados o con patrones. No separar el eslogan y reemplazarlo por otra tipografía.

### 1.6 Logos de aliados (Mobil, Itaú, OCA, PedidosYa, Volar, AUF)
**No se dibujan ni se imitan.** Contenedor `.d-partner-slot`: alto 48 px, logo de hasta 32 px de alto, 16 px de padding lateral, mínimo 120 px de ancho y 48 px de separación en el marquee. Versión por defecto **monocroma** (`filter: grayscale(1); opacity: .72`), que pasa a color al hover. Se usa el archivo oficial que entregue cada aliado. Separador del co-branding: línea vertical de 1,5 px al 35 % del color del logo, con 24 px a cada lado.

---

## 2. Color

### 2.1 Paleta (hex · RGB · HSL)
| Token | Hex | RGB | HSL | Rol |
|---|---|---|---|---|
| `blue-700` **Azul DISA** | `#16478A` | 22 71 138 | 215° 73 % 31 % | Marca, títulos, header sólido, botón secundario. |
| `blue-600` Azul promo | `#005CA4` | 0 92 164 | 206° 100 % 32 % | Bandas de cifras, links, foco, info. |
| `blue-900` Navy (tinta) | `#0B2A55` | 11 42 85 | 215° 77 % 19 % | **Color de texto por defecto.** Texto sobre amarillo. |
| `blue-950` Noche | `#071B38` | 7 27 56 | 216° 78 % 12 % | Secciones oscuras puntuales, footer, velos. |
| `yellow-400` **Amarillo energía** | `#FBD300` | 251 211 0 | 50° 100 % 49 % | CTA principal, fondos de promo, acentos de íconos. |
| `celeste-400` Celeste | `#34B0E0` | 52 176 224 | 197° 73 % 54 % | Campañas Selección, aviación, etiqueta «Nuevo». |
| `green-500` Verde colibrí | `#4CB034` | 76 176 52 | 108° 54 % 45 % | Agro / FERTEC (acento), éxito decorativo. |
| `green-900` Verde profundo | `#0E4B21` | 14 75 33 | 137° 69 % 17 % | Fondos de agro con texto blanco. |
| `lima-400` Lima | `#F1E501` | 241 229 1 | 57° 99 % 47 % | Solo el brillo del colibrí y destellos ≤ 2 % del área. |
| `orange-500` Naranja promo | `#FC6000` | 252 96 0 | 23° 100 % 49 % | Promos de alta urgencia o co-branding. Texto **navy**. |
| `crema-100` Crema | `#F7F1E6` | 247 241 230 | 39° 55 % 94 % | Fondo cálido de servicios y Shop. |

**Escalas completas** en `tokens.json → color.palette`. Azul: 50 `#EEF4FB`, 100 `#D9E7F6`, 200 `#B3CEEC`, 300 `#7FAEDD`, 400 `#4A88C8`, 500 `#1F6AB3`, 600 `#005CA4`, 700 `#16478A`, 800 `#11386D`, 900 `#0B2A55`, 950 `#071B38`. Amarillo: 50 `#FFFBE6`, 100 `#FFF5C2`, 200 `#FFEC8A`, 300 `#FFE04D`, 400 `#FBD300`, 500 `#E8BE00`, 600 `#C29E00`, 700 `#8F7400`, 800 `#5E4C00`. Grises fríos de 50 a 900. Estados: éxito `#1B7F3B`/`#E7F5EC`, alerta `#9A5B00`/`#FFF3D6`, error `#C62828`/`#FDECEC`, info `#005CA4`/`#EEF4FB`.

### 2.2 Proporción de uso por pantalla
Blanco y neutros 55–65 %, azul (todos) 20–25 %, amarillo 8–12 %, celeste y verdes 0–5 %, naranja 0–3 % (solo promos). Una pantalla **nunca** tiene más de dos colores de acento saturados a la vez (amarillo + uno).

### 2.3 Modo oscuro
**No hay modo oscuro global.** Hay secciones oscuras puntuales con `.theme-night` (`#071B38`) o `.theme-brand` (`#16478A`) para el hero, la banda de números, el cierre y el footer. Máximo **2 secciones oscuras seguidas** y máximo **3 por página**.

### 2.4 Accesibilidad del color (WCAG 2.2 AA, ratios calculados)
| Texto / fondo | Ratio | Permitido |
|---|---|---|
| Navy `#0B2A55` / blanco | 14,22 | Todo. |
| Navy / crema `#F7F1E6` | 12,65 | Todo. |
| Navy / amarillo `#FBD300` | 9,77 | Todo. **Regla: sobre amarillo, siempre navy.** |
| Azul `#16478A` / amarillo | 6,26 | Todo. |
| **Blanco / amarillo** | **1,46** | **Nunca.** |
| Blanco / azul `#16478A` | 9,12 | Todo. |
| Blanco / azul promo `#005CA4` | 6,85 | Todo. |
| Amarillo / azul `#16478A` | 6,26 | Todo (cifras y énfasis). |
| Amarillo / azul promo `#005CA4` | 4,70 | Todo, mejor ≥ 18 px. |
| Amarillo / noche `#071B38` | ≈ 11 | Todo. |
| Blanco / celeste `#34B0E0` | 2,49 | **Nunca para texto** (las piezas IG lo hacen; la web no). |
| Navy / celeste | 5,71 | Todo. |
| Blanco / celeste-700 `#085E82` | 7,16 | Todo (versión «celeste oscuro» para texto blanco). |
| Blanco / naranja `#FC6000` | 3,08 | Solo ≥ 24 px bold. |
| Navy / naranja | 4,61 | Todo. |
| Blanco / naranja-700 `#B34200` | 5,68 | Todo. |
| Blanco / verde-700 `#2E8A2C` | 4,39 | Solo ≥ 24 px (o ≥ 18,66 px bold). |
| Blanco / verde-900 `#0E4B21` | 10,26 | Todo. |
| Gris `#465366` / blanco | 7,81 | Texto secundario. |
| Gris `#5D6B80` / blanco | 5,41 | Captions. |
| Gris `#8593A6` / blanco | 3,12 | Solo deshabilitado o decorativo. |

Bordes de inputs: `#8593A6` (3,12:1 sobre blanco, cumple 1.4.11). Foco: doble anillo de 3 px blanco + 3 px `#005CA4`. Sobre oscuro, 3 px noche + 3 px amarillo.

---

## 3. Tipografía

| Rol | Familia | Licencia | Pesos |
|---|---|---|---|
| **Principal (display, cifras)** | **Barlow Condensed** | SIL OFL (Google Fonts) | 600, 700, 800 y 700/800 itálica |
| **Secundaria (texto, UI, datos técnicos)** | **Barlow** | SIL OFL | 400, 500, 600, 700 y 600/800 itálica |
| Acento de campaña (opcional) | Permanent Marker | Apache 2.0 | 400 |

Las tres cubren `á é í ó ú ü ñ ¡ ¿ º ª €`. Fallbacks: `'Arial Narrow', 'Roboto Condensed', sans-serif` / `'Segoe UI', Roboto, Arial, sans-serif`. Carga con `font-display: swap`, con un solo `<link>` y preconnect.

**Por qué Barlow:** las piezas IG usan una grotesca condensada y pesada para cifras y títulos («120 TANQUES GRATIS», «$1500+$590») y una humanista en itálica para los llamados («Cargá, escaneá y participá»). Barlow es una superfamilia con anchos normal y condensado, itálicas reales y cifras tabulares, con terminales levemente redondeadas que dialogan con la «a» del wordmark. No es la tipografía corporativa del Grupo DISA, que no se pudo identificar. **Si DISA tiene una fuente corporativa con licencia web, se cambia solo `font.family.*` en tokens.json.**

### 3.1 Aplicación
- **H1–H3:** Barlow Condensed 700 (H3 600), en tipo oración y nunca todo en mayúsculas, salvo cifras con etiqueta («TANQUES GRATIS»).
- **Palabra de énfasis dentro del título** (`.d-em`): misma familia en **itálica 800**, color azul sobre claro y amarillo sobre oscuro. Máximo 1 por título y hasta 3 palabras.
- **Overline** (`.d-overline`): Barlow 700, 13 px, mayúsculas, tracking 0,08 em, azul (amarillo sobre oscuro).
- **Párrafos:** Barlow 400, 17 px, interlineado 1,55, máximo 68 caracteres por línea.
- **Botones y etiquetas:** Barlow 700, 16 px (15 px sm), tracking 0,01 em, tipo oración.
- **Números y datos:** Barlow Condensed 800 con `font-variant-numeric: tabular-nums`. El «+», el «$» o el «%» van al 45 % y alineados arriba; la unidad («años», «km») al 32 %, abajo y en mayúsculas.
- **Textos técnicos** (fichas, tablas): Barlow 400/600 15 px con `.d-tech` (`tnum`, `zero`). Los grados SAE se escriben con guion: 15W-40.
- **Rotulador** (Permanent Marker): solo en stickers de campaña DISA Shop o viajes, ≥ 24 px, 1 por pantalla, nunca en body ni legales.

### 3.2 Escala fluida (360 → 1920 px)
| Token | clamp | 360 px | 1920 px | Interlineado | Tracking |
|---|---|---|---|---|---|
| display-xl | `clamp(3.5rem, 1.9rem + 6.4vw, 9rem)` | 56 | 144 | 0,92 | −0,01 em |
| display-lg | `clamp(3rem, 1.95rem + 4.2vw, 6.5rem)` | 48 | 104 | 0,92 | −0,01 em |
| h1 | `clamp(2.5rem, 1.85rem + 2.6vw, 4.5rem)` | 40 | 72 | 1,05 | −0,005 em |
| h2 | `clamp(2rem, 1.6rem + 1.6vw, 3.25rem)` | 32 | 52 | 1,05 | −0,005 em |
| h3 | `clamp(1.5rem, 1.3rem + .8vw, 2.125rem)` | 24 | 34 | 1,05 | 0 |
| h4 | `clamp(1.25rem, 1.18rem + .3vw, 1.5rem)` | 20 | 24 | 1,25 | 0 |
| lead | `clamp(1.125rem, 1.05rem + .3vw, 1.375rem)` | 18 | 22 | 1,45 | 0 |
| body / body-sm / caption | 17 / 15 / 13 px | — | — | 1,55 / 1,5 / 1,4 | 0 |
| data-xl / lg / md | 64→160 / 48→88 / 32→48 px | — | — | 0,85 | −0,02 em |

Largo de títulos: H1 hasta 60 caracteres (ideal 30–45), H2 hasta 70 y hero hasta 4 palabras + rotador.

---

## 4. Retícula, espaciado y capas

- **Referencia 16:9 (1920×1080):** márgenes laterales de 120 px, header de 88 px, zona segura de título de 1680×880 (96 px arriba, 80 px abajo). En el hero, el texto ocupa las columnas 1–7 de 12 y la forma ala las 9–12.
- **Breakpoints:** xs 360, sm 600, md 768, lg 1024, xl 1280, 2xl 1536, 3xl 1920.
- **Columnas:** 4 hasta 767 px (gutter 16, margen 16), 8 de 768 a 1023 px (gutter 20, margen 32) y 12 desde 1024 px (gutter 24, margen fluido 48 → 120). `--space-margin: clamp(16px, -4px + 5.2vw, 120px)`.
- **Anchos máximos:** contenido 1440 px, ancho 1680 px, texto 68 ch.
- **Espaciado (base 4):** 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160. Separación entre secciones `clamp(64px, 40px + 6vw, 160px)`.
- **Radios:** xs 4 · sm 8 · md 12 (inputs) · lg 16 · xl 24 (tarjetas) · 2xl 32 (modales y promos) · 3xl 48 · pill 999 (botones y chips).
- **Bordes:** 1 px (separadores), 1,5 px (inputs y tarjetas), 2 px (outline), 3 px (foco).
- **Sombras (teñidas de navy):** 1 reposo, 2 hover y header, 3 dropdown y tarjeta activa, 4 modal y toast, y `sticker` (`0 6px 0 rgba(11,42,85,.18)`, sombra dura de calcomanía).
- **Capas (z-index):** base 0 · raised 10 · sticky 100 · header 200 · dropdown 300 · overlay 400 · drawer 450 · modal 500 · toast 600 · transition 800 · preloader 900.

## 5. Firma visual: el **ala**
Un rectángulo redondeado (radio 24 px) cuya **esquina superior derecha se levanta en una punta curva**. Se usa en tres tamaños, definidos en tokens (`ala-tip-w/h`): sm 40×12, md 72×20 y lg 140×40 px. Clases `.d-ala`, `.d-ala--sm`, `.d-ala--lg`, `.d-ala--energy` y `.d-ala--promo`. SVG en `assets/illustrations/shape-ala.svg`.

Se aplica en: bandas de cifras de promo, el bloque amarillo del hero, placas de pictogramas, la tarjeta de servicio (la punta aparece al hover) y la cortina de transición. Los complementos son el **ángulo de 7°** (barridos, stickers a −3,5°, marcador), la **ruta punteada** (`stroke-dasharray: 2 14`, caps redondos), la **lente amarilla** (anillo de 8 px) y el **chevron triple «»»»**.

Máximo **2 alas visibles por pantalla**.

---

## 6. Iconografía (`assets/icons/`)
- **103 íconos** en cuadrícula de 24 px, con 2 px de padding, trazo de **1,75 px** (2,25 a 16 px, 2 a 20 px y 1,5 a 32 px, en `mono/16|20|32/`), terminaciones y uniones redondeadas, y radio de 1,5–2 px en esquinas.
- **Rasgo de marca, la «chispa»:** cada ícono tiene un elemento acento (`class="icon-accent"`). En mono queda como trazo. En **bicolor** se rellena de amarillo `#FBD300` con trazo azul `#16478A`.
- **Uso:** sprite inline (`sprite-bicolor.svg`) + `<svg class="d-icon"><use href="#icon-surtidor"/></svg>`. Agregá `.d-icon--bi` para la variante bicolor. También hay archivos sueltos en `mono/` y `bicolor/` con nombres `icon-<nombre>.svg`. Índice en `icons.json` y hojas en `icons-sheet-*.svg`.
- **Estados:** normal en `currentColor`. Hover: color `#005CA4` y acento amarillo, 180 ms. Activo: navy y `scale(.94)`, 80 ms. Deshabilitado: `#8593A6` sin acento.
- **Micro-animación:** al hover, el acento hace `translateY(-1px)` en 180 ms con `--ease-spring`. La entrada es `scale(.8)→1` + opacity, 360 ms, con `--ease-energy` y stagger de 40 ms.
- **Pictogramas** (`assets/pictograms/picto-*.svg`, 96 px, se usan de 64 a 128): estaciones, disa-shop, combustibles, lubricantes, centro-tecnico, agro, aviacion, marino, flotas, prevencion, promociones y contacto. Cada uno lleva una placa ala azul claro, un trazo de 3 px, relleno amarillo y el destello «+».
- Los íconos de Facebook, Instagram y YouTube son glifos genéricos en el estilo del set. Si una red exige su logo oficial, se usa el oficial.

## 7. Motion

**Stack:** CSS (transiciones, keyframes, `animation-timeline` donde haya soporte) + `disa-motion.js` (IntersectionObserver + WAAPI, 6 KB, sin dependencias). **GSAP + ScrollTrigger (≈ 45 KB)** solo si una página necesita una secuencia fijada con más de 3 pasos sincronizados. Se carga solo en esa página. **Lottie** únicamente para animaciones ilustradas producidas por el equipo de motion (por ejemplo, el colibrí con aleteo real) y con un peso máximo de 80 KB.

**Solo se animan `transform` y `opacity`.** Excepciones justificadas: `clip-path` en reveals de máscara (se compone en GPU), `background-color` en el cambio de fondo de sección (una sola propiedad, 720 ms) y `stroke-dashoffset` en la ruta que se dibuja.

### 7.1 Tokens
| Duraciones | ms | | Curvas | cubic-bezier |
|---|---|---|---|---|
| instant | 80 | | **energy** (entradas) | 0.16, 1, 0.3, 1 |
| xs | 120 | | **exit** (salidas) | 0.7, 0, 0.84, 0 |
| sm | 180 | | standard (UI) | 0.2, 0, 0, 1 |
| md | 240 | | camera (zoom, cortinas, loops) | 0.65, 0, 0.35, 1 |
| lg | 360 | | spring (press, sticker) | 0.34, 1.56, 0.64, 1 |
| xl | 520 | | linear (marquee, loops de trazo) | linear |
| 2xl | 720 | | | |
| 3xl | 1000 | | | |
| logo | 1200 | | | |
| counter | 1600 | | | |

Distancias: xs 8 · sm 16 · md 24 · lg 48 · xl 96 px. Stagger: letra 18 · palabra 60 · línea 90 · ítem 80 · tarjeta 100 ms (máximo 8 escalones). Escala: press .97 · hover 1.02 · enter .96.

**Regla de salidas:** duración = **60 %** de la entrada (`--exit-ratio`), curva `exit` y distancia = **50 %** de la de entrada. Mínimo 120 ms.

### 7.2 Entradas (`data-reveal`, disparo al entrar en el viewport al 20 %, una sola vez)
| Nombre | Propiedades | Duración · retraso | Curva | Desplazamiento |
|---|---|---|---|---|
| `fade-up` | opacity, translateY | 520 ms · 0 | energy | 24 px |
| `fade-left` | opacity, translateX | 520 ms | energy | −48 px |
| `mask` | clip-path inset derecha → 0 | 720 ms | camera | 100 % |
| `scale` | opacity, scale | 520 ms | energy | .96 → 1 |
| `wipe` (barrido de color) | panel amarillo scaleX 1 → 0 (origen derecha) | 720 ms | camera | 100 % |
| `clip` (imágenes) | clip-path inset 12 % → 0, radio 32 → 24 | 720 ms | camera | 12 % |
| `data-stagger` (cascada) | hijos fade-up | 520 ms + i×80 ms | energy | 24 px |

### 7.3 Permanencia
- `.d-float`: ±6 px en Y y ±1°, 6 000 ms alternate, con curva camera.
- `.d-shine`: brillo diagonal a 7° cada 8 000 ms (recorre el 30 % final del ciclo).
- `.d-energy-line`: trazo punteado que avanza 64 px cada 2 400 ms, en linear.
- Colibrí suspendido en el loader: 1 200 ms.

Todos los loops se **pausan fuera de pantalla** (`.is-paused`), al hover del marquee y con reduced-motion. Máximo **2 loops visibles a la vez**.

### 7.4 Micro-interacciones
| Elemento | Hover | Presión | Otros |
|---|---|---|---|
| Botón | −2 px Y + sombra 2 + barrido diagonal 7° (360 ms, energy) | scale .97, 80 ms | Carga: spinner de 20 px, texto oculto con `aria-busy`. |
| Tarjeta | −4 px Y + sombra 3, imagen scale 1.05 (720 ms) | — | La punta del ala baja (360 ms). |
| Link | Subrayado de 0 a 100 %, 240 ms | — | La flecha se mueve +4 px. |
| Input | Borde azul, 180 ms | — | Foco: halo de 4 px `rgba(0,92,164,.18)`. Error: shake ±4 px en 320 ms, una sola vez. |
| Switch y check | — | — | Spring 240 ms y check que escala de 0 a 1. |
| Acordeón | — | — | El «+» rota 45° y su fondo pasa a amarillo (240 ms). El cuerpo hace fade-up de 16 px en 360 ms. |
| Tabs | — | — | Pastilla amarilla en la activa y panel con fade-up de 360 ms. Navegación con flechas. |
| Menú móvil | — | — | Revelado circular desde el botón, 720 ms al abrir y 520 ms al cerrar. Ítems en cascada de 60 ms a partir de los 240 ms. |
| Tooltip | — | — | Aparece a los 300 ms, con 180 ms de fade + 4 px. |
| Dropdown | — | — | Entrada de 240 ms, energy, −8 px. Salida de 180 ms con curva exit. |

### 7.5 Motion graphics de marca
1. **Intro de marca** (§1.5): colibrí al centro → las letras lo empujan → el logo sube al header. **Vuelo del colibrí** en 404 y mantenimiento.
2. **Ruta que se dibuja** (`.d-draw`, 1 600 ms, camera), sacada del reel 07. Se usa en localizador, millas, viajes y línea de tiempo.
3. **Lente amarilla** que hace zoom sobre el mapa (09_b, 16_b), en el localizador y en «usar mi ubicación».
4. **Ala que sube** (cortina y tarjetas).
5. **Chevrons «»»»** que laten en secuencia (1 200 ms, 120 ms de desfase) en el CTA de carrusel.
6. **Sticker que cae** con spring (precios y «x3»).

### 7.6 Rendimiento y accesibilidad
Objetivo de 60 fps: nada anima `top`, `left`, `width`, `height` ni sombras grandes en scroll. `will-change` solo en el hero. Nada parpadea más de 3 veces por segundo. Con `prefers-reduced-motion: reduce` las duraciones y distancias pasan a 0, el parallax, el zoom y el marquee se apagan, el rotador muestra solo la primera palabra y el preloader no aparece. El contenido se entiende sin movimiento: todo el texto está en el HTML.

## 8. Texto en movimiento
| Estilo | Clase | Tipografía | Duración · stagger | Curva | Límite |
|---|---|---|---|---|---|
| T1 Titular por palabra con máscara | `.d-split` | Display/H1–H2 | 720 ms · 60 ms/palabra | energy | 1 por pantalla, ≤ 8 palabras (≈ 1,1 s total) |
| T2 Énfasis con marcador amarillo | `.d-mark` | La del título | 520 ms, retraso de 400 ms | energy | 1 por pantalla. Sobre oscuro, marcador al 40 % |
| T2b Subrayado | `.d-underline` | — | 520 ms, retraso de 300 ms | energy | En textos de párrafo |
| T3 Rotación de palabras | `.d-rotator` | Barlow Condensed itálica, amarillo | entra 520 ms / sale 240 ms, cada 2 400 ms | energy / exit | Solo hero. 3–5 palabras del mismo largo ±3 letras |
| T4 Máquina de escribir | `[data-type]` | Barlow tabular | 28 ms por carácter, cursor de 900 ms (3 parpadeos) | steps | **Solo datos técnicos** (ASTM, 15W-40, ppm). ≤ 40 caracteres |
| T5 Frase fijada con scroll | `.d-sticky-phrase` | Display | cambio de 360–520 ms | energy | 1 por página. 70 svh por frase. 2–4 frases |
| T6 Cinta continua | `.d-marquee` | Logos o display itálica | 40 s por vuelta, linear | — | 1 por página. Pausa al hover y fuera de pantalla |
| T7 Texto sobre imagen o video | `.d-scrim` | — | — | — | Velo navy de .78 → 0. Contraste ≥ 4,5:1 en la zona del texto |
| T8 Etiqueta flotante | `.d-float-tag` / `.d-sticker` | Condensed 800 itálica | pop de 520 ms + float de 6 s | spring | 1 por tarjeta, rotada −3,5° |

**Regla de oro:** el mensaje se lee completo en ≈ 1 s. Máximo **2 efectos de texto por pantalla**. El HTML contiene el texto completo: `.d-split` deja la frase en `aria-label` y oculta los fragmentos con `aria-hidden`.

## 9. Transiciones
| Nivel | Nombre | Cuándo | Duración · curva | Entra / sale | Máx. por página |
|---|---|---|---|---|---|
| Sección | **S1 Cambio de fondo** (`data-bg-shift`) | Paso de una sección clara a una de color de la misma narrativa | 720 ms, standard | El body cambia de color al 50 % de visibilidad | 2 |
| Sección | **S2 Cortina ala** (`.d-curtain`) | Entrada a una campaña o promo destacada | Cubre en 520 ms y destapa en 520 ms, camera | Panel amarillo a 7° | 1 |
| Sección | **S3 Deslizamiento** | Carruseles y pasos | 520 ms, energy | ±48 px | — |
| Sección | **S4 Zoom hacia la escena** (`.d-zoom-in`) | Acercarse a una estación o producto | Ligado al scroll, 100 → 115 % | — | 1 |
| Sección | **S5 Sección fijada** (`.d-sticky-phrase`) | Contar 2–4 ideas | 70 svh por paso | — | 1 |
| Página | **P1 Fade con desplazamiento** (View Transitions API) | Navegación general | Sale en 312 ms (exit, −12 px) y entra en 520 ms (energy, +24 px) | El header persiste (`site-header`) | siempre |
| Página | **P2 Cortina con ala + colibrí** | Home → campaña | 520 + 520 ms | — | 1 por recorrido |
| Página | **P3 Elemento compartido** | Tarjeta de promo → detalle | 520 ms, camera | `view-transition-name: promo-<id>` en ambas páginas | — |
| Página | **Intro de marca** (§1.5) | Primera visita de la sesión | ≤ 3 000 ms, saltable | El logo se arma y sube al header; el panel blanco sube y entra la web | 1 |
| UI | Modal | Bases y condiciones, galería | Entra en 360 ms (energy, +24 px, .98) y sale en 240 ms (exit) | Backdrop con fade y blur de 4 px | — |
| UI | Panel lateral | Filtros del localizador (en móvil, hoja inferior) | Entra en 520 ms (energy) y sale en 240 ms (exit) | — | — |
| UI | Menú | Móvil | Revelado circular de 720 ms al abrir y 520 ms al cerrar | — | — |
| UI | Tabs y carrusel | — | 360 ms de fade-up / scroll-snap nativo | — | — |

**Combinaciones prohibidas:** S2 + P2 en el mismo recorrido, S4 + parallax en la misma sección y más de una transición con cortina por página. Todas se emparientan con los reels: fundido a blanco con el logo (07, 14), barrido orgánico (07, nubes → aquí el ala) y push-in de cámara (07, 26).

### 9.1 Entrada de la web después de la intro (`data-enter`)
Todo lo que está en el primer pantallazo entra en cascada cuando `html` recibe `is-ready`. Cada elemento declara `data-enter="up|down|fade|rise|zoom|words"` y su retraso con `--enter-delay`, contado desde `is-ready`:

| Orden | Elemento | `data-enter` | `--enter-delay` | Duración · curva |
|---|---|---|---|---|
| 1 | Imagen o video del hero: zoom out 116 % → 108 % | `zoom` | 0 ms | 2 400 ms · camera |
| 2 | Velo del hero | `fade` | 0 ms | 520 ms · energy |
| 3 | Ítems del menú, en cascada de 50 ms | `data-enter-stagger` en la `<ul>` | 100 ms | 360 ms · energy, −8 px |
| 4 | Overline | `up` | 150 ms | 520 ms · energy, 24 px |
| 5 | Ala amarilla del hero, sube desde abajo | `rise` (en un envoltorio con `overflow:hidden`) | 200 ms | 900 ms · energy |
| 6 | Titular por palabras con máscara | `words` + `.d-split` | 250 ms | 720 ms · 60 ms por palabra |
| 7 | Bajada | `up` | 550 ms | 520 ms |
| 8 | CTAs, en cascada de 50 ms | `data-enter-stagger` | 700 ms | 360 ms |
| 9 | Rotador de palabras | — | arranca 1 000 ms después | cada 2 400 ms |
| 10 | Indicador «Deslizá» | `fade` | 900 ms | 520 ms |

Debajo del primer pantallazo, cada sección sigue usando los reveals por scroll (§7.2), una sola vez. **Más animaciones por sección** (todas ya en `disa.css`): títulos con `.d-split`, grillas con `data-stagger`, imágenes con `data-reveal="clip"`, bandas de promo con `data-reveal="wipe"`, cifras con contador, rutas punteadas con `.d-draw`, mapa con zoom de la lente, tarjetas con la punta del ala al hover y la cinta de aliados. Límite: 2 efectos de texto por pantalla.

## 10. Scroll, parallax y zoom
- **Zoom in:** para acercarse a un dato, una estación o un producto. Escala de **100 % a 115 %** ligada al scroll (`animation-range: entry 0% exit 40%`). Sin scroll-timeline, 1 000 ms con camera al entrar. Máximo 135 %.
- **Zoom out:** para revelar contexto (mapa de la red) o cerrar una sección. **125 % → 100 %** (`entry 10% cover 50%`). Hero: el video empieza al 108 % y llega al 100 % en un alto de pantalla de scroll.
- **Parallax:** como máximo 2 capas. Capa de fondo −10 % → +10 % de su alto (`.d-parallax-slow`) y capa decorativa +8 % → −8 % (`.d-parallax-fast`). **Nunca** en bloques de lectura, formularios, tablas ni en pantallas < 768 px.
- **Scroll:** nativo, sin secuestrar la rueda (nada de smooth-scroll por JS). `scroll-behavior: smooth` solo para anclas. Secciones fijadas de 70 svh por paso, hasta 4 pasos. La barra de progreso de 3 px amarilla se muestra solo en páginas de lectura larga.
- **Límites antimareo:** desplazamiento máximo de 96 px por segundo de animación, rotación máxima de 3° en loops y de 18° en entradas puntuales, y escala máxima de 1,35. Con reduced-motion no hay zoom ni parallax.
- **Hero 16:9:** video o foto a pantalla completa (mín. 640 px y máx. 1080 px), velo izquierdo navy (.86 → 0 al 75 %), texto en las columnas 1–7, ala amarilla abajo a la derecha (30 vw × 9 vw) con parallax lento y CTA doble. **En móvil** el texto ocupa las 4 columnas, el velo pasa a vertical, el video se reemplaza por el póster cuando hay `Save-Data` o la conexión es 2g/3g y la ala baja a 120×72 px.

## 11. Fondos (`assets/backgrounds/bg-*.svg`, 1920×1080, `slice`)
| Variante | Colores | Lleva | Texto encima |
|---|---|---|---|
| hero | Degradé `#16478A → #0B2A55` + grano al 6 % | Ondas celestes al 22 %, ala amarilla y ruta punteada blanca | Blanco o amarillo |
| servicios | Crema `#F7F1E6` | Ala amarillo-300 en la esquina y ruta azul al 35 % | Navy |
| mapa | Azul `#16478A` + cuadrícula blanca al 5 % | Silueta esquemática de Uruguay `#005CA4` y lente amarilla en Montevideo | Blanco |
| promociones | Amarillo `#FBD300` | Ala amarillo-300 y confeti azul y blanco | **Navy** |
| lubricantes | Azul-50 | Hexágonos (moléculas) azul-300 al 35 %, gota en línea y onda | Navy |
| agro | Verde-100 `#E6F4DF` | Surcos y hojas verde y lima | Navy o verde-900 |
| aviacion | Degradé `#005CA4 → #7FD0F0` | Nubes y ruta de vuelo (reel 07) | Blanco arriba, navy abajo |
| marino | `#11386D` | Ondas celestes en capas | Blanco |
| prevencion | Blanco + franja azul-50 | Cuadrícula de 12 casillas (las 12 reglas) | Navy |
| numeros | Navy `#0B2A55` | Ondas azul-500 y ala azul | Amarillo para cifras, blanco para etiquetas |
| contacto | Celeste-100 | Ruta punteada hacia un destino amarillo | Navy |
| footer | Noche `#071B38` | Franja amarilla de 6 px y ondas | Blanco o azul-200 |

**Versión animada:** las ondas desplazan su `transform` ±24 px en 8 s (alternate), la ruta usa `.d-energy-line` y las hojas usan `.d-float`. **Versión estática:** el mismo SVG sin animación, para reduced-motion, `Save-Data` y equipos con `deviceMemory ≤ 2`. **Con foto:** la foto va en una tarjeta `.d-media-ala` o con `.d-scrim`, nunca encima de un patrón.

## 12. Números y datos
- **Formato uruguayo:** punto de miles (5.680) y coma decimal (19,5). Moneda `$ 1.500` (pesos) y `U$S 900`, con espacio fino. Fechas: «15 de octubre» en texto o `15/10/2026`. Horarios en 24 h: «07:00 a 23:00 h». Teléfonos: `2200 9920` (fijo) y `099 123 456` (celular). Formato en JS: `Intl.NumberFormat('es-UY')`.
- **Jerarquía:** la cifra al 300–400 % del tamaño de su etiqueta, en Barlow Condensed 800 con color azul (amarillo sobre oscuro). La etiqueta va en Barlow 600 gris, de hasta 22 caracteres por línea.
- **Prefijos y unidades:** «+» y «$» al 45 %, arriba. La unidad al 32 %, abajo y en mayúsculas («90 AÑOS», «0 KM»). «x3»: la «x» en la misma línea, en itálica, con la etiqueta («millas») encima al 20 %.
- **Contadores:** 1 600 ms, easeOutExpo. Se disparan al 20 % de visibilidad, **una sola vez** (no se repiten al volver) y muestran la cifra final con reduced-motion. El HTML siempre contiene la cifra final.
- **Barras de progreso:** 10 px, `scaleX` 1 600 ms con curva energy. **Gráficos** de línea y barras: azul-700 para el dato principal, amarillo para el destacado y gris-300 para la comparación. Sin 3D, sin degradés y con etiquetas directas.
- **Tablas técnicas:** cifras alineadas a la derecha con `tnum`, unidades en el encabezado y fila al hover en azul-50. En móvil, scroll horizontal dentro de la caja.
- **Precios por litro:** `$ 00,00 /L` con `.d-price`. **La web actual no publica precios. No inventarlos.**
- **Muestra a confirmar:** 93 estaciones, +90 años, 12 reglas, 5.680 muestras (2023) y Mobil desde 2024.

## 13. Componentes (todos en `code/disa.css`; la web la construye Claude Code siguiendo `docs/brief-web-claude-code.md`)
Cada componente cubre los estados normal, hover, foco (`:focus-visible` con anillo doble), activo, deshabilitado, carga (`aria-busy`) y error (`data-state="error"`).

- **Navegación:** `.d-header` (transparente sobre el hero, `data-state="solid"` a partir de 80 px de scroll, se oculta al bajar después de 640 px y vuelve al subir; 88 → 64 px), `.d-nav` + `.d-dropdown`, `.d-menu-toggle` + `.d-mobile-menu`, `.d-breadcrumb`, `.d-site-switch` («Ir al sitio de España») y `.d-footer`.
- **Secciones:** `.d-hero`, `.d-service-card`, `.d-stat-band`, línea de tiempo (ruta punteada + hitos `.d-stat`) y `.d-marquee` de aliados.
- **Localizador:** `.d-locator`, `.d-search`, `.d-chip[aria-pressed]` (filtros por combustible: Super 95, Premium 97, Gas Oil 50 S, Gas Oil 10 S; por servicio: DISA Shop, café, lavadero, aire y agua, baños, cajero, wifi, carga eléctrica, delivery), `.d-station` (dirección, ciudad, estado abierta/cerrada, horario, servicios con íconos y CTA «Cómo llegar»), `.d-pin`, `.d-pin-cluster`, estado vacío y «Usar mi ubicación» (si se deniega, mostrar el aviso de §16).
- **Promociones:** `.d-promo-card` (`data-state="expired"`), `.d-tag--new`, `.d-tag--limited`, `.d-countdown`, `.d-modal` de bases, `.d-steps` (banderitas) y canje de millas y metros (tarjeta + pasos + CTA al socio).
- **Lubricantes:** `.d-tabs` por categoría, tarjeta de producto (grado SAE, uso, «Ficha técnica (PDF)», «Hoja de seguridad») y CTA al portal de clientes `sistlabclientes.disagrupo.com.uy`.
- **Contacto:** `.d-field`, `.d-input`, `.d-select`, `.d-textarea`, `.d-check`, `.d-switch`, mensajes `.d-error-msg` y tarjetas de sede.
- **Prevención:** las 12 reglas en tarjetas numeradas con cascada y acordeón de política y certificaciones.
- **Generales:** `.d-btn` (primary, secondary, outline, ghost; sm, lg, icon), `.d-btn-slide`, `.d-link`, `.d-tag`, `.d-chip`, `.d-tabs`, `.d-accordion`, `.d-table`, `.d-tooltip`, `.d-alert`, `.d-toast`, `.d-modal`, `.d-drawer`, `.d-pagination`, `.d-carousel`, `.d-video`, `.d-cookie`, `.d-skeleton`, `.d-empty` y `.d-spinner`.
- **404:** colibrí con el loop de vuelo, «Esta ruta no lleva a ningún lado» y botones «Volver al inicio» y «Encontrá tu estación».
- **Mantenimiento:** «Estamos cargando energía. Volvemos en breve.» Fondo hero estático y sin contadores.

## 14. Fotografía y video
- **Dirección de arte:** personas reales en estaciones DISA reales, de día o en hora dorada, en planos medios con interacción (cargar, pagar, sonreír). La Escuelita y la Selección van con color natural. Proporciones 16:9 (hero), 4:3 (tarjetas), 4:5 (redes) y 1:1 (avatares).
- **Tratamiento:** saturación natural, blancos neutros y cielos azules sin virar. **Nada de** filtros fríos, desaturación industrial, stock genérico, gotas negras de petróleo, llamas ni fondos oscuros agresivos.
- **Texto sobre imagen:** siempre con `.d-scrim` o en una placa ala. El texto va en el tercio con menos detalle.
- **Video:** muteado por defecto, con `playsinline`, en loops de 2–8 s sin cortes bruscos, con póster obligatorio. Los videos con audio requieren un control visible y **subtítulos** (como los reels). Con reduced-motion o `Save-Data` se muestra solo el póster.
- **Formatos:** AVIF, luego WebP y JPG como fallback, con `srcset` (480, 768, 1200, 1600, 2400 w) y `sizes`. Carga diferida (`loading="lazy"`) salvo el hero, que lleva `fetchpriority="high"`.

## 15. Voz y contenido
- Español rioplatense con **voseo** («Encontrá», «Cargá y ganá», «Escaneá»). Frases cortas, de 8 a 14 palabras, en positivo y sin signos de exclamación dobles. En lubricantes, aviación, marino y agro el tono es técnico y preciso: cifras con unidad, normas citadas (ASTM, UNIT) y sin adjetivos vacíos.
- **Botones:** verbo en imperativo y destino. «Encontrá tu estación», «Ver bases y condiciones», «Descargar ficha técnica (PDF)», «Usar mi ubicación». Nunca «Click aquí» ni «Más info».
- **Errores:** decir qué pasó y cómo seguir, sin culpar. «Revisá el correo: falta el dominio (ej.: nombre@correo.com).» «No pudimos cargar las estaciones. Probá de nuevo en unos segundos.»
- **Mayúsculas:** tipo oración en títulos y botones. MAYÚSCULAS solo en overlines y en etiquetas de cifras.
- Siempre «DISA» en mayúsculas, «DISA Shop» y «FERTEC». Mobil, Itaú, OCA y PedidosYa como los escribe cada marca.
- El sitio actual dice «en DISA, nuestra seguridad **eres tú**» (tuteo heredado de España). En esta propuesta se cambia a «**sos vos**» para unificar el voseo. **Confirmalo con DISA.**

## 16. Casos límite
| Caso | Respuesta |
|---|---|
| Sin resultados en el localizador | `.d-empty` con el pictograma de estaciones: «No encontramos estaciones con esos filtros», y botón «Quitar filtros». |
| Error de red | `.d-alert--error` + «Reintentar». Se conservan los datos ya cargados. |
| Carga lenta (> 400 ms) | Skeletons con la forma final. Nunca un spinner de página completa. |
| Ubicación denegada | «Para ver las estaciones cercanas, permití la ubicación o buscá por ciudad.» + foco en el buscador. |
| Promoción vencida | `data-state="expired"`, etiqueta «Finalizada», en gris. Se mantiene online con «Ver ganadores» si corresponde. |
| JavaScript desactivado | Todo el contenido visible y estático. Los formularios funcionan con POST. |

## 17. Plantilla de promoción reutilizable
Estructura fija: **overline** (socio o tipo) → **cifra protagonista** (`x3`, `120`, `0 KM`) → **título con énfasis** → **fechas** («Del 15 de octubre al 15 de diciembre») → **mecánica en 3–4 pasos** (`.d-steps`) → **CTA principal** + «Ver bases y condiciones» → **logos de aliados** (slots) → **legal** de 13 px.

Variables: color de fondo (amarillo por defecto; celeste en campañas de la Selección con texto navy; naranja solo en co-branding), foto o ilustración y cifra. **No varían:** tipografías, ala, botones ni orden.

## 18. Redes sociales (un solo sistema)
- **Feed 4:5 (1080×1350):** margen de 64 px, logo arriba a la derecha (≥ 160 px de ancho) y la misma escala (display = 120–180 px).
- **Carrusel:** la primera lámina con la cifra o el gancho y «Deslizá »»» ». La última con el CTA.
- **Reels e historias (1080×1920):** zona segura de 250 px arriba y 340 px abajo. Subtítulos palabra por palabra en Barlow 700 de 54 px, blancos con sombra o amarillos sobre oscuro. Cierre con el logo animado (1 200 ms) sobre blanco durante 2–3 s, igual que los reels 07 y 14.
- **Transiciones de reels:** las mismas del sitio (barrido ala, push-in al 115 %, fundido a blanco).

## 19. SEO técnico
Open Graph y Twitter Card con `og-image-1200x630.png` y `og:locale es_UY`. Favicon SVG + PNG + apple-touch. Datos estructurados: `Organization` y `GasStation` por estación (`name`, `address`, `geo`, `openingHoursSpecification`, `amenityFeature`). Un H1 por página, URLs en kebab-case y `hreflang` hacia `disagrupo.es` solo si hay páginas equivalentes.

## 20. Legales
Espacios reservados: términos y condiciones, política de privacidad (hoy ambos apuntan al mismo PDF: separarlos), bases de cada promoción (modal + PDF), Canal de Denuncia, aviso de cookies y crédito de marcas de terceros («Mobil es marca registrada de Exxon Mobil Corporation» u otro texto que indique el aliado).

## 21. Rendimiento y accesibilidad
- **Presupuesto por página:** ≤ 1,2 MB en la primera carga (hero video ≤ 900 KB), JS propio ≤ 30 KB, CSS ≤ 60 KB, 3 familias tipográficas y ≤ 6 archivos de fuente. LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- **WCAG 2.2 AA:** foco visible, orden lógico, *skip link*, áreas táctiles ≥ 44×44 px, textos alternativos (decorativos con `alt=""`), formularios con `<label>`, errores con `aria-describedby` y `aria-invalid`, y `lang="es-UY"`.

---
Ver `CLAUDE.md` (reglas imprescindibles para Claude Code) y `docs/checklist.md` (revisión antes de publicar).
