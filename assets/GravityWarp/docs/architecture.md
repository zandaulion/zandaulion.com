# Architecture

## Module Structure

```
orbit/
├── core/                          # Platform-independent game logic (JVM 21)
│   └── src/main/kotlin/com/orbit/game/
│       ├── GravityWarpGame.kt     # Application entry point / main loop
│       ├── Player.kt              # Player-controlled starship
│       ├── Stardust.kt            # Collectible particle
│       ├── Mine.kt                # Red spiky obstacle
│       ├── HunterMine.kt          # Purple chasing mine
│       ├── WarpEffect.kt          # Black-hole visualisation
│       ├── Explosion.kt           # Death debris burst
│       ├── ParticleManager.kt     # Collection burst particles
│       ├── ParallaxBackground.kt  # Mesh-based starfield + gravitational lensing
│       ├── ReplayRecorder.kt      # Ring-buffer frame capture and near-miss clips
│       ├── HudRenderer.kt         # All UI screens and text
│       ├── AssetFactory.kt        # Procedural texture and audio generation
│       ├── AutoplayAI.kt          # AI autopilot
│       ├── VideoRecorder.kt       # Platform abstraction interface
│       └── GifEncoder.kt          # GIF89a LZW encoder
│
└── android/                       # Android launcher and platform implementations
    └── src/main/kotlin/com/orbit/game/android/
        ├── AndroidLauncher.kt     # Activity entry point
        └── AndroidVideoRecorder.kt # GIF save to device gallery
```

## Class Dependency Map

```
AndroidLauncher
    └── GravityWarpGame (ApplicationListener)
            ├── AssetFactory          ← generates all Textures + Sounds
            ├── Player
            │     └── (uses Texture from AssetFactory)
            ├── Stardust
            ├── Mine  (0..N)
            ├── HunterMine  (0..N)
            ├── WarpEffect
            ├── Explosion
            ├── ParticleManager
            ├── ParallaxBackground
            ├── ReplayRecorder
            │     └── NearMissClip (data class)
            ├── HudRenderer
            ├── AutoplayAI
            │     └── (reads Player, Stardust, Mine, HunterMine positions)
            └── VideoRecorder (interface)
                    └── AndroidVideoRecorder (implementation)
                            └── GifEncoder
```

## State Machine

`GravityWarpGame` drives the game through six mutually exclusive states, managed via boolean flags:

| State | Active flags | Description |
|---|---|---|
| Start screen | — | Tutorial overlay, tap anywhere to start |
| Playing | — | Normal gameplay loop |
| Dying | `dying = true` | Explosion plays, freeze frame |
| Replaying | `replaying = true` | Last 3 seconds play back |
| Highlights | `showingHighlights = true` | Near-miss clip list, save buttons |
| Game over | `gameOver = true` | Final score, restart button |

State transitions:

```
Start ──tap──▶ Playing ──collision──▶ Dying ──1.5s──▶ Replaying
                                                            │
                                                        ──end──▶ Highlights ──continue──▶ Game Over
                                                                                                │
                                                                                           ──tap──▶ Playing
```

## Data Flow Per Frame

```
render(delta)
  │
  ├─ [Playing]
  │     ├── AutoplayAI.computeTouch()       → synthetic touchPos (or real touch)
  │     ├── WarpEffect.update()
  │     ├── Player.applyGravity(touchPos)
  │     ├── Player.update(delta)            → new position/velocity
  │     ├── Mine[*].applyGravity(touchPos)
  │     ├── Mine[*].update(delta)
  │     ├── HunterMine[*].huntPlayer()
  │     ├── HunterMine[*].update(delta)
  │     ├── collision checks                → score / triggerDeath
  │     ├── ParticleManager.update()
  │     ├── ReplayRecorder.record()
  │     └── draw pass
  │           ├── ParallaxBackground.render()
  │           ├── WarpEffect.render()
  │           ├── Stardust.render()
  │           ├── Mine[*].render()
  │           ├── HunterMine[*].render()
  │           ├── Player.render()
  │           ├── ParticleManager.render()
  │           ├── Explosion.render()
  │           └── HudRenderer.renderHud()
  │
  ├─ [Replaying]
  │     └── renderReplay(delta)             → plays recorded frames
  │
  ├─ [Highlights]
  │     └── renderHighlights(delta)         → clip list + save buttons
  │
  └─ [Game Over]
        └── HudRenderer.renderGameOver()
```
