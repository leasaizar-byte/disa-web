# Revisión antes de publicar — DISA Uruguay

## Marca
- [ ] El logo es el SVG del paquete (u oficial), sin deformar, con su zona de respeto (altura de la «D») y su tamaño mínimo.
- [ ] La versión del logo es la que corresponde al fondo (§1.2).
- [ ] Los logos de aliados son archivos oficiales, en `.d-partner-slot` y con los créditos de marca.
- [ ] No hay hex sueltos: todo sale de tokens. Hay como máximo 2 acentos saturados por pantalla.
- [ ] Hay como máximo 2 alas visibles por pantalla.

## Texto
- [ ] Todo el texto visible usa voseo. Los botones llevan verbo en imperativo y destino.
- [ ] Las cifras están en formato es-UY. Los datos sin confirmar están marcados `[A confirmar]`.
- [ ] Hay un H1 por página y los títulos no superan los 60 caracteres.
- [ ] Ningún texto blanco está sobre amarillo ni sobre celeste.

## Accesibilidad
- [ ] Los contrastes son AA (≥ 4,5:1 para texto y ≥ 3:1 para texto grande y bordes).
- [ ] El foco se ve en todos los interactivos y el orden de tabulación es lógico.
- [ ] Las áreas táctiles miden ≥ 44 px. Cada campo tiene `<label>` y los errores usan `aria-describedby`.
- [ ] Las imágenes tienen `alt` (las decorativas, vacío) y los videos con voz tienen subtítulos.
- [ ] Con `prefers-reduced-motion` no hay parallax, zoom, marquee ni intro de marca, y todo se lee.

## Motion
- [ ] La intro de marca corre solo en la 1.ª visita, dura ≤ 3 s, se puede saltar y el logo termina exactamente sobre el del header.
- [ ] Solo se animan transform y opacity (o las excepciones documentadas).
- [ ] Como máximo 2 efectos de texto y 2 loops por pantalla, y los loops se pausan fuera de pantalla.
- [ ] Ningún contador se repite al volver a pasar por la sección.
- [ ] Nada parpadea más de 3 veces por segundo.

## Rendimiento
- [ ] La página pesa ≤ 1,2 MB y el video del hero ≤ 900 KB, con póster.
- [ ] Las imágenes van en AVIF o WebP con `srcset`, con lazy load debajo del pliegue.
- [ ] Las fuentes usan `display=swap`, con ≤ 6 archivos.
- [ ] LCP < 2,5 s, CLS < 0,1, INP < 200 ms y Lighthouse ≥ 90 en las 4 categorías.

## Responsive
- [ ] Sin scroll horizontal a 360 px, con un gutter de 16 px.
- [ ] Se revisó a 360, 390, 768, 1024, 1440 y 1920 px.

## SEO y legales
- [ ] La página tiene OG image, title y description únicos, y favicon.
- [ ] Los datos estructurados (`Organization` y `GasStation`) se validaron.
- [ ] Están enlazados los términos, la privacidad, las bases de la promo y el Canal de Denuncia.
