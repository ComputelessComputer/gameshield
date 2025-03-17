# Puzzle Slider Game

A classic sliding puzzle challenge that tests spatial reasoning and planning through tile rearrangement.

## Game Mechanics
- Slide tiles to correct positions
- Plan moves in advance
- Complete the pattern
- Optimize move count

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'puzzle-slider',
  difficulty: 'medium',
  config: {
    gridSize: 3,
    timeLimit: 45,
    shuffleComplexity: 20
  }
});
```

### Parameters
- `gridSize`: Size of the puzzle grid (2-4)
- `timeLimit`: Time to complete in seconds (30-90)
- `shuffleComplexity`: Number of random moves (15-30)

## Difficulty Levels

### Easy
- 2x2 grid size
- Simple patterns
- Fewer initial moves
- Generous time limit

### Medium
- 3x3 grid size
- Mixed patterns
- Standard shuffle
- Balanced time limit

### Hard
- 4x4 grid size
- Complex patterns
- Many initial moves
- Strict time limit

## Security Features
- Move pattern analysis
- Solution path tracking
- Anti-automation checks
- Time-based verification

## Accessibility
- Arrow key controls
- Visual move guides
- High contrast tiles
- Audio feedback
