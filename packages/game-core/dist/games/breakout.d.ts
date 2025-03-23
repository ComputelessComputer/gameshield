import { BaseGame, GameConfig } from "./base-game";
export declare class BreakoutGame extends BaseGame {
    private paddle;
    private ball;
    private bricks;
    private scoreText;
    private timeText;
    private instructionText;
    private ballVelocity;
    private ballSpeed;
    private paddleSpeed;
    private score;
    private timeRemaining;
    private gameInterval;
    private requiredScore;
    constructor(config?: GameConfig);
    protected init(): void;
    private createBricks;
    private onKeyDown;
    private onKeyUp;
    private onPointerMove;
    private movePaddle;
    private gameLoop;
    private endGame;
    protected cleanup(): void;
}
