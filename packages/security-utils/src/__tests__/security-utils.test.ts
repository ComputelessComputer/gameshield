import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { SecurityUtils, TokenOptions, BehaviorMetrics } from '../index';

describe('SecurityUtils', () => {
  let securityUtils: SecurityUtils;
  let customTokenOptions: TokenOptions;
  
  beforeEach(() => {
    // Setup custom token options for testing
    customTokenOptions = {
      secretKey: 'test-secret-key',
      expiresIn: 300, // 5 minutes
      issuer: 'test-issuer',
      audience: 'test-audience'
    };
    
    // Create a new instance for each test
    securityUtils = new SecurityUtils(customTokenOptions);
  });
  
  test('should generate a unique session ID', () => {
    const sessionId1 = securityUtils.generateSessionId();
    const sessionId2 = securityUtils.generateSessionId();
    
    expect(sessionId1).toBeDefined();
    expect(typeof sessionId1).toBe('string');
    expect(sessionId1.length).toBeGreaterThan(0);
    expect(sessionId1).not.toEqual(sessionId2); // Should be unique
  });
  
  test('should generate a valid JWT token', () => {
    const payload = {
      sub: 'test-session-id',
      data: {
        userId: '123',
        gameType: 'puzzle',
        score: 85
      }
    };
    
    const token = securityUtils.generateToken(payload);
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3); // JWT format: header.payload.signature
  });
  
  test('should validate a valid token', () => {
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
    
    expect(result.valid).toBe(true);
    expect(result.payload).toBeDefined();
    expect(result.payload?.sub).toBe('test-session-id');
    expect(result.payload?.data.userId).toBe('123');
    expect(result.payload?.data.gameType).toBe('puzzle');
    expect(result.payload?.data.score).toBe(85);
  });
  
  test('should reject an invalid token', () => {
    const invalidToken = 'invalid.token.format';
    const result = securityUtils.validateToken(invalidToken);
    
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.payload).toBeUndefined();
  });
  
  test('should reject an expired token', () => {
    // Create utils with very short expiration
    const shortExpirationUtils = new SecurityUtils({
      ...customTokenOptions,
      expiresIn: 1 // 1 second
    });
    
    const payload = {
      sub: 'test-session-id',
      data: { test: true }
    };
    
    const token = shortExpirationUtils.generateToken(payload);
    
    // Wait for token to expire
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const result = shortExpirationUtils.validateToken(token);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('expired');
        resolve();
      }, 1500); // Wait 1.5 seconds
    });
  });
  
  test('should analyze user behavior and detect suspicious patterns', () => {
    // Test suspicious behavior (too few mouse movements, too fast response)
    const suspiciousMetrics: BehaviorMetrics = {
      mouseMovements: 2,
      responseTime: 200,
      interactionPattern: 'linear'
    };
    
    const suspiciousResult = securityUtils.analyzeUserBehavior(suspiciousMetrics);
    
    expect(suspiciousResult.score).toBeGreaterThan(50);
    expect(suspiciousResult.level).not.toBe('low');
    expect(suspiciousResult.factors).toContain('minimal-mouse-movement');
    expect(suspiciousResult.factors).toContain('suspiciously-fast-response');
    expect(suspiciousResult.factors).toContain('unnatural-interaction-pattern');
    
    // Test normal behavior
    const normalMetrics: BehaviorMetrics = {
      mouseMovements: 30,
      responseTime: 3000,
      interactionPattern: 'natural'
    };
    
    const normalResult = securityUtils.analyzeUserBehavior(normalMetrics);
    
    expect(normalResult.score).toBeLessThan(30);
    expect(normalResult.level).toBe('low');
    expect(normalResult.factors).toHaveLength(0);
  });
  
  test('should generate consistent fingerprints for the same client info', () => {
    const clientInfo = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      language: 'en-US',
      screenResolution: '1920x1080',
      timezone: 'America/New_York',
      platform: 'Win32'
    };
    
    const fingerprint1 = securityUtils.generateFingerprint(clientInfo);
    const fingerprint2 = securityUtils.generateFingerprint(clientInfo);
    
    expect(fingerprint1).toBe(fingerprint2); // Should be deterministic
    
    // Different client info should produce different fingerprints
    const differentClientInfo = {
      ...clientInfo,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
    };
    
    const fingerprint3 = securityUtils.generateFingerprint(differentClientInfo);
    expect(fingerprint3).not.toBe(fingerprint1);
  });
  
  test('should encrypt and decrypt data correctly', () => {
    const sensitiveData = {
      userId: '12345',
      email: 'user@example.com',
      preferences: {
        theme: 'dark',
        notifications: true
      }
    };
    
    const encryptedData = securityUtils.encryptData(sensitiveData);
    expect(encryptedData).toBeDefined();
    expect(typeof encryptedData).toBe('string');
    
    // Should be able to decrypt
    const decryptedData = securityUtils.decryptData(encryptedData);
    expect(decryptedData).toEqual(sensitiveData);
  });
  
  test('should throw error when decrypting invalid data', () => {
    expect(() => {
      securityUtils.decryptData('invalid-encrypted-data');
    }).toThrow();
  });
  
  test('should generate secure random challenges', () => {
    const challenge1 = securityUtils.generateChallenge();
    const challenge2 = securityUtils.generateChallenge();
    
    expect(challenge1).toBeDefined();
    expect(challenge1.length).toBe(32); // Default length
    expect(challenge1).not.toBe(challenge2); // Should be random
    
    // Custom length
    const customLengthChallenge = securityUtils.generateChallenge(64);
    expect(customLengthChallenge.length).toBe(64);
  });
  
  test('should hash data consistently', () => {
    const data = 'test-data-to-hash';
    const hash1 = securityUtils.hashData(data);
    const hash2 = securityUtils.hashData(data);
    
    expect(hash1).toBe(hash2); // Should be deterministic
    expect(hash1.length).toBeGreaterThan(0);
    
    // Different data should produce different hashes
    const differentData = 'different-data';
    const hash3 = securityUtils.hashData(differentData);
    expect(hash3).not.toBe(hash1);
  });
  
  test('should validate request rate correctly', () => {
    // Mock localStorage
    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };
    
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });
    
    const identifier = 'test-ip-address';
    
    // First request with no previous requests
    mockLocalStorage.getItem.mockReturnValueOnce(null);
    expect(securityUtils.validateRate(identifier, 3, 60)).toBe(true);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      `gameshield_rate_${identifier}`,
      expect.any(String)
    );
    
    // Second request with one previous request
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([Date.now() - 10000]));
    expect(securityUtils.validateRate(identifier, 3, 60)).toBe(true);
    
    // Third request with two previous requests
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([
      Date.now() - 20000,
      Date.now() - 10000
    ]));
    expect(securityUtils.validateRate(identifier, 3, 60)).toBe(true);
    
    // Fourth request with three previous requests (should be rejected)
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([
      Date.now() - 30000,
      Date.now() - 20000,
      Date.now() - 10000
    ]));
    expect(securityUtils.validateRate(identifier, 3, 60)).toBe(false);
    
    // Request with old requests outside the time window
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([
      Date.now() - 70000, // Older than the 60 second window
      Date.now() - 10000
    ]));
    expect(securityUtils.validateRate(identifier, 3, 60)).toBe(true);
  });
});
