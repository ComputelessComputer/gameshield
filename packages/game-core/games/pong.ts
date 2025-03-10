import * as PIXI from "pixi.js";
import { BaseGame, GameConfig, GameResult } from "./base-game";

export class PongGame extends BaseGame {
  private paddle!: PIXI.Graphics;
  private ball!: PIXI.Graphics;
  private scoreText!: PIXI.Text;
  private timeText!: PIXI.Text;
  private instructionText!: PIXI.Text;
  
  private ballSpeed: number;
  private ballVelocity: { x: number; y: number };
  private score: number = 0;
  private timeRemaining: number;
  private gameInterval: number | null = null;
  
  constructor(config: GameConfig = {}) {
    super(config);
    
    // Set difficulty-based parameters
    switch(this.config.difficulty) {
      case 'easy':
        this.ballSpeed = 3;
        break;
      case 'hard':
        this.ballSpeed = 7;
        break;
      case 'medium':
      default:
        this.ballSpeed = 5;
        break;
    }
    
    this.timeRemaining = this.config.timeLimit || 30;
    this.ballVelocity = { 
      x: this.ballSpeed * (Math.random() > 0.5 ? 1 : -1), 
      y: this.ballSpeed * (Math.random() > 0.5 ? 0.8 : -0.8) 
    };
  }
  
  protected init(): void {
    // Create paddle
    this.paddle = new PIXI.Graphics();
    this.paddle.beginFill(0xFFFFFF);
    this.paddle.drawRect(0, 0, 100, 20);
    this.paddle.endFill();
    this.paddle.x = (this.config.width! / 2) - 50;
    this.paddle.y = this.config.height! - 30;
    this.app.stage.addChild(this.paddle);
    
    // Create ball
    this.ball = new PIXI.Graphics();
    this.ball.beginFill(0xFFFFFF);
    this.ball.drawCircle(0, 0, 10);
    this.ball.endFill();
    this.ball.x = this.config.width! / 2;
    this.ball.y = this.config.height! / 2;
    this.app.stage.addChild(this.ball);
    
    // Create score text
    this.scoreText = new PIXI.Text(`Hits: ${this.score}/${this.config.successThreshold}`, {
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
    this.instructionText = new PIXI.Text(`Hit the ball ${this.config.successThreshold} times to verify`, {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: 0xFFFFFF
    });
    this.instructionText.x = (this.config.width! / 2) - (this.instructionText.width / 2);
    this.instructionText.y = 40;
    this.app.stage.addChild(this.instructionText);
    
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
  
  private gameLoop(): void {
    // Move ball
    this.ball.x += this.ballVelocity.x;
    this.ball.y += this.ballVelocity.y;
    
    // Ball collision with walls
    if (this.ball.x <= 10 || this.ball.x >= this.config.width! - 10) {
      this.ballVelocity.x *= -1;
    }
    
    if (this.ball.y <= 10) {
      this.ballVelocity.y *= -1;
    }
    
    // Ball collision with paddle
    if (
      this.ball.y >= this.paddle.y - 10 &&
      this.ball.y <= this.paddle.y + 10 &&
      this.ball.x >= this.paddle.x &&
      this.ball.x <= this.paddle.x + this.paddle.width
    ) {
      // Bounce the ball with a slightly random angle
      this.ballVelocity.y *= -1;
      this.ballVelocity.x += (Math.random() * 2 - 1); // Add some randomness
      
      // Normalize velocity to maintain consistent speed
      const magnitude = Math.sqrt(
        this.ballVelocity.x * this.ballVelocity.x + 
        this.ballVelocity.y * this.ballVelocity.y
      );
      this.ballVelocity.x = (this.ballVelocity.x / magnitude) * this.ballSpeed;
      this.ballVelocity.y = (this.ballVelocity.y / magnitude) * this.ballSpeed;
      
      // Increment score
      this.score++;
      this.scoreText.text = `Hits: ${this.score}/${this.config.successThreshold}`;
      
      // Check for win condition
      if (this.score >= this.config.successThreshold!) {
        this.endGame(true);
      }
    }
    
    // Ball out of bounds (bottom)
    if (this.ball.y > this.config.height!) {
      // Reset ball position
      this.ball.x = this.config.width! / 2;
      this.ball.y = this.config.height! / 2;
      this.ballVelocity = { 
        x: this.ballSpeed * (Math.random() > 0.5 ? 1 : -1), 
        y: this.ballSpeed * (Math.random() > 0.5 ? 0.8 : -0.8) 
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
        ? `Success! You hit the ball ${this.score} times.` 
        : `Failed! You only hit the ball ${this.score} times.`
    };
    
    this.onComplete(result);
  }
  
  protected cleanup(): void {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
    
    this.app.ticker.remove(this.gameLoop.bind(this));
    this.app.stage.off('pointermove', this.onPointerMove.bind(this));
  }
}
