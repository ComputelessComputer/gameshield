import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { CaptchaSDK, CaptchaOptions } from '../index';
import { LocalStorageAnalyticsProvider, ServerApiProvider } from '../analytics';
import { GameFactory, GameType, Difficulty } from '../../../game-core';

// Mock the GameFactory
jest.mock('../../../game-core', () => {
  const mockGame = {
    start: jest.fn(),
    stop: jest.fn(),
    reset: jest.fn(),
    isComplete: jest.fn().mockReturnValue(false),
    getScore: jest.fn().mockReturnValue(80),
    getMetrics: jest.fn().mockReturnValue({
      mouseMovements: 10,
      keyPresses: 5,
      interactionPattern: 'natural'
    })
  };
  
  return {
    GameFactory: {
      createGame: jest.fn().mockReturnValue(mockGame),
      getAvailableTypes: jest.fn().mockReturnValue(['puzzle', 'maze', 'pattern'])
    },
    GameType: {
      PUZZLE: 'puzzle',
      MAZE: 'maze',
      PATTERN: 'pattern'
    },
    Difficulty: {
      EASY: 'easy',
      MEDIUM: 'medium',
      HARD: 'hard'
    }
  };
});

// Mock the SecurityUtils
jest.mock('../../../security-utils', () => {
  return {
    SecurityUtils: jest.fn().mockImplementation(() => {
      return {
        generateSessionId: jest.fn().mockReturnValue('test-session-id'),
        generateToken: jest.fn().mockReturnValue('test-verification-token'),
        validateToken: jest.fn().mockReturnValue(true),
        analyzeUserBehavior: jest.fn().mockReturnValue({
          score: 85,
          level: 'low',
          factors: ['natural-movement']
        })
      };
    })
  };
});

