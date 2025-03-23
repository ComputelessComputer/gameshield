/**
 * Constants used throughout the GameShield Game Core
 *
 * @packageDocumentation
 */
/** Default canvas width if not specified */
export declare const DEFAULT_WIDTH = 400;
/** Default canvas height if not specified */
export declare const DEFAULT_HEIGHT = 300;
/** Default background color (hex) */
export declare const DEFAULT_BACKGROUND_COLOR = 1087931;
/** Default difficulty level */
export declare const DEFAULT_DIFFICULTY = "medium";
/** Default game type when none specified */
export declare const DEFAULT_GAME_TYPE = "random";
/** Maximum allowed FPS */
export declare const MAX_FPS = 60;
/** Score threshold for success verification */
export declare const VERIFICATION_THRESHOLD = 70;
/** Timing constants (in milliseconds) */
export declare const TIMING: {
    /** Maximum time allowed for game completion */
    MAX_COMPLETION_TIME: number;
    /** Timeout for initialization */
    INIT_TIMEOUT: number;
    /** Default animation duration */
    DEFAULT_ANIMATION: number;
};
/** Default assets path */
export declare const DEFAULT_ASSETS_PATH = "https://assets.gameshield.dev";
/** Behavioral thresholds for verification */
export declare const BEHAVIOR_THRESHOLDS: {
    /** Minimum number of mouse movements for valid human interaction */
    MIN_MOUSE_MOVEMENTS: number;
    /** Minimum reaction time in milliseconds */
    MIN_REACTION_TIME: number;
    /** Maximum suspiciously fast reaction time */
    SUSPICIOUS_REACTION_TIME: number;
};
