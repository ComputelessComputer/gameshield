import "./index8.js";
import { BaseGame as t } from "./index144.js";
import { Text as i } from "./index145.js";
class n extends t {
  /**
   * Create a new DinoRunGame instance
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
    }), this.player = null, this.obstacles = [], this.ground = null, this.playerVelocity = { y: 0 }, this.isJumping = !1, this.distance = 0, this.distanceText = null, this.isGameOver = !1, this.gameConfig = {
      speed: e.speed || this.getDifficultyBasedSpeed(),
      jumpHeight: e.jumpHeight || this.getDifficultyBasedJumpHeight(),
      gravity: e.gravity || this.getDifficultyBasedGravity(),
      targetDistance: e.targetDistance || this.getDifficultyBasedTargetDistance()
    }, e.onComplete && this.setCompletionCallback(e.onComplete), this.init();
  }
  /**
   * Initialize the dino run game
   *
   * @protected
   */
  initialize() {
    const e = new i(`Dino Run Game

Click to complete demo`, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 16777215,
      align: "center"
    });
    e.anchor.set(0.5), e.x = this.config.width / 2, e.y = this.config.height / 2, this.container.addChild(e), this.container.eventMode = "static", this.container.cursor = "pointer", this.container.on("pointerdown", () => {
      this.complete(!0, 90, { demo: !0 });
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
   * Get game speed based on difficulty
   *
   * @returns Game speed multiplier
   * @private
   */
  getDifficultyBasedSpeed() {
    switch (this.config.difficulty) {
      case "easy":
        return 5;
      case "medium":
        return 7;
      case "hard":
        return 10;
      default:
        return 7;
    }
  }
  /**
   * Get jump height based on difficulty
   *
   * @returns Jump height multiplier
   * @private
   */
  getDifficultyBasedJumpHeight() {
    switch (this.config.difficulty) {
      case "easy":
        return 20;
      case "medium":
        return 18;
      case "hard":
        return 15;
      default:
        return 18;
    }
  }
  /**
   * Get gravity based on difficulty
   *
   * @returns Gravity strength
   * @private
   */
  getDifficultyBasedGravity() {
    switch (this.config.difficulty) {
      case "easy":
        return 0.8;
      case "medium":
        return 1;
      case "hard":
        return 1.3;
      default:
        return 1;
    }
  }
  /**
   * Get target distance based on difficulty
   *
   * @returns Distance needed to win
   * @private
   */
  getDifficultyBasedTargetDistance() {
    switch (this.config.difficulty) {
      case "easy":
        return 500;
      case "medium":
        return 1e3;
      case "hard":
        return 1500;
      default:
        return 1e3;
    }
  }
}
export {
  n as DinoRunGame
};
//# sourceMappingURL=index132.js.map
