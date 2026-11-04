#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build.py: arma el sitio de DISA Uruguay en la carpeta `sitio/`.

Uso (desde esta carpeta):   python3 build.py
Requisitos: Python 3.9 o más. En Mac usa `sips` (viene con el sistema) para optimizar las fotos.
No instala nada.

Qué hace, en orden:
 1. Copia del sistema de diseño (disa-design-system/) los tokens, disa.css y disa-motion.js.
 2. Copia los assets de marca: pictogramas, fondos, ilustraciones, favicon, íconos de app e imagen OG.
 3. Optimiza las fotos de fuente/img-original/ a AVIF + JPG (o PNG si tienen transparencia)
    en varios anchos. Solo rehace las que cambiaron.
 4. Arma cada página: fuente/layout.html + fuente/parciales/ + fuente/paginas/<página>.html.
    - El logo (capas oficiales del DS) se escribe una sola vez por página y se reutiliza con <use>.
    - Solo se incluyen los íconos que la página usa.
    - Expande etiquetas cortas: <x-img>, <x-icon>, <x-picto> y <x-logo>.
 5. Genera las páginas de promociones y el catálogo de lubricantes desde fuente/datos/*.json.

Todo lo editable está en fuente/. No edites sitio/: se vuelve a generar cada vez.
"""
import datetime
import html
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent
DS = ROOT / "disa-design-system"
SRC = ROOT / "fuente"
OUT = ROOT / "sitio"
SITE_URL = "https://www.disagrupo.com.uy"          # dominio final (ver LEEME: por validar)
OLD_SITE = "https://www.disagrupo.com.uy"           # PDFs que siguen alojados en el sitio actual
VERSION = datetime.datetime.now().strftime("%Y%m%d%H%M")

# --------------------------------------------------------------------------------------------
# Páginas
# --------------------------------------------------------------------------------------------
PAGES = [
    dict(file="index.html", src="index.html", nav="inicio", video=True,
         title="DISA Uruguay · Sentí nuestra energía",
         description="93 estaciones en todo Uruguay, combustibles para particulares y empresas, "
                     "lubricantes Mobil y fertilizantes líquidos FERTEC. Encontrá tu estación DISA."),
    dict(file="conoce-disa.html", src="conoce-disa.html", nav="conoce", video=True,
         title="Conocé DISA · DISA Uruguay",
         description="DISA llegó a Uruguay en 2021 como segundo distribuidor de combustibles del país, "
                     "con el respaldo de más de 90 años del Grupo DISA."),
    dict(file="red-de-estaciones.html", src="red-de-estaciones.html", nav="productos",
         title="Red de Estaciones · DISA Uruguay",
         description="93 estaciones de servicio DISA en todo Uruguay. Encontrá la más cercana con el localizador."),
    dict(file="combustibles.html", src="combustibles.html", nav="productos",
         title="Combustibles · DISA Uruguay",
         description="Super 95, Premium 97, Gas Oil 50 S y Gas Oil 10 S: la gama completa de combustibles DISA "
                     "para particulares, transporte terrestre, aéreo y marino."),
    dict(file="lubricantes.html", src="lubricantes.html", nav="productos",
         title="Lubricantes Mobil y Centro Técnico · DISA Uruguay",
         description="DISA es el distribuidor oficial de lubricantes Mobil en Uruguay. Catálogo, fichas técnicas, "
                     "hojas de seguridad y Centro Técnico de análisis."),
    dict(file="fertec.html", src="fertec.html", nav="productos",
         title="Fertilizantes líquidos FERTEC · DISA Uruguay",
         description="Fertilizantes líquidos nitrogenados, fosfatados y potásicos FERTEC, con terminal en "
                     "Nueva Palmira y centro de acopio en Fray Bentos."),
    dict(file="promociones.html", src="promociones.html", nav="promociones",
         title="Promociones · DISA Uruguay",
         description="Sorteos, millas y canjes en la red de Estaciones DISA. Mirá las promociones vigentes."),
    dict(file="prevencion.html", src="prevencion.html", nav="prevencion",
         title="Prevención DISA · DISA Uruguay",
         description="Prevención DISA: 12 reglas que ayudan a prevenir accidentes y la contaminación del medio ambiente."),
    dict(file="contacto.html", src="contacto.html", nav="contacto",
         title="Contacto · DISA Uruguay",
         description="Contactá a DISA Uruguay: Gestión Comercial, Centro Técnico, Planta Aviación, Planta La Tablada "
                     "y Oficinas Planta Bella Vista."),
    dict(file="404.html", src="404.html", nav="", noindex=True, base="/",
         title="Página no encontrada · DISA Uruguay",
         description="Esta ruta no lleva a ningún lado. Volvé al inicio o encontrá tu estación DISA."),
]

# Anchos en los que se publica cada foto (no se agranda nunca una foto chica)
IMG_WIDTHS = [480, 800, 1200, 1600]
AVIF_Q, JPG_Q = "52", "46"
ENC = 2  # subir este número obliga a regenerar todas las fotos


def log(*a):
    print("·", *a)


# --------------------------------------------------------------------------------------------
# 1 y 2. Copiar archivos del sistema de diseño y assets de marca
# --------------------------------------------------------------------------------------------
def copy(src: Path, dst: Path):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def copy_design_system():
    copy(DS / "tokens/tokens.css", OUT / "css/tokens.css")
    copy(DS / "code/disa.css", OUT / "css/disa.css")
    # disa-motion.js lleva un parche documentado en el LEEME (modos de relleno de la intro):
    # la copia parcheada vive en fuente/js/disa-motion.js.
    copy(SRC / "js/disa-motion.js", OUT / "js/disa-motion.js")
    copy(SRC / "js/site.js", OUT / "js/site.js")
    copy(SRC / "css/site.css", OUT / "css/site.css")
    a = DS / "assets"
    for p in (a / "pictograms").glob("*.svg"):
        copy(p, OUT / "img/marca/pictogramas" / p.name)
    for p in (a / "backgrounds").glob("*.svg"):
        copy(p, OUT / "img/marca/fondos" / p.name)
    for p in (a / "illustrations").glob("*.svg"):
        copy(p, OUT / "img/marca/ilustraciones" / p.name)
    for name in ["favicon.svg", "favicon-16.png", "favicon-32.png", "favicon-48.png", "app-icon-180.png",
                 "app-icon-192.png", "app-icon-512.png", "app-icon-maskable-512.png", "og-image-1200x630.png"]:
        copy(a / "logos/app" / name, OUT / "img/marca" / name)
    for name in ["disa-logo-primary-color.svg", "disa-logo-primary-white.svg"]:
        copy(a / "logos" / name, OUT / "img/marca" / name)
    for p in (SRC / "docs").glob("*.pdf"):
        copy(p, OUT / "docs" / p.name)
    # Manifest para instalar como app y favicon .ico de respaldo
    (OUT / "site.webmanifest").write_text(json.dumps({
        "name": "DISA Uruguay", "short_name": "DISA", "lang": "es-UY", "start_url": "index.html",
        "display": "standalone", "background_color": "#FFFFFF", "theme_color": "#16478A",
        "icons": [
            {"src": "img/marca/app-icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "img/marca/app-icon-512.png", "sizes": "512x512", "type": "image/png"},
            {"src": "img/marca/app-icon-maskable-512.png", "sizes": "512x512", "type": "image/png",
             "purpose": "maskable"}]}, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {SITE_URL}/sitemap.xml\n", encoding="utf-8")


# --------------------------------------------------------------------------------------------
# 3. Fotos: AVIF + respaldo, varios anchos, con medidas para width/height
# --------------------------------------------------------------------------------------------
def sips_info(path: Path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", "-g", "hasAlpha", str(path)],
                         capture_output=True, text=True).stdout
    w = int(re.search(r"pixelWidth: (\d+)", out).group(1))
    h = int(re.search(r"pixelHeight: (\d+)", out).group(1))
    alpha = "hasAlpha: yes" in out
    return w, h, alpha


def build_images():
    manifest_path = SRC / ".fotos-cache.json"  # registro interno del build (no se publica)
    old = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    manifest = {}
    have_sips = shutil.which("sips") is not None
    (OUT / "img/fotos").mkdir(parents=True, exist_ok=True)
    for src in sorted((SRC / "img-original").iterdir()):
        if src.suffix.lower() not in (".jpg", ".jpeg", ".png"):
            continue
        name = src.stem
        mtime = src.stat().st_mtime
        if name in old and old[name].get("mtime") == mtime and old[name].get("enc") == ENC and all(
                (OUT / "img/fotos" / f).exists() for f in old[name]["files"]):
            manifest[name] = old[name]
            continue
        if not have_sips:
            sys.exit("Falta `sips` (macOS) para optimizar fotos. Ver LEEME.")
        w, h, alpha = sips_info(src)
        fallback = "png" if alpha else "jpg"
        widths = sorted({x for x in IMG_WIDTHS if x < w} | {min(w, 1920)})
        files = []
        for x in widths:
            # Medidas siempre pares: sips guarda las AVIF grandes en mosaicos de 512 px y, con un lado
            # impar, Chrome las muestra transparentes. Recortar 1 px no se nota.
            tw = x - (x % 2)
            th = round(h * x / w)
            th -= th % 2
            for fmt in ("avif", fallback):
                dst = OUT / "img/fotos" / f"{name}-{x}.{fmt}"
                cmd = ["sips", "-s", "format", {"avif": "avif", "jpg": "jpeg", "png": "png"}[fmt]]
                if fmt == "avif":
                    cmd += ["-s", "formatOptions", AVIF_Q]
                elif fmt == "jpg":
                    cmd += ["-s", "formatOptions", JPG_Q]
                cmd += ["--resampleHeightWidth", str(th), str(tw)]
                cmd += [str(src), "--out", str(dst)]
                subprocess.run(cmd, capture_output=True, check=True)
                files.append(dst.name)
        manifest[name] = dict(w=w, h=h, alpha=alpha, fallback=fallback, widths=widths, files=files, mtime=mtime, enc=ENC)
        log("foto", name, f"{w}x{h}", widths)
    manifest_path.write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    return manifest


# --------------------------------------------------------------------------------------------
# 4. Logo (capas oficiales) e íconos (sprite bicolor del DS)
# --------------------------------------------------------------------------------------------
def path_d(svg_file: Path):
    txt = svg_file.read_text(encoding="utf-8")
    return re.findall(r'<path fill="([^"]+)" d="([^"]+)"', txt)


def logo_defs():
    L = DS / "assets/logos/layers"
    col = path_d(L / "disa-layer-colibri-color.svg")       # cuerpo (degradé) + brillo
    solid = path_d(L / "disa-layer-colibri-white.svg")[0][1]
    word = path_d(L / "disa-layer-wordmark-blue.svg")[0][1]
    slog = path_d(L / "disa-layer-eslogan-blue.svg")[0][1]
    grad = re.search(r"<defs>(.*?)</defs>", (L / "disa-layer-colibri-color.svg").read_text()).group(1)
    grad = grad.replace('id="dg-body"', 'id="lg-body"').replace('id="dg-glow"', 'id="lg-glow"')
    return (grad
            + f'<g id="lg-colibri"><path fill="url(#lg-body)" d="{col[0][1]}"/><path fill="url(#lg-glow)" d="{col[1][1]}"/></g>'
            + f'<g id="lg-colibri-solid"><path fill="currentColor" d="{solid}"/></g>'
            + f'<g id="lg-wordmark"><path fill="currentColor" d="{word}"/></g>'
            + f'<g id="lg-eslogan"><path fill="currentColor" d="{slog}"/></g>')


ICONS = {}


def load_icons():
    txt = (DS / "assets/icons/sprite-bicolor.svg").read_text(encoding="utf-8")
    for m in re.finditer(r'<symbol id="([^"]+)"[^>]*>.*?</symbol>', txt, re.S):
        ICONS[m.group(1)] = m.group(0)


def logo_svg(variant="color", cls="", label=None, uses_class=""):
    """Logo completo con eslogan. variant: color | white | blue | navy."""
    ink = {"color": "s-ink-blue", "white": "s-ink-white", "blue": "s-ink-blue", "navy": "s-ink-navy"}[variant]
    bird = "#lg-colibri" if variant == "color" else "#lg-colibri-solid"
    a11y = f'role="img" aria-label="{html.escape(label)}"' if label else 'aria-hidden="true"'
    classes = f"{ink} {cls}".strip()
    uc = f" {uses_class}" if uses_class else ""
    return (f'<svg class="{classes}" viewBox="60 160 446 231" focusable="false" {a11y}>'
            f'<use class="lg-colibri{uc}" href="{bird}"/>'
            f'<use class="lg-wordmark{uc}" href="#lg-wordmark"/>'
            f'<use class="lg-eslogan{uc}" href="#lg-eslogan"/></svg>')


# --------------------------------------------------------------------------------------------
# Etiquetas cortas
# --------------------------------------------------------------------------------------------
ATTR_RE = re.compile(r'([\w:-]+)(?:="([^"]*)")?')


def parse_attrs(s):
    return {k: (v if v is not None else True) for k, v in ATTR_RE.findall(s)}


def picture(attrs, manifest):
    name = attrs["src"]
    if name not in manifest:
        sys.exit(f"Foto no encontrada en fuente/img-original: {name}")
    m = manifest[name]
    sizes = attrs.get("sizes", "100vw")
    alt = attrs.get("alt", "")
    eager = "eager" in attrs
    widths = m["widths"]
    avif = ", ".join(f"img/fotos/{name}-{w}.avif {w}w" for w in widths)
    fb = ", ".join(f"img/fotos/{name}-{w}.{m['fallback']} {w}w" for w in widths)
    mid = widths[min(1, len(widths) - 1)]
    extra = " ".join(f'{k}="{v}"' for k, v in attrs.items()
                     if (k.startswith("data-") or k == "style") and v is not True)
    pcls = attrs.get("class", "")
    icls = attrs.get("img-class", "")
    load = 'loading="eager" fetchpriority="high"' if eager else 'loading="lazy"'
    open_tag = "<picture" + (f' class="{pcls}"' if pcls else "") + (f" {extra}" if extra else "") + ">"
    return (open_tag
            + f'<source type="image/avif" srcset="{avif}" sizes="{sizes}">'
            + f'<img src="img/fotos/{name}-{mid}.{m["fallback"]}" srcset="{fb}" sizes="{sizes}" '
            + f'width="{m["w"]}" height="{m["h"]}" alt="{html.escape(alt, quote=True)}" {load} decoding="async"'
            + (f' class="{icls}"' if icls else "") + "></picture>")


def icon(attrs):
    name = attrs["name"]
    if f"icon-{name}" not in ICONS:
        sys.exit(f"Ícono inexistente en el DS: icon-{name}")
    cls = ["d-icon"]
    if "bi" in attrs:
        cls.append("d-icon--bi")
    if attrs.get("size") in ("16", "20", "32"):
        cls.append(f"d-icon--{attrs['size']}")
    if attrs.get("class"):
        cls.append(attrs["class"])
    label = attrs.get("label")
    a11y = f'role="img" aria-label="{html.escape(label)}"' if label else 'aria-hidden="true"'
    return f'<svg class="{" ".join(cls)}" focusable="false" {a11y}><use href="#icon-{name}"/></svg>'


def picto(attrs):
    size = attrs.get("size", "96")
    cls = f' class="{attrs["class"]}"' if attrs.get("class") else ""
    return (f'<img{cls} src="img/marca/pictogramas/picto-{attrs["name"]}.svg" width="{size}" height="{size}" '
            f'alt="{html.escape(attrs.get("alt", ""))}" loading="lazy" decoding="async">')


def expand_tags(s, manifest):
    s = re.sub(r"<x-img\s+([^>]*?)\s*/?>(?:</x-img>)?", lambda m: picture(parse_attrs(m.group(1)), manifest), s)
    s = re.sub(r"<x-icon\s+([^>]*?)\s*/?>(?:</x-icon>)?", lambda m: icon(parse_attrs(m.group(1))), s)
    s = re.sub(r"<x-picto\s+([^>]*?)\s*/?>(?:</x-picto>)?", lambda m: picto(parse_attrs(m.group(1))), s)

    def _logo(m):
        a = parse_attrs(m.group(1))
        return logo_svg(a.get("variant", "color"), a.get("class", ""), a.get("label"), a.get("uses-class", ""))
    s = re.sub(r"<x-logo\s*([^>]*?)\s*/?>(?:</x-logo>)?", _logo, s)
    return s


