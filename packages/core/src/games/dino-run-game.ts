import * as Phaser from "phaser";
import { BaseGame } from "./base-game";
import { Difficulty } from "../types";

/**
 * Dino Run game implementation
 * Jump Timing Test: The player must jump over obstacles successfully to pass
 */
export class DinoRunGame extends BaseGame {
  private dino!: Phaser.Physics.Arcade.Sprite;
  private obstacles!: Phaser.GameObjects.Group;
  private ground!: Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.StaticBody;
  };
  private scoreText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;

  private score: number = 0;
  private targetScore: number = 3;
  private speed: number = 300;
  private isJumping: boolean = false;
  private gameOver: boolean = false;
  private obstacleTimer!: Phaser.Time.TimerEvent;

  /**
   * Creates the game objects when the scene starts
   */
  public createGame(): void {
    const { width, height } = this.game.canvas;

    this.setDifficulty(this.difficulty);

    const groundY = height - 50;
    this.ground = this.gameScene.add.rectangle(
      width / 2,
      groundY,
      width,
      4,
      0xffffff
    ) as Phaser.GameObjects.Rectangle & {
      body: Phaser.Physics.Arcade.StaticBody;
    };
    this.gameScene.physics.add.existing(this.ground, true);

    this.dino = this.gameScene.physics.add.sprite(100, groundY - 40, "");
    this.dino.setDisplaySize(30, 60);
    this.dino.setOrigin(0.5, 1);
    this.dino.setGravityY(1500);

    this.obstacles = this.gameScene.add.group();

    this.gameScene.physics.add.collider(this.dino, this.ground);

    this.gameScene.physics.add.overlap(
      this.dino,
      this.obstacles,
      this.hitObstacle as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.scoreText = this.gameScene.add.text(
      width / 2,
      20,
      "Obstacles: 0/" + this.targetScore,
      {
        fontSize: "16px",
        color: "#ffffff",
      }
    );
    this.scoreText.setOrigin(0.5);

    this.instructionText = this.gameScene.add.text(
      width / 2,
      50,
      "Tap or press SPACE to jump",
      {
        fontSize: "14px",
        color: "#ffffff",
      }
    );
    this.instructionText.setOrigin(0.5);

    this.gameScene.input.on("pointerdown", this.jump, this);
    
    // Add keyboard input if available
    if (this.gameScene.input.keyboard) {
      this.gameScene.input.keyboard.on("keydown-SPACE", this.jump, this);
    }

    this.startObstacles();
  }

  /**
   * Updates the game state on each frame
   * @param time The current time
   * @param delta Time elapsed since last frame
   */
  public updateGame(time: number, delta: number): void {
    if (this.gameOver) return;

    if (this.obstacleTimer && time > this.obstacleTimer.getElapsed()) {
      this.spawnObstacle();
    }

    this.obstacles
      .getChildren()
      .forEach((obstacle: Phaser.GameObjects.GameObject) => {
        const obstacleSprite = obstacle as Phaser.Physics.Arcade.Sprite;
        obstacleSprite.x -= this.speed * (delta / 1000);

        if (obstacleSprite.x < -20) {
          obstacle.destroy();

          this.score++;
          if (this.scoreText) {
            this.scoreText.setText(
              `Obstacles: ${this.score}/${this.targetScore}`
            );
          }

          if (this.score >= this.targetScore) {
            this.gameOver = true;
            this.complete(true, this.score);
          }
        }
      });

    if (this.dino.body && this.dino.body.touching.down) {
      this.isJumping = false;
    }
  }

  /**
   * Resets the game to its initial state
   */
  public reset(): void {
    this.score = 0;
    this.gameOver = false;
    this.isJumping = false;

    this.obstacles.clear(true, true);

    const groundY = this.game.canvas.height - 50;
    this.dino.setPosition(100, groundY - 40);
    this.dino.setVelocity(0, 0);

    if (this.scoreText) {
      this.scoreText.setText("Obstacles: 0/" + this.targetScore);
    }

    this.startObstacles();
  }

  /**
   * Sets the difficulty level
   * @param difficulty Difficulty level
   */
  private setDifficulty(difficulty: Difficulty): void {
    switch (difficulty) {
      case "easy":
        this.speed = 200;
        this.targetScore = 2;
        break;
      case "medium":
        this.speed = 300;
        this.targetScore = 3;
        break;
      case "hard":
        this.speed = 400;
        this.targetScore = 5;
        break;
    }

    if (this.scoreText) {
      this.scoreText.setText("Obstacles: 0/" + this.targetScore);
    }
  }

  /**
   * Starts the obstacle spawning timer
   */
  private startObstacles(): void {
    const minDelay =
      this.difficulty === "easy"
        ? 2000
        : this.difficulty === "medium"
        ? 1500
        : 1000;
    const maxDelay =
      this.difficulty === "easy"
        ? 3000
        : this.difficulty === "medium"
        ? 2500
        : 2000;

    this.obstacleTimer = this.gameScene.time.addEvent({
      delay: Phaser.Math.Between(minDelay, maxDelay),
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    }) as Phaser.Time.TimerEvent;
  }

  /**
   * Spawns a new obstacle
   */
  private spawnObstacle(): void {
    const { width, height } = this.game.canvas;
    const groundY = height - 50;

    const obstacle = this.gameScene.physics.add.sprite(
      width + 50,
      groundY - 20,
      ""
    );
    obstacle.setDisplaySize(20, 40);
    obstacle.setOrigin(0.5, 1);

    this.obstacles.add(obstacle);

    if (this.obstacleTimer) {
      this.obstacleTimer.destroy();
      this.obstacleTimer = this.gameScene.time.addEvent({
        delay: Phaser.Math.Between(1000, 3000),
        callback: this.spawnObstacle,
        callbackScope: this,
        loop: false,
      }) as Phaser.Time.TimerEvent;
    }
  }

  /**
   * Handles collision with an obstacle
   */
  private hitObstacle(): void {
    if (this.gameOver) return;

    this.gameOver = true;
    this.complete(false, this.score);
  }

  /**
   * Makes the dino jump
   */
  private jump(): void {
    if (!this.isJumping && this.dino.body && this.dino.body.touching.down) {
      this.isJumping = true;
      this.dino.setVelocityY(-500);

      this.gameScene.time.delayedCall(500, () => {
        this.isJumping = false;
      });
    }
  }
}
