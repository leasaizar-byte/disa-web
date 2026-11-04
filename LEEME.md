# DISA Uruguay · sitio web (noviembre 2026)

Sitio corporativo de DISA Uruguay, construido desde cero con el sistema de diseño de la marca (`disa-design-system/`) y con el contenido relevado de https://www.disagrupo.com.uy el **4 de noviembre de 2026**.

---

## 1. Cómo verlo

**Opción rápida:** abrí `sitio/index.html` con doble clic. Se ve casi todo. El video y el localizador oficial necesitan un servidor, porque YouTube y el mapa del Grupo DISA no cargan desde un archivo local.

**Opción completa (recomendada):** en la Terminal, desde esta carpeta:

```bash
cd sitio
python3 -m http.server 8765
```

Después abrí http://localhost:8765 en Chrome.

- La **intro de marca** solo aparece en la primera visita de cada sesión. Para verla de nuevo, cerrá la pestaña y abrí una nueva. Para saltearla, agregá `?nointro` a la dirección.
- Para ver el **estado de error del formulario**, abrí `contacto.html?demo=error`.
- La **404** usa rutas desde la raíz del dominio (así funciona en cualquier dirección rota del servidor): abierta con doble clic se ve sin estilos; con el servidor, en http://localhost:8765/404.html, se ve bien.

## 2. Qué hay en cada carpeta

```
disa web/
├── disa-design-system/    Sistema de diseño (no se toca: es la fuente de verdad de la marca)
├── fuente/                TODO lo editable
│   ├── layout.html        Estructura común (head, metadatos, scripts)
│   ├── parciales/         Header, footer, intro de marca, modal de video, ondas del fondo, mapa
│   ├── paginas/           El contenido de cada página
│   ├── datos/             promociones.json y lubricantes.json (de acá salen las promos y el catálogo)
│   ├── css/site.css       Estilos propios del sitio (solo usa tokens del DS)
│   ├── js/site.js         Video, formulario, menú, localizador y rescates
│   ├── js/disa-motion.js  Motor de animación del DS con un parche documentado (ver §6)
│   ├── img-original/      Fotos originales (las del sitio actual de DISA)
│   └── docs/              PDF de bases de promociones (extraídos del sitio actual)
├── build.py               Arma el sitio: python3 build.py
├── sitio/                 EL SITIO PARA PUBLICAR (se genera solo; no lo edites a mano)
├── LEEME.md               Este archivo
└── CONTENIDO-PENDIENTE.md Lo que falta para publicar
```

## 3. Cómo editar

1. Cambiá lo que necesites en `fuente/` (un texto en `fuente/paginas/`, una promo en `fuente/datos/promociones.json`, un producto en `fuente/datos/lubricantes.json`).
2. Corré `python3 build.py`. Rearma las páginas en `sitio/`, optimiza solo las fotos nuevas y cambia la versión de los archivos (el `?v=` que obliga al navegador a bajar lo nuevo).

**Ejemplos frecuentes**

| Quiero… | Dónde |
|---|---|
| Agregar o terminar una promoción | `fuente/datos/promociones.json`: `"estado"` puede ser `vigente`, `permanente` o `finalizada`. Se genera su página `promo-<slug>.html`. |
| Cambiar una foto | Reemplazá el archivo en `fuente/img-original/` con el mismo nombre (mínimo 1600 px de ancho) y corré el build. |
| Conectar el formulario | En `fuente/paginas/contacto.html`, poné la URL del servicio en `data-endpoint="…"` del `<form>`. Recibe JSON con nombre, correo, teléfono, motivo, mensaje y el correo de destino según el motivo. |
| Cambiar el número de estaciones | Buscá «93» en `fuente/` (hero, cifras, mapa, footer). |

Etiquetas cortas que entiende el build: `<x-img src="nombre-de-foto" alt="…" sizes="…">` (genera `<picture>` con AVIF y JPG, más `width` y `height`), `<x-icon name="surtidor" bi>` (ícono del DS), `<x-picto name="estaciones">` (pictograma) y `<x-logo variant="white">`.

## 4. Páginas

