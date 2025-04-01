import * as Phaser from "phaser";
import { BaseGame } from "./base-game";
import { Difficulty } from "../types";

/**
 * Pac-Man style game implementation
 * Maze Navigation Challenge: The player must collect dots while avoiding ghosts
 */
export class PacmanGame extends BaseGame {
  private player!: Phaser.Physics.Arcade.Sprite;
  private dots!: Phaser.GameObjects.Group;
  private ghosts!: Phaser.GameObjects.Group;
  private walls!: Phaser.GameObjects.Group;
  private scoreText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;

  private score: number = 0;
  private targetScore: number = 10;
  private playerSpeed: number = 150;
  private ghostSpeed: number = 100;
  private gameOver: boolean = false;
  private ghostMoveTimer: number = 0;
  private ghostMoveInterval: number = 500;
  private currentDirection: string = "right";
  private nextDirection: string = "right";

  /**
   * Creates the game objects when the scene starts
   */
  public createGame(): void {
    const { width, height } = this.game.canvas;

    this.setDifficulty(this.difficulty);

    this.walls = this.gameScene.add.group();

    this.createMaze();

    this.player = this.gameScene.physics.add.sprite(width / 2, height / 2, "");
    this.player.setDisplaySize(20, 20);
    this.player.setCircle(10);
    this.player.setCollideWorldBounds(true);

    this.dots = this.gameScene.add.group();

    this.ghosts = this.gameScene.add.group();

    this.addDots();

    this.addGhosts();

    this.gameScene.physics.add.collider(this.player, this.walls);
    this.gameScene.physics.add.collider(this.ghosts, this.walls);

    this.gameScene.physics.add.overlap(
      this.player,
      this.dots,
      this.collectDot as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.gameScene.physics.add.overlap(
      this.player,
      this.ghosts,
      this.hitGhost as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.scoreText = this.gameScene.add.text(
      width / 2,
      20,
      "Dots: 0/" + this.targetScore,
      {
        fontSize: "16px",
        color: "#ffffff",
      }
    );
    this.scoreText.setOrigin(0.5);

    this.instructionText = this.gameScene.add.text(
      width / 2,
      50,
      "Arrow keys to move",
      {
        fontSize: "14px",
        color: "#ffffff",
      }
    );
    this.instructionText.setOrigin(0.5);
  }

  /**
   * Updates the game state on each frame
   * @param time The current time
   * @param delta Time elapsed since last frame
   */
  public updateGame(time: number, delta: number): void {
    if (this.gameOver) return;

    this.handlePlayerMovement();

    if (time > this.ghostMoveTimer) {
      this.moveGhosts();
      this.ghostMoveTimer = time + this.ghostMoveInterval;
    }
  }

  /**
   * Resets the game to its initial state
   */
  public reset(): void {
    this.score = 0;
    this.gameOver = false;
    this.currentDirection = "right";
    this.nextDirection = "right";

    this.dots.clear(true, true);
    this.ghosts.clear(true, true);

    const { width, height } = this.game.canvas;
    this.player.setPosition(width / 2, height / 2);
    this.player.setVelocity(0, 0);

    this.addDots();
    this.addGhosts();

    if (this.scoreText) {
      this.scoreText.setText("Dots: 0/" + this.targetScore);
    }
  }

  /**
   * Sets the difficulty level
   * @param difficulty Difficulty level
   */
  private setDifficulty(difficulty: Difficulty): void {
    switch (difficulty) {
      case "easy":
        this.playerSpeed = 150;
        this.ghostSpeed = 75;
        this.targetScore = 5;
        this.ghostMoveInterval = 600;
        break;
      case "medium":
        this.playerSpeed = 150;
        this.ghostSpeed = 100;
        this.targetScore = 10;
        this.ghostMoveInterval = 500;
        break;
      case "hard":
        this.playerSpeed = 150;
        this.ghostSpeed = 125;
        this.targetScore = 15;
        this.ghostMoveInterval = 400;
        break;
    }

    if (this.scoreText) {
      this.scoreText.setText("Dots: 0/" + this.targetScore);
    }
  }

  /**
   * Creates a simple maze with walls
   */
  private createMaze(): void {
    const { width, height } = this.game.canvas;
    const wallThickness = 10;

    const topWall = this.gameScene.add.rectangle(
      width / 2,
      wallThickness / 2,
      width,
      wallThickness,
      0x0000ff
    );
    const bottomWall = this.gameScene.add.rectangle(
      width / 2,
      height - wallThickness / 2,
      width,
      wallThickness,
      0x0000ff
    );
    const leftWall = this.gameScene.add.rectangle(
      wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      0x0000ff
    );
    const rightWall = this.gameScene.add.rectangle(
      width - wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      0x0000ff
    );

    this.gameScene.physics.add.existing(topWall, true);
    this.gameScene.physics.add.existing(bottomWall, true);
    this.gameScene.physics.add.existing(leftWall, true);
    this.gameScene.physics.add.existing(rightWall, true);

    this.walls.add(topWall);
    this.walls.add(bottomWall);
    this.walls.add(leftWall);
    this.walls.add(rightWall);

    const horizontalWall1 = this.gameScene.add.rectangle(
      width / 4,
      height / 3,
      width / 2,
      wallThickness,
      0x0000ff
    );
    const horizontalWall2 = this.gameScene.add.rectangle(
      (width * 3) / 4,
      (height * 2) / 3,
      width / 2,
      wallThickness,
      0x0000ff
    );
    const verticalWall1 = this.gameScene.add.rectangle(
      width / 3,
      height / 4,
      wallThickness,
      height / 2,
      0x0000ff
    );
    const verticalWall2 = this.gameScene.add.rectangle(
      (width * 2) / 3,
      (height * 3) / 4,
      wallThickness,
      height / 2,
      0x0000ff
    );

    this.gameScene.physics.add.existing(horizontalWall1, true);
    this.gameScene.physics.add.existing(horizontalWall2, true);
    this.gameScene.physics.add.existing(verticalWall1, true);
    this.gameScene.physics.add.existing(verticalWall2, true);

    this.walls.add(horizontalWall1);
    this.walls.add(horizontalWall2);
    this.walls.add(verticalWall1);
    this.walls.add(verticalWall2);
  }

  /**
   * Adds dots to the maze
   */
  private addDots(): void {
    const { width, height } = this.game.canvas;
    const dotSize = 5;
    const gridSize = 40;

    for (let x = gridSize; x < width; x += gridSize) {
      for (let y = gridSize; y < height; y += gridSize) {
        if (Phaser.Math.Distance.Between(x, y, width / 2, height / 2) < 60) {
          continue;
        }

        let insideWall = false;
        this.walls
          .getChildren()
          .forEach((wall: Phaser.GameObjects.GameObject) => {
            const wallRect = wall as Phaser.GameObjects.Rectangle;
            if (wallRect.getBounds().contains(x, y)) {
              insideWall = true;
            }
          });

        if (insideWall) {
          continue;
        }

        const dot = this.gameScene.add.circle(x, y, dotSize, 0xffff00);
        this.gameScene.physics.add.existing(dot);
        this.dots.add(dot);
      }
    }

    const maxDots = this.targetScore * 2;
    const dotsArray = this.dots.getChildren();

    if (dotsArray.length > maxDots) {
      while (dotsArray.length > maxDots) {
        const randomIndex = Phaser.Math.Between(0, dotsArray.length - 1);
        dotsArray[randomIndex].destroy();
        dotsArray.splice(randomIndex, 1);
      }
    }
  }

  /**
   * Adds ghosts to the maze
   */
  private addGhosts(): void {
    const { width, height } = this.game.canvas;
    const ghostCount =
      this.difficulty === "easy" ? 1 : this.difficulty === "medium" ? 2 : 3;
    const ghostColors = [0xff0000, 0x00ffff, 0xffb8ff];

    for (let i = 0; i < ghostCount; i++) {
      let x, y;
      do {
        x = Phaser.Math.Between(50, width - 50);
        y = Phaser.Math.Between(50, height - 50);
      } while (
        Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < 100
      );

      const ghost = this.gameScene.physics.add.sprite(x, y, "");
      ghost.setDisplaySize(20, 20);
      ghost.setTint(ghostColors[i % ghostColors.length]);
      ghost.setData(
        "direction",
        ["up", "down", "left", "right"][Phaser.Math.Between(0, 3)]
      );

      this.ghosts.add(ghost);
    }
  }

  /**
   * Handles player movement based on input
   */
  private handlePlayerMovement(): void {
    // Check if keyboard is available
    if (!this.gameScene.input.keyboard) {
      return; // Exit early if keyboard is not available
    }

    // Get cursor keys
    const cursors = this.gameScene.input.keyboard.createCursorKeys();

    // Set next direction based on input
    if (cursors.left && cursors.left.isDown) {
      this.nextDirection = "left";
    } else if (cursors.right && cursors.right.isDown) {
      this.nextDirection = "right";
    } else if (cursors.up && cursors.up.isDown) {
      this.nextDirection = "up";
    } else if (cursors.down && cursors.down.isDown) {
      this.nextDirection = "down";
    }

    // Apply movement
    this.movePlayer();
  }

  /**
   * Moves the player based on current and next direction
   */
  private movePlayer(): void {
    this.player.setVelocity(0);

    let moved = false;

    switch (this.nextDirection) {
      case "left":
        this.player.setVelocityX(-this.playerSpeed);
        moved = true;
        break;
      case "right":
        this.player.setVelocityX(this.playerSpeed);
        moved = true;
        break;
      case "up":
        this.player.setVelocityY(-this.playerSpeed);
        moved = true;
        break;
      case "down":
        this.player.setVelocityY(this.playerSpeed);
        moved = true;
        break;
    }

    if (moved) {
      this.currentDirection = this.nextDirection;
    }
  }

  /**
   * Moves the ghosts
   */
  private moveGhosts(): void {
    this.ghosts
      .getChildren()
      .forEach((ghost: Phaser.GameObjects.GameObject) => {
        const ghostSprite = ghost as Phaser.Physics.Arcade.Sprite;

        let direction = ghostSprite.getData("direction");

        if (Phaser.Math.Between(0, 10) < 3) {
          direction = ["up", "down", "left", "right"][
            Phaser.Math.Between(0, 3)
          ];
        }

        switch (direction) {
          case "left":
            ghostSprite.setVelocityX(-this.ghostSpeed);
            ghostSprite.setVelocityY(0);
            break;
          case "right":
            ghostSprite.setVelocityX(this.ghostSpeed);
            ghostSprite.setVelocityY(0);
            break;
          case "up":
            ghostSprite.setVelocityX(0);
            ghostSprite.setVelocityY(-this.ghostSpeed);
            break;
          case "down":
            ghostSprite.setVelocityX(0);
            ghostSprite.setVelocityY(this.ghostSpeed);
            break;
        }

        ghostSprite.setData("direction", direction);

        if (Phaser.Math.Between(0, 10) < 3) {
          const dx = this.player.x - ghostSprite.x;
          const dy = this.player.y - ghostSprite.y;

          if (Math.abs(dx) > Math.abs(dy)) {
            ghostSprite.setVelocityY(0);
            ghostSprite.setVelocityX(
              dx > 0 ? this.ghostSpeed : -this.ghostSpeed
            );
            ghostSprite.setData("direction", dx > 0 ? "right" : "left");
          } else {
            ghostSprite.setVelocityX(0);
            ghostSprite.setVelocityY(
              dy > 0 ? this.ghostSpeed : -this.ghostSpeed
            );
            ghostSprite.setData("direction", dy > 0 ? "down" : "up");
          }
        }
      });
  }

  /**
   * Handles collision between player and dot
   */
  private collectDot(
    player: Phaser.GameObjects.GameObject,
    dot: Phaser.GameObjects.GameObject
  ): void {
    dot.destroy();

    this.score++;
    if (this.scoreText) {
      this.scoreText.setText(`Dots: ${this.score}/${this.targetScore}`);
    }

    if (this.score >= this.targetScore) {
      this.gameOver = true;
      this.complete(true, this.score);
    }
  }

  /**
   * Handles collision between player and ghost
   */
  private hitGhost(): void {
    if (this.gameOver) return;

    this.gameOver = true;
    this.complete(false, this.score);
  }
}
