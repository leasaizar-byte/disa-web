# CLAUDE.md — Sistema de diseño DISA Uruguay

Este paquete define la identidad web de **DISA Uruguay S.A.** (no de DigiSoft ni de otro proyecto). Antes de tocar una página leé `design-system.md`. Aplicá estas reglas sin excepción.

## Archivos
- `tokens/tokens.json` es la fuente de verdad. `tokens/tokens.css` y `tokens/tailwind.config.js` se derivan de él.
- `code/disa.css` contiene los componentes y el motion (prefijo `d-`). `code/disa-motion.js` maneja la intro de marca, la entrada de la web, reveals, contadores, rotador, header, tabs y menú (vanilla).
- `assets/logos`, `assets/icons` (sprite `sprite-bicolor.svg`), `assets/pictograms`, `assets/backgrounds` e `assets/illustrations`.
- **Para construir la web, seguí `docs/brief-web-claude-code.md`** (páginas, secciones, fases y criterios de aceptación).
- Intro de marca: `code/snippets/intro-markup.html` (markup) + `assets/motion/intro-sequence.html` (referencia visual exacta).

## Reglas imprescindibles
1. **Colores solo por token.** Nunca un hex suelto en componentes. Texto por defecto: `--color-text-default` (#0B2A55).
2. **Sobre amarillo, texto navy. Nunca blanco.** Sobre celeste #34B0E0, texto navy (blanco = 2,49:1).
3. **Tipografía:** Barlow Condensed para títulos y cifras, Barlow para texto y UI. El énfasis en títulos va con `.d-em` (itálica 800). Permanent Marker solo en stickers de campaña.
4. **Logo:** usar los SVG tal cual. A color sobre claro, navy sobre amarillo, blanco sobre azul y sobre foto con velo. Mínimo 120 px con eslogan y 72 px sin eslogan. No rotar, recolorear ni dar sombra.
5. **Logos de aliados:** solo archivos oficiales dentro de `.d-partner-slot`. Nunca dibujarlos.
6. **Animar solo `transform` y `opacity`.** Excepciones: `clip-path` en reveals, `background-color` en `data-bg-shift` y `stroke-dashoffset` en `.d-draw`.
7. **Duraciones y curvas por token** (`--duration-*`, `--ease-*`). Entradas con `--ease-energy`. Las salidas duran el 60 % y usan `--ease-exit`.
8. **Respetar `prefers-reduced-motion`** (ya cubierto en CSS y JS. No lo rompas con estilos inline).
9. **Texto completo en el HTML** siempre: el split, el rotador, el typewriter y los contadores lo preservan.
10. **Voseo** en todo texto visible. Botones con verbo en imperativo y destino. Formato es-UY: 5.680 · 19,5 · $ 1.500 · U$S 900 · 07:00 h.
11. **No inventar datos:** precios, horarios, reglas de Prevención o fichas técnicas faltantes van como `[A confirmar]`.
12. Áreas táctiles ≥ 44 px, foco visible y un `<label>` por campo.

## Qué usar y cuándo
| Necesidad | Componente / clase |
|---|---|
| Portada de página | `.d-hero` (video muteado + póster + `.d-hero__scrim` + `.d-split` + `.d-rotator` solo en home) |
| Lista de servicios | `.d-auto-grid` + `.d-card.d-service-card` + pictograma |
| Cifras | `.d-stat-band` + `.d-stat[data-count]`, en sección `.theme-night` |
| Estaciones | `.d-locator` (+ `.d-chip[aria-pressed]`, `.d-station`, `.d-pin`) |
| Promo | Plantilla §17: cifra + `.d-mark` + `.d-countdown` + `.d-steps` + `.d-modal` de bases |
| Catálogo técnico | `.d-tabs` + tarjeta de producto + `.d-table.d-tech` + `[data-type]` en un dato |
| Formularios | `.d-field` + `.d-input` + `data-state="error"` + `.d-error-msg` |
| Aliados | `.d-marquee` + `.d-partner-slot` |
| CTA de carrusel | `.d-btn-slide` («Deslizá »»» ») |

## Motion por tipo de elemento
- **Apertura del sitio:** intro de marca (§1.5): colibrí al centro → las letras lo empujan a la izquierda → el logo sube al header → `html.is-ready` y entra el primer pantallazo con `data-enter` + `--enter-delay` (§9.1). No cambies los tiempos.
- Título de sección → `.d-split` (1 por pantalla). Párrafo y CTA → `data-reveal="fade-up"`. Grilla → `data-stagger`. Imagen grande → `data-reveal="clip"`. Banda de promo → `data-reveal="wipe"`.
- Hero → zoom del video de 108 a 100 % (automático) + ala con `.d-parallax-slow`.
- Máximo 2 efectos de texto y 2 loops por pantalla. Parallax nunca en móvil ni en bloques de lectura.
- Entre páginas: View Transitions (ya en CSS). Cortina ala (`.d-curtain`) 1 vez por recorrido.

## Checklist rápido
`docs/checklist.md`. Antes de cerrar: contraste, foco, reduced-motion, 360 px sin scroll horizontal y Lighthouse ≥ 90.
