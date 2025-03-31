/**
 * GameShield core types
 */
/**
 * Available game types in GameShield
 */
type GameType = 'pong' | 'snake' | 'breakout' | 'dino-run' | 'random';
/**
 * Difficulty levels for games
 */
type Difficulty = 'easy' | 'medium' | 'hard';
/**
 * Size type for the GameShield component
 * Can be a string (e.g., '400px') or a number (e.g., 400)
 */
type Size = string | number;
/**
 * Game options for creating a game instance
 */
interface GameOptions {
    /**
     * The container element where the game will be rendered
     */
    container: HTMLElement;
    /**
     * The size of the game container (maintains 1:1 aspect ratio)
     */
    size: Size;
    /**
     * The difficulty level of the game
     * @default 'medium'
     */
    difficulty?: Difficulty;
    /**
     * Callback when the game is completed successfully
     */
    onComplete?: (result: GameResult) => void;
    /**
     * Callback when the game fails or encounters an error
     */
    onError?: (error: Error) => void;
}
/**
 * Game result after completion
 */
interface GameResult {
    /**
     * Whether the game was completed successfully
     */
    success: boolean;
    /**
     * Score or performance metric (game-specific)
     */
    score?: number;
    /**
     * Time taken to complete the game (in milliseconds)
     */
    timeTaken: number;
    /**
     * Additional game-specific data
     */
    data?: Record<string, any>;
}
/**
 * Game interface that all game implementations must follow
 */
interface Game {
    /**
     * Initialize the game
     */
    init(): void;
    /**
     * Start the game
     */
    start(): void;
    /**
     * Pause the game
     */
    pause(): void;
    /**
     * Resume the game after pausing
     */
    resume(): void;
    /**
     * Reset the game to its initial state
     */
    reset(): void;
    /**
     * Destroy the game and clean up resources
     */
    destroy(): void;
}
/**
 * Behavior metrics collected during gameplay
 */
interface BehaviorMetrics {
    /**
     * Whether the user is likely human based on behavior analysis
     */
    isHuman: boolean;
    /**
     * Confidence level of the human determination (0-1)
     */
    confidence: number;
    /**
     * Movement smoothness score (0-1)
     */
    movementSmoothness?: number;
    /**
     * Reaction time metrics (in milliseconds)
     */
    reactionTime?: {
        average: number;
        variance: number;
    };
    /**
     * Interaction density metrics
     */
    interactionDensity?: {
        eventsPerSecond: number;
        pattern: 'human' | 'bot' | 'uncertain';
    };
    /**
     * Pattern variability score (0-1)
     */
    patternVariability?: number;
}
/**
 * Options for creating a GameShield instance
 */
interface GameShieldOptions {
    /**
     * The container element where the game will be rendered
     */
    container: HTMLElement;
    /**
     * The type of game to display
     * @default 'random'
     */
    gameType?: GameType;
    /**
     * The size of the game container (maintains 1:1 aspect ratio)
     * @default '400px'
     */
    size?: Size;
    /**
     * The difficulty level of the game
     * @default 'medium'
     */
    difficulty?: Difficulty;
    /**
     * Callback when verification succeeds, receives token as parameter
     */
    onSuccess?: (token: string) => void;
    /**
     * Callback when verification fails, receives reason as parameter
     */
    onFailure?: (reason: string) => void;
    /**
     * Callback when verification times out
     */
    onTimeout?: () => void;
}
/**
 * GameShield instance interface
 */
interface GameShield {
    /**
     * Reset the CAPTCHA to its initial state
     */
    reset(): void;
    /**
     * Destroy the CAPTCHA and clean up resources
     */
    destroy(): void;
}
/**
 * Token data structure
 */
interface TokenData {
    /**
     * Subject identifier (usually session ID)
     */
    sub: string;
    /**
     * Game result data
     */
    gameResult: GameResult;
    /**
     * Behavior analysis metrics
     */
    behaviorMetrics: BehaviorMetrics;
    /**
     * Timestamp when the token was created
     */
    iat?: number;
    /**
     * Timestamp when the token expires
     */
    exp?: number;
}
/**
 * Options for the behavior analyzer
 */
