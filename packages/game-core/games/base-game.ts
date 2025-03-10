import * as PIXI from "pixi.js";

export interface GameConfig {
  width?: number;
  height?: number;
  backgroundColor?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  successThreshold?: number;
  timeLimit?: number; // in seconds
}

export interface GameResult {
  success: boolean;
  score: number;
  message: string;
}

export abstract class BaseGame {
  protected app: PIXI.Application;
  protected config: GameConfig;
  protected container: HTMLElement | null = null;
  protected onComplete: (result: GameResult) => void = () => {};

  constructor(config: GameConfig = {}) {
    this.config = {
      width: config.width || 400,
      height: config.height || 300,
      backgroundColor: config.backgroundColor || 0x1099bb,
      difficulty: config.difficulty || 'medium',
      successThreshold: config.successThreshold || 3,
      timeLimit: config.timeLimit || 30
    };

    this.app = new PIXI.Application({
      width: this.config.width,
      height: this.config.height,
      backgroundColor: this.config.backgroundColor
    });
  }

  public setCompletionCallback(callback: (result: GameResult) => void): void {
    this.onComplete = callback;
  }

  public mount(container: HTMLElement | string): void {
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
      this.container.appendChild(this.app.view as unknown as HTMLElement);
      this.init();
    }
  }

  public destroy(): void {
    this.cleanup();
    if (this.app) {
      this.app.destroy(true);
    }
  }

  protected abstract init(): void;
  protected abstract cleanup(): void;
}
