# Game Mechanics

## Physics Model

All moving objects use the same **inverse-square gravity** formula, differing only in constants:

```
force = G / distance²   (clamped to maxForce)
velocity += force * direction * delta
velocity *= damping
position += velocity * delta
```

### Object Constants

| Object | G (gravity constant) | Max force | Damping |
|---|---|---|---|
| Player | 2,500,000 | 1,500 px/s² | 0.99/frame |
| Mine | 500,000 | 150 px/s² | 0.99/frame |
| HunterMine (touch) | 500,000 | 100 px/s² | 0.99/frame |
| HunterMine (hunt) | — | 0.5 px/s² constant | 0.99/frame |

Mines receive **10% of the player's gravitational attraction** so they drift toward the touch point but don't fling dramatically.

### Screen Wrapping

All objects use **toroidal topology** — they re-enter from the opposite edge when crossing a screen boundary. The wrap uses the **shortest-path direction**: when calculating gravity, the engine checks the direct vector and all eight wrapped vectors, picking the one with the smallest distance so objects always attract across the nearest edge.

### Collision

All collision shapes are **circles**. Detection is a simple distance check against the sum of radii.

- **Player ↔ Stardust**: Triggers collection (score +1, player grows, stardust respawns)
- **Player ↔ Mine**: Triggers death sequence
- **Player ↔ HunterMine**: Triggers death sequence

---

## Player Growth

Each stardust collected grows the player's scale by **2%**:

```kotlin
scale = (scale * 1.02f).coerceAtMost(maxScale)  // maxScale = 3.0
```

The collision radius grows proportionally, making it harder to navigate crowded mine fields at high scores.

---

## Scoring & Progression

| Event | Score change |
|---|---|
| Collect stardust | +1 |
| Mine collision | Game over |

### Mine Spawning Thresholds

| Mode | New red mine every | New hunter mine every |
|---|---|---|
| Normal | 2 points | 4 points |
| Hard | 1 point | 2 points |

Mines spawn at a random position at least **120px** away from the player. Hunter mines are capped at the count implied by the score threshold — `syncHunterMines()` adds or removes hunters to match the expected count.

### High Scores

Separate high scores are kept for Normal and Hard mode, persisted via Android `SharedPreferences` (key: `highScore` / `highScoreHard`).

---

## Touch / Input

| Input | Effect |
|---|---|
| Touch and hold anywhere | Creates gravity well at touch point |
| Release | Gravity well fades over 1 second (linger) |
| Tap speaker icon | Toggle SFX |
| Tap music note icon | Toggle background music |
| Tap "A" button | Toggle AutoplayAI |
| Tap start screen hard-mode button | Enable hard mode |

During **Autoplay**, the AI supplies a synthetic touch position instead of the real touch, but the player can override by touching the screen.

---

## Death Sequence

```
1. Player touches mine
2. Explosion triggered at player + mine positions
3. Game freezes for ~0.5 s (dying state)
4. ReplayRecorder replays the last 3 seconds at real-time speed
5. Explosion plays again at end of replay
6. Highlights screen: up to 5 near-miss clips with save buttons
7. Game Over screen: final score, best score, restart
8. Player taps restart → new game begins
```

If the highlights list is empty (no near misses recorded), step 6 is skipped.

---

## Near-Miss System

A near miss is detected when the **player passes within 72–80 px of a mine** without colliding. The window is intentionally narrow to avoid false positives.

- **Pre-context**: 2 seconds of frames before the near-miss moment (pulled from the ring buffer)
- **Post-context**: 2 seconds of frames recorded after the trigger
- **Storage**: Up to 5 clips kept; older clips are discarded first if the list is full
- **Label**: "CLOSE CALL #N" with the score at the time of the near miss

Each clip can be exported as an **animated GIF** from the Highlights screen.

---

## Hard Mode

Hard mode is toggled on the Start screen. It:
- Doubles the mine spawn rate
- Doubles the hunter mine spawn rate
- Stores a separate high score
- Shows "HARD" label on the HUD score display

---

## Audio

All sounds are procedurally synthesized at startup by `AssetFactory`.

| Sound | Trigger | Description |
|---|---|---|
| `bgMusic` | Game start | 16 s looping ambient pad — A minor / F / C / G progression |
| `warpSound` | Touch begin | 150 ms whoosh descending 600→250 Hz |
| `chimeSound` | Stardust collected | 250 ms bright two-tone (E6 + B6) |
| `explosionSound` | Player death | 700 ms deep boom 80→25 Hz with sub-harmonic |

SFX and music are independently togglable and their state persists across sessions.
