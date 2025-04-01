# Dino Run Game

A timing-based challenge inspired by the classic Chrome dinosaur game, testing precise jump timing and obstacle avoidance.

## Game Mechanics
- Jump over obstacles
- Duck under flying objects
- Time jumps precisely
- Maintain rhythm and focus

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'dino-run',
  difficulty: 'medium',
  config: {
    speed: 8,
    obstacleFrequency: 1.5,
    jumpHeight: 150
  }
});
```

### Parameters
- `speed`: Game scroll speed (5-12)
- `obstacleFrequency`: Obstacle spawn rate (1-2)
- `jumpHeight`: Maximum jump height (100-200)

## Difficulty Levels

### Easy
- Slower game speed
- Fewer obstacles
- More forgiving hitboxes
- Simple obstacle patterns

### Medium
- Balanced speed
- Regular obstacles
- Standard hitboxes
- Mixed patterns

### Hard
- Fast game speed
- Frequent obstacles
- Precise hitboxes
- Complex patterns

## Security Features
- Jump timing analysis
- Pattern recognition
- Anti-automation detection
- Rhythm verification

## Accessibility
- Spacebar/touch controls
- Visual jump indicators
- Audio cues
- Adjustable game speed