# --------------------------------------------------------------------------------------------
# 5. Datos: promociones y lubricantes
# --------------------------------------------------------------------------------------------
def load_json(name):
    return json.loads((SRC / "datos" / name).read_text(encoding="utf-8"))


def esc(s):
    return html.escape(s, quote=True)


def promo_card(p, heading="h3"):
    estado = p["estado"]
    tag = {"vigente": '<span class="d-tag d-tag--energy">Vigente</span>',
           "permanente": '<span class="d-tag">Canje</span>',
           "finalizada": '<span class="d-tag d-tag--expired">Finalizada</span>'}[estado]
    exp = ' data-state="expired"' if estado == "finalizada" else ""
    return f"""
<article class="d-promo-card s-promo-card"{exp} style="view-transition-name: promo-{p['slug']}">
  <div class="d-promo-card__media"><x-img src="{p['imagen']}" alt="{esc(p['imagen_alt'])}" sizes="(min-width: 1024px) 400px, (min-width: 600px) 45vw, 90vw"></div>
  <div class="d-promo-card__body">
    <div class="d-cluster">{tag}{('<span class="s-promo-card__date">' + esc(p['fechas']) + '</span>') if p.get('fechas') else ''}</div>
    <{heading} class="d-h3 s-promo-card__title"><a class="d-card__link" href="promo-{p['slug']}.html">{esc(p['titulo'])}</a></{heading}>
    <p class="s-promo-card__text">{esc(p['bajada'])}</p>
    <span class="d-link d-link--arrow s-promo-card__more" aria-hidden="true">Ver promoción <x-icon name="flecha-derecha" size="20"></span>
  </div>
</article>"""


