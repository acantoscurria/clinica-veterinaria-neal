# Clínica Veterinaria NEAL — landing page

Sitio de una página para **Clínica Veterinaria NEAL** (Chaco, Argentina), pensado
como destino del código QR de sus carteles publicitarios.

**🔗 [acantoscurria.github.io/clinica-veterinaria-neal](https://acantoscurria.github.io/clinica-veterinaria-neal/)**

Está optimizado para celular: la mayoría de las visitas llegan escaneando el QR
desde la calle o el mostrador, con datos móviles.

---

## Características

- **100 % estático**: HTML, CSS y un JavaScript chico. Sin build, sin framework
  y sin dependencias en tiempo de ejecución.
- **Tipografías auto-hospedadas**: ninguna conexión a servidores de terceros.
- **Imágenes responsive**: WebP con respaldo JPEG, y recortes distintos para
  celular y escritorio.
- **Accesible**: HTML semántico, salto al contenido, foco visible, `aria-*` en
  los controles y soporte de `prefers-reduced-motion`. Contraste verificado
  sobre las fotos del hero (4,9:1 en celular, 11:1 en escritorio).
- **SEO**: meta descripción, Open Graph, Twitter Card y JSON-LD `VeterinaryCare`.
- **Peso**: ~418 KB en celular y ~497 KB en escritorio, todo incluido.

---

## Desarrollo

```bash
python3 serve.py        # http://127.0.0.1:8765
```

`serve.py` sirve el sitio sin listar directorios y sin caché, para que cada
recarga muestre la última versión. Cualquier servidor estático sirve igual;
conviene no abrir `index.html` con doble clic, porque las tipografías y el
manifest no cargan bien desde `file://`.

## Despliegue

Publicado con **GitHub Pages** desde la rama `main`. Cada `git push` republica el
sitio en aproximadamente un minuto.

### Cambiar el dominio

Las URL absolutas (canónica, Open Graph, JSON-LD, `robots.txt` y `sitemap.xml`)
apuntan hoy a GitHub Pages. Para migrar a un dominio propio:

```bash
grep -rn "acantoscurria.github.io" index.html robots.txt sitemap.xml
```

y configurarlo en *Settings → Pages → Custom domain*, con *Enforce HTTPS* activo.

---

## Estructura

```
.
├── index.html              # la página completa
├── serve.py                # servidor de desarrollo
├── .nojekyll               # Pages sirve los archivos tal cual
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── assets/
    ├── css/
    │   ├── fonts.css       # @font-face de Poppins y Caveat
    │   └── styles.css      # tokens de diseño + estilos, por secciones
    ├── js/main.js          # menú, header, carrusel del hero, animaciones
    ├── fonts/              # .woff2 auto-hospedados
    └── img/
        ├── slider/         # fotos del hero
        └── ...             # logo, íconos, imagen para compartir
```

---

## Identidad visual

Todo se derivó del arte de los carteles impresos de la clínica.

### Paleta

| Token | Color | Uso |
|-------|-------|-----|
| `--violet-500` | `#4b3d96` | Principal: botones y títulos de sección |
| `--violet-800` | `#282e62` | Fondos oscuros |
| `--violet-300` | `#7c6ab1` | Acentos |
| `--violet-50` | `#ecebf4` | Fondos suaves y chips |
| `--ink` | `#221d45` | Títulos |
| `--whatsapp` | `#1fa855` | Botones de WhatsApp |

Los colores se muestrearon de los píxeles del arte original. Están definidos en
`:root`, en `assets/css/styles.css`.

### Tipografías

- **Poppins** (400/500/600/700) — textos y títulos.
- **Caveat** (700) — los remates manuscritos.

Auto-hospedadas en `assets/fonts/` (subconjuntos latin y latin-ext, 124 KB en
total). Caveat está reducida con `fonttools` a los caracteres que se usan.

### Logo

`assets/img/logo.png` (color) y `logo-white.png` (monocromo, para fondos
oscuros). Son PNG de 566×838 reconstruidos a partir del arte impreso: recorte,
fondo transparente y limpieza de la sombra.

---

## El hero

### Preloader

Velo violeta con el logo, que se retira solo a los 0,7 s (`.preloader` en
`styles.css`). Está hecho **con CSS puro a propósito**: si el JavaScript fallara,
no puede quedar la pantalla tapada.

### Carrusel de fondo

Tres fotos que se funden cada 6 segundos detrás del texto
(`heroCarousel()` en `main.js`).

- Se pausa con el mouse sobre el hero, con el foco del teclado dentro, y cuando
  la pestaña no está visible.
- Con `prefers-reduced-motion` no hay autoplay ni fundido.
- Los puntos permiten elegir la foto manualmente.
- Las fotos son decorativas (`aria-hidden`): el mensaje está en el texto.

### Efecto cortina

El bloque de color que barre el título y lo descubre (`.curtain`). Se dispara
desde la clase `.js` que agrega el `<script>` del `<head>`, y no desde
`main.js`, para que un error en el JavaScript no pueda dejar el título invisible.

---

## Imágenes del hero

Fotografías de **[Pexels](https://www.pexels.com/license/)** (licencia libre, uso
comercial permitido, sin atribución obligatoria):

| Archivo | Contenido | Fuente |
|---------|-----------|--------|
| `perro-*` | Consulta a un perro en la clínica | [Pexels 39550290](https://www.pexels.com/photo/39550290/) |
| `gato-*` | Control de un gato con estetoscopio | [Pexels 28644631](https://www.pexels.com/photo/28644631/) |
| `campo-*` | Atención a una vaca a campo | [Pexels 38117650](https://www.pexels.com/photo/38117650/) |

De cada una hay dos recortes, porque el hero tiene proporciones muy distintas
según la pantalla:

- `-800` / `-1600`: apaisado 16:9, para escritorio.
- `-m600` / `-m900`: vertical 3:4, para celular.

El recorte vertical no es un detalle menor: en celular el hero mide unos
375×1189 px, así que una imagen 16:9 con `object-fit: cover` quedaba reducida a
una franja vertical de la foto, y además obligaba al navegador a descargar la
versión grande.

Para reemplazarlas, mantener los nombres y las dos proporciones (16:9 y 3:4).

---

## Contenido

- **Servicios**: consultas, vacunación, desparasitación, control de salud,
  cirugías y salud dental.
- **Diagnóstico**: ecografía, radiografía y laboratorio.
- **O.S. Neal**: obra social para mascotas.
- **Además**: pet shop, farmacia, peluquería y atención de grandes animales.
- **Profesional**: Persoglia Juan Darío, M.P. N° 1175.

---

## Licencia

Código bajo licencia MIT. El logotipo, el nombre y la identidad visual de
Clínica Veterinaria NEAL son propiedad de la clínica y no están cubiertos por
esa licencia.
