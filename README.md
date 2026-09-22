# Android Developer Portfolio

## Workshop redesign

The homepage and project pages now use the workshop presentation in `workshop.css`.
Project pages also load `project.css` and `project.js`, with keyboard-accessible
image galleries and related projects. The homepage collection is static HTML;
`workshop.js` progressively adds filtering, search, and random discovery.

BP Digitizer has one project page, `bpdigitizer.html`, covering Android and PWA
versions. The former `wbpdigitizer.html` URL forwards to its web section, with a
plain link as a fallback. Keep that compatibility page and the original
`bpdigitizer-privacy.html` URL when making future changes.

Preview with `python -m http.server 8765 --bind 127.0.0.1`, then open
`http://127.0.0.1:8765/`. Verify with
`python scripts/check_site.py --url http://127.0.0.1:8765`.

### Stable privacy URLs

The privacy-notice paths are already registered with Google Play. **Do not rename,
move, or remove them when changing the website.** Keep these exact public paths:

- `/bitey-privacy.html`
- `/bpdigitizer-privacy.html`
- `/gravitygarden-privacy.html`
- `/gravitytdg-privacy.html`
- `/gravitywarp-privacy.html`
- `/orbitpuzzles-privacy.html`
- `/palebluedot-privacy.html`
- `/plate-privacy.html`

These pages retain their original contents and shared `index.css` / `main.js`
assets. `scripts/check_site.py` guards the paths and can verify the served notices
match the files. The following sections describe the original site foundation.

A responsive, high-performance static portfolio website showcasing three custom Android projects: **Pale Blue Dot**, **Gravity Warp**, and **Gravity Garden**. 

The site is built with modern, accessible web practices and is designed to provide a rich visual experience with dynamic CSS styling, interactive image galleries, and smooth navigation—all without relying on heavy frontend frameworks.

## 🚀 Projects Showcased

1. **Pale Blue Dot:** A stunning, real-time 3D Earth viewer built natively in Kotlin and OpenGL ES 3.0. It features live astronomy data, procedural stars, and real-time NASA/USGS API overlays (cloud cover, earthquakes, and active volcanoes).
2. **Gravity Warp:** A fast-paced, retro pixel-art physics arcade game built with Kotlin and LibGDX. It features an inverse-square gravity model, toroidal screen wrapping, procedural art generation, and a built-in look-ahead Autoplay AI.
3. **Gravity Garden:** A beautiful, physics-based zen puzzle game utilizing a custom Box2D engine. Players manipulate gravity to cultivate a vibrant, procedurally generated garden brought to life with a custom oil-painting post-processing shader.

## 🛠️ Technology Stack

- **HTML5:** Semantic, accessible layout structure.
- **Vanilla CSS3:** Custom styling system utilizing CSS variables, responsive grid layouts, glassmorphism effects (`backdrop-filter`), and CSS animations. 
- **Vanilla JavaScript:** Lightweight DOM manipulation for mobile navigation toggles, scroll reveal animations, and a fully custom interactive full-screen image lightbox with touch/swipe and keyboard support.

## 📁 Repository Structure

```text
/
├── index.html                  # Main portfolio landing page
├── palebluedot.html            # Pale Blue Dot project page
├── gravitywarp.html            # Gravity Warp project page
├── gravitygarden.html          # Gravity Garden project page
├── *-privacy.html              # Individual privacy policy pages for each app
├── index.css                   # Global stylesheet and design system
├── main.js                     # Global interactive logic (lightbox, animations)
└── assets/                     # Project-specific assets (screenshots, GIFs, and docs)
    ├── PaleBlueDot/
    ├── GravityWarp/
    └── Gravity Garden/
```

## 🌐 How to View

### Local Development
Since this is a purely static site with no build process required, you can view it by simply opening `index.html` in any modern web browser.

### Live Deployment
The portfolio is designed to be hosted seamlessly on **GitHub Pages** (or any static hosting provider like Netlify/Vercel). Simply deploy the `main` branch.

## 📝 License
The source code of this portfolio is open-sourced under the **GNU General Public License v3.0 (GPL-3.0)**. See the `LICENSE` file for more details.

**Trademark & Brand Exception:**
The "Zandaulion" name, brand identity, and all logo image files located in the `assets/brand/` directory are **NOT** covered by the GPL license. All rights to these trademarks and visual brand assets are strictly reserved. You may not use them in derivative works or to identify your own projects without permission.
