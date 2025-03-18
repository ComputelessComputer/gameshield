import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Security utility types
 */
export interface TokenOptions {
  /** Secret key for token signing */
  secretKey: string;
  /** Token expiration time in seconds */
  expiresIn?: number;
  /** Issuer of the token */
  issuer?: string;
  /** Audience of the token */
  audience?: string;
}

export interface TokenPayload {
  /** Subject of the token (usually session ID) */
  sub: string;
  /** Custom data to include in the token */
  data: any;
  /** Token expiration time (set automatically) */
  exp?: number;
  /** Token issued at time (set automatically) */
  iat?: number;
  /** Token issuer (set automatically if provided in options) */
  iss?: string;
  /** Token audience (set automatically if provided in options) */
  aud?: string;
}

export interface VerificationResult {
  /** Whether the token is valid */
  valid: boolean;
  /** Decoded token payload if valid */
  payload?: TokenPayload;
  /** Error message if invalid */
  error?: string;
}

export interface BehaviorMetrics {
  /** Number of mouse movements during verification */
  mouseMovements?: number;
  /** Number of key presses during verification */
  keyPresses?: number;
  /** Pattern of user interaction */
  interactionPattern?: string;
  /** Time taken to respond to challenges in ms */
  responseTime?: number;
  /** Additional custom metrics */
  [key: string]: any;
}

export interface BehaviorAnalysisResult {
  /** Risk score from 0-100, higher means more suspicious */
  score: number;
  /** Risk level assessment */
  level: 'low' | 'medium' | 'high';
  /** Factors that contributed to the risk score */
  factors: string[];
}

/**
 * Security utilities for GameShield
 */
export class SecurityUtils {
  private defaultTokenOptions: TokenOptions = {
    secretKey: 'default-secret-key-change-in-production',
    expiresIn: 3600, // 1 hour
    issuer: 'gameshield',
    audience: 'gameshield-users'
  };

  /**
   * Create a new SecurityUtils instance
   * 
   * @param tokenOptions - Options for token generation and validation
   */
  constructor(private tokenOptions: TokenOptions = {} as TokenOptions) {
    this.tokenOptions = {
      ...this.defaultTokenOptions,
      ...tokenOptions
    };
  }

  /**
   * Generate a unique session ID
   * 
   * @returns Unique session ID
   */
  public generateSessionId(): string {
    return uuidv4();
  }

  /**
   * Generate a verification token
   * 
   * @param payload - Token payload
   * @returns JWT token string
   */
  public generateToken(payload: Omit<TokenPayload, 'exp' | 'iat' | 'iss' | 'aud'>): string {
    const { secretKey, expiresIn, issuer, audience } = this.tokenOptions;
    
    return jwt.sign(
      payload,
      secretKey,
      {
        expiresIn,
        issuer,
        audience
      }
    );
  }

  /**
   * Validate a verification token
   * 
   * @param token - JWT token to validate
   * @returns Verification result
   */
  public validateToken(token: string): VerificationResult {
    try {
      const { secretKey, issuer, audience } = this.tokenOptions;
      
      const payload = jwt.verify(token, secretKey, {
        issuer,
        audience
      }) as TokenPayload;
      
      return {
        valid: true,
        payload
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Analyze user behavior to detect bots or suspicious activity
   * 
   * @param metrics - User behavior metrics
   * @returns Behavior analysis result
   */
  public analyzeUserBehavior(metrics: BehaviorMetrics): BehaviorAnalysisResult {
    const factors: string[] = [];
    let score = 0;
    
    // Check mouse movements (too few or too many are suspicious)
    if (metrics.mouseMovements !== undefined) {
      if (metrics.mouseMovements < 3) {
        factors.push('minimal-mouse-movement');
        score += 25;
      } else if (metrics.mouseMovements > 100) {
        factors.push('excessive-mouse-movement');
        score += 15;
      }
    }
    
    // Check response time (too fast is suspicious)
    if (metrics.responseTime !== undefined) {
      if (metrics.responseTime < 500) {
        factors.push('suspiciously-fast-response');
        score += 30;
      }
    }
    
    // Check interaction pattern
    if (metrics.interactionPattern) {
      if (metrics.interactionPattern === 'linear' || 
          metrics.interactionPattern === 'robotic') {
        factors.push('unnatural-interaction-pattern');
        score += 25;
      }
    }
    
    // Determine risk level based on score
    let level: 'low' | 'medium' | 'high' = 'low';
    if (score >= 30 && score < 60) {
      level = 'medium';
    } else if (score >= 60) {
      level = 'high';
    }
    
    return {
      score,
      level,
      factors
    };
  }

  /**
   * Generate a fingerprint from client information
   * 
   * @param clientInfo - Client information
   * @returns Fingerprint hash
   */
  public generateFingerprint(clientInfo: Record<string, any>): string {
    const components = [
      clientInfo.userAgent || '',
      clientInfo.language || '',
      clientInfo.screenResolution || '',
      clientInfo.timezone || '',
      clientInfo.platform || '',
      clientInfo.plugins || '',
      clientInfo.canvas || '',
      clientInfo.webgl || ''
    ];
    
    return CryptoJS.SHA256(components.join('###')).toString();
  }

  /**
   * Encrypt sensitive data
   * 
   * @param data - Data to encrypt
   * @param key - Encryption key (defaults to token secret key)
   * @returns Encrypted data string
   */
  public encryptData(data: any, key?: string): string {
    const encryptionKey = key || this.tokenOptions.secretKey;
    return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
  }

  /**
   * Decrypt encrypted data
   * 
   * @param encryptedData - Encrypted data string
   * @param key - Decryption key (defaults to token secret key)
   * @returns Decrypted data
   */
  public decryptData(encryptedData: string, key?: string): any {
    try {
      const decryptionKey = key || this.tokenOptions.secretKey;
      const bytes = CryptoJS.AES.decrypt(encryptedData, decryptionKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Generate a secure random challenge
   * 
   * @param length - Length of the challenge string
   * @returns Random challenge string
   */
  public generateChallenge(length: number = 32): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    // Use crypto API if available for better randomness
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const values = new Uint32Array(length);
      window.crypto.getRandomValues(values);
      
      for (let i = 0; i < length; i++) {
        result += characters.charAt(values[i] % characters.length);
      }
    } else {
      // Fallback to Math.random
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    
    return result;
  }

  /**
   * Hash data using SHA-256
   * 
   * @param data - Data to hash
   * @returns SHA-256 hash
   */
  public hashData(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  /**
   * Validate request rate for rate limiting
   * 
   * @param identifier - Unique identifier (IP, session ID, etc.)
   * @param maxRequests - Maximum requests allowed in the time window
   * @param windowSeconds - Time window in seconds
   * @returns Whether the request is allowed
   */
  public validateRate(
    identifier: string,
    maxRequests: number = 10,
    windowSeconds: number = 60
  ): boolean {
    if (typeof window === 'undefined') return true;
    
    const storageKey = `gameshield_rate_${identifier}`;
    const now = Date.now();
    
    // Get existing requests from storage
    const storedData = localStorage.getItem(storageKey);
    const requests: number[] = storedData ? JSON.parse(storedData) : [];
    
    // Filter out requests outside the time window
    const windowStart = now - (windowSeconds * 1000);
    const recentRequests = requests.filter(timestamp => timestamp > windowStart);
    
    // Check if rate limit exceeded
    if (recentRequests.length >= maxRequests) {
      return false;
    }
    
    // Add current request and update storage
    recentRequests.push(now);
    localStorage.setItem(storageKey, JSON.stringify(recentRequests));
    
    return true;
  }
}
