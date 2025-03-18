// captcha-sdk/src/index.ts
import { 
  GameFactory, 
  BaseGame,
  GameType,
  Difficulty,
  GameConfig
} from '../../game-core';

import { SecurityUtils } from '../../security-utils';
import { 
  AnalyticsManager,
  GameShieldAnalyticsProvider,
  LocalStorageAnalyticsProvider,
  VerificationData,
  MaliciousActivityData
} from './analytics';

import {
  TokenPayload,
  GameResult,
  BehaviorAnalysisResult
} from './types';

import * as PIXI from 'pixi.js';

/**
 * Configuration options for the CaptchaSDK
 */
export interface CaptchaOptions {
  /** Container element or ID to mount the captcha game */
  container: HTMLElement | string;
  /** Game options to pass to the game engine */
  gameOptions?: Record<string, any>;
  /** Callback when verification succeeds */
  onSuccess?: (token: string) => void;
  /** Callback when verification fails */
  onFailure?: (reason?: string) => void;
  /** Difficulty level of the verification challenge */
  difficulty?: Difficulty;
  /** Specific game type to use for verification */
  gameType?: GameType;
  /** API endpoint for server-side verification */
  apiEndpoint?: string;
  /** Custom analytics provider implementation */
  analyticsProvider?: GameShieldAnalyticsProvider;
  /** Whether to enable analytics collection */
  enableAnalytics?: boolean;
  /** Minimum score required to pass verification */
  minScore?: number;
  /** Maximum attempts allowed before locking */
  maxAttempts?: number;
}

/**
 * GameShield CaptchaSDK
 * 
 * Main entry point for integrating GameShield's interactive verification
 * into your application.
 */
export class CaptchaSDK {
  /** Current active game instance */
  private game: BaseGame | null = null;
  /** SDK configuration options */
  private options: CaptchaOptions;
  /** Whether current session is verified */
  private isVerified: boolean = false;
  /** Security utilities for token generation and validation */
  private securityUtils: SecurityUtils;
  /** Unique session identifier */
  private sessionId: string;
  /** Verification token if successfully verified */
  private token: string | null = null;
  /** Analytics manager instance */
  private analyticsManager: AnalyticsManager | null = null;
  /** Timestamp when verification started */
  private startTime: number = 0;
  /** Number of verification attempts in this session */
  private attempts: number = 0;
  /** Behavior analysis results from last attempt */
  private lastAnalysisResult: BehaviorAnalysisResult | null = null;

  /**
   * Create a new CaptchaSDK instance
   * 
   * @param options - Configuration options
   */
  constructor(options: CaptchaOptions) {
    this.options = {
      ...options,
      apiEndpoint: options.apiEndpoint || 'https://api.gameshield.dev/verify',
      enableAnalytics: options.enableAnalytics !== false,
      minScore: options.minScore ?? 60,
      maxAttempts: options.maxAttempts ?? 5
    };
    this.securityUtils = new SecurityUtils();
    this.sessionId = this.securityUtils.generateSessionId();
    
    // Initialize analytics if enabled
    if (this.options.enableAnalytics) {
      const provider = this.options.analyticsProvider || new LocalStorageAnalyticsProvider();
      this.analyticsManager = new AnalyticsManager(provider);
    }
  }

  /**
   * Start the verification process
   * 
   * @public
   */
  public start(): void {
    const { container, gameType = 'random', difficulty = 'medium', gameOptions } = this.options;
    
    // Reset verification state
    this.isVerified = false;
    this.token = null;
    this.attempts = 0;
    this.startTime = Date.now();
    this.lastAnalysisResult = null;

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

    // Create PIXI application for the game
    const app = new PIXI.Application({
      width: containerElement.clientWidth || 400,
      height: containerElement.clientHeight || 400,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true
    });
    
    // Mount the app to the container
    containerElement.innerHTML = '';
    containerElement.appendChild(app.view as unknown as HTMLCanvasElement);

    // Create and start the game using the factory
    this.game = GameFactory.createGame(gameType, {
      app,
      width: containerElement.clientWidth || 400,
      height: containerElement.clientHeight || 400,
      difficulty,
      backgroundColor: 0x1099bb,
      onComplete: this.handleGameComplete.bind(this),
      ...gameOptions
    });

    this.game.start();
  }

  /**
   * Get current verification status
   * 
   * @returns Whether the user has been verified
   * @public
   */
  public isUserVerified(): boolean {
    return this.isVerified;
  }

  /**
   * Get current verification token (if verified)
   * 
   * @returns Verification token or null if not verified
   * @public
   */
  public getToken(): string | null {
    return this.token;
  }

  /**
   * Get available game types
   * 
   * @returns Array of available game types
   * @public
   */
  public getAvailableGameTypes(): GameType[] {
    return GameFactory.getAvailableTypes();
  }

  /**
   * Reset the verification and start a new challenge
   * 
   * @public
   */
  public reset(): void {
    this.start();
  }