interface BehaviorAnalyzerOptions {
    /**
     * Threshold for movement smoothness (0-1)
     * @default 0.6
     */
    movementSmoothnessThreshold?: number;
    /**
     * Threshold for reaction time in milliseconds
     * @default 200
     */
    reactionTimeThreshold?: number;
    /**
     * Threshold for interaction density (0-1)
     * @default 0.5
     */
    interactionDensityThreshold?: number;
    /**
     * Threshold for pattern variability (0-1)
     * @default 0.7
     */
    patternVariabilityThreshold?: number;
}
/**
 * Configuration options for the core package
 */
interface CoreConfig {
    /**
     * Enable debug mode for detailed logging
     * @default false
     */
    debug?: boolean;
    /**
     * Log level for debug output
     * @default 'info'
     */
    logLevel?: 'error' | 'warn' | 'info' | 'debug' | 'verbose';
}

/**
 * Factory class for creating game instances
 */
declare class GameFactory {
    /**
     * Creates a game instance based on the specified type and options
     * @param type Type of game to create
     * @param options Game options
     * @returns Game instance
     */
    static createGame(type: GameType, options: GameOptions): Game;
    /**
     * Creates a placeholder game for types that aren't fully implemented yet
     * @param type Type of game
     * @param options Game options
     * @returns Placeholder game instance
     */
    private static createPlaceholderGame;
}

/**
 * BehaviorAnalyzer class for analyzing user behavior during gameplay
 * to determine if the user is human or a bot.
 */
declare class BehaviorAnalyzer {
    private options;
    private isTracking;
    private startTime;
    private mousePositions;
    private clickEvents;
    private keyEvents;
    private gameEvents;
    /**
     * Creates a new BehaviorAnalyzer instance.
     * @param options Configuration options for the behavior analyzer
     */
    constructor(options?: BehaviorAnalyzerOptions);
    /**
     * Starts tracking user behavior.
     * @param container The HTML element to attach event listeners to
     */
    startTracking(container: HTMLElement): void;
    /**
     * Stops tracking user behavior.
     * @param container The HTML element to remove event listeners from
     */
    stopTracking(container: HTMLElement): void;
    /**
     * Records a game-specific event.
     * @param type The type of event
     * @param data Optional data associated with the event
     */
    recordGameEvent(type: string, data?: any): void;
    /**
     * Analyzes the collected behavior data to determine if the user is human.
     * @returns Behavior metrics with human determination
     */
    analyze(): BehaviorMetrics;
    /**
     * Calculates the smoothness of mouse movements.
     * @returns Smoothness score between 0 and 1
     */
    private calculateMovementSmoothness;
    /**
     * Calculates reaction time metrics.
     * @returns Object containing average reaction time and variance
     */
    private calculateReactionTime;
    /**
     * Calculates interaction density metrics.
     * @returns Object containing events per second and pattern classification
     */
    private calculateInteractionDensity;
    /**
     * Calculates pattern variability in user interactions.
     * @returns Variability score between 0 and 1
     */
    private calculatePatternVariability;
    private handleMouseMove;
    private handleMouseClick;
    private handleKeyDown;
    private handleTouchStart;
    private handleTouchMove;
    private handleTouchEnd;
}

/**
 * TokenManager class for generating and handling verification tokens
 */
declare class TokenManager {
    private static readonly TOKEN_PREFIX;
    /**
     * Generates a verification token containing game results and behavior analysis
     * @param data Token data including subject, game result, and behavior metrics
     * @returns Encoded token string
     */
    static generateToken(data: {
        sub: string;
        gameResult: GameResult;
        behaviorMetrics: BehaviorMetrics;
    }): string;
    /**
     * Encodes token data into a string
     * @param data Token data to encode
     * @returns Encoded token string
     */
    private static encodeTokenData;
    /**
     * Validates a token format (not the contents)
     * @param token Token string to validate
     * @returns Whether the token format is valid
     */
    static validateTokenFormat(token: string): boolean;
    /**
     * Extracts data from a token
     * @param token Token string to extract data from
     * @returns Decoded token data or null if invalid
     */
    static extractTokenData(token: string): TokenData | null;
}

/**
 * Creates a new GameShield instance
 * @param options GameShield configuration options
 * @returns GameShield instance
 */
declare function createGameShield(options: GameShieldOptions): GameShield;

export { BehaviorAnalyzer, type BehaviorAnalyzerOptions, type BehaviorMetrics, type CoreConfig, type Difficulty, type Game, GameFactory, type GameOptions, type GameResult, type GameShield, type GameShieldOptions, type GameType, type Size, type TokenData, TokenManager, createGameShield };
