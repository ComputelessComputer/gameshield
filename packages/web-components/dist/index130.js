import "./index8.js";
import { BaseGame as i } from "./index144.js";
import { Text as r } from "./index145.js";
class c extends i {
  /**
   * Create a new SnakeGame instance
   *
   * @param options - Game creation options
   */
  constructor(e) {
    var t;
    super(e.app, {
      width: e.width,
      height: e.height,
      difficulty: e.difficulty,
      backgroundColor: e.backgroundColor,
      assetsPath: e.assetsPath,
      onLoad: e.onLoad
    }), this.snake = [], this.direction = { x: 1, y: 0 }, this.nextDirection = { x: 1, y: 0 }, this.food = { x: 0, y: 0 }, this.graphics = null, this.cellSize = 0, this.score = 0, this.scoreText = null, this.lastUpdateTime = 0, this.gameConfig = {
      gridSize: e.gridSize || this.getDifficultyBasedGridSize(),
      startLength: e.startLength || this.getDifficultyBasedStartLength(),
      speed: e.speed || this.getDifficultyBasedSpeed(),
      wrapAround: (t = e.wrapAround) !== null && t !== void 0 ? t : this.getDifficultyBasedWrapAround()
    }, this.cellSize = Math.min(this.config.width / this.gameConfig.gridSize, this.config.height / this.gameConfig.gridSize), e.onComplete && this.setCompletionCallback(e.onComplete), this.init();
  }
  /**
   * Initialize the snake game
   *
   * @protected
   */
  initialize() {
    const e = new r(`Snake Game

Click to complete demo`, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 16777215,
      align: "center"
    });
    e.anchor.set(0.5), e.x = this.config.width / 2, e.y = this.config.height / 2, this.container.addChild(e), this.container.eventMode = "static", this.container.cursor = "pointer", this.container.on("pointerdown", () => {
      this.complete(!0, 75, { demo: !0 });
    }), this.app.ticker.add(this.update.bind(this));
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
   * Get grid size based on difficulty
   *
   * @returns Grid size (number of cells)
   * @private
   */
  getDifficultyBasedGridSize() {
    switch (this.config.difficulty) {
      case "easy":
        return 15;
      case "medium":
        return 20;
      case "hard":
        return 25;
      default:
        return 20;
    }
  }
  /**
   * Get starting snake length based on difficulty
   *
   * @returns Starting length of snake
   * @private
   */
  getDifficultyBasedStartLength() {
    switch (this.config.difficulty) {
      case "easy":
        return 5;
      case "medium":
        return 4;
      case "hard":
        return 3;
      default:
        return 4;
    }
  }
  /**
   * Get snake speed based on difficulty
   *
   * @returns Speed in cells per second
   * @private
   */
  getDifficultyBasedSpeed() {
    switch (this.config.difficulty) {
      case "easy":
        return 5;
      case "medium":
        return 8;
      case "hard":
        return 12;
      default:
        return 8;
    }
  }
  /**
   * Get whether wrap around is enabled based on difficulty
   *
   * @returns Whether wrap around is enabled
   * @private
   */
  getDifficultyBasedWrapAround() {
    switch (this.config.difficulty) {
      case "easy":
        return !0;
      case "medium":
        return !0;
      case "hard":
        return !1;
      default:
        return !0;
    }
  }
}
export {
  c as SnakeGame
};
//# sourceMappingURL=index130.js.map
