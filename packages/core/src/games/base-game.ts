import * as Phaser from "phaser";
import { Game, GameOptions, GameResult, Difficulty } from "../types";

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
    this.difficulty = options.difficulty || "medium";
    this.onComplete = options.onComplete;
    this.onError = options.onError;

    this.size = this.parseSize(options.size);

    this.gameScene = new GameScene(this);

    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: this.size,
      height: this.size,
      backgroundColor: "#1a1a1a",
      parent: this.container,
      scene: this.gameScene,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: this.size,
        height: this.size,
        max: {
          width: 500,
          height: 500,
        },
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
    };

    this.game = new Phaser.Game(gameConfig);

    this.makeResponsive();
  }

  /**
   * Parses size value to pixels
   * @param size Size value (string or number)
   * @returns Size in pixels
   */
  private parseSize(size: string | number): number {
    if (typeof size === "number") {
      return size;
    }

    if (size.endsWith("px")) {
      return parseInt(size, 10);
    }

    if (size.endsWith("%")) {
      const percentage = parseInt(size, 10);

      const containerSize = Math.min(
        this.container.clientWidth,
        this.container.clientHeight
      );
      return (containerSize * percentage) / 100;
    }

    return 400;
  }

  /**
   * Makes the canvas responsive to container size changes
   */
  private makeResponsive(): void {
    const resize = () => {
      const containerSize = Math.min(
        this.container.clientWidth,
        this.container.clientHeight
      );

      const maxSize = Math.min(containerSize, 500);

      this.game.scale.resize(maxSize, maxSize);
    };

    resize();

    window.addEventListener("resize", resize);
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
  public init(): void {}

  /**
   * Starts the game
   */
  public start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.startTime = Date.now();
    this.game.scene.resume("GameScene");
  }

  /**
   * Pauses the game
   */
  public pause(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    this.game.scene.pause("GameScene");
  }

  /**
   * Resumes the game after pausing
   */
  public resume(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.game.scene.resume("GameScene");
  }

  /**
   * Resets the game to its initial state
   */
  public abstract reset(): void;

  /**
   * Destroys the game and cleans up resources
   */
  public destroy(): void {
    this.pause();

    this.game.destroy(true);

    window.removeEventListener("resize", this.makeResponsive);
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
  protected complete(
    success: boolean,
    score?: number,
    data?: Record<string, any>
  ): void {
    this.pause();

    const timeTaken = Date.now() - this.startTime;

    const result: GameResult = {
      success,
      score,
      timeTaken,
      data,
    };

    if (this.onComplete) {
      this.onComplete(result);
    }
  }

  /**
   * Handles errors during gameplay
   * @param error Error object
   */
  protected handleError(error: Error): void {
    console.error("Game error:", error);

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
    super({ key: "GameScene" });
    this.baseGame = baseGame;
  }

  create() {
    (this.baseGame as any).createGame();
  }

  update(time: number, delta: number) {
    (this.baseGame as any).updateGame(time, delta);
  }
}
