import { BaseGame, GameConfig } from "./base-game";
export declare class SnakeGame extends BaseGame {
    private snake;
    private foods;
    private direction;
    private nextDirection;
    private gridSize;
    private gridWidth;
    private gridHeight;
    private scoreText;
    private timeText;
    private instructionText;
    private gameContainer;
    private score;
    private timeRemaining;
    private gameInterval;
    private foodCollected;
    private moveInterval;
    constructor(config?: GameConfig);
    protected init(): void;
    private initSnake;
    private drawSnake;
    private moveSnake;
    private addFood;
    private setupControls;
    private endGame;
    protected cleanup(): void;
}
