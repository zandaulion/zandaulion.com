# Seeds (4 Types)

Base radius: 0.3 units. All physics values set from DevParams at level start.

| Seed | Mass | Drag | Bounciness | Radius Scale | Visual Style |
|---|---|---|---|---|---|
| **Standard** | 0.5 | 0.6 | 0.6 | 1.0× | Purple pulsing orb + 3 orbiting sparkles |
| **Heavy** | 6.6 | 0.2 | 0.3 | 1.0× | Amber diamond core + wobble + radial cracks |
| **Bouncy** | 2.2 | 0.4 | 1.0 | 1.0× | Green 6-spike star + squash/stretch on velocity |
| **Light** | 0.57 | 12.5 | 0.4 | 0.5× | Blue breathing glow + 3 tendrils + 5 shimmer particles |

## Physics Properties

- Angular damping: 1.0 (all types)
- Fixture friction: 0.3
- Density calculated as: mass / (π × radius²)

## Trail System

Particles spawn based on speed:
- Emit rate: 0.02s (fast) / 0.06s (slow)
- Max particles: 30
- Particle life: 0.3s + speed × 0.05s
