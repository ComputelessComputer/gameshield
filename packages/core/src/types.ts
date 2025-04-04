/**
 * GameShield core types
 */

/**
 * Available game types in GameShield
 */
export type GameType = 
  | 'snake'
  | 'breakout'
  | 'tetris'
  | 'random';

/**
 * Difficulty levels for games
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Size type for the GameShield component
 * Can be a string (e.g., '400px') or a number (e.g., 400)
 */
export type Size = string | number;

/**
 * Game options for creating a game instance
 */
export interface GameOptions {
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
 * Game interface that all game implementations must follow
 */
export interface Game {
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
 * Options for creating a GameShield instance
 */
export interface GameShieldOptions {
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
export interface GameShield {
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
 * Options for the behavior analyzer
 */
export interface BehaviorAnalyzerOptions {
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
export interface CoreConfig {
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
