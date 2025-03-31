import * as PIXI from 'pixi.js';
import { BaseGame } from './base-game';
import { GameOptions, Difficulty } from '../types';

/**
 * Pong game implementation
 */
export class PongGame extends BaseGame {
  // Game elements
  private paddle: PIXI.Graphics;
  private ball: PIXI.Graphics;
  private aiPaddle: PIXI.Graphics;
  private scoreText: PIXI.Text;
  
  // Game settings
  private paddleWidth: number = 15;
  private paddleHeight: number = 80;
  private ballSize: number = 15;
  private ballSpeed: number = 5;
  private ballVelocity: { x: number; y: number } = { x: 0, y: 0 };
  private paddleSpeed: number = 8;
  private aiPaddleSpeed: number = 4;
  private score: number = 0;
  private maxScore: number = 5;
  private gameAreaPadding: number = 20;
  
  // Input tracking
  private keys: { [key: string]: boolean } = {};
  private mouseY: number | null = null;
  private touchY: number | null = null;
  
  /**
   * Creates a new Pong game instance
   * @param options Game options
   */
  constructor(options: GameOptions) {
    super(options);
    
    // Adjust difficulty settings
    this.adjustDifficulty(options.difficulty || 'medium');
    
    // Initialize game
    this.init();
  }
  
  /**
   * Adjusts game settings based on difficulty
   * @param difficulty Difficulty level
   */
  private adjustDifficulty(difficulty: Difficulty): void {
    switch (difficulty) {
      case 'easy':
        this.ballSpeed = 4;
        this.aiPaddleSpeed = 3;
        this.maxScore = 3;
        break;
      case 'medium':
        this.ballSpeed = 5;
        this.aiPaddleSpeed = 4;
        this.maxScore = 5;
        break;
      case 'hard':
        this.ballSpeed = 6;
        this.aiPaddleSpeed = 5;
        this.maxScore = 7;
        break;
    }
  }
  
  /**
   * Initializes the game
   */
  public init(): void {
    super.init();
    
    // Create game elements
    this.createGameElements();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Reset game state
    this.reset();
  }
  
