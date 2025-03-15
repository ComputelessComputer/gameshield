import { Game, GameOptions } from '../types';
import * as PIXI from 'pixi.js';

interface Obstacle {
  graphics: PIXI.Graphics;
  x: number;
  width: number;
  height: number;
}

/**
 * DinoRunGame
 * 
 * A simple Dino Run game implementation for GameShield CAPTCHA.
 */
export class DinoRunGame implements Game {
  private app: PIXI.Application | null = null;
  private dino: PIXI.Graphics | null = null;
  private ground: PIXI.Graphics | null = null;
  private obstacles: Obstacle[] = [];
  private scoreText: PIXI.Text | null = null;
  private instructionText: PIXI.Text | null = null;
  
  private dinoY = 0;
  private dinoVelocity = 0;
  private isJumping = false;
  private score = 0;
  private targetScore = 10; // Score needed to pass the CAPTCHA
  private gameStarted = false;
  private gameEnded = false;
  private obstacleTimer = 0;
  private gravity = 0.5;
  private gameSpeed = 5;
  
  private readonly options: GameOptions;
  
  constructor(options: GameOptions) {
    this.options = options;
    
    // Adjust difficulty
    switch (options.difficulty) {
      case 'easy':
        this.targetScore = 5;
        this.gameSpeed = 4;
        break;
      case 'medium':
        this.targetScore = 10;
        this.gameSpeed = 5;
        break;
      case 'hard':
        this.targetScore = 15;
        this.gameSpeed = 6;
        break;
    }
  }
  
  /**
   * Mount the game to a container element
   */
  public async mount(container: HTMLElement): Promise<void> {
    // Create PIXI application
    this.app = new PIXI.Application({
      width: this.options.width,
      height: this.options.height,
      backgroundColor: 0x1a1a1a,
      resolution: window.devicePixelRatio || 1,
      antialias: true
    });
    
    // Add the canvas to the container
    container.appendChild(this.app.view as unknown as HTMLCanvasElement);
    
    // Create game elements
    this.createGameElements();
    
    // Add event listeners
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('touchstart', this.handleTouchStart.bind(this));
    
    // Start game loop
    this.app.ticker.add(this.gameLoop.bind(this));
  }
  
  /**
   * Destroy the game and clean up resources
   */
  public destroy(): void {
    if (this.app) {
      // Remove event listeners
      window.removeEventListener('keydown', this.handleKeyDown.bind(this));
      window.removeEventListener('mousedown', this.handleMouseDown.bind(this));
      window.removeEventListener('touchstart', this.handleTouchStart.bind(this));
      
      // Destroy PIXI application
      this.app.destroy(true, { children: true, texture: true, baseTexture: true });
      this.app = null;
    }
    
    // Reset game state
    this.dino = null;
    this.ground = null;
    this.obstacles = [];
    this.scoreText = null;
    this.instructionText = null;
    this.gameStarted = false;
    this.gameEnded = false;
    this.score = 0;
  }
  
  /**
   * Create game elements
   */
  private createGameElements(): void {
    if (!this.app) return;
    
    // Create ground
    this.ground = new PIXI.Graphics();
    this.ground.beginFill(0x333333);
    this.ground.drawRect(0, 0, this.app.screen.width, 2);
    this.ground.endFill();
    this.ground.y = this.app.screen.height - 50;
    this.app.stage.addChild(this.ground);
    
    // Create dino
    this.dino = new PIXI.Graphics();
    this.dino.beginFill(0x00ff00);
    this.dino.drawRect(0, 0, 30, 50);
    this.dino.endFill();
    this.dino.x = 50;
    this.dino.y = this.ground.y - this.dino.height;
    this.dinoY = this.dino.y;
    this.app.stage.addChild(this.dino);
    
    // Create score text
    this.scoreText = new PIXI.Text(`Score: ${this.score}/${this.targetScore}`, {
      fontFamily: 'Arial',
      fontSize: 16,
      fill: 0xffffff
    });
    this.scoreText.x = 10;
    this.scoreText.y = 10;
    this.app.stage.addChild(this.scoreText);
    
    // Create instruction text
    this.instructionText = new PIXI.Text('Press SPACE, click, or tap to jump', {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff
    });
    this.instructionText.x = this.app.screen.width / 2 - this.instructionText.width / 2;
    this.instructionText.y = this.app.screen.height / 2 - 50;
    this.app.stage.addChild(this.instructionText);
  }
  
