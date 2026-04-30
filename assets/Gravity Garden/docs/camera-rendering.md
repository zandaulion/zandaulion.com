# Camera & Rendering

## Viewport

- **World:** 10×18 units, orthographic camera, FitViewport
- **Available height:** screenHeight − 2 × barHeight, centered vertically

## Camera Shake

- Triggered on collision (impulse > 2)
- Trauma: accumulates on impact, decays at 2.0/sec (configurable)
- Intensity: trauma² (non-linear)
- Max offset: 0.2 units (configurable)
- Applied as random ±offset to camera position

## Canvas Post-Processing (Oil Painting Shader)

Game world rendered to FBO, then processed through `canvas.frag`:

- **Directional brush smear:** 5-tap blur along edge tangent direction; noise-based flow where no strong edges exist
- **Canvas weave texture:** Cross-hatch thread pattern (coarse + fine) darkening valleys by 6%
- **Impasto highlights:** Bright ridges (+4%) where local luminance rises, simulating thick paint catching light
- **Canvas grain:** Pseudo-random per-pixel noise (±2.5%), animated over time
- **Color banding (posterize):** 45 levels for subtle painterly quantization
- **Vignette:** Edge darkening (smoothstep, 40% darken at corners)
- **Warm shift:** +0.012 red, +0.004 green

## Background

- **Sky gradient:** Dark blue palette — top (0.06, 0.05, 0.18), mid (0.08, 0.12, 0.28), bottom (0.1, 0.15, 0.22)
- **Swirl arcs:** 35 procedural arc strokes in dark blue tones (0.10–0.20 range, semi-transparent)
- **Swirl speed:** 0.6–2.2 deg/sec per arc (slow, organic movement)
- **Organic effects:** Breathing radius, tapered width, spiral drift, wavy path, alpha fade, speed oscillation, center drift

## Visual Style

- **Rendering:** ShapeRenderer-based (no textures/sprites)
- **Color palette:** Lighter blues for background, earthy natural tones with glowing accents for gameplay
- **UI theme:** Dark backgrounds (0.05–0.15 range), gold text (0.95, 0.8, 0.4)
- **Level frames:** Beveled wood with grain streaks, gilded inner lip
- **Post-processing:** Oil painting shader with directional smear, canvas weave, and impasto highlights
- **Plant rendering:** Multi-pass brushstroke style with shadow, color, and highlight layers
- **Seed rendering:** Glowing procedural shapes with particle effects
