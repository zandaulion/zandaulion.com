# Audio System

All sounds procedurally generated via WavGenerator (22050 Hz, mono, 16-bit).

## Sounds

| Sound | Duration | Content | Trigger |
|---|---|---|---|
| **Wind** | 2s loop | 120–180 Hz hum + filtered noise | Every frame, volume/pitch reactive to seed speed |
| **Impact** | 0.25s | 35, 55, 110 Hz decay | Collision (impulse > 2) |
| **Swoosh** | 0.3s | 200→800 Hz sweep + noise | Gravity change |
| **Chime** | 0.5s | 523, 785, 1046, 1568 Hz bells | Plant spawn |
| **Sparkle** | 0.2s | 800→2000 Hz rise | Nutrient pickup |
| **Ambient** | 8s loop | 65, 98, 130, 196 Hz drones + LFO | Background continuous |

## Wind Reactivity

- Volume: `(speed − 1) / 14 × windMaxVolume`, clamped 0–1
- Pitch: `0.7 + speed / 15 × 0.9`, clamped 0.7–1.6
- Smooth interpolation: 0.1 alpha per frame

## Volume Defaults

- Ambient: 1.0
- Wind max: 0.4
- Effects multiplier: 0.5
