/**
 * Game implementations and factory module
 *
 * This module provides various game implementations and a factory
 * for creating game instances.
 *
 * @packageDocumentation
 */
import { GameType, Difficulty } from '../types';
import { BaseGame } from './base-game';
/**
 * Game creation options
 */
export interface GameCreationOptions {
    /** PIXI Application instance */
    app: any;
    /** Game difficulty level */
    difficulty?: Difficulty;
    /** Callback when game is completed */
    onComplete?: (result: any) => void;
    /** Additional game-specific options */
    [key: string]: any;
}
/**
 * Factory for creating game instances
 */
export declare class GameFactory {
    /**
     * Create a game instance of the specified type
     *
     * @param type - Type of game to create
     * @param options - Game creation options
     * @returns Game instance
     */
    static createGame(type: GameType, options: GameCreationOptions): BaseGame;
    /**
     * Get available game types
     *
     * @returns Array of available game types
     */
    static getAvailableTypes(): GameType[];
}
export * from './base-game';
export * from './puzzle';
export * from './breakout';
export * from './snake';
export * from './pong';
export * from './dino-run';