def promo_cards(promos, only=None, heading="h3"):
    items = [p for p in promos if (only is None or p["slug"] in only)]
    return "\n".join(f"<li>{promo_card(p, heading)}</li>" for p in items)


def promo_page(p, promos):
    """Página de detalle con la plantilla §17 del DS."""
    estado = p["estado"]
    pasos = "".join(f"<li>{esc(x)}</li>" for x in p.get("pasos", []))
    bases = p.get("bases")
    if bases and bases["tipo"] == "pdf":
        bases_html = (f'<a class="d-btn d-btn--outline" href="{bases["href"]}" target="_blank" rel="noopener">'
                      f'<x-icon name="descargar-pdf"> Ver bases y condiciones (PDF)</a>')
    elif bases:
        bases_html = (f'<a class="d-btn d-btn--outline" href="{bases["href"]}" target="_blank" rel="noopener">'
                      f'{esc(bases["texto"])} <x-icon name="abrir-externo" size="20"></a>')
    else:
        bases_html = ""
    cta = ""
    if p.get("cta"):
        c = p["cta"]
        ext = ' target="_blank" rel="noopener"' if c["href"].startswith("http") else ""
        ext_icon = ' <x-icon name="abrir-externo" size="20">' if ext else ""
        cta = f'<a class="d-btn d-btn--lg" href="{c["href"]}"{ext}>{esc(c["texto"])}{ext_icon}</a>'
    estaciones = ""
    if p.get("estaciones"):
        lis = "".join(f'<li><x-icon name="ubicacion" bi size="20"><span>{esc(e)}</span></li>' for e in p["estaciones"])
        estaciones = f"""
  <section class="d-section s-promo-stations" aria-labelledby="t-adheridas">
    <div class="d-container">
      <p class="d-overline" data-reveal="fade-up">Dónde participar</p>
      <h2 class="d-h2 d-split" id="t-adheridas">Estaciones adheridas</h2>
      <ul class="s-station-list" data-stagger>{lis}</ul>
    </div>
  </section>"""
    ganadores = ""
    if p.get("ganadores"):
        gs = "".join(f"""<li class="s-winner"><span class="d-overline">Sorteo {esc(g['sorteo'])}</span>
            <p class="s-winner__text">{esc(g['texto'])}</p><p class="s-winner__name">{esc(g['nombre'])} <span>{esc(g['ci'])}</span></p></li>"""
                     for g in p["ganadores"])
        ganadores = f"""
  <section class="d-section" aria-labelledby="t-ganadores">
    <div class="d-container">
      <p class="d-overline" data-reveal="fade-up">Promoción finalizada</p>
      <h2 class="d-h2 d-split" id="t-ganadores">Ganadores</h2>
      <ol class="s-winners" data-stagger>{gs}</ol>
    </div>
  </section>"""
    aliados = ""
    if p.get("aliados"):
        aliados = ('<p class="s-promo-allies">Promoción junto a ' + " y ".join(f"<strong>{esc(a)}</strong>" for a in p["aliados"]) + ".</p>")
    otras = [x for x in promos if x["slug"] != p["slug"] and x["estado"] != "finalizada"][:3]
    otras_html = "\n".join(f"<li>{promo_card(x)}</li>" for x in otras)
    cifra = f"""<p class="s-promo-figure" aria-hidden="true"><span class="s-promo-figure__num">{esc(p['cifra'])}</span><span class="s-promo-figure__unit">{esc(p['cifra_unidad'])}</span></p>""" if p.get("cifra") else ""
    fechas = (f'<p class="s-promo-dates"><x-icon name="calendario" size="20"> {esc(p["fechas"])}</p>'
              if p.get("fechas") else "")
    finalizada = ('<div class="d-alert d-alert--warning s-promo-ended" role="status"><x-icon name="info">'
                  f'<p>{esc(p["resumen"])}</p></div>') if estado == "finalizada" else ""
    resumen = "" if estado == "finalizada" else f'<p class="d-lead s-promo-lead" data-enter="up" style="--enter-delay:550ms">{esc(p["resumen"])}</p>'
    pasos_html = f"""
      <div class="s-promo-steps" data-reveal="fade-up">
        <h2 class="d-h4">Cómo participar</h2>
        <ol class="d-steps">{pasos}</ol>
      </div>""" if pasos else ""
    return f"""
<section class="d-hero theme-brand s-page-hero s-promo-hero" aria-labelledby="t-promo">
  <div class="d-hero__media s-page-hero__bg" aria-hidden="true">{{{{hero_waves}}}}</div>
  <div class="s-page-hero__ala" aria-hidden="true"><svg data-enter="rise" style="--enter-delay:200ms" viewBox="0 -40 520 248" preserveAspectRatio="none" focusable="false"><path d="M40 0H400C470 0 505-14 520-40V208H40A40 40 0 0 1 0 168V40A40 40 0 0 1 40 0Z" fill="#FBD300"/></svg></div>
  <div class="d-container s-promo-hero__grid">
    <div class="s-promo-hero__content">
      <nav class="d-breadcrumb s-breadcrumb" aria-label="Migas de pan" data-enter="up" style="--enter-delay:100ms"><ol><li><a href="index.html">Inicio</a></li><li><a href="promociones.html">Promociones</a></li><li aria-current="page">{esc(p['titulo'])}</li></ol></nav>
      <p class="d-overline" data-enter="up" style="--enter-delay:150ms">{esc(p['overline'])}</p>
      <h1 class="d-h1 d-split" id="t-promo" data-enter="words" style="--enter-delay:250ms">{esc(p['titulo'])}</h1>
      {fechas}
      {resumen}
    </div>
    <div class="s-promo-hero__media" data-enter="up" style="--enter-delay:400ms">
      <div class="s-promo-hero__frame" style="view-transition-name: promo-{p['slug']}">
        <x-img src="{p['imagen']}" alt="{esc(p['imagen_alt'])}" sizes="(min-width: 1024px) 460px, 90vw" eager>
      </div>
      {cifra}
    </div>
  </div>
</section>

<section class="d-section s-promo-body" aria-label="Detalle de la promoción">
  <div class="d-container s-promo-body__grid">
    <div class="s-promo-body__main">
      {finalizada}
      {pasos_html}
      {aliados}
      <div class="d-cluster s-promo-actions" data-reveal="fade-up">{cta}{bases_html}</div>
      <p class="s-legal">{esc(p.get('legal', 'Ver bases y condiciones completas.'))}</p>
    </div>
  </div>
</section>
{estaciones}{ganadores}
<section class="d-section theme-energy s-more-promos" aria-labelledby="t-otras">
  <div class="d-container">
    <div class="s-section-head">
      <h2 class="d-h2 d-split" id="t-otras">Otras promociones</h2>
      <a class="d-link d-link--arrow" href="promociones.html">Ver todas <x-icon name="flecha-derecha" size="20"></a>
    </div>
    <ul class="s-promo-grid" data-stagger>{otras_html}</ul>
  </div>
</section>"""


