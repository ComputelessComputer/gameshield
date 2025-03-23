/**
 * Base Game Class
 *
 * Abstract base class that all game implementations must extend.
 * Provides common functionality and enforces consistent interface.
 *
 * @packageDocumentation
 */
import * as PIXI from 'pixi.js';
import { GameResult, Difficulty, InteractionMetrics } from '../types';
/**
 * Configuration for a game
 */
export interface GameConfig {
    /** Width of the game area */
    width?: number;
    /** Height of the game area */
    height?: number;
    /** Background color in hex format */
    backgroundColor?: number;
    /** Game difficulty level */
    difficulty?: Difficulty;
    /** Custom assets path */
    assetsPath?: string;
    /** Callback when game is loaded */
    onLoad?: () => void;
}
/**
 * Abstract base class for all games
 */
export declare abstract class BaseGame {
    /** PIXI Application instance */
    protected app: PIXI.Application;
    /** Main container for game elements */
    protected container: PIXI.Container;
    /** Whether the game is currently running */
    protected isRunning: boolean;
    /** Whether the game has been initialized */
    protected isInitialized: boolean;
    /** Game configuration */
    protected config: Required<GameConfig>;
    /** Difficulty value (0-1) */
    protected difficultyValue: number;
    /** Game start timestamp */
    protected startTime: number;
    /** Game completion callback */
    protected onCompleteCallback: ((result: GameResult) => void) | null;
    /** Interaction metrics being collected */
    protected metrics: InteractionMetrics;
    /**
     * Create a new BaseGame instance
     *
     * @param app - PIXI Application instance
     * @param config - Game configuration
     */
    constructor(app: PIXI.Application, config?: GameConfig);
    /**
     * Initialize the game
     * Must be implemented by derived classes
     *
     * @protected
     */
    protected abstract initialize(): void;
    /**
     * Initialize resources and setup
     */
    init(): void;
    /**
     * Set up interaction tracking
     *
     * @protected
     */
    protected setupInteractionTracking(): void;
    /**
     * Start the game
     */
    start(): void;
    /**
     * Pause the game
     */
    pause(): void;
    /**
     * Resume the game
     */
    resume(): void;
    /**
     * Reset the game state
     */
    reset(): void;
    /**
     * Update game state for each animation frame
     * Must be implemented by derived classes
     *
     * @param ticker - PIXI ticker
     * @protected
     */
    protected abstract update(ticker: PIXI.Ticker): void;
    /**
     * Mount the game to a DOM container
     *
     * @param container - HTML element to mount to
     */
    mount(container: HTMLElement): void;
    /**
     * Set completion callback
     *
     * @param callback - Function to call when game completes
     */
    setCompletionCallback(callback: (result: GameResult) => void): void;
    /**
     * Complete the game and notify with result
     *
     * @param success - Whether the game was completed successfully
     * @param score - Score achieved (0-100)
     * @param gameData - Optional game-specific data
     * @protected
     */
    protected complete(success: boolean, score: number, gameData?: Record<string, any>): void;
    /**
     * Clean up and destroy game
     */
    destroy(): void;
}
