import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { AnalyticsManager } from '../analytics-manager';
import { LocalStorageAnalyticsProvider } from '../providers/local-storage-provider';
import { ServerApiProvider } from '../providers/server-api-provider';
import { VerificationData, MaliciousActivityData } from '../types';

// Mock the providers
jest.mock('../providers/local-storage-provider');
jest.mock('../providers/server-api-provider');

describe('AnalyticsManager', () => {
  let analyticsManager: AnalyticsManager;
  let mockLocalStorageProvider: jest.Mocked<LocalStorageAnalyticsProvider>;
  let mockServerApiProvider: jest.Mocked<ServerApiProvider>;
  
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create mock providers
    mockLocalStorageProvider = new LocalStorageAnalyticsProvider() as jest.Mocked<LocalStorageAnalyticsProvider>;
    mockServerApiProvider = new ServerApiProvider({
      apiEndpoint: 'https://api.example.com',
      apiKey: 'test-api-key'
    }) as jest.Mocked<ServerApiProvider>;
    
    // Setup mock methods
    mockLocalStorageProvider.recordVerificationAttempt = jest.fn();
    mockLocalStorageProvider.recordMaliciousActivity = jest.fn();
    mockLocalStorageProvider.getStats = jest.fn().mockResolvedValue({
      totalVerifications: 10,
      successRate: 0.8,
      averageDuration: 5000,
      maliciousAttempts: 2,
      gameTypeDistribution: { puzzle: 5, maze: 5 },
      difficultyDistribution: { easy: 3, medium: 5, hard: 2 },
      timeSeriesData: []
    });
    mockLocalStorageProvider.getVerificationData = jest.fn().mockResolvedValue([]);
    mockLocalStorageProvider.getMaliciousActivityData = jest.fn().mockResolvedValue([]);
    
    mockServerApiProvider.recordVerificationAttempt = jest.fn();
    mockServerApiProvider.recordMaliciousActivity = jest.fn();
    mockServerApiProvider.getStats = jest.fn().mockResolvedValue({
      totalVerifications: 100,
      successRate: 0.75,
      averageDuration: 4500,
      maliciousAttempts: 20,
      gameTypeDistribution: { puzzle: 50, maze: 50 },
      difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
      timeSeriesData: []
    });
    mockServerApiProvider.getVerificationData = jest.fn().mockResolvedValue([]);
    mockServerApiProvider.getMaliciousActivityData = jest.fn().mockResolvedValue([]);
  });
  
  test('should initialize with default provider', () => {
    analyticsManager = new AnalyticsManager();
    expect(analyticsManager).toBeDefined();
  });
  
  test('should initialize with custom provider', () => {
    analyticsManager = new AnalyticsManager(mockServerApiProvider);
    expect(analyticsManager).toBeDefined();
  });
  
  test('should set a new provider', () => {
    analyticsManager = new AnalyticsManager(mockLocalStorageProvider);
    analyticsManager.setProvider(mockServerApiProvider);
    
    // Record data to test if the new provider is used
    const verificationData: VerificationData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: true,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 1,
      clientInfo: {
        userAgent: 'test-agent'
      }
    };
    
    analyticsManager.recordVerificationAttempt(verificationData);
    
    // Verify the new provider was used
    expect(mockServerApiProvider.recordVerificationAttempt).toHaveBeenCalled();
    expect(mockLocalStorageProvider.recordVerificationAttempt).not.toHaveBeenCalled();
  });
  
  test('should record verification attempt', async () => {
    analyticsManager = new AnalyticsManager(mockLocalStorageProvider);
    
    const verificationData: VerificationData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: true,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 1,
      clientInfo: {
        userAgent: 'test-agent'
      }
    };
    
    await analyticsManager.recordVerificationAttempt(verificationData);
    
    // Verify data was enriched and sent to provider
    expect(mockLocalStorageProvider.recordVerificationAttempt).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionId: 'test-session',
        success: true,
        gameType: 'puzzle',
        clientInfo: expect.objectContaining({
          userAgent: expect.any(String),
          fingerprint: expect.any(String)
        })
      })
    );
  });
  
  test('should record malicious activity', async () => {
    analyticsManager = new AnalyticsManager(mockLocalStorageProvider);
    
    const maliciousData: MaliciousActivityData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: false,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 3,
      clientInfo: {
        userAgent: 'test-agent'
      },
      riskScore: 85,
      flags: ['automated-input', 'suspicious-pattern']
    };
    
    await analyticsManager.recordMaliciousActivity(maliciousData);
    
    // Verify data was enriched and sent to provider
    expect(mockLocalStorageProvider.recordMaliciousActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionId: 'test-session',
        riskScore: 85,
        flags: expect.arrayContaining(['automated-input', 'suspicious-pattern']),
        clientInfo: expect.objectContaining({
          userAgent: expect.any(String),
          fingerprint: expect.any(String)
        })
      })
    );
  });
  
  test('should get stats', async () => {
    analyticsManager = new AnalyticsManager(mockLocalStorageProvider);
    
    const stats = await analyticsManager.getStats({
      startDate: new Date(Date.now() - 86400000), // 1 day ago
      endDate: new Date(),
      gameTypes: ['puzzle'],
      difficulties: ['medium']
    });
    
    // Verify provider method was called with filters
    expect(mockLocalStorageProvider.getStats).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: expect.any(Date),
        endDate: expect.any(Date),
        gameTypes: ['puzzle'],
        difficulties: ['medium']
      })
    );
    
    // Verify returned stats
    expect(stats).toEqual(
      expect.objectContaining({
        totalVerifications: 10,
        successRate: 0.8,
        averageDuration: 5000,
        maliciousAttempts: 2
      })
    );
  });
  
  test('should get verification data', async () => {
    analyticsManager = new AnalyticsManager(mockLocalStorageProvider);
    
    await analyticsManager.getVerificationData({
      startDate: new Date(Date.now() - 86400000), // 1 day ago
      endDate: new Date(),
      limit: 10,
      offset: 0
    });
    
    // Verify provider method was called with filters
    expect(mockLocalStorageProvider.getVerificationData).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: expect.any(Date),
        endDate: expect.any(Date),
        limit: 10,
        offset: 0
      })
    );
  });
  
  test('should get malicious activity data', async () => {
    analyticsManager = new AnalyticsManager(mockLocalStorageProvider);
    
    await analyticsManager.getMaliciousActivityData({
      startDate: new Date(Date.now() - 86400000), // 1 day ago
      endDate: new Date(),
      limit: 10,
      offset: 0
    });
    
    // Verify provider method was called with filters
    expect(mockLocalStorageProvider.getMaliciousActivityData).toHaveBeenCalledWith(
      expect.objectContaining({
        startDate: expect.any(Date),
        endDate: expect.any(Date),
        limit: 10,
        offset: 0
      })
    );
  });
  
  test('should handle errors when recording verification attempt', async () => {
    analyticsManager = new AnalyticsManager(mockLocalStorageProvider);
    
    // Make the provider throw an error
    mockLocalStorageProvider.recordVerificationAttempt.mockImplementation(() => {
      throw new Error('Test error');
    });
    
    // Mock console.error to verify it's called
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    const verificationData: VerificationData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: true,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 1,
      clientInfo: {
        userAgent: 'test-agent'
      }
    };
    
    // Should not throw
    await expect(analyticsManager.recordVerificationAttempt(verificationData)).resolves.not.toThrow();
    
    // Verify error was logged
    expect(console.error).toHaveBeenCalled();
    
    // Restore console.error
    console.error = originalConsoleError;
  });
  
  test('should handle errors when recording malicious activity', async () => {
    analyticsManager = new AnalyticsManager(mockLocalStorageProvider);
    
    // Make the provider throw an error
    mockLocalStorageProvider.recordMaliciousActivity.mockImplementation(() => {
      throw new Error('Test error');
    });
    
    // Mock console.error to verify it's called
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    const maliciousData: MaliciousActivityData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: false,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 3,
      clientInfo: {
        userAgent: 'test-agent'
      },
      riskScore: 85,
      flags: ['automated-input', 'suspicious-pattern']
    };
    
    // Should not throw
    await expect(analyticsManager.recordMaliciousActivity(maliciousData)).resolves.not.toThrow();
    
    // Verify error was logged
    expect(console.error).toHaveBeenCalled();
    
    // Restore console.error
    console.error = originalConsoleError;
  });
});