  /**
   * Handle game completion
   * 
   * @param result - Game completion result
   * @private
   */
  private handleGameComplete(result: GameResult): void {
    this.attempts++;
    
    // Analyze behavior for potential bot detection
    // In a real implementation, this would use a more sophisticated analyzer
    const analysisResult: BehaviorAnalysisResult = {
      score: Math.floor(Math.random() * 100), // Simplified for demo
      level: 'low',
      factors: []
    };
    
    // Set risk level based on score
    if (analysisResult.score < 30) {
      analysisResult.level = 'high';
      analysisResult.factors.push('suspicious-pattern', 'abnormal-timing');
    } else if (analysisResult.score < 60) {
      analysisResult.level = 'medium';
      analysisResult.factors.push('unusual-timing');
    }
    
    this.lastAnalysisResult = analysisResult;
    
    // Check if the score meets the minimum requirement
    const minScore = this.options.minScore ?? 60;
    const isVerified = result.success && 
                      (this.lastAnalysisResult?.score ?? 0) >= minScore;
    
    if (isVerified) {
      // Generate verification token
      this.token = this.generateToken(result);
      this.isVerified = true;
      
      // Record successful verification
      this.recordVerificationAttempt(true, result);
      
      // Call success callback if provided
      if (this.options.onSuccess && this.token) {
        this.options.onSuccess(this.token);
      }
    } else {
      // Record failed verification
      this.recordVerificationAttempt(false, result);
      
      // Check for potentially malicious behavior
      this.detectMaliciousBehavior(result);
      
      // Call failure callback if provided
      if (this.options.onFailure) {
        this.options.onFailure('Verification failed');
      }
      
      // Auto-reset after max attempts
      const maxAttempts = this.options.maxAttempts ?? 5;
      if (this.attempts >= maxAttempts) {
        setTimeout(() => this.reset(), 1500);
      }
    }
  }

  /**
   * Generate verification token
   * 
   * @param result - Game completion result
   * @returns Verification token
   * @private
   */
  private generateToken(result: GameResult): string {
    const payload: TokenPayload = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      gameType: this.options.gameType || 'random',
      difficulty: this.options.difficulty || 'medium',
      score: result.score,
      success: result.success,
      behaviorScore: this.lastAnalysisResult?.score || 0
    };
    
    return this.securityUtils.generateToken(payload);
  }

  /**
   * Record verification attempt in analytics
   * 
   * @param success - Whether verification was successful
   * @param result - Game completion result
   * @private
   */
  private recordVerificationAttempt(success: boolean, result: GameResult): void {
    if (!this.analyticsManager) return;
    
    const duration = Date.now() - this.startTime;
    
    const verificationData: VerificationData = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      success,
      gameType: this.options.gameType || 'random',
      difficulty: this.options.difficulty || 'medium',
      duration,
      attempts: this.attempts,
      clientInfo: {
        userAgent: navigator.userAgent
      },
      behaviorMetrics: {
        mouseMovements: result.metrics?.mouseMovements || 0,
        keyPresses: result.metrics?.keyPresses || 0,
        interactionPattern: result.metrics?.interactionPattern,
        responseTime: duration
      }
    };
    
    this.analyticsManager.recordVerificationAttempt(verificationData);
  }

  /**
   * Detect and record potentially malicious behavior
   * 
   * @param result - Game completion result
   * @private
   */
  private detectMaliciousBehavior(result: GameResult): void {
    if (!this.analyticsManager || !this.lastAnalysisResult) return;
    
    // Only record if risk level is medium or high
    if (this.lastAnalysisResult.level !== 'low') {
      const duration = Date.now() - this.startTime;
      
      const maliciousData: MaliciousActivityData = {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        success: false,
        gameType: this.options.gameType || 'random',
        difficulty: this.options.difficulty || 'medium',
        duration,
        attempts: this.attempts,
        clientInfo: {
          userAgent: navigator.userAgent
        },
        behaviorMetrics: {
          mouseMovements: result.metrics?.mouseMovements || 0,
          keyPresses: result.metrics?.keyPresses || 0,
          interactionPattern: result.metrics?.interactionPattern,
          responseTime: duration
        },
        riskScore: this.lastAnalysisResult.score,
        flags: this.lastAnalysisResult.factors
      };
      
      this.analyticsManager.recordMaliciousActivity(maliciousData);
    }
  }
}

/**
 * Helper function to easily create a captcha instance
 * 
 * @param options - Configuration options
 * @returns CaptchaSDK instance
 */
export function createCaptcha(options: CaptchaOptions): CaptchaSDK {
  return new CaptchaSDK(options);
}

// Export analytics components
export { 
  AnalyticsManager,
  LocalStorageAnalyticsProvider
};

// Export types from game-core for convenience
export type { 
  GameType, 
  Difficulty,
  GameConfig
} from '../../game-core';

// Export types from local types file
export type {
  GameResult,
  BehaviorAnalysisResult,
  TokenPayload
} from './types';

// Export types from analytics
export type {
  VerificationData,
  MaliciousActivityData
} from './analytics';

// Export the analytics provider interface
export type { GameShieldAnalyticsProvider } from './analytics';
