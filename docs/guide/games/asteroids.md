---
layout: doc
title: Asteroids Game
description: Survival challenge where players control a spaceship to destroy asteroids
---

# 🚀 Asteroids Game

The Asteroids game is a survival challenge where players control a spaceship and must destroy a specific number of asteroids to verify they are human.

## Game Mechanics

In this game:

1. Players control a spaceship that can rotate and move in the direction it's facing
2. Asteroids float around the screen with random movement patterns
3. Players must shoot and destroy a target number of asteroids to pass the verification
4. If the player's ship collides with an asteroid, the verification fails

## Controls

- **Arrow Keys**: Control the spaceship (left/right to rotate, up to thrust)
- **Space Bar**: Fire bullets
- **Touch/Click**: Fire bullets (mobile/touch devices)

## Verification Process

The verification is successful when:

- The player destroys the target number of asteroids (varies by difficulty)
- The player completes the challenge without colliding with any asteroids

## Configuration Options

The Asteroids game can be configured with the following options:

```typescript
{
  gameType: "asteroids",
  difficulty: "medium", // "easy", "medium", or "hard"
  theme: "dark", // Optional: "light" or "dark"
  timeLimit: 30, // Optional: time limit in seconds
  accessibility: {
    reducedMotion: false // Optional: reduces motion effects
  }
}
```

## Difficulty Levels

The game offers three difficulty levels:

### Easy
- Target: Destroy 2 asteroids
- Slower asteroid movement
- Fewer asteroids on screen

### Medium (Default)
- Target: Destroy 3 asteroids
- Medium asteroid speed
- Moderate number of asteroids

### Hard
- Target: Destroy 5 asteroids
- Faster asteroid movement
- More asteroids on screen

## Security Features

The Asteroids game includes several security features to prevent automation:

1. **Random Asteroid Patterns**: Each game session generates unique asteroid movement patterns
2. **Behavior Analysis**: The system analyzes player movement patterns to detect bot-like behavior
3. **Timing Verification**: Completes too quickly or with inhuman precision are flagged
4. **Anti-Automation Measures**: The game includes measures to prevent programmatic solutions

## Accessibility

The game includes accessibility options:

- **Reduced Motion**: Reduces the movement speed of asteroids
- **High Contrast Mode**: Enhances visibility of game elements
- **Keyboard Controls**: Full keyboard navigation support

## Implementation Example

```typescript
import { GameShield } from "@gameshield/react";

function MyCaptcha() {
  return (
    <GameShield
      gameType="asteroids"
      difficulty="medium"
      onSuccess={(token) => console.log("Verified:", token)}
      onFailure={(reason) => console.log("Failed:", reason)}
    />
  );
}
```
