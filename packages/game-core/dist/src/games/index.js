/**
 * Game implementations and factory module
 *
 * This module provides various game implementations and a factory
 * for creating game instances.
 *
 * @packageDocumentation
 */
import { randomGameType } from '../utils';
// Import game implementations
import { PuzzleGame } from './puzzle';
import { BreakoutGame } from './breakout';
import { SnakeGame } from './snake';
import { PongGame } from './pong';
import { DinoRunGame } from './dino-run';
/**
 * Factory for creating game instances
 */
export class GameFactory {
    /**
     * Create a game instance of the specified type
     *
     * @param type - Type of game to create
     * @param options - Game creation options
     * @returns Game instance
     */
    static createGame(type, options) {
        // If type is random, pick a random game type
        if (type === 'random') {
            type = randomGameType();
        }
        // Create the specified game type
        switch (type) {
            case 'puzzle':
                return new PuzzleGame(options);
            case 'breakout':
                return new BreakoutGame(options);
            case 'snake':
                return new SnakeGame(options);
            case 'pong':
                return new PongGame(options);
            case 'dino-run':
                return new DinoRunGame(options);
            default:
                // Default to puzzle game
                return new PuzzleGame(options);
        }
    }
    /**
     * Get available game types
     *
     * @returns Array of available game types
     */
    static getAvailableTypes() {
        return ['puzzle', 'breakout', 'snake', 'pong', 'dino-run'];
    }
}
// Export game implementations
export * from './base-game';
export * from './puzzle';
export * from './breakout';
export * from './snake';
export * from './pong';
export * from './dino-run';