describe('CaptchaSDK', () => {
  let container: HTMLDivElement;
  let captchaSdk: CaptchaSDK;
  let defaultOptions: CaptchaOptions;
  
  beforeEach(() => {
    // Create a container element
    container = document.createElement('div') as HTMLDivElement;
    container.id = 'captcha-container';
    document.body.appendChild(container);
    
    // Default options for testing
    defaultOptions = {
      container: 'captcha-container',
      gameType: 'puzzle',
      difficulty: 'medium',
      enableAnalytics: true
    };
    
    // Reset mocks
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    // Clean up
    document.body.removeChild(container);
    if (captchaSdk) {
      // Clean up any resources
    }
  });
  
  test('should initialize with default options', () => {
    captchaSdk = new CaptchaSDK(defaultOptions);
    expect(captchaSdk).toBeDefined();
  });
  
  test('should start verification process', () => {
    captchaSdk = new CaptchaSDK(defaultOptions);
    captchaSdk.start();
    
    // Verify GameFactory was called
    expect(GameFactory.createGame).toHaveBeenCalledWith(
      'puzzle',
      expect.objectContaining({
        difficulty: 'medium',
        onComplete: expect.any(Function)
      })
    );
  });
  
  test('should handle game completion successfully', () => {
    // Setup success callback
    const onSuccessMock = jest.fn();
    defaultOptions.onSuccess = onSuccessMock;
    
    captchaSdk = new CaptchaSDK(defaultOptions);
    captchaSdk.start();
    
    // Get the onComplete callback that was passed to GameFactory
    const onCompleteCallback = (GameFactory.createGame as jest.Mock).mock.calls[0][1].onComplete;
    
    // Simulate game completion
    onCompleteCallback({
      success: true,
      score: 80,
      time: 5000
    });
    
    // Verify token was generated and callback was called
    expect(onSuccessMock).toHaveBeenCalledWith(expect.any(String));
    expect(captchaSdk.isUserVerified()).toBe(true);
    expect(captchaSdk.getToken()).not.toBeNull();
  });
  
  test('should handle game completion failure', () => {
    // Setup failure callback
    const onFailureMock = jest.fn();
    defaultOptions.onFailure = onFailureMock;
    
    captchaSdk = new CaptchaSDK(defaultOptions);
    captchaSdk.start();
    
    // Get the onComplete callback that was passed to GameFactory
    const onCompleteCallback = (GameFactory.createGame as jest.Mock).mock.calls[0][1].onComplete;
    
    // Simulate game completion with failure
    onCompleteCallback({
      success: false,
      score: 40,
      time: 10000
    });
    
    // Verify failure callback was called
    expect(onFailureMock).toHaveBeenCalled();
    expect(captchaSdk.isUserVerified()).toBe(false);
    expect(captchaSdk.getToken()).toBeNull();
  });
  
  test('should reset verification', () => {
    captchaSdk = new CaptchaSDK(defaultOptions);
    captchaSdk.start();
    
    // Simulate successful verification
    const onCompleteCallback = (GameFactory.createGame as jest.Mock).mock.calls[0][1].onComplete;
    onCompleteCallback({
      success: true,
      score: 80,
      time: 5000
    });
    
    expect(captchaSdk.isUserVerified()).toBe(true);
    
    // Reset and verify state
    captchaSdk.reset();
    
    // GameFactory.createGame should be called again
    expect(GameFactory.createGame).toHaveBeenCalledTimes(2);
    expect(captchaSdk.isUserVerified()).toBe(false);
    expect(captchaSdk.getToken()).toBeNull();
  });
  
  test('should get available game types', () => {
    captchaSdk = new CaptchaSDK(defaultOptions);
    const gameTypes = captchaSdk.getAvailableGameTypes();
    
    expect(gameTypes).toEqual(['puzzle', 'maze', 'pattern']);
    expect(GameFactory.getAvailableTypes).toHaveBeenCalled();
  });
  
  test('should initialize with LocalStorageAnalyticsProvider by default', () => {
    defaultOptions.enableAnalytics = true;
    captchaSdk = new CaptchaSDK(defaultOptions);
    
    // Start to trigger analytics
    captchaSdk.start();
    
    // Complete the game to trigger analytics recording
    const onCompleteCallback = (GameFactory.createGame as jest.Mock).mock.calls[0][1].onComplete;
    onCompleteCallback({
      success: true,
      score: 80,
      time: 5000
    });
    
    // Verify localStorage was used (check if localStorage.setItem was called)
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  
  test('should use custom analytics provider when specified', () => {
    // Create a mock provider
    const mockProvider = {
      recordVerificationAttempt: jest.fn(),
      recordMaliciousActivity: jest.fn(),
      getStats: jest.fn(),
      getVerificationData: jest.fn(),
      getMaliciousActivityData: jest.fn()
    };
    
    defaultOptions.analyticsProvider = mockProvider;
    captchaSdk = new CaptchaSDK(defaultOptions);
    
    // Start to trigger analytics
    captchaSdk.start();
    
    // Complete the game to trigger analytics recording
    const onCompleteCallback = (GameFactory.createGame as jest.Mock).mock.calls[0][1].onComplete;
    onCompleteCallback({
      success: true,
      score: 80,
      time: 5000
    });
    
    // Verify custom provider was used
    expect(mockProvider.recordVerificationAttempt).toHaveBeenCalled();
  });
  
  test('should handle container as HTMLElement', () => {
    // Create options with HTMLElement container
    const options = {
      ...defaultOptions,
      container: container
    };
    
    captchaSdk = new CaptchaSDK(options);
    captchaSdk.start();
    
    // Verify GameFactory was called
    expect(GameFactory.createGame).toHaveBeenCalled();
  });
  
  test('should throw error for invalid container', () => {
    // Create options with invalid container ID
    const options = {
      ...defaultOptions,
      container: 'non-existent-container'
    };
    
    expect(() => {
      captchaSdk = new CaptchaSDK(options);
      captchaSdk.start();
    }).toThrow();
  });
  
  test('should handle server API provider', () => {
    // Create a ServerApiProvider
    const serverProvider = new ServerApiProvider({
      apiEndpoint: 'https://api.example.com',
      apiKey: 'test-api-key'
    });
    
    // Mock the provider methods
    serverProvider.recordVerificationAttempt = jest.fn();
    serverProvider.recordMaliciousActivity = jest.fn();
    
    defaultOptions.analyticsProvider = serverProvider;
    captchaSdk = new CaptchaSDK(defaultOptions);
    
    // Start to trigger analytics
    captchaSdk.start();
    
    // Complete the game to trigger analytics recording
    const onCompleteCallback = (GameFactory.createGame as jest.Mock).mock.calls[0][1].onComplete;
    onCompleteCallback({
      success: true,
      score: 80,
      time: 5000
    });
    
    // Verify server provider was used
    expect(serverProvider.recordVerificationAttempt).toHaveBeenCalled();
  });
});
