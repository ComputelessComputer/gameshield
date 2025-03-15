import { TokenPayload } from '../types';

/**
 * SecurityUtils
 * 
 * Handles token generation, verification, and other security-related functions
 * for the GameShield CAPTCHA system.
 */
export class SecurityUtils {
  private readonly TOKEN_EXPIRATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  /**
   * Generate a unique session ID
   */
  public generateSessionId(): string {
    return this.generateRandomString(32);
  }
  
  /**
   * Generate a token containing the verification data
   */
  public generateToken(payload: TokenPayload): string {
    // In a real implementation, this would use JWT with proper signing
    // For now, we'll use a simple base64 encoding with a timestamp check
    
    const tokenData = {
      ...payload,
      exp: Date.now() + this.TOKEN_EXPIRATION,
      fingerprint: this.generateFingerprint()
    };
    
    return this.encodeToken(tokenData);
  }
  
  /**
   * Verify a token and extract its payload
   */
  public verifyToken(token: string): { valid: boolean; payload?: TokenPayload; error?: string } {
    try {
      const decoded = this.decodeToken(token);
      
      // Check if token has expired
      if (decoded.exp < Date.now()) {
        return { valid: false, error: 'Token has expired' };
      }
      
      // Check fingerprint (in a real implementation)
      if (!this.verifyFingerprint(decoded.fingerprint)) {
        return { valid: false, error: 'Invalid token fingerprint' };
      }
      
      // Extract the original payload
      const { exp, fingerprint, ...payload } = decoded;
      
      return {
        valid: true,
        payload: payload as TokenPayload
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid token'
      };
    }
  }
  
  /**
   * Generate a browser fingerprint
   * In a real implementation, this would use more sophisticated techniques
   */
  private generateFingerprint(): string {
    // In a real implementation, this would collect browser-specific information
    // For now, we'll just generate a random ID
    return this.generateRandomString(16);
  }
  
  /**
   * Verify a browser fingerprint
   * In a real implementation, this would compare with the current browser
   */
  private verifyFingerprint(fingerprint: string): boolean {
    // In a real implementation, this would verify the fingerprint
    // For now, we'll just return true
    return true;
  }
  
  /**
   * Encode a token payload
   */
  private encodeToken(data: any): string {
    // In a real implementation, this would use JWT
    // For now, we'll use base64 encoding
    return btoa(JSON.stringify(data));
  }
  
  /**
   * Decode a token
   */
  private decodeToken(token: string): any {
    // In a real implementation, this would verify JWT signature
    // For now, we'll just decode the base64
    try {
      return JSON.parse(atob(token));
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }
  
  /**
   * Generate a random string of specified length
   */
  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(randomValues[i] % characters.length);
    }
    
    return result;
  }
}
