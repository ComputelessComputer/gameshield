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
export * from './src/types';
export * from './src/constants';
export * from './src/utils';

// Export game implementations
export * from './src/games';

// Export behavior analysis
export * from './src/behavior-analysis';

// Version information
export const VERSION = '1.0.0';
