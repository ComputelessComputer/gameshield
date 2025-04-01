---
layout: doc
title: Flappy Bird Game
description: Precision Challenge requiring careful timing and control
---

# Flappy Bird Game

A precision-based challenge inspired by the popular Flappy Bird game. Users must navigate through gaps in pipes without colliding, testing their timing and control abilities.

## Game Mechanics
- Tap or click to make the bird flap and gain altitude
- Navigate through gaps in pipes
- Pass through the required number of pipes to verify
- Avoid collisions with pipes and the ground/ceiling

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'flappy-bird',
  difficulty: 'medium',
  config: {
    speed: 5,
    gapSize: 150,
    targetScore: 3,
    gravity: 1000
  }
});
```

### Parameters
- `speed`: Horizontal speed of the game (1-10)
- `gapSize`: Size of the gaps between pipes (pixels)
- `targetScore`: Number of pipes to pass through for verification
- `gravity`: Strength of gravity affecting the bird

## Difficulty Levels

### Easy
- Slower game speed
- Larger gaps between pipes
- Target: Pass through 2 pipes
- More forgiving collision detection

### Medium
- Moderate game speed
- Standard-sized gaps
- Target: Pass through 3 pipes
- Normal collision detection

### Hard
- Faster game speed
- Narrower gaps between pipes
- Target: Pass through 5 pipes
- Precise collision detection

## Security Features
- Randomized pipe placement
- Timing analysis of player inputs
- Pattern recognition for human vs. bot behavior
- Reaction time measurement

## Accessibility
- Simple one-button control scheme
- Visual indicators for successful passage
- Adjustable game speed
- High contrast mode option
