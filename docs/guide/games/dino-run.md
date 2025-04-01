---
layout: doc
title: Dino Run Game
description: Jump Timing Test that challenges players to avoid obstacles with precise timing
---

# Dino Run Game

A timing-based challenge inspired by the classic Chrome dinosaur game, testing precise jump timing and obstacle avoidance. Players must successfully jump over a specified number of obstacles to verify they are human.

## Game Mechanics
- Jump over obstacles by tapping or pressing space
- Time jumps precisely to avoid collisions
- Pass the required number of obstacles to verify
- Game ends if you collide with an obstacle

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'dino-run',
  difficulty: 'medium',
  config: {
    speed: 300,
    obstacleSpacing: 1500,
    targetScore: 3,
    gravity: 1500
  }
});
```

### Parameters
- `speed`: Game scroll speed (250-400)
- `obstacleSpacing`: Time between obstacles in ms (1000-2000)
- `targetScore`: Number of obstacles to pass for verification (2-5)
- `gravity`: Gravity strength affecting jump height (1000-2000)

## Difficulty Levels

### Easy
- Slower game speed (250)
- More space between obstacles (2000ms)
- Target: Pass 2 obstacles
- More forgiving hitboxes

### Medium
- Balanced speed (300)
- Standard obstacle spacing (1500ms)
- Target: Pass 3 obstacles
- Standard hitboxes

### Hard
- Fast game speed (400)
- Frequent obstacles (1000ms)
- Target: Pass 5 obstacles
- Precise hitboxes

## Security Features
- Jump timing analysis
- Reaction time measurement
- Anti-automation detection
- Input pattern recognition

## Accessibility
- Spacebar/touch controls
- Visual indicators for successful jumps
- High contrast mode
- Adjustable game speed
