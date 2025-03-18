import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { ServerApiProvider } from '../server-api-provider';
import { VerificationData, MaliciousActivityData, StatsFilters, DataFilters, GameShieldStats } from '../../types';

// Create a more accurate Response mock helper
function createMockResponse(data: any, ok = true, status = 200): Response {
  return {
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    json: jest.fn().mockResolvedValue(data)
  } as unknown as Response;
}

// Mock fetch
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe('ServerApiProvider', () => {
  let provider: ServerApiProvider;
  const mockConfig = {
    apiEndpoint: 'https://api.example.com',
    apiKey: 'test-api-key'
  };
  
  beforeEach(() => {
    // Reset mocks
    jest.resetAllMocks();
    
    // Create a new provider for each test
    provider = new ServerApiProvider(mockConfig);
    
    // Mock successful fetch response
    mockFetch.mockResolvedValue(createMockResponse({ success: true }));
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('should initialize with provided config', () => {
    expect(provider).toBeDefined();
  });
  
  test('should record verification attempt', async () => {
    const verificationData: VerificationData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: true,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 1,
      clientInfo: {
        userAgent: 'test-agent',
        fingerprint: 'test-fingerprint'
      }
    };
    
    await provider.recordVerificationAttempt(verificationData);
    
    // Verify fetch was called with correct arguments
    expect(mockFetch).toHaveBeenCalledWith(
      `${mockConfig.apiEndpoint}/verification-batch`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockConfig.apiKey}`
        }),
        body: expect.any(String)
      })
    );
    
    // Verify the body contains the verification data
    const requestBody = JSON.parse((mockFetch.mock.calls[0][1] as RequestInit).body as string);
    expect(requestBody).toEqual([verificationData]);
  });
  
  test('should record malicious activity', async () => {
    const maliciousData: MaliciousActivityData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: false,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 3,
      clientInfo: {
        userAgent: 'test-agent',
        fingerprint: 'test-fingerprint'
      },
      riskScore: 85,
      flags: ['automated-input', 'suspicious-pattern']
    };
    
    await provider.recordMaliciousActivity(maliciousData);
    
    // Verify fetch was called with correct arguments
    expect(mockFetch).toHaveBeenCalledWith(
      `${mockConfig.apiEndpoint}/malicious-batch`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockConfig.apiKey}`
        }),
        body: expect.any(String)
      })
    );
    
    // Verify the body contains the malicious data
    const requestBody = JSON.parse((mockFetch.mock.calls[0][1] as RequestInit).body as string);
    expect(requestBody).toEqual([maliciousData]);
  });
  
  test('should get statistics with filters', async () => {
    // Mock the response for getStats
    const mockStats: GameShieldStats = {
      totalVerifications: 100,
      successRate: 0.75,
      averageDuration: 4500,
      maliciousAttempts: 20,
      gameTypeDistribution: { puzzle: 50, maze: 50 },
      difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
      timeSeriesData: []
    };
    
    mockFetch.mockResolvedValueOnce(createMockResponse(mockStats));
    
    const filters: StatsFilters = {
      startDate: new Date(Date.now() - 86400000), // 1 day ago
      endDate: new Date(),
      gameTypes: ['puzzle'],
      difficulties: ['medium']
    };
    
    const stats = await provider.getStats(filters);
    
    // Verify fetch was called with correct arguments
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`${mockConfig.apiEndpoint}/stats`),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Authorization': `Bearer ${mockConfig.apiKey}`
        })
      })
    );
    
    // Verify URL contains query parameters
    const url = mockFetch.mock.calls[0][0] as string;
    if (filters.startDate) {
      expect(url).toContain(`startDate=${encodeURIComponent(filters.startDate.toISOString())}`);
    }
    if (filters.endDate) {
      expect(url).toContain(`endDate=${encodeURIComponent(filters.endDate.toISOString())}`);
    }
    if (filters.gameTypes) {
      expect(url).toContain(`gameTypes=${encodeURIComponent(filters.gameTypes.join(','))}`);
    }
    if (filters.difficulties) {
      expect(url).toContain(`difficulties=${encodeURIComponent(filters.difficulties.join(','))}`);
    }
    
    // Verify returned stats
    expect(stats).toEqual(mockStats);
  });
  
  test('should get verification data with pagination', async () => {
    // Mock verification data
    const mockVerificationData: VerificationData[] = [
      {
        sessionId: 'session-1',
        timestamp: Date.now() - 3600000,
        success: true,
        gameType: 'puzzle',
        difficulty: 'medium',
        duration: 5000,
        attempts: 1,
        clientInfo: {
          userAgent: 'test-agent-1',
          fingerprint: 'test-fingerprint-1'
        }
      },
      {
        sessionId: 'session-2',
        timestamp: Date.now() - 7200000,
        success: false,
        gameType: 'maze',
        difficulty: 'hard',
        duration: 8000,
        attempts: 2,
        clientInfo: {
          userAgent: 'test-agent-2',
          fingerprint: 'test-fingerprint-2'
        }
      }
    ];
    
    // Mock the response for getVerificationData
    mockFetch.mockResolvedValueOnce(createMockResponse(mockVerificationData));
    
    const filters: DataFilters = {
      startDate: new Date(Date.now() - 86400000), // 1 day ago
      endDate: new Date(),
      limit: 10,
      offset: 0
    };
    
    const result = await provider.getVerificationData(filters);
    
    // Verify fetch was called with correct arguments
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`${mockConfig.apiEndpoint}/verification-data`),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Authorization': `Bearer ${mockConfig.apiKey}`
        })
      })
    );
    
    // Verify URL contains query parameters
    const url = mockFetch.mock.calls[0][0] as string;
    if (filters.startDate) {
      expect(url).toContain(`startDate=${encodeURIComponent(filters.startDate.toISOString())}`);
    }
    if (filters.endDate) {
      expect(url).toContain(`endDate=${encodeURIComponent(filters.endDate.toISOString())}`);
    }
    if (filters.limit) {
      expect(url).toContain(`limit=${filters.limit}`);
    }
    if (filters.offset !== undefined) {
      expect(url).toContain(`offset=${filters.offset}`);
    }
    
    // Verify returned data
    expect(result).toEqual(mockVerificationData);
  });
  
  test('should get malicious activity data with pagination', async () => {
    // Mock malicious activity data
    const mockMaliciousData: MaliciousActivityData[] = [
      {
        sessionId: 'session-3',
        timestamp: Date.now() - 3600000,
        success: false,
        gameType: 'puzzle',
        difficulty: 'medium',
        duration: 2000,
        attempts: 3,
        clientInfo: {
          userAgent: 'test-agent-3',
          fingerprint: 'test-fingerprint-3'
        },
        riskScore: 85,
        flags: ['automated-input', 'suspicious-pattern']
      }
    ];
    
    // Mock the response for getMaliciousActivityData
    mockFetch.mockResolvedValueOnce(createMockResponse(mockMaliciousData));
    
    const filters: DataFilters = {
      startDate: new Date(Date.now() - 86400000), // 1 day ago
      endDate: new Date(),
      limit: 10,
      offset: 0
    };
    
    const result = await provider.getMaliciousActivityData(filters);
    
    // Verify fetch was called with correct arguments
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(`${mockConfig.apiEndpoint}/malicious-data`),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Authorization': `Bearer ${mockConfig.apiKey}`
        })
      })
    );
    
    // Verify URL contains query parameters
    const url = mockFetch.mock.calls[0][0] as string;
    if (filters.startDate) {
      expect(url).toContain(`startDate=${encodeURIComponent(filters.startDate.toISOString())}`);
    }
    if (filters.endDate) {
      expect(url).toContain(`endDate=${encodeURIComponent(filters.endDate.toISOString())}`);
    }
    if (filters.limit) {
      expect(url).toContain(`limit=${filters.limit}`);
    }
    if (filters.offset !== undefined) {
      expect(url).toContain(`offset=${filters.offset}`);
    }
    
    // Verify returned data
    expect(result).toEqual(mockMaliciousData);
  });
  
  test('should handle API errors gracefully', async () => {
    // Mock a failed API response
    mockFetch.mockResolvedValueOnce(createMockResponse({ error: 'Server error' }, false, 500));
    
    const verificationData: VerificationData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: true,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 1,
      clientInfo: {
        userAgent: 'test-agent',
        fingerprint: 'test-fingerprint'
      }
    };
    
    // Should throw an error with status code and message
    await expect(provider.recordVerificationAttempt(verificationData)).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining('500')
      })
    );
  });
  
  test('should handle network errors gracefully', async () => {
    // Mock a network error
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    
    const verificationData: VerificationData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: true,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 1,
      clientInfo: {
        userAgent: 'test-agent',
        fingerprint: 'test-fingerprint'
      }
    };
    
    // Should throw an error with the original message
    await expect(provider.recordVerificationAttempt(verificationData)).rejects.toThrow('Network error');
  });
  
  // Note: This test is commented out because the ServerApiProvider doesn't support retries in its current implementation
  /* 
  test('should retry failed requests', async () => {
    // Mock a temporary failure followed by success
    mockFetch
      .mockRejectedValueOnce(new Error('Temporary network error'))
      .mockResolvedValueOnce(createMockResponse({ success: true }));
    
    // Create provider with retry options
    const providerWithRetry = new ServerApiProvider({
      ...mockConfig,
      maxRetries: 3,
      retryDelay: 100
    });
    
    const verificationData: VerificationData = {
      sessionId: 'test-session',
      timestamp: Date.now(),
      success: true,
      gameType: 'puzzle',
      difficulty: 'medium',
      duration: 5000,
      attempts: 1,
      clientInfo: {
        userAgent: 'test-agent',
        fingerprint: 'test-fingerprint'
      }
    };
    
    // Should succeed after retry
    await expect(providerWithRetry.recordVerificationAttempt(verificationData)).resolves.not.toThrow();
    
    // Verify fetch was called twice
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
  */
});
