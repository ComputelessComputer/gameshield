"use strict";
/**
 * Security Utilities for GameShield
 *
 * This module provides token generation, verification, and encryption utilities
 * to secure the communication between the client and server components of GameShield.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityUtils = exports.SecurityUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_js_1 = __importDefault(require("crypto-js"));
// Default configuration
const defaultConfig = {
    jwtSecret: process.env.JWT_SECRET || 'gameshield-default-jwt-secret-change-in-production',
    encryptionKey: process.env.ENCRYPTION_KEY || 'gameshield-default-encryption-key-change-in-production',
    tokenExpiration: 300 // 5 minutes
};
/**
 * Security utilities class
 */
class SecurityUtils {
    constructor(config = {}) {
        this.config = {
            ...defaultConfig,
            ...config
        };
    }
    /**
     * Generate a session ID
     */
    generateSessionId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        return `gs-${timestamp}-${random}`;
    }
    /**
     * Generate a client fingerprint based on browser information
     */
    generateFingerprint(userAgent, screenResolution, timezone) {
        const data = `${userAgent}|${screenResolution}|${timezone}`;
        return crypto_js_1.default.SHA256(data).toString();
    }
    /**
     * Generate a JWT token with the provided payload
     */
    generateToken(payload) {
        const tokenPayload = {
            ...payload,
            exp: Math.floor(Date.now() / 1000) + this.config.tokenExpiration
        };
        return jsonwebtoken_1.default.sign(tokenPayload, this.config.jwtSecret);
    }
    /**
     * Verify a JWT token
     */
    verifyToken(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this.config.jwtSecret);
            return { valid: true, payload };
        }
        catch (error) {
            return {
                valid: false,
                error: error instanceof Error ? error.message : 'Unknown error verifying token'
            };
        }
    }
    /**
     * Encrypt data
     */
    encrypt(data) {
        return crypto_js_1.default.AES.encrypt(data, this.config.encryptionKey).toString();
    }
    /**
     * Decrypt data
     */
    decrypt(encryptedData) {
        const bytes = crypto_js_1.default.AES.decrypt(encryptedData, this.config.encryptionKey);
        return bytes.toString(crypto_js_1.default.enc.Utf8);
    }
    /**
     * Verify a CAPTCHA result
     * This combines token verification with behavior analysis
     */
    verifyCaptcha(token) {
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
exports.SecurityUtils = SecurityUtils;
// Export a default instance with default configuration
exports.securityUtils = new SecurityUtils();
// Export types and classes
exports.default = SecurityUtils;
