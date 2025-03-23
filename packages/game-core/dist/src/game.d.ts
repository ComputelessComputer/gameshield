/**
 * Core Game class for GameShield
 *
 * Handles game creation, lifecycle management, and event handling
 *
 * @packageDocumentation
 */
import { GameOptions, GameResult, GameEventType, GameEventHandler, GameType } from './types';
/**
 * Main Game controller class
 *
 * Manages game lifecycle, rendering, and event handling
 */
export declare class Game {
    /** PIXI Application instance */
    private app;
    /** Current active game implementation */
    private currentGame;
    /** Game options with defaults applied */
    private options;
    /** HTML container element */
    private container;
    /** Event handlers mapped by event type */
    private eventHandlers;
    /** Interaction metrics being collected */
    private metrics;
    /** Whether the game is currently running */
    private isRunning;
    /** Whether initialization has completed */
    private isInitialized;
    /**
     * Create a new Game instance
     *
     * @param options - Game configuration options
     */
    constructor(options?: GameOptions);
    /**
     * Mount the game to a DOM container
     *
     * @param container - HTML element or element ID to mount the game
     * @throws Error if container element is not found
     */
    mount(container: HTMLElement | string): void;
    /**
     * Initialize the game
     *
     * Creates PIXI application and sets up event listeners
     * @private
     */
    private initialize;
    /**
     * Initialize the selected game implementation
     * @private
     */
    private initializeGame;
    /**
     * Apply scaling mode to the game canvas
     * @private
     */
    private applyScaling;
    /**
     * Handle window resize event
     * @private
     */
    private handleResize;
    /**
     * Set up interaction tracking
     * @private
     */
    private setupInteractionTracking;
    /**
     * Handle game completion
     *
     * @param result - Result object from the game implementation
     * @private
     */
    private handleGameComplete;
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
     * Reset the game
     */
    reset(): void;
    /**
     * Change the game type
     *
     * @param gameType - New game type
     */
    changeGameType(gameType: GameType): void;
    /**
     * Register an event handler
     *
     * @param event - Event type to listen for
     * @param handler - Event handler function
     * @returns The game instance for chaining
     */
    on(event: GameEventType, handler: GameEventHandler): Game;
    /**
     * Remove an event handler
     *
     * @param event - Event type
     * @param handler - Handler to remove (optional, removes all if not specified)
     * @returns The game instance for chaining
     */
    off(event: GameEventType, handler?: GameEventHandler): Game;
    /**
     * Register a one-time event handler
     *
     * @param event - Event type to listen for
     * @param handler - Event handler function
     * @returns The game instance for chaining
     */
    once(event: GameEventType, handler: GameEventHandler): Game;
    /**
     * Emit an event
     *
     * @param event - Event type to emit
     * @param data - Event data
     * @private
     */
    private emit;
    /**
     * Set callback for game completion
     *
     * @param callback - Function to call when game completes
     * @deprecated Use on('complete', callback) instead
     */
    onComplete(callback: (result: GameResult) => void): void;
    /**
     * Clean up and destroy the game
     */
    destroy(): void;
}
/**
 * Helper function to create a new Game instance
 *
 * @param options - Game options
 * @returns New Game instance
 */
export declare function createGame(options: GameOptions): Game;
