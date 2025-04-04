---
layout: doc
title: Available Games
description: Overview of all available game types in GameShield
---

# Available Games

GameShield offers a variety of interactive games to verify human users. Each game is designed to test different aspects of human behavior that are difficult for bots to simulate.

## Game Types

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

### [Tetris](/guide/games/tetris)

A line completion challenge requiring spatial awareness and planning.

- **Challenge Type**: Line Completion Challenge
- **Difficulty**: Adjustable falling speed and target line count
- **Verification**: Clear 1-3 lines (depending on difficulty)

## Games In Development

The following games are currently in development and will be available in future releases:

### Asteroids

A survival challenge where players control a spaceship to destroy asteroids.

- **Challenge Type**: Survival Challenge
- **Status**: In development

### Flappy Bird

A precision challenge requiring careful timing and control to navigate through gaps.

- **Challenge Type**: Precision Challenge
- **Status**: In development

### Dino Run

A timing-based challenge inspired by the classic Chrome dinosaur game, testing precise jump timing.

- **Challenge Type**: Jump Timing Challenge
- **Status**: In development

### Pac-Man

A maze navigation challenge where players collect dots while avoiding ghosts.

- **Challenge Type**: Maze Navigation Challenge
- **Status**: In development

## Selecting Game Types

You can specify which game type to use when initializing GameShield:

```typescript
import { GameShield } from "@gameshield/react";

function MyCaptcha() {
  return (
    <GameShield
      gameType="snake" // Specify game type
      difficulty="medium"
      onSuccess={(token) => console.log("Verified:", token)}
    />
  );
}
```

Available game types:
- `"snake"` - Snake game
- `"breakout"` - Breakout game
- `"tetris"` - Tetris game
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
- **Snake**: Tests decision making and spatial awareness
- **Breakout**: Tests precision and timing
- **Tetris**: Tests spatial reasoning and planning

For maximum security, use the `"random"` game type to make it harder for bots to prepare for a specific challenge.
