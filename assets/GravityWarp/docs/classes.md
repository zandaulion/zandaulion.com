# Class Reference

## GravityWarpGame

**File:** `core/.../GravityWarpGame.kt`  
**Extends:** `ApplicationListener` (LibGDX)

The top-level orchestrator. Owns all game objects, drives the state machine, and manages input.

### Key Fields

| Field | Type | Purpose |
|---|---|---|
| `player` | `Player` | The user-controlled ship |
| `stardust` | `Stardust` | The single collectible at any time |
| `mines` | `MutableList<Mine>` | Active red mines |
| `hunterMines` | `MutableList<HunterMine>` | Active purple chasing mines |
| `currentScore` | `Int` | Points in current run |
| `highScore` / `highScoreHard` | `Int` | Persisted best scores |
| `replayRecorder` | `ReplayRecorder` | Rolling 3-second frame buffer |
| `warpEffect` | `WarpEffect` | Visual black-hole at touch point |
| `explosion` | `Explosion` | Death debris |
| `particles` | `ParticleManager` | Collection burst particles |
| `background` | `ParallaxBackground` | Mesh starfield |
| `hud` | `HudRenderer` | All UI |
| `ai` | `AutoplayAI` | Autopilot |
| `videoRecorder` | `VideoRecorder` | GIF save interface |
| `dying` / `replaying` / `gameOver` / `showingHighlights` | `Boolean` | State flags |

### Key Methods

| Method | Description |
|---|---|
| `create()` | Initialise all objects, load preferences, start music |
| `render()` | Main entry point each frame; delegates to state-specific methods |
| `update(delta)` | Physics update for playing state |
| `triggerDeath(mineX, mineY)` | Start explosion, freeze, begin replay sequence |
| `addMine()` | Spawn one red mine away from player |
| `syncHunterMines()` | Add or remove hunters to match score threshold |
| `renderReplay(delta)` | Advance and render one replay frame |
| `renderHighlights(delta)` | Clip list with save buttons |
| `renderSavingClip()` | Progress overlay during GIF encoding |

---

## Player

**File:** `core/.../Player.kt`

The player's starship. Handles its own physics, rotation, and rendering.

### Constants

| Constant | Value | Meaning |
|---|---|---|
| `gravityConstant` | 2,500,000 | Newtonian G coefficient |
| `maxForce` | 1,500 px/s² | Force clamp |
| `damping` | 0.99 | Per-frame velocity reduction |
| `maxScale` | 3.0 | Growth ceiling |

### Fields

| Field | Type | Description |
|---|---|---|
| `position` | `Vector2` | World-space centre |
| `velocity` | `Vector2` | Current velocity (px/s) |
| `scale` | `Float` | Visual and collision scale (1.0–3.0) |
| `rotation` | `Float` | Degrees; tracks velocity direction |
| `bounds` | `Circle` | Collision shape |

### Methods

| Method | Description |
|---|---|
| `applyGravity(touchPos)` | Calculate and apply force from touch point (shortest-path wrap) |
| `grow()` | Increase scale by 2 % |
| `update(delta)` | Apply damping, integrate position, wrap screen, update rotation |
| `render(batch)` | Draw sprite with current scale and rotation |

---

## Stardust

**File:** `core/.../Stardust.kt`

Single collectible particle. Pulses in size using a sine wave.

### Methods

| Method | Description |
|---|---|
| `respawn(w, h)` | Move to a random position (avoids bottom 130 px) |
| `overlaps(player)` | Circle collision check |
| `update(delta)` | Increment pulse timer |
| `render(batch)` | Draw with dynamic scale from pulse |

---

## Mine

**File:** `core/.../Mine.kt`

Red spiky obstacle. Drifts when touched, wraps screen.

### Constants

| Constant | Value |
|---|---|
| `gravityConstant` | 500,000 |
| `maxForce` | 150 px/s² |
| `damping` | 0.99 |

### Methods

| Method | Description |
|---|---|
| `spawn(w, h, avoid, minDist)` | Place randomly, at least `minDist` from `avoid` |
| `applyGravity(touchPos, w, h)` | Apply reduced gravity from touch (with wrap) |
| `overlaps(player)` | Collision check |
| `update(delta, touchPos, w, h)` | Physics + wrapping + pulse update |
| `render(batch)` | Draw with oscillating scale |

---

## HunterMine

**File:** `core/.../HunterMine.kt`

