/**
 * Breakout Game Implementation
 *
 * A classic brick-breaking game where players control a paddle to bounce a ball
 * and break bricks.
 *
 * @packageDocumentation
 */
import * as PIXI from 'pixi.js';
import { BaseGame } from './base-game';
/**
 * Configuration specific to Breakout games
 */
export interface BreakoutGameConfig {
    /** Number of rows of bricks */
    rows?: number;
    /** Number of columns of bricks */
    columns?: number;
    /** Ball speed multiplier */
    ballSpeed?: number;
    /** Paddle width */
    paddleWidth?: number;
}
/**
 * Class representing a Breakout game implementation
 */
export declare class BreakoutGame extends BaseGame {
    /** Paddle sprite */
    private paddle;
    /** Ball sprite */
    private ball;
    /** Ball velocity */
    private ballVelocity;
    /** Array of brick sprites */
    private bricks;
    /** Game specific configuration */
    private gameConfig;
    /** Number of lives remaining */
    private lives;
    /** Current score */
    private score;
    /** Text display for score */
    private scoreText;
    /** Number of bricks that have been broken */
    private bricksBroken;
    /**
     * Create a new BreakoutGame instance
     *
     * @param options - Game creation options
     */
    constructor(options: any);
    /**
     * Initialize the breakout game
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
     * Get rows based on difficulty
     *
     * @returns Number of brick rows
     * @private
     */
    private getDifficultyBasedRows;
    /**
     * Get columns based on difficulty
     *
     * @returns Number of brick columns
     * @private
     */
    private getDifficultyBasedColumns;
    /**
     * Get ball speed based on difficulty
     *
     * @returns Ball speed multiplier
     * @private
     */
    private getDifficultyBasedBallSpeed;
    /**
     * Get paddle width based on difficulty
     *
     * @returns Paddle width in pixels
     * @private
     */
    private getDifficultyBasedPaddleWidth;
}
