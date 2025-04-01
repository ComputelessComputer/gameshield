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

    this.bricks = this.gameScene.physics.add.staticGroup();

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

    if (this.ball.y > this.game.canvas.height) {
      this.resetBall();
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
    const offsetX = (width - (brickWidth + padding) * 6 + padding) / 2;
    const offsetY = 80;

    const rows =
      this.difficulty === "easy" ? 3 : this.difficulty === "medium" ? 4 : 5;
    const cols = 6;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const brick = this.gameScene.physics.add.sprite(
          offsetX + col * (brickWidth + padding),
          offsetY + row * (brickHeight + padding),
          ""
        );

        brick.setDisplaySize(brickWidth, brickHeight);

        const colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff];
        brick.setTint(colors[row % colors.length]);

        this.bricks.add(brick);
      }
    }
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

    const diff = ballObj.x - paddleObj.x;
    const normalizedDiff = diff / (paddleObj.width / 2);
    const angle = normalizedDiff * 60 * (Math.PI / 180);

    const speed = this.ballSpeed;
    const vx = Math.cos(angle) * speed;
    const vy = -Math.sin(angle) * speed;

    ballObj.setVelocity(vx, vy);
  }

  /**
   * Handles collision between the ball and a brick
   */
  private hitBrick(
    ball: Phaser.GameObjects.GameObject,
    brick: Phaser.GameObjects.GameObject
  ): void {
    (brick as Phaser.Physics.Arcade.Sprite).disableBody(true, true);

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
