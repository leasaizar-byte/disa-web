# Contenido pendiente · DISA Uruguay

Lo que falta para publicar con todo en regla. Nada de esto se inventó: donde faltaba un dato, no se puso o quedó señalado.
Relevamiento del sitio actual (https://www.disagrupo.com.uy): **4 de noviembre de 2026**.

## Para publicar (bloqueantes)

| # | Qué falta | Dónde se ve | Quién lo da |
|---|---|---|---|
| 1 | **Conectar el formulario de contacto** a un servicio de envío (Formspree, backend propio, etc.). Hoy funciona en modo demostración: valida y muestra los estados, pero no envía. Se conecta poniendo la URL en `data-endpoint` del `<form>` en `fuente/paginas/contacto.html`. | Contacto | DISA / TI |
| 2 | **Dominio y redirecciones**: confirmar que el sitio nuevo reemplaza a www.disagrupo.com.uy. Las URL cambian (`/conoce/` → `/conoce-disa.html`); ya están armadas las redirecciones en `sitio/_redirects` (Netlify) y `sitio/.htaccess` (Apache/Hostinger). | Todo el sitio | DISA / TI |
| 3 | **Separar términos y condiciones de la política de privacidad**: hoy los dos enlaces abren el mismo PDF (`pp_cond_DIUR_v1.pdf`), igual que en el sitio actual. | Footer, Contacto | Legales DISA |

## Fotos y video

| # | Qué falta | Hoy se usa |
|---|---|---|
| 4 | Fotos en alta resolución (mínimo 1600 px de ancho) de estaciones uruguayas, DISA Shop, plantas y equipo. | Las fotos del sitio actual (600–700 px de ancho): se ven bien en celular, algo blandas en pantallas grandes. |
| 5 | Video corto para el fondo del hero (5–8 s, ≤ 900 KB, sin sonido), si se quiere video en la portada. | Composición propia con fondos, ala y collage de fotos. |
| 6 | Fotos de las áreas del Grupo DISA en España (renovables, GLP, electricidad, logística, naviera): confirmar que se pueden usar en el sitio uruguayo. | Las mismas imágenes que muestra hoy disagrupo.com.uy (alojadas en disagrupo.es). |

## Textos y datos a confirmar

| # | Dato | Estado |
|---|---|---|
| 7 | «En DISA, nuestra seguridad **sos vos**» (el sitio actual dice «eres tú»). Se pasó a voseo como pide el sistema de diseño. | Confirmar con DISA |
| 8 | Descripción de cada una de las 12 reglas de Prevención DISA. Se publican solo los nombres (salen del diagrama oficial). | Viene de prevenciondisa.com.uy |
| 9 | Fechas de vigencia de «Tu experiencia DISA» y «¡Cargá y ganá un 0 km!»: no están en el sitio, están en las bases (PDF). | Se dejaron sin fecha visible |
| 10 | Año de «Millas Triples con Itaú» (15 de octubre al 15 de diciembre): el sitio no lo dice. Por eso no se puso cuenta regresiva. | Confirmar año y hora de cierre si se quiere cuenta regresiva |
| 11 | Crédito de marca: «Mobil es marca registrada de Exxon Mobil Corporation». Texto sugerido por el sistema de diseño. | Confirmar con Moove / Mobil |
| 12 | Página de **Responsabilidad Corporativa**: en el sitio actual el enlace no lleva a ningún contenido. No se creó. | Falta contenido |
| 13 | Horarios y servicios por estación (lavadero, DISA Shop, etc.): no son públicos. El localizador oficial del Grupo DISA es la fuente. | Conectar datos si se quiere localizador propio |
| 14 | Logos oficiales de aliados (Itaú, Volar, OCA, Mobil) para mostrarlos en las promociones. Hoy se nombran en texto, sin dibujar logos. | Los da cada aliado |
| 15 | Fecha de publicación del video institucional (para los datos estructurados de Google). | Opcional |