Purple mine with constant gentle pursuit of the player. Slightly weaker than a red mine to gravity.

### Additional Constants

| Constant | Value | Meaning |
|---|---|---|
| `fingerGravity` | 500,000 | Same G as Mine but lower maxForce |
| `fingerMaxForce` | 100 px/s² | Lower cap than Mine |
| `huntForce` | 0.5 px/s² | Constant acceleration toward player |

### Additional Methods

| Method | Description |
|---|---|
| `huntPlayer(playerPos)` | Add small constant velocity toward player (shortest-path direction) |

---

## WarpEffect

**File:** `core/.../WarpEffect.kt`

Visual black-hole drawn at the touch point using a `ShapeRenderer`. No physics.

### Visual Layers (drawn in order)

1. Dark core — filled black circle
2. Event horizon — bright orange/yellow ring (2 concentric circles)
3. Accretion disk — 3 spiral arms rotating with `timer`
4. Infalling rings — 4 ellipses contracting toward centre
5. Gradient rings — subtle fade from core outward

### Methods

| Method | Description |
|---|---|
| `start(x, y)` | Begin active state at position |
| `stop()` | Release; linger countdown starts (1 second) |
| `update(delta)` | Advance `timer`, countdown linger |
| `render(shapeRenderer)` | Draw all visual layers |
| `renderAt(shapeRenderer, x, y, timer, fade)` | Static — used by replay rendering |

---

## Explosion

**File:** `core/.../Explosion.kt`

One-shot debris burst on player death.

### Debris Properties

- **Count**: 20–36 pieces (scales with player size)
- **Velocity**: 80–350 px/s at random angles
- **Rotation**: ±400 °/s spin
- **Life**: 0.8–1.8 s
- **Color fade**: white-hot → orange → dark

### Methods

| Method | Description |
|---|---|
| `trigger(x, y, scale)` | Spawn explosion at world position |
| `update(delta)` | Physics (velocity × 0.97 damping) + removal |
| `render(batch)` | Color interpolation + rotation |

---

## ParticleManager

**File:** `core/.../ParticleManager.kt`

Small burst on stardust collection. 12 particles per burst.

### Methods

| Method | Description |
|---|---|
| `burst(x, y, count)` | Create particle cloud at position |
| `update(delta)` | Velocity × 0.95 damping, remove dead |
| `render(batch)` | Fade alpha by remaining life fraction |

---

## ParallaxBackground

**File:** `core/.../ParallaxBackground.kt`

Two-layer starfield rendered as a 20×20 vertex mesh. Supports gravitational lensing.

### Layers

| Layer | Star count | Parallax factor |
|---|---|---|
| Layer 1 | 40 stars | 5 % of player velocity |
| Layer 2 | 20 stars | 10 % of player velocity |

### Gravitational Lensing

When a warp point is active, mesh vertices within 360 px are pulled toward it:

```
pull = warpStrength * (1 - distance² / radius²)
vertex.x += direction.x * pull * fade
vertex.y += direction.y * pull * fade
```

`warpStrength = 80f`

### Methods

| Method | Description |
|---|---|
| `update(playerVelocity, delta)` | Shift layer offsets |
| `setWarp(active, x, y, fade)` | Enable/disable lensing |
| `render(batch)` | Draw both layers as deformed meshes |

---

## ReplayRecorder

**File:** `core/.../ReplayRecorder.kt`

Ring-buffer that records one `Frame` per game tick. Capacity: 180 frames (~3 seconds at 60 fps).

### Frame Contents

A `Frame` is a complete snapshot:
- Player position, velocity, scale, rotation
- Stardust position, pulse timer
- All mine positions, velocities, pulse timers
- All hunter mine positions, velocities
- Warp effect state (active, position, timer, fade)

### NearMissClip

```kotlin
data class NearMissClip(
    val frames: List<Frame>,
    val label: String,
    val score: Int,
    val deathX: Float,
    val deathY: Float
)
```

### Methods

| Method | Description |
|---|---|
| `record(...)` | Capture current state into ring buffer |
| `startNearMissCapture(label, score)` | Begin 2+2 second near-miss clip |
| `getFrames()` | Return ordered list of last 3 seconds |
| `getRecentFrames(count)` | Return last N frames (for clip pre-context) |
| `getNearMissClips()` | Return all captured clips |
| `flushPending()` | Finalise in-progress clip if game ends |

---

## HudRenderer

**File:** `core/.../HudRenderer.kt`

