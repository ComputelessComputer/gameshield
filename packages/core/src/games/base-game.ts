import * as Phaser from 'phaser';
import { Game, GameOptions, GameResult, Difficulty } from '../types';

/**
 * Base abstract class for all games
 */
export abstract class BaseGame implements Game {
  protected game: Phaser.Game;
  protected container: HTMLElement;
  protected size: number;
  protected difficulty: Difficulty;
  protected isRunning: boolean = false;
  protected startTime: number = 0;
  protected onComplete?: (result: GameResult) => void;
  protected onError?: (error: Error) => void;
  protected gameScene: GameScene;

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
    
    // Create a custom game scene that will be extended by game implementations
    this.gameScene = new GameScene(this);
    
    // Create Phaser game configuration
    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: this.size,
      height: this.size,
      backgroundColor: '#1a1a1a',
      parent: this.container,
      scene: this.gameScene,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: this.size,
        height: this.size,
        max: {
          width: 500,
          height: 500
        }
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      }
    };
    
    // Create the Phaser game instance
    this.game = new Phaser.Game(gameConfig);
    
    // Make the game responsive
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
    // Phaser's Scale Manager handles most of the responsive behavior
    // but we can add additional resize handling if needed
    const resize = () => {
      // Get the container size
      const containerSize = Math.min(
        this.container.clientWidth,
        this.container.clientHeight
      );
      
      // Limit to a maximum size of 500px
      const maxSize = Math.min(containerSize, 500);
      
      // Update the game size
      this.game.scale.resize(maxSize, maxSize);
    };
    
    // Initial resize
    resize();
    
    // Add resize listener
    window.addEventListener('resize', resize);
  }
  
  /**
   * Create method called when the scene is created
   * This is where you should set up your game objects
   * This method will be called by the GameScene
   */
  public abstract createGame(): void;
  
  /**
   * Initializes the game
   */
  public init(): void {
    // Base initialization is handled by Phaser
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
    this.game.scene.resume('GameScene');
  }
  
  /**
   * Pauses the game
   */
  public pause(): void {
    if (!this.isRunning) {
      return;
    }
    
    this.isRunning = false;
    this.game.scene.pause('GameScene');
  }
  
  /**
   * Resumes the game after pausing
   */
  public resume(): void {
    if (this.isRunning) {
      return;
    }
    
    this.isRunning = true;
    this.game.scene.resume('GameScene');
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
    
    // Destroy the Phaser game instance
    this.game.destroy(true);
    
    // Remove any event listeners
    window.removeEventListener('resize', this.makeResponsive);
  }
  
  /**
   * Update method called on each frame
   * This method will be called by the GameScene
   * @param time The current time
   * @param delta Time elapsed since last frame
   */
  public abstract updateGame(time: number, delta: number): void;
  
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

/**
 * Custom Phaser scene class that bridges between Phaser and our BaseGame
 */
class GameScene extends Phaser.Scene {
  private baseGame: BaseGame;
  
  constructor(baseGame: BaseGame) {
    super({ key: 'GameScene' });
    this.baseGame = baseGame;
  }
  
  create() {
    // Call the game's create method
    (this.baseGame as any).createGame();
  }
  
  update(time: number, delta: number) {
    // Call the game's update method
    (this.baseGame as any).updateGame(time, delta);
  }
}
