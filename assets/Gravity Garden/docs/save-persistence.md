# Save & Persistence

## Plant Data (Zen Mode)

- File: `saves/level_[levelID].json`
- Saved on: level exit, app pause
- Contains: PlantInstance list (type, position, normal, growthLevel, timestamp)
- Loaded plants get `smoothProgress = 1f` (skip animation)

## Challenge Progress

- File: `saves/challenge_[levelID].json`
- Saved on: level exit, app pause (while challenge is in progress)
- Deleted on: challenge completion (win) or manual reset
- Contains: plants, nutrients, nutrientsCollected, growthTimer, fertilityTimer, per-pickup collected/respawnTimer state
- Resuming a challenge restores full game state including pickup availability

## Zen Challenge Progress

- File: `saves/zen_challenges.json`
- Format: JSON array of `"levelID:CHALLENGE_NAME"` strings
- Persists across all sessions

## Game Mode Selection

- Preferences: `"gravity_garden"` → `"mode"` (ZEN or CHALLENGE)

## Dev Parameters

- Preferences: `"dev_params"` → individual float values
- Loaded on app startup, saved on modification in DevScreen