| Página | Archivo | Qué tiene |
|---|---|---|
| Inicio | `index.html` | Hero con collage, video institucional, cifras, productos y servicios, mapa de la red, promociones, Mobil, Prevención y contacto |
| Conocé DISA | `conoce-disa.html` | DISA en Uruguay, video, línea de tiempo, Grupo DISA, áreas de negocio (pestañas), documentos y Canal de Denuncia |
| Red de Estaciones | `red-de-estaciones.html` | Localizador oficial (se carga al acercarse), servicios, DISA Shop y resumen de combustibles |
| Combustibles | `combustibles.html` | Fichas de Super 95, Premium 97, Gas Oil 50 S y 10 S, y segmentos |
| Lubricantes | `lubricantes.html` | Alianza Mobil, Centro Técnico, catálogo de 34 productos con 68 PDF, catálogos y Planta Bella Vista |
| FERTEC | `fertec.html` | Ventajas, plantas (Nueva Palmira y Fray Bentos) y asesoramiento |
| Promociones | `promociones.html` + 6 `promo-*.html` | Vigentes, canjes y finalizadas; cada promo con la plantilla §17 del DS |
| Prevención DISA | `prevencion.html` | Las 12 reglas, el diagrama oficial y el acceso a la plataforma |
| Contacto | `contacto.html` | Formulario con validación y estados, contacto directo, emergencias y 5 sedes |
| 404 | `404.html` | «Esta ruta no lleva a ningún lado», con el colibrí en vuelo |

Las direcciones viejas (`/conoce/`, `/productos/lubricantes/`, etc.) redirigen a las nuevas (`sitio/_redirects` para Netlify y `sitio/.htaccess` para Apache/Hostinger).

## 5. Dirección de arte aplicada

La dirección de arte es la del sistema de diseño DISA v1.0 («Sentí nuestra energía»), que ya trae el análisis de referencias de la marca (`disa-design-system/docs/analisis-referencias.md`). No se agregó ningún color, tipografía ni forma que no esté en el DS.

- **Colores:** azul DISA `#16478A`, navy `#0B2A55` (texto), noche `#071B38`, amarillo energía `#FBD300` (botón principal, siempre con texto navy), azul promo `#005CA4`, celeste y verdes solo como acento (FERTEC en verde profundo `#0E4B21`).
- **Tipografías:** Barlow Condensed (títulos y cifras; 700, 800 y 800 itálica) y Barlow (texto; 400, 600 y 700). Son 6 archivos de fuente, el máximo del DS. La itálica de énfasis aparece en la portada («energía») y en un solo título más por página.
- **Formas propias:** el **ala** (placas amarillas o azules con la esquina que se levanta detrás de cada foto y del video), la **ruta punteada** que se dibuja, la **lente amarilla** del mapa, los **chevrons «Deslizá»** y las **banderitas** numeradas (reglas y pasos).
- **Íconos y pictogramas:** solo los del DS (sprite bicolor con la «chispa» amarilla). Cada página incluye únicamente los que usa.

### Animación firma y coreografía

**Firma:** es la intro de marca del DS. El colibrí aparece en el centro y crece, las letras «DISA» entran y lo empujan a su lugar, se descubre el eslogan y el logo sube hasta el header mientras el panel blanco se levanta con borde inclinado. Termina en el hero real, con el botón «Encontrá tu estación» a la vista. Dura 3 s, se saltea con un clic, una tecla, la rueda o un toque, y solo aparece en la primera visita de la sesión.

**Rimas de la firma:** el logo del footer se arma con los mismos gestos al aparecer, el colibrí entra volando al abrir el menú móvil y en el mensaje de éxito del formulario, y en la 404 queda suspendido en vuelo.

