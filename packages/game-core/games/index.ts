import { BaseGame, GameConfig, GameResult } from './base-game';
import { PongGame } from './pong';
import { SnakeGame } from './snake';
import { BreakoutGame } from './breakout';
import { DinoRunGame } from './dino-run';

export * from './base-game';
export * from './pong';
export * from './snake';
export * from './breakout';
export * from './dino-run';

export type GameType = 'pong' | 'snake' | 'breakout' | 'dino-run' | 'random';

export class GameFactory {
  static createGame(type: GameType, config: GameConfig = {}): BaseGame {
    if (type === 'random') {
      // Get a random game type excluding 'random'
      const gameTypes: GameType[] = ['pong', 'snake', 'breakout', 'dino-run'];
      type = gameTypes[Math.floor(Math.random() * gameTypes.length)];
    }
    
    switch (type) {
      case 'pong':
        return new PongGame(config);
      case 'snake':
        return new SnakeGame(config);
      case 'breakout':
        return new BreakoutGame(config);
      case 'dino-run':
        return new DinoRunGame(config);
      default:
        throw new Error(`Unknown game type: ${type}`);
    }
  }
}