def lub_catalog(cats):
    def u(path):
        return OLD_SITE + "/Content/static/lubricantes/" + quote(path)
    tabs, panels = [], []
    for i, c in enumerate(cats):
        sel = "true" if i == 0 else "false"
        tabs.append(f'<button role="tab" id="tab-{c["id"]}" aria-controls="panel-{c["id"]}" aria-selected="{sel}" '
                    f'tabindex="{0 if i == 0 else -1}">{esc(c["nombre"])} <span class="s-tab-count">{len(c["productos"])}</span></button>')
        rows = "".join(f"""
          <li class="s-product">
            <div class="s-product__name"><x-icon name="gota-aceite" bi size="20"><span>{esc(p['nombre'])}</span></div>
            <div class="s-product__links">
              <a class="d-btn d-btn--sm d-btn--outline" href="{u(p['ficha'])}" target="_blank" rel="noopener" aria-label="Ficha técnica (PDF) de {esc(p['nombre'])}">Ficha técnica (PDF)</a>
              <a class="d-btn d-btn--sm d-btn--ghost" href="{u(p['hoja'])}" target="_blank" rel="noopener" aria-label="Hoja de seguridad (PDF) de {esc(p['nombre'])}">Hoja de seguridad (PDF)</a>
            </div>
          </li>""" for p in c["productos"])
        hidden = "" if i == 0 else " hidden"
        panels.append(f'<div role="tabpanel" id="panel-{c["id"]}" aria-labelledby="tab-{c["id"]}" tabindex="0"{hidden}>'
                      + (f'<p class="s-tab-intro">{esc(c["descripcion"])}</p>' if c.get("descripcion") else "")
                      + f'<ul class="s-products">{rows}</ul></div>')
    return (f'<div class="d-tabs s-lub-tabs"><div role="tablist" aria-label="Categorías de lubricantes automotrices">'
            f'{"".join(tabs)}</div>{"".join(panels)}</div>')


