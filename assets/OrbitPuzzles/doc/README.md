# OrbitPuzzles Documentation

Welcome to the documentation directory for **OrbitPuzzles**. 

OrbitPuzzles is a gravity-simulation puzzle game for Android. Players design orbital systems by placing planets, moons, and asteroids to achieve specific goals, such as completing a certain number of orbits without colliding.

## Documentation Index

*   [Architecture Overview](ARCHITECTURE.md) - A detailed breakdown of the game's core systems, including the physics engine, rendering pipeline, and level management.

## Development Setup

To build and run OrbitPuzzles:
1.  Open the project in **Android Studio**.
2.  Ensure you have the latest Android SDK and NDK installed (required for Google Filament).
3.  Sync the Gradle project.
4.  Run the `app` configuration on an emulator or physical device.

### Tech Stack
*   **Language:** Kotlin
*   **UI Toolkit:** Jetpack Compose
*   **3D Rendering:** Google Filament (OpenGL/Vulkan backend)
*   **Physics:** Custom Velocity Verlet integration

## Contributing

When modifying the rendering system (`com.orbitpuzzles.app.render`), be mindful of the `SurfaceView` vs `TextureView` implementation and how it interacts with Filament's `SwapChain`. 

The `assets/levels.json` file dictates the main progression of the game. You can add new levels directly by appending new JSON objects to the array following the established schema.