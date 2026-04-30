# Zen Challenges (20 Total)

Active in **both** Zen and Challenge modes. Tracked per-level, stored in `saves/zen_challenges.json`.

## Early Challenges (1–2 min)

| Challenge | Condition |
|---|---|
| FIRST_BLOOM | Spawn 1st plant |
| GRAVITY_SHIFT | Change gravity direction once |
| SEED_SWITCH | Use 2+ seed types |
| GENTLE_TOUCH | Plant spawned while seed rests |
| NUTRIENT_FINDER | Collect 3+ nutrients |

## Building Challenges (2–3 min)

| Challenge | Condition |
|---|---|
| GROWING_GARDEN | 10+ plants alive simultaneously |
| FOUR_WINDS | Use all 4 gravity directions |
| WALL_CLIMBER | Plant on vertical wall (normal.x > 0.7) |
| UPSIDE_DOWN | Plant on ceiling (normal.y < -0.7) |
| VARIETY_GARDEN | 3+ different base plant types |

## Mid-Session Challenges (3–4 min)

| Challenge | Condition |
|---|---|
| SEED_EXPERT | Use all 4 seeds in session |
| FULL_COVERAGE | 3+ plants on distinct surfaces |
| BOUNCY_HARVEST | 5+ plants with Bouncy seed |
| HEAVY_HITTER | 5+ plants with Heavy seed |
| LUSH_GARDEN | 25+ plants alive |

## Late Challenges (4–5 min)

| Challenge | Condition |
|---|---|
| BOTANIST | 5+ plant types total |
| NUTRIENT_SWEEP | Collect all nutrients in level |
| CARPET_BLOOM | 40+ plants alive |
| SURFACE_MASTER | Plants on all 4 surface orientations |
| ZEN_MASTER | 50+ total plants spawned in session |

## Surface Detection

- UP: normal.y > 0.5
- DOWN: normal.y < -0.5
- LEFT: normal.x < -0.5
- RIGHT: normal.x > 0.5