def lub_catalogos(cats):
    out = []
    for c in cats:
        href = OLD_SITE + "/Content/static/lubricantes/catalogos/" + quote(c["archivo"])
        out.append(f"""<li><a class="s-doc" href="{href}" target="_blank" rel="noopener">
          <x-icon name="descargar-pdf" bi size="32"><span><strong>{esc(c['nombre'])}</strong><small>PDF · se abre en una pestaña nueva</small></span>
          <x-icon name="flecha-derecha" size="20" class="s-doc__arrow"></a></li>""")
    return "".join(out)


# --------------------------------------------------------------------------------------------
# Armado de páginas
# --------------------------------------------------------------------------------------------
def read(p):
    return (SRC / p).read_text(encoding="utf-8")


def mark_current(header, nav):
    if not nav:
        return header
    return re.sub(rf'data-nav="{nav}"', 'data-nav="' + nav + '" aria-current="page"', header)


def jsonld(page):
    org = {
        "@context": "https://schema.org", "@type": "Organization", "name": "DISA Uruguay",
        "url": SITE_URL + "/", "logo": SITE_URL + "/img/marca/disa-logo-primary-color.svg",
        "slogan": "Sentí nuestra energía", "email": "uruguay@disagrupo.uy", "telephone": "+598 2200 9920",
        "address": {"@type": "PostalAddress", "streetAddress": "San Fructuoso 927", "addressLocality": "Montevideo",
                    "addressCountry": "UY"},
        "parentOrganization": {"@type": "Organization", "name": "Grupo DISA", "url": "https://www.disagrupo.es"},
        "sameAs": ["https://www.facebook.com/DisaUY", "https://www.instagram.com/disauruguay",
                   "https://www.youtube.com/channel/UCEPfazo0s3bL2FIDulYUs9g"]}
    blocks = [org]
    if page.get("video"):
        blocks.append({"@context": "https://schema.org", "@type": "VideoObject",
                       "name": "DISA – Estación Oficial de la Celeste",
                       "description": "Video institucional de DISA Uruguay.",
                       "thumbnailUrl": SITE_URL + "/img/fotos/video-estacion-oficial-celeste-1200.jpg",
                       "embedUrl": "https://www.youtube-nocookie.com/embed/WCKhyrFthIc",
                       "contentUrl": "https://www.youtube.com/watch?v=WCKhyrFthIc",
                       "uploadDate": "[A confirmar]"})
        blocks[-1].pop("uploadDate")  # la fecha de publicación no está en el sitio: no se inventa
    return "".join(f'<script type="application/ld+json">{json.dumps(b, ensure_ascii=False)}</script>' for b in blocks)


