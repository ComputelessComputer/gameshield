import { Game, GameOptions } from '../types';
import * as PIXI from 'pixi.js';

interface Brick {
  graphics: PIXI.Graphics;
  health: number;
}

/**
 * BreakoutGame
 * 
 * A simple Breakout game implementation for GameShield CAPTCHA.
 */
export class BreakoutGame implements Game {
  private app: PIXI.Application | null = null;
  private paddle: PIXI.Graphics | null = null;
  private ball: PIXI.Graphics | null = null;
  private bricks: Brick[] = [];
  private scoreText: PIXI.Text | null = null;
  private instructionText: PIXI.Text | null = null;
  
  private ballVelocity = { x: 0, y: 0 };
  private score = 0;
  private targetScore = 5; // Score needed to pass the CAPTCHA
  private gameStarted = false;
  private gameEnded = false;
  
  private readonly options: GameOptions;
  
  constructor(options: GameOptions) {
    this.options = options;
    
    // Adjust difficulty
    switch (options.difficulty) {
      case 'easy':
        this.targetScore = 5;
        break;
      case 'medium':
        this.targetScore = 10;
        break;
      case 'hard':
        this.targetScore = 15;
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
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    
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
      window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
      
      // Destroy PIXI application
      this.app.destroy(true, { children: true, texture: true, baseTexture: true });
      this.app = null;
    }
    
    // Reset game state
    this.paddle = null;
    this.ball = null;
    this.bricks = [];
    this.scoreText = null;
    this.instructionText = null;
    this.gameStarted = false;
    this.gameEnded = false;
    this.score = 0;
  }
  
  /**
   * Resize the game canvas and reposition elements
   */
  public resize(width: number, height: number): void {
    if (!this.app) return;
    
    // Resize the renderer
    this.app.renderer.resize(width, height);
    
    // Reposition paddle
    if (this.paddle) {
      this.paddle.x = this.app.screen.width / 2 - this.paddle.width / 2;
      this.paddle.y = this.app.screen.height - 20;
    }
    
    // Reposition ball if game hasn't started
    if (this.ball && !this.gameStarted) {
      this.ball.x = this.app.screen.width / 2;
      this.ball.y = this.app.screen.height - 40;
    }
    
    // Reposition score text
    if (this.scoreText) {
      this.scoreText.x = 10;
      this.scoreText.y = 10;
    }
    
    // Reposition instruction text
    if (this.instructionText) {
      this.instructionText.x = this.app.screen.width / 2 - this.instructionText.width / 2;
      this.instructionText.y = this.app.screen.height / 2;
    }
    
    // Recreate bricks with new dimensions
    if (!this.gameStarted) {
      // Clear existing bricks
      this.bricks.forEach(brick => {
        if (this.app && brick.graphics.parent) {
          this.app.stage.removeChild(brick.graphics);
        }
      });
      this.bricks = [];
      
      // Create new bricks with updated dimensions
      this.createBricks();
    }
  }
  
  /**
   * Create game elements
   */
  private createGameElements(): void {
    if (!this.app) return;
    
    // Create paddle
    this.paddle = new PIXI.Graphics();
    this.paddle.beginFill(0xffffff);
    this.paddle.drawRect(0, 0, 100, 10);
    this.paddle.endFill();
    this.paddle.x = this.app.screen.width / 2 - 50;
    this.paddle.y = this.app.screen.height - 20;
    this.app.stage.addChild(this.paddle);
    
    // Create ball
    this.ball = new PIXI.Graphics();
    this.ball.beginFill(0xffffff);
    this.ball.drawCircle(0, 0, 8);
    this.ball.endFill();
    this.ball.x = this.app.screen.width / 2;
    this.ball.y = this.app.screen.height - 40;
    this.app.stage.addChild(this.ball);
    
    // Create bricks
    this.createBricks();
    
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
    this.instructionText = new PIXI.Text('Press SPACE to start', {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff
    });
    this.instructionText.x = this.app.screen.width / 2 - this.instructionText.width / 2;
    this.instructionText.y = this.app.screen.height / 2;
    this.app.stage.addChild(this.instructionText);
  }
  
  /**
   * Create brick layout
   */
  private createBricks(): void {
    if (!this.app) return;
    
    const brickWidth = 50;
    const brickHeight = 20;
    const padding = 5;
    const rows = 4;
    const cols = Math.floor(this.app.screen.width / (brickWidth + padding));
    const startX = (this.app.screen.width - (cols * (brickWidth + padding) - padding)) / 2;
    const startY = 50;
    
    const colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x9400d3];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const brick = new PIXI.Graphics();
        brick.beginFill(colors[row % colors.length]);
        brick.drawRect(0, 0, brickWidth, brickHeight);
        brick.endFill();
        brick.x = startX + col * (brickWidth + padding);
        brick.y = startY + row * (brickHeight + padding);
        
