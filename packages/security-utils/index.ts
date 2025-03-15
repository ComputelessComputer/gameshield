/**
 * Security Utilities for GameShield
 * 
 * This module provides token generation, verification, and encryption utilities
 * to secure the communication between the client and server components of GameShield.
 */

import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

// Types
export interface TokenPayload {
  sessionId: string;
  timestamp: number;
  gameType: string;
  behaviorMetrics?: {
    isHuman: boolean;
    confidence: number;
  };
  gameResult?: {
    success: boolean;
    score: number;
  };
  clientData?: {
    fingerprint: string;
    userAgent: string;
    ip?: string;
  };
}

export interface VerificationResult {
  valid: boolean;
  isHuman: boolean;
  confidence: number;
  error?: string;
}

// Configuration
export interface SecurityConfig {
  jwtSecret: string;
  encryptionKey: string;
  tokenExpiration: number; // in seconds
}

// Default configuration
const defaultConfig: SecurityConfig = {
  jwtSecret: process.env.JWT_SECRET || 'gameshield-default-jwt-secret-change-in-production',
  encryptionKey: process.env.ENCRYPTION_KEY || 'gameshield-default-encryption-key-change-in-production',
  tokenExpiration: 300 // 5 minutes
};

/**
 * Security utilities class
 */
export class SecurityUtils {
  private config: SecurityConfig;
  
  constructor(config: Partial<SecurityConfig> = {}) {
    this.config = {
      ...defaultConfig,
      ...config
    };
  }
  
  /**
   * Generate a session ID
   */
  generateSessionId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `gs-${timestamp}-${random}`;
  }
  
  /**
   * Generate a client fingerprint based on browser information
   */
  generateFingerprint(userAgent: string, screenResolution: string, timezone: string): string {
    const data = `${userAgent}|${screenResolution}|${timezone}`;
    return CryptoJS.SHA256(data).toString();
  }
  
  /**
   * Generate a JWT token with the provided payload
   */
  generateToken(payload: TokenPayload): string {
    const tokenPayload = {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + this.config.tokenExpiration
    };
    
    return jwt.sign(tokenPayload, this.config.jwtSecret);
  }
  
  /**
   * Verify a JWT token
   */
  verifyToken(token: string): { valid: boolean; payload?: TokenPayload; error?: string } {
    try {
      const payload = jwt.verify(token, this.config.jwtSecret) as TokenPayload;
      return { valid: true, payload };
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Unknown error verifying token' 
      };
    }
  }
  
  /**
   * Encrypt data
   */
  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.config.encryptionKey).toString();
  }
  
  /**
   * Decrypt data
   */
  decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.config.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  
  /**
   * Verify a CAPTCHA result
   * This combines token verification with behavior analysis
   */
  verifyCaptcha(token: string): VerificationResult {
    // Verify the token
    const tokenResult = this.verifyToken(token);
    
    if (!tokenResult.valid || !tokenResult.payload) {
      return {
        valid: false,
        isHuman: false,
        confidence: 0,
        error: tokenResult.error || 'Invalid token'
      };
    }
    
    const payload = tokenResult.payload;
    
    // Check token expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.timestamp && (now - payload.timestamp / 1000) > this.config.tokenExpiration) {
      return {
        valid: false,
        isHuman: false,
        confidence: 0,
        error: 'Token expired'
      };
    }
    
    // Check behavior metrics
    if (!payload.behaviorMetrics) {
      return {
        valid: false,
        isHuman: false,
        confidence: 0,
        error: 'Missing behavior metrics'
      };
    }
    
    // Check game result
    if (!payload.gameResult || !payload.gameResult.success) {
      return {
        valid: true, // Token is valid, but game was not completed successfully
        isHuman: payload.behaviorMetrics.isHuman,
        confidence: payload.behaviorMetrics.confidence * 0.5, // Reduce confidence if game wasn't completed
      };
    }
    
    // Return the verification result
    return {
      valid: true,
      isHuman: payload.behaviorMetrics.isHuman,
      confidence: payload.behaviorMetrics.confidence
    };
  }
}

// Export a default instance with default configuration
export const securityUtils = new SecurityUtils();

// Export types and classes
export default SecurityUtils;