def render(page, body, manifest, parts):
    layout = parts["layout"]
    header = mark_current(parts["header"], page.get("nav"))
    main = body
    vm = parts["video_modal"] if page.get("video") else ""
    canonical = SITE_URL + "/" + ("" if page["file"] == "index.html" else page["file"])
    doc = (layout
           .replace("{{header}}", header)
           .replace("{{footer}}", parts["footer"])
           .replace("{{intro}}", parts["intro"])
           .replace("{{video_modal}}", vm)
           .replace("{{main}}", main))
    doc = doc.replace("{{hero_waves}}", parts["hero_waves"]).replace("{{mapa}}", parts["mapa"])
    doc = expand_tags(doc, manifest)
    # Íconos: solo los que se usan
    used = sorted(set(re.findall(r'href="#(icon-[a-z0-9-]+)"', doc)))
    defs = ('<svg class="s-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>'
            + logo_defs() + "</defs>" + "".join(ICONS[i] for i in used) + "</svg>")
    robots = '<meta name="robots" content="noindex">' if page.get("noindex") else ""
    if page.get("base"):  # la 404 se sirve en cualquier ruta: sus enlaces parten de la raíz del dominio
        robots += f'\n<base href="{page["base"]}">'
    og_img = SITE_URL + "/img/marca/og-image-1200x630.png"
    doc = (doc.replace("{{svg_defs}}", defs)
           .replace("{{title}}", esc(page["title"]))
           .replace("{{description}}", esc(page["description"]))
           .replace("{{canonical}}", canonical)
           .replace("{{og_image}}", og_img)
           .replace("{{robots}}", robots)
           .replace("{{jsonld}}", jsonld(page))
           .replace("{{v}}", VERSION)
           .replace("{{page}}", page["file"].replace(".html", "")))
    left = re.findall(r"\{\{[a-z_]+\}\}|<x-[a-z]+", doc)
    if left:
        sys.exit(f"{page['file']}: quedaron marcadores sin reemplazar: {set(left)}")
    return doc


