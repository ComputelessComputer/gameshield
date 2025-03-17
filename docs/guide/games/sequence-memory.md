# Sequence Memory Game

A memory challenge that tests recall and attention through sequence reproduction.

## Game Mechanics
- Watch sequence patterns
- Memorize order and timing
- Reproduce sequences accurately
- Complete within time limit

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'sequence-memory',
  difficulty: 'medium',
  config: {
    sequenceLength: 5,
    displayTime: 800,
    inputTimeout: 5000
  }
});
```

### Parameters
- `sequenceLength`: Length of sequence (3-8)
- `displayTime`: Time each element is shown (ms)
- `inputTimeout`: Time limit for input (ms)

## Difficulty Levels

### Easy
- Short sequences (3-4 elements)
- Longer display time
- Simple patterns
- Generous input window

### Medium
- Medium sequences (5-6 elements)
- Standard display time
- Mixed patterns
- Normal input window

### Hard
- Long sequences (7-8 elements)
- Quick display time
- Complex patterns
- Short input window

## Security Features
- Input timing analysis
- Pattern reproduction accuracy
- Anti-automation checks
- Memory test validation

## Accessibility
- Multiple input methods
- Visual and audio cues
- High contrast mode
- Adjustable timing
