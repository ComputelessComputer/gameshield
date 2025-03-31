import * as PIXI from 'pixi.js';
import { Game, GameOptions, GameResult, Difficulty } from '../types';

/**
 * Base abstract class for all games
 */
export abstract class BaseGame implements Game {
  protected app: PIXI.Application;
  protected container: HTMLElement;
  protected size: number;
  protected difficulty: Difficulty;
  protected isRunning: boolean = false;
  protected startTime: number = 0;
  protected onComplete?: (result: GameResult) => void;
  protected onError?: (error: Error) => void;

  /**
   * Creates a new game instance
   * @param options Game options
   */
  constructor(options: GameOptions) {
    this.container = options.container;
    this.difficulty = options.difficulty || 'medium';
    this.onComplete = options.onComplete;
    this.onError = options.onError;
    
    // Convert size to number (pixels)
    this.size = this.parseSize(options.size);
    
    // Create PIXI application
    this.app = new PIXI.Application({
      width: this.size,
      height: this.size,
      backgroundColor: 0x1a1a1a,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    });
    
    // Add the PIXI canvas to the container
    this.container.appendChild(this.app.view as HTMLCanvasElement);
    
    // Make the canvas responsive
    this.makeResponsive();
  }
  
  /**
   * Parses size value to pixels
   * @param size Size value (string or number)
   * @returns Size in pixels
   */
  private parseSize(size: string | number): number {
    if (typeof size === 'number') {
      return size;
    }
    
    // Parse string size (e.g., '400px', '100%')
    if (size.endsWith('px')) {
      return parseInt(size, 10);
    }
    
    if (size.endsWith('%')) {
      const percentage = parseInt(size, 10);
      // Use the smaller of container width or height to maintain aspect ratio
      const containerSize = Math.min(
        this.container.clientWidth,
        this.container.clientHeight
      );
      return (containerSize * percentage) / 100;
    }
    
    // Default size if parsing fails
    return 400;
  }
  
  /**
   * Makes the canvas responsive to container size changes
   */
  private makeResponsive(): void {
    const resize = () => {
      // Get the container size
      const containerSize = Math.min(
        this.container.clientWidth,
        this.container.clientHeight
      );
      
      // Limit to a maximum size of 500px
      const maxSize = Math.min(containerSize, 500);
      
      // Update the canvas size
      this.app.renderer.resize(maxSize, maxSize);
      
      // Scale the stage to fit the new size
      const scale = maxSize / this.size;
      this.app.stage.scale.set(scale);
    };
    
    // Initial resize
    resize();
    
    // Add resize listener
    window.addEventListener('resize', resize);
    
    // Store the original size for reference
    this.size = this.app.renderer.width;
  }
  
  /**
   * Initializes the game
   */
  public init(): void {
    // Base initialization
    this.app.ticker.add(this.update, this);
  }
  
  /**
   * Starts the game
   */
  public start(): void {
    if (this.isRunning) {
      return;
    }
    
    this.isRunning = true;
    this.startTime = Date.now();
    this.app.ticker.start();
  }
  
  /**
   * Pauses the game
   */
  public pause(): void {
    if (!this.isRunning) {
      return;
    }
    
    this.isRunning = false;
    this.app.ticker.stop();
  }
  
  /**
   * Resumes the game after pausing
   */
  public resume(): void {
    if (this.isRunning) {
      return;
    }
    
    this.isRunning = true;
    this.app.ticker.start();
  }
  
  /**
   * Resets the game to its initial state
   */
  public abstract reset(): void;
  
  /**
   * Destroys the game and cleans up resources
   */
  public destroy(): void {
    // Stop the game
    this.pause();
    
    // Remove the canvas from the container
    if (this.app.view.parentNode) {
      this.app.view.parentNode.removeChild(this.app.view);
    }
    
    // Destroy the PIXI application
    this.app.destroy(true, {
      children: true,
      texture: true,
      baseTexture: true
    });
  }
  
  /**
   * Update method called on each frame
   * @param delta Time elapsed since last frame
   */
  protected abstract update(delta: number): void;
  
  /**
   * Completes the game and calls the onComplete callback
   * @param success Whether the game was completed successfully
   * @param score Optional score or performance metric
   * @param data Additional game-specific data
   */
  protected complete(success: boolean, score?: number, data?: Record<string, any>): void {
    // Stop the game
    this.pause();
    
    // Calculate time taken
    const timeTaken = Date.now() - this.startTime;
    
    // Create result object
    const result: GameResult = {
      success,
      score,
      timeTaken,
      data
    };
    
    // Call the onComplete callback
    if (this.onComplete) {
      this.onComplete(result);
    }
  }
  
  /**
   * Handles errors during gameplay
   * @param error Error object
   */
  protected handleError(error: Error): void {
    console.error('Game error:', error);
    
    // Call the onError callback
    if (this.onError) {
      this.onError(error);
    }
  }
}
