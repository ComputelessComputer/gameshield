import * as Phaser from "phaser";
import { BaseGame } from "./base-game";
import { Difficulty } from "../types";

/**
 * Tetris game implementation
 * Line Completion Challenge: The player must clear at least one row to verify
 */
export class TetrisGame extends BaseGame {
  private grid!: Phaser.GameObjects.Group;
  private activePiece!: Phaser.GameObjects.Group;
  private nextPiece!: Phaser.GameObjects.Group;
  private scoreText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;

  private gridSize: number = 25;
  private gridWidth: number = 10;
  private gridHeight: number = 16;
  private gridCells: number[][] = [];
  private activePieceShape: number[][] = [];
  private activePiecePosition: { x: number; y: number } = { x: 0, y: 0 };
  private nextPieceShape: number[][] = [];
  private moveTimer: number = 0;
  private moveInterval: number = 500;
  private score: number = 0;
  private linesCleared: number = 0;
  private targetLines: number = 1;
  private gameOver: boolean = false;
  private pieceShapes: number[][][][] = [
    [[[1, 1, 1, 1]], [[1], [1], [1], [1]]],

    [
      [
        [1, 0, 0],
        [1, 1, 1],
      ],
      [
        [1, 1],
        [1, 0],
        [1, 0],
      ],
      [
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1],
        [0, 1],
        [1, 1],
      ],
    ],

