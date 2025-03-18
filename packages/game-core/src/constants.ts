/**
 * Constants used throughout the GameShield Game Core
 * 
 * @packageDocumentation
 */

/** Default canvas width if not specified */
export const DEFAULT_WIDTH = 400;

/** Default canvas height if not specified */
export const DEFAULT_HEIGHT = 300;

/** Default background color (hex) */
export const DEFAULT_BACKGROUND_COLOR = 0x1099bb;

/** Default difficulty level */
export const DEFAULT_DIFFICULTY = 'medium';

/** Default game type when none specified */
export const DEFAULT_GAME_TYPE = 'random';

/** Maximum allowed FPS */
export const MAX_FPS = 60;

/** Score threshold for success verification */
export const VERIFICATION_THRESHOLD = 70;

/** Timing constants (in milliseconds) */
export const TIMING = {
  /** Maximum time allowed for game completion */
  MAX_COMPLETION_TIME: 60000,
  
  /** Timeout for initialization */
  INIT_TIMEOUT: 5000,
  
  /** Default animation duration */
  DEFAULT_ANIMATION: 300
};

/** Default assets path */
export const DEFAULT_ASSETS_PATH = 'https://assets.gameshield.dev';

/** Behavioral thresholds for verification */
export const BEHAVIOR_THRESHOLDS = {
  /** Minimum number of mouse movements for valid human interaction */
  MIN_MOUSE_MOVEMENTS: 10,
  
  /** Minimum reaction time in milliseconds */
  MIN_REACTION_TIME: 150,
  
  /** Maximum suspiciously fast reaction time */
  SUSPICIOUS_REACTION_TIME: 50
};
