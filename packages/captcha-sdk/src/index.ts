// captcha-sdk/src/index.ts
import { Game, GameOptions, GameType, GameResult } from 'game-core';
// Import from the package instead of relative path
import { SecurityUtils, TokenPayload } from 'security-utils';
// Import analytics components
import { AnalyticsManager, LocalStorageProvider, GameShieldAnalyticsProvider } from './analytics';
import type { 
  VerificationData, 
  MaliciousActivityData, 
  GameShieldStats,
  StatsFilters,
  DataFilters
} from './analytics/types';

export interface CaptchaOptions {
  container: HTMLElement | string;
  gameOptions?: GameOptions;
  onSuccess?: (token: string) => void;
  onFailure?: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
  gameType?: GameType;
  apiEndpoint?: string;
  analyticsProvider?: GameShieldAnalyticsProvider;
  enableAnalytics?: boolean;
}

export class CaptchaSDK {
  private game: Game | null = null;
  private options: CaptchaOptions;
  private isVerified: boolean = false;
  private securityUtils: SecurityUtils;
  private sessionId: string;
  private token: string | null = null;
  private analyticsManager: AnalyticsManager | null = null;
  private startTime: number = 0;
  private attempts: number = 0;

  constructor(options: CaptchaOptions) {
    this.options = {
      ...options,
      apiEndpoint: options.apiEndpoint || 'https://api.gameshield.dev/verify',
      enableAnalytics: options.enableAnalytics !== false
    };
    this.securityUtils = new SecurityUtils();
    this.sessionId = this.securityUtils.generateSessionId();
    
    // Initialize analytics if enabled
    if (this.options.enableAnalytics) {
      const provider = this.options.analyticsProvider || new LocalStorageProvider();
      this.analyticsManager = new AnalyticsManager(provider);
    }
  }

  public start(): void {
    const { container, gameType = 'puzzle', difficulty = 'medium', gameOptions } = this.options;
    
    // Reset verification state
    this.isVerified = false;
    this.token = null;
    this.attempts = 0;
    this.startTime = Date.now();

    // Create container element if string was provided
    let containerElement: HTMLElement;
    if (typeof container === 'string') {
      const element = document.getElementById(container);
      if (!element) {
        throw new Error(`Container element with ID "${container}" not found`);
      }
      containerElement = element;
    } else {
      containerElement = container;
    }

    // Create and start the game
    this.game = new Game({
      container: containerElement,
      type: gameType,
      difficulty,
      ...gameOptions
    });

    this.game.onComplete((result: GameResult) => {
      this.handleGameComplete(result);
    });

    this.game.start();
  }

  private handleGameComplete(result: GameResult): void {
    this.attempts++;
    
    // Check if the game was completed successfully
    if (result.success) {
      this.isVerified = true;
      this.token = this.generateToken(result);
      
      // Record verification attempt in analytics
      this.recordVerificationAttempt(true, result);
      
      if (this.options.onSuccess) {
        this.options.onSuccess(this.token);
      }
    } else {
      // Record failed verification attempt
      this.recordVerificationAttempt(false, result);
      
      // Check for potential malicious behavior
      this.detectMaliciousBehavior(result);
      
      if (this.options.onFailure) {
        this.options.onFailure();
      }
    }
  }

  private generateToken(result: GameResult): string {
    const payload: TokenPayload = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      gameType: this.options.gameType || 'puzzle',
      difficulty: this.options.difficulty || 'medium',
      score: result.score,
      success: result.success
    };
    
    return this.securityUtils.generateToken(payload);
  }

  private recordVerificationAttempt(success: boolean, result: GameResult): void {
    if (!this.analyticsManager) return;
    
    const duration = Date.now() - this.startTime;
    
    const verificationData: VerificationData = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      success,
      gameType: this.options.gameType || 'puzzle',
      difficulty: this.options.difficulty || 'medium',
      duration,
      attempts: this.attempts,
      clientInfo: {
        userAgent: navigator.userAgent
      },
      behaviorMetrics: {
        mouseMovements: result.metrics?.mouseMovements || 0,
        keyPresses: result.metrics?.keyPresses || 0,
        responseTime: duration
      }
    };
    
    this.analyticsManager.recordVerificationAttempt(verificationData);
  }

  private detectMaliciousBehavior(result: GameResult): void {
    if (!this.analyticsManager) return;
    
    const duration = Date.now() - this.startTime;
    const flags: string[] = [];
    let riskScore = 0;
    
    // Check for impossibly high scores
    if (result.score > 95) {
      flags.push('impossible-score');
      riskScore += 30;
    }
    
    // Check for suspiciously fast completion
    if (duration < 1000) {
      flags.push('too-fast');
      riskScore += 25;
    }
    
    // Check for too few inputs
    if ((result.metrics?.mouseMovements || 0) < 5 && (result.metrics?.keyPresses || 0) < 3) {
      flags.push('too-few-inputs');
      riskScore += 20;
    }
    
    // Only record if there are flags
    if (flags.length > 0) {
      const maliciousData: MaliciousActivityData = {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        success: false,
        gameType: this.options.gameType || 'puzzle',
        difficulty: this.options.difficulty || 'medium',
        duration,
        attempts: this.attempts,
        clientInfo: {
          userAgent: navigator.userAgent
        },
        behaviorMetrics: {
          mouseMovements: result.metrics?.mouseMovements || 0,
          keyPresses: result.metrics?.keyPresses || 0,
          responseTime: duration
        },
        riskScore,
        flags
      };
      
      this.analyticsManager.recordMaliciousActivity(maliciousData);
    }
  }

  public getAnalytics(): AnalyticsManager | null {
    return this.analyticsManager;
  }

  public isComplete(): boolean {
    return this.isVerified;
  }

  public getToken(): string | null {
    return this.token;
  }

  public reset(): void {
    if (this.game) {
      this.game.reset();
    }
    this.isVerified = false;
    this.token = null;
  }
}

// Helper function to easily create a captcha instance
export function createCaptcha(options: CaptchaOptions): CaptchaSDK {
  return new CaptchaSDK(options);
}

// Export analytics components
export {
  AnalyticsManager,
  LocalStorageProvider,
  type GameShieldAnalyticsProvider,
  type VerificationData,
  type MaliciousActivityData,
  type GameShieldStats,
  type StatsFilters,
  type DataFilters
};

export default CaptchaSDK;
