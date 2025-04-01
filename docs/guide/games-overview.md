---
layout: doc
title: Available Games
description: Overview of all available game types in GameShield
---

# Available Games

GameShield offers a variety of interactive games to verify human users. Each game is designed to test different aspects of human behavior that are difficult for bots to simulate.

## Game Types

### [Pong](/guide/games/pong)

A classic paddle-and-ball game testing reflexes and timing. Players must hit the ball a certain number of times to verify they are human.

- **Challenge Type**: Human Reflex Test
- **Difficulty**: Adjustable ball speed and paddle size
- **Verification**: Successfully hit the ball 3-5 times (depending on difficulty)

### [Snake](/guide/games/snake)

A pattern completion challenge where players control a snake to collect specific items while avoiding others.

- **Challenge Type**: Pattern Completion Challenge
- **Difficulty**: Adjustable movement speed and obstacle count
- **Verification**: Collect 2-5 target food items (depending on difficulty)

### [Breakout](/guide/games/breakout)

A brick-breaking challenge that tests precision, timing, and paddle control.

- **Challenge Type**: Brick Breaking Challenge
- **Difficulty**: Adjustable ball speed and paddle size
- **Verification**: Break 3-8 bricks (depending on difficulty)

### [Dino Run](/guide/games/dino-run)

A timing-based challenge inspired by the classic Chrome dinosaur game, testing precise jump timing.

- **Challenge Type**: Jump Timing Test
- **Difficulty**: Adjustable game speed and obstacle frequency
- **Verification**: Successfully jump over 2-5 obstacles (depending on difficulty)

### [Tetris](/guide/games/tetris)

A line completion challenge requiring spatial awareness and planning.

- **Challenge Type**: Line Completion Challenge
- **Difficulty**: Adjustable falling speed and target line count
- **Verification**: Clear 1-3 lines (depending on difficulty)

### [Flappy Bird](/guide/games/flappy-bird)

A precision challenge requiring careful timing and control to navigate through gaps.

- **Challenge Type**: Precision Challenge
- **Difficulty**: Adjustable game speed and gap size
- **Verification**: Successfully fly through 2-5 gaps (depending on difficulty)

### [Asteroids](/guide/games/asteroids)

A survival challenge where players control a spaceship to destroy asteroids.

- **Challenge Type**: Survival Challenge
- **Difficulty**: Adjustable asteroid speed and count
- **Verification**: Destroy 2-5 asteroids (depending on difficulty)

### [Pac-Man](/guide/games/pacman)

A maze navigation challenge where players collect dots while avoiding ghosts.

- **Challenge Type**: Maze Navigation Challenge
- **Difficulty**: Adjustable ghost speed and count
- **Verification**: Collect 5-15 dots (depending on difficulty)

## Selecting Game Types

You can specify which game type to use when initializing GameShield:

```typescript
import { GameShield } from "@gameshield/react";

function MyCaptcha() {
  return (
    <GameShield
      gameType="pong" // Specify game type
      difficulty="medium"
      onSuccess={(token) => console.log("Verified:", token)}
    />
  );
}
```

Available game types:
- `"pong"` - Pong game
- `"snake"` - Snake game
- `"breakout"` - Breakout game
- `"dino-run"` - Dino Run game
- `"tetris"` - Tetris game
- `"flappy-bird"` - Flappy Bird game
- `"asteroids"` - Asteroids game
- `"pacman"` - Pac-Man style game
- `"random"` - Randomly selects one of the available games (default)

## Random Game Selection

By default, GameShield uses the `"random"` game type, which randomly selects one of the available games. This adds an additional layer of security by making it harder for bots to prepare for a specific game type.

```typescript
<GameShield
  gameType="random" // Random game selection (default)
  difficulty="medium"
  onSuccess={(token) => console.log("Verified:", token)}
/>
```

## Customizing Games

Each game can be customized with specific configuration options. See the individual game documentation for details on available options.

## Security Considerations

Different games test different aspects of human behavior:
- **Pong**: Tests reaction time and hand-eye coordination
- **Snake**: Tests decision making and spatial awareness
- **Breakout**: Tests precision and timing
- **Dino Run**: Tests timing and rhythm
- **Tetris**: Tests spatial reasoning and planning
- **Flappy Bird**: Tests precision and reaction time
- **Asteroids**: Tests coordination and multi-tasking
- **Pac-Man**: Tests strategic planning and spatial awareness

For maximum security, use the `"random"` game type to make it harder for bots to prepare for a specific challenge.
