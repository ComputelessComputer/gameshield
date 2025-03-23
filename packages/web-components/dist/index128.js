import "./index8.js";
import { BaseGame as d } from "./index144.js";
import { getAssetUrl as u, randomInt as m } from "./index127.js";
import { Text as c } from "./index145.js";
import { Assets as g } from "./index146.js";
import { Sprite as r } from "./index147.js";
import { Container as w } from "./index148.js";
import { Graphics as a } from "./index149.js";
import { RenderTexture as p } from "./index150.js";
class D extends d {
  /**
   * Create a new PuzzleGame instance
   *
   * @param options - Game creation options
   */
  constructor(e) {
    super(e.app, {
      width: e.width,
      height: e.height,
      difficulty: e.difficulty,
      backgroundColor: e.backgroundColor,
      assetsPath: e.assetsPath,
      onLoad: e.onLoad
    }), this.pieces = [], this.emptyCell = { row: 0, col: 0 }, this.image = null, this.isSolved = !1, this.moveCount = 0, this.solvedPositions = [], this.pieceMetadata = /* @__PURE__ */ new Map(), this.puzzleConfig = {
      rows: e.rows || this.getDifficultyBasedRows(),
      columns: e.columns || this.getDifficultyBasedColumns(),
      imageUrl: e.imageUrl || this.getDefaultImageUrl(),
      shuffleMoves: e.shuffleMoves || this.getDifficultyBasedShuffleMoves()
    }, this.rows = this.puzzleConfig.rows, this.columns = this.puzzleConfig.columns, e.onComplete && this.setCompletionCallback(e.onComplete), this.init();
  }
  /**
   * Initialize the puzzle game
   *
   * @protected
   */
  initialize() {
    const e = new c("Loading puzzle...", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 16777215
    });
    e.anchor.set(0.5), e.x = this.config.width / 2, e.y = this.config.height / 2, this.container.addChild(e), g.load(this.puzzleConfig.imageUrl).then((t) => {
      this.container.removeChild(e), this.image = new r(t), this.image.width = this.config.width, this.image.height = this.config.height, this.createPuzzlePieces(), this.shufflePuzzle(), this.app.ticker.add(this.update.bind(this));
    }).catch((t) => {
      console.error("Failed to load puzzle image:", t), e.text = "Failed to load puzzle image!", e.style.fill = 16711680;
    });
  }
  /**
   * Create puzzle pieces from the loaded image
   *
   * @private
   */
  createPuzzlePieces() {
    if (!this.image)
      return;
    const e = this.config.width / this.columns, t = this.config.height / this.rows;
    this.solvedPositions = [];
    const i = new w();
    this.container.addChild(i);
    for (let o = 0; o < this.rows; o++)
      for (let n = 0; n < this.columns; n++) {
        if (o === this.rows - 1 && n === this.columns - 1) {
          this.emptyCell = { row: o, col: n };
          continue;
        }
        const s = this.createPiece(o, n, e, t);
        i.addChild(s), this.pieces.push(s), this.solvedPositions.push({
          x: n * e,
          y: o * t
        });
      }
  }
  /**
   * Create a single puzzle piece
   *
   * @param row - Row position
   * @param col - Column position
   * @param width - Piece width
   * @param height - Piece height
   * @returns Puzzle piece sprite
   * @private
   */
  createPiece(e, t, i, o) {
    if (!this.image)
      throw new Error("Image not loaded");
    const n = this.createPieceTexture(e, t, i, o), s = new r(n);
    return s.x = t * i, s.y = e * o, s.width = i, s.height = o, s.eventMode = "static", s.cursor = "pointer", s.on("pointerdown", () => this.handlePieceClick(s)), this.pieceMetadata.set(s, { row: e, col: t, originalIndex: e * this.columns + t }), s;
  }
  /**
   * Create a texture for a puzzle piece from the main image
   *
   * @param row - Row position
   * @param col - Column position
   * @param width - Piece width
   * @param height - Piece height
   * @returns Texture for the piece
   * @private
   */
  createPieceTexture(e, t, i, o) {
    if (!this.image)
      throw new Error("Image not loaded");
    const n = new a();
    n.beginFill(this.getRandomColor()), n.drawRect(0, 0, i, o), n.endFill();
    const s = new c(`${e},${t}`, {
      fontSize: 16,
      fill: 16777215
    });
    s.anchor.set(0.5), s.position.set(i / 2, o / 2), n.addChild(s);
    const h = p.create({
      width: i,
      height: o
    });
    return this.app.renderer.render(n, { renderTexture: h }), h;
  }
  /**
   * Get a random color for puzzle pieces
   *
   * @private
   */
  getRandomColor() {
    const e = [3447003, 3066993, 15158332, 15844367, 10181046, 1752220, 13849600];
    return e[Math.floor(Math.random() * e.length)];
  }
  /**
   * Shuffle the puzzle by making random valid moves
   *
   * @private
   */
  shufflePuzzle() {
    const e = this.puzzleConfig.shuffleMoves;
    for (let t = 0; t < e; t++) {
      const i = this.getEmptyCellNeighbors();
      if (i.length > 0) {
        const o = Math.floor(Math.random() * i.length);
        this.swapWithEmptyCell(i[o]);
      }
    }
  }
  /**
   * Get pieces adjacent to the empty cell
   *
   * @returns Array of neighboring pieces
   * @private
   */
  getEmptyCellNeighbors() {
    const e = [], { row: t, col: i } = this.emptyCell, o = [
      { row: -1, col: 0 },
      // up
      { row: 1, col: 0 },
      // down
      { row: 0, col: -1 },
      // left
      { row: 0, col: 1 }
      // right
    ];
    for (const n of o) {
      const s = t + n.row, h = i + n.col;
      if (s >= 0 && s < this.rows && h >= 0 && h < this.columns) {
        const l = this.findPieceAt(s, h);
        l && e.push(l);
      }
    }
    return e;
  }
  /**
   * Find a puzzle piece at a specific row and column
   *
   * @param row - Row position
   * @param col - Column position
   * @returns Puzzle piece at the position, or null if not found
   * @private
   */
  findPieceAt(e, t) {
    const i = this.config.width / this.columns, o = this.config.height / this.rows, n = t * i, s = e * o;
    for (const h of this.pieces) {
      const l = Math.abs(h.x - n) < 5, f = Math.abs(h.y - s) < 5;
      if (l && f)
        return h;
    }
    return null;
  }
  /**
   * Handle a click on a puzzle piece
   *
   * @param piece - Clicked puzzle piece
   * @private
   */
  handlePieceClick(e) {
    if (!this.isRunning || this.isSolved)
      return;
    this.getEmptyCellNeighbors().includes(e) && (this.swapWithEmptyCell(e), this.moveCount++, this.checkPuzzleSolved() && (this.isSolved = !0, this.handlePuzzleSolved()));
  }
  /**
   * Swap a piece with the empty cell
   *
   * @param piece - Piece to swap
   * @private
   */
  swapWithEmptyCell(e) {
    const t = this.pieceMetadata.get(e);
    if (!t)
      return;
    e.x, e.y;
    const i = this.emptyCell.col * (this.config.width / this.columns), o = this.emptyCell.row * (this.config.height / this.rows);
    e.x = i, e.y = o;
    const n = t.row, s = t.col;
    t.row = this.emptyCell.row, t.col = this.emptyCell.col, this.pieceMetadata.set(e, t), this.emptyCell.row = n, this.emptyCell.col = s;
  }
  /**
   * Check if the puzzle is correctly solved
   *
   * @returns True if puzzle is solved
   * @private
   */
  checkPuzzleSolved() {
    for (const e of this.pieces) {
      const t = this.pieceMetadata.get(e);
      if (t && !(t.row === this.rows - 1 && t.col === this.columns - 1) && t.row * this.columns + t.col !== t.originalIndex)
        return !1;
    }
    return !0;
  }
  /**
   * Handle the puzzle being solved
   *
   * @private
   */
  handlePuzzleSolved() {
    const e = Math.max(0, 1 - (Date.now() - this.startTime) / 6e4), t = Math.max(0, 1 - this.moveCount / (this.rows * this.columns * 3)), i = Math.round((e * 0.7 + t * 0.3) * 100);
    this.showSuccessMessage(), this.complete(!0, i, {
      moves: this.moveCount,
      time: Date.now() - this.startTime,
      grid: `${this.rows}x${this.columns}`
    });
  }
  /**
   * Show success message when puzzle is completed
   *
   * @private
   */
  showSuccessMessage() {
    const e = new a();
    e.beginFill(0, 0.7), e.drawRect(0, 0, this.config.width, this.config.height), e.endFill(), this.container.addChild(e);
    const t = new c("Puzzle Completed!", {
      fontFamily: "Arial",
      fontSize: 32,
      fill: 16777215,
      align: "center"
    });
    t.anchor.set(0.5), t.x = this.config.width / 2, t.y = this.config.height / 2, this.container.addChild(t);
    const i = new c(`Moves: ${this.moveCount}
Time: ${((Date.now() - this.startTime) / 1e3).toFixed(1)}s`, {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 16777215,
      align: "center"
    });
    i.anchor.set(0.5), i.x = this.config.width / 2, i.y = this.config.height / 2 + 60, this.container.addChild(i);
  }
  /**
   * Update game state on each frame
   *
   * @param ticker - PIXI ticker
   * @protected
   */
  update(e) {
    e.deltaTime, this.isRunning && !this.isSolved && this.checkPuzzleSolved() && this.handlePuzzleSolved();
  }
  /**
   * Get rows based on difficulty
   *
   * @returns Number of rows
   * @private
   */
  getDifficultyBasedRows() {
    switch (this.config.difficulty) {
      case "easy":
        return 3;
      case "medium":
        return 4;
      case "hard":
        return 5;
      default:
        return 4;
    }
  }
  /**
   * Get columns based on difficulty
   *
   * @returns Number of columns
   * @private
   */
  getDifficultyBasedColumns() {
    switch (this.config.difficulty) {
      case "easy":
        return 3;
      case "medium":
        return 4;
      case "hard":
        return 5;
      default:
        return 4;
    }
  }
  /**
   * Get number of shuffle moves based on difficulty
   *
   * @returns Number of shuffle moves
   * @private
   */
  getDifficultyBasedShuffleMoves() {
    const e = this.rows * this.columns * 2;
    switch (this.config.difficulty) {
      case "easy":
        return e;
      case "medium":
        return e * 2;
      case "hard":
        return e * 3;
      default:
        return e * 2;
    }
  }
  /**
   * Get default image URL based on available assets
   *
   * @returns URL to the default puzzle image
   * @private
   */
  getDefaultImageUrl() {
    const e = [
      "puzzle1",
      "puzzle2",
      "puzzle3",
      "puzzle4"
    ], t = e[m(0, e.length - 1)];
    return u(t, "jpg", this.config.assetsPath);
  }
}
export {
  D as PuzzleGame
};
//# sourceMappingURL=index128.js.map
