"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("../index");
(0, globals_1.describe)('SecurityUtils', () => {
    let securityUtils;
    let customTokenOptions;
    (0, globals_1.beforeEach)(() => {
        // Setup custom token options for testing
        customTokenOptions = {
            secretKey: 'test-secret-key',
            expiresIn: 300, // 5 minutes
            issuer: 'test-issuer',
            audience: 'test-audience'
        };
        // Create a new instance for each test
        securityUtils = new index_1.SecurityUtils(customTokenOptions);
    });
    (0, globals_1.test)('should generate a unique session ID', () => {
        const sessionId1 = securityUtils.generateSessionId();
        const sessionId2 = securityUtils.generateSessionId();
        (0, globals_1.expect)(sessionId1).toBeDefined();
        (0, globals_1.expect)(typeof sessionId1).toBe('string');
        (0, globals_1.expect)(sessionId1.length).toBeGreaterThan(0);
        (0, globals_1.expect)(sessionId1).not.toEqual(sessionId2); // Should be unique
    });
    (0, globals_1.test)('should generate a valid JWT token', () => {
        const payload = {
            sub: 'test-session-id',
            data: {
                userId: '123',
                gameType: 'puzzle',
                score: 85
            }
        };
        const token = securityUtils.generateToken(payload);
        (0, globals_1.expect)(token).toBeDefined();
        (0, globals_1.expect)(typeof token).toBe('string');
        (0, globals_1.expect)(token.split('.')).toHaveLength(3); // JWT format: header.payload.signature
    });
    (0, globals_1.test)('should validate a valid token', () => {
        const payload = {
            sub: 'test-session-id',
            data: {
                userId: '123',
                gameType: 'puzzle',
                score: 85
            }
        };
        const token = securityUtils.generateToken(payload);
        const result = securityUtils.validateToken(token);
        (0, globals_1.expect)(result.valid).toBe(true);
        (0, globals_1.expect)(result.payload).toBeDefined();
        (0, globals_1.expect)(result.payload?.sub).toBe('test-session-id');
        (0, globals_1.expect)(result.payload?.data.userId).toBe('123');
        (0, globals_1.expect)(result.payload?.data.gameType).toBe('puzzle');
        (0, globals_1.expect)(result.payload?.data.score).toBe(85);
    });
    (0, globals_1.test)('should reject an invalid token', () => {
        const invalidToken = 'invalid.token.format';
        const result = securityUtils.validateToken(invalidToken);
        (0, globals_1.expect)(result.valid).toBe(false);
        (0, globals_1.expect)(result.error).toBeDefined();
        (0, globals_1.expect)(result.payload).toBeUndefined();
    });
    (0, globals_1.test)('should reject an expired token', () => {
        // Create utils with very short expiration
        const shortExpirationUtils = new index_1.SecurityUtils({
            ...customTokenOptions,
            expiresIn: 1 // 1 second
        });
        const payload = {
            sub: 'test-session-id',
            data: { test: true }
        };
        const token = shortExpirationUtils.generateToken(payload);
        // Wait for token to expire
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = shortExpirationUtils.validateToken(token);
                (0, globals_1.expect)(result.valid).toBe(false);
                (0, globals_1.expect)(result.error).toContain('expired');
                resolve();
            }, 1500); // Wait 1.5 seconds
        });
    });
    (0, globals_1.test)('should analyze user behavior and detect suspicious patterns', () => {
        // Test suspicious behavior (too few mouse movements, too fast response)
        const suspiciousMetrics = {
            mouseMovements: 2,
            responseTime: 200,
            interactionPattern: 'linear'
        };
        const suspiciousResult = securityUtils.analyzeUserBehavior(suspiciousMetrics);
        (0, globals_1.expect)(suspiciousResult.score).toBeGreaterThan(50);
        (0, globals_1.expect)(suspiciousResult.level).not.toBe('low');
        (0, globals_1.expect)(suspiciousResult.factors).toContain('minimal-mouse-movement');
        (0, globals_1.expect)(suspiciousResult.factors).toContain('suspiciously-fast-response');
        (0, globals_1.expect)(suspiciousResult.factors).toContain('unnatural-interaction-pattern');
        // Test normal behavior
        const normalMetrics = {
            mouseMovements: 30,
            responseTime: 3000,
            interactionPattern: 'natural'
        };
        const normalResult = securityUtils.analyzeUserBehavior(normalMetrics);
        (0, globals_1.expect)(normalResult.score).toBeLessThan(30);
        (0, globals_1.expect)(normalResult.level).toBe('low');
        (0, globals_1.expect)(normalResult.factors).toHaveLength(0);
    });
    (0, globals_1.test)('should generate consistent fingerprints for the same client info', () => {
        const clientInfo = {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            language: 'en-US',
            screenResolution: '1920x1080',
            timezone: 'America/New_York',
            platform: 'Win32'
        };
        const fingerprint1 = securityUtils.generateFingerprint(clientInfo);
        const fingerprint2 = securityUtils.generateFingerprint(clientInfo);
        (0, globals_1.expect)(fingerprint1).toBe(fingerprint2); // Should be deterministic
        // Different client info should produce different fingerprints
        const differentClientInfo = {
            ...clientInfo,
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        };
        const fingerprint3 = securityUtils.generateFingerprint(differentClientInfo);
        (0, globals_1.expect)(fingerprint3).not.toBe(fingerprint1);
    });
    (0, globals_1.test)('should encrypt and decrypt data correctly', () => {
        const sensitiveData = {
            userId: '12345',
            email: 'user@example.com',
            preferences: {
                theme: 'dark',
                notifications: true
            }
        };
        const encryptedData = securityUtils.encryptData(sensitiveData);
        (0, globals_1.expect)(encryptedData).toBeDefined();
        (0, globals_1.expect)(typeof encryptedData).toBe('string');
        // Should be able to decrypt
        const decryptedData = securityUtils.decryptData(encryptedData);
        (0, globals_1.expect)(decryptedData).toEqual(sensitiveData);
    });
    (0, globals_1.test)('should throw error when decrypting invalid data', () => {
        (0, globals_1.expect)(() => {
            securityUtils.decryptData('invalid-encrypted-data');
        }).toThrow();
    });
    (0, globals_1.test)('should generate secure random challenges', () => {
        const challenge1 = securityUtils.generateChallenge();
        const challenge2 = securityUtils.generateChallenge();
        (0, globals_1.expect)(challenge1).toBeDefined();
        (0, globals_1.expect)(challenge1.length).toBe(32); // Default length
        (0, globals_1.expect)(challenge1).not.toBe(challenge2); // Should be random
        // Custom length
        const customLengthChallenge = securityUtils.generateChallenge(64);
        (0, globals_1.expect)(customLengthChallenge.length).toBe(64);
    });
    (0, globals_1.test)('should hash data consistently', () => {
        const data = 'test-data-to-hash';
        const hash1 = securityUtils.hashData(data);
        const hash2 = securityUtils.hashData(data);
        (0, globals_1.expect)(hash1).toBe(hash2); // Should be deterministic
        (0, globals_1.expect)(hash1.length).toBeGreaterThan(0);
        // Different data should produce different hashes
        const differentData = 'different-data';
        const hash3 = securityUtils.hashData(differentData);
        (0, globals_1.expect)(hash3).not.toBe(hash1);
    });
    (0, globals_1.test)('should validate request rate correctly', () => {
        // Mock localStorage
        const mockLocalStorage = {
            getItem: globals_1.jest.fn(),
            setItem: globals_1.jest.fn(),
            removeItem: globals_1.jest.fn(),
            clear: globals_1.jest.fn(),
            key: globals_1.jest.fn(),
            length: 0
        };
        Object.defineProperty(global, 'localStorage', {
            value: mockLocalStorage,
            writable: true
        });
        const identifier = 'test-ip-address';
        // First request with no previous requests
        mockLocalStorage.getItem.mockReturnValueOnce(null);
        (0, globals_1.expect)(securityUtils.validateRate(identifier, 3, 60)).toBe(true);
        (0, globals_1.expect)(mockLocalStorage.setItem).toHaveBeenCalledWith(`gameshield_rate_${identifier}`, globals_1.expect.any(String));
        // Second request with one previous request
        mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([Date.now() - 10000]));
        (0, globals_1.expect)(securityUtils.validateRate(identifier, 3, 60)).toBe(true);
        // Third request with two previous requests
        mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([
            Date.now() - 20000,
            Date.now() - 10000
        ]));
        (0, globals_1.expect)(securityUtils.validateRate(identifier, 3, 60)).toBe(true);
        // Fourth request with three previous requests (should be rejected)
        mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([
            Date.now() - 30000,
            Date.now() - 20000,
            Date.now() - 10000
        ]));
        (0, globals_1.expect)(securityUtils.validateRate(identifier, 3, 60)).toBe(false);
        // Request with old requests outside the time window
        mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([
            Date.now() - 70000, // Older than the 60 second window
            Date.now() - 10000
        ]));
        (0, globals_1.expect)(securityUtils.validateRate(identifier, 3, 60)).toBe(true);
    });
});
