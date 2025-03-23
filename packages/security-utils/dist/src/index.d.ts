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
export declare class SecurityUtils {
    private tokenOptions;
    private defaultTokenOptions;
    /**
     * Create a new SecurityUtils instance
     *
     * @param tokenOptions - Options for token generation and validation
     */
    constructor(tokenOptions?: TokenOptions);
    /**
     * Generate a unique session ID
     *
     * @returns Unique session ID
     */
    generateSessionId(): string;
    /**
     * Generate a verification token
     *
     * @param payload - Token payload
     * @returns JWT token string
     */
    generateToken(payload: Omit<TokenPayload, 'exp' | 'iat' | 'iss' | 'aud'>): string;
    /**
     * Validate a verification token
     *
     * @param token - JWT token to validate
     * @returns Verification result
     */
    validateToken(token: string): VerificationResult;
    /**
     * Analyze user behavior to detect bots or suspicious activity
     *
     * @param metrics - User behavior metrics
     * @returns Behavior analysis result
     */
    analyzeUserBehavior(metrics: BehaviorMetrics): BehaviorAnalysisResult;
    /**
     * Generate a fingerprint from client information
     *
     * @param clientInfo - Client information
     * @returns Fingerprint hash
     */
    generateFingerprint(clientInfo: Record<string, any>): string;
    /**
     * Encrypt sensitive data
     *
     * @param data - Data to encrypt
     * @param key - Encryption key (defaults to token secret key)
     * @returns Encrypted data string
     */
    encryptData(data: any, key?: string): string;
    /**
     * Decrypt encrypted data
     *
     * @param encryptedData - Encrypted data string
     * @param key - Decryption key (defaults to token secret key)
     * @returns Decrypted data
     */
    decryptData(encryptedData: string, key?: string): any;
    /**
     * Generate a secure random challenge
     *
     * @param length - Length of the challenge string
     * @returns Random challenge string
     */
    generateChallenge(length?: number): string;
    /**
     * Hash data using SHA-256
     *
     * @param data - Data to hash
     * @returns SHA-256 hash
     */
    hashData(data: string): string;
    /**
     * Validate request rate for rate limiting
     *
     * @param identifier - Unique identifier (IP, session ID, etc.)
     * @param maxRequests - Maximum requests allowed in the time window
     * @param windowSeconds - Time window in seconds
     * @returns Whether the request is allowed
     */
    validateRate(identifier: string, maxRequests?: number, windowSeconds?: number): boolean;
}
