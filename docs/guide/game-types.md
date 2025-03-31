---
layout: doc
---

# Game Types

GameShield offers a variety of game-based CAPTCHA challenges, each designed to be engaging while effectively preventing automated access.

## Core Game Types

GameShield currently includes four primary game types that provide a balance of user engagement and security:

<div class="game-grid">
  <div class="game-card">
    <div class="game-link">
      <div class="game-icon">🏓</div>
      <h3>Pong</h3>
      <p>Classic paddle-and-ball game testing reflexes and timing. Perfect for quick verifications with minimal complexity.</p>
    </div>
  </div>
  
  <div class="game-card">
    <div class="game-link">
      <div class="game-icon">🐍</div>
      <h3>Snake</h3>
      <p>Pattern-based challenge where players collect items in sequence, testing planning and control abilities.</p>
    </div>
  </div>
  
  <div class="game-card">
    <div class="game-link">
      <div class="game-icon">🧱</div>
      <h3>Breakout</h3>
      <p>Block-breaking arcade game that tests precision and strategic planning abilities while maintaining user engagement.</p>
    </div>
  </div>
  
  <div class="game-card">
    <div class="game-link">
      <div class="game-icon">🦖</div>
      <h3>Dino Run</h3>
      <p>Timing-based challenge requiring precise jumps and obstacle avoidance, inspired by the popular offline browser game.</p>
    </div>
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

GameShield allows you to specify which game type to use or set it to "random" for automatic selection:

```jsx
// React component with specific game type
<GameShield
  gameType="pong"
  size="400px"
  onSuccess={handleSuccess}
/>

// Core API with random game selection
const gameShield = createGameShield({
  container: document.getElementById('captcha-container'),
  gameType: 'random',
  size: '400px',
  onSuccess: handleSuccess
});
```

### Game Type Options

The `gameType` property accepts the following values:

| Value | Description |
|-------|-------------|
| `"pong"` | Classic paddle-and-ball game |
| `"snake"` | Snake movement and collection game |
| `"breakout"` | Block-breaking arcade game |
| `"dino-run"` | Obstacle jumping game |
| `"random"` | Randomly selects one of the available games |

## Difficulty Levels

Each game can be configured with different difficulty levels to balance security and user experience:

```jsx
// React component with easy difficulty
<GameShield
  gameType="snake"
  difficulty="easy"
  size="400px"
  onSuccess={handleSuccess}
/>
```

### Difficulty Options

The `difficulty` property accepts the following values:

| Value | Description |
|-------|-------------|
| `"easy"` | Lower challenge level, suitable for most users |
| `"medium"` | Balanced difficulty (default) |
| `"hard"` | Higher challenge level for enhanced security |

## Game Behavior

All games in GameShield share common characteristics:

1. **1:1 Aspect Ratio**: All games maintain a perfect square aspect ratio for consistent display
2. **Responsive Design**: Games adapt to the specified size while maintaining playability
3. **Touch Support**: All games work with both mouse and touch input
4. **Behavior Analysis**: User interactions during gameplay are analyzed for bot detection
5. **Completion Criteria**: Each game has specific objectives that must be met for verification

## Implementation

### React Component

```jsx
import React, { useState } from 'react';
import { GameShield } from '@gameshield/react';

function CaptchaForm() {
  const [token, setToken] = useState(null);
  
  return (
    <div>
      <GameShield
        size="450px"
        gameType="random"
        difficulty="medium"
        onSuccess={(token) => {
          setToken(token);
          console.log('Verification successful!');
        }}
        onFailure={(reason) => {
          console.log('Verification failed:', reason);
        }}
      />
      
      <button disabled={!token}>Submit</button>
    </div>
  );
}
```

### Core API

```javascript
import { createGameShield } from '@gameshield/core';

const container = document.getElementById('captcha-container');

const gameShield = createGameShield({
  container,
  size: '400px',
  gameType: 'breakout',
  difficulty: 'medium',
  onSuccess: (token) => {
    console.log('Verification successful!', token);
    document.getElementById('submit-button').disabled = false;
  },
  onFailure: (reason) => {
    console.log('Verification failed:', reason);
  }
});

// To destroy the instance when no longer needed
function cleanup() {
  if (gameShield) {
    gameShield.destroy();
  }
}
```

## Accessibility Considerations

GameShield games are designed with accessibility in mind:

- **Keyboard Support**: All games can be played using keyboard controls
- **Color Contrast**: Visual elements maintain sufficient contrast ratios
- **Motion Reduction**: Games respect the user's reduced motion preferences when possible
- **Alternative Games**: Different game types accommodate various user abilities

## Future Game Types

The GameShield team is continuously developing new game types to enhance both security and user experience. Future releases will include additional games that provide even more variety and challenge types.
