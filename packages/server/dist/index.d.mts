/**
 * GameShield server types
 */
/**
 * Available game types in GameShield
 */
type GameType = 'pong' | 'snake' | 'breakout' | 'dino-run' | 'random';
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
 * Verification result
 */
interface VerificationResult {
    /**
     * Whether the verification was successful
     */
    success: boolean;
    /**
     * Error message if verification failed
     */
    error?: string;
    /**
     * Token data if verification was successful
     */
    data?: TokenData;
    /**
     * Score or confidence level (0-1)
     */
    score?: number;
}
/**
 * Options for token verification
 */
interface VerificationOptions {
    /**
     * Secret key for token verification
     */
    secretKey?: string;
    /**
     * Minimum confidence level required for verification (0-1)
     * @default 0.7
     */
    minConfidence?: number;
    /**
     * Whether to check token expiration
     * @default true
     */
    checkExpiration?: boolean;
    /**
     * Custom validation function for additional checks
     */
    customValidator?: (data: TokenData) => boolean | Promise<boolean>;
}

/**
 * Verifies a GameShield token
 * @param token Token string to verify
 * @param options Verification options
 * @returns Verification result
 */
declare function verifyToken(token: string, options?: VerificationOptions): Promise<VerificationResult>;

/**
 * Class for validating GameShield tokens
 */
declare class TokenValidator {
    private readonly secretKey;
    private readonly minConfidence;
    private readonly checkExpiration;
    private readonly customValidator?;
    /**
     * Creates a new TokenValidator instance
     * @param options Verification options
     */
    constructor(options?: VerificationOptions);
    /**
     * Validates a GameShield token
     * @param token Token string to validate
     * @returns Verification result
     */
    validate(token: string): Promise<VerificationResult>;
    /**
     * Extracts data from a token
     * @param token Token string to extract data from
     * @returns Decoded token data or null if invalid
     */
    private extractTokenData;
    /**
     * Creates a signed JWT token from token data
     * @param data Token data
     * @returns Signed JWT token
     */
    createSignedToken(data: TokenData): string;
    /**
     * Verifies a signed JWT token
     * @param token Signed JWT token
     * @returns Decoded token data or null if invalid
     */
    verifySignedToken(token: string): TokenData | null;
}

export { type BehaviorMetrics, type GameResult, type GameType, type TokenData, TokenValidator, type VerificationOptions, type VerificationResult, verifyToken };
