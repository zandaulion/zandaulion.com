# Screens & Navigation

## Screen Hierarchy

1. **LevelSelectScreen** (Entry Point)
   - 8 levels in a 2-column scrollable grid with GL scissor clipping
   - Mode toggle: Zen / Challenge (fixed below title)
   - Level previews with beveled wooden frames, gilded inner lips, wood grain
   - Dev button (bottom-right corner) → DevScreen
   - Scroll: vertical drag with 10px threshold, clamped to content bounds

2. **GameScreen** (Main Gameplay)
   - FitViewport: 10×18 world units, centered between top and bottom bars
   - Top bar (InfoBar): mode-dependent status display
   - Bottom bar (ActionBar): 4 seed buttons + reset button
   - HUD scaled by `Gdx.graphics.density × (screenHeight / 800)`, range 0.8–3×

3. **ResultOverlay** (Challenge Mode Completion)
   - Semi-transparent overlay (0.3 alpha dim, 0.5 alpha card and text)
   - "Garden Complete!" (win) or "Nutrients Depleted" (lose)
   - Subtitle: "Tap to continue" → returns to LevelSelectScreen
   - Blocks all input while active

4. **DevScreen** (Parameter Tuning)
   - Scrollable list of 31 parameters with sliders and editable text fields
   - Header: Reset All, Back, Copy (exports changed values to clipboard)
   - Native Android text input via `Gdx.input.getTextInput()`
   - GL scissor clipping for scroll area

---

## HUD Details

### InfoBar (Top)

**Zen mode:**
- Left: Back button + Seed name
- Right: Challenge count (e.g., "5/20"), tap to expand 2-column list
- Completed challenges shown with gold checkmark, incomplete with gray dot

**Challenge mode:**
- Left: Back button + Seed name
- Right: "Seeds: N" (turns red when < 5), zen milestone count (e.g., "5/20") to its left
- Tap zen count to expand 2-column challenge list (same as zen mode)
- Two right-aligned progress bars (45% width):
  - Top (gold): Plants [count]/[greeneryGoal]
  - Bottom (green): Mature [count]/[maturityGoal]
- Labels at 0.28× scale (30% smaller)

### ActionBar (Bottom)

- 80% width: 4 seed buttons with custom icons matching seed colors
  - Standard: Purple glow circle with sparkle
  - Heavy: Amber diamond with dark glow
  - Bouncy: Green star with 6 spikes
  - Light: Blue wisp with tendrils
- 20% width: Red X reset button
- Selected seed: darker tan background; unselected: dark gray

### Height Scaling

- Base: 28px (no challenge) or 36px (challenge mode)
- Expanded: Base + (row count / 2) × 11px + 4px
- Scale multiplier: density × (height / 800)

### Colors

- Bar background: (0.05, 0.06, 0.05, 1)
- Back button: (0.15, 0.18, 0.15, 1)
- Text/icons: (0.95, 0.8, 0.4, 1)
