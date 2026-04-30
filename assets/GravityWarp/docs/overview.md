# Gravity Warp — Project Overview

**Gravity Warp** is a retro pixel-art physics arcade game for Android, built entirely in Kotlin using the [LibGDX](https://libgdx.com/) framework. The player controls a starship through a gravity well mechanic — touching the screen creates an attraction point — while collecting stardust and avoiding explosive mines.

## Key Facts

| Property | Value |
|---|---|
| Language | Kotlin 2.0 (100%) |
| Framework | LibGDX 1.13.0 |
| Platform | Android 7.0+ (API 24–35) |
| Min JDK | 21 |
| Build System | Gradle (Kotlin DSL) |
| External assets | Only one font (`font.ttf`); everything else is procedurally generated |

## Feature Highlights

- **Inverse-square gravity physics** — touch creates a gravity well; mines drift and hunters chase
- **Screen wrapping** — toroidal topology; objects re-enter from the opposite edge
- **3-second rolling replay** — ring-buffer records every frame; on death a replay plays automatically
- **Near-miss system** — engine detects close calls and captures ±2 s clips
- **Animated GIF export** — near-miss clips are saved to the device gallery (LZW-encoded, Floyd–Steinberg dithering)
- **Procedural audio** — four synthesised WAV tracks (ambient music, warp whoosh, collect chime, explosion boom)
- **Procedural textures** — all 13 game textures drawn pixel-by-pixel at runtime via `Pixmap`
- **Parallax mesh background** — 20×20 vertex grid with gravitational lensing distortion
- **AutoplayAI** — eight-step decision tree with duty-cycle pulsing, look-ahead simulation, and grid-based spatial indexing
- **Hard mode** — doubled mine spawn rate, separate high-score leaderboard

## Quick Navigation

| Document | Contents |
|---|---|
| [architecture.md](architecture.md) | Module layout, class map, data flow |
| [game-mechanics.md](game-mechanics.md) | Physics, scoring, progression, death sequence |
| [classes.md](classes.md) | Full API reference for every class |
| [autoplay-ai.md](autoplay-ai.md) | AI algorithm, constants, spatial indexing |
| [rendering.md](rendering.md) | Background, warp effect, particles, HUD |
| [replay-and-gif.md](replay-and-gif.md) | Replay recorder, near-miss clips, GIF pipeline |
| [build.md](build.md) | Build setup, Gradle config, Android manifest |
