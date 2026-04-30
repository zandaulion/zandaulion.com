# AutoplayAI

**File:** `core/.../AutoplayAI.kt`

The AI autopilot computes a synthetic touch position each frame that mimics a skilled player. It can be toggled from the HUD or start screen.

## Key Constants

| Constant | Value | Meaning |
|---|---|---|
| `maxCruiseSpeed` | 800 px/s | Braking threshold |
| `pulseDuration` | 150 ms | How long each touch pulse lasts |
| `pulseCooldown` | 350 ms | Gap between pulses |
| `spatialCellSize` | 150 px | Grid cell size for mine indexing |
| `nearMissTrigger` | 72–80 px | Near-miss detection radius |
| `lookAheadFrames` | 60 frames | Simulation window (~1 s at 60 fps) |

## Decision Tree (8 Steps)

The AI evaluates these steps in order each frame:

### Step 1 — Wrap-path evaluation

The stardust target may be reachable via up to **7 paths** (direct + 6 screen-edge shortcuts). The AI picks the shortest wrapped path and uses that as the goal direction.

### Step 2 — Emergency mine clearing

If a mine is within the corridor between the player and stardust and is close enough to be a collision risk, the AI immediately generates a touch point on the **opposite side of the mine** to push it away with inverse-square gravity.

Safety check (`isClearingSafe`): the proposed clearing touch must not simultaneously accelerate the player toward another danger zone.

### Step 3 — Momentum dampening

If the player speed exceeds `maxCruiseSpeed` (800 px/s), or the player is moving fast directly toward stardust, the AI applies a braking touch on the **opposite side of the velocity vector** to slow down.

### Step 4 — Methodical coasting

If the current velocity vector already points within a tight angle of the stardust and the speed is in a reasonable range, the AI returns `null` (no touch) and lets the ship coast. This prevents over-correction.

### Step 5 — Duty-cycle pulsing

To mimic human play style and avoid excessive micro-corrections, the AI operates on a **150 ms on / 350 ms off** duty cycle. When the pulse is in the "off" phase, no touch is generated unless steps 1–3 forced an override.

### Step 6 — Opportunistic mine clearing

During the "on" phase of the pulse, if there are mines within the path corridor, the AI uses the pulse touch to nudge them aside rather than purely chasing stardust.

### Step 7 — Potential field avoidance

When generating a target touch position, the AI combines:

- **Attraction**: vector toward stardust (scaled by distance)
- **Repulsion**: sum of inverse-distance vectors away from nearby mines

The result is a single target point that naturally routes around obstacles.

### Step 8 — Look-ahead collision check

Before committing to a touch position, the AI simulates the next `lookAheadFrames` (60) frames using the same physics constants as the real game. If the simulated trajectory passes through any mine's collision radius, the touch position is discarded and the AI tries a safer alternative or returns `null`.

## Spatial Indexing

Mine positions are stored in a **2D grid** (cell size 150 px) rebuilt each frame. This allows O(1) lookup of mines within any rectangular region, used by:

- Path corridor queries (steps 2, 6)
- Potential field calculation (step 7)
- Look-ahead simulation (step 8)

The grid wraps at screen edges — a mine at x = 5 px on a 480 px wide screen is indexed in both x = 5 and x = 485 buckets so corridor queries spanning the wrap boundary work correctly.

## Safety Predicates

| Predicate | Description |
|---|---|
| `isClearingSafe(touchPos)` | Returns true if the proposed clearing touch does not move the player toward a mine cluster |
| `isPathDangerous(direction)` | Returns true if the look-ahead simulation predicts a collision along `direction` |
| `isTouchDisturbingMines(touchPos)` | Returns true if the proposed touch would accelerate any mine toward the player |

## Interaction with Real Touch

If the user touches the screen while Autoplay is active, the AI's computed touch is overridden with the real touch position for that frame. Autoplay remains "on" — as soon as the user lifts their finger, the AI resumes.

## Output

`computeTouch()` returns one of:

- `Vector2(x, y)` — apply gravity at this screen position
- `null` — no touch this frame (coasting or cooldown)

`GravityWarpGame` passes this directly to `Player.applyGravity()` and `Mine[*].applyGravity()`, identical to a real touch.
