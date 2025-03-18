/**
 * Base Game Class
 * 
 * Abstract base class that all game implementations must extend.
 * Provides common functionality and enforces consistent interface.
 * 
 * @packageDocumentation
 */

import * as PIXI from 'pixi.js';
import { GameResult, Difficulty, InteractionMetrics } from '../types';
import { difficultyToValue } from '../utils';

/**
 * Configuration for a game
 */
export interface GameConfig {
  /** Width of the game area */
  width?: number;
  /** Height of the game area */
  height?: number;
  /** Background color in hex format */
  backgroundColor?: number;
  /** Game difficulty level */
  difficulty?: Difficulty;
  /** Custom assets path */
  assetsPath?: string;
  /** Callback when game is loaded */
  onLoad?: () => void;
}

/**
 * Abstract base class for all games
 */
export abstract class BaseGame {
  /** PIXI Application instance */
  protected app: PIXI.Application;
  
  /** Main container for game elements */
  protected container: PIXI.Container;
  
  /** Whether the game is currently running */
  protected isRunning: boolean = false;
  
  /** Whether the game has been initialized */
  protected isInitialized: boolean = false;
  
  /** Game configuration */
  protected config: Required<GameConfig>;
  
  /** Difficulty value (0-1) */
  protected difficultyValue: number;
  
  /** Game start timestamp */
  protected startTime: number = 0;
  
  /** Game completion callback */
  protected onCompleteCallback: ((result: GameResult) => void) | null = null;
  
  /** Interaction metrics being collected */
  protected metrics: InteractionMetrics = {
    mouseMovements: 0,
    keyPresses: 0,
    interactionDuration: 0
  };

  /**
   * Create a new BaseGame instance
   * 
   * @param app - PIXI Application instance
   * @param config - Game configuration
   */
  constructor(app: PIXI.Application, config: GameConfig = {}) {
    this.app = app;
    this.container = new PIXI.Container();
    
    // Set default configuration
    this.config = {
      width: config.width ?? 400,
      height: config.height ?? 300,
      backgroundColor: config.backgroundColor ?? 0x1099bb,
      difficulty: config.difficulty ?? 'medium',
      assetsPath: config.assetsPath ?? '',
      onLoad: config.onLoad ?? (() => {})
    };
    
    // Convert difficulty to numeric value
    this.difficultyValue = difficultyToValue(this.config.difficulty);
    
    // Add container to stage
    this.app.stage.addChild(this.container);
  }

  /**
   * Initialize the game
   * Must be implemented by derived classes
   * 
   * @protected
   */
  protected abstract initialize(): void;

  /**
   * Initialize resources and setup
   */
  public init(): void {
    if (this.isInitialized) {
      return;
    }
    
    // Track interaction metrics
    this.setupInteractionTracking();
    
    // Initialize game-specific elements
    this.initialize();
    
    this.isInitialized = true;
    
    // Call onLoad callback if provided
    if (this.config.onLoad) {
      this.config.onLoad();
    }
  }

  /**
   * Set up interaction tracking
   * 
   * @protected
   */
  protected setupInteractionTracking(): void {
    // Track mouse movements within the app view
    this.app.view.addEventListener('mousemove', () => {
      if (this.isRunning) {
        this.metrics.mouseMovements++;
      }
    });
    
    // Track key presses
    window.addEventListener('keydown', (e) => {
      if (this.isRunning) {
        this.metrics.keyPresses++;
      }
    });
  }

  /**
   * Start the game
   */
  public start(): void {
    if (!this.isInitialized) {
      this.init();
    }
    
    if (this.isRunning) {
      return;
    }
    
    this.startTime = Date.now();
    this.isRunning = true;
    
    // Reset metrics
    this.metrics.mouseMovements = 0;
    this.metrics.keyPresses = 0;
    this.metrics.interactionDuration = 0;
  }

  /**
   * Pause the game
   */
  public pause(): void {
    this.isRunning = false;
  }

  /**
   * Resume the game
   */
  public resume(): void {
    if (this.isRunning) {
      return;
    }
    
    this.isRunning = true;
  }

  /**
   * Reset the game state
   */
  public reset(): void {
    this.isRunning = false;
    this.startTime = 0;
    
    // Reset metrics
    this.metrics.mouseMovements = 0;
    this.metrics.keyPresses = 0;
    this.metrics.interactionDuration = 0;
  }

  /**
   * Update game state for each animation frame
   * Must be implemented by derived classes
   * 
   * @param ticker - PIXI ticker
   * @protected
   */
  protected abstract update(ticker: PIXI.Ticker): void;

  /**
   * Mount the game to a DOM container
   * 
   * @param container - HTML element to mount to
   */
  public mount(container: HTMLElement): void {
    // PIXI handles this at a higher level
    // This is here for API consistency
  }

  /**
   * Set completion callback
   * 
   * @param callback - Function to call when game completes
   */
  public setCompletionCallback(callback: (result: GameResult) => void): void {
    this.onCompleteCallback = callback;
  }

  /**
   * Complete the game and notify with result
   * 
   * @param success - Whether the game was completed successfully
   * @param score - Score achieved (0-100)
   * @param gameData - Optional game-specific data
   * @protected
   */
  protected complete(success: boolean, score: number, gameData?: Record<string, any>): void {
    if (!this.isRunning) {
      return;
    }
    
    this.isRunning = false;
    
    // Calculate duration
    const time = Date.now() - this.startTime;
    this.metrics.interactionDuration = time;
    
    // Create result object
    const result: GameResult = {
      success,
      score,
      time,
      metrics: { ...this.metrics },
      gameData
    };
    
    // Call completion callback if set
    if (this.onCompleteCallback) {
      this.onCompleteCallback(result);
    }
  }

  /**
   * Clean up and destroy game
   */
  public destroy(): void {
    // Remove event listeners
    this.app.view.removeEventListener('mousemove', () => {});
    window.removeEventListener('keydown', () => {});
    
    // Remove container from stage
    this.app.stage.removeChild(this.container);
    
    // Clean up PIXI resources
    this.container.destroy({ children: true });
    
    // Reset properties
    this.isInitialized = false;
    this.isRunning = false;
    this.onCompleteCallback = null;
  }
}
