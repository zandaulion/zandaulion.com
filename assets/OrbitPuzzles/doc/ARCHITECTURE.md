# OrbitPuzzles Architecture

This document provides a comprehensive overview of the architecture and core systems of the **OrbitPuzzles** Android application.

## High-Level Overview

OrbitPuzzles is a physics-based puzzle game where players place celestial bodies to achieve specific orbital configurations. The app is built using **Kotlin** and leverages a modern Android tech stack:
*   **UI Framework:** Jetpack Compose (100% Compose UI).
*   **3D Rendering:** Google Filament (physically based rendering engine).
*   **Physics:** Custom-built 2D Newtonian gravity engine.

The codebase is organized into distinct feature packages under `com.orbitpuzzles.app`:
*   `physics`: The core numerical simulation.
*   `game`: State management, simulation loop, and game modes.
*   `level`: Level definitions, parsing, and progress tracking.
*   `render`: 3D rendering pipeline via Google Filament.
*   `ui`: Jetpack Compose UI screens, HUD, and 2D canvas overlays.
*   `input`: Touch and gesture handling.

---

## Core Systems

### 1. Physics Engine (`physics/`)
The physics engine is a custom $O(N^2)$ N-body simulator designed for stability and precision.
*   **Integration:** Uses **Velocity Verlet** (also known as Leapfrog) integration. This is symplectic and highly stable for orbital mechanics, preserving orbital energy over long periods better than basic Euler methods.
*   **Gravity:** Implements Newtonian gravity with **Plummer softening**. Softening prevents infinite forces (and simulation explosions) when bodies pass extremely close to one another or collide.
*   **Entities:** `Body` represents a celestial object with properties like mass, radius, position (`Vec2`), velocity, and `BodyType` (e.g., Star, Planet, Black Hole). `World` maintains the flat list of active bodies.

### 2. Simulation State & Loop (`game/`)
The `Sandbox` class acts as the central orchestrator for the simulation.
*   **Game Modes:**
    *   **DESIGN:** Time is paused. The player can place bodies, adjust their velocity vectors, and undo actions.
    *   **RUN:** Time flows. The physics engine integrates the world state. Input is restricted.
*   **Tick Management:** The simulation runs on a fixed-ish timestep driven by the display's VSYNC (via Filament's Choreographer callback) to ensure smooth rendering and deterministic-like physics behavior.
*   **Trails:** Tracks the historical positions of bodies to draw orbital paths.

### 3. Rendering System (`render/`)
The app uses a hybrid 2D/3D rendering approach.
*   **3D Engine (Filament):** 
    *   `FilamentBoot` initializes the native engine, camera, and lighting (including ACES tone mapping and bloom for glowing stars).
    *   `BodyRenderer` maps physics `Body` instances to Filament `Renderable` entities.
    *   `SphereMesh` provides the 3D geometry for all bodies.
*   **Procedural Textures:** `ProceduralBodyTexture.kt` generates equirectangular albedo maps at runtime based on a body's type and a deterministic seed. This allows infinite visual variety without shipping large texture assets.
*   **2D Overlays:** Jetpack Compose's `Canvas` (via `DebugCanvas.kt`) is layered on top of the 3D view to draw orbit trails, velocity arrows, selection rings, and collision explosions.

### 4. Level & Progression (`level/`)
*   **Definitions:** Levels are defined in a JSON format (`assets/levels.json`). They specify the initial bodies (e.g., a central star), the player's budget (how many planets/moons they can place), and the win conditions.
*   **Session Management:** `LevelSession` tracks the active level, checking if the player has met the goals or if a failure condition (like a planet escaping the system or colliding with a star) has occurred.
*   **Orbit Tracking:** `OrbitTracker` uses unwrapped angular travel calculations (relative to a primary body) to robustly count full revolutions, regardless of whether the orbit is perfectly circular or highly elliptical.
*   **Persistence:** Progress (unlocked levels) and winning configurations (snapshots of the bodies when the level was solved) are serialized and saved.

### 5. User Interface (`ui/`)
*   **Compose Architecture:** The entire UI is built with Jetpack Compose. `MainActivity` sets the root content.
*   **Screens:** 
    *   `LevelSelectScreen`: A pager/grid for choosing puzzles.
    *   `SandboxScreen`: The main gameplay view combining the 3D `TextureView`/`SurfaceView` and the 2D UI overlays (`Hud`, `DebugCanvas`).
    *   `LevelEditorScreen`: An internal tool for designing new levels.
*   **Input Handling:** `SandboxInput.kt` attaches pointer input modifiers to translate pinch-to-zoom and pan gestures into camera coordinates, seamlessly bridging screen space to the physics world space.
