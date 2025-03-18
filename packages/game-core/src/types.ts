/**
 * Core type definitions for the GameShield Game Core
 * 
 * @packageDocumentation
 */

/**
 * Supported game types
 */
export type GameType = 'puzzle' | 'breakout' | 'snake' | 'pong' | 'dino-run' | 'random';

/**
 * Difficulty levels for games
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Base configuration interface for all games
 */
export interface GameConfig {
  /** Width of the game canvas in pixels */
  width?: number;
  /** Height of the game canvas in pixels */
  height?: number;
  /** Background color of the game canvas (hex) */
  backgroundColor?: number;
  /** Game difficulty level */
  difficulty?: Difficulty;
  /** Optional custom assets path */
  assetsPath?: string;
  /** Optional callback when game is loaded */
  onLoad?: () => void;
}

/**
 * Options for initializing a game instance
 */
export interface GameOptions extends GameConfig {
  /** HTML container element or ID to mount the game */
  container?: HTMLElement | string;
  /** Type of game to create */
  gameType?: GameType;
  /** Optional scaling mode for the game */
  scale?: 'none' | 'fit' | 'fill';
  /** Optional FPS limit */
  maxFPS?: number;
}

/**
 * Game interaction metrics
 */
export interface InteractionMetrics {
  /** Number of mouse movements during gameplay */
  mouseMovements: number;
  /** Number of key presses during gameplay */
  keyPresses: number;
  /** Total duration of game interaction in ms */
  interactionDuration: number;
  /** Additional custom metrics specific to game type */
  [key: string]: number | boolean | string;
}

/**
 * Result of a completed game
 */
export interface GameResult {
  /** Whether the game was completed successfully */
  success: boolean;
  /** Score achieved (0-100) */
  score: number;
  /** Time taken to complete the game in ms */
  time: number;
  /** Interaction metrics collected during gameplay */
  metrics?: InteractionMetrics;
  /** Game-specific completion data */
  gameData?: Record<string, any>;
}

/**
 * Event types for game lifecycle events
 */
export type GameEventType = 
  | 'start' 
  | 'pause' 
  | 'resume' 
  | 'complete' 
  | 'fail' 
  | 'interaction'
  | 'destroy';

/**
 * Game event handler function
 */
export type GameEventHandler = (data?: any) => void;
