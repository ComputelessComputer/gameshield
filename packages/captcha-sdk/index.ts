// captcha-sdk/index.ts
import { Game, GameOptions, GameType, GameResult } from 'game-core';
// Import from relative path until we set up proper package references
import { SecurityUtils, TokenPayload } from '../security-utils';

export interface CaptchaOptions {
  container: HTMLElement | string;
  gameOptions?: GameOptions;
  onSuccess?: (token: string) => void;
  onFailure?: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
  gameType?: GameType;
  apiEndpoint?: string;
}

export class CaptchaSDK {
  private game: Game | null = null;
  private options: CaptchaOptions;
  private isVerified: boolean = false;
  private securityUtils: SecurityUtils;
  private sessionId: string;
  private token: string | null = null;

  constructor(options: CaptchaOptions) {
    this.options = {
      ...options,
      apiEndpoint: options.apiEndpoint || 'https://api.gameshield.dev/verify'
    };
    this.securityUtils = new SecurityUtils();
    this.sessionId = this.securityUtils.generateSessionId();
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
  
  private async handleGameComplete(result: GameResult): Promise<void> {
    this.isVerified = result.success;
    
    if (result.success) {
      // Generate client fingerprint
      const fingerprint = this.generateClientFingerprint();
      
      // Create token payload
      const payload: TokenPayload = {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        gameType: this.options.gameType || 'random',
        behaviorMetrics: result.behaviorAnalysis,
        gameResult: {
          success: result.success,
          score: result.score
        },
        clientData: {
          fingerprint,
          userAgent: navigator.userAgent
        }
      };
      
      // Generate token
      this.token = this.securityUtils.generateToken(payload);
      
      // Call success callback with token
      if (this.options.onSuccess && this.token) {
        this.options.onSuccess(this.token);
      }
      
      // Verify with server if endpoint is provided
      if (this.options.apiEndpoint && this.token) {
        try {
          await this.verifyWithServer(this.token);
        } catch (error) {
          console.error('Server verification failed:', error);
          // Still consider it a success since the game was completed
        }
      }
    } else if (this.options.onFailure) {
      this.options.onFailure();
    }
    
    console.log(`CaptchaSDK verification: ${result.success ? 'Success' : 'Failure'}`);
  }
  
  private generateClientFingerprint(): string {
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this.securityUtils.generateFingerprint(
      navigator.userAgent,
      screenResolution,
      timezone
    );
  }
  
  private async verifyWithServer(token: string): Promise<boolean> {
    try {
      const response = await fetch(this.options.apiEndpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      
      if (!response.ok) {
        throw new Error(`Server verification failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.valid === true;
    } catch (error) {
      console.error('Error verifying with server:', error);
      throw error;
    }
  }

  verify(): boolean {
    return this.isVerified;
  }
  
  getToken(): string | null {
    return this.token;
  }
  
  reset(): void {
    this.destroy();
    this.sessionId = this.securityUtils.generateSessionId();
    this.token = null;
    this.isVerified = false;
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
