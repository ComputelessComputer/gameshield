import * as PIXI from "pixi.js";
import { BaseGame, GameConfig, GameResult } from "./base-game";

interface SnakeSegment {
  x: number;
  y: number;
}

interface Food {
  x: number;
  y: number;
  sprite: PIXI.Graphics;
}

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export class SnakeGame extends BaseGame {
  private snake: SnakeSegment[] = [];
  private foods: Food[] = [];
  private direction: Direction = Direction.RIGHT;
  private nextDirection: Direction = Direction.RIGHT;
  private gridSize: number = 20;
  private gridWidth: number = 0;
  private gridHeight: number = 0;
  private scoreText!: PIXI.Text;
  private timeText!: PIXI.Text;
  private instructionText!: PIXI.Text;
  private gameContainer!: PIXI.Container;
  
  private score: number = 0;
  private timeRemaining: number;
  private gameInterval: number | null = null;
  private foodCollected: number = 0;
  private moveInterval: number;
  
  constructor(config: GameConfig = {}) {
    super(config);
    
    // Set difficulty-based parameters
    switch(this.config.difficulty) {
      case 'easy':
        this.moveInterval = 200;
        break;
      case 'hard':
        this.moveInterval = 100;
        break;
      case 'medium':
      default:
        this.moveInterval = 150;
        break;
    }
    
    this.timeRemaining = this.config.timeLimit || 30;
    
    // Calculate grid dimensions
    this.gridWidth = Math.floor((this.config.width || 400) / this.gridSize);
    this.gridHeight = Math.floor((this.config.height || 400) / this.gridSize);
  }
  
  protected init(): void {
    // Create game container
    this.gameContainer = new PIXI.Container();
    this.app.stage.addChild(this.gameContainer);
    
    // Create score text
    this.scoreText = new PIXI.Text(`Food: ${this.foodCollected}/${this.config.successThreshold || 5}`, {
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
    this.timeText.x = (this.config.width || 400) - 100;
    this.timeText.y = 10;
    this.app.stage.addChild(this.timeText);
    
    // Create instruction text
    this.instructionText = new PIXI.Text(`Collect ${this.config.successThreshold || 5} food items to verify`, {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: 0xFFFFFF
    });
    this.instructionText.x = ((this.config.width || 400) / 2) - (this.instructionText.width / 2);
    this.instructionText.y = 40;
    this.app.stage.addChild(this.instructionText);
    
    // Initialize snake
    this.initSnake();
    
    // Add food
    this.addFood();
    
    // Set up keyboard controls
    this.setupControls();
    
    // Start game loop
    this.gameInterval = window.setInterval(() => {
      this.moveSnake();
    }, this.moveInterval);
    
    // Start timer
    const timerInterval = window.setInterval(() => {
      this.timeRemaining--;
      this.timeText.text = `Time: ${this.timeRemaining}s`;
      
      if (this.timeRemaining <= 0) {
        clearInterval(timerInterval);
        this.endGame(false);
      }
    }, 1000);
  }
  
  private initSnake(): void {
    // Create initial snake with 3 segments
    this.snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ];
    
    // Draw snake
    this.drawSnake();
  }
  
  private drawSnake(): void {
    // Clear previous snake
    this.gameContainer.removeChildren();
    
    // Draw each segment
    this.snake.forEach((segment, index) => {
      const graphics = new PIXI.Graphics();
      
      // Head is a different color
      if (index === 0) {
        graphics.beginFill(0x00FF00);
      } else {
        graphics.beginFill(0x33CC33);
      }
      
      graphics.drawRect(0, 0, this.gridSize - 2, this.gridSize - 2);
      graphics.endFill();
      graphics.x = segment.x * this.gridSize + 1;
      graphics.y = segment.y * this.gridSize + 1;
      
      this.gameContainer.addChild(graphics);
    });
    
    // Draw food
    this.foods.forEach(food => {
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xFF0000);
      graphics.drawCircle(
        this.gridSize / 2, 
        this.gridSize / 2, 
        this.gridSize / 2 - 2
      );
      graphics.endFill();
      graphics.x = food.x * this.gridSize;
      graphics.y = food.y * this.gridSize;
      
      food.sprite = graphics;
      this.gameContainer.addChild(graphics);
    });
  }
  
  private moveSnake(): void {
    // Update direction
    this.direction = this.nextDirection;
    
    // Get current head position
    const head = { ...this.snake[0] };
    
    // Calculate new head position
    switch (this.direction) {
      case Direction.UP:
        head.y--;
        break;
      case Direction.DOWN:
        head.y++;
        break;
      case Direction.LEFT:
        head.x--;
        break;
      case Direction.RIGHT:
        head.x++;
        break;
    }
    
    // Check for wall collision
    if (
      head.x < 0 || 
      head.x >= this.gridWidth || 
      head.y < 0 || 
      head.y >= this.gridHeight
    ) {
      this.endGame(false);
      return;
    }
    
    // Check for self collision
    for (let i = 0; i < this.snake.length; i++) {
      if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
        this.endGame(false);
        return;
      }
    }
    
    // Add new head
    this.snake.unshift(head);
    
    // Check for food collision
    let foodEaten = false;
    for (let i = 0; i < this.foods.length; i++) {
      if (this.foods[i].x === head.x && this.foods[i].y === head.y) {
        // Remove eaten food
        this.gameContainer.removeChild(this.foods[i].sprite);
        this.foods.splice(i, 1);
        
        // Increment score
        this.foodCollected++;
        this.scoreText.text = `Food: ${this.foodCollected}/${this.config.successThreshold || 5}`;
        
        foodEaten = true;
        
        // Add new food
        this.addFood();
        
        // Check for win condition
        if (this.foodCollected >= (this.config.successThreshold || 5)) {
          this.endGame(true);
          return;
        }
        
        break;
      }
    }
    
    // If no food was eaten, remove the tail
    if (!foodEaten) {
      this.snake.pop();
    }
    
    // Redraw snake
    this.drawSnake();
  }
  
  private addFood(): void {
    // Generate random position that doesn't overlap with snake
    let x: number;
    let y: number;
    let validPosition = false;
    
    while (!validPosition) {
      x = Math.floor(Math.random() * this.gridWidth);
      y = Math.floor(Math.random() * this.gridHeight);
      
      validPosition = true;
      
      // Check if position overlaps with snake
      for (const segment of this.snake) {
        if (segment.x === x && segment.y === y) {
          validPosition = false;
          break;
        }
      }
      
      // Check if position overlaps with existing food
      for (const food of this.foods) {
        if (food.x === x && food.y === y) {
          validPosition = false;
          break;
        }
      }
      
      if (validPosition) {
        // Create new food
        const food: Food = {
          x: x!,
          y: y!,
          sprite: new PIXI.Graphics()
        };
        
        this.foods.push(food);
      }
    }
  }
  
  private setupControls(): void {
    // Add keyboard event listeners
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (this.direction !== Direction.DOWN) {
            this.nextDirection = Direction.UP;
          }
          break;
        case 'ArrowDown':
          if (this.direction !== Direction.UP) {
            this.nextDirection = Direction.DOWN;
          }
          break;
        case 'ArrowLeft':
          if (this.direction !== Direction.RIGHT) {
            this.nextDirection = Direction.LEFT;
          }
          break;
        case 'ArrowRight':
          if (this.direction !== Direction.LEFT) {
            this.nextDirection = Direction.RIGHT;
          }
          break;
      }
    });
  }
  
  private endGame(success: boolean): void {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
    
    const result: GameResult = {
      success,
      score: this.foodCollected,
      message: success 
        ? `Success! You collected ${this.foodCollected} food items.` 
        : `Failed! You only collected ${this.foodCollected} food items.`
    };
    
    this.onComplete(result);
  }
  
  protected cleanup(): void {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
    
    // Remove event listeners
    window.removeEventListener('keydown', this.setupControls);
  }
}