  /**
   * Creates game elements
   */
  private createGameElements(): void {
    // Create player paddle
    this.paddle = new PIXI.Graphics();
    this.paddle.beginFill(0xffffff);
    this.paddle.drawRect(0, 0, this.paddleWidth, this.paddleHeight);
    this.paddle.endFill();
    this.paddle.x = this.gameAreaPadding;
    this.paddle.y = (this.size - this.paddleHeight) / 2;
    this.app.stage.addChild(this.paddle);
    
    // Create AI paddle
    this.aiPaddle = new PIXI.Graphics();
    this.aiPaddle.beginFill(0xffffff);
    this.aiPaddle.drawRect(0, 0, this.paddleWidth, this.paddleHeight);
    this.aiPaddle.endFill();
    this.aiPaddle.x = this.size - this.paddleWidth - this.gameAreaPadding;
    this.aiPaddle.y = (this.size - this.paddleHeight) / 2;
    this.app.stage.addChild(this.aiPaddle);
    
    // Create ball
    this.ball = new PIXI.Graphics();
    this.ball.beginFill(0xffffff);
    this.ball.drawRect(0, 0, this.ballSize, this.ballSize);
    this.ball.endFill();
    this.ball.x = (this.size - this.ballSize) / 2;
    this.ball.y = (this.size - this.ballSize) / 2;
    this.app.stage.addChild(this.ball);
    
    // Create score text
    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
      align: 'center'
    });
    this.scoreText = new PIXI.Text(`Score: 0/${this.maxScore}`, textStyle);
    this.scoreText.x = (this.size - this.scoreText.width) / 2;
    this.scoreText.y = 10;
    this.app.stage.addChild(this.scoreText);
  }
  
  /**
   * Sets up event listeners for user input
   */
  private setupEventListeners(): void {
    // Keyboard input
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    
    // Mouse input
    this.container.addEventListener('mousemove', this.handleMouseMove);
    
    // Touch input
    this.container.addEventListener('touchmove', this.handleTouchMove);
    this.container.addEventListener('touchend', this.handleTouchEnd);
  }
  
  /**
   * Removes event listeners
   */
  private removeEventListeners(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.container.removeEventListener('mousemove', this.handleMouseMove);
    this.container.removeEventListener('touchmove', this.handleTouchMove);
    this.container.removeEventListener('touchend', this.handleTouchEnd);
  }
  
  /**
   * Resets the game to its initial state
   */
  public reset(): void {
    // Reset score
    this.score = 0;
    this.updateScoreText();
    
    // Reset ball position
    this.ball.x = (this.size - this.ballSize) / 2;
    this.ball.y = (this.size - this.ballSize) / 2;
    
    // Reset ball velocity with random direction
    const angle = Math.random() * Math.PI / 4 - Math.PI / 8 + (Math.random() > 0.5 ? 0 : Math.PI);
    this.ballVelocity.x = Math.cos(angle) * this.ballSpeed;
    this.ballVelocity.y = Math.sin(angle) * this.ballSpeed;
    
    // Reset paddles
    this.paddle.y = (this.size - this.paddleHeight) / 2;
    this.aiPaddle.y = (this.size - this.paddleHeight) / 2;
    
    // Reset input tracking
    this.keys = {};
    this.mouseY = null;
    this.touchY = null;
  }
  
  /**
   * Updates the score text
   */
  private updateScoreText(): void {
    this.scoreText.text = `Score: ${this.score}/${this.maxScore}`;
    this.scoreText.x = (this.size - this.scoreText.width) / 2;
  }
  
  /**
   * Update method called on each frame
   * @param delta Time elapsed since last frame
   */
  protected update(delta: number): void {
    if (!this.isRunning) {
      return;
    }
    
    // Update player paddle position based on input
    this.updatePlayerPaddle();
    
    // Update AI paddle position
    this.updateAIPaddle();
    
    // Update ball position
    this.updateBall();
    
    // Check for collisions
    this.checkCollisions();
    
    // Check for scoring
    this.checkScoring();
  }
  
  /**
   * Updates player paddle position based on input
   */
  private updatePlayerPaddle(): void {
    // Keyboard input
    if (this.keys['ArrowUp'] || this.keys['w']) {
      this.paddle.y -= this.paddleSpeed;
    }
    if (this.keys['ArrowDown'] || this.keys['s']) {
      this.paddle.y += this.paddleSpeed;
    }
    
    // Mouse input
    if (this.mouseY !== null) {
      // Calculate the target position based on mouse Y
      const targetY = this.mouseY - this.paddleHeight / 2;
      // Smoothly move towards the target
      this.paddle.y += (targetY - this.paddle.y) * 0.2;
    }
    
    // Touch input
    if (this.touchY !== null) {
      // Calculate the target position based on touch Y
      const targetY = this.touchY - this.paddleHeight / 2;
      // Smoothly move towards the target
      this.paddle.y += (targetY - this.paddle.y) * 0.2;
    }
    
    // Keep paddle within bounds
    this.paddle.y = Math.max(this.gameAreaPadding, Math.min(this.size - this.paddleHeight - this.gameAreaPadding, this.paddle.y));
  }
  
  /**
   * Updates AI paddle position
   */
  private updateAIPaddle(): void {
    // Simple AI: follow the ball with some delay
    const targetY = this.ball.y + this.ballSize / 2 - this.paddleHeight / 2;
    
    // Add some randomness to make it imperfect
    const aiAccuracy = this.difficulty === 'hard' ? 0.9 : this.difficulty === 'medium' ? 0.7 : 0.5;
    const randomOffset = (1 - aiAccuracy) * (Math.random() * 100 - 50);
    
    // Move towards the target
    const aiTargetY = targetY + randomOffset;
    
    // Smoothly move towards the target
    if (this.aiPaddle.y < aiTargetY) {
      this.aiPaddle.y += Math.min(this.aiPaddleSpeed, aiTargetY - this.aiPaddle.y);
    } else if (this.aiPaddle.y > aiTargetY) {
      this.aiPaddle.y -= Math.min(this.aiPaddleSpeed, this.aiPaddle.y - aiTargetY);
    }
    
    // Keep AI paddle within bounds
    this.aiPaddle.y = Math.max(this.gameAreaPadding, Math.min(this.size - this.paddleHeight - this.gameAreaPadding, this.aiPaddle.y));
  }
  
  /**
   * Updates ball position
   */
  private updateBall(): void {
    // Move the ball
    this.ball.x += this.ballVelocity.x;
    this.ball.y += this.ballVelocity.y;
    
    // Bounce off top and bottom walls
    if (this.ball.y <= this.gameAreaPadding || this.ball.y + this.ballSize >= this.size - this.gameAreaPadding) {
      this.ballVelocity.y = -this.ballVelocity.y;
      
      // Keep ball within bounds
      if (this.ball.y <= this.gameAreaPadding) {
        this.ball.y = this.gameAreaPadding;
      } else if (this.ball.y + this.ballSize >= this.size - this.gameAreaPadding) {
        this.ball.y = this.size - this.ballSize - this.gameAreaPadding;
      }
    }
  }
  
  /**
   * Checks for collisions between ball and paddles
   */
  private checkCollisions(): void {
    // Check collision with player paddle
    if (
      this.ball.x <= this.paddle.x + this.paddleWidth &&
      this.ball.x + this.ballSize >= this.paddle.x &&
      this.ball.y + this.ballSize >= this.paddle.y &&
      this.ball.y <= this.paddle.y + this.paddleHeight
    ) {
      // Bounce off player paddle
      this.ball.x = this.paddle.x + this.paddleWidth;
      this.ballVelocity.x = -this.ballVelocity.x;
      
      // Adjust angle based on where the ball hit the paddle
      const hitPosition = (this.ball.y + this.ballSize / 2) - (this.paddle.y + this.paddleHeight / 2);
      const normalizedHitPosition = hitPosition / (this.paddleHeight / 2);
      this.ballVelocity.y = normalizedHitPosition * this.ballSpeed;
      
      // Slightly increase ball speed
      const speedIncrease = 0.2;
      const currentSpeed = Math.sqrt(this.ballVelocity.x * this.ballVelocity.x + this.ballVelocity.y * this.ballVelocity.y);
      const speedRatio = (currentSpeed + speedIncrease) / currentSpeed;
      this.ballVelocity.x *= speedRatio;
      this.ballVelocity.y *= speedRatio;
    }
    
    // Check collision with AI paddle
    if (
      this.ball.x + this.ballSize >= this.aiPaddle.x &&
      this.ball.x <= this.aiPaddle.x + this.paddleWidth &&
      this.ball.y + this.ballSize >= this.aiPaddle.y &&
      this.ball.y <= this.aiPaddle.y + this.paddleHeight
    ) {
      // Bounce off AI paddle
      this.ball.x = this.aiPaddle.x - this.ballSize;
      this.ballVelocity.x = -this.ballVelocity.x;
      
      // Adjust angle based on where the ball hit the paddle
      const hitPosition = (this.ball.y + this.ballSize / 2) - (this.aiPaddle.y + this.paddleHeight / 2);
      const normalizedHitPosition = hitPosition / (this.paddleHeight / 2);
      this.ballVelocity.y = normalizedHitPosition * this.ballSpeed;
    }
  }
  
  /**
   * Checks for scoring conditions
   */
  private checkScoring(): void {
    // Check if ball went past AI paddle (player scores)
    if (this.ball.x + this.ballSize > this.size) {
      this.score++;
      this.updateScoreText();
      
      // Check if player won
      if (this.score >= this.maxScore) {
        this.complete(true, this.score);
      } else {
        this.resetBall();
      }
    }
    
    // Check if ball went past player paddle (AI scores)
    if (this.ball.x < 0) {
      // Reset ball
      this.resetBall();
    }
  }
  
  /**
   * Resets the ball position and velocity
   */
  private resetBall(): void {
    // Reset ball position
    this.ball.x = (this.size - this.ballSize) / 2;
    this.ball.y = (this.size - this.ballSize) / 2;
    
    // Reset ball velocity with random direction
    const angle = Math.random() * Math.PI / 4 - Math.PI / 8 + (Math.random() > 0.5 ? 0 : Math.PI);
    this.ballVelocity.x = Math.cos(angle) * this.ballSpeed;
    this.ballVelocity.y = Math.sin(angle) * this.ballSpeed;
  }
  
  /**
   * Destroys the game and cleans up resources
   */
  public destroy(): void {
    // Remove event listeners
    this.removeEventListeners();
    
    // Call parent destroy method
    super.destroy();
  }
  
  // Event handlers
  private handleKeyDown = (event: KeyboardEvent): void => {
    this.keys[event.key] = true;
  };
  
  private handleKeyUp = (event: KeyboardEvent): void => {
    this.keys[event.key] = false;
  };
  
  private handleMouseMove = (event: MouseEvent): void => {
    // Get the canvas position
    const rect = this.app.view.getBoundingClientRect();
    // Calculate the relative mouse position within the canvas
    this.mouseY = (event.clientY - rect.top) * (this.size / rect.height);
  };
  
  private handleTouchMove = (event: TouchEvent): void => {
    if (event.touches.length > 0) {
      // Get the canvas position
      const rect = this.app.view.getBoundingClientRect();
      // Calculate the relative touch position within the canvas
      this.touchY = (event.touches[0].clientY - rect.top) * (this.size / rect.height);
      
      // Prevent scrolling
      event.preventDefault();
    }
  };
  
  private handleTouchEnd = (): void => {
    this.touchY = null;
  };
}
