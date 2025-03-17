# Maze Game

A procedurally generated maze challenge that tests pathfinding and spatial reasoning abilities.

## Game Mechanics
- Navigate through dynamic mazes
- Find the optimal path to exit
- Avoid dead ends and traps
- Complete within time limit

## Configuration

```typescript
const captcha = new CaptchaSDK({
  gameType: 'maze',
  difficulty: 'medium',
  config: {
    mazeSize: 10,
    timeLimit: 30,
    fogOfWar: false
  }
});
```

### Parameters
- `mazeSize`: Size of the maze grid (8-15)
- `timeLimit`: Time to complete in seconds (20-60)
- `fogOfWar`: Limited visibility mode (boolean)

## Difficulty Levels

### Easy
- Smaller maze size
- Simple path layouts
- No fog of war
- Generous time limit

### Medium
- Medium maze size
- Balanced complexity
- Optional fog of war
- Standard time limit

### Hard
- Large maze size
- Complex layouts
- Mandatory fog of war
- Strict time limit

## Security Features
- Movement pattern analysis
- Path optimization tracking
- Anti-bot navigation detection
- Time-based verification

## Accessibility
- Arrow key/WASD controls
- High contrast walls
- Path highlighting option
- Audio feedback cues
