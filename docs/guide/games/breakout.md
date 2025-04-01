---
layout: doc
title: Breakout Game
description: Block-breaking challenge that tests precision, timing, and strategic planning
---

# Breakout Game

A block-breaking challenge that tests precision, timing, and strategic planning through an engaging arcade-style game.

## Game Mechanics
- Control a paddle to bounce the ball
- Break blocks in specific patterns
- Maintain ball control
- Complete the pattern within time limit

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'breakout',
  difficulty: 'medium',
  config: {
    paddleSize: 100,
    ballSpeed: 5,
    blockPattern: 'random'
  }
});
```

### Parameters
- `paddleSize`: Width of the paddle (60-120 pixels)
- `ballSpeed`: Speed of the ball (1-10)
- `blockPattern`: Pattern generation type ('fixed', 'random', 'sequence')

## Difficulty Levels

### Easy
- Larger paddle
- Slower ball speed
- Simple block patterns
- Multiple balls allowed

### Medium
- Standard paddle size
- Balanced ball speed
- Mixed block patterns
- Single ball

### Hard
- Smaller paddle
- Faster ball
- Complex patterns
- Strict completion requirements

## Security Features
- Paddle movement analysis
- Impact timing verification
- Pattern completion tracking
- Anti-automation detection

## Accessibility
- Mouse/touch controls
- Visual and audio feedback
- High contrast mode
- Adjustable game speed
