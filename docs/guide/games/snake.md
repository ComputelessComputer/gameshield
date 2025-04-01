---
layout: doc
title: Snake Game
description: Pattern Completion Challenge where players control a snake to collect specific items
---

# Snake Game

A pattern completion challenge where players control a snake to collect specific items while avoiding others. This game tests spatial awareness, decision-making, and precise control.

## Game Mechanics
- Navigate the snake through a grid
- Collect the target food items (e.g., apples)
- Avoid the forbidden food items (e.g., bananas)
- Avoid colliding with walls, obstacles, and the snake's own body
- Collect the required number of target items to verify

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'snake',
  difficulty: 'medium',
  config: {
    gridSize: 20,
    moveInterval: 150,
    targetScore: 3,
    obstacles: 5,
    targetFoodType: 'apple',
    avoidFoodType: 'banana'
  }
});
```

### Parameters
- `gridSize`: Size of the game grid (10-30)
- `moveInterval`: Time between movements in ms (100-300)
- `targetScore`: Number of target food items to collect
- `obstacles`: Number of obstacles in the grid
- `targetFoodType`: Type of food to collect
- `avoidFoodType`: Type of food to avoid

## Difficulty Levels

### Easy
- Slower movement speed
- Fewer obstacles
- Target: Collect 2 target items
- More forgiving collision detection

### Medium
- Balanced movement speed
- Moderate number of obstacles
- Target: Collect 3 target items
- Standard collision detection

### Hard
- Faster movement speed
- More obstacles
- Target: Collect 5 target items
- Precise collision detection

## Security Features
- Movement pattern analysis
- Decision-making assessment
- Timing-based verification
- Anti-pattern detection for bot behavior

## Accessibility
- Arrow key controls
- Touch/swipe support
- Visual indicators for target and forbidden items
- High contrast mode
- Adjustable game speed
