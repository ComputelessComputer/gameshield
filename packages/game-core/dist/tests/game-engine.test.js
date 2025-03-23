import { Game } from '../index';
describe('Game Core Engine', () => {
    let container;
    beforeEach(() => {
        // Create a container element for the game
        container = document.createElement('div');
        document.body.appendChild(container);
    });
    afterEach(() => {
        // Clean up
        document.body.removeChild(container);
        jest.clearAllMocks();
    });
    test('createGameInstance should create a game instance', () => {
        const gameInstance = new Game({
            container,
            type: GameType.PUZZLE,
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
        const gameInstance = new Game({
            container,
            type: GameType.PATTERN,
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
        const puzzleGame = new Game({
            container,
            type: GameType.PUZZLE,
        });
        expect(puzzleGame.getType()).toBe(GameType.PUZZLE);
        // Test with TIMING type
        const timingGame = new Game({
            container,
            type: GameType.TIMING,
        });
        expect(timingGame.getType()).toBe(GameType.TIMING);
        // Test with PHYSICS type
        const physicsGame = new Game({
            container,
            type: GameType.PHYSICS,
        });
        expect(physicsGame.getType()).toBe(GameType.PHYSICS);
    });
    test('should handle difficulty levels', () => {
        // Test with easy difficulty
        const easyGame = new Game({
            container,
            type: GameType.PUZZLE,
            difficulty: 'easy',
        });
        expect(easyGame.getDifficulty()).toBe('easy');
        // Test with medium difficulty
        const mediumGame = new Game({
            container,
            type: GameType.PUZZLE,
            difficulty: 'medium',
        });
        expect(mediumGame.getDifficulty()).toBe('medium');
        // Test with hard difficulty
        const hardGame = new Game({
            container,
            type: GameType.PUZZLE,
            difficulty: 'hard',
        });
        expect(hardGame.getDifficulty()).toBe('hard');
    });
    test('should clean up resources on stop', () => {
        const gameInstance = new Game({
            container,
            type: GameType.PATTERN,
        });
        // Mock the internal cleanup method
        const cleanupSpy = jest.spyOn(gameInstance, 'cleanup');
        // Start and then stop the game
        gameInstance.start();
        gameInstance.stop();
        expect(cleanupSpy).toHaveBeenCalled();
        expect(container.children.length).toBe(0);
    });
});
