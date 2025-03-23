import { BaseGame, GameConfig } from './base-game';
export * from './base-game';
export * from './pong';
export * from './snake';
export * from './breakout';
export * from './dino-run';
export type GameType = 'pong' | 'snake' | 'breakout' | 'dino-run' | 'random';
export declare class GameFactory {
    static createGame(type: GameType, config?: GameConfig): BaseGame;
}
