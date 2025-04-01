---
layout: doc
title: Pong Game
description: Classic paddle-and-ball game testing reflexes and timing
---

# Pong Game

A classic paddle-and-ball game testing reflexes and timing. Players must defend their side while trying to score points.

## Game Mechanics
- Control a paddle to hit the ball
- Score points by getting the ball past the opponent
- First to reach the target score wins

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'pong',
  difficulty: 'medium',
  config: {
    paddleSpeed: 5,
    ballSpeed: 7,
    winScore: 3
  }
});
```

### Parameters
- `paddleSpeed`: Movement speed of the paddle (1-10)
- `ballSpeed`: Speed of the ball (1-10)
- `winScore`: Points needed to win (1-5)

## Difficulty Levels

### Easy
- Slower ball movement
- Larger paddle size
- More forgiving hit detection
- Target score: 2 points

### Medium
- Balanced ball speed
- Standard paddle size
- Normal hit detection
- Target score: 3 points

### Hard
- Faster ball movement
- Smaller paddle size
- Precise hit detection required
- Target score: 4 points

## Security Features
- Dynamic ball trajectory patterns
- Timing-based behavioral analysis
- Anti-automation measures
- Pattern recognition for bot detection

## Accessibility
- Keyboard controls support
- High contrast mode available
- Adjustable game speed
- Audio feedback options
