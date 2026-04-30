# Physics Engine

- **Box2D World:** Gravity initialized to (0,0), set from DevParams
- **Time step:** 1/60s, max accumulator 0.25s
- **Iterations:** 6 velocity, 2 position

## Fertility & Spawning Pipeline

### 1. FertilityTracker

Accumulates points as seed moves:
- Trail points: strength 0.15, emitted every 0.5s while moving
- Resting points: strength 0.8, emitted every 0.3s while speed < 0.5
- Impact points: strength = (impulse / 10).clamp(0.3, 1.0)

### 2. GrowthEngine

Processes fertility periodically (every 0.5s):
- Impacts → always attempt plant spawn at hit surface
- Resting → roll against strength, raycast to nearest surface in 4 directions
- Trail → roll against strength × 0.3, raycast to nearest surface
- Raycast max distance: 5 units, only hits static bodies with fertile surfaces

### 3. Plant Spawning Rules

- Nearby plant on same surface (within minPlantDistance, normal dot > 0.5) → grow existing plant instead
- `canSpawn()` callback must return true (checks nutrient budget in challenge mode)
- Type selection: 25% special (seed-locked), 75% random base type
