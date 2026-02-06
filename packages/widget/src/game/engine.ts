import { type Piece, type PieceType, createPiece, rotatePiece, PIECE_SHAPES } from './pieces.js';
import { calculateScore, calculateLevel, getDropInterval, type ScoreState } from './scoring.js';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export interface GameMove {
  piece: PieceType;
  rotation: number;
  x: number;
  y: number;
  timestamp: number;
}

export interface GameState {
  board: (string | null)[][];
  currentPiece: Piece | null;
  nextPiece: Piece;
  score: ScoreState;
  moves: GameMove[];
  isGameOver: boolean;
  isPaused: boolean;
  startTime: number;
}

// Seeded random number generator (must match server)
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }
}

export class TetrisEngine {
  private state: GameState;
  private rng: SeededRandom;
  private pieceTypes: PieceType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  private dropInterval: number = 1000;
  private lastDrop: number = 0;
  private animationFrame: number | null = null;
  private onUpdate: (() => void) | null = null;
  private onGameOver: (() => void) | null = null;

  constructor(seed: number) {
    this.rng = new SeededRandom(seed);
    this.state = this.createInitialState();
  }

  private createInitialState(): GameState {
    const board = Array.from({ length: BOARD_HEIGHT }, () =>
      Array(BOARD_WIDTH).fill(null)
    );

    return {
      board,
      currentPiece: null,
      nextPiece: this.getNextPiece(),
      score: { score: 0, level: 0, lines: 0 },
      moves: [],
      isGameOver: false,
      isPaused: false,
      startTime: 0,
    };
  }

  private getNextPiece(): Piece {
    const type = this.pieceTypes[this.rng.nextInt(this.pieceTypes.length)];
    return createPiece(type);
  }

  getState(): GameState {
    return this.state;
  }

  setUpdateCallback(callback: () => void): void {
    this.onUpdate = callback;
  }

  setGameOverCallback(callback: () => void): void {
    this.onGameOver = callback;
  }

  start(): void {
    this.state.startTime = Date.now();
    this.spawnPiece();
    this.lastDrop = Date.now();
    this.gameLoop();
  }

  pause(): void {
    this.state.isPaused = true;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  resume(): void {
    if (this.state.isPaused && !this.state.isGameOver) {
      this.state.isPaused = false;
      this.lastDrop = Date.now();
      this.gameLoop();
    }
  }

  stop(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private gameLoop = (): void => {
    if (this.state.isPaused || this.state.isGameOver) return;

    const now = Date.now();
    if (now - this.lastDrop >= this.dropInterval) {
      this.moveDown();
      this.lastDrop = now;
    }

    this.onUpdate?.();
    this.animationFrame = requestAnimationFrame(this.gameLoop);
  };

  private spawnPiece(): void {
    this.state.currentPiece = this.state.nextPiece;
    this.state.nextPiece = this.getNextPiece();

    // Check if the new piece can be placed
    if (!this.isValidPosition(this.state.currentPiece)) {
      this.state.isGameOver = true;
      this.onGameOver?.();
    }
  }

  private isValidPosition(piece: Piece, offsetX = 0, offsetY = 0): boolean {
    const shape = piece.shape;
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const newX = piece.x + col + offsetX;
          const newY = piece.y + row + offsetY;

          // Check horizontal bounds
          if (newX < 0 || newX >= BOARD_WIDTH) return false;

          // Check bottom bound
          if (newY >= BOARD_HEIGHT) return false;

          // Check collision with placed pieces (only if visible)
          if (newY >= 0 && this.state.board[newY][newX]) return false;
        }
      }
    }
    return true;
  }

  moveLeft(): boolean {
    if (!this.state.currentPiece || this.state.isPaused) return false;
    if (this.isValidPosition(this.state.currentPiece, -1, 0)) {
      this.state.currentPiece.x--;
      this.onUpdate?.();
      return true;
    }
    return false;
  }

  moveRight(): boolean {
    if (!this.state.currentPiece || this.state.isPaused) return false;
    if (this.isValidPosition(this.state.currentPiece, 1, 0)) {
      this.state.currentPiece.x++;
      this.onUpdate?.();
      return true;
    }
    return false;
  }

  moveDown(): boolean {
    if (!this.state.currentPiece || this.state.isPaused) return false;
    if (this.isValidPosition(this.state.currentPiece, 0, 1)) {
      this.state.currentPiece.y++;
      this.onUpdate?.();
      return true;
    } else {
      this.lockPiece();
      return false;
    }
  }

  hardDrop(): void {
    if (!this.state.currentPiece || this.state.isPaused) return;
    while (this.isValidPosition(this.state.currentPiece, 0, 1)) {
      this.state.currentPiece.y++;
    }
    this.lockPiece();
  }

  rotate(direction: 1 | -1 = 1): boolean {
    if (!this.state.currentPiece || this.state.isPaused) return false;

    const rotated = rotatePiece(this.state.currentPiece, direction);
    const testPiece = { ...this.state.currentPiece, shape: rotated.shape, rotation: rotated.rotation };

    // Try normal rotation
    if (this.isValidPosition(testPiece)) {
      this.state.currentPiece = testPiece;
      this.onUpdate?.();
      return true;
    }

    // Try wall kicks
    const kicks = [-1, 1, -2, 2];
    for (const kick of kicks) {
      if (this.isValidPosition(testPiece, kick, 0)) {
        this.state.currentPiece = { ...testPiece, x: testPiece.x + kick };
        this.onUpdate?.();
        return true;
      }
    }

    return false;
  }

  private lockPiece(): void {
    if (!this.state.currentPiece) return;

    const piece = this.state.currentPiece;
    const shape = piece.shape;

    // Record the move
    this.state.moves.push({
      piece: piece.type,
      rotation: piece.rotation,
      x: piece.x,
      y: piece.y,
      timestamp: Date.now() - this.state.startTime,
    });

    // Place the piece on the board
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const boardY = piece.y + row;
          if (boardY >= 0) {
            this.state.board[boardY][piece.x + col] = piece.color;
          }
        }
      }
    }

    // Clear completed lines
    const linesCleared = this.clearLines();

    // Update score
    if (linesCleared > 0) {
      const points = calculateScore(linesCleared, this.state.score.level);
      this.state.score.score += points;
      this.state.score.lines += linesCleared;
      this.state.score.level = calculateLevel(this.state.score.lines);
      this.dropInterval = getDropInterval(this.state.score.level);
    }

    // Spawn next piece
    this.spawnPiece();
    this.onUpdate?.();
  }

  private clearLines(): number {
    let linesCleared = 0;

    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
      if (this.state.board[row].every((cell) => cell !== null)) {
        this.state.board.splice(row, 1);
        this.state.board.unshift(Array(BOARD_WIDTH).fill(null));
        linesCleared++;
        row++; // Check same row again
      }
    }

    return linesCleared;
  }

  getSolveTime(): number {
    return Date.now() - this.state.startTime;
  }
}
