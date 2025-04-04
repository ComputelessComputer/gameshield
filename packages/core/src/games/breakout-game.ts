import * as Phaser from "phaser";
import { BaseGame } from "./base-game";
import { Difficulty } from "../types";

/**
 * Breakout game implementation
 * Brick Breaking Challenge: The player must break a specified number of bricks to verify
 */
export class BreakoutGame extends BaseGame {
  private paddle!: Phaser.Physics.Arcade.Sprite;
  private ball!: Phaser.Physics.Arcade.Sprite;
  private bricks!: Phaser.Physics.Arcade.StaticGroup;
  private scoreText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;

  private score: number = 0;
  private targetScore: number = 5;
  private ballSpeed: number = 200;
  private paddleSpeed: number = 400;
  private ballLaunched: boolean = false;
  private gameOver: boolean = false;

  /**
   * Creates the game objects when the scene starts
   */
  public createGame(): void {
    const { width, height } = this.game.canvas;

    this.setDifficulty(this.difficulty);

    this.paddle = this.gameScene.physics.add.sprite(width / 2, height - 30, "");
    this.paddle.setDisplaySize(100, 20);
    this.paddle.setImmovable(true);
    this.paddle.setCollideWorldBounds(true);

    this.ball = this.gameScene.physics.add.sprite(width / 2, height - 50, "");
    this.ball.setDisplaySize(15, 15);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);

    // Initialize the bricks group properly
    this.bricks = this.gameScene.physics.add.staticGroup();
    this.createBricks();

