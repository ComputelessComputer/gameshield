import { BaseGame, GameConfig } from "./base-game";
export declare class DinoRunGame extends BaseGame {
    private dino;
    private ground;
    private obstacles;
    private scoreText;
    private timeText;
    private instructionText;
    private isJumping;
    private jumpVelocity;
    private gravity;
    private obstacleSpeed;
    private obstacleFrequency;
    private score;
    private timeRemaining;
    private gameInterval;
    private obstacleInterval;
    private jumpCount;
    private requiredJumps;
    constructor(config?: GameConfig);
    protected init(): void;
    private onKeyDown;
    private onPointerDown;
    private jump;
    private addObstacle;
    private gameLoop;
    private endGame;
    protected cleanup(): void;
}
