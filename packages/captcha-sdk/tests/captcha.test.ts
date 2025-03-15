import { generateCaptcha } from '../src/index';

// Mock the game-core module
jest.mock('game-core', () => ({
  createGameInstance: jest.fn().mockReturnValue({
    init: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    isCompleted: jest.fn().mockReturnValue(false),
    on: jest.fn((event, callback) => {
      if (event === 'complete') {
        // Store the callback to trigger it in tests
        (global as any).completeCallback = callback;
      }
    }),
  }),
  GameTypes: {
    PUZZLE: 'puzzle',
    PATTERN: 'pattern',
    TIMING: 'timing',
    PHYSICS: 'physics',
  },
}));

describe('Captcha SDK', () => {
  let container: HTMLDivElement;
  
  beforeEach(() => {
    // Create a container element for the captcha
    container = document.createElement('div') as HTMLDivElement;
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // Clean up
    document.body.removeChild(container);
    jest.clearAllMocks();
  });
  
  test('generateCaptcha should create a captcha instance', () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    
    const captcha = generateCaptcha({
      container,
      onSuccess,
      onFailure,
    });
    
    // Check if the captcha instance has the expected methods
    expect(captcha).toBeDefined();
    expect(typeof captcha.isVerified).toBe('function');
    expect(typeof captcha.reset).toBe('function');
    expect(typeof captcha.getToken).toBe('function');
  });
  
  test('isVerified should return false initially', () => {
    const captcha = generateCaptcha({ container });
    expect(captcha.isVerified()).toBe(false);
  });
  
  test('should call onSuccess when captcha is completed', () => {
    const onSuccess = jest.fn();
    
    generateCaptcha({
      container,
      onSuccess,
    });
    
    // Simulate captcha completion
    if ((global as any).completeCallback) {
      (global as any).completeCallback();
    }
    
    expect(onSuccess).toHaveBeenCalled();
  });
  
  test('getToken should return a valid token after completion', () => {
    const captcha = generateCaptcha({ container });
    
    // Initially token should be null
    expect(captcha.getToken()).toBeNull();
    
    // Simulate captcha completion
    if ((global as any).completeCallback) {
      (global as any).completeCallback();
    }
    
    // Now token should be a string
    const token = captcha.getToken();
    expect(typeof token).toBe('string');
    expect(token?.length).toBeGreaterThan(0);
  });
  
  test('reset should reset the captcha state', () => {
    const captcha = generateCaptcha({ container });
    
    // Simulate captcha completion
    if ((global as any).completeCallback) {
      (global as any).completeCallback();
    }
    
    // Verify it's completed
    expect(captcha.isVerified()).toBe(true);
    
    // Reset the captcha
    captcha.reset();
    
    // Should be back to initial state
    expect(captcha.isVerified()).toBe(false);
    expect(captcha.getToken()).toBeNull();
  });
});
