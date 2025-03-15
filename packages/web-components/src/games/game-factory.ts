import { Game, GameType, GameOptions } from '../types';
import { PongGame } from './pong-game';
import { SnakeGame } from './snake-game';
import { BreakoutGame } from './breakout-game';
import { DinoRunGame } from './dino-run-game';

/**
 * GameFactory
 * 
 * Creates game instances based on the specified type and options.
 */
export class GameFactory {
  /**
   * Create a game instance
   */
  public static createGame(type: GameType, options: GameOptions): Game {
    // If type is random, select a random game type
    if (type === 'random') {
      const types: GameType[] = ['pong', 'snake', 'breakout', 'dino-run'];
      type = types[Math.floor(Math.random() * types.length)] as GameType;
    }
    
    // Create the appropriate game instance
    switch (type) {
      case 'pong':
        return new PongGame(options);
      case 'snake':
        return new SnakeGame(options);
      case 'breakout':
        return new BreakoutGame(options);
      case 'dino-run':
        return new DinoRunGame(options);
      default:
        throw new Error(`Unsupported game type: ${type}`);
    }
  }
}
