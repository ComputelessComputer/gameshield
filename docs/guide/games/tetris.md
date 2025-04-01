---
layout: doc
title: Tetris Game
description: Line Completion Challenge requiring spatial awareness and planning
---

# Tetris Game

A simplified version of the classic Tetris game, challenging users to complete at least one line to verify they are human. This game tests spatial awareness and decision-making abilities.

## Game Mechanics
- Control falling blocks to create complete horizontal lines
- Rotate and position pieces to fit efficiently
- Clear the required number of lines to verify

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'tetris',
  difficulty: 'medium',
  config: {
    fallSpeed: 5,
    targetLines: 2,
    pieceTypes: ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
  }
});
```

### Parameters
- `fallSpeed`: Speed at which pieces fall (1-10)
- `targetLines`: Number of lines required to complete verification (1-3)
- `pieceTypes`: Types of pieces to include in the game

## Difficulty Levels

### Easy
- Slower piece falling speed
- More predictable piece sequence
- Target: 1 line to clear
- Larger game board

### Medium
- Moderate falling speed
- Standard piece distribution
- Target: 2 lines to clear
- Standard game board size

### Hard
- Faster falling speed
- Challenging piece sequence
- Target: 3 lines to clear
- Smaller game board

## Security Features
- Randomized piece generation
- Timing-based behavioral analysis
- Pattern recognition for human vs. bot play styles
- Interaction density measurement

## Accessibility
- Keyboard and touch controls
- Color-blind friendly piece designs
- Adjustable game speed
- Pause functionality
