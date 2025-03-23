import "./index8.js";
import { BaseGame as t } from "./index144.js";
import { Text as i } from "./index145.js";
class d extends t {
  /**
   * Create a new BreakoutGame instance
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
    }), this.paddle = null, this.ball = null, this.ballVelocity = { x: 0, y: 0 }, this.bricks = [], this.lives = 3, this.score = 0, this.scoreText = null, this.bricksBroken = 0, this.gameConfig = {
      rows: e.rows || this.getDifficultyBasedRows(),
      columns: e.columns || this.getDifficultyBasedColumns(),
      ballSpeed: e.ballSpeed || this.getDifficultyBasedBallSpeed(),
      paddleWidth: e.paddleWidth || this.getDifficultyBasedPaddleWidth()
    }, e.onComplete && this.setCompletionCallback(e.onComplete), this.init();
  }
  /**
   * Initialize the breakout game
   *
   * @protected
   */
  initialize() {
    const e = new i(`Breakout Game

Click to complete demo`, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 16777215,
      align: "center"
    });
    e.anchor.set(0.5), e.x = this.config.width / 2, e.y = this.config.height / 2, this.container.addChild(e), this.container.eventMode = "static", this.container.cursor = "pointer", this.container.on("pointerdown", () => {
      this.complete(!0, 85, { demo: !0 });
    }), this.app.ticker.add(this.update, this);
  }
  /**
   * Update game state on each frame
   *
   * @param ticker - PIXI ticker
   * @protected
   */
  update(e) {
    e.deltaTime;
  }
  /**
   * Get rows based on difficulty
   *
   * @returns Number of brick rows
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
   * @returns Number of brick columns
   * @private
   */
  getDifficultyBasedColumns() {
    switch (this.config.difficulty) {
      case "easy":
        return 6;
      case "medium":
        return 8;
      case "hard":
        return 10;
      default:
        return 8;
    }
  }
  /**
   * Get ball speed based on difficulty
   *
   * @returns Ball speed multiplier
   * @private
   */
  getDifficultyBasedBallSpeed() {
    switch (this.config.difficulty) {
      case "easy":
        return 3;
      case "medium":
        return 4;
      case "hard":
        return 5.5;
      default:
        return 4;
    }
  }
  /**
   * Get paddle width based on difficulty
   *
   * @returns Paddle width in pixels
   * @private
   */
  getDifficultyBasedPaddleWidth() {
    switch (this.config.difficulty) {
      case "easy":
        return 100;
      case "medium":
        return 80;
      case "hard":
        return 60;
      default:
        return 80;
    }
  }
}
export {
  d as BreakoutGame
};
//# sourceMappingURL=index129.js.map
