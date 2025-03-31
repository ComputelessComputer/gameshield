import { GameShield, GameShieldOptions, Game, GameResult } from './types';
import { GameFactory } from './games/game-factory';
import { BehaviorAnalyzer } from './behavior-analyzer';
import { TokenManager } from './token-manager';

/**
 * Creates a new GameShield instance
 * @param options GameShield configuration options
 * @returns GameShield instance
 */
export function createGameShield(options: GameShieldOptions): GameShield {
  // Default options
  const defaultOptions: Partial<GameShieldOptions> = {
    gameType: 'random',
    size: '400px',
    difficulty: 'medium'
  };
  
  // Merge with provided options
  const mergedOptions: GameShieldOptions = {
    ...defaultOptions,
    ...options
  };
  
  // Create behavior analyzer
  const behaviorAnalyzer = new BehaviorAnalyzer();
  
  // Generate a unique session ID
  const sessionId = generateSessionId();
  
  // Game instance reference
  let gameInstance: Game | null = null;
  
  // Initialize the game
  const initGame = () => {
    // Create game instance
    gameInstance = GameFactory.createGame(mergedOptions.gameType!, {
      container: mergedOptions.container,
      size: mergedOptions.size!,
      difficulty: mergedOptions.difficulty,
      onComplete: handleGameComplete,
      onError: handleGameError
    });
    
    // Start behavior tracking
    behaviorAnalyzer.startTracking(mergedOptions.container);
    
    // Initialize and start the game
    gameInstance.init();
    gameInstance.start();
  };
  
  // Handle game completion
  const handleGameComplete = (result: GameResult) => {
    if (!gameInstance) {
      return;
    }
    
    // Stop behavior tracking
    behaviorAnalyzer.stopTracking(mergedOptions.container);
    
    // Analyze behavior
    const behaviorMetrics = behaviorAnalyzer.analyze();
    
    // Generate verification token
    const token = TokenManager.generateToken({
      sub: sessionId,
      gameResult: result,
      behaviorMetrics
    });
    
    // Call success callback if game was completed successfully
    // and behavior analysis indicates a human user
    if (result.success && behaviorMetrics.isHuman) {
      if (mergedOptions.onSuccess) {
        mergedOptions.onSuccess(token);
      }
    } else {
      // Call failure callback
      if (mergedOptions.onFailure) {
        const reason = !result.success 
          ? 'Game not completed successfully' 
          : 'Behavior analysis indicates bot-like behavior';
        mergedOptions.onFailure(reason);
      }
    }
  };
  
  // Handle game errors
  const handleGameError = (error: Error) => {
    console.error('GameShield error:', error);
    
    // Stop behavior tracking
    behaviorAnalyzer.stopTracking(mergedOptions.container);
    
    // Call failure callback
    if (mergedOptions.onFailure) {
      mergedOptions.onFailure(`Error: ${error.message}`);
    }
  };
  
  // Initialize the game
  initGame();
  
  // Return GameShield instance
  return {
    reset: () => {
      // Destroy existing game
      if (gameInstance) {
        behaviorAnalyzer.stopTracking(mergedOptions.container);
        gameInstance.destroy();
      }
      
      // Initialize a new game
      initGame();
    },
    destroy: () => {
      // Clean up resources
      if (gameInstance) {
        behaviorAnalyzer.stopTracking(mergedOptions.container);
        gameInstance.destroy();
        gameInstance = null;
      }
    }
  };
}

/**
 * Generates a unique session ID
 * @returns Unique session ID
 */
function generateSessionId(): string {
  return 'gs_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
