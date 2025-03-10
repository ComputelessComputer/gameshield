import * as PIXI from "pixi.js";
import { BaseGame, GameConfig, GameResult } from "./games/base-game";
import { GameFactory, GameType } from "./games";

export interface GameOptions extends GameConfig {
  gameType?: GameType;
}

export class Game {
  private game: BaseGame | null = null;
  private options: GameOptions;
  private container: HTMLElement | null = null;
  private onGameComplete: ((result: GameResult) => void) | null = null;

  constructor(options: GameOptions = {}) {
    this.options = {
      width: options.width || 400,
      height: options.height || 300,
      backgroundColor: options.backgroundColor || 0x1099bb,
      gameType: options.gameType || 'random',
      difficulty: options.difficulty || 'medium'
    };
  }

  mount(container: HTMLElement | string): void {
    if (typeof container === 'string') {
      const element = document.getElementById(container);
      if (!element) {
        throw new Error(`Container element with id '${container}' not found`);
      }
      this.container = element;
    } else {
      this.container = container;
    }
    
    if (this.container) {
      this.initGame();
    }
  }

  setCompletionCallback(callback: (result: GameResult) => void): void {
    this.onGameComplete = callback;
    if (this.game) {
      this.game.setCompletionCallback(this.handleGameComplete.bind(this));
    }
  }

  private initGame(): void {
    // Create the game based on the specified type
    this.game = GameFactory.createGame(this.options.gameType!, this.options);
    
    // Set completion callback if available
    if (this.onGameComplete) {
      this.game.setCompletionCallback(this.handleGameComplete.bind(this));
    }
    
    // Mount the game to the container
    if (this.container) {
      this.game.mount(this.container);
    }
  }

  private handleGameComplete(result: GameResult): void {
    if (this.onGameComplete) {
      this.onGameComplete(result);
    }
  }

  destroy(): void {
    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
  }
}

// Keep the original function for backward compatibility
export function createGame(container: HTMLElement) {
  const app = new PIXI.Application({ width: 400, height: 300 });
  container.appendChild(app.view as unknown as HTMLElement);
  return app;
}
