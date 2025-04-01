import { TokenData, VerificationResult, VerificationOptions } from './types';
import * as jwt from 'jsonwebtoken';

/**
 * Class for validating GameShield tokens
 */
export class TokenValidator {
  private readonly secretKey: string;
  private readonly minConfidence: number;
  private readonly checkExpiration: boolean;
  private readonly customValidator?: (data: TokenData) => boolean | Promise<boolean>;
  
  /**
   * Creates a new TokenValidator instance
   * @param options Verification options
   */
  constructor(options: VerificationOptions = {}) {
    this.secretKey = options.secretKey || 'gameshield-default-secret';
    this.minConfidence = options.minConfidence ?? 0.7;
    this.checkExpiration = options.checkExpiration ?? true;
    this.customValidator = options.customValidator;
  }
  
  /**
   * Validates a GameShield token
   * @param token Token string to validate
   * @returns Verification result
   */
  public async validate(token: string): Promise<VerificationResult> {
    // Check if token is provided
    if (!token) {
      return {
        success: false,
        error: 'Token is required'
      };
    }
    
    try {
      // Check token format
      if (!token.startsWith('GS_')) {
        return {
          success: false,
          error: 'Invalid token format'
        };
      }
      
      // Extract token data
      const tokenData = this.extractTokenData(token);
      
      if (!tokenData) {
        return {
          success: false,
          error: 'Invalid token data'
        };
      }
      
      // Check token expiration
      if (this.checkExpiration && tokenData.exp && tokenData.exp < Date.now()) {
        return {
          success: false,
          error: 'Token has expired'
        };
      }
      
      // Check game result
      if (!tokenData.gameResult.success) {
        return {
          success: false,
          error: 'Game was not completed successfully'
        };
      }
      
      // Check behavior metrics
      if (!tokenData.behaviorMetrics.isHuman || 
          tokenData.behaviorMetrics.confidence < this.minConfidence) {
        return {
          success: false,
          error: 'Behavior analysis indicates bot-like behavior',
          score: tokenData.behaviorMetrics.confidence
        };
      }
      
      // Run custom validator if provided
      if (this.customValidator) {
        const customResult = await Promise.resolve(this.customValidator(tokenData));
        if (!customResult) {
          return {
            success: false,
            error: 'Custom validation failed'
          };
        }
      }
      
      // All checks passed
      return {
        success: true,
        data: tokenData,
        score: tokenData.behaviorMetrics.confidence
      };
    } catch (error) {
      return {
        success: false,
        error: `Validation error: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Extracts data from a token
   * @param token Token string to extract data from
   * @returns Decoded token data or null if invalid
   */
  private extractTokenData(token: string): TokenData | null {
    try {
      // Remove the prefix
      const encodedData = token.substring(3); // 'GS_' prefix is 3 characters
      
      // In a real implementation, this would use JWT verification
      // For now, we'll just decode the base64 string
      const jsonString = atob(encodedData);
      
      // Parse the JSON data
      const data = JSON.parse(jsonString) as TokenData;
      
      return data;
    } catch (error) {
      console.error('Error extracting token data:', error);
      return null;
    }
  }
  
  /**
   * Creates a signed JWT token from token data
   * @param data Token data
   * @returns Signed JWT token
   */
  public createSignedToken(data: TokenData): string {
    return jwt.sign(data, this.secretKey, {
      expiresIn: '5m' // Token expires in 5 minutes
    });
  }
  
  /**
   * Verifies a signed JWT token
   * @param token Signed JWT token
   * @returns Decoded token data or null if invalid
   */
  public verifySignedToken(token: string): TokenData | null {
    try {
      const decoded = jwt.verify(token, this.secretKey) as TokenData;
      return decoded;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }
}