    [
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
      [
        [1, 0],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1],
        [0, 1],
        [0, 1],
      ],
    ],

    [
      [
        [1, 1],
        [1, 1],
      ],
    ],

    [
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    ],

    [
      [
        [0, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 0],
      ],
      [
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [0, 1],
      ],
    ],

    [
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    ],
  ];
  private pieceColors: number[] = [
    0x00ffff, 0x0000ff, 0xff7f00, 0xffff00, 0x00ff00, 0x800080, 0xff0000,
  ];
  private currentRotation: number = 0;
  private currentPieceType: number = 0;
  private nextPieceType: number = 0;

  /**
   * Creates the game objects when the scene starts
   */
  public createGame(): void {
    const { width, height } = this.game.canvas;

    this.setDifficulty(this.difficulty);

    this.gridSize = Math.floor(Math.min(width, height) / 20);

    this.initializeGrid();

    this.createGrid();

    this.activePiece = this.gameScene.add.group();

    this.nextPiece = this.gameScene.add.group();

    this.scoreText = this.gameScene.add.text(
      width / 2,
      20,
      "Lines: 0/" + this.targetLines,
      {
        fontSize: "16px",
        color: "#ffffff",
      }
    );
    this.scoreText.setOrigin(0.5);

    this.instructionText = this.gameScene.add.text(
      width / 2,
      50,
      "Arrow keys to move/rotate, tap to control",
      {
        fontSize: "14px",
        color: "#ffffff",
      }
    );
    this.instructionText.setOrigin(0.5);

    // Set up keyboard input if available
    if (this.gameScene.input.keyboard) {
      this.gameScene.input.keyboard.on(
        "keydown-LEFT",
        () => this.movePiece(-1, 0),
        this
      );
      this.gameScene.input.keyboard.on(
        "keydown-RIGHT",
        () => this.movePiece(1, 0),
        this
      );
      this.gameScene.input.keyboard.on(
        "keydown-DOWN",
        () => this.movePiece(0, 1),
        this
      );
      this.gameScene.input.keyboard.on(
        "keydown-UP",
        () => this.rotatePiece(),
        this
      );
    }
    
    // Set up touch/mouse input
    this.gameScene.input.on("pointerdown", this.handlePointerDown, this);

    this.nextPieceType = Phaser.Math.Between(0, this.pieceShapes.length - 1);
    this.nextPieceShape = this.pieceShapes[this.nextPieceType][0];
    this.spawnPiece();
  }

  /**
   * Updates the game state on each frame
   * @param time The current time
   * @param delta Time elapsed since last frame
   */
  public updateGame(time: number, delta: number): void {
    if (this.gameOver) return;

    this.moveTimer += delta;
    if (this.moveTimer >= this.moveInterval) {
      this.moveTimer = 0;
      this.movePiece(0, 1);
    }
  }

  /**
   * Resets the game to its initial state
   */
  public reset(): void {
    this.score = 0;
    this.linesCleared = 0;
    this.gameOver = false;
    this.moveTimer = 0;

    this.initializeGrid();
    this.updateGridDisplay();

    this.activePiece.clear(true, true);
    this.nextPiece.clear(true, true);

    this.nextPieceType = Phaser.Math.Between(0, this.pieceShapes.length - 1);
    this.nextPieceShape = this.pieceShapes[this.nextPieceType][0];
    this.spawnPiece();

    if (this.scoreText) {
      this.scoreText.setText("Lines: 0/" + this.targetLines);
    }
  }

  /**
   * Sets the difficulty level
   * @param difficulty Difficulty level
   */
  private setDifficulty(difficulty: Difficulty): void {
    switch (difficulty) {
      case "easy":
        this.moveInterval = 600;
        this.targetLines = 1;
        break;
      case "medium":
        this.moveInterval = 500;
        this.targetLines = 2;
        break;
      case "hard":
        this.moveInterval = 400;
        this.targetLines = 3;
        break;
    }

    if (this.scoreText) {
      this.scoreText.setText("Lines: 0/" + this.targetLines);
    }
  }

  /**
   * Initializes the grid array
   */
  private initializeGrid(): void {
    this.gridCells = [];
    for (let y = 0; y < this.gridHeight; y++) {
      this.gridCells[y] = [];
      for (let x = 0; x < this.gridWidth; x++) {
        this.gridCells[y][x] = 0;
      }
    }
  }

  /**
   * Creates the visual grid
   */
  private createGrid(): void {
    const { width, height } = this.game.canvas;

    const offsetX = (width - this.gridWidth * this.gridSize) / 2;
    const offsetY = (height - this.gridHeight * this.gridSize) / 2;

    this.grid = this.gameScene.add.group();

    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        const cell = this.gameScene.add.rectangle(
          offsetX + x * this.gridSize + this.gridSize / 2,
          offsetY + y * this.gridSize + this.gridSize / 2,
          this.gridSize - 1,
          this.gridSize - 1,
          0x333333
        );
        this.grid.add(cell);
      }
    }
  }

  /**
   * Updates the grid display based on the grid array
   */
  private updateGridDisplay(): void {
    const { width, height } = this.game.canvas;

    const offsetX = (width - this.gridWidth * this.gridSize) / 2;
    const offsetY = (height - this.gridHeight * this.gridSize) / 2;

    this.grid.clear(true, true);

    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        const cellValue = this.gridCells[y][x];
        const color =
          cellValue === 0 ? 0x333333 : this.pieceColors[cellValue - 1];

        const cell = this.gameScene.add.rectangle(
          offsetX + x * this.gridSize + this.gridSize / 2,
          offsetY + y * this.gridSize + this.gridSize / 2,
          this.gridSize - 1,
          this.gridSize - 1,
          color
        );
        this.grid.add(cell);
      }
    }
  }

  /**
   * Spawns a new piece
   */
  private spawnPiece(): void {
    this.activePiece.clear(true, true);

    this.currentPieceType = this.nextPieceType;
    this.activePieceShape = this.nextPieceShape;
    this.currentRotation = 0;

    this.nextPieceType = Phaser.Math.Between(0, this.pieceShapes.length - 1);
    this.nextPieceShape = this.pieceShapes[this.nextPieceType][0];

    const pieceWidth = this.activePieceShape[0].length;
    this.activePiecePosition = {
      x: Math.floor((this.gridWidth - pieceWidth) / 2),
      y: 0,
    };

    if (!this.canPlacePiece()) {
      this.gameOver = true;
      this.complete(false, this.score);
      return;
    }

    this.drawActivePiece();

    this.drawNextPiece();
  }

  /**
   * Draws the active piece
   */
  private drawActivePiece(): void {
    const { width, height } = this.game.canvas;

    const offsetX = (width - this.gridWidth * this.gridSize) / 2;
    const offsetY = (height - this.gridHeight * this.gridSize) / 2;

    this.activePiece.clear(true, true);

    const color = this.pieceColors[this.currentPieceType];

    for (let y = 0; y < this.activePieceShape.length; y++) {
      for (let x = 0; x < this.activePieceShape[y].length; x++) {
        if (this.activePieceShape[y][x] === 1) {
          const pieceX = this.activePiecePosition.x + x;
          const pieceY = this.activePiecePosition.y + y;

          const block = this.gameScene.add.rectangle(
            offsetX + pieceX * this.gridSize + this.gridSize / 2,
            offsetY + pieceY * this.gridSize + this.gridSize / 2,
            this.gridSize - 1,
            this.gridSize - 1,
            color
          );
          this.activePiece.add(block);
        }
      }
    }
  }

  /**
   * Draws the next piece preview
   */
  private drawNextPiece(): void {
    const { width } = this.game.canvas;

    this.nextPiece.clear(true, true);

    const previewSize = this.gridSize * 0.8;
    const previewX = width - 80;
    const previewY = 100;

    const color = this.pieceColors[this.nextPieceType];

    for (let y = 0; y < this.nextPieceShape.length; y++) {
      for (let x = 0; x < this.nextPieceShape[y].length; x++) {
        if (this.nextPieceShape[y][x] === 1) {
          const block = this.gameScene.add.rectangle(
            previewX + x * previewSize,
            previewY + y * previewSize,
            previewSize - 1,
            previewSize - 1,
            color
          );
          this.nextPiece.add(block);
        }
      }
    }

    const nextLabel = this.gameScene.add.text(previewX, previewY - 30, "Next", {
      fontSize: "14px",
      color: "#ffffff",
    });
    this.nextPiece.add(nextLabel);
  }

  /**
   * Moves the active piece
   * @param dx X direction (-1 left, 1 right)
   * @param dy Y direction (1 down)
   */
  private movePiece(dx: number, dy: number): void {
    if (this.gameOver) return;

    const originalX = this.activePiecePosition.x;
    const originalY = this.activePiecePosition.y;

    this.activePiecePosition.x += dx;
    this.activePiecePosition.y += dy;

    if (!this.canPlacePiece()) {
      this.activePiecePosition.x = originalX;
      this.activePiecePosition.y = originalY;

      if (dy > 0) {
        this.lockPiece();
        return;
      }
    }

    this.drawActivePiece();
  }

  /**
   * Rotates the active piece
   */
  private rotatePiece(): void {
    if (this.gameOver) return;

    const originalShape = this.activePieceShape;
    const originalX = this.activePiecePosition.x;
    const originalY = this.activePiecePosition.y;

    const nextRotation =
      (this.currentRotation + 1) %
      this.pieceShapes[this.currentPieceType].length;
    this.activePieceShape =
      this.pieceShapes[this.currentPieceType][nextRotation];

    if (!this.canPlacePiece()) {
      const kicks = [-1, 1, -2, 2];
      let validKick = false;

      for (const kick of kicks) {
        this.activePiecePosition.x += kick;

        if (this.canPlacePiece()) {
          validKick = true;
          break;
        }

        this.activePiecePosition.x = originalX;
      }

      if (!validKick) {
        this.activePieceShape = originalShape;
        return;
      }
    }

    this.currentRotation = nextRotation;

    this.drawActivePiece();
  }

  /**
   * Checks if the active piece can be placed at its current position
   */
  private canPlacePiece(): boolean {
    for (let y = 0; y < this.activePieceShape.length; y++) {
      for (let x = 0; x < this.activePieceShape[y].length; x++) {
        if (this.activePieceShape[y][x] === 1) {
          const pieceX = this.activePiecePosition.x + x;
          const pieceY = this.activePiecePosition.y + y;

          if (
            pieceX < 0 ||
            pieceX >= this.gridWidth ||
            pieceY < 0 ||
            pieceY >= this.gridHeight
          ) {
            return false;
          }

          if (pieceY >= 0 && this.gridCells[pieceY][pieceX] !== 0) {
            return false;
          }
        }
      }
    }

    return true;
  }

  /**
   * Locks the active piece in place
   */
  private lockPiece(): void {
    for (let y = 0; y < this.activePieceShape.length; y++) {
      for (let x = 0; x < this.activePieceShape[y].length; x++) {
        if (this.activePieceShape[y][x] === 1) {
          const pieceX = this.activePiecePosition.x + x;
          const pieceY = this.activePiecePosition.y + y;

          if (
            pieceY >= 0 &&
            pieceY < this.gridHeight &&
            pieceX >= 0 &&
            pieceX < this.gridWidth
          ) {
            this.gridCells[pieceY][pieceX] = this.currentPieceType + 1;
          }
        }
      }
    }

    this.checkLines();

    this.updateGridDisplay();

    this.spawnPiece();
  }

  /**
   * Checks for completed lines
   */
  private checkLines(): void {
    let linesCleared = 0;

    for (let y = 0; y < this.gridHeight; y++) {
      let lineComplete = true;

      for (let x = 0; x < this.gridWidth; x++) {
        if (this.gridCells[y][x] === 0) {
          lineComplete = false;
          break;
        }
      }

      if (lineComplete) {
        for (let y2 = y; y2 > 0; y2--) {
          for (let x = 0; x < this.gridWidth; x++) {
            this.gridCells[y2][x] = this.gridCells[y2 - 1][x];
          }
        }

        for (let x = 0; x < this.gridWidth; x++) {
          this.gridCells[0][x] = 0;
        }

        linesCleared++;
      }
    }

    if (linesCleared > 0) {
      this.score += linesCleared;
      this.linesCleared += linesCleared;
      this.scoreText.setText(`Lines: ${this.linesCleared}/${this.targetLines}`);

      if (this.linesCleared >= this.targetLines) {
        this.gameOver = true;
        this.complete(true, this.linesCleared);
      }
    }
  }

  /**
   * Handles touch/mouse input
   */
  private handlePointerDown(pointer: Phaser.Input.Pointer): void {
    if (this.gameOver) return;

    const { width } = this.game.canvas;

    const startX = pointer.downX;
    const startY = pointer.downY;
    const endX = pointer.x;
    const endY = pointer.y;

    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) {
      this.rotatePiece();
    } else {
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      if (angle > -45 && angle < 45) {
        this.movePiece(1, 0);
      } else if (angle > 45 && angle < 135) {
        this.movePiece(0, 1);
      } else if (angle > 135 || angle < -135) {
        this.movePiece(-1, 0);
      } else {
        this.rotatePiece();
      }
    }
  }
}