Owns all fonts and renders every UI screen. Fonts are generated via LibGDX FreeType from `font.ttf`.

### Fonts

| Font | Size | Usage |
|---|---|---|
| Main | 34 px | Score, labels |
| Small | 20 px | Descriptions, best score |
| Title | 75 px | "GRAVITY WARP", "GAME OVER" |
| Message | 45 px | Encouraging messages (gold) |
| Replay | 90 px | Large blinking "REPLAY" label |

### Screens

| Method | Screen |
|---|---|
| `renderStartScreen(...)` | Tutorial overlay, hard-mode toggle, high score |
| `renderHud(...)` | In-game score, controls, mine counts |
| `renderGameOver(...)` | Final score, restart button, coffee link |
| `renderHighlights(...)` | Near-miss clip list with save buttons |
| `renderSavingProgress(...)` | Progress bar during GIF encoding |

### Easter Egg — Coffee Button

Appears after 5 games. Fades on tap. "Coffee was great!" message persists for 100 games. State is persisted in `SharedPreferences`.

---

## AssetFactory

**File:** `core/.../AssetFactory.kt`

Generates all game assets procedurally at startup. No external image or sound files are needed (only `font.ttf`).

### Textures

| Name | Size | Description |
|---|---|---|
| `playerTexture` | 16×16 | Blue/cyan starship with wings and engine |
| `dustTexture` | 8×8 | Golden diamond with sparkles |
| `mineTexture` | 10×10 | Red spiky sphere |
| `hunterMineTexture` | 12×12 | Purple spiky sphere with glowing eyes |
| `explosionTexture` | 6×6 | Orange-yellow debris chunk |
| `blackHoleTexture` | 24×24 | Black hole with spiral and event horizon |
| `coffeeTexture` | 16×16 | Coffee cup with steam wisps |
| `speakerTexture` | 12×12 | Speaker icon with sound waves |
| `musicNoteTexture` | 12×12 | Musical note |
| `bgLayer1` | 256×256 | Dense starfield (40 stars) |
| `bgLayer2` | 256×256 | Sparse starfield (20 stars) |

### Audio

| Name | Duration | Description |
|---|---|---|
| `bgMusic` | 16 s loop | Ambient pad, A minor → F → C → G, 1 s crossfade |
| `warpSound` | 150 ms | Descending whoosh 600→250 Hz |
| `chimeSound` | 250 ms | Two-tone E6 + B6 with exponential decay |
| `explosionSound` | 700 ms | Sub-bass boom 80→25 Hz with texture noise |

---

## AutoplayAI

See [autoplay-ai.md](autoplay-ai.md) for full documentation.

---

## VideoRecorder (interface)

**File:** `core/.../VideoRecorder.kt`

Platform abstraction for GIF saving.

```kotlin
interface VideoRecorder {
    fun start(width: Int, height: Int, fps: Int)
    fun addFrame(pixmap: Pixmap)
    fun finish()
    val isSaving: Boolean
    val saveResult: String?
    val saveProgress: Float   // 0.0–1.0
}
```

---

## AndroidVideoRecorder

**File:** `android/.../AndroidVideoRecorder.kt`  
**Implements:** `VideoRecorder`

Background-thread GIF encoder. Uses a `LinkedBlockingQueue<Pixmap>` to decouple frame capture from encoding. Saves to device gallery via `MediaStore` (Android 10+) or `Environment.getExternalStoragePublicDirectory` (older).

### Process

```
addFrame(pixmap)
    → copies Pixmap → enqueues
    
encoder thread:
    dequeue → downscale → GifEncoder.addFrame()

finish()
    → enqueue sentinel → wait for thread → flush file
    → MediaStore insert → scan gallery
```

---

## GifEncoder

**File:** `core/.../GifEncoder.kt`

Pure-Kotlin GIF89a encoder. Writes animated GIF with Netscape looping extension.

### Algorithm

1. **Quantization**: Floyd–Steinberg dithering into a fixed 256-colour palette (8-8-4 RGB)
2. **LZW compression**: Dictionary-based; code size grows 8→12 bits; clear code resets on saturation
3. **Y-flip**: Screen coordinates to image coordinates
4. **Transparency**: Alpha channel mapped to GIF transparent index

### Output Format

- GIF89a header
- Global Color Table (256 entries)
- Netscape Application Extension (loop count = 0, infinite)
- For each frame: Graphic Control Extension + Image Descriptor + LZW data
