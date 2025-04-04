import { GameShield, GameShieldOptions, Game, GameResult } from './types';
import { GameFactory } from './games/game-factory';
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
  
  // Generate a unique session ID
  const sessionId = generateSessionId();
  
  // Game instance reference
  let gameInstance: Game | null = null;
  
  // Initialize the game
  const initGame = () => {
    // Clear the container first
    while (mergedOptions.container.firstChild) {
      mergedOptions.container.removeChild(mergedOptions.container.firstChild);
    }
    
    // Create game instance
    gameInstance = GameFactory.createGame(mergedOptions.gameType!, {
      container: mergedOptions.container,
      size: mergedOptions.size!,
      difficulty: mergedOptions.difficulty,
      onComplete: handleGameComplete,
      onError: handleGameError
    });
    
    // Initialize and start the game
    gameInstance.init();
    gameInstance.start();
  };
  
  // Handle game completion
  const handleGameComplete = (result: GameResult) => {
    if (!gameInstance) {
      return;
    }
    
    // Generate verification token
    const token = TokenManager.generateToken({
      sub: sessionId,
      gameResult: result,
      // Behavior metrics removed as the analyzer is still in development
    });
    
    // Call success callback if game was completed successfully
    if (result.success) {
      if (mergedOptions.onSuccess) {
        mergedOptions.onSuccess(token);
      }
    } else {
      // Call failure callback
      if (mergedOptions.onFailure) {
        const reason = 'Game not completed successfully';
        mergedOptions.onFailure(reason);
      }
    }
  };
  
  // Handle game errors
  const handleGameError = (error: Error) => {
    console.error('GameShield error:', error);
    
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
        gameInstance.destroy();
      }
      
      // Initialize a new game
      initGame();
    },
    destroy: () => {
      // Clean up resources
      if (gameInstance) {
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
