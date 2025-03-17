---
layout: doc
title: Snake Game
description: Pattern-based challenge where players control a snake to collect specific items
---

# Snake Game

A pattern-based challenge where players control a snake to collect specific items in sequence, testing spatial awareness and planning.

## Game Mechanics
- Navigate the snake through a grid
- Collect items in a specific order
- Avoid colliding with walls and snake body
- Complete the pattern within time limit

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'snake',
  difficulty: 'medium',
  config: {
    gridSize: 15,
    speed: 150,
    targetLength: 5
  }
});
```

### Parameters
- `gridSize`: Size of the game grid (10-20)
- `speed`: Movement speed in ms (100-300)
- `targetLength`: Required snake length (3-10)

## Difficulty Levels

### Easy
- Larger grid size
- Slower movement speed
- Simple collection patterns
- More forgiving time limit

### Medium
- Standard grid size
- Balanced speed
- Mixed collection patterns
- Standard time limit

### Hard
- Smaller grid size
- Faster movement
- Complex patterns
- Strict time limit

## Security Features
- Movement pattern analysis
- Timing-based verification
- Anti-pattern detection
- Bot behavior monitoring

## Accessibility
- Arrow key controls
- Visual pattern indicators
- High contrast mode
- Adjustable game speed
