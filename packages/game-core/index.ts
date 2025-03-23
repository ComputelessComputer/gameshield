/**
 * GameShield Game Core
 * 
 * This package provides the core game engine and implementations for GameShield's
 * interactive verification system. It handles game creation, rendering, and 
 * verification logic for various game types.
 * 
 * @packageDocumentation
 */

// Export core game components
export * from './src/game';
export * from './src/constants';
export * from './src/utils';

// Re-export all types and classes
export * from './src/types';

// Explicitly re-export from games to avoid ambiguity
export { 
  GameFactory,
  BaseGame,
  PuzzleGame,
  BreakoutGame,
  SnakeGame,
  PongGame,
  DinoRunGame
} from './src/games';

// Export behavior analysis
export * from './src/behavior-analysis';

// Version information
export const VERSION = '1.0.0';
