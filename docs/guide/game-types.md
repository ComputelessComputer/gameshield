---
layout: doc
---

# Game Types

GameShield offers a variety of game-based CAPTCHA challenges, each designed to be engaging while effectively preventing automated access.

## Available Games

<div class="game-grid">
  <div class="game-card">
    <a href="/guide/games/pong" class="game-link">
      <div class="game-icon">🏓</div>
      <h3>Pong</h3>
      <p>Classic paddle-and-ball game testing reflexes and timing. Perfect for quick verifications.</p>
    </a>
  </div>
  
  <div class="game-card">
    <a href="/guide/games/snake" class="game-link">
      <div class="game-icon">🐍</div>
      <h3>Snake</h3>
      <p>Pattern-based challenge where players collect items in sequence, testing planning and control.</p>
    </a>
  </div>
  
  <div class="game-card">
    <a href="/guide/games/breakout" class="game-link">
      <div class="game-icon">🧱</div>
      <h3>Breakout</h3>
      <p>Block-breaking arcade game that tests precision and strategic planning abilities.</p>
    </a>
  </div>
  
  <div class="game-card">
    <a href="/guide/games/maze" class="game-link">
      <div class="game-icon">🌀</div>
      <h3>Maze</h3>
      <p>Dynamic maze navigation challenge testing pathfinding and spatial reasoning.</p>
    </a>
  </div>
  
  <div class="game-card">
    <a href="/guide/games/pattern" class="game-link">
      <div class="game-icon">🎯</div>
      <h3>Pattern</h3>
      <p>Memory-based challenge requiring players to recreate specific visual sequences.</p>
    </a>
  </div>
  
  <div class="game-card">
    <a href="/guide/games/dino-run" class="game-link">
      <div class="game-icon">🦖</div>
      <h3>Dino Run</h3>
      <p>Timing-based challenge requiring precise jumps and obstacle avoidance.</p>
    </a>
  </div>
  
  <div class="game-card">
    <a href="/guide/games/puzzle-slider" class="game-link">
      <div class="game-icon">🧩</div>
      <h3>Puzzle Slider</h3>
      <p>Sliding puzzle that tests spatial reasoning and planning abilities.</p>
    </a>
  </div>
  
  <div class="game-card">
    <a href="/guide/games/physics-puzzles" class="game-link">
      <div class="game-icon">⚖️</div>
      <h3>Physics Puzzles</h3>
      <p>Physics-based challenges requiring intuitive understanding of object interactions.</p>
    </a>
  </div>
  
  <div class="game-card">
    <a href="/guide/games/sequence-memory" class="game-link">
      <div class="game-icon">📝</div>
      <h3>Sequence Memory</h3>
      <p>Memory challenge testing sequence recall and attention to detail.</p>
    </a>
  </div>
</div>

<style>
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.game-card {
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  height: 100%;
}

.game-card:hover {
  background-color: var(--vp-c-bg-mute);
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.game-link {
  display: block;
  padding: 1.5rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  height: 100%;
  box-sizing: border-box;
}

.game-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.game-card h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

.game-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>

## Game Selection

GameShield automatically selects the most appropriate game type based on various factors:

### Device Capabilities
- Screen size and orientation
- Input methods available
- Processing power
- Network conditions

### User Context
- Previous verification history
- Session characteristics
- Risk assessment score
- Accessibility requirements

### Security Requirements
- Current threat level
- Site-specific settings
- Traffic patterns
- Historical attack data

## Customization

You can customize the game selection and behavior:

```typescript
const captcha = new CaptchaSDK({
  preferredGames: ['pong', 'snake'],
  excludedGames: ['maze'],
  difficulty: 'adaptive',
  accessibility: {
    highContrast: true,
    reducedMotion: false,
    audioFeedback: true
  }
});
```

### Available Options
- `preferredGames`: Prioritize specific game types
- `excludedGames`: Disable certain game types
- `difficulty`: Set fixed or adaptive difficulty
- `accessibility`: Configure accessibility features

## Implementation

For detailed configuration options and implementation guidelines, visit each game's dedicated page:

- [Pong](/guide/games/pong)
- [Snake](/guide/games/snake)
- [Breakout](/guide/games/breakout)
- [Maze](/guide/games/maze)
- [Pattern](/guide/games/pattern)
- [Dino Run](/guide/games/dino-run)
- [Puzzle Slider](/guide/games/puzzle-slider)
- [Physics Puzzles](/guide/games/physics-puzzles)
- [Sequence Memory](/guide/games/sequence-memory)
