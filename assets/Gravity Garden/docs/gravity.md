# Gravity System

## 4 Directions

| Direction | Vector | Description |
|---|---|---|
| DOWN | (0, -g) | Default |
| UP | (0, +g) | Reversed |
| LEFT | (-g, 0) | Horizontal left |
| RIGHT | (+g, 0) | Horizontal right |

- **Magnitude:** g = 4.0 (configurable, range 1–30)
- **Transition duration:** 0.25s (configurable), linear interpolation
- **Effects:** Particle burst at seed position, swoosh sound, 15ms haptic vibration

## Swipe Gesture Detection

- Fling velocity determines direction (faster axis wins)
- |velocityX| > |velocityY| → LEFT/RIGHT
- |velocityY| ≥ |velocityX| → DOWN/UP
- **Double-tap:** Reset seed to spawn point + gravity to DOWN
- Touch restricted to play area (between bars)
