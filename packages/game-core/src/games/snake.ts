/**
 * Snake Game Implementation
 * 
 * A classic snake game where the player controls a snake that grows when eating food.
 * 
 * @packageDocumentation
 */

import * as PIXI from 'pixi.js';
import { BaseGame } from './base-game';
import { GameResult } from '../types';

/**
 * Configuration specific to Snake games
 */
export interface SnakeGameConfig {
  /** Grid size (number of cells) */
  gridSize?: number;
  /** Starting snake length */
  startLength?: number;
  /** Speed of the snake (cells per second) */
  speed?: number;
  /** Whether the snake can wrap around the edges */
  wrapAround?: boolean;
}

/**
 * Class representing a Snake game implementation
 */
export class SnakeGame extends BaseGame {
  /** Game specific configuration */
  private gameConfig: Required<SnakeGameConfig>;
  
  /** Snake body segments */
  private snake: { x: number, y: number }[] = [];
  
  /** Direction of movement */
  private direction = { x: 1, y: 0 };
  
  /** Next queued direction change */
  private nextDirection = { x: 1, y: 0 };
  
  /** Food position */
  private food = { x: 0, y: 0 };
  
  /** Graphics for rendering */
  private graphics: PIXI.Graphics | null = null;
  
  /** Cell size in pixels */
  private cellSize = 0;
  
  /** Score (food eaten) */
  private score = 0;
  
  /** Text display for score */
  private scoreText: PIXI.Text | null = null;
  
  /** Last update time for movement timing */
  private lastUpdateTime = 0;

  /**
   * Create a new SnakeGame instance
   * 
   * @param options - Game creation options
   */
  constructor(options: any) {
    super(options.app, {
      width: options.width,
      height: options.height,
      difficulty: options.difficulty,
      backgroundColor: options.backgroundColor,
      assetsPath: options.assetsPath,
      onLoad: options.onLoad
    });
    
    // Set up snake specific options based on difficulty
    this.gameConfig = {
      gridSize: options.gridSize || this.getDifficultyBasedGridSize(),
      startLength: options.startLength || this.getDifficultyBasedStartLength(),
      speed: options.speed || this.getDifficultyBasedSpeed(),
      wrapAround: options.wrapAround ?? this.getDifficultyBasedWrapAround()
    };
    
    // Calculate cell size
    this.cellSize = Math.min(
      this.config.width / this.gameConfig.gridSize,
      this.config.height / this.gameConfig.gridSize
    );
    
    // Set completion callback if provided
    if (options.onComplete) {
      this.setCompletionCallback(options.onComplete);
    }
    
    // Initialize the game
    this.init();
  }

  /**
   * Initialize the snake game
   * 
   * @protected
   */
  protected initialize(): void {
    // This would contain the full implementation with:
    // - Setting up the snake and initial food
    // - Handling keyboard input
    // - Setting up the game grid
    // - Creating score display
    
    // For now, we'll just add a placeholder message
    const comingSoonText = new PIXI.Text('Snake Game\n\nClick to complete demo', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
      align: 'center'
    });
    
    comingSoonText.anchor.set(0.5);
    comingSoonText.x = this.config.width / 2;
    comingSoonText.y = this.config.height / 2;
    this.container.addChild(comingSoonText);
    
    // For demo purposes, add a click handler that completes the game
    this.container.eventMode = 'static';
    this.container.cursor = 'pointer';
    this.container.on('pointerdown', () => {
      this.complete(true, 75, { demo: true });
    });
    
    // Set up the game ticker
    this.app.ticker.add(this.update.bind(this));
  }

  /**
   * Update game state on each frame
   * 
   * @param ticker - PIXI ticker
   * @protected
   */
  protected update(ticker: PIXI.Ticker): void {
    const delta = ticker.deltaTime;
    
    // In a full implementation, this would:
    // - Update snake position based on direction
    // - Check for collisions with walls, food, and self
    // - Grow snake when food is eaten
    // - Keep track of score
  }

  /**
   * Get grid size based on difficulty
   * 
   * @returns Grid size (number of cells)
   * @private
   */
  private getDifficultyBasedGridSize(): number {
    switch (this.config.difficulty) {
      case 'easy': return 15;
      case 'medium': return 20;
      case 'hard': return 25;
      default: return 20;
    }
  }

  /**
   * Get starting snake length based on difficulty
   * 
   * @returns Starting length of snake
   * @private
   */
  private getDifficultyBasedStartLength(): number {
    switch (this.config.difficulty) {
      case 'easy': return 5;
      case 'medium': return 4;
      case 'hard': return 3;
      default: return 4;
    }
  }

  /**
   * Get snake speed based on difficulty
   * 
   * @returns Speed in cells per second
   * @private
   */
  private getDifficultyBasedSpeed(): number {
    switch (this.config.difficulty) {
      case 'easy': return 5;
      case 'medium': return 8;
      case 'hard': return 12;
      default: return 8;
    }
  }

  /**
   * Get whether wrap around is enabled based on difficulty
   * 
   * @returns Whether wrap around is enabled
   * @private
   */
  private getDifficultyBasedWrapAround(): boolean {
    switch (this.config.difficulty) {
      case 'easy': return true;
      case 'medium': return true;
      case 'hard': return false;
      default: return true;
    }
  }
}
