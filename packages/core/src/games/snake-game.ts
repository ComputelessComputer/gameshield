import * as Phaser from "phaser";
import { BaseGame } from "./base-game";
import { Difficulty } from "../types";

/**
 * Snake game implementation
 * Pattern Completion Challenge: The player must collect food in a specific order
 */
export class SnakeGame extends BaseGame {
  private snake!: Phaser.GameObjects.Group;
  private food!: Phaser.Physics.Arcade.Sprite;
  private obstacles!: Phaser.GameObjects.Group;
  private instructionText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;

  private snakeHead!: Phaser.Physics.Arcade.Sprite;
  private snakeParts: Phaser.Physics.Arcade.Sprite[] = [];
  private lastMoveTime: number = 0;
  private moveInterval: number = 150;
  private gridSize: number = 20;
  private direction: { x: number; y: number } = { x: 1, y: 0 };
  private nextDirection: { x: number; y: number } = { x: 1, y: 0 };
  private score: number = 0;
  private targetScore: number = 3;
  private foodType: string = "apple";
  private gameOver: boolean = false;

  /**
   * Creates the game objects when the scene starts
   */
  public createGame(): void {
    const { width, height } = this.game.canvas;

    this.setDifficulty(this.difficulty);

    this.gridSize = Math.floor(Math.min(width, height) / 20);

    this.snake = this.gameScene.add.group();
    this.createSnake();

    this.obstacles = this.gameScene.add.group();
    this.createObstacles();

    this.food = this.gameScene.physics.add.sprite(0, 0, "");
    this.food.setDisplaySize(this.gridSize, this.gridSize);
    this.placeFood();

    this.gameScene.physics.add.overlap(
      this.snakeHead,
      this.food,
      this.eatFood as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.gameScene.physics.add.overlap(
      this.snakeHead,
      this.obstacles,
      this.hitObstacle as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.instructionText = this.gameScene.add.text(
      width / 2,
      30,
      `Eat ${this.targetScore} apples`,
      {
        fontSize: "16px",
        color: "#ffffff",
      }
    );
    this.instructionText.setOrigin(0.5);

    this.scoreText = this.gameScene.add.text(width / 2, 60, "Score: 0", {
      fontSize: "16px",
      color: "#ffffff",
    });
    this.scoreText.setOrigin(0.5);

    // Set up keyboard input if available
    if (this.gameScene.input.keyboard) {
      this.gameScene.input.keyboard.on("keydown", this.handleKeyDown, this);
    }

    // Set up touch/mouse input
    this.gameScene.input.on("pointerdown", this.handlePointerDown, this);
  }

  /**
   * Updates the game state on each frame
   * @param time The current time
   * @param delta Time elapsed since last frame
   */
  public updateGame(time: number, delta: number): void {
    if (this.gameOver) return;

    // Debug log to check if updateGame is being called
    if (time % 1000 < 20) {
      console.log("Snake game updating, direction:", this.direction);
    }

    if (time > this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.moveSnake();
    }

    // Make sure direction is updated from nextDirection
    this.direction = { ...this.nextDirection };
  }

  /**
   * Resets the game to its initial state
   */
  public reset(): void {
    this.snake.clear(true, true);
    this.obstacles.clear(true, true);
    this.snakeParts = [];

    this.score = 0;
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.gameOver = false;

    this.createSnake();
    this.createObstacles();
    this.placeFood();

    if (this.scoreText) {
      this.scoreText.setText("Score: 0");
    }
  }

  /**
   * Sets the difficulty level
   * @param difficulty Difficulty level
   */
  private setDifficulty(difficulty: Difficulty): void {
    switch (difficulty) {
      case "easy":
        this.moveInterval = 200;
        this.targetScore = 2;
        break;
      case "medium":
        this.moveInterval = 150;
        this.targetScore = 3;
        break;
      case "hard":
        this.moveInterval = 100;
        this.targetScore = 5;
        break;
    }

    if (this.instructionText) {
      this.instructionText.setText(`Eat ${this.targetScore} apples`);
    }
  }

  /**
   * Creates the initial snake
   */
  private createSnake(): void {
    const { width, height } = this.game.canvas;
    const startX = Math.floor(width / 2 / this.gridSize) * this.gridSize;
    const startY = Math.floor(height / 2 / this.gridSize) * this.gridSize;

    this.snakeHead = this.gameScene.physics.add.sprite(startX, startY, "");
    this.snakeHead.setDisplaySize(this.gridSize, this.gridSize);
    this.snakeHead.setOrigin(0);
    // Make snake head white
    this.snakeHead.setTint(0xffffff);
    this.snake.add(this.snakeHead);

    for (let i = 1; i <= 2; i++) {
      const part = this.gameScene.physics.add.sprite(
        startX - i * this.gridSize,
        startY,
        ""
      );
      part.setDisplaySize(this.gridSize, this.gridSize);
      part.setOrigin(0);
      // Make snake body parts white
      part.setTint(0xffffff);
      this.snake.add(part);
      this.snakeParts.push(part);
    }
  }

  /**
   * Creates obstacles
   */
  private createObstacles(): void {
    const { width, height } = this.game.canvas;
    const numObstacles =
      this.difficulty === "easy" ? 3 : this.difficulty === "medium" ? 5 : 8;

    for (let i = 0; i < numObstacles; i++) {
      // Initialize with default values to avoid TypeScript errors
      let x = 0;
      let y = 0;
      let validPosition = false;

      while (!validPosition) {
        x =
          Phaser.Math.Between(0, Math.floor(width / this.gridSize) - 1) *
          this.gridSize;
        y =
          Phaser.Math.Between(0, Math.floor(height / this.gridSize) - 1) *
          this.gridSize;

        validPosition = true;

        if (
          (x === this.snakeHead.x && y === this.snakeHead.y) ||
          (Math.abs(x - this.snakeHead.x) < this.gridSize * 3 &&
            Math.abs(y - this.snakeHead.y) < this.gridSize * 3)
        ) {
          validPosition = false;
          continue;
        }

        for (const part of this.snakeParts) {
          if (x === part.x && y === part.y) {
            validPosition = false;
            break;
          }
        }
      }

      const obstacle = this.gameScene.physics.add.sprite(x, y, "");
      obstacle.setDisplaySize(this.gridSize, this.gridSize);
      obstacle.setOrigin(0);
      // Make obstacles dark gray instead of purple for better visibility
      obstacle.setTint(0x666666);
      this.obstacles.add(obstacle);
    }
  }

  /**
   * Places food at a random position
   */
  private placeFood(): void {
    const { width, height } = this.game.canvas;

    // Always set to green apple
    this.food.setTint(0x00ff00);
    
    // Remove outline code
    if (this.food.getData('outline')) {
      this.food.getData('outline').destroy();
      this.food.setData('outline', null);
    }

    let validPosition = false;
    // Initialize with default values
    let x = 0;
    let y = 0;
    
    // Add a maximum attempt counter to prevent infinite loops
    let attempts = 0;
    const maxAttempts = 100;

    while (!validPosition && attempts < maxAttempts) {
      attempts++;
      
      x = Phaser.Math.Between(0, Math.floor(width / this.gridSize) - 1) * this.gridSize;
      y = Phaser.Math.Between(0, Math.floor(height / this.gridSize) - 1) * this.gridSize;

      validPosition = true;

      // Check collision with snake head
      if (x === this.snakeHead.x && y === this.snakeHead.y) {
        validPosition = false;
        continue;
      }

      // Check collision with snake parts
      let collisionWithParts = false;
      for (const part of this.snakeParts) {
        if (x === part.x && y === part.y) {
          collisionWithParts = true;
          break;
        }
      }
      
      if (collisionWithParts) {
        validPosition = false;
        continue;
      }

      // Check collision with obstacles
      let collisionWithObstacle = false;
      this.obstacles.getChildren().forEach((obstacle: any) => {
        if (x === obstacle.x && y === obstacle.y) {
          collisionWithObstacle = true;
        }
      });
      
      if (collisionWithObstacle) {
        validPosition = false;
        continue;
      }
    }
    
    // If we couldn't find a valid position after max attempts, just place it somewhere
    // This ensures food always appears even in crowded scenarios
    if (!validPosition) {
      console.warn("Could not find valid food position after max attempts");
      // Place food in the top-left corner as a fallback
      x = this.gridSize;
      y = this.gridSize;
    }

    this.food.setPosition(x, y);
    this.food.setOrigin(0);
  }

  /**
   * Moves the snake
   */
  private moveSnake(): void {
    const headX = this.snakeHead.x + this.direction.x * this.gridSize;
    const headY = this.snakeHead.y + this.direction.y * this.gridSize;

    const { width, height } = this.game.canvas;
    if (headX < 0 || headX >= width || headY < 0 || headY >= height) {
      this.gameOver = true;
      this.complete(false, this.score);
      return;
    }

    for (const part of this.snakeParts) {
      if (headX === part.x && headY === part.y) {
        this.gameOver = true;
        this.complete(false, this.score);
        return;
      }
    }

    for (let i = this.snakeParts.length - 1; i > 0; i--) {
      this.snakeParts[i].setPosition(
        this.snakeParts[i - 1].x,
        this.snakeParts[i - 1].y
      );
    }

    if (this.snakeParts.length > 0) {
      this.snakeParts[0].setPosition(this.snakeHead.x, this.snakeHead.y);
    }

    this.snakeHead.setPosition(headX, headY);
  }

  /**
   * Handles collision with food
   */
  private eatFood(
    head: Phaser.GameObjects.GameObject,
    food: Phaser.GameObjects.GameObject
  ): void {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.score >= this.targetScore) {
      this.complete(true, this.score);
      return;
    }

    const lastPart = this.snakeParts[this.snakeParts.length - 1] || this.snakeHead;
    const newPart = this.gameScene.physics.add.sprite(
      lastPart.x,
      lastPart.y,
      ""
    );
    newPart.setDisplaySize(this.gridSize, this.gridSize);
    newPart.setOrigin(0);
    // Make new snake parts white
    newPart.setTint(0xffffff);
    this.snake.add(newPart);
    this.snakeParts.push(newPart);

    this.placeFood();
  }

  /**
   * Handles collision with obstacles
   */
  private hitObstacle(): void {
    this.gameOver = true;
    this.complete(false, this.score);
  }

  /**
   * Handles keyboard input
   */
  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowUp":
        if (this.direction.y !== 1) {
          this.nextDirection = { x: 0, y: -1 };
        }
        break;
      case "ArrowDown":
        if (this.direction.y !== -1) {
          this.nextDirection = { x: 0, y: 1 };
        }
        break;
      case "ArrowLeft":
        if (this.direction.x !== 1) {
          this.nextDirection = { x: -1, y: 0 };
        }
        break;
      case "ArrowRight":
        if (this.direction.x !== -1) {
          this.nextDirection = { x: 1, y: 0 };
        }
        break;
    }
  }

  /**
   * Handles touch/mouse input
   */
  private handlePointerDown(pointer: Phaser.Input.Pointer): void {
    const dx = pointer.x - this.snakeHead.x;
    const dy = pointer.y - this.snakeHead.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && this.direction.x !== -1) {
        this.nextDirection = { x: 1, y: 0 };
      } else if (dx < 0 && this.direction.x !== 1) {
        this.nextDirection = { x: -1, y: 0 };
      }
    } else {
      if (dy > 0 && this.direction.y !== -1) {
        this.nextDirection = { x: 0, y: 1 };
      } else if (dy < 0 && this.direction.y !== 1) {
        this.nextDirection = { x: 0, y: -1 };
      }
    }
  }
}
