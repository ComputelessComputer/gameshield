import * as PIXI from "pixi.js";
import { BaseGame, GameConfig, GameResult } from "./base-game";

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  sprite: PIXI.Graphics;
}

export class BreakoutGame extends BaseGame {
  // Game objects
  private paddle!: PIXI.Graphics;
  private ball!: PIXI.Graphics;
  private bricks: Brick[] = [];
  private scoreText!: PIXI.Text;
  private timeText!: PIXI.Text;
  private instructionText!: PIXI.Text;
  
  // Game state
  private ballVelocity: { x: number; y: number };
  private ballSpeed: number;
  private paddleSpeed: number;
  private score: number = 0;
  private timeRemaining: number;
  private gameInterval: number | null = null;
  private requiredScore: number;
  
  constructor(config: GameConfig = {}) {
    super(config);
    
    // Set difficulty-based parameters
    switch(this.config.difficulty) {
      case 'easy':
        this.ballSpeed = 3;
        this.paddleSpeed = 8;
        this.requiredScore = 5;
        break;
      case 'hard':
        this.ballSpeed = 7;
        this.paddleSpeed = 6;
        this.requiredScore = 15;
        break;
      case 'medium':
      default:
        this.ballSpeed = 5;
        this.paddleSpeed = 7;
        this.requiredScore = 10;
        break;
    }
    
    this.timeRemaining = this.config.timeLimit || 60;
    this.ballVelocity = { 
      x: this.ballSpeed * (Math.random() > 0.5 ? 1 : -1), 
      y: -this.ballSpeed 
    };
  }
  
  protected init(): void {
    // Create paddle
    this.paddle = new PIXI.Graphics();
    this.paddle.beginFill(0xFFFFFF);
    this.paddle.drawRect(0, 0, 100, 15);
    this.paddle.endFill();
    this.paddle.x = (this.config.width! / 2) - 50;
    this.paddle.y = this.config.height! - 30;
    this.app.stage.addChild(this.paddle);
    
    // Create ball
    this.ball = new PIXI.Graphics();
    this.ball.beginFill(0xFFFFFF);
    this.ball.drawCircle(0, 0, 8);
    this.ball.endFill();
    this.ball.x = this.config.width! / 2;
    this.ball.y = this.config.height! - 50;
    this.app.stage.addChild(this.ball);
    
    // Create bricks
    this.createBricks();
    
    // Create score text
    this.scoreText = new PIXI.Text(`Score: ${this.score}/${this.requiredScore}`, {
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
    this.timeText.x = this.config.width! - 100;
    this.timeText.y = 10;
    this.app.stage.addChild(this.timeText);
    
    // Create instruction text
    this.instructionText = new PIXI.Text(`Break ${this.requiredScore} bricks to verify`, {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: 0xFFFFFF
    });
    this.instructionText.x = (this.config.width! / 2) - (this.instructionText.width / 2);
    this.instructionText.y = 40;
    this.app.stage.addChild(this.instructionText);
    
    // Set up keyboard controls
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    
    // Set up mouse/touch movement for paddle
    this.app.stage.interactive = true;
    this.app.stage.on('pointermove', this.onPointerMove.bind(this));
    
    // Start game loop
    this.app.ticker.add(this.gameLoop.bind(this));
    
    // Start timer
    this.gameInterval = window.setInterval(() => {
      this.timeRemaining--;
      this.timeText.text = `Time: ${this.timeRemaining}s`;
      
      if (this.timeRemaining <= 0) {
        this.endGame(false);
      }
    }, 1000);
  }
  
  private createBricks(): void {
    const brickWidth = 50;
    const brickHeight = 20;
    const padding = 5;
    const rows = this.config.difficulty === 'hard' ? 5 : 
                 this.config.difficulty === 'easy' ? 3 : 4;
    const cols = Math.floor((this.config.width! - padding) / (brickWidth + padding));
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const brick: Brick = {
          x: col * (brickWidth + padding) + padding,
          y: row * (brickHeight + padding) + 80,
          width: brickWidth,
          height: brickHeight,
          health: 1,
          sprite: new PIXI.Graphics()
        };
        
        // Different colors for different rows
        let color = 0xFF0000; // Default to red
        switch (row % 5) {
          case 0: color = 0xFF0000; break; // Red
          case 1: color = 0xFF7F00; break; // Orange
          case 2: color = 0xFFFF00; break; // Yellow
          case 3: color = 0x00FF00; break; // Green
          case 4: color = 0x0000FF; break; // Blue
        }
        
        brick.sprite.beginFill(color);
        brick.sprite.drawRect(0, 0, brickWidth, brickHeight);
        brick.sprite.endFill();
        brick.sprite.x = brick.x;
        brick.sprite.y = brick.y;
        
        this.app.stage.addChild(brick.sprite);
        this.bricks.push(brick);
      }
    }
  }
  
