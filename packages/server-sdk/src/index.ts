import type { VerifyResponse } from '@gameshield/shared';

export interface GameShieldOptions {
  /**
   * Your GameShield secret key (starts with gs_sk_)
   */
  secretKey: string;

  /**
   * The site key for verification (starts with gs_pk_)
   */
  siteKey: string;

  /**
   * Custom API endpoint (default: https://api.gameshield.dev)
   */
  apiUrl?: string;

  /**
   * Request timeout in milliseconds (default: 10000)
   */
  timeout?: number;
}

export interface VerificationResult {
  /**
   * Whether the verification was successful
   */
  success: boolean;

  /**
   * The challenge ID if successful
   */
  challengeId?: string;

  /**
   * The user's game score
   */
  score?: number;

  /**
   * Number of lines cleared
   */
  linesCleared?: number;

  /**
   * Time taken to solve in milliseconds
   */
  solveTime?: number;

  /**
   * Error message if verification failed
   */
  error?: string;
}

export class GameShield {
  private secretKey: string;
  private siteKey: string;
  private apiUrl: string;
  private timeout: number;

  constructor(options: GameShieldOptions) {
    if (!options.secretKey) {
      throw new Error('secretKey is required');
    }
    if (!options.siteKey) {
      throw new Error('siteKey is required');
    }

    this.secretKey = options.secretKey;
    this.siteKey = options.siteKey;
    this.apiUrl = options.apiUrl || 'https://api.gameshield.dev';
    this.timeout = options.timeout || 10000;
  }

  /**
   * Verify a GameShield token
   * @param token The verification token from the client widget
   * @returns Verification result
   */
  async verify(token: string): Promise<VerificationResult> {
    if (!token) {
      return {
        success: false,
        error: 'Token is required',
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(
        `${this.apiUrl}/api/v1/${this.siteKey}/siteverify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: this.secretKey,
            response: token,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      const data: VerifyResponse = await response.json();

      return {
        success: data.success,
        challengeId: data.challengeId,
        score: data.score,
        linesCleared: data.linesCleared,
        solveTime: data.solveTime,
        error: data.error,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            error: 'Request timeout',
          };
        }
        return {
          success: false,
          error: error.message,
        };
      }
      return {
        success: false,
        error: 'Unknown error',
      };
    }
  }
}

// Named export for convenience
export { GameShield as default };

// Re-export types from shared package
export type {
  VerifyRequest,
  VerifyResponse,
} from '@gameshield/shared';
