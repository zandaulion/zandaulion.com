# DevParams (31 Parameters)

Central configuration singleton. All game values initialized to 0 and set from DevParams at level start via `applyDevParams()`.

## Physics (2)

| Key | Default | Range | Description |
|---|---|---|---|
| gravity | 4.0 | 1–30 | Gravity magnitude |
| gravity_transition | 0.25 | 0.05–1 | Direction change duration (s) |

## Seeds (12)

| Key | Default | Range |
|---|---|---|
| seed_std_mass | 0.5 | 0.1–10 |
| seed_std_drag | 0.6 | 0–20 |
| seed_std_bounce | 0.6 | 0–2 |
| seed_heavy_mass | 6.6 | 0.1–10 |
| seed_heavy_drag | 0.2 | 0–20 |
| seed_heavy_bounce | 0.3 | 0–2 |
| seed_bouncy_mass | 2.2 | 0.1–10 |
| seed_bouncy_drag | 0.4 | 0–20 |
| seed_bouncy_bounce | 1.0 | 0–2 |
| seed_light_mass | 0.57 | 0.1–10 |
| seed_light_drag | 12.5 | 0–20 |
| seed_light_bounce | 0.4 | 0–2 |

## Challenge (5)

| Key | Default | Range |
|---|---|---|
| greenery_goal | 130 | 10–500 |
| maturity_goal | 100 | 10–500 |
| nutrient_budget | 10 | 1–100 |
| nutrient_reward | 10 | 1–50 |
| nutrient_respawn | 120 | 10–600 |

## Growth (4)

| Key | Default | Range |
|---|---|---|
| growth_interval | 60 | 5–300 |
| fertility_interval | 0.5 | 0.1–3 |
| min_plant_distance | 0.4 | 0.1–2 |
| plant_scale | 1.1 | 0.5–3 |

## Camera (2)

| Key | Default | Range |
|---|---|---|
| shake_max_offset | 0.2 | 0–1 |
| shake_decay | 2.0 | 0.5–10 |

## Audio (3)

| Key | Default | Range |
|---|---|---|
| ambient_volume | 1.0 | 0–1 |
| wind_max_volume | 0.4 | 0–1 |
| effect_volume | 0.5 | 0–3 |
