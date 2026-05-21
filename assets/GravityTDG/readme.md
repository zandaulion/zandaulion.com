# GravityTDG

A space tower-defence game for Android where gravity is both the enemy and your most powerful tool. Cosmonauts fall into orbit around a central celestial body; your job is to place force-field and shooter turrets that guide or slow them so the rescue beam can save them before they escape into deep space.

Built with [libGDX 1.12.1](https://libgdx.com/) targeting Android (primary) and Desktop (development).

---

## Table of Contents

1. [Build Instructions](#build-instructions)
2. [Project Structure](#project-structure)
3. [Architecture Overview](#architecture-overview)
4. [Gameplay Mechanics](#gameplay-mechanics)
5. [Turret Reference](#turret-reference)
6. [Mob Reference](#mob-reference)
7. [Level Format](#level-format)
8. [Progression System](#progression-system)
9. [Audio System](#audio-system)
10. [Adding New Content](#adding-new-content)

---

## Build Instructions

**Requirement:** Java 17 JDK. The project will not compile with a JRE-only installation or Java 21+.

```bash
# Android debug APK
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 ./gradlew :android:assembleDebug --no-daemon

# Desktop run (for development)
JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64 ./gradlew :desktop:run --no-daemon
```

Install the APK:

```bash
adb install android/build/outputs/apk/debug/android-debug.apk
```

---

## Project Structure

```
GravityTDG/
├── android/                        Android launcher and manifest
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/…/AndroidLauncher.java
│       └── res/mipmap-*/ic_launcher.png   App icons (mdpi → xxxhdpi)
├── core/                           Platform-independent game code
│   └── src/main/java/com/gravitytdg/
│       ├── GravityTDG.java         Application entry point (boots MainMenuScreen)
│       ├── AudioManager.java       Static audio facade (load / play / volume / mute)
│       ├── ProgressData.java       Persistent star ratings and level unlock state
│       ├── config/                 JSON data model + Gson loader
│       │   ├── ConfigLoader.java
│       │   ├── LevelConfig.java
│       │   ├── MobConfig.java
│       │   └── TurretConfig.java
│       ├── game/                   Core game objects
│       │   ├── Mob.java            Cosmonaut entity + shield state
│       │   ├── Turret.java         Placed turret — field force or shooter beam
│       │   ├── WaveManager.java    Spawn scheduling from sorted delay list
│       │   ├── Effect.java         Short-lived visual event (teleport / crash ring)
│       │   ├── HexGrid.java        Hex-grid coordinate helpers for turret placement
│       │   ├── FlowFieldRenderer.java  Debug / design-mode force-field visualiser
│       │   └── TextureGen.java     Procedural texture utilities
│       ├── physics/
│       │   ├── PhysicsEngine.java  RK4 integrator — gravity + field turrets
│       │   ├── GravityBody.java    Point mass with absorption radius and optional friction
│       │   └── PhysicsState.java   Immutable (position, velocity) snapshot
│       └── screen/
│           ├── MainMenuScreen.java     Starfield + pulsing glow + PLAY button
│           ├── LevelSelectScreen.java  Orbit-node map with stars and pinch-zoom
│           ├── GameScreen.java         Main gameplay screen (design → play → result)
│           └── PhysicsTestScreen.java  Developer sandbox
├── desktop/                        Desktop launcher
└── assets/
    ├── config/
    │   ├── level1.json … level5.json
    │   ├── mobs.json
    │   └── turrets.json
    ├── sfx/                        Procedurally generated WAV files
    │   ├── music_ambient.wav       10-second looping drone
    │   ├── sfx_shoot_point.wav
    │   ├── sfx_shoot_splash.wav
    │   ├── sfx_shield_absorb.wav
    │   ├── sfx_mob_saved.wav
    │   ├── sfx_mob_crashed.wav
    │   ├── sfx_wave_start.wav
    │   ├── sfx_wave_won.wav
    │   ├── sfx_wave_lost.wav
    │   └── sfx_level_complete.wav
    └── icon_512.png                512×512 Play Store icon
```

---

## Architecture Overview

### Screen flow

```
AndroidLauncher
      │
      └─► GravityTDG.create()
                │
                └─► MainMenuScreen ──[PLAY]──► LevelSelectScreen ──[tap node]──► GameScreen
                                                      ▲                                │
                                                      └──────────[< BACK / To Menu]────┘
```

### Key subsystems

| Subsystem | Classes | Notes |
|-----------|---------|-------|
| Physics | `PhysicsEngine`, `GravityBody`, `PhysicsState` | RK4 integrator at 60 Hz fixed step |
| Game objects | `Mob`, `Turret`, `WaveManager`, `Effect` | Decoupled from rendering |
| Configuration | `ConfigLoader`, `LevelConfig`, `MobConfig`, `TurretConfig` | Gson JSON deserialization |
| Progression | `ProgressData` | libGDX `Preferences` wrapper, persists across sessions |
| Audio | `AudioManager` | Static facade; volume and mute state persist across screen transitions |
| Rendering | `GameScreen` | 3D model batch + ShapeRenderer; depth-mask-off trick for additive glow effects |

### Physics pipeline (per frame)

1. Accumulate `delta` into `physicsAccum`.
2. While `physicsAccum ≥ PHYS_STEP` (1/60 s):
   - For each live mob, run one RK4 step.
   - Test arena escape → mark `CRASHED`.
   - Test center absorption → `SAVED` or `CRASHED` depending on level type and shield state.
   - Apply shooter/splash beams → fill `shieldFill`; call `tryResolveSave()`.
   - Apply field turrets inside `PhysicsEngine.step()` via `Turret.addFieldForce()`.
3. Drain `physicsAccum`.

### Rendering order (GameScreen)

```
1. Clear (dark navy)
2. Starfield (ShapeRenderer, screen-space)
3. Background effects — depth mask OFF, additive blend
      BLACK_HOLE → accretion disk (3 Keplerian bands)
      STAR       → corona + 6 flares
4. 3D model pass — depth mask ON
      Center body sphere (ModelBatch)
      Mob spheres
      Turret models
5. 2D overlay — screen-space ShapeRenderer
      Arena boundary ring
      PLANET → terminator shadow + atmosphere + cloud bands
      Mob shields and flash effects
      Teleport / crash rings (Effect objects)
      Turret range rings and force-field beams
6. HUD (libGDX Scene2D Stage)
```

---

## Gameplay Mechanics

### Phases

| Phase | Description |
|-------|-------------|
| **DESIGN** | Place, move, and orient turrets using the energy budget. Trajectory previews are drawn for each entry point. Press **Start Wave** when ready. |
| **PLAY** | Cosmonauts enter orbit. Turrets activate automatically. Use the speed slider (bottom-right) to slow or fast-forward time. |
| **RESULT** | Wave summary: mobs saved, percentage, stars earned. Proceed to next wave, retry, or return to menu. |
| **REPOSITION** | Brief phase between waves — move turrets at reduced cost before the next wave starts. |

### Camera controls (DESIGN and PLAY)

| Gesture | Effect |
|---------|--------|
| Single-finger drag | Pan the view |
| Two-finger vertical drag | Tilt (pitch) — always aligned to current rotation |
| Two-finger pinch | Zoom |
| Two-finger twist | Rotate the view around the center |

All pan and tilt gestures are orientation-aware: panning after a twist moves the camera along the rotated screen axes, not the world axes.

### Shield mechanics

- **Shooter turrets** fill a mob's `shieldFill` from 0 → 1 at a rate of `attackStrength × stickiness / size` per second.
- When `shieldFill` reaches 1.0:
  - If the mob has **shield charges** remaining (heavy cosmonauts), the charge is absorbed, `shieldFill` resets to 0, and a flash plays. The mob must be fully charged again.
  - Otherwise the mob is marked **SAVED** (teleported on BLACK_HOLE/STAR levels, or must physically reach the center on PLANET/STATION levels).
- Turrets stop firing at a mob once its shield is full, preventing energy waste.

### Win condition

Each wave has a `winPercent` threshold. If `saved / total ≥ winPercent`, the wave is won. The overall level score is the cumulative save percentage across all waves, used for star ratings.

---

## Turret Reference

Defined in `assets/config/turrets.json`.

### FIELD turrets

Field turrets exert a continuous force on any mob within their `fieldRadius`.

| ID | Field type | Effect |
|----|-----------|--------|
| `jet` | JET | Pushes mobs in the turret's facing direction. Rotate with a two-finger twist gesture in design mode. |
| `brake` | BRAKE | Drag opposing velocity — slows mobs without changing their trajectory direction. |

**Placement tip:** Jets are most effective placed tangentially to the orbit to add or remove angular momentum; brakes work best near the center where mobs are moving fastest.

### SHOOTER turrets

Shooter turrets fill the rescue-beam shield while a mob is in range. Turrets stop firing once the shield is full.

| ID | Attack type | Range | Notes |
|----|------------|-------|-------|
| `shooter_single` | POINT | 110 | High `attackStrength` (1.5×); targets the nearest mob in range. |
| `shooter_multi` | SPLASH | 55 | Fills all mobs in range simultaneously; lower individual rate. |

### Common fields

| Field | Type | Description |
|-------|------|-------------|
| `cost` | int | Energy deducted from budget when placing. |
| `moveCost` | int | Energy deducted when repositioning between waves. |
| `radius` | float | Visual and collision radius of the turret model. |

---

## Mob Reference

Defined in `assets/config/mobs.json`.

| Type | Size | Stickiness | Speed | Shield charges | Energy reward | Description |
|------|------|-----------|-------|---------------|--------------|-------------|
| `cosmonaut_basic` | 6 | 1.0 | 1× | 0 | 10 | Standard cosmonaut. One full beam charge saves them. |
| `cosmonaut_fast` | 1 | 14.0 | 2× | 0 | 8 | Tiny, high stickiness — fills quickly — but moves at 2× speed. |
| `cosmonaut_heavy` | 12 | 0.7 | 1× | 3 | 20 | Large, low stickiness. Must absorb 3 full beam cycles before being saved. |

**Shield fill rate formula:** `attackStrength × stickiness / size` per second.

- High `stickiness` means the rescue beam charges them faster.
- Large `size` reduces the fill rate.
- `shieldCharges > 0` means the beam must reach 100% that many extra times before the mob is saved.

---

## Level Format

Each level is a JSON file at `assets/config/levelN.json`.

```jsonc
{
  "id": "level1",
  "arenaRadius": 500.0,           // radius of the playfield in world units

  "centerObject": {
    "type": "BLACK_HOLE",         // BLACK_HOLE | STAR | PLANET | STATION
    "mass": 230000.0,             // gravitational parameter (G×M)
    "radius": 28.0,               // absorption radius — mobs inside this are captured
    "frictionRadius": 56.0,       // annular zone where velocity decays (0 = disabled)
    "frictionCoefficient": 0.5    // drag per second inside friction zone
  },

  "entryPoints": [
    {
      "angle": 45.0,              // degrees on arena circle where the entry is (0 = right)
      "entryAngle": 180.0,        // direction mobs travel when spawning (0 = right)
      "speed": 10.0               // initial speed in world-units/second
    }
  ],

  "energyBudget": 100,            // total energy available in design phase
  "designPhaseDuration": 180.0,   // seconds allowed for turret placement

  "waves": [
    {
      "winPercent": 0.5,          // fraction of mobs that must be saved (0.0–1.0)
      "mobs": [
        {
          "type": "cosmonaut_basic",
          "entryPointIndex": 0,   // index into entryPoints array
          "delay": 0.0            // seconds after wave start when this mob enters
        }
      ]
    }
  ]
}
```

### Center object types

| Type | Visual | Save mechanic |
|------|--------|---------------|
| `BLACK_HOLE` | Dark sphere + accretion disk + relativistic jets | Mob teleported when shield is full |
| `STAR` | Bright sphere + corona + solar flares | Mob teleported when shield is full |
| `PLANET` | Procedural textured sphere + atmosphere + clouds | Mob must physically reach center with full shield |
| `STATION` | Metallic sphere | Any mob that physically reaches center is saved regardless of shield |

### Entry angle tips

- `entryAngle = angle + 180°` → direct inward trajectory (easy — gravitational slingshot required to intercept).
- `entryAngle ≈ angle + 250°` → 70° offset, steep tangential entry (hard — mobs miss the center by ~460 units without turrets). Used in level 4.
- For a circular orbit, set `entryAngle = angle + 90°` and tune `speed` to the orbital velocity at `arenaRadius`.

---

## Progression System

Managed by `ProgressData`, backed by libGDX `Preferences` (Android `SharedPreferences`).

| Key | Value | Description |
|-----|-------|-------------|
| `stars_N` | 0–3 | Best star rating for level N |
| `best_N` | 0.0–1.0 | Best overall save percentage for level N |
| `unlockedLevel` | int | Index of the highest unlocked level (starts at 0) |

### Star thresholds

| Stars | Save percentage |
|-------|----------------|
| ★☆☆ | ≥ 50% |
| ★★☆ | ≥ 70% |
| ★★★ | ≥ 90% |

Levels unlock sequentially: completing level N unlocks level N+1. Replaying a level updates `stars_N` and `best_N` only if the new result is better.

---

## Audio System

`AudioManager` is a static class that owns all audio resources for the duration of a `GameScreen` session. It is loaded in `GameScreen.show()` and disposed in `GameScreen.dispose()`. Volume and mute state are static and survive screen transitions.

### Sound events

| Event | File | Trigger |
|-------|------|---------|
| Shoot (point) | `sfx_shoot_point.wav` | Sniper turret fires (rate-limited to 1 per 350 ms) |
| Shoot (splash) | `sfx_shoot_splash.wav` | Multi-turret fires (rate-limited to 1 per 450 ms) |
| Shield absorb | `sfx_shield_absorb.wav` | Heavy cosmonaut absorbs a beam cycle |
| Mob saved | `sfx_mob_saved.wav` | Cosmonaut successfully saved |
| Mob crashed | `sfx_mob_crashed.wav` | Cosmonaut escapes or crashes |
| Wave start | `sfx_wave_start.wav` | Player presses Start Wave |
| Wave won | `sfx_wave_won.wav` | Wave result: success (not last wave) |
| Wave lost | `sfx_wave_lost.wav` | Wave result: failed |
| Level complete | `sfx_level_complete.wav` | Final wave won |
| Ambient | `music_ambient.wav` | Looping 10-second sub-bass drone, plays throughout |

### Volume controls

The HUD shows a `MUTE / UNMUTE` toggle and a 0–100% slider in the bottom-left corner. Both controls affect all SFX and the ambient music track simultaneously. The ambient music volume is `slider_value × 0.30` (keeping it subtle relative to SFX).

### Regenerating sounds

All WAV files are produced by a Python/NumPy script. To tweak or regenerate them:

```bash
python3 tools/generate_sounds.py   # (see script in repo root if needed)
```

All sounds are 22 050 Hz, 16-bit mono WAV — small enough to load fully into memory.

---

## Adding New Content

### New level

1. Create `assets/config/levelN.json` following the [Level Format](#level-format).
2. Add the filename to the `LEVEL_FILES` array in `LevelSelectScreen.java`.
3. Update `LEVEL_COUNT` in `LevelSelectScreen.java` if you also want the progression system to recognise it.
4. Optionally add an orbital radius entry in the `ORBIT_RADII` array so the node appears at the right distance on the map.

### New mob type

1. Add an entry to `assets/config/mobs.json`:
   ```json
   {
     "type": "cosmonaut_elite",
     "size": 8,
     "stickiness": 0.5,
     "activeAcceleration": 0.5,
     "speedMultiplier": 1.5,
     "energyReward": 30,
     "shieldCharges": 1
   }
   ```
2. Reference the type by name in any wave's `mobs` array.
3. Add a visual branch in `GameScreen.drawMobs()` if you want a distinct model (currently dispatched on size).

### New turret type

1. Add an entry to `assets/config/turrets.json`.
2. For a new **field type**, implement the force calculation as a new `case` in `Turret.addFieldForce()`.
3. For a new **shooter variant**, adjust `Turret.applyWeapon()` or add a new `weaponType` branch in `GameScreen`'s turret firing loop.
4. Add a model/visual in `GameScreen.buildTurretModel()`.

### New center object type

1. Add a new `"type"` string to the JSON.
2. Add a visual branch in:
   - `GameScreen.drawBackground()` → depth-mask-off glow effects
   - `GameScreen.drawModels()` → 3D sphere material
3. Add save-mechanic logic in `GameScreen.tryResolveSave()` or the absorption check in the physics loop.
4. Add shield colour overrides in `GameScreen.drawMobs()` if desired.