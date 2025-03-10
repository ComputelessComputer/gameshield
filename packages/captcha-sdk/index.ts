// captcha-sdk/index.ts
import { Game, GameOptions, GameType, GameResult } from 'game-core';

export interface CaptchaOptions {
  container: HTMLElement | string;
  gameOptions?: GameOptions;
  onSuccess?: () => void;
  onFailure?: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
  gameType?: GameType;
}

export class CaptchaSDK {
  private game: Game | null = null;
  private options: CaptchaOptions;
  private isVerified: boolean = false;

  constructor(options: CaptchaOptions) {
    this.options = options;
  }

  initialize(): void {
    // Initialize the game using the game-core package
    const gameOptions: GameOptions = {
      ...this.options.gameOptions,
      difficulty: this.options.difficulty || 'medium',
      gameType: this.options.gameType || 'random'
    };
    
    this.game = new Game(gameOptions);
    console.log('CaptchaSDK initialized');
  }

  start(): void {
    if (!this.game) {
      this.initialize();
    }
    
    if (this.game && this.options.container) {
      this.game.mount(this.options.container);
      
      // Set completion callback
      this.game.setCompletionCallback(this.handleGameComplete.bind(this));
      
      console.log('CaptchaSDK started');
    }
  }
  
  private handleGameComplete(result: GameResult): void {
    this.isVerified = result.success;
    
    if (result.success && this.options.onSuccess) {
      this.options.onSuccess();
    } else if (!result.success && this.options.onFailure) {
      this.options.onFailure();
    }
    
    console.log(`CaptchaSDK verification: ${result.success ? 'Success' : 'Failure'}`);
  }

  verify(): boolean {
    return this.isVerified;
  }
  
  reset(): void {
    this.destroy();
    this.initialize();
    this.start();
  }
  
  destroy(): void {
    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
  }
}

// Helper function to easily create a captcha instance
export function generateCaptcha(options: CaptchaOptions): CaptchaSDK {
  const captcha = new CaptchaSDK(options);
  captcha.initialize();
  captcha.start();
  return captcha;
}

export default CaptchaSDK;
