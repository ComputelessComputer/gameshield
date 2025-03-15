import { Game, GameOptions } from '../types';
import * as PIXI from 'pixi.js';

/**
 * PongGame
 * 
 * A simple Pong game implementation for GameShield CAPTCHA.
 */
export class PongGame implements Game {
  private app: PIXI.Application | null = null;
  private paddle: PIXI.Graphics | null = null;
  private ball: PIXI.Graphics | null = null;
  private aiPaddle: PIXI.Graphics | null = null;
  private scoreText: PIXI.Text | null = null;
  private instructionText: PIXI.Text | null = null;
  
  private ballVelocity = { x: 0, y: 0 };
  private score = 0;
  private targetScore = 3; // Score needed to pass the CAPTCHA
  private gameStarted = false;
  private gameEnded = false;
  
  private readonly options: GameOptions;
  
  constructor(options: GameOptions) {
    this.options = options;
    
    // Adjust difficulty
    switch (options.difficulty) {
      case 'easy':
        this.targetScore = 2;
        break;
      case 'medium':
        this.targetScore = 3;
        break;
      case 'hard':
        this.targetScore = 5;
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
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
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
      window.removeEventListener('keyup', this.handleKeyUp.bind(this));
      window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
      
      // Destroy PIXI application
      this.app.destroy(true, { children: true, texture: true, baseTexture: true });
      this.app = null;
    }
    
    // Reset game state
    this.paddle = null;
    this.ball = null;
    this.aiPaddle = null;
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
    
    // Create player paddle
    this.paddle = new PIXI.Graphics();
    this.paddle.beginFill(0xffffff);
    this.paddle.drawRect(0, 0, 100, 10);
    this.paddle.endFill();
    this.paddle.x = this.app.screen.width / 2 - 50;
    this.paddle.y = this.app.screen.height - 20;
    this.app.stage.addChild(this.paddle);
    
    // Create AI paddle
    this.aiPaddle = new PIXI.Graphics();
    this.aiPaddle.beginFill(0xff0000);
    this.aiPaddle.drawRect(0, 0, 100, 10);
    this.aiPaddle.endFill();
    this.aiPaddle.x = this.app.screen.width / 2 - 50;
    this.aiPaddle.y = 20;
    this.app.stage.addChild(this.aiPaddle);
    
    // Create ball
    this.ball = new PIXI.Graphics();
    this.ball.beginFill(0xffffff);
    this.ball.drawCircle(0, 0, 8);
    this.ball.endFill();
    this.ball.x = this.app.screen.width / 2;
    this.ball.y = this.app.screen.height / 2;
    this.app.stage.addChild(this.ball);
    
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
    this.instructionText.y = this.app.screen.height / 2 - 50;
    this.app.stage.addChild(this.instructionText);
    
    // Initialize ball velocity
    this.resetBall();
  }
  
  /**
   * Reset ball position and velocity
   */
  private resetBall(): void {
    if (!this.app || !this.ball) return;
    
    this.ball.x = this.app.screen.width / 2;
    this.ball.y = this.app.screen.height / 2;
    
    // Random direction, but always moving down toward player
    const angle = Math.random() * Math.PI / 2 - Math.PI / 4 + Math.PI; // π ± π/4
    const speed = 5;
    
    this.ballVelocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
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
  
  private handleKeyUp(): void {
    // Handle key up events if needed
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
    if (!this.app || !this.ball || !this.paddle || !this.aiPaddle || !this.scoreText) return;
    
    if (!this.gameStarted || this.gameEnded) return;
    
    // Move ball
    this.ball.x += this.ballVelocity.x * delta;
    this.ball.y += this.ballVelocity.y * delta;
    
    // AI paddle movement (follows ball with slight delay)
    const aiTargetX = this.ball.x - this.aiPaddle.width / 2;
    this.aiPaddle.x += (aiTargetX - this.aiPaddle.x) * 0.1 * delta;
    
    // Keep AI paddle within bounds
    this.aiPaddle.x = Math.max(0, Math.min(this.app.screen.width - this.aiPaddle.width, this.aiPaddle.x));
    
    // Ball collision with walls
    if (this.ball.x <= 0 || this.ball.x >= this.app.screen.width) {
      this.ballVelocity.x *= -1;
    }
    
    // Ball collision with top (AI paddle area)
    if (this.ball.y <= 0) {
      this.score += 1;
      this.scoreText.text = `Score: ${this.score}/${this.targetScore}`;
      this.resetBall();
      
      // Check if player has won
      if (this.score >= this.targetScore) {
        this.endGame(true);
      }
    }
    
    // Ball collision with bottom (player loses)
    if (this.ball.y >= this.app.screen.height) {
      this.endGame(false);
    }
    
    // Ball collision with AI paddle
    if (
      this.ball.y <= this.aiPaddle.y + this.aiPaddle.height &&
      this.ball.y >= this.aiPaddle.y &&
      this.ball.x >= this.aiPaddle.x &&
      this.ball.x <= this.aiPaddle.x + this.aiPaddle.width
    ) {
      this.ballVelocity.y *= -1;
      this.ball.y = this.aiPaddle.y + this.aiPaddle.height;
      
      // Add some randomness to the bounce
      this.ballVelocity.x += (Math.random() - 0.5) * 2;
    }
    
    // Ball collision with player paddle
    if (
      this.ball.y >= this.paddle.y - this.ball.height &&
      this.ball.y <= this.paddle.y + this.paddle.height &&
      this.ball.x >= this.paddle.x &&
      this.ball.x <= this.paddle.x + this.paddle.width
    ) {
      this.ballVelocity.y *= -1;
      this.ball.y = this.paddle.y - this.ball.height;
      
      // Add some angle based on where the ball hit the paddle
      const hitPosition = (this.ball.x - this.paddle.x) / this.paddle.width;
      this.ballVelocity.x = (hitPosition - 0.5) * 10;
    }
  }
}
