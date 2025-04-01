# @gameshield/core

The `@gameshield/core` package is the foundation of the GameShield system. It contains all the essential logic for game generation, behavior analysis, and token management without any UI dependencies.

## Installation

```bash
# Using npm
npm install @gameshield/core

# Using yarn
yarn add @gameshield/core

# Using pnpm
pnpm add @gameshield/core
```

## Key Features

- **Game Factory**: Creates and manages game instances
- **Behavior Analysis**: Detects human vs bot interaction patterns
- **Token Management**: Generates and handles verification tokens
- **Framework Agnostic**: Can be used with any UI framework

## Usage

The core package can be used directly if you want to build a custom UI or integrate with a framework other than React.

```javascript
import { GameFactory, BehaviorAnalyzer, TokenManager } from '@gameshield/core';

// Create a behavior analyzer
const behaviorAnalyzer = new BehaviorAnalyzer();
behaviorAnalyzer.startTracking();

// Create a game instance
const gameInstance = GameFactory.createGame('pong', {
  difficulty: 'medium',
  onComplete: (result) => {
    if (result.success) {
      // Get behavior analysis results
      const behaviorResult = behaviorAnalyzer.analyze();
      
      // Generate verification token
      const token = TokenManager.generateToken({
        gameType: 'pong',
        difficulty: 'medium',
        score: result.score,
        time: result.time || 0,
        behaviorMetrics: {
          isHuman: behaviorResult.isHuman,
          confidence: behaviorResult.confidence
        }
      });
      
      console.log('Verification successful:', token);
    } else {
      console.log('Verification failed');
    }
  }
});

// Mount the game to a container
const container = document.getElementById('game-container');
gameInstance.mount(container);
```

## Core Modules

### Game Factory

The Game Factory is responsible for creating game instances based on the specified type and options.

```javascript
import { GameFactory } from '@gameshield/core';

const gameInstance = GameFactory.createGame(gameType, options);
```

#### Parameters

- `gameType` (string): The type of game to create ('pong', 'snake', 'breakout', 'dino-run', or 'random')
- `options` (object): Configuration options for the game
  - `difficulty` (string): The difficulty level ('easy', 'medium', or 'hard')
  - `onComplete` (function): Callback function called when the game is completed
  - `app` (object, optional): PixiJS application instance (if not provided, one will be created)

#### Return Value

Returns a game instance with the following methods:

- `mount(container)`: Mounts the game to the specified container
- `destroy()`: Cleans up the game instance
- `resize(width, height)`: Resizes the game (if supported)

### Behavior Analyzer

The Behavior Analyzer tracks and analyzes user interaction patterns to determine if the user is human.

```javascript
import { BehaviorAnalyzer } from '@gameshield/core';

const analyzer = new BehaviorAnalyzer();
analyzer.startTracking();

// Later, analyze the collected data
const result = analyzer.analyze();
console.log('Is human:', result.isHuman);
console.log('Confidence:', result.confidence);
```

#### Methods

- `startTracking()`: Starts tracking user behavior
- `stopTracking()`: Stops tracking user behavior
- `reset()`: Resets the analyzer
- `analyze()`: Analyzes the collected data and returns a result

#### Analysis Result

The analysis result contains:

- `isHuman` (boolean): Whether the user is likely human
- `confidence` (number): Confidence level (0-1) of the determination

### Token Manager

The Token Manager generates and handles verification tokens.

```javascript
import { TokenManager } from '@gameshield/core';

const token = TokenManager.generateToken(payload);
```

#### Methods

- `generateToken(payload)`: Generates a verification token
- `generateSessionId()`: Generates a unique session ID

#### Payload Structure

The token payload includes:

- `sub` (string): Subject identifier (usually a session ID)
- `data` (object): Verification data
  - `gameType` (string): Type of game played
  - `difficulty` (string): Difficulty level
  - `score` (number): Game score
  - `time` (number): Time taken to complete the game
  - `behaviorMetrics` (object): Behavior analysis results
    - `isHuman` (boolean): Whether the user is likely human
    - `confidence` (number): Confidence level

## Advanced Usage

### Custom Game Implementation

You can create custom game implementations by extending the base game class:

```javascript
import { BaseGame } from '@gameshield/core';

class MyCustomGame extends BaseGame {
  constructor(options) {
    super(options);
  }
  
  init() {
    // Initialize your game
  }
  
  // Override other methods as needed
}

// Register your custom game
GameFactory.registerGame('my-custom-game', MyCustomGame);
```

### Custom Behavior Analysis

You can customize the behavior analysis by providing your own metrics:

```javascript
import { BehaviorAnalyzer } from '@gameshield/core';

const analyzer = new BehaviorAnalyzer({
  // Custom thresholds
  movementSmoothnessThreshold: 0.7,
  reactionTimeThreshold: 300,
  interactionDensityThreshold: 0.5,
  patternVariabilityThreshold: 0.6
});
```

## Integration with UI Frameworks

While the `@gameshield/react` package provides a ready-to-use React implementation, you can use the core package with any UI framework:

### Vue.js Example

```javascript
// MyGameComponent.vue
<template>
  <div>
    <div ref="gameContainer" class="game-container"></div>
    <div v-if="isVerified" class="success-badge">✓ Verified</div>
  </div>
</template>

<script>
import { GameFactory, BehaviorAnalyzer, TokenManager } from '@gameshield/core';

export default {
  data() {
    return {
      gameInstance: null,
      behaviorAnalyzer: new BehaviorAnalyzer(),
      isVerified: false,
      token: null
    };
  },
  mounted() {
    this.startVerification();
  },
  beforeUnmount() {
    this.stopVerification();
  },
  methods: {
    startVerification() {
      this.behaviorAnalyzer.startTracking();
      
      this.gameInstance = GameFactory.createGame('random', {
        difficulty: 'medium',
        onComplete: this.handleGameCompletion
      });
      
      this.gameInstance.mount(this.$refs.gameContainer);
    },
    stopVerification() {
      if (this.gameInstance) {
        this.gameInstance.destroy();
        this.gameInstance = null;
      }
      
      this.behaviorAnalyzer.stopTracking();
    },
    handleGameCompletion(result) {
      if (result.success) {
        const behaviorResult = this.behaviorAnalyzer.analyze();
        
        this.token = TokenManager.generateToken({
          sub: TokenManager.generateSessionId(),
          data: {
            gameType: 'random',
            difficulty: 'medium',
            score: result.score,
            time: result.time || 0,
            behaviorMetrics: {
              isHuman: behaviorResult.isHuman,
              confidence: behaviorResult.confidence
            }
          }
        });
        
        this.isVerified = true;
        this.$emit('success', this.token);
      } else {
        this.$emit('failure', 'Game failed');
      }
    },
    reset() {
      this.stopVerification();
      this.isVerified = false;
      this.token = null;
      this.behaviorAnalyzer.reset();
      this.startVerification();
    }
  }
};
</script>
```

## Next Steps

- Explore the [@gameshield/react](/guide/packages/react) package for React integration
- Learn about [server-side verification](/guide/packages/server) with the server package
