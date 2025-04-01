---
layout: doc
title: Breakout Game
description: Brick Breaking Challenge that tests precision, timing, and paddle control
---

# Breakout Game

A brick-breaking challenge that tests precision, timing, and paddle control. Players must break a specified number of bricks to verify they are human.

## Game Mechanics
- Control a paddle to bounce the ball
- Break bricks by hitting them with the ball
- Avoid letting the ball fall off the bottom of the screen
- Break the required number of bricks to verify

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'breakout',
  difficulty: 'medium',
  config: {
    paddleSize: 80,
    ballSpeed: 200,
    targetScore: 5,
    brickRows: 4,
    brickCols: 6
  }
});
```

### Parameters
- `paddleSize`: Width of the paddle (60-120 pixels)
- `ballSpeed`: Speed of the ball (150-300)
- `targetScore`: Number of bricks to break for verification
- `brickRows`: Number of rows of bricks
- `brickCols`: Number of columns of bricks

## Difficulty Levels

### Easy
- Larger paddle (80px)
- Slower ball speed (150)
- Target: Break 3 bricks
- Fewer rows of bricks (3)

### Medium
- Standard paddle size (80px)
- Balanced ball speed (200)
- Target: Break 5 bricks
- Standard brick layout (4 rows)

### Hard
- Smaller paddle (60px)
- Faster ball speed (250)
- Target: Break 8 bricks
- More rows of bricks (5)

## Security Features
- Paddle movement analysis
- Impact timing verification
- Reaction time measurement
- Anti-automation detection
- Input pattern analysis

## Accessibility
- Mouse/touch controls
- Visual feedback for brick hits
- High contrast mode
- Adjustable game speed
