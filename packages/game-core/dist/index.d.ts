/**
 * GameShield Game Core
 *
 * This package provides the core game engine and implementations for GameShield's
 * interactive verification system. It handles game creation, rendering, and
 * verification logic for various game types.
 *
 * @packageDocumentation
 */
export * from './src/game';
export * from './src/constants';
export * from './src/utils';
export * from './src/types';
export { GameFactory, BaseGame, PuzzleGame, BreakoutGame, SnakeGame, PongGame, DinoRunGame } from './src/games';
export * from './src/behavior-analysis';
export declare const VERSION = "1.0.0";
