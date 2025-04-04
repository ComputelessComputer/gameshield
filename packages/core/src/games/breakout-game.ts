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
    const ballObj = ball as Phaser.Physics.Arcade.Sprite;
    const brickRect = brick as Phaser.GameObjects.Rectangle;
    
    // 이미 비활성화된 벽돌은 처리하지 않음
    const brickBody = brickRect.body as Phaser.Physics.Arcade.StaticBody;
    if (!brickBody || !brickBody.enable || !ballObj.body) {
      return;
    }
    
    // 공의 물리적 속성 가져오기
    const ballBody = ballObj.body as Phaser.Physics.Arcade.Body;
    const ballVelocity = ballBody.velocity.clone();
    const ballSpeed = ballVelocity.length();
    
    // 벽돌의 경계 계산
    const brickBounds = {
      left: brickRect.x - brickRect.width / 2,
      right: brickRect.x + brickRect.width / 2,
      top: brickRect.y - brickRect.height / 2,
      bottom: brickRect.y + brickRect.height / 2
    };
    
    // 충돌 측면 감지 - 공의 중심과 벽돌의 각 면 사이의 교차 지점 확인
    const intersectRight = ballObj.x >= brickBounds.right && ballBody.prev.x < brickBounds.right;
    const intersectLeft = ballObj.x <= brickBounds.left && ballBody.prev.x > brickBounds.left;
    const intersectBottom = ballObj.y >= brickBounds.bottom && ballBody.prev.y < brickBounds.bottom;
    const intersectTop = ballObj.y <= brickBounds.top && ballBody.prev.y > brickBounds.top;
    
    // 충돌 측면에 따라 반사 적용
    let reflected = false;
    
    if ((intersectLeft || intersectRight) && Math.abs(ballVelocity.x) > 0) {
      ballVelocity.x = -ballVelocity.x;
      reflected = true;
    }
    
    if ((intersectTop || intersectBottom) && Math.abs(ballVelocity.y) > 0) {
      ballVelocity.y = -ballVelocity.y;
      reflected = true;
    }
    
    // 특정 측면을 감지하지 못한 경우, 공의 직전 위치와 현재 위치를 비교하여 판단
    if (!reflected) {
      // 공의 직전 위치
      const prevX = ballBody.prev.x;
      const prevY = ballBody.prev.y;
      
      // 수평/수직 침투 거리 계산
      const overlapX = (ballObj.width + brickRect.width) / 2 - Math.abs(ballObj.x - brickRect.x);
      const overlapY = (ballObj.height + brickRect.height) / 2 - Math.abs(ballObj.y - brickRect.y);
      
      // 더 작은 침투 거리를 기준으로 반사 방향 결정
      if (overlapX <= overlapY) {
        // 수평 반사
        ballVelocity.x = -ballVelocity.x;
        
        // 공을 벽돌 바깥으로 밀어냄
        if (ballObj.x > brickRect.x) {
          ballObj.x = brickBounds.right + ballObj.width / 2 + 1;
        } else {
          ballObj.x = brickBounds.left - ballObj.width / 2 - 1;
        }
      } else {
        // 수직 반사
        ballVelocity.y = -ballVelocity.y;
        
        // 공을 벽돌 바깥으로 밀어냄
        if (ballObj.y > brickRect.y) {
          ballObj.y = brickBounds.bottom + ballObj.height / 2 + 1;
        } else {
          ballObj.y = brickBounds.top - ballObj.height / 2 - 1;
        }
      }
    }
    
    // 속도 정규화하여 일정한 속도 유지
    ballVelocity.normalize().scale(ballSpeed);
    ballObj.setVelocity(ballVelocity.x, ballVelocity.y);
    
    // 벽돌 비활성화 - 물리적 반응이 적용된 후에 수행
    brickBody.enable = false;
    brickRect.setVisible(false);
    
    // 점수 업데이트
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
