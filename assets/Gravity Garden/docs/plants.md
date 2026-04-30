# Plants (14 Types)

## Base Types (6)

| Type | Max Growth | Base Scale | Growth Step | Color |
|---|---|---|---|---|
| MOSS | 5 | 0.12 | 0.045 | Green (0.2, 0.45, 0.15) |
| FERN | 4 | 0.18 | 0.075 | Green (0.15, 0.55, 0.25) |
| FLOWER | 3 | 0.15 | 0.09 | Red (0.85, 0.35, 0.2) |
| SUCCULENT | 4 | 0.14 | 0.06 | Cyan (0.35, 0.6, 0.4) |
| LICHEN | 5 | 0.1 | 0.04 | Yellow (0.6, 0.55, 0.3) |
| GRASS | 4 | 0.14 | 0.065 | Green (0.25, 0.55, 0.2) |

## Special Types (8, seed-locked)

| Type | Seed | Max Growth | Base Scale | Growth Step | Color |
|---|---|---|---|---|---|
| VINE | Standard | 5 | 0.15 | 0.105 | Dark Green (0.12, 0.5, 0.18) |
| IVY | Standard | 5 | 0.14 | 0.08 | Dark Green (0.18, 0.45, 0.12) |
| MUSHROOM | Heavy | 4 | 0.225 | 0.075 | Brown (0.55, 0.35, 0.15) |
| CRYSTAL | Heavy | 4 | 0.15 | 0.07 | Purple (0.5, 0.4, 0.7) |
| DANDELION | Bouncy | 3 | 0.15 | 0.09 | Yellow (1, 0.85, 0.2) |
| CLOVER | Bouncy | 3 | 0.13 | 0.075 | Green (0.2, 0.6, 0.15) |
| WISP_BLOOM | Light | 4 | 0.12 | 0.06 | Light Blue (0.5, 0.65, 0.9) |
| FIREFLY_FERN | Light | 4 | 0.16 | 0.07 | Cyan (0.3, 0.7, 0.5) |

**Seed → Plant Selection:** 75% random base type, 25% special type for active seed

## Growth Mechanics

- **growthLevel:** Integer 0 → maxGrowthLevel (discrete steps)
- **smoothProgress:** Float 0→1, interpolation speed 0.3/sec per level-up
- **smoothGrowthLevel:** Continuous float for smooth visual transitions
- **Scale:** `baseScale + growthScaleStep × smoothGrowthLevel × scaleMult`
- **Maturity:** `growthFraction = smoothGrowthLevel / maxGrowthLevel` (0..1)
- **Growth timer:** Every 60s (configurable), all plants advance one growth level
- **Proximity rule:** If a plant exists within minPlantDistance (0.4 units) on the same surface (normal dot > 0.5), the existing plant grows instead of spawning a new one

## Plant Rendering (3 passes)

1. Dark shadow base (0.4× darkened, 1.15× scale)
2. Main color with per-plant variation
3. Bright highlight dabs (0.4× brightened, alpha = 0.5 × growthFraction, only when growthFraction ≥ 0.3)
