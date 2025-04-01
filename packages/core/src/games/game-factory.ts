import { Game, GameOptions, GameType } from '../types';
import { PongGame } from './pong-game';

/**
 * Factory class for creating game instances
 */
export class GameFactory {
  /**
   * Creates a game instance based on the specified type and options
   * @param type Type of game to create
   * @param options Game options
   * @returns Game instance
   */
  public static createGame(type: GameType, options: GameOptions): Game {
    // If type is random, choose a random game type
    if (type === 'random') {
      const gameTypes: GameType[] = ['pong', 'snake', 'breakout', 'dino-run'];
      type = gameTypes[Math.floor(Math.random() * gameTypes.length)];
    }
    
    // Create the appropriate game instance
    switch (type) {
      case 'pong':
        return new PongGame(options);
      case 'snake':
        // For now, return a placeholder implementation
        // Will be replaced with actual implementation later
        return this.createPlaceholderGame(type, options);
      case 'breakout':
        // For now, return a placeholder implementation
        // Will be replaced with actual implementation later
        return this.createPlaceholderGame(type, options);
      case 'dino-run':
        // For now, return a placeholder implementation
        // Will be replaced with actual implementation later
        return this.createPlaceholderGame(type, options);
      default:
        throw new Error(`Unsupported game type: ${type}`);
    }
  }
  
  /**
   * Creates a placeholder game for types that aren't fully implemented yet
   * @param type Type of game
   * @param options Game options
   * @returns Placeholder game instance
   */
  private static createPlaceholderGame(type: GameType, options: GameOptions): Game {
    // For now, we'll use the Pong game as a placeholder
    // This will be replaced with actual implementations later
    console.warn(`Game type '${type}' not fully implemented yet. Using placeholder.`);
    return new PongGame(options);
  }
}
