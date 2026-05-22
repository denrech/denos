# Jedi Deflector

A browser-based bullet-hell game with a deflection mechanic, set in a dark neon Cyberpunk–Star Wars aesthetic.

## How to play

Open `index.html` in any modern browser. No server, no build step required.

### Controls

| Key | Action |
|-----|--------|
| WASD / Arrow keys | Move |
| Lightsaber | Auto-tracks nearest incoming bolt |
| SPACE | Force Push (after upgrade) |

### Core mechanic

Your lightsaber automatically rotates toward the nearest laser bolt. Position yourself so the saber intercepts incoming fire — the bolt deflects back at full speed and kills the enemy that fired it.

### Upgrades

On level up, choose one of three random upgrades:

- **Longer Blade** — bigger deflection zone
- **Quick Reflex** — saber tracks threats faster
- **Force Shield** — absorbs one hit every 8 seconds
- **Pierce Shot** — deflected bolts punch through multiple enemies
- **Force Spin** — every deflection triggers a brief 360° saber sweep
- **Force Healing** — regenerate 1 HP per second
- **Danger Sense** — saber auto-aims from farther away
- **Speed Boost** — move faster
- **Force Push** — [SPACE] launches all nearby bolts outward
- **Force Mastery** — +50% XP from all kills

### Enemy types

| Type | Notes |
|------|-------|
| B1 Droid | Basic, slow single shots |
| Commando Droid | Fast, rapid fire |
| Super Battle Droid | Tanky, 3-bolt burst; spawns as boss every 3 waves |

Waves escalate in enemy count and bolt speed. Survive as long as possible.
