import * as Phaser from "phaser";
import { BaseGame } from "./base-game";
import { Difficulty } from "../types";

/**
 * Flappy Bird game implementation
 * Precision Challenge: The user must successfully fly through X gaps without hitting obstacles
 */
export class FlappyBirdGame extends BaseGame {
  private bird!: Phaser.Physics.Arcade.Sprite;
  private pipes!: Phaser.GameObjects.Group;
  private scoreText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;

  private score: number = 0;
  private targetScore: number = 3;
  private speed: number = 200;
  private gapSize: number = 150;
  private gameOver: boolean = false;
  private pipeTimer!: Phaser.Time.TimerEvent;
  private pipeSpacing: number = 300;

  /**
   * Creates the game objects when the scene starts
   */
  public createGame(): void {
    const { width, height } = this.game.canvas;

    this.setDifficulty(this.difficulty);

    this.bird = this.gameScene.physics.add.sprite(width / 3, height / 2, "");
    this.bird.setDisplaySize(30, 30);
    this.bird.setCircle(15);
    this.bird.setGravityY(1000);

    this.pipes = this.gameScene.add.group();

    this.gameScene.physics.add.overlap(
      this.bird,
      this.pipes,
      this.hitPipe as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.scoreText = this.gameScene.add.text(
      width / 2,
      20,
      "Pipes: 0/" + this.targetScore,
      {
        fontSize: "16px",
        color: "#ffffff",
      }
    );
    this.scoreText.setOrigin(0.5);

    this.instructionText = this.gameScene.add.text(
      width / 2,
      50,
      "Tap or press SPACE to flap",
      {
        fontSize: "14px",
        color: "#ffffff",
      }
    );
    this.instructionText.setOrigin(0.5);

    this.gameScene.input.on("pointerdown", this.flap, this);
    
    // Add keyboard input if available
    if (this.gameScene.input.keyboard) {
      this.gameScene.input.keyboard.on("keydown-SPACE", this.flap, this);
    }

    this.startPipes();
  }

  /**
   * Updates the game state on each frame
   * @param time The current time
   * @param delta Time elapsed since last frame
   */
  public updateGame(time: number, delta: number): void {
    if (this.gameOver) return;

    const { height } = this.game.canvas;
    if (this.bird.y < 0 || this.bird.y > height) {
      this.gameOver = true;
      this.complete(false, this.score);
      return;
    }

    const velocity = this.bird.body?.velocity.y || 0;
    this.bird.angle = Phaser.Math.Clamp(velocity / 10, -30, 90);

    this.pipes.getChildren().forEach((pipe: any) => {
      pipe.x -= this.speed * (delta / 1000);

      if (pipe.getData("scored") === false && pipe.x < this.bird.x - 15) {
        pipe.setData("scored", true);
        this.score++;
        if (this.scoreText) {
          this.scoreText.setText(`Pipes: ${this.score}/${this.targetScore}`);
        }

        if (this.score >= this.targetScore) {
          this.gameOver = true;
          this.complete(true, this.score);
        }
      }

      if (pipe.x < -50) {
        pipe.destroy();
      }
    });
  }

  /**
   * Resets the game to its initial state
   */
  public reset(): void {
    this.score = 0;
    this.gameOver = false;

    const { width, height } = this.game.canvas;
    this.bird.setPosition(width / 3, height / 2);
    this.bird.setVelocity(0, 0);
    this.bird.angle = 0;

    this.pipes.clear(true, true);

    if (this.pipeTimer) {
      this.pipeTimer.remove();
    }
    this.startPipes();

    if (this.scoreText) {
      this.scoreText.setText("Pipes: 0/" + this.targetScore);
    }
  }

  /**
   * Sets the difficulty level
   * @param difficulty Difficulty level
   */
  private setDifficulty(difficulty: Difficulty): void {
    switch (difficulty) {
      case "easy":
        this.speed = 150;
        this.gapSize = 180;
        this.targetScore = 2;
        this.pipeSpacing = 350;
        break;
      case "medium":
        this.speed = 200;
        this.gapSize = 150;
        this.targetScore = 3;
        this.pipeSpacing = 300;
        break;
      case "hard":
        this.speed = 250;
        this.gapSize = 120;
        this.targetScore = 5;
        this.pipeSpacing = 250;
        break;
    }

    if (this.scoreText) {
      this.scoreText.setText("Pipes: 0/" + this.targetScore);
    }
  }

  /**
   * Starts spawning pipes
   */
  private startPipes(): void {
    this.pipeTimer = this.gameScene.time.addEvent({
      delay: (this.pipeSpacing * 1000) / this.speed,
      callback: this.spawnPipe,
      callbackScope: this,
      loop: true,
    });

    this.spawnPipe();
  }

  /**
   * Spawns a new pipe
   */
  private spawnPipe(): void {
    if (this.gameOver) return;

    const { width, height } = this.game.canvas;

    const gapY = Phaser.Math.Between(this.gapSize, height - this.gapSize);

    const topPipe = this.gameScene.add.rectangle(
      width + 50,
      gapY - this.gapSize / 2,
      40,
      gapY - this.gapSize / 2,
      0x00aa00
    );
    topPipe.setOrigin(0.5, 1);

    const bottomPipe = this.gameScene.add.rectangle(
      width + 50,
      gapY + this.gapSize / 2,
      40,
      height - (gapY + this.gapSize / 2),
      0x00aa00
    );
    bottomPipe.setOrigin(0.5, 0);

    this.gameScene.physics.add.existing(topPipe, true);
    this.gameScene.physics.add.existing(bottomPipe, true);

    this.pipes.add(topPipe);
    this.pipes.add(bottomPipe);

    topPipe.setData("scored", false);
    bottomPipe.setData("scored", false);

    const scoreZone = this.gameScene.add.rectangle(
      width + 50,
      height / 2,
      10,
      this.gapSize,
      0x00aa00,
      0
    );
    this.gameScene.physics.add.existing(scoreZone, true);
    scoreZone.setData("scored", false);
    this.pipes.add(scoreZone);
  }

  /**
   * Makes the bird flap
   */
  private flap(): void {
    if (this.gameOver) return;

    this.bird.setVelocityY(-350);
  }

  /**
   * Handles collision with pipes
   */
  private hitPipe(
    bird: Phaser.GameObjects.GameObject,
    pipe: Phaser.GameObjects.GameObject
  ): void {
    if ((pipe as Phaser.GameObjects.Rectangle).fillAlpha === 0) {
      return;
    }

    if (this.gameOver) return;

    this.gameOver = true;
    this.complete(false, this.score);
  }
}
