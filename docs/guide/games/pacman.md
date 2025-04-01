---
layout: doc
title: Pac-Man Style Game
description: Maze navigation challenge where players collect dots while avoiding ghosts
---

# 👾 Pac-Man Style Game

The Pac-Man style game is a maze navigation challenge where players must collect dots while avoiding ghosts to verify they are human.

## Game Mechanics

In this game:

1. Players control a character that navigates through a maze
2. The maze contains dots that the player must collect
3. Ghosts patrol the maze and will end the verification if they catch the player
4. Players must collect a target number of dots to pass the verification

## Controls

- **Arrow Keys**: Move the player character
- **Touch/Swipe**: Change direction (mobile/touch devices)

## Verification Process

The verification is successful when:

- The player collects the target number of dots (varies by difficulty)
- The player completes the challenge without being caught by ghosts

## Configuration Options

The Pac-Man style game can be configured with the following options:

```typescript
{
  gameType: "pacman",
  difficulty: "medium", // "easy", "medium", or "hard"
  theme: "dark", // Optional: "light" or "dark"
  timeLimit: 30, // Optional: time limit in seconds
  accessibility: {
    reducedMotion: false, // Optional: reduces motion effects
    highContrast: false // Optional: enhances visibility
  }
}
```

## Difficulty Levels

The game offers three difficulty levels:

### Easy
- Target: Collect 5 dots
- Slower ghost movement
- Only 1 ghost
- Longer ghost movement intervals

### Medium (Default)
- Target: Collect 10 dots
- Medium ghost speed
- 2 ghosts
- Standard ghost movement intervals

### Hard
- Target: Collect 15 dots
- Faster ghost movement
- 3 ghosts
- Shorter ghost movement intervals

## Security Features

The Pac-Man style game includes several security features to prevent automation:

1. **Random Dot Placement**: Each game session generates a unique pattern of dots
2. **Dynamic Ghost Behavior**: Ghosts use a combination of random and pursuit movement patterns
3. **Behavior Analysis**: The system analyzes player movement patterns to detect bot-like behavior
4. **Timing Verification**: Completions that are too quick or with inhuman precision are flagged
5. **Anti-Automation Measures**: The game includes measures to prevent programmatic solutions

## Accessibility

The game includes accessibility options:

- **Reduced Motion**: Slows down ghost movement
- **High Contrast Mode**: Enhances visibility of game elements
- **Keyboard Controls**: Full keyboard navigation support

## Implementation Example

```typescript
import { GameShield } from "@gameshield/react";

function MyCaptcha() {
  return (
    <GameShield
      gameType="pacman"
      difficulty="medium"
      onSuccess={(token) => console.log("Verified:", token)}
      onFailure={(reason) => console.log("Failed:", reason)}
    />
  );
}
```
