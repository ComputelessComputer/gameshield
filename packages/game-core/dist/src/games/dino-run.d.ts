/**
 * Dino Run Game Implementation
 *
 * A running game inspired by Chrome's offline dinosaur game where players
 * jump over obstacles.
 *
 * @packageDocumentation
 */
import * as PIXI from 'pixi.js';
import { BaseGame } from './base-game';
/**
 * Configuration specific to Dino Run games
 */
export interface DinoRunGameConfig {
    /** Game speed multiplier */
    speed?: number;
    /** Jump height */
    jumpHeight?: number;
    /** Gravity strength */
    gravity?: number;
    /** Distance needed to win */
    targetDistance?: number;
}
/**
 * Class representing a Dino Run game implementation
 */
export declare class DinoRunGame extends BaseGame {
    /** Game specific configuration */
    private gameConfig;
    /** Player character */
    private player;
    /** Obstacles */
    private obstacles;
    /** Ground */
    private ground;
    /** Player velocity */
    private playerVelocity;
    /** Whether player is jumping */
    private isJumping;
    /** Distance traveled */
    private distance;
    /** Text display for distance */
    private distanceText;
    /** Whether game is over */
    private isGameOver;
    /**
     * Create a new DinoRunGame instance
     *
     * @param options - Game creation options
     */
    constructor(options: any);
    /**
     * Initialize the dino run game
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
     * Get game speed based on difficulty
     *
     * @returns Game speed multiplier
     * @private
     */
    private getDifficultyBasedSpeed;
    /**
     * Get jump height based on difficulty
     *
     * @returns Jump height multiplier
     * @private
     */
    private getDifficultyBasedJumpHeight;
    /**
     * Get gravity based on difficulty
     *
     * @returns Gravity strength
     * @private
     */
    private getDifficultyBasedGravity;
    /**
     * Get target distance based on difficulty
     *
     * @returns Distance needed to win
     * @private
     */
    private getDifficultyBasedTargetDistance;
}
