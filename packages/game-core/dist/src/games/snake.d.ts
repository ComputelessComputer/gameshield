/**
 * Snake Game Implementation
 *
 * A classic snake game where the player controls a snake that grows when eating food.
 *
 * @packageDocumentation
 */
import * as PIXI from 'pixi.js';
import { BaseGame } from './base-game';
/**
 * Configuration specific to Snake games
 */
export interface SnakeGameConfig {
    /** Grid size (number of cells) */
    gridSize?: number;
    /** Starting snake length */
    startLength?: number;
    /** Speed of the snake (cells per second) */
    speed?: number;
    /** Whether the snake can wrap around the edges */
    wrapAround?: boolean;
}
/**
 * Class representing a Snake game implementation
 */
export declare class SnakeGame extends BaseGame {
    /** Game specific configuration */
    private gameConfig;
    /** Snake body segments */
    private snake;
    /** Direction of movement */
    private direction;
    /** Next queued direction change */
    private nextDirection;
    /** Food position */
    private food;
    /** Graphics for rendering */
    private graphics;
    /** Cell size in pixels */
    private cellSize;
    /** Score (food eaten) */
    private score;
    /** Text display for score */
    private scoreText;
    /** Last update time for movement timing */
    private lastUpdateTime;
    /**
     * Create a new SnakeGame instance
     *
     * @param options - Game creation options
     */
    constructor(options: any);
    /**
     * Initialize the snake game
     *
     * @protected
     */
    protected initialize(): void;
    /**
     * Update game state on each frame
     *
     * @param ticker - PIXI ticker
     * @protected
     */
    protected update(ticker: PIXI.Ticker): void;
    /**
     * Get grid size based on difficulty
     *
     * @returns Grid size (number of cells)
     * @private
     */
    private getDifficultyBasedGridSize;
    /**
     * Get starting snake length based on difficulty
     *
     * @returns Starting length of snake
     * @private
     */
    private getDifficultyBasedStartLength;
    /**
     * Get snake speed based on difficulty
     *
     * @returns Speed in cells per second
     * @private
     */
    private getDifficultyBasedSpeed;
    /**
     * Get whether wrap around is enabled based on difficulty
     *
     * @returns Whether wrap around is enabled
     * @private
     */
    private getDifficultyBasedWrapAround;
}