  private onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.movePaddle(-this.paddleSpeed);
        break;
      case 'ArrowRight':
        this.movePaddle(this.paddleSpeed);
        break;
    }
  }
  
  private onKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        // Stop paddle movement
        break;
    }
  }
  
  private onPointerMove(event: PIXI.FederatedPointerEvent): void {
    const newX = event.global.x - this.paddle.width / 2;
    
    // Keep paddle within bounds
    if (newX < 0) {
      this.paddle.x = 0;
    } else if (newX > this.config.width! - this.paddle.width) {
      this.paddle.x = this.config.width! - this.paddle.width;
    } else {
      this.paddle.x = newX;
    }
  }
  
  private movePaddle(speed: number): void {
    const newX = this.paddle.x + speed;
    
    // Keep paddle within bounds
    if (newX < 0) {
      this.paddle.x = 0;
    } else if (newX > this.config.width! - this.paddle.width) {
      this.paddle.x = this.config.width! - this.paddle.width;
    } else {
      this.paddle.x = newX;
    }
  }
  
  private gameLoop(): void {
    // Move ball
    this.ball.x += this.ballVelocity.x;
    this.ball.y += this.ballVelocity.y;
    
    // Ball collision with walls
    if (this.ball.x <= 8 || this.ball.x >= this.config.width! - 8) {
      this.ballVelocity.x *= -1;
    }
    
    if (this.ball.y <= 8) {
      this.ballVelocity.y *= -1;
    }
    
    // Ball collision with paddle
    if (
      this.ball.y >= this.paddle.y - 8 &&
      this.ball.y <= this.paddle.y + 8 &&
      this.ball.x >= this.paddle.x &&
      this.ball.x <= this.paddle.x + this.paddle.width
    ) {
      // Calculate bounce angle based on where ball hit the paddle
      const hitPosition = (this.ball.x - this.paddle.x) / this.paddle.width;
      const angle = (hitPosition - 0.5) * Math.PI; // -PI/2 to PI/2
      
      this.ballVelocity.y = -Math.abs(this.ballVelocity.y); // Always bounce up
      this.ballVelocity.x = this.ballSpeed * Math.sin(angle);
    }
    
    // Ball collision with bricks
    for (let i = this.bricks.length - 1; i >= 0; i--) {
      const brick = this.bricks[i];
      
      if (
        this.ball.x + 8 >= brick.x &&
        this.ball.x - 8 <= brick.x + brick.width &&
        this.ball.y + 8 >= brick.y &&
        this.ball.y - 8 <= brick.y + brick.height
      ) {
        // Determine which side of the brick was hit
        const overlapLeft = this.ball.x + 8 - brick.x;
        const overlapRight = brick.x + brick.width - (this.ball.x - 8);
        const overlapTop = this.ball.y + 8 - brick.y;
        const overlapBottom = brick.y + brick.height - (this.ball.y - 8);
        
        // Find the smallest overlap
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
        
        // Bounce based on which side was hit
        if (minOverlap === overlapLeft || minOverlap === overlapRight) {
          this.ballVelocity.x *= -1;
        } else {
          this.ballVelocity.y *= -1;
        }
        
        // Remove brick
        brick.health--;
        if (brick.health <= 0) {
          this.app.stage.removeChild(brick.sprite);
          this.bricks.splice(i, 1);
          
          // Increment score
          this.score++;
          this.scoreText.text = `Score: ${this.score}/${this.requiredScore}`;
          
          // Check for win condition
          if (this.score >= this.requiredScore) {
            this.endGame(true);
            return;
          }
        }
        
        // Only handle one collision per frame
        break;
      }
    }
    
    // Ball out of bounds (bottom)
    if (this.ball.y > this.config.height!) {
      // Reset ball position
      this.ball.x = this.config.width! / 2;
      this.ball.y = this.config.height! - 50;
      this.ballVelocity = { 
        x: this.ballSpeed * (Math.random() > 0.5 ? 1 : -1), 
        y: -this.ballSpeed 
      };
    }
  }
  
  private endGame(success: boolean): void {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
    
    this.app.ticker.remove(this.gameLoop.bind(this));
    
    const result: GameResult = {
      success,
      score: this.score,
      message: success 
        ? `Success! You broke ${this.score} bricks.` 
        : `Failed! You only broke ${this.score} bricks.`
    };
    
    this.onComplete(result);
  }
  
  protected cleanup(): void {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
    
    this.app.ticker.remove(this.gameLoop.bind(this));
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
    window.removeEventListener('keyup', this.onKeyUp.bind(this));
    this.app.stage.off('pointermove', this.onPointerMove.bind(this));
  }
}
