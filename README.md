# Android Developer Portfolio

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
This portfolio template and its contents are for personal showcase purposes. All rights reserved for the individual applications, artwork, and code represented within.