    this.gameScene.physics.add.collider(
      this.ball,
      this.paddle,
      this.hitPaddle as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.gameScene.physics.add.collider(
      this.ball,
      this.bricks,
      this.hitBrick as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.scoreText = this.gameScene.add.text(
      width / 2,
      20,
      "Bricks: 0/" + this.targetScore,
      {
        fontSize: "16px",
        color: "#ffffff",
      }
    );
    this.scoreText.setOrigin(0.5);

    this.instructionText = this.gameScene.add.text(
      width / 2,
      50,
      "Click to launch ball",
      {
        fontSize: "14px",
        color: "#ffffff",
      }
    );
    this.instructionText.setOrigin(0.5);

    this.gameScene.input.on("pointermove", this.handlePointerMove, this);
    this.gameScene.input.on("pointerdown", this.launchBall, this);
  }

  /**
   * Updates the game state on each frame
   * @param time The current time
   * @param delta Time elapsed since last frame
   */
  public updateGame(time: number, delta: number): void {
    if (this.gameOver) return;

    if (this.gameScene.input.activePointer.isDown) {
      const pointer = this.gameScene.input.activePointer;
      this.paddle.x = Phaser.Math.Clamp(
        pointer.x,
        this.paddle.width / 2,
        this.game.canvas.width - this.paddle.width / 2
      );
    }

    if (this.gameScene.input.keyboard) {
      const cursors = this.gameScene.input.keyboard.createCursorKeys();
      if (cursors.left && cursors.left.isDown) {
        this.paddle.x -= this.paddleSpeed * (delta / 1000);
      } else if (cursors.right && cursors.right.isDown) {
        this.paddle.x += this.paddleSpeed * (delta / 1000);
      }
    }

    this.paddle.x = Phaser.Math.Clamp(
      this.paddle.x,
      this.paddle.width / 2,
      this.game.canvas.width - this.paddle.width / 2
    );

    if (!this.ballLaunched) {
      this.ball.x = this.paddle.x;
    }

    // If the ball falls off the bottom of the screen, the player fails the challenge
    if (this.ball.y > this.game.canvas.height) {
      this.gameOver = true;
      this.complete(false, this.score); // Mark as failed
      
      // Display failure message
      if (this.instructionText) {
        this.instructionText.setText("Challenge failed!");
        this.instructionText.setVisible(true);
      }
      
      return; // Exit early since game is over
    }

    if (this.ballLaunched && time % 10000 < 20) {
      const velocity = this.ball.body?.velocity;
      if (velocity) {
        const speed = Math.sqrt(
          velocity.x * velocity.x + velocity.y * velocity.y
        );
        if (speed < this.ballSpeed * 1.5) {
          const factor = this.ballSpeed / speed;
          velocity.x *= factor;
          velocity.y *= factor;
        }
      }
    }
  }

  /**
   * Resets the game to its initial state
   */
  public reset(): void {
    this.score = 0;
    this.ballLaunched = false;
    this.gameOver = false;

    const { width, height } = this.game.canvas;
    this.paddle.setPosition(width / 2, height - 30);
    this.ball.setPosition(width / 2, height - 50);
    this.ball.setVelocity(0, 0);

    if (this.bricks) {
      this.bricks.clear(true, true);
    }
    this.createBricks();

    if (this.scoreText) {
      this.scoreText.setText("Bricks: 0/" + this.targetScore);
    }
    if (this.instructionText) {
      this.instructionText.setText("Click to launch ball");
      this.instructionText.setVisible(true);
    }
  }

  /**
   * Sets the difficulty level
   * @param difficulty Difficulty level
   */
  private setDifficulty(difficulty: Difficulty): void {
    switch (difficulty) {
      case "easy":
        this.ballSpeed = 150;
        this.targetScore = 3;
        break;
      case "medium":
        this.ballSpeed = 200;
        this.targetScore = 5;
        break;
      case "hard":
        this.ballSpeed = 250;
        this.targetScore = 8;
        break;
    }

    if (this.scoreText) {
      this.scoreText.setText("Bricks: 0/" + this.targetScore);
    }
  }

  /**
   * Creates the brick layout
   */
  private createBricks(): void {
    const { width } = this.game.canvas;

    const brickWidth = 50;
    const brickHeight = 20;
    const padding = 5;
    const cols = 7; // Increased from 6 to 7 columns
    
    // Fix the centering calculation - the previous formula had an issue
    // Total width of all bricks and padding between them
    const totalBricksWidth = cols * brickWidth + (cols - 1) * padding;
    // Center this in the canvas
    const offsetX = (width - totalBricksWidth) / 2;
    const offsetY = 80;

    const rows =
      this.difficulty === "easy" ? 3 : this.difficulty === "medium" ? 4 : 5;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Create a brick as a rectangle
        const brick = this.gameScene.add.rectangle(
          // Position each brick with proper spacing
          offsetX + col * (brickWidth + padding) + brickWidth / 2,
          offsetY + row * (brickHeight + padding) + brickHeight / 2,
          brickWidth,
          brickHeight,
          0xffffff
        );
        
        // Add the brick to the physics group and enable it
        this.bricks.add(brick);
        
        // Apply color to the brick
        const colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff];
        (brick as Phaser.GameObjects.Rectangle).setFillStyle(colors[row % colors.length]);
      }
    }
    
    // Refresh the physics body for all bricks
    this.bricks.refresh();
  }

  /**
   * Launches the ball
   */
  private launchBall(): void {
    if (this.ballLaunched || this.gameOver) return;

    this.ballLaunched = true;
    this.instructionText.setVisible(false);

    const angle = Phaser.Math.Between(-60, 60) * (Math.PI / 180);
    const vx = Math.cos(angle) * this.ballSpeed;
    const vy = -Math.sin(angle) * this.ballSpeed;

    this.ball.setVelocity(vx, vy);
  }

  /**
   * Resets the ball position
   */
  private resetBall(): void {
    this.ballLaunched = false;
    this.ball.setVelocity(0, 0);
    this.ball.setPosition(this.paddle.x, this.paddle.y - 20);
    this.instructionText.setText("Click to launch ball");
    this.instructionText.setVisible(true);
  }

  /**
   * Handles collision between the ball and paddle
   */
  private hitPaddle(
    ball: Phaser.GameObjects.GameObject,
    paddle: Phaser.GameObjects.GameObject
  ): void {
    const paddleObj = paddle as Phaser.Physics.Arcade.Sprite;
    const ballObj = ball as Phaser.Physics.Arcade.Sprite;
    
    if (!ballObj.body) return;

    // Get current velocity
    const velocity = ballObj.body.velocity;
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    
    // Calculate the hit position relative to the paddle center
    const diff = ballObj.x - paddleObj.x;
    
    // Normalize the difference to a value between -1 and 1
    const normalizedDiff = Phaser.Math.Clamp(diff / (paddleObj.width / 2), -1, 1);
    
    // Base reflection - maintain incoming angle but reverse vertical direction
    // This follows the physics principle that angle of incidence equals angle of reflection
    let vx = velocity.x;
    let vy = -Math.abs(velocity.y); // Always bounce upward
    
    // Add paddle influence - hitting the edges adds horizontal velocity
    // This simulates the paddle "brushing" the ball when hit on the edges
    vx += normalizedDiff * (this.ballSpeed * 0.7);
    
    // Normalize the resulting vector to maintain consistent ball speed
    const newSpeed = Math.sqrt(vx * vx + vy * vy);
    const speedFactor = this.ballSpeed / newSpeed;
    
    // Apply the new velocity with consistent speed
    ballObj.setVelocity(vx * speedFactor, vy * speedFactor);
  }

  /**
   * Handles collision between the ball and a brick
   */
  private hitBrick(
    ball: Phaser.GameObjects.GameObject,
    brick: Phaser.GameObjects.GameObject
  ): void {
    // For rectangles, we need to use a different approach to disable the brick
    const brickBody = (brick as Phaser.GameObjects.Rectangle).body as Phaser.Physics.Arcade.StaticBody;
    if (brickBody) {
      brickBody.enable = false;
    }
    
    // Hide the brick
    (brick as Phaser.GameObjects.Rectangle).setVisible(false);
    
    // Apply proper physics reflection for the ball
    const ballObj = ball as Phaser.Physics.Arcade.Sprite;
    if (ballObj.body) {
      // Determine which side of the brick was hit
      const brickRect = brick as Phaser.GameObjects.Rectangle;
      const ballCenterX = ballObj.x;
      const ballCenterY = ballObj.y;
      const brickCenterX = brickRect.x;
      const brickCenterY = brickRect.y;
      
      // Calculate distances from ball center to brick center
      const dx = Math.abs(ballCenterX - brickCenterX);
      const dy = Math.abs(ballCenterY - brickCenterY);
      
      // Determine if collision is more horizontal or vertical
      // This is a simplified approach to determine which side was hit
      if (dx > dy) {
        // Horizontal collision (left or right side)
        ballObj.body.velocity.x = -ballObj.body.velocity.x;
      } else {
        // Vertical collision (top or bottom)
        ballObj.body.velocity.y = -ballObj.body.velocity.y;
      }
    }

    this.score++;
    this.scoreText.setText(`Bricks: ${this.score}/${this.targetScore}`);

    if (this.score >= this.targetScore) {
      this.gameOver = true;
      this.complete(true, this.score);
    }

    if (this.bricks.countActive() === 0) {
      if (this.score < this.targetScore) {
        this.createBricks();
      }
    }
  }

  /**
   * Handles pointer movement to control the paddle
   */
  private handlePointerMove(pointer: Phaser.Input.Pointer): void {
    if (!this.paddle || this.gameOver) return;

    if (pointer && pointer.x) {
      this.paddle.x = Phaser.Math.Clamp(
        pointer.x,
        this.paddle.width / 2,
        this.game.canvas.width - this.paddle.width / 2
      );
    }
  }
}
