/**
 * GameShield server types
 */

/**
 * Available game types in GameShield
 */
export type GameType = 'snake' | 'breakout' | 'tetris' | 'random';

/**
 * Game result after completion
 */
export interface GameResult {
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
export interface BehaviorMetrics {
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
export interface TokenData {
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
export interface VerificationResult {
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
export interface VerificationOptions {
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
