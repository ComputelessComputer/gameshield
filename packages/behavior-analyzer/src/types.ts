/**
 * Types of interaction events that can be tracked
 */
export type InteractionEventType = 
  | 'mousemove' 
  | 'mousedown' 
  | 'mouseup' 
  | 'keydown' 
  | 'keyup';

/**
 * User interaction event data
 */
export interface InteractionEvent {
  /** Type of interaction event */
  type: InteractionEventType;
  /** Timestamp when the event occurred */
  timestamp: number;
  /** X-coordinate for mouse events */
  x?: number;
  /** Y-coordinate for mouse events */
  y?: number;
  /** Key pressed for keyboard events */
  key?: string;
}

/**
 * Behavior metrics collected during user interaction
 */
export interface BehaviorMetrics {
  /** Score for how smooth and natural mouse movements are (0-1) */
  movementSmoothnessScore?: number;
  /** Score for how human-like reaction times are (0-1) */
  reactionTimeScore?: number;
  /** Score for the density and distribution of interactions (0-1) */
  interactionDensity?: number;
  /** Score for the variability and randomness of interaction patterns (0-1) */
  patternVariability?: number;
  /** Overall human likelihood score (0-1) */
  overallHumanScore?: number;
  /** Final determination if the user is likely human */
  isHuman?: boolean;
  /** Additional custom metrics */
  [key: string]: any;
}

/**
 * Analysis result from behavior analyzer
 */
export interface BehaviorAnalysisResult {
  /** Whether the user is likely human based on behavior */
  isHuman: boolean;
  /** Confidence score (0-1) */
  confidence: number;
  /** Detailed metrics from the analysis */
  metrics: BehaviorMetrics;
}
