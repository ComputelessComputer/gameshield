import { GameResult, BehaviorMetrics, TokenData } from './types';

/**
 * TokenManager class for generating and handling verification tokens
 */
export class TokenManager {
  private static readonly TOKEN_PREFIX = 'GS_';
  
  /**
   * Generates a verification token containing game results and behavior analysis
   * @param data Token data including subject, game result, and optionally behavior metrics
   * @returns Encoded token string
   */
  public static generateToken(data: {
    sub: string;
    gameResult: GameResult;
    behaviorMetrics?: BehaviorMetrics;
  }): string {
    const tokenData: TokenData = {
      sub: data.sub,
      gameResult: data.gameResult,
      behaviorMetrics: data.behaviorMetrics || {
        isHuman: true, // Default to assuming human when behavior analyzer is not used
        confidence: 1.0
      },
      iat: Date.now(),
      // Token expires in 5 minutes
      exp: Date.now() + 5 * 60 * 1000
    };
    
    // Encode the token data
    const encodedData = this.encodeTokenData(tokenData);
    
    // Add the token prefix
    return `${this.TOKEN_PREFIX}${encodedData}`;
  }
  
  /**
   * Encodes token data into a string
   * @param data Token data to encode
   * @returns Encoded token string
   */
  private static encodeTokenData(data: TokenData): string {
    // Convert the data to JSON and encode as base64
    const jsonString = JSON.stringify(data);
    
    // In a real implementation, this would include encryption and signing
    // For now, we'll just use base64 encoding for demonstration
    return btoa(jsonString);
  }
  
  /**
   * Validates a token format (not the contents)
   * @param token Token string to validate
   * @returns Whether the token format is valid
   */
  public static validateTokenFormat(token: string): boolean {
    if (!token || typeof token !== 'string') {
      return false;
    }
    
    // Check if the token has the correct prefix
    if (!token.startsWith(this.TOKEN_PREFIX)) {
      return false;
    }
    
    // Check if the token has content after the prefix
    if (token.length <= this.TOKEN_PREFIX.length) {
      return false;
    }
    
    return true;
  }
  
  /**
   * Extracts data from a token
   * @param token Token string to extract data from
   * @returns Decoded token data or null if invalid
   */
  public static extractTokenData(token: string): TokenData | null {
    if (!this.validateTokenFormat(token)) {
      return null;
    }
    
    try {
      // Remove the prefix
      const encodedData = token.substring(this.TOKEN_PREFIX.length);
      
      // Decode the base64 string
      const jsonString = atob(encodedData);
      
      // Parse the JSON data
      const data = JSON.parse(jsonString) as TokenData;
      
      return data;
    } catch (error) {
      console.error('Error extracting token data:', error);
      return null;
    }
  }
}
