import { createGameInstance, GameTypes } from '../src/index';

describe('Game Core Engine', () => {
  let container: HTMLDivElement;
  
  beforeEach(() => {
    // Create a container element for the game
    container = document.createElement('div') as HTMLDivElement;
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    // Clean up
    document.body.removeChild(container);
    jest.clearAllMocks();
  });
  
  test('createGameInstance should create a game instance', () => {
    const gameInstance = createGameInstance({
      container,
      type: GameTypes.PUZZLE,
      difficulty: 'medium',
    });
    
    // Check if the game instance has the expected methods
    expect(gameInstance).toBeDefined();
    expect(typeof gameInstance.init).toBe('function');
    expect(typeof gameInstance.start).toBe('function');
    expect(typeof gameInstance.stop).toBe('function');
    expect(typeof gameInstance.isCompleted).toBe('function');
    expect(typeof gameInstance.on).toBe('function');
  });
  
  test('game instance should emit events', () => {
    const onStart = jest.fn();
    const onComplete = jest.fn();
    
    const gameInstance = createGameInstance({
      container,
      type: GameTypes.PATTERN,
      difficulty: 'easy',
    });
    
    gameInstance.on('start', onStart);
    gameInstance.on('complete', onComplete);
    
    // Start the game
    gameInstance.start();
    expect(onStart).toHaveBeenCalled();
    
    // Simulate game completion
    gameInstance.emit('complete');
    expect(onComplete).toHaveBeenCalled();
    expect(gameInstance.isCompleted()).toBe(true);
  });
  
  test('should handle different game types', () => {
    // Test with PUZZLE type
    const puzzleGame = createGameInstance({
      container,
      type: GameTypes.PUZZLE,
    });
    expect(puzzleGame.getType()).toBe(GameTypes.PUZZLE);
    
    // Test with TIMING type
    const timingGame = createGameInstance({
      container,
      type: GameTypes.TIMING,
    });
    expect(timingGame.getType()).toBe(GameTypes.TIMING);
    
    // Test with PHYSICS type
    const physicsGame = createGameInstance({
      container,
      type: GameTypes.PHYSICS,
    });
    expect(physicsGame.getType()).toBe(GameTypes.PHYSICS);
  });
  
  test('should handle difficulty levels', () => {
    // Test with easy difficulty
    const easyGame = createGameInstance({
      container,
      type: GameTypes.PUZZLE,
      difficulty: 'easy',
    });
    expect(easyGame.getDifficulty()).toBe('easy');
    
    // Test with medium difficulty
    const mediumGame = createGameInstance({
      container,
      type: GameTypes.PUZZLE,
      difficulty: 'medium',
    });
    expect(mediumGame.getDifficulty()).toBe('medium');
    
    // Test with hard difficulty
    const hardGame = createGameInstance({
      container,
      type: GameTypes.PUZZLE,
      difficulty: 'hard',
    });
    expect(hardGame.getDifficulty()).toBe('hard');
  });
  
  test('should clean up resources on stop', () => {
    const gameInstance = createGameInstance({
      container,
      type: GameTypes.PATTERN,
    });
    
    // Mock the internal cleanup method
    const cleanupSpy = jest.spyOn(gameInstance, 'cleanup' as any);
    
    // Start and then stop the game
    gameInstance.start();
    gameInstance.stop();
    
    expect(cleanupSpy).toHaveBeenCalled();
    expect(container.children.length).toBe(0);
  });
});
