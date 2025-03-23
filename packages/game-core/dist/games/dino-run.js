import * as PIXI from "pixi.js";
import { BaseGame } from "./base-game";
export class DinoRunGame extends BaseGame {
    constructor(config = {}) {
        super(config);
        this.obstacles = [];
        // Game state
        this.isJumping = false;
        this.jumpVelocity = 0;
        this.gravity = 0.5;
        this.score = 0;
        this.gameInterval = null;
        this.obstacleInterval = null;
        this.jumpCount = 0;
        // Set difficulty-based parameters
        switch (this.config.difficulty) {
            case 'easy':
                this.obstacleSpeed = 3;
                this.obstacleFrequency = 2000; // ms
                this.requiredJumps = 5;
                break;
            case 'hard':
                this.obstacleSpeed = 7;
                this.obstacleFrequency = 1000;
                this.requiredJumps = 15;
                break;
            case 'medium':
            default:
                this.obstacleSpeed = 5;
                this.obstacleFrequency = 1500;
                this.requiredJumps = 10;
                break;
        }
        this.timeRemaining = this.config.timeLimit || 30;
    }
    init() {
        // Create dino character
        this.dino = new PIXI.Graphics();
        this.dino.beginFill(0x00FF00);
        this.dino.drawRect(0, 0, 30, 60);
        this.dino.endFill();
        this.dino.x = 50;
        this.dino.y = this.config.height - 80;
        this.app.stage.addChild(this.dino);
        // Create ground
        this.ground = new PIXI.Graphics();
        this.ground.beginFill(0xCCCCCC);
        this.ground.drawRect(0, 0, this.config.width, 20);
        this.ground.endFill();
        this.ground.x = 0;
        this.ground.y = this.config.height - 20;
        this.app.stage.addChild(this.ground);
        // Create score text
        this.scoreText = new PIXI.Text(`Jumps: ${this.jumpCount}/${this.requiredJumps}`, {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xFFFFFF
        });
        this.scoreText.x = 10;
        this.scoreText.y = 10;
        this.app.stage.addChild(this.scoreText);
        // Create time text
        this.timeText = new PIXI.Text(`Time: ${this.timeRemaining}s`, {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xFFFFFF
        });
        this.timeText.x = this.config.width - 100;
        this.timeText.y = 10;
        this.app.stage.addChild(this.timeText);
        // Create instruction text
        this.instructionText = new PIXI.Text(`Jump over ${this.requiredJumps} obstacles to verify`, {
            fontFamily: 'Arial',
            fontSize: 18,
            fill: 0xFFFFFF
        });
        this.instructionText.x = (this.config.width / 2) - (this.instructionText.width / 2);
        this.instructionText.y = 40;
        this.app.stage.addChild(this.instructionText);
        // Set up keyboard controls
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        // Set up touch/click controls
        this.app.stage.interactive = true;
        this.app.stage.on('pointerdown', this.onPointerDown.bind(this));
        // Start game loop
        this.app.ticker.add(this.gameLoop.bind(this));
        // Start obstacle generation
        this.obstacleInterval = window.setInterval(() => {
            this.addObstacle();
        }, this.obstacleFrequency);
        // Start timer
        this.gameInterval = window.setInterval(() => {
            this.timeRemaining--;
            this.timeText.text = `Time: ${this.timeRemaining}s`;
            if (this.timeRemaining <= 0) {
                this.endGame(false);
            }
        }, 1000);
    }
    onKeyDown(event) {
        if (event.code === 'Space' || event.key === 'ArrowUp') {
            this.jump();
        }
    }
    onPointerDown() {
        this.jump();
    }
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpVelocity = -12;
        }
    }
    addObstacle() {
        const height = Math.random() > 0.5 ? 30 : 50;
        const obstacle = {
            x: this.config.width,
            y: this.config.height - 20 - height,
            width: 20,
            height: height,
            sprite: new PIXI.Graphics()
        };
        obstacle.sprite.beginFill(0xFF0000);
        obstacle.sprite.drawRect(0, 0, obstacle.width, obstacle.height);
        obstacle.sprite.endFill();
        obstacle.sprite.x = obstacle.x;
        obstacle.sprite.y = obstacle.y;
        this.app.stage.addChild(obstacle.sprite);
        this.obstacles.push(obstacle);
    }
    gameLoop() {
        // Handle dino jumping
        if (this.isJumping) {
            this.dino.y += this.jumpVelocity;
            this.jumpVelocity += this.gravity;
            // Check if dino has landed
            if (this.dino.y >= this.config.height - 80) {
                this.dino.y = this.config.height - 80;
                this.isJumping = false;
                this.jumpVelocity = 0;
            }
        }
        // Move obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.x -= this.obstacleSpeed;
            obstacle.sprite.x = obstacle.x;
            // Check for collision
            if (this.dino.x < obstacle.x + obstacle.width &&
                this.dino.x + this.dino.width > obstacle.x &&
                this.dino.y < obstacle.y + obstacle.height &&
                this.dino.y + this.dino.height > obstacle.y) {
                // Collision detected
                this.endGame(false);
                return;
            }
            // Check if obstacle has been successfully jumped over
            if (obstacle.x + obstacle.width < this.dino.x && !obstacle.counted) {
                this.jumpCount++;
                this.scoreText.text = `Jumps: ${this.jumpCount}/${this.requiredJumps}`;
                obstacle.counted = true;
                // Check for win condition
                if (this.jumpCount >= this.requiredJumps) {
                    this.endGame(true);
                    return;
                }
            }
            // Remove obstacles that have gone off screen
            if (obstacle.x + obstacle.width < 0) {
                this.app.stage.removeChild(obstacle.sprite);
                this.obstacles.splice(i, 1);
            }
        }
    }
    endGame(success) {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        if (this.obstacleInterval) {
            clearInterval(this.obstacleInterval);
            this.obstacleInterval = null;
        }
        this.app.ticker.remove(this.gameLoop.bind(this));
        const result = {
            success,
            score: this.jumpCount,
            message: success
                ? `Success! You jumped over ${this.jumpCount} obstacles.`
                : `Failed! You only jumped over ${this.jumpCount} obstacles.`
        };
        this.onComplete(result);
    }
    cleanup() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        if (this.obstacleInterval) {
            clearInterval(this.obstacleInterval);
            this.obstacleInterval = null;
        }
        this.app.ticker.remove(this.gameLoop.bind(this));
        window.removeEventListener('keydown', this.onKeyDown.bind(this));
        this.app.stage.off('pointerdown', this.onPointerDown.bind(this));
    }
}
