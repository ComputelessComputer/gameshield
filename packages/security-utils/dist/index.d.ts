/**
 * Security Utilities for GameShield
 *
 * This module provides token generation, verification, and encryption utilities
 * to secure the communication between the client and server components of GameShield.
 */
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
export interface SecurityConfig {
    jwtSecret: string;
    encryptionKey: string;
    tokenExpiration: number;
}
/**
 * Security utilities class
 */
export declare class SecurityUtils {
    private config;
    constructor(config?: Partial<SecurityConfig>);
    /**
     * Generate a session ID
     */
    generateSessionId(): string;
    /**
     * Generate a client fingerprint based on browser information
     */
    generateFingerprint(userAgent: string, screenResolution: string, timezone: string): string;
    /**
     * Generate a JWT token with the provided payload
     */
    generateToken(payload: TokenPayload): string;
    /**
     * Verify a JWT token
     */
    verifyToken(token: string): {
        valid: boolean;
        payload?: TokenPayload;
        error?: string;
    };
    /**
     * Encrypt data
     */
    encrypt(data: string): string;
    /**
     * Decrypt data
     */
    decrypt(encryptedData: string): string;
    /**
     * Verify a CAPTCHA result
     * This combines token verification with behavior analysis
     */
    verifyCaptcha(token: string): VerificationResult;
}
export declare const securityUtils: SecurityUtils;
export default SecurityUtils;
