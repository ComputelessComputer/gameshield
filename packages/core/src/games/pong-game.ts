import * as Phaser from "phaser";
import { BaseGame } from "./base-game";
import { Difficulty } from "../types";

/**
 * Pong game implementation
 */
export class PongGame extends BaseGame {
  private paddle!: Phaser.Physics.Arcade.Sprite;
  private ball!: Phaser.Physics.Arcade.Sprite;
  private aiPaddle!: Phaser.Physics.Arcade.Sprite;
  private scoreText!: Phaser.GameObjects.Text;

  private score: number = 0;
  private targetScore: number = 3;
  private ballSpeed: number = 200;
  private paddleSpeed: number = 300;
  private aiSpeed: number = 150;

  /**
   * Creates the game objects when the scene starts
   */
  public createGame(): void {
    const { width, height } = this.game.canvas;

    this.setDifficulty(this.difficulty);

    this.paddle = this.gameScene.physics.add.sprite(50, height / 2, "");
    this.paddle.setDisplaySize(10, 60);
    this.paddle.setImmovable(true);

    this.aiPaddle = this.gameScene.physics.add.sprite(
      width - 50,
      height / 2,
      ""
    );
    this.aiPaddle.setDisplaySize(10, 60);
    this.aiPaddle.setImmovable(true);

    this.ball = this.gameScene.physics.add.sprite(width / 2, height / 2, "");
    this.ball.setDisplaySize(10, 10);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);

    this.gameScene.physics.add.collider(
      this.ball,
      this.paddle,
      this.hitPaddle as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.gameScene.physics.add.collider(
      this.ball,
      this.aiPaddle,
      this.hitAiPaddle as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.scoreText = this.gameScene.add.text(width / 2, 20, "Score: 0", {
      fontSize: "16px",
      color: "#ffffff",
    });
    this.scoreText.setOrigin(0.5);

    this.gameScene.time.delayedCall(1000, this.launchBall, [], this);

    this.gameScene.input.on("pointermove", this.handlePointerMove, this);
  }

  /**
   * Updates the game state on each frame
   * @param time The current time
   * @param delta Time elapsed since last frame
   */
  public updateGame(time: number, delta: number): void {
    this.updateAI();

    if (this.ball.x < 0) {
      this.resetBall();
    } else if (this.ball.x > this.game.canvas.width) {
      this.score++;
      this.scoreText.setText(`Score: ${this.score}`);
      this.resetBall();

      if (this.score >= this.targetScore) {
        this.complete(true, this.score);
      }
    }
  }

  /**
   * Resets the game to its initial state
   */
  public reset(): void {
    this.score = 0;
    if (this.scoreText) {
      this.scoreText.setText("Score: 0");
    }
    this.resetBall();
  }

  /**
   * Sets the difficulty level
   * @param difficulty Difficulty level
   */
  private setDifficulty(difficulty: Difficulty): void {
    switch (difficulty) {
      case "easy":
        this.ballSpeed = 150;
        this.aiSpeed = 100;
        this.targetScore = 2;
        break;
      case "medium":
        this.ballSpeed = 200;
        this.aiSpeed = 150;
        this.targetScore = 3;
        break;
      case "hard":
        this.ballSpeed = 250;
        this.aiSpeed = 200;
        this.targetScore = 5;
        break;
    }
  }

  /**
   * Launches the ball in a random direction
   */
  private launchBall(): void {
    const { width, height } = this.game.canvas;
    this.ball.setPosition(width / 2, height / 2);

    const angle = Phaser.Math.Between(-45, 45) * (Math.PI / 180);
    const direction = Phaser.Math.Between(0, 1) ? 1 : -1;

    const vx = Math.cos(angle) * this.ballSpeed * direction;
    const vy = Math.sin(angle) * this.ballSpeed;

    this.ball.setVelocity(vx, vy);
  }

  /**
   * Resets the ball position and launches it after a delay
   */
  private resetBall(): void {
    this.ball.setVelocity(0, 0);
    const { width, height } = this.game.canvas;
    this.ball.setPosition(width / 2, height / 2);

    this.gameScene.time.delayedCall(1000, this.launchBall, [], this);
  }

  /**
   * Updates the AI paddle position
   */
  private updateAI(): void {
    if (!this.aiPaddle || !this.ball) return;

    const targetY = this.ball.y;
    const currentY = this.aiPaddle.y;

    if (targetY < currentY - 10) {
      this.aiPaddle.setVelocityY(-this.aiSpeed);
    } else if (targetY > currentY + 10) {
      this.aiPaddle.setVelocityY(this.aiSpeed);
    } else {
      this.aiPaddle.setVelocityY(0);
    }
  }

  /**
   * Handles collision between the ball and player paddle
   */
  private hitPaddle(
    object1: Phaser.GameObjects.GameObject,
    object2: Phaser.GameObjects.GameObject
  ): void {
    const ball = object1 as Phaser.Physics.Arcade.Sprite;
    const paddle = object2 as Phaser.Physics.Arcade.Sprite;

    const diff = ball.y - paddle.y;
    const normalizedDiff = diff / (paddle.height / 2);
    const angle = normalizedDiff * 45 * (Math.PI / 180);

    const speed = this.ballSpeed;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    ball.setVelocity(vx, vy);
  }

  /**
   * Handles collision between the ball and AI paddle
   */
  private hitAiPaddle(
    object1: Phaser.GameObjects.GameObject,
    object2: Phaser.GameObjects.GameObject
  ): void {
    const ball = object1 as Phaser.Physics.Arcade.Sprite;
    const paddle = object2 as Phaser.Physics.Arcade.Sprite;

    const diff = ball.y - paddle.y;
    const normalizedDiff = diff / (paddle.height / 2);
    const angle = normalizedDiff * 45 * (Math.PI / 180);

    const speed = -this.ballSpeed;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    ball.setVelocity(vx, vy);
  }

  /**
   * Handles pointer movement to control the player paddle
   */
  private handlePointerMove(pointer: Phaser.Input.Pointer): void {
    if (!this.paddle) return;

    this.paddle.y = Phaser.Math.Clamp(
      pointer.y,
      this.paddle.height / 2,
      this.game.canvas.height - this.paddle.height / 2
    );
  }
}
