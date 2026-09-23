<!-- readme-languages:start -->
[English](README.md) · [العربية](README.ar.md) · [简体中文](README.zh-CN.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [हिन्दी](README.hi-IN.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Português (Brasil)](README.pt-BR.md) · [Română](README.ro.md) · **Español** · [Українська](README.uk.md)
<!-- readme-languages:end -->

# Zandaulion

Un taller lleno de juego para ideas curiosas: aplicaciones, juegos y pequeñas herramientas por descubrir.

**[Visita zandaulion.com](https://zandaulion.com/)** · [Colección rumana](https://zandaulion.com/ro/index.html)

Este repositorio contiene el sitio web Zandaulion: una colección con capacidad de búsqueda de 20 proyectos, páginas de proyectos individuales y un editor de diagramas interactivo Sankey. La página de inicio y cada página del proyecto están disponibles en 12 idiomas. El sitio es estático HTML, CSS y vanilla JavaScript, alojado en GitHub Pages.

## Traducciones del README

Este README está disponible en los mismos 12 idiomas que el sitio web. Utilice los enlaces de idiomas en la parte superior para cambiar de versión. El inglés vive en `README.md`; Las versiones traducidas utilizan nombres de archivos como `README.ro.md` y `README.ar.md`.

Edite el archivo README en inglés y los catálogos correspondientes en `locales/readme/`, luego ejecute `python scripts/build_readmes.py` para regenerar los archivos traducidos. Utilice `python scripts/build_readmes.py --check` para detectar archivos obsoletos o traducciones faltantes. El indicador opcional `--fetch` prepara los borradores de traducción que faltan a través del mismo servicio de traducción Google utilizado para el texto del proyecto. Se conservan los comandos, rutas, ejemplos de código y destinos de enlaces.

## Qué encontrarás aquí

- Una colección con filtros de categorías, búsqueda sin distinción de acentos y descubrimiento aleatorio.
- Descripciones de proyectos, enlaces de lanzamiento y fuentes, galerías de capturas de pantalla y proyectos relacionados.
- Galerías de imágenes accesibles mediante teclado con subtítulos, controles anterior/siguiente y gestos táctiles.
- Un editor Sankey con edición de nodos/enlaces, exportación de imágenes e importación/exportación de JSON.
- Selección de idioma, preferencias guardadas, detección del idioma del navegador y diseño árabe de derecha a izquierda.
- Avisos de privacidad en inglés existentes en las URL ya registradas con Google Play.

### Colección de proyectos

| Proyecto | página web |
| --- | --- |
| Admitere Liceu Kit | [admitere.html](admitere.html) |
| BP Digitizer — Android y PWA | [bpdigitizer.html](bpdigitizer.html) |
| Faceslice | [faceslice.html](faceslice.html) |
| Gravity Garden | [gravitygarden.html](gravitygarden.html) |
| GravityTDG | [gravitytdg.html](gravitytdg.html) |
| Gravity Warp | [gravitywarp.html](gravitywarp.html) |
| Intârzieri Tren | [intarzieri.html](intarzieri.html) |
| Kerfloom | [kerfloom.html](kerfloom.html) |
| Magpie | [magpie.html](magpie.html) |
| Mișcare | [miscare.html](miscare.html) |
| OLX Deal Finder | [olxdeals.html](olxdeals.html) |
| Pocket Omaha | [omaha.html](omaha.html) |
| OrbitPuzzles | [orbitpuzzles.html](orbitpuzzles.html) |
| Pale Blue Dot | [palebluedot.html](palebluedot.html) |
| Bitey, antes Plate | [plate.html](plate.html) |
| PWA Invite Console | [pwainvite.html](pwainvite.html) |
| pwa-kit | [pwakit.html](pwakit.html) |
| Editor de diagramas Sankey | [sankey.html](sankey.html) |
| Spendosaurus | [spendosaurus.html](spendosaurus.html) |
| Thermostat Monitor | [thermostat.html](thermostat.html) |

Los repositorios de aplicaciones están separados de este sitio web. Los repositorios renombrados son [zandaulion.com](https://github.com/zandaulion/zandaulion.com), [bitey](https://github.com/zandaulion/bitey) y [kerfloom](https://github.com/zandaulion/kerfloom).

Bitey mantiene la página `plate.html` establecida. BP Digitizer tiene una página para ambas plataformas; `wbpdigitizer.html` sigue siendo una redirección de compatibilidad a `bpdigitizer.html#web-version`.

## Vista previa local

Ejecute estos comandos desde la raíz del repositorio. Se necesita Python para el generador y controles; los scripts Python utilizan sólo la biblioteca estándar. Se necesita Node.js con el ejecutor de pruebas incorporado para las pruebas de idioma. No hay ningún paso de instalación de npm ni del paquete frontal.

```sh
python scripts/build_locales.py
python -m http.server 8765 --bind 127.0.0.1
```

Abra [la página de inicio local](http://127.0.0.1:8765/index.html), o use [inglés explícito](http://127.0.0.1:8765/index.html?lang=en-US) o [Romano](http://127.0.0.1:8765/ro/index.html) para omitir la selección automática de idioma.

El HTML generado también está diseñado para la exploración directa de archivos. Abra `index.html`, no una carpeta de idioma; La navegación utiliza nombres de archivos explícitos para evitar listados de directorios. Los guiones de idiomas son guiones ordinarios en lugar de módulos ES. La vista previa local de HTTP es la forma recomendada de revisar los cambios.

## Idiomas y navegación

| Idioma | Localidad | Página de inicio |
| --- | --- | --- |
| ingles | `en-US` | `/index.html?lang=en-US` |
| árabe | `ar` | `/ar/index.html` |
| Chino simplificado | `zh-CN` | `/zh-cn/index.html` |
| francés | `fr-FR` | `/fr/index.html` |
| alemán | `de-DE` | `/de/index.html` |
| hindi | `hi-IN` | `/hi/index.html` |
| japonés | `ja-JP` | `/ja/index.html` |
| coreano | `ko-KR` | `/ko/index.html` |
| Portugués, Brasil | `pt-BR` | `/pt-br/index.html` |
| rumano | `ro` | `/ro/index.html` |
| español | `es-ES` | `/es/index.html` |
| Ucraniano | `uk` | `/uk/index.html` |

Las páginas de proyecto traducidas mantienen el mismo nombre de archivo bajo el prefijo de idioma, como `/fr/kerfloom.html` o `/ja/plate.html`. El cambio de idioma mantiene el proyecto actual y la sección ancla. Los enlaces a colecciones y proyectos relacionados permanecen en el idioma seleccionado. Cada página de inicio y página de proyecto tiene una declaración de idioma, una URL canónica y enlaces recíprocos `hreflang`.

Una ruta de idioma explícita, como `/ro/`, siempre tiene prioridad. Sólo en la página de entrada principal (`/` o `/index.html`), la selección sigue este orden:

1. Una opción explícita compatible con `?lang=`.
2. Una preferencia de idioma guardada.
3. La primera preferencia de navegador compatible de `navigator.languages`.
4. Inglés si ningún idioma compatible coincide.

Las variantes regionales coinciden con su idioma base: por ejemplo, `fr-CA` selecciona francés. Los enlaces en inglés incluyen `?lang=en-US`, por lo que una opción explícita funciona incluso cuando el almacenamiento del navegador no está disponible. Las redirecciones de página de entrada conservan los anclajes de sección y otros parámetros de consulta. Las URL de proyectos y de privacidad nunca redireccionan según el idioma del navegador.

Los enlaces de idioma de la página de inicio están presentes en el HTML y funcionan sin JavaScript. Los encabezados de proyecto, su selector de idioma, los controles de la galería y el editor Sankey utilizan JavaScript. Los enlaces de proyectos de archivos locales llevan el idioma seleccionado en la URL porque los navegadores pueden aislar el almacenamiento para cada archivo.

## Edición y generación de páginas

| que cambiar | Fuente para editar |
| --- | --- |
| Diseño de página de inicio | `templates/home.html` |
| Texto de la página de inicio en cada idioma. | `locales/<locale>.json` |
| Contenido y diseño del proyecto en inglés. | Archivos de proyecto raíz HTML, como `kerfloom.html` |
| Contenido del proyecto traducido | `locales/projects/<locale>/<project>.json` |
| Controles de galería y mensajes del editor. | `locales/projects/<locale>/common.json` |
| Correcciones de traducción reutilizables | `locales/projects/overrides.json` |
| Configuraciones regionales y prefijos de URL admitidos | `scripts/site_locales.py` |
| Cobertura del proyecto y prestación de traducción. | `scripts/project_locales.py` |
| Presentación compartida | `workshop.css` y `project.css` |
| Comportamiento de colección, proyecto y lenguaje. | `workshop.js`, `project.js` y `language.js` |
| Comportamiento del editor Sankey | `sankey.js` |

Después de editar el contenido fuente o los catálogos, vuelva a generar el sitio:

```sh
python scripts/build_locales.py
```

El generador produce 12 páginas de inicio, 220 páginas de proyectos traducidas y `language-data.js`. También mantiene enlaces canónicos y en idiomas alternativos en las 20 páginas del proyecto en inglés. Comprometa estos productos generados con sus fuentes; GitHub Pages les sirve directamente sin hacer funcionar el generador Python.

No edite las páginas de inicio generadas, HTML o `language-data.js` traducidas directamente: la regeneración reemplaza esas ediciones. Los catálogos de la página de inicio deben tener claves coincidentes que no estén vacías. Los catálogos de proyectos utilizan el texto fuente como clave, por lo que los cambios en la copia en inglés requieren las correspondientes actualizaciones de traducción. Las traducciones que faltan fallan en la compilación.

### Mantenimiento de las traducciones

Los borradores de traducción del proyecto se prepararon con el servicio de traducción de Google, luego se refinaron los textos compartidos, los controles de la galería, los nombres de los productos y las frases técnicas seleccionadas. Se conservaron las traducciones anteriores al rumano. La revisión por parte de un hablante nativo sigue siendo útil, especialmente para la terminología técnica. Los nombres de las aplicaciones, las capturas de pantalla y los identificadores técnicos conservan su forma original.

El script de creación opcional puede preparar traducciones faltantes para una configuración regional:

```sh
python scripts/translate_projects.py --fetch --language ro
```

Omita `--language ro` para procesar todas las configuraciones regionales traducidas. La bandera `--fetch` permite enviar el texto público faltante del proyecto al servicio de traducción de Google. Se reutilizan los catálogos existentes, se protegen los nombres de los productos y se aplican correcciones `overrides.json`. Sin `--fetch`, el script informa que faltan cadenas y actualiza los catálogos solo donde todas las traducciones requeridas ya están disponibles. No es una verificación de solo lectura.

Algunas frases compartidas también aparecen en catálogos por proyecto. Realice correcciones de redacción consistentes en `overrides.json` y ejecute el script de preparación para aplicarlas en todos los proyectos, luego reconstruya el HTML. Revisar las traducciones generadas antes de publicarlas. Git ignora la carpeta `.translation-cache/`. Las compilaciones normales y el sitio web implementado nunca llaman a un servicio de traducción.

## Comprobaciones antes de publicar

Con el servidor de vista previa local ejecutándose, ejecute estos comandos en otra terminal:

```sh
python scripts/build_locales.py --check
python scripts/check_site.py --url http://127.0.0.1:8765
node --test scripts/test_language.cjs
```

- La verificación de compilación detecta resultados generados obsoletos y traducciones faltantes.
- La verificación del sitio cubre las 261 páginas HTML: 12 páginas de inicio, 240 páginas de proyectos, ocho avisos de privacidad y una redirección de compatibilidad. Comprueba enlaces locales, activos, ID duplicados fuera del marcado de privacidad preservado, metadatos del idioma del proyecto, enlaces recíprocos SEO y dirección árabe. Con `--url`, también verifica las respuestas de HTTP y compara los avisos de privacidad entregados con sus archivos fuente.
- Las pruebas de idioma cubren la precedencia de preferencias, la coincidencia regional, el almacenamiento bloqueado, las raíces de archivos y subdirectorios, el comportamiento de redireccionamiento y la preservación de secciones.

Para verificaciones de enlaces sin conexión, ejecute `python scripts/check_site.py` sin `--url`. Revise también las páginas afectadas en el navegador: diseño móvil, dirección árabe, cambio de idioma, controles del teclado de la galería e interacciones del editor.

## Despliegue

El sitio activo es [zandaulion.com](https://zandaulion.com/), publicado desde `main` hasta GitHub Pages. `CNAME` mantiene la configuración de dominio personalizada.

Después de generar y verificar el sitio, confirme la fuente y los cambios generados y presione `main`. Espere a que se complete el flujo de trabajo de compilación e implementación de **pages build and deployment** y luego verifique las URL modificadas en el dominio activo. Mantenga el proyecto existente y las rutas de privacidad al cambiar el nombre de las aplicaciones o sus repositorios.

El sitio utiliza activos estáticos y scripts ordinarios. Las fuentes se cargan desde Google Fonts y el editor Sankey carga Apache ECharts desde jsDelivr. No se requiere ningún servicio de traducción en tiempo de ejecución.

## URL estables de los avisos de privacidad

Estas URL ya están registradas con Google Play. **No les cambie el nombre, los mueva ni los elimine, ni reescriba su contenido como parte de la localización del sitio web.**

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

Los avisos permanecen en inglés y conservan su presentación original y los activos compartidos `index.css` / `main.js`. Los cambios de activos compartidos deben tener en cuenta estas páginas. `scripts/check_site.py` protege las rutas y puede verificar el contenido servido.

## Estructura del repositorio

```text
/
├── index.html                  # Página de inicio en inglés generada
├── <project>.html              # fuentes del proyecto en inglés
├── *-privacy.html              # Avisos de privacidad en inglés conservados
├── wbpdigitizer.html           # Redirección de compatibilidad
├── templates/home.html         # Plantilla de página de inicio compartida
├── README.*.md                 # Archivos LÉAME traducidos
├── locales/                    # Sitios web y catálogos de traducción README
├── ar/, de/, ro/, ...           # Páginas de inicio de idiomas generadas y páginas de proyectos.
├── scripts/                    # Generación, preparación de traducciones, verificaciones, pruebas.
├── language-data.js            # Navegación generada y diccionarios de UI.
├── language.js                 # Selección de idioma y navegación.
├── workshop.css / workshop.js  # Presentación del taller y comportamiento de recogida.
├── project.css / project.js    # Presentación del proyecto, encabezado/pie de página, galerías.
├── sankey.js                   # Editor de diagramas interactivo
├── sample_sankey.json          # Datos del diagrama de muestra
├── index.css / main.js         # Activos compartidos originales, retenidos para páginas de privacidad
├── assets/                     # Arte de marca, gráficos del proyecto, capturas de pantalla.
├── CNAME                       # Dominio personalizado GitHub Pages
└── LICENSE
```

## Licencia y elementos de marca

El código fuente tiene la licencia **GNU General Public License v3.0 (GPL-3.0)**. Ver [LICENSE](LICENSE).

**Excepción de marcas e identidad visual:** El nombre «Zandaulion», la identidad de la marca y todos los archivos de imagen de logotipo de `assets/brand/` **no** están cubiertos por la licencia GPL. Se reservan todos los derechos sobre estas marcas y elementos visuales. No puedes utilizarlos en obras derivadas ni para identificar tus propios proyectos sin permiso.