| # | Sección (home) | Intensidad | Gesto protagonista | Resto |
|---|---|---|---|---|
| 1 | Hero | 3 | Titular por palabras, fotos que «suben como ala» una por una, ruta punteada que se dibuja hasta el collage, sticker que cae con rebote | Rotador «en cada ruta / carga / viaje / cosecha», ondas que derivan, ala amarilla con parallax (solo escritorio) |
| 2 | Conocenos | 2 | El video se abre con máscara y la placa amarilla se acomoda detrás; el botón de play late | Pilares en cascada |
| 3 | Cifras | 2 | Contadores (93 · +90 · 14.500 · 2021) | Ondas, ala azul con parallax |
| 4 | Productos y servicios | 1 | Tarjetas en cascada; al pasar el mouse se levanta y baja la punta del ala | — |
| 5 | Red de Estaciones | 3 | Los pines caen con rebote desde Montevideo hacia afuera y la lente amarilla se dibuja | Íconos en cascada |
| 6 | Promociones | 2 | Barrido de color que descubre la banda amarilla | Tarjetas en cascada (carrusel en celular) |
| 7 | Lubricantes | 1 | Contador 5.680 y «ASTM» que se escribe | Imagen con máscara |
| 8 | Prevención | 1 | Las 12 reglas en cascada | — |
| 9 | Contacto | 1 | La ruta punteada llega al punto amarillo | — |

**Microinteracciones:** botones con barrido diagonal a 7° y presión al 97 %, tarjetas que se levantan, enlaces con subrayado que crece y flecha que avanza, chispa de los íconos que salta, hamburguesa que se vuelve X, menú móvil con revelado circular, header transparente → sólido → se esconde al bajar y vuelve al subir. **Entre páginas:** View Transitions del DS (fundido con desplazamiento; la tarjeta de una promo «viaja» a su página de detalle en Chrome y Edge).

**Valores técnicos (todos son tokens del DS):** entradas `--ease-energy` cubic-bezier(.16, 1, .3, 1); cortinas y reveals `--ease-camera` (.65, 0, .35, 1); salidas `--ease-exit` al 60 % de la duración; rebote `--ease-spring` (.34, 1.56, .64, 1). Duraciones de 120 a 1.200 ms; contadores de 1.600 ms; ondas de 8 s; escalonado de 80 ms por ítem y de 60 ms por palabra. Solo se animan `transform` y `opacity`, más `clip-path` en reveals y `stroke-dashoffset` en rutas, como permite el DS.

### Video institucional

«DISA – Estación Oficial de la Celeste» (YouTube `WCKhyrFthIc`). Póster propio (cuadro del video con velo navy, placa amarilla con ala, botón amarillo con anillos que laten). El iframe de **youtube-nocookie.com** se crea recién al hacer clic, dentro de un modal 16:9: tiene `title`, se cierra con Esc, con la X o con un clic afuera, el video se corta al cerrar y el foco vuelve al botón. Sin JavaScript, el póster abre el video en YouTube.

## 6. Decisiones técnicas

- **HTML, CSS y JS sin librerías.** La skill de Ruva propone GSAP y Lenis para landings largas, pero el DS de DISA prohíbe el scroll suave por JS y limita GSAP a secuencias fijadas de más de 3 pasos. Se usó el nivel «ligero» de la skill: IntersectionObserver, transiciones CSS y Web Animations, con el `disa-motion.js` del DS. Todo el JS pesa 11 KB comprimido (31 KB sin comprimir), el CSS 30 KB comprimido y el HTML de la home 32 KB comprimido; no depende de ningún CDN salvo Google Fonts.
- **Parche en `disa-motion.js`** (marcado en el archivo, sin cambiar tiempos ni curvas): (1) el colibrí no hacía su entrada con escala y giro porque la animación de empuje la tapaba desde el inicio; (2) cuando el header termina en color, las capas blancas del logo tapaban a las de color. Ahora la intro se ve exactamente como describe `design-system.md` §1.5.
- **Seguridad ante fallas:** si `disa-motion.js` no carga, se quita la clase `js` y todo queda visible. Si nada de JS corre, un rescate CSS muestra todo a los 4 s y la intro deja de tapar a los 6 s. Con «Reducir movimiento» no hay intro, parallax, ondas ni contadores; el menú, el video y el formulario funcionan igual.
- **Fotos:** AVIF con respaldo JPG (o PNG si tienen transparencia), en 480, 800, 1200 y 1600 px según el original, con `width`, `height`, `srcset` y carga diferida. Solo el hero se carga con prioridad. Nota: `sips` (macOS) genera AVIF que Chrome no muestra si un lado es impar; el build fuerza medidas pares.
- **SEO:** `title` y `description` únicos, canonical, Open Graph y Twitter con la imagen OG del DS (1200 × 630), favicon SVG y PNG, apple-touch-icon, manifest, `sitemap.xml`, `robots.txt` y datos estructurados `Organization` y `VideoObject`. Un solo H1 por página y `lang="es-UY"`.
- **Accesibilidad:** enlace para saltar al contenido, foco visible (anillo doble del DS), navegación por teclado en menú, desplegables, pestañas (flechas, Inicio y Fin), modal y formulario. Áreas táctiles de 44 px o más, un `label` por campo, errores con `aria-describedby` y `aria-invalid`, resumen de errores con enlaces y nada de texto blanco sobre amarillo ni sobre celeste.

