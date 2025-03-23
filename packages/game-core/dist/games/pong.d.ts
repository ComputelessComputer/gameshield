import { BaseGame, GameConfig } from "./base-game";
export declare class PongGame extends BaseGame {
    private paddle;
    private ball;
    private scoreText;
    private timeText;
    private instructionText;
    private ballSpeed;
    private ballVelocity;
    private score;
    private timeRemaining;
    private gameInterval;
    constructor(config?: GameConfig);
    protected init(): void;
    private onPointerMove;
    private gameLoop;
    private endGame;
    protected cleanup(): void;
}
