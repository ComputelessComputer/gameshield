import * as PIXI from "pixi.js";
import { BehaviorAnalyzer } from "../behavior-analysis";

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
  behaviorAnalysis?: {
    isHuman: boolean;
    confidence: number;
  };
}

export abstract class BaseGame {
  protected app: PIXI.Application;
  protected config: GameConfig;
  protected container: HTMLElement | null = null;
  protected onComplete: (result: GameResult) => void = () => {};
  protected behaviorAnalyzer: BehaviorAnalyzer;

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
    
    // Initialize behavior analyzer
    this.behaviorAnalyzer = new BehaviorAnalyzer();
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
      this.setupInteractionTracking();
      this.init();
    }
  }
  
  protected setupInteractionTracking(): void {
    // Track mouse/touch movements
    if (this.app.view) {
      this.app.view.addEventListener('mousemove', (e) => {
        const rect = (this.app.view as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.behaviorAnalyzer.recordInteraction(x, y, 'move');
      });
      
      this.app.view.addEventListener('click', (e) => {
        const rect = (this.app.view as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.behaviorAnalyzer.recordInteraction(x, y, 'click');
      });
      
      this.app.view.addEventListener('touchmove', (e) => {
        const rect = (this.app.view as HTMLCanvasElement).getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        this.behaviorAnalyzer.recordInteraction(x, y, 'touch');
      });
      
      // Track keyboard input
      window.addEventListener('keydown', (e) => {
        this.behaviorAnalyzer.recordInteraction(0, 0, 'keypress', e.key);
      });
    }
  }

  protected completeGame(success: boolean, score: number, message: string): void {
    // Include behavior analysis in the game result
    const behaviorResult = this.behaviorAnalyzer.isHumanBehavior();
    
    const result: GameResult = {
      success,
      score,
      message,
      behaviorAnalysis: behaviorResult
    };
    
    this.onComplete(result);
  }

  public destroy(): void {
    this.cleanup();
    if (this.app) {
      this.app.destroy(true);
    }
    
    // Remove event listeners
    if (this.app.view) {
      this.app.view.removeEventListener('mousemove', () => {});
      this.app.view.removeEventListener('click', () => {});
      this.app.view.removeEventListener('touchmove', () => {});
      window.removeEventListener('keydown', () => {});
    }
  }

  protected abstract init(): void;
  protected abstract cleanup(): void;
}
