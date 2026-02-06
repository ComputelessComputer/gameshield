import type { GameMove, PieceType } from '@gameshield/shared';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// Tetromino shapes (rotation states)
const PIECES: Record<PieceType, number[][][]> = {
  I: [
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
    [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
    [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
  ],
  O: [
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
    [[1, 1], [1, 1]],
  ],
  T: [
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
  ],
  S: [
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
    [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
  ],
  Z: [
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    [[0, 1, 0], [1, 1, 0], [1, 0, 0]],
  ],
  J: [
    [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
  ],
  L: [
    [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
    [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
  ],
};

// Seeded random number generator
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

interface VerificationResult {
  valid: boolean;
  linesCleared: number;
  score: number;
  error?: string;
}

export function verifyGameplay(
  seed: number,
  moves: GameMove[],
  reportedLines: number,
  reportedScore: number
): VerificationResult {
  const rng = new SeededRandom(seed);
  const board: number[][] = Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(0)
  );

  const pieceTypes: PieceType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  let totalLinesCleared = 0;
  let score = 0;

  // Generate the expected piece sequence
  const expectedPieces: PieceType[] = [];
  for (let i = 0; i < moves.length + 10; i++) {
    expectedPieces.push(pieceTypes[rng.nextInt(pieceTypes.length)]);
  }

  // Validate each move
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];

    // Check piece matches expected sequence
    if (move.piece !== expectedPieces[i]) {
      return {
        valid: false,
        linesCleared: 0,
        score: 0,
        error: `Invalid piece at move ${i}: expected ${expectedPieces[i]}, got ${move.piece}`,
      };
    }

    // Validate rotation
    if (move.rotation < 0 || move.rotation > 3) {
      return {
        valid: false,
        linesCleared: 0,
        score: 0,
        error: `Invalid rotation at move ${i}`,
      };
    }

    const shape = PIECES[move.piece][move.rotation];

    // Check if placement is valid
    if (!isValidPlacement(board, shape, move.x, move.y)) {
      return {
        valid: false,
        linesCleared: 0,
        score: 0,
        error: `Invalid placement at move ${i}`,
      };
    }

    // Place the piece
    placePiece(board, shape, move.x, move.y);

    // Clear lines
    const cleared = clearLines(board);
    totalLinesCleared += cleared;
    score += calculateScore(cleared);
  }

  // Allow some tolerance for timing-based score differences
  const scoreTolerance = Math.abs(score - reportedScore) <= score * 0.1;

  if (totalLinesCleared !== reportedLines) {
    return {
      valid: false,
      linesCleared: totalLinesCleared,
      score,
      error: `Lines mismatch: expected ${totalLinesCleared}, reported ${reportedLines}`,
    };
  }

  if (!scoreTolerance && moves.length > 0) {
    return {
      valid: false,
      linesCleared: totalLinesCleared,
      score,
      error: `Score mismatch: calculated ${score}, reported ${reportedScore}`,
    };
  }

  return {
    valid: true,
    linesCleared: totalLinesCleared,
    score,
  };
}

function isValidPlacement(
  board: number[][],
  shape: number[][],
  x: number,
  y: number
): boolean {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const boardX = x + col;
        const boardY = y + row;

        // Check bounds
        if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
          return false;
        }

        // Check collision (allow negative Y for pieces at top)
        if (boardY >= 0 && board[boardY][boardX]) {
          return false;
        }
      }
    }
  }
  return true;
}

function placePiece(board: number[][], shape: number[][], x: number, y: number): void {
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const boardY = y + row;
        if (boardY >= 0) {
          board[boardY][x + col] = 1;
        }
      }
    }
  }
}

function clearLines(board: number[][]): number {
  let cleared = 0;
  for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
    if (board[row].every((cell) => cell === 1)) {
      board.splice(row, 1);
      board.unshift(Array(BOARD_WIDTH).fill(0));
      cleared++;
      row++; // Check same row again
    }
  }
  return cleared;
}

function calculateScore(linesCleared: number): number {
  const scores = [0, 100, 300, 500, 800];
  return scores[linesCleared] || 0;
}
