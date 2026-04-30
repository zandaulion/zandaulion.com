# Gravity Garden — TODO & Ideas

## Phase 1: Physics Prototype
- [x] 4-way gravity switching with Box2D
- [x] SeedData system (Standard, Heavy, Bouncy, Light presets)
- [x] Graybox test level with walls and platforms
- [x] Swipe gesture input for gravity flips
- [x] Fixed-timestep physics with accumulator
- [x] Add on-screen direction indicator (edge gradient glow on "down" side)
- [x] Tap-to-respawn seed at spawn point (double-tap)
- [x] Seed type selector (action bar buttons, one per seed)
- [x] Info bar (top) showing current seed name
- [x] Action bar (bottom) with seed switcher buttons + reset vegetation button
- [x] Screen layout: info bar / centered play area / action bar
- [x] Swipes/double-taps restricted to play area only
- [ ] Tuning pass: gravity magnitude, seed mass/drag/bounciness, platform layout

## Phase 2: Growth & Persistence
- [x] Fertile surface detection via Box2D fixture user data (walls 20%, platforms 70%)
- [x] ContactHandler integration — detect seed impacts on fertile surfaces
- [x] Trail logic — drop "Fertility Points" along seed trajectory
- [x] PlantData: 3 base types (Moss, Fern, Flower) + 4 seed-specific (Vine, Mushroom, Dandelion, Wisp Bloom)
- [x] Plant spawning — impact points (high density) + trail points (low density, raycast to nearest surface)
- [x] Plants grow perpendicular to surface normal (supports tilted platforms, undersides, walls)
- [x] Growth logic — plants grow on level re-entry
- [x] JSON save/load system for plant positions, types, growth levels
- [x] Pollen particle effect along seed flight path

## Phase 3: Environment & Modes
- [x] Water currents using Box2D AreaEffector-style force zones
- [ ] Wind using constant directional forces in regions
- [x] Zen Mode — no failure, infinite nutrients, free exploration (default mode)
- [x] Challenge Mode — limited nutrients per level, greenery goal, win/fail overlay
- [x] Win condition: Greenery % Threshold (plant count vs level goal)
- [x] Win conditions: Reach Portal
- [x] Win conditions: Collect X Nutrients (nutrient pickups as Box2D sensors, per-level goals)
- [x] Level select screen (4 levels: The Clearing, The Cave, The Canyon, The Labyrinth)
- [x] Multiple levels beyond TestLevel (with back button navigation)
- [x] Zen challenges — 10 low-stakes goals with toast notifications and challenge list screen

## Phase 4: Art & Juice
- [x] Replace debug renderer with sprite-based rendering
- [x] Canvas post-processing shader (grain texture, color banding, vignette)
- [x] Swirling animated background (Van Gogh Starry Night style)
- [x] Wobbly terrain edges (noise-perturbed vertices, hand-drawn feel)
- [x] Brushstroke plant rendering (overlapping elongated ellipses)
- [x] Seed shape changes per seed type (distinct visual per Standard/Heavy/Bouncy/Light)
- [x] Seed sprites and animations (pulsing glow, orbiting sparkles, squash/stretch, flowing tendrils, velocity trail)
- [x] Plant sprites with growth stage variations (sprout/growing/mature visuals, sway, particles)
- [x] Organic terrain visuals (interior brushstroke texture, edge fringe, variable outlines, per-body color variation)
- [x] Haptic feedback on gravity shifts and impacts
- [x] Reactive soundscape — pitch shifts based on seed velocity
- [x] Background music / ambient audio
- [x] Camera shake on hard impacts
- [x] Particle effects for gravity switches

## Phase 5: Polish & Content
- [x] Redo the app icon with more light blue
- [x] fix start screen scrooling
- [x] Fix the cave level
- [x] Bigger & more plants
- [x] Remember zen/challenge mode selection
- [x] Change font
- [x] More zen challenges
- [x] Revamp the challenge levels
- [ ] Help & description screens
- [x] replace ambient sounds with a downloaded version
- [x] 4 more levels
- [ ] add volume icons

## Phase 6: Organic Background Arcs
- [x] Wobbling radius (breathing) — arcs gently expand/contract with slow sine wave
- [x] Varying stroke width along arc — tapered brushstroke, thicker in middle, thinner at ends
- [x] Spiral drift — radius grows along arc span, loose spirals instead of perfect circles
- [x] Per-segment radius noise — sine-based offset per segment for wavy arc paths
- [x] Alpha fade at endpoints — opacity fades at both ends so arcs blend into background
- [x] Oscillating speed — rotation speeds up and slows down rhythmically via sine
- [x] Center drift — arc centers wander in small Lissajous/figure-eight patterns

## Open Questions
- How many persistent plants before needing texture baking on mid-range Android?
- Intelligent plant growth (pathfinding around obstacles) vs simple scaling? — leaning intelligent
- Portrait vs landscape orientation? — currently portrait
- Should gravity flip be restricted (e.g., no flipping to current direction's opposite)?

## Ideas / Nice-to-Have
- Seed unlockables — new seed types with unique physics
- Time-lapse replay of garden growing across sessions
- Seasonal plant variations
- Sharing garden screenshots
- Daily challenge levels
- Plant interactions (vines bridge gaps, flowers attract seed, thorns repel)
- Undo last gravity flip (limited uses)
- Slow-motion when seed is near a wall (bullet-time aiming)
