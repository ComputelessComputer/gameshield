import { Game, GameOptions } from '../types';
import * as PIXI from 'pixi.js';

/**
 * SnakeGame
 * 
 * A simple Snake game implementation for GameShield CAPTCHA.
 */
export class SnakeGame implements Game {
  private app: PIXI.Application | null = null;
  private snake: PIXI.Graphics[] = [];
  private food: PIXI.Graphics | null = null;
  private scoreText: PIXI.Text | null = null;
  private instructionText: PIXI.Text | null = null;
  
  private direction = { x: 0, y: 0 };
  private nextDirection = { x: 0, y: 0 };
  private gridSize = 20;
  private score = 0;
  private targetScore = 5; // Score needed to pass the CAPTCHA
  private gameStarted = false;
  private gameEnded = false;
  private gameLoopCounter = 0;
  private gameSpeed = 10; // Update every 10 frames
  
  private readonly options: GameOptions;
  
  constructor(options: GameOptions) {
    this.options = options;
    
    // Adjust difficulty
    switch (options.difficulty) {
      case 'easy':
        this.targetScore = 3;
        this.gameSpeed = 12;
        break;
      case 'medium':
        this.targetScore = 5;
        this.gameSpeed = 10;
        break;
      case 'hard':
        this.targetScore = 8;
        this.gameSpeed = 7;
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
      
      // Destroy PIXI application
      this.app.destroy(true, { children: true, texture: true, baseTexture: true });
      this.app = null;
    }
    
    // Reset game state
    this.snake = [];
    this.food = null;
    this.scoreText = null;
    this.instructionText = null;
    this.gameStarted = false;
    this.gameEnded = false;
    this.score = 0;
    this.direction = { x: 0, y: 0 };
    this.nextDirection = { x: 0, y: 0 };
  }
  
  /**
   * Create game elements
   */
  private createGameElements(): void {
    if (!this.app) return;
    
    // Create initial snake (3 segments)
    const startX = Math.floor(this.app.screen.width / this.gridSize / 2) * this.gridSize;
    const startY = Math.floor(this.app.screen.height / this.gridSize / 2) * this.gridSize;
    
    for (let i = 0; i < 3; i++) {
      const segment = new PIXI.Graphics();
      segment.beginFill(0x00ff00);
      segment.drawRect(0, 0, this.gridSize - 2, this.gridSize - 2);
      segment.endFill();
      segment.x = startX - i * this.gridSize;
      segment.y = startY;
      this.snake.push(segment);
      this.app.stage.addChild(segment);
    }
    
    // Create food
    this.food = new PIXI.Graphics();
    this.food.beginFill(0xff0000);
    this.food.drawRect(0, 0, this.gridSize - 2, this.gridSize - 2);
    this.food.endFill();
    this.placeFood();
    this.app.stage.addChild(this.food);
    
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
    this.instructionText = new PIXI.Text('Use arrow keys to start', {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff
    });
    this.instructionText.x = this.app.screen.width / 2 - this.instructionText.width / 2;
    this.instructionText.y = this.app.screen.height / 2 - 50;
    this.app.stage.addChild(this.instructionText);
  }
  
  /**
   * Place food at a random position
   */
  private placeFood(): void {
    if (!this.app || !this.food) return;
    
    // Calculate grid dimensions
    const gridWidth = Math.floor(this.app.screen.width / this.gridSize);
    const gridHeight = Math.floor(this.app.screen.height / this.gridSize);
    
    // Generate random position
    let foodX, foodY;
    let validPosition = false;
    
    while (!validPosition) {
      foodX = Math.floor(Math.random() * gridWidth) * this.gridSize;
      foodY = Math.floor(Math.random() * gridHeight) * this.gridSize;
      
      // Check if position overlaps with snake
      validPosition = true;
      for (const segment of this.snake) {
        if (segment.x === foodX && segment.y === foodY) {
          validPosition = false;
          break;
        }
      }
    }
    
    this.food.x = foodX;
    this.food.y = foodY;
  }
  
  /**
   * Handle keyboard input
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.gameStarted && !this.gameEnded) {
      if (
        event.code === 'ArrowUp' ||
        event.code === 'ArrowDown' ||
        event.code === 'ArrowLeft' ||
        event.code === 'ArrowRight'
      ) {
        this.startGame();
      }
    }
    
    // Set direction based on key press
    switch (event.code) {
      case 'ArrowUp':
        if (this.direction.y === 0) { // Prevent 180-degree turns
          this.nextDirection = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
        if (this.direction.y === 0) {
          this.nextDirection = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
        if (this.direction.x === 0) {
          this.nextDirection = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
        if (this.direction.x === 0) {
          this.nextDirection = { x: 1, y: 0 };
        }
        break;
    }
  }
  
  /**
   * Start the game
   */
  private startGame(): void {
    if (!this.app || !this.instructionText) return;
    
    this.gameStarted = true;
    this.direction = { x: 1, y: 0 }; // Start moving right
    this.nextDirection = { x: 1, y: 0 };
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
    if (!this.app || !this.food || !this.scoreText) return;
    
    if (!this.gameStarted || this.gameEnded) return;
    
    // Slow down game loop
    this.gameLoopCounter += delta;
    if (this.gameLoopCounter < this.gameSpeed) return;
    this.gameLoopCounter = 0;
    
    // Update direction
    this.direction = { ...this.nextDirection };
    
    // Move snake
    const head = this.snake[0];
    const newHead = new PIXI.Graphics();
    newHead.beginFill(0x00ff00);
    newHead.drawRect(0, 0, this.gridSize - 2, this.gridSize - 2);
    newHead.endFill();
    newHead.x = head.x + this.direction.x * this.gridSize;
    newHead.y = head.y + this.direction.y * this.gridSize;
    
    // Check for wall collision
    if (
      newHead.x < 0 ||
      newHead.x >= this.app.screen.width ||
      newHead.y < 0 ||
      newHead.y >= this.app.screen.height
    ) {
      this.endGame(false);
      return;
    }
    
    // Check for self collision
    for (const segment of this.snake) {
      if (newHead.x === segment.x && newHead.y === segment.y) {
        this.endGame(false);
        return;
      }
    }
    
    // Check for food collision
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      // Eat food
      this.score += 1;
      this.scoreText.text = `Score: ${this.score}/${this.targetScore}`;
      this.placeFood();
      
      // Check if player has won
      if (this.score >= this.targetScore) {
        this.endGame(true);
        return;
      }
    } else {
      // Remove tail
      const tail = this.snake.pop();
      if (tail) {
        this.app.stage.removeChild(tail);
      }
    }
    
    // Add new head
    this.snake.unshift(newHead);
    this.app.stage.addChild(newHead);
  }
}
