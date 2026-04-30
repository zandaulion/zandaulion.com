# Nutrient System

- **Shape:** Circle sensor, radius 0.35 units, static body
- **Per level:** 7–9 pickups placed at specific positions
- **Collection:** Contact between nutrient sensor and dynamic seed body
- **Respawn:** Each pickup respawns individually after 120s (configurable)
- **Challenge reward:** +10 nutrients per pickup (configurable)

## Firefly Wobble Animation

Each pickup has a unique phase offset (`i × 2.7`):
- **X wobble:** `sin(t×1.3 + phase)×0.08 + sin(t×2.1 + phase×0.7)×0.04`
- **Y wobble:** `cos(t×1.7 + phase)×0.06 + sin(t×0.9 + phase×1.3)×0.05`
- **Glow pulse:** `1 + sin(t×3 + phase)×0.15`
- **Rendering:** Outer glow (0.5× pulse), inner glow (0.25× pulse), core, bright center
