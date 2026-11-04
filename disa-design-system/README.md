# DISA Uruguay — Sistema de diseño web (v1.0, noviembre 2026)

La web la construye Claude Code siguiendo `docs/brief-web-claude-code.md` (el prompt para pegar está al principio). Para ver la intro de marca funcionando, abrí `assets/motion/intro-sequence.html`.

| Carpeta / archivo | Contenido |
|---|---|
| `design-system.md` | Documento maestro: reglas y valores |
| `CLAUDE.md` | Reglas imprescindibles para Claude Code |
| `tokens/` | `tokens.json` (fuente), `tokens.css` y `tailwind.config.js` |
| `code/` | `disa.css` (componentes + motion), `disa-motion.js` y `snippets/intro-markup.html` |
| `assets/logos/` | 19 SVG + PNG @2x, capas para la intro (`layers/`), favicon, app icons, avatar y OG |
| `assets/icons/` | 103 íconos (mono 16/20/24/32 y bicolor), sprites, hojas y `icons.json` |
| `assets/pictograms/` | 12 pictogramas de sección |
| `assets/backgrounds/` | 12 fondos SVG de 1920×1080 |
| `assets/illustrations/` | Forma ala y mapa esquemático de Uruguay |
| `assets/motion/` | `intro-sequence.html` (intro de marca) y `logo-animated.html` (reveal, loader y salida) |
| `docs/` | **Brief para Claude Code**, análisis de referencias y checklist de publicación |

Regenerar tokens CSS o Tailwind: editá `tokens/tokens.json` y aplicá los cambios en los derivados (el nombre de cada variable CSS es la ruta del token unida con guiones).
