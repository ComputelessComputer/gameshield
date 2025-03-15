/**
 * Game types supported by GameShield
 */
export type GameType = 'pong' | 'snake' | 'breakout' | 'dino-run' | 'random';

/**
 * Difficulty levels for games
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Game options for initialization
 */
export interface GameOptions {
  difficulty: Difficulty;
  width: number;
  height: number;
  onComplete: (result: GameResult) => void;
}

/**
 * Game result after completion
 */
export interface GameResult {
  success: boolean;
  score: number;
}

/**
 * Base interface for all games
 */
export interface Game {
  mount(container: HTMLElement): Promise<void>;
  destroy(): void;
}

/**
 * Behavior metrics collected during gameplay
 */
export interface BehaviorMetrics {
  movementSmoothnessScore: number;
  reactionTimeScore: number;
  interactionDensity: number;
  patternVariability: number;
  overallHumanScore: number;
  isHuman: boolean;
}

/**
 * Interaction event types tracked by behavior analyzer
 */
export type InteractionEventType = 'mousemove' | 'mousedown' | 'mouseup' | 'keydown' | 'keyup';

/**
 * Interaction event data
 */
export interface InteractionEvent {
  type: InteractionEventType;
  timestamp: number;
  x?: number;
  y?: number;
  key?: string;
}

/**
 * Token payload structure
 */
export interface TokenPayload {
  sessionId: string;
  timestamp: number;
  gameType: GameType;
  behaviorMetrics: BehaviorMetrics;
  gameResult: GameResult;
}
