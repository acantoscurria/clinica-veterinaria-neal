# Landing — Clínica Veterinaria NEAL

Landing page **100 % estática** (HTML + CSS + un JS chico, sin build ni dependencias)
pensada como destino del **QR** de los carteles publicitarios de la clínica.

Optimizada para celular: la mayoría de las visitas van a llegar escaneando el QR desde
la calle o el mostrador, con datos móviles.

---

## Ver el sitio localmente

```bash
cd /home/juan/Proyectos/Personales/landing_neal
python3 serve.py
# abrir http://127.0.0.1:8765
```

> Conviene usar un servidor y no abrir `index.html` con doble clic: algunas cosas
> (fuentes, manifest) no cargan bien desde `file://`.

---

## ⚠️ Datos que faltan completar

Todo lo pendiente está marcado en el código con `TODO:`. Para listarlos:

```bash
grep -rn "TODO:" index.html sitemap.xml robots.txt
```

| Dato | Dónde | Estado |
|------|-------|--------|
| **Dirección** (calle, número, localidad) | `index.html` → tarjeta "Dirección" + JSON-LD `address` | ❌ placeholder |
| **Horarios reales** | `index.html` → lista `.hours`, footer y JSON-LD `openingHoursSpecification` | ⚠️ valores de ejemplo |
| **Link de Google Maps** | tarjeta "Dirección", `.map__link` y el `<iframe>` del mapa | ❌ genérico |
| **URL de Facebook** | footer + JSON-LD `sameAs` | ❌ apunta a facebook.com |
| **Dominio propio** | `<link rel="canonical">`, `og:url`, `og:image`, JSON-LD, `robots.txt`, `sitemap.xml` | ⚠️ hoy apunta a GitHub Pages |
| **WhatsApp** | asumido `+54 9 3625 351608` a partir del cartel | ⚠️ **confirmar que esa línea tiene WhatsApp** |

### Supuestos que hice

- El teléfono del cartel (**3625 351608**) es una línea móvil con WhatsApp, por eso los
  enlaces usan `https://wa.me/5493625351608` (con el `9` de celular).
  Si no tiene WhatsApp, hay que quitar esos botones o cambiar el número.
- La localidad es de **Chaco** (el código de área 3625 corresponde a esa provincia).
- Los horarios cargados son un ejemplo razonable, **no** datos reales.

### Cómo cambiar el teléfono / WhatsApp

Un solo reemplazo alcanza para todo el sitio:

```bash
# WhatsApp (formato internacional sin +, con el 9 de celular)
sed -i 's/5493625351608/NUEVO_NUMERO/g' index.html
# Teléfono para llamar
sed -i 's/+543625351608/+54NUEVO/g' index.html
# Texto visible
sed -i 's/3625 351608/NUEVO FORMATO/g' index.html
```

### Cómo poner el mapa real

1. Buscar la clínica en Google Maps.
2. **Compartir → Insertar un mapa → Copiar HTML**.
3. Reemplazar el `src` del `<iframe>` dentro de `<div class="map">`.
4. Actualizar también el `href` de la tarjeta "Dirección" y el de "Abrir en Google Maps".

---

## Publicar

El sitio está publicado en **GitHub Pages** desde la rama `main`:

### 🔗 https://acantoscurria.github.io/clinica-veterinaria-neal/

Cada `git push` a `main` republica el sitio solo (tarda ~1 minuto).

```bash
git add -A
git commit -m "Actualiza horarios y dirección"
git push
```

> `docs/` está en el `.gitignore`: las fotos de los carteles quedan solo en tu máquina.
> Si cambiás de equipo, acordate de copiarlas aparte.

### Cuando haya dominio propio

1. Comprar el dominio y apuntarlo a GitHub Pages (registros `A` a las IP de GitHub + `CNAME`).
2. Settings → Pages → *Custom domain* y activar *Enforce HTTPS*.
3. Reemplazar la URL de Pages por la nueva en: `index.html` (canonical, `og:url`,
   `og:image`, JSON-LD), `robots.txt` y `sitemap.xml`.

```bash
grep -rn "acantoscurria.github.io" index.html robots.txt sitemap.xml
```

### Otras opciones de hosting

