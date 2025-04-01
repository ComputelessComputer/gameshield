import * as Phaser from "phaser";
import { BaseGame } from "./base-game";
import { Difficulty } from "../types";

/**
 * Asteroids game implementation
 * Survival Challenge: The player controls a spaceship and must destroy asteroids to verify
 */
export class AsteroidsGame extends BaseGame {
  private ship!: Phaser.Physics.Arcade.Sprite;
  private asteroids!: Phaser.GameObjects.Group;
  private bullets!: Phaser.GameObjects.Group;
  private scoreText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;

  private score: number = 0;
  private targetScore: number = 3;
  private shipSpeed: number = 200;
  private rotationSpeed: number = 180;
  private bulletSpeed: number = 400;
  private asteroidSpeed: number = 100;
  private nextFire: number = 0;
  private fireRate: number = 300;
  private gameOver: boolean = false;

  /**
   * Creates the game objects when the scene starts
   */
  public createGame(): void {
    const { width, height } = this.game.canvas;

    this.setDifficulty(this.difficulty);

    this.ship = this.gameScene.physics.add.sprite(width / 2, height / 2, "");
    this.ship.setDisplaySize(30, 30);
    this.ship.setDamping(true);
    this.ship.setDrag(0.99);
    this.ship.setMaxVelocity(this.shipSpeed);
    this.ship.setCollideWorldBounds(true);

    this.bullets = this.gameScene.add.group({
      defaultKey: "",
      maxSize: 20,
    });

    this.asteroids = this.gameScene.add.group();

    this.gameScene.physics.add.overlap(
      this.bullets,
      this.asteroids,
      this
        .bulletHitAsteroid as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.gameScene.physics.add.overlap(
      this.ship,
      this.asteroids,
      this.shipHitAsteroid as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    this.scoreText = this.gameScene.add.text(
      width / 2,
      20,
      "Asteroids: 0/" + this.targetScore,
      {
        fontSize: "16px",
        color: "#ffffff",
      }
    );
    this.scoreText.setOrigin(0.5);

    this.instructionText = this.gameScene.add.text(
      width / 2,
      50,
      "Arrow keys to move, SPACE to fire",
      {
        fontSize: "14px",
        color: "#ffffff",
      }
    );
    this.instructionText.setOrigin(0.5);

    this.gameScene.input.on("pointerdown", this.fireBullet, this);

    if (this.gameScene.input.keyboard) {
      this.gameScene.input.keyboard.on("keydown-SPACE", this.fireBullet, this);
    }

    this.spawnAsteroids();
  }

  /**
   * Updates the game state on each frame
   * @param time The current time
   * @param delta Time elapsed since last frame
   */
  public updateGame(time: number, delta: number): void {
    if (this.gameOver) return;

    this.handleShipMovement();

    this.bullets
      .getChildren()
      .forEach((bullet: Phaser.GameObjects.GameObject) => {
        const bulletSprite = bullet as Phaser.Physics.Arcade.Sprite;

        if (
          bulletSprite.x < 0 ||
          bulletSprite.x > this.game.canvas.width ||
          bulletSprite.y < 0 ||
          bulletSprite.y > this.game.canvas.height
        ) {
          this.bullets.killAndHide(bullet);
        }
      });

    this.asteroids
      .getChildren()
      .forEach((asteroid: Phaser.GameObjects.GameObject) => {
        if (asteroid instanceof Phaser.Physics.Arcade.Sprite) {
          this.wrapObject(asteroid as Phaser.Physics.Arcade.Sprite);
        }
      });

    this.wrapObject(this.ship);
  }

  /**
   * Resets the game to its initial state
   */
  public reset(): void {
    this.score = 0;
    this.gameOver = false;

    const { width, height } = this.game.canvas;
    this.ship.setPosition(width / 2, height / 2);
    this.ship.setVelocity(0, 0);
    this.ship.setRotation(0);

    this.bullets.clear(true, true);
    this.asteroids.clear(true, true);

    this.spawnAsteroids();

    if (this.scoreText) {
      this.scoreText.setText("Asteroids: 0/" + this.targetScore);
    }
  }

  /**
   * Sets the difficulty level
   * @param difficulty Difficulty level
   */
  private setDifficulty(difficulty: Difficulty): void {
    switch (difficulty) {
      case "easy":
        this.shipSpeed = 200;
        this.asteroidSpeed = 50;
        this.targetScore = 2;
        break;
      case "medium":
        this.shipSpeed = 200;
        this.asteroidSpeed = 100;
        this.targetScore = 3;
        break;
      case "hard":
        this.shipSpeed = 200;
        this.asteroidSpeed = 150;
        this.targetScore = 5;
        break;
    }

    if (this.scoreText) {
      this.scoreText.setText("Asteroids: 0/" + this.targetScore);
    }
  }

  /**
   * Spawns asteroids around the screen
   */
  private spawnAsteroids(): void {
    const { width, height } = this.game.canvas;
    const numAsteroids =
      this.difficulty === "easy" ? 3 : this.difficulty === "medium" ? 5 : 7;

    for (let i = 0; i < numAsteroids; i++) {
      let x, y;
      do {
        x = Phaser.Math.Between(50, width - 50);
        y = Phaser.Math.Between(50, height - 50);
      } while (
        Phaser.Math.Distance.Between(x, y, this.ship.x, this.ship.y) < 100
      );

      const size = Phaser.Math.Between(30, 60);
      const asteroid = this.gameScene.physics.add.sprite(x, y, "");
      asteroid.setDisplaySize(size, size);
      asteroid.setCircle(size / 2);

      const angle = Phaser.Math.Between(0, 360) * (Math.PI / 180);
      const speed = Phaser.Math.Between(
        this.asteroidSpeed * 0.5,
        this.asteroidSpeed * 1.5
      );
      asteroid.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

      this.asteroids.add(asteroid);
    }
  }

  /**
   * Handles ship movement based on input
   */
  private handleShipMovement(): void {
    // Check if keyboard is available
    if (!this.gameScene.input.keyboard) {
      return; // Exit early if keyboard is not available
    }
    
    // Get cursor keys
    const cursors = this.gameScene.input.keyboard.createCursorKeys();
    
    // Rotate ship
    if (cursors.left && cursors.left.isDown) {
      this.ship.setAngularVelocity(-this.rotationSpeed);
    } else if (cursors.right && cursors.right.isDown) {
      this.ship.setAngularVelocity(this.rotationSpeed);
    } else {
      this.ship.setAngularVelocity(0);
    }
    
    // Move ship
    if (cursors.up && cursors.up.isDown) {
      // Calculate velocity based on ship's rotation
      const angle = this.ship.rotation;
      
      // Check if ship body exists
      if (this.ship.body) {
        this.gameScene.physics.velocityFromRotation(
          angle, 
          this.shipSpeed, 
          this.ship.body.velocity
        );
      }
    }
  }

  /**
   * Fires a bullet from the ship
   */
  private fireBullet(): void {
    if (this.gameOver) return;

    const time = this.gameScene.time.now;

    if (time > this.nextFire) {
      const bullet = this.bullets.get(this.ship.x, this.ship.y);

      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.setDisplaySize(5, 5);

        const angle = this.ship.rotation;
        const bulletSprite = bullet as Phaser.Physics.Arcade.Sprite;
        
        // Check if bullet body exists
        if (bulletSprite.body) {
          this.gameScene.physics.velocityFromRotation(
            angle, 
            this.bulletSpeed, 
            bulletSprite.body.velocity
          );
        }
        
        this.nextFire = time + this.fireRate;
      }
    }
  }

  /**
   * Handles collision between a bullet and an asteroid
   */
  private bulletHitAsteroid(
    bullet: Phaser.GameObjects.GameObject,
    asteroid: Phaser.GameObjects.GameObject
  ): void {
    this.bullets.killAndHide(bullet);
    bullet.setActive(false);

    asteroid.destroy();

    this.score++;
    if (this.scoreText) {
      this.scoreText.setText(`Asteroids: ${this.score}/${this.targetScore}`);
    }

    if (this.score >= this.targetScore) {
      this.gameOver = true;
      this.complete(true, this.score);
    }

    if (this.asteroids.countActive() === 0) {
      if (this.score < this.targetScore) {
        this.spawnAsteroids();
      }
    }
  }

  /**
   * Handles collision between the ship and an asteroid
   */
  private shipHitAsteroid(): void {
    if (this.gameOver) return;

    this.gameOver = true;
    this.complete(false, this.score);
  }

  /**
   * Wraps an object around the screen edges
   */
  private wrapObject(object: Phaser.Physics.Arcade.Sprite): void {
    const { width, height } = this.game.canvas;

    if (object.x < 0) {
      object.x = width;
    } else if (object.x > width) {
      object.x = 0;
    }

    if (object.y < 0) {
      object.y = height;
    } else if (object.y > height) {
      object.y = 0;
    }
  }
}
