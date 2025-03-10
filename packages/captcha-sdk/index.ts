// captcha-sdk/index.ts
import { Game, GameOptions } from 'game-core';

export interface CaptchaOptions {
  container: HTMLElement | string;
  gameOptions?: GameOptions;
  onSuccess?: () => void;
  onFailure?: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export class CaptchaSDK {
  private game: Game | null = null;
  private options: CaptchaOptions;

  constructor(options: CaptchaOptions) {
    this.options = options;
  }

  initialize(): void {
    // Initialize the game using the game-core package
    this.game = new Game(this.options.gameOptions);
    console.log('CaptchaSDK initialized');
  }

  start(): void {
    if (!this.game) {
      this.initialize();
    }
    
    if (this.game && this.options.container) {
      this.game.mount(this.options.container);
      console.log('CaptchaSDK started');
    }
  }

  verify(): boolean {
    // Placeholder for verification logic
    const result = Math.random() > 0.5; // Simulate random verification result
    
    if (result && this.options.onSuccess) {
      this.options.onSuccess();
    } else if (!result && this.options.onFailure) {
      this.options.onFailure();
    }
    
    console.log(`CaptchaSDK verification: ${result ? 'Success' : 'Failure'}`);
    return result;
  }
  
  destroy(): void {
    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
  }
}

export default CaptchaSDK;