  /**
   * Create a new obstacle
   */
  private createObstacle(): void {
    if (!this.app || !this.ground) return;
    
    // Random height between 20 and 40
    const height = Math.random() * 20 + 20;
    const width = 20;
    
    const obstacle = new PIXI.Graphics();
    obstacle.beginFill(0xff0000);
    obstacle.drawRect(0, 0, width, height);
    obstacle.endFill();
    obstacle.x = this.app.screen.width;
    obstacle.y = this.ground.y - height;
    
    this.app.stage.addChild(obstacle);
    
    this.obstacles.push({
      graphics: obstacle,
      x: obstacle.x,
      width,
      height
    });
  }
  
  /**
   * Handle keyboard input
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      if (!this.gameStarted && !this.gameEnded) {
        this.startGame();
      } else if (this.gameStarted && !this.isJumping) {
        this.jump();
      }
    }
  }
  
  /**
   * Handle mouse input
   */
  private handleMouseDown(): void {
    if (!this.gameStarted && !this.gameEnded) {
      this.startGame();
    } else if (this.gameStarted && !this.isJumping) {
      this.jump();
    }
  }
  
  /**
   * Handle touch input
   */
  private handleTouchStart(): void {
    if (!this.gameStarted && !this.gameEnded) {
      this.startGame();
    } else if (this.gameStarted && !this.isJumping) {
      this.jump();
    }
  }
  
  /**
   * Make the dino jump
   */
  private jump(): void {
    if (!this.dino || this.isJumping) return;
    
    this.isJumping = true;
    this.dinoVelocity = -12;
  }
  
  /**
   * Start the game
   */
  private startGame(): void {
    if (!this.app || !this.instructionText) return;
    
    this.gameStarted = true;
    this.app.stage.removeChild(this.instructionText);
    this.instructionText = null;
  }
  
  /**
   * End the game
   */
  private endGame(success: boolean): void {
    if (!this.app || this.gameEnded) return;
    
    this.gameEnded = true;
    
    // Create result text
    const resultText = new PIXI.Text(
      success ? 'CAPTCHA Passed!' : 'CAPTCHA Failed!',
      {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: success ? 0x00ff00 : 0xff0000,
        fontWeight: 'bold'
      }
    );
    
    resultText.x = this.app.screen.width / 2 - resultText.width / 2;
    resultText.y = this.app.screen.height / 2 - resultText.height / 2;
    this.app.stage.addChild(resultText);
    
    // Notify completion
    setTimeout(() => {
      this.options.onComplete({
        success,
        score: this.score
      });
    }, 1500);
  }
  
  /**
   * Game loop
   */
  private gameLoop(delta: number): void {
    if (!this.app || !this.dino || !this.ground || !this.scoreText) return;
    
    if (!this.gameStarted || this.gameEnded) return;
    
    // Apply gravity to dino
    this.dinoVelocity += this.gravity;
    this.dinoY += this.dinoVelocity;
    
    // Keep dino above ground
    if (this.dinoY >= this.ground.y - this.dino.height) {
      this.dinoY = this.ground.y - this.dino.height;
      this.dinoVelocity = 0;
      this.isJumping = false;
    }
    
    // Update dino position
    this.dino.y = this.dinoY;
    
    // Create obstacles
    this.obstacleTimer += delta;
    if (this.obstacleTimer > 60) {
      this.obstacleTimer = 0;
      if (Math.random() < 0.3) {
        this.createObstacle();
      }
    }
    
    // Move obstacles
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.x -= this.gameSpeed * delta;
      obstacle.graphics.x = obstacle.x;
      
      // Check for collision
      if (
        this.dino.x < obstacle.x + obstacle.width &&
        this.dino.x + this.dino.width > obstacle.x &&
        this.dino.y < obstacle.graphics.y + obstacle.height &&
        this.dino.y + this.dino.height > obstacle.graphics.y
      ) {
        this.endGame(false);
        return;
      }
      
      // Remove obstacles that are off-screen
      if (obstacle.x + obstacle.width < 0) {
        this.app.stage.removeChild(obstacle.graphics);
        this.obstacles.splice(i, 1);
        i--;
        
        // Increase score
        this.score++;
        this.scoreText.text = `Score: ${this.score}/${this.targetScore}`;
        
        // Increase game speed slightly
        this.gameSpeed += 0.05;
        
        // Check if player has won
        if (this.score >= this.targetScore) {
          this.endGame(true);
          return;
        }
      }
    }
  }
}
