import * as PIXI from "pixi.js";
import { GameConfig, GameResult } from "./games/base-game";
import { GameType } from "./games";
export interface GameOptions extends GameConfig {
    gameType?: GameType;
}
export declare class Game {
    private game;
    private options;
    private container;
    private onGameComplete;
    constructor(options?: GameOptions);
    mount(container: HTMLElement | string): void;
    setCompletionCallback(callback: (result: GameResult) => void): void;
    private initGame;
    private handleGameComplete;
    destroy(): void;
}
export declare function createGame(container: HTMLElement): PIXI.Application<PIXI.Renderer>;
