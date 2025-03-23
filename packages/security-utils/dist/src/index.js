"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const uuid_1 = require("uuid");
/**
 * Security utilities for GameShield
 */
class SecurityUtils {
    /**
     * Create a new SecurityUtils instance
     *
     * @param tokenOptions - Options for token generation and validation
     */
    constructor(tokenOptions = {}) {
        this.tokenOptions = tokenOptions;
        this.defaultTokenOptions = {
            secretKey: 'default-secret-key-change-in-production',
            expiresIn: 3600, // 1 hour
            issuer: 'gameshield',
            audience: 'gameshield-users'
        };
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
    generateSessionId() {
        return (0, uuid_1.v4)();
    }
    /**
     * Generate a verification token
     *
     * @param payload - Token payload
     * @returns JWT token string
     */
    generateToken(payload) {
        const { secretKey, expiresIn, issuer, audience } = this.tokenOptions;
        return jsonwebtoken_1.default.sign(payload, secretKey, {
            expiresIn,
            issuer,
            audience
        });
    }
    /**
     * Validate a verification token
     *
     * @param token - JWT token to validate
     * @returns Verification result
     */
    validateToken(token) {
        try {
            const { secretKey, issuer, audience } = this.tokenOptions;
            const payload = jsonwebtoken_1.default.verify(token, secretKey, {
                issuer,
                audience
            });
            return {
                valid: true,
                payload
            };
        }
        catch (error) {
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
    analyzeUserBehavior(metrics) {
        const factors = [];
        let score = 0;
        // Check mouse movements (too few or too many are suspicious)
        if (metrics.mouseMovements !== undefined) {
            if (metrics.mouseMovements < 3) {
                factors.push('minimal-mouse-movement');
                score += 25;
            }
            else if (metrics.mouseMovements > 100) {
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
        let level = 'low';
        if (score >= 30 && score < 60) {
            level = 'medium';
        }
        else if (score >= 60) {
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
    generateFingerprint(clientInfo) {
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
        return crypto_js_1.default.SHA256(components.join('###')).toString();
    }
    /**
     * Encrypt sensitive data
     *
     * @param data - Data to encrypt
     * @param key - Encryption key (defaults to token secret key)
     * @returns Encrypted data string
     */
    encryptData(data, key) {
        const encryptionKey = key || this.tokenOptions.secretKey;
        return crypto_js_1.default.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
    }
    /**
     * Decrypt encrypted data
     *
     * @param encryptedData - Encrypted data string
     * @param key - Decryption key (defaults to token secret key)
     * @returns Decrypted data
     */
    decryptData(encryptedData, key) {
        try {
            const decryptionKey = key || this.tokenOptions.secretKey;
            const bytes = crypto_js_1.default.AES.decrypt(encryptedData, decryptionKey);
            return JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8));
        }
        catch (error) {
            throw new Error('Failed to decrypt data');
        }
    }
    /**
     * Generate a secure random challenge
     *
     * @param length - Length of the challenge string
     * @returns Random challenge string
     */
    generateChallenge(length = 32) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        // Use crypto API if available for better randomness
        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
            const values = new Uint32Array(length);
            window.crypto.getRandomValues(values);
            for (let i = 0; i < length; i++) {
                result += characters.charAt(values[i] % characters.length);
            }
        }
        else {
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
    hashData(data) {
        return crypto_js_1.default.SHA256(data).toString();
    }
    /**
     * Validate request rate for rate limiting
     *
     * @param identifier - Unique identifier (IP, session ID, etc.)
     * @param maxRequests - Maximum requests allowed in the time window
     * @param windowSeconds - Time window in seconds
     * @returns Whether the request is allowed
     */
    validateRate(identifier, maxRequests = 10, windowSeconds = 60) {
        if (typeof window === 'undefined')
            return true;
        const storageKey = `gameshield_rate_${identifier}`;
        const now = Date.now();
        // Get existing requests from storage
        const storedData = localStorage.getItem(storageKey);
        const requests = storedData ? JSON.parse(storedData) : [];
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
exports.SecurityUtils = SecurityUtils;
