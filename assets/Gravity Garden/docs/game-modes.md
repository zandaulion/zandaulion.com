# Game Modes

## Zen Mode

- No nutrient budget limit
- Plants persist across sessions (auto-saved to JSON)
- Infinite playtime, no win/lose conditions
- Zen challenges tracked and expandable in InfoBar
- Progress saved per level across sessions

## Challenge Mode

- Starting nutrient budget: 10 (configurable)
- Each plant spawn costs 1 nutrient
- Nutrient pickups reward +10 nutrients (configurable)
- **Win condition (two phases):**
  1. Meet both goals: plants >= greeneryGoal (130) AND maturePlants >= maturityGoal (100)
  2. A portal spawns — catch it with the seed (>25% overlap) to win
- **Portal visual:** Shader-based black hole distortion with textured light blue center, swirling warp, chromatic aberration, and soft blue edge ring. Radius = 0.225 units.
- **Portal behavior:** Wanders randomly at 0.8 units/sec; only flees from seed (at 50% seed speed) when within 3.0 units (10× base seed radius). Ignores terrain, clamped to world bounds.
- **No lose condition:** running out of nutrients blocks planting but doesn't end the game; nutrients respawn individually after 120s
- Plants cleared on level entry; not saved
- Challenge progress (including portal state) persists across sessions