| Opción | Cómo | Costo |
|--------|------|-------|
| **Netlify Drop** | Arrastrar la carpeta a [app.netlify.com/drop](https://app.netlify.com/drop) | Gratis |
| **Cloudflare Pages** | Conectar el repo | Gratis |
| **Vercel** | `npx vercel --prod` | Gratis |
| **Hosting propio** | Subir por FTP a `public_html/` | Según plan |

### Mostrarlo en vivo desde tu máquina (ngrok)

Para que el cliente vea cambios en tiempo real sin publicarlos:

```bash
python3 serve.py        # terminal 1 — puerto 8765
ngrok http 8765         # terminal 2 — da la URL pública
```

`serve.py` oculta `docs/`, el README y los listados de directorio, y desactiva el caché.
Con el plan free, ngrok muestra una pantalla de advertencia antes del sitio: el cliente
tiene que tocar *Visit Site* una vez.

---

## El QR de los carteles

El QR se genera **recién cuando el dominio esté definido**, apuntando a la URL final.

Recomendaciones para que funcione bien impreso:

- Nivel de corrección de errores **H** (tolera manchas y desgaste).
- URL corta y sin parámetros (ej. `clinicaveterinarianeal.com.ar`), así el QR queda
  con pocos módulos y se escanea más rápido y de más lejos.
- Exportar en **vectorial (SVG/PDF)** para la imprenta, no en PNG chico.
- Tamaño mínimo impreso: ~2,5 cm de lado para escaneo a 30 cm; para el cartel del
  mostrador conviene 4–5 cm.
- Dejar el margen blanco (*quiet zone*) alrededor: 4 módulos.
- Probarlo escaneado desde varios celulares **antes** de mandar a imprimir.

Si querés, se puede usar un QR dinámico (tipo Bitly/QR con redirección) para poder
cambiar el destino después sin reimprimir los carteles.

---

## Marca

Todo se tomó de los carteles que están en `docs/`.

### Paleta (muestreada del arte original)

| Token | Color | Uso |
|-------|-------|-----|
| `--violet-500` | `#4b3d96` | Principal (botones, títulos de sección) |
| `--violet-800` | `#282e62` | Silueta del gato / fondos oscuros |
| `--violet-300` | `#7c6ab1` | Silueta del perro / acentos |
| `--violet-50` | `#ecebf4` | Fondos suaves, chips |
| `--ink` | `#221d45` | Títulos |
| `--whatsapp` | `#1fa855` | Botones de WhatsApp |

Están todos en `:root` dentro de `assets/css/styles.css`.

### Tipografías

- **Poppins** (400/500/600/700) — textos y títulos.
- **Caveat** (700) — los remates manuscritos ("más querés", "Juntos por su bienestar").

Están **auto-hospedadas** en `assets/fonts/` (subsets latin y latin-ext, 124 KB en total).
No se hace ninguna conexión a Google Fonts: carga más rápido y no filtra datos de los visitantes.

### Logo

`assets/img/logo.png` y `logo-white.png` se **extrajeron del flyer original** con recorte,
fondo transparente y limpieza de la sombra. Son PNG de 566×838.

> Si la clínica tiene el logo original en vectorial (AI/SVG/PDF), conviene reemplazarlo:
> el vector se ve perfecto en cualquier tamaño. Estos PNG son una reconstrucción a partir
> de una foto en JPEG.

---

## Estructura

```
landing_neal/
├── index.html              # toda la página (una sola vista)
├── serve.py                # servidor de preview local (oculta docs/, sin caché)
├── .nojekyll               # GitHub Pages sirve los archivos tal cual
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── assets/
│   ├── css/
│   │   ├── fonts.css       # @font-face de Poppins y Caveat
│   │   └── styles.css      # tokens + estilos (secciones numeradas)
│   ├── js/main.js          # menú móvil, header sticky, reveal, botón flotante
│   ├── fonts/              # .woff2 auto-hospedados
│   └── img/                # logo, íconos, imagen para compartir
└── docs/                   # carteles originales (en .gitignore, no va al repo)
```

---

## Contenido incluido

Tomado de los dos carteles:

- **Servicios:** consultas, vacunación, desparasitación, control de salud, cirugías, salud dental.
- **Diagnóstico:** ecografía, radiografía (Rx), laboratorio.
- **O.S. Neal:** obra social para mascotas (sección destacada).
- **Además:** pet shop, farmacia, peluquería, grandes animales.
- **Profesional:** Persoglia Juan Darío — M.P. N° 1175.
- **Slogans:** "Cuidamos lo que más querés" y "Juntos por su bienestar".

> Los textos descriptivos de cada servicio los redacté yo (los carteles solo tienen el
> nombre). Vale la pena que el veterinario los revise, sobre todo los beneficios de
> **O.S. Neal**, que están escritos de forma genérica porque no tenemos el detalle real
> de los planes.

---

## Detalles técnicos

- Sin frameworks, sin build, sin dependencias externas en runtime.
- SEO: meta descripción, Open Graph, Twitter Card y JSON-LD `VeterinaryCare`.
- Accesibilidad: HTML semántico, `skip link`, foco visible, `aria-*` en el menú,
  contraste alto y soporte de `prefers-reduced-motion`.
- La animación de aparición al scrollear está condicionada a que haya JS
  (clase `.js` en `<html>`): sin JavaScript el contenido igual se ve completo.
- Peso total del sitio: ~350 KB (incluidas fuentes e imágenes).