## 7. Qué se revisó

Revisión con Chrome sin ventana (`scripts/revisar-sitio.mjs` de la skill) en 375 × 812 y 1440 × 900, con «Reducir movimiento» y sin JavaScript, en las 10 páginas y una de promoción:

- Sin scroll horizontal, sin contenido que se quede oculto, sin imágenes rotas, consola sin errores, todos los archivos cargan y las fuentes también.
- En 375 × 812 los dos botones del hero se ven completos en la primera pantalla.
- Prueba automática de interacciones: el video no carga nada hasta el clic; el modal abre con el iframe de youtube-nocookie y autoplay, Esc cierra, el iframe se quita y el foco vuelve. El formulario se probó vacío (5 errores, `aria-invalid` y foco en el resumen), con un correo sin dominio, completo (cargando y éxito) y con error de envío. También se probaron el menú móvil (abre, enfoca y Esc cierra) y las pestañas del catálogo (34 productos, 68 PDF).

**Falta probar en un celular real** (iPhone y Android) y medir Lighthouse con el sitio publicado (en local, sin compresión, los números no son representativos).

## 8. Por validar (decisiones que tomé por ustedes)

1. Usar las **fotos del sitio actual** como provisionales: son de baja resolución, y conviene reemplazarlas por fotos nuevas de al menos 1600 px.
2. **Hero sin video:** composición de marca (fondo con ondas, ala amarilla y collage de tres fotos) en lugar de video o foto a pantalla completa, porque no había material en alta calidad.
3. **«Sos vos»** en lugar de «eres tú» (voseo del DS).
4. **Menú agrupado** en «Conocé DISA» y «Productos y servicios», para que entre en 1024 px. El botón fijo del header es «Encontrá tu estación», la acción principal de todo el sitio.
5. **El localizador** es el oficial del Grupo DISA (iframe de disagrupo.es): se carga al acercarse a la sección, o con un botón, para no frenar la página.
6. **Formulario:** el motivo elegido decide a qué sede va la consulta (FERTEC → fertec@, Lubricantes → Centro Técnico, Aviación → Planta Aviación, Combustibles para empresas → Planta La Tablada y el resto → Gestión Comercial).
7. **Las 12 reglas:** se publican solo los nombres, que salen del diagrama oficial. No se inventaron descripciones.
8. **Ganadores de «DISA te lleva a España»:** se publican tal como figuran en el sitio actual (nombre y cédula enmascarada).
9. **Cifras de la home:** 93 estaciones, +90 años, 14.500 t (Terminal de Nueva Palmira) y 2021, todas del sitio actual, con la fuente y la fecha a la vista.
10. **Sin cuenta regresiva** en Millas Triples, porque el sitio no dice el año ni la hora de cierre.
11. **Nada de GSAP ni Lenis** (ver §6).

## 9. Cómo publicar

1. Corré `python3 build.py`.
2. **Netlify (lo más simple):** iniciá sesión en tu cuenta de Netlify y arrastrá la carpeta `sitio/` a app.netlify.com/drop. El archivo `_redirects` ya maneja las direcciones viejas y la 404.
3. **Hosting propio (Apache/Hostinger):** subí el contenido de `sitio/` a `public_html`. El `.htaccess` hace las redirecciones.
4. Antes de publicar, resolvé los bloqueantes de `CONTENIDO-PENDIENTE.md` (formulario, dominio y legales).
5. Con el sitio en línea: probalo en un celular real, compartí el enlace por WhatsApp para ver la imagen de vista previa y corré Lighthouse en Chrome.