def build():
    if not DS.exists():
        sys.exit("No encuentro la carpeta disa-design-system/ junto a build.py")
    OUT.mkdir(exist_ok=True)
    copy_design_system()
    manifest = build_images()
    load_icons()
    parts = {k: read(f"parciales/{k}.html") for k in ("header", "footer", "intro", "video_modal", "hero_waves", "mapa")}
    parts["layout"] = read("layout.html")
    promos = load_json("promociones.json")
    lub = load_json("lubricantes.json")

    pages = list(PAGES)
    for p in promos:
        pages.append(dict(file=f"promo-{p['slug']}.html", nav="promociones", promo=p,
                          title=f"{p['titulo']} · Promociones DISA Uruguay", description=p["bajada"]))

    for page in pages:
        if page.get("promo"):
            body = promo_page(page["promo"], promos)
        else:
            if not (SRC / "paginas" / page["src"]).exists():
                log("FALTA la página", page["src"], "(se omite)")
                continue
            body = read("paginas/" + page["src"])
        body = (body
                .replace("{{promos_home}}", promo_cards(promos, only=["tu-experiencia-disa", "carga-y-gana-0-km", "millas-triples-itau"]))
                .replace("{{promos_vigentes}}", promo_cards([p for p in promos if p["estado"] == "vigente"], heading="h3"))
                .replace("{{promos_canjes}}", promo_cards([p for p in promos if p["estado"] == "permanente"], heading="h3"))
                .replace("{{promos_finalizadas}}", promo_cards([p for p in promos if p["estado"] == "finalizada"], heading="h3"))
                .replace("{{lub_catalogo}}", lub_catalog(lub["categorias"]))
                .replace("{{lub_catalogos}}", lub_catalogos(lub["catalogos"]))
                .replace("{{lub_total}}", str(sum(len(c["productos"]) for c in lub["categorias"]))))
        doc = render(page, body, manifest, parts)
        (OUT / page["file"]).write_text(doc, encoding="utf-8")
        log("página", page["file"], f"{len(doc.encode()) // 1024} KB")

    # sitemap
    urls = "".join(f"<url><loc>{SITE_URL}/{'' if p['file'] == 'index.html' else p['file']}</loc></url>"
                   for p in pages if not p.get("noindex"))
    (OUT / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>',
        encoding="utf-8")
    # Redirecciones desde las direcciones del sitio actual (Netlify: _redirects; Apache: .htaccess)
    redirs = [("/conoce/", "/conoce-disa.html"), ("/contacto/", "/contacto.html"), ("/prevencion/", "/prevencion.html"),
              ("/productos/red-estaciones", "/red-de-estaciones.html"),
              ("/productos/red-estaciones/combustibles", "/combustibles.html"),
              ("/productos/red-estaciones/localizador", "/red-de-estaciones.html#localizador"),
              ("/productos/lubricantes/", "/lubricantes.html"),
              ("/productos/agroindustrial/fertilizantes", "/fertec.html"),
              ("/productos/promociones/", "/promociones.html"),
              ("/productos/promociones/18881/tu-experiencia-disa", "/promo-tu-experiencia-disa.html"),
              ("/productos/promociones/18882/carga-gana-0-km", "/promo-carga-y-gana-0-km.html"),
              ("/productos/promociones/18885/millas-triples-itau", "/promo-millas-triples-itau.html"),
              ("/productos/promociones/17082/disa-te-lleva-espana", "/promo-disa-te-lleva-a-espana.html"),
              ("/productos/promociones/15403/canje-millas-itau", "/promo-canje-millas-itau.html"),
              ("/productos/promociones/15402/canje-metros-oca", "/promo-canje-metros-oca.html")]
    (OUT / "_redirects").write_text("".join(f"{a}  {b}  301\n" for a, b in redirs) + "/*  /404.html  404\n", encoding="utf-8")
    (OUT / ".htaccess").write_text("ErrorDocument 404 /404.html\nRewriteEngine On\n" + "".join(
        f"RewriteRule ^{a.strip('/')}/?$ {b} [R=301,L,NE]\n" for a, b in redirs), encoding="utf-8")
    log("listo:", OUT, "· versión", VERSION)


if __name__ == "__main__":
    build()
