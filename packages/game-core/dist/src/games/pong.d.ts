/**
 * Pong Game Implementation
 *
 * A classic pong game where the player controls a paddle to bounce a ball against an AI opponent.
 *
 * @packageDocumentation
 */
import * as PIXI from 'pixi.js';
import { BaseGame } from './base-game';
/**
 * Configuration specific to Pong games
 */
export interface PongGameConfig {
    /** Ball speed multiplier */
    ballSpeed?: number;
    /** Paddle height */
    paddleHeight?: number;
    /** AI difficulty (0-1) */
    aiDifficulty?: number;
    /** Points needed to win */
    pointsToWin?: number;
}
/**
 * Class representing a Pong game implementation
 */
export declare class PongGame extends BaseGame {
    /** Game specific configuration */
    private gameConfig;
    /** Player paddle */
    private playerPaddle;
    /** AI paddle */
    private aiPaddle;
    /** Ball */
    private ball;
    /** Ball velocity */
    private ballVelocity;
    /** Player score */
    private playerScore;
    /** AI score */
    private aiScore;
    /** Text displays for scores */
    private playerScoreText;
    private aiScoreText;
    /**
     * Create a new PongGame instance
     *
     * @param options - Game creation options
     */
    constructor(options: any);
    /**
     * Initialize the pong game
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
     * Get ball speed based on difficulty
     *
     * @returns Ball speed multiplier
     * @private
     */
    private getDifficultyBasedBallSpeed;
    /**
     * Get paddle height based on difficulty
     *
     * @returns Paddle height in pixels
     * @private
     */
    private getDifficultyBasedPaddleHeight;
    /**
     * Get AI difficulty based on game difficulty
     *
     * @returns AI difficulty (0-1)
     * @private
     */
    private getDifficultyBasedAIDifficulty;
    /**
     * Get points needed to win based on difficulty
     *
     * @returns Points needed to win
     * @private
     */
    private getDifficultyBasedPointsToWin;
}