        this.app.stage.addChild(brick);
        
        this.bricks.push({
          graphics: brick,
          health: 1
        });
      }
    }
  }
  
  /**
   * Reset ball position and velocity
   */
  private resetBall(): void {
    if (!this.app || !this.ball || !this.paddle) return;
    
    this.ball.x = this.paddle.x + this.paddle.width / 2;
    this.ball.y = this.paddle.y - 10;
    
    // Random angle, but always moving upward
    const angle = Math.random() * Math.PI / 2 + Math.PI / 4; // π/4 to 3π/4
    const speed = 5;
    
    this.ballVelocity = {
      x: Math.cos(angle) * speed,
      y: -Math.sin(angle) * speed
    };
  }
  
  /**
   * Handle keyboard input
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space' && !this.gameStarted && !this.gameEnded) {
      this.startGame();
    }
  }
  
  /**
   * Handle mouse movement for paddle control
   */
  private handleMouseMove(event: MouseEvent): void {
    if (!this.app || !this.paddle) return;
    
    const rect = (this.app.view as HTMLCanvasElement).getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    
    // Move paddle with mouse
    this.paddle.x = Math.max(0, Math.min(this.app.screen.width - this.paddle.width, relativeX - this.paddle.width / 2));
  }
  
  /**
   * Start the game
   */
  private startGame(): void {
    if (!this.app || !this.instructionText) return;
    
    this.gameStarted = true;
    this.resetBall();
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
    if (!this.app || !this.ball || !this.paddle || !this.scoreText) return;
    
    if (!this.gameStarted || this.gameEnded) return;
    
    // Move ball
    this.ball.x += this.ballVelocity.x * delta;
    this.ball.y += this.ballVelocity.y * delta;
    
    // Ball collision with walls
    if (this.ball.x <= 0 || this.ball.x >= this.app.screen.width) {
      this.ballVelocity.x *= -1;
    }
    
    // Ball collision with ceiling
    if (this.ball.y <= 0) {
      this.ballVelocity.y *= -1;
    }
    
    // Ball collision with floor (player loses)
    if (this.ball.y >= this.app.screen.height) {
      this.endGame(false);
      return;
    }
    
    // Ball collision with paddle
    if (
      this.ball.y >= this.paddle.y - this.ball.height / 2 &&
      this.ball.y <= this.paddle.y + this.paddle.height &&
      this.ball.x >= this.paddle.x &&
      this.ball.x <= this.paddle.x + this.paddle.width
    ) {
      this.ballVelocity.y *= -1;
      this.ball.y = this.paddle.y - this.ball.height / 2;
      
      // Add some angle based on where the ball hit the paddle
      const hitPosition = (this.ball.x - this.paddle.x) / this.paddle.width;
      this.ballVelocity.x = (hitPosition - 0.5) * 10;
    }
    
    // Ball collision with bricks
    for (let i = 0; i < this.bricks.length; i++) {
      const brick = this.bricks[i];
      
      if (
        this.ball.x >= brick.graphics.x - this.ball.width / 2 &&
        this.ball.x <= brick.graphics.x + brick.graphics.width + this.ball.width / 2 &&
        this.ball.y >= brick.graphics.y - this.ball.height / 2 &&
        this.ball.y <= brick.graphics.y + brick.graphics.height + this.ball.height / 2
      ) {
        // Determine which side of the brick was hit
        const overlapLeft = this.ball.x - (brick.graphics.x - this.ball.width / 2);
        const overlapRight = (brick.graphics.x + brick.graphics.width + this.ball.width / 2) - this.ball.x;
        const overlapTop = this.ball.y - (brick.graphics.y - this.ball.height / 2);
        const overlapBottom = (brick.graphics.y + brick.graphics.height + this.ball.height / 2) - this.ball.y;
        
        // Find the smallest overlap
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
        
        // Bounce based on which side was hit
        if (minOverlap === overlapLeft || minOverlap === overlapRight) {
          this.ballVelocity.x *= -1;
        } else {
          this.ballVelocity.y *= -1;
        }
        
        // Damage brick
        brick.health--;
        
        if (brick.health <= 0) {
          // Remove brick
          this.app.stage.removeChild(brick.graphics);
          this.bricks.splice(i, 1);
          i--;
          
          // Increase score
          this.score++;
          this.scoreText.text = `Score: ${this.score}/${this.targetScore}`;
          
          // Check if player has won
          if (this.score >= this.targetScore || this.bricks.length === 0) {
            this.endGame(true);
            return;
          }
        }
        
        // Only handle one collision per frame
        break;
      }
    }
  }
}
