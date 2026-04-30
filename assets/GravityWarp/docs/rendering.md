# Rendering

All rendering uses LibGDX's `SpriteBatch` for textured quads and `ShapeRenderer` for geometric primitives. Blending is set per-pass.

## Render Order (Playing State)

```
1. ParallaxBackground   (mesh, GL_SRC_ALPHA / GL_ONE_MINUS_SRC_ALPHA)
2. WarpEffect           (ShapeRenderer, same blending)
3. Stardust             (SpriteBatch)
4. Mine[*]              (SpriteBatch)
5. HunterMine[*]        (SpriteBatch)
6. Player               (SpriteBatch)
7. ParticleManager      (SpriteBatch, additive blend GL_SRC_ALPHA / GL_ONE)
8. Explosion            (SpriteBatch)
9. HudRenderer          (SpriteBatch + ShapeRenderer for buttons)
```

---

## ParallaxBackground — Mesh Rendering

The starfield is a `20×20` vertex grid (or aspect-ratio scaled). Each vertex stores:

```
[x, y, packed_color, u, v]
```

Two meshes are rendered per frame with different texture offsets:

| Layer | Texture | Scroll speed | Star density |
|---|---|---|---|
| Layer 1 | `bgLayer1` (256×256) | 5 % of player velocity | 40 stars |
| Layer 2 | `bgLayer2` (256×256) | 10 % of player velocity | 20 stars |

Both textures use **REPEAT wrap mode** and **NEAREST filtering** for pixel-perfect look without artifacts at edges.

### Gravitational Lensing

When `setWarp(active=true, x, y, fade)` is called, each vertex within 360 px of `(x, y)` is displaced toward the warp centre:

```
distSq = (vx - wx)² + (vy - wy)²
if distSq < radius²:
    pull = warpStrength * (1 - distSq / radius²) * fade
    vx += normalize(wx - vx) * pull
    vy += normalize(wy - vy) * pull
```

`warpStrength = 80f`, `radius = 360f`.

This produces a subtle fish-eye distortion in the star field around the touch point.

---

## WarpEffect — Black Hole Visuals

Rendered using `ShapeRenderer` in `FILLED` and `LINE` modes. The five visual layers:

| Layer | Shape | Color | Animation |
|---|---|---|---|
| Dark core | Filled circle (r=24) | Black | Static |
| Event horizon inner | Filled circle (r=28) | Orange | Pulsing with `timer` |
| Event horizon outer | Filled circle (r=32) | Yellow, 60 % alpha | Pulsing |
| Accretion arms | 3 × polygon arc | Orange-red | Rotate at `timer × 2` rad |
| Infalling rings | 4 × ellipse | White fading | Contract toward centre over 0.5 s cycle |

`fade` controls overall alpha: 1.0 while touching, decays to 0 over 1 second after release.

---

## Sprite Animation — Pulse Effect

Both `Stardust` and `Mine` (and `HunterMine`) pulsate in size using a sine wave:

```kotlin
pulseScale = 1.0f + 0.15f * sin(pulseTimer * 3f)
// HunterMine uses 0.15f amplitude; Mine uses 0.08f
```

The `pulseTimer` increments with `delta` each frame. This creates an organic breathing motion independent of frame rate.

---

## Player Rotation

The player sprite faces the direction of its velocity vector. Rotation is smoothly interpolated:

```kotlin
targetAngle = atan2(velocity.y, velocity.x).toDegrees()
rotation = lerpAngle(rotation, targetAngle, delta * 8f)
```

The `lerpAngle` helper handles the 360°/0° wrap correctly.

---

## HudRenderer — Font Rendering

All text is rendered with LibGDX's `BitmapFont` generated at startup via `FreeTypeFontGenerator` from the bundled `font.ttf` (Press Start 2P).

### Encouraging Messages

When a stardust is collected, a random message from a pool of 100 is displayed in gold at the top of the screen for 1.5 seconds, then fades. Messages are chosen without immediate repetition.

### Icon Toggles

The three control icons (speaker, music note, "A") are drawn as textures. When toggled off, a red "×" is drawn on top using `ShapeRenderer`.

### HUD Layout (In-Game)

```
┌─────────────────────────────────────┐
│  Score: 12                [♪] [🔊] [A]│
│  Best: 24 (Hard)                     │
│                  "Nice one!"          │
│                                       │
│           (game area)                 │
│                                       │
│  Mines: 6    Hunters: 3              │
└─────────────────────────────────────┘
```

---

## Replay Rendering

During replay, `renderReplay()` reads each `Frame` from the recorder and reconstructs the scene:

- All entity positions come from the frame snapshot (not live physics)
- `WarpEffect.renderAt(...)` is used as a static draw call with the recorded warp state
- `ParallaxBackground.setWarp(...)` receives the recorded warp fade to reproduce lensing
- The "REPLAY" label blinks at 2 Hz via `sin(replayTimer * 12f) > 0`
