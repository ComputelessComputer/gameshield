import "./index8.js";
import { BaseGame as t } from "./index144.js";
import { Text as i } from "./index145.js";
class c extends t {
  /**
   * Create a new PongGame instance
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
    }), this.playerPaddle = null, this.aiPaddle = null, this.ball = null, this.ballVelocity = { x: 0, y: 0 }, this.playerScore = 0, this.aiScore = 0, this.playerScoreText = null, this.aiScoreText = null, this.gameConfig = {
      ballSpeed: e.ballSpeed || this.getDifficultyBasedBallSpeed(),
      paddleHeight: e.paddleHeight || this.getDifficultyBasedPaddleHeight(),
      aiDifficulty: e.aiDifficulty || this.getDifficultyBasedAIDifficulty(),
      pointsToWin: e.pointsToWin || this.getDifficultyBasedPointsToWin()
    }, e.onComplete && this.setCompletionCallback(e.onComplete), this.init();
  }
  /**
   * Initialize the pong game
   *
   * @protected
   */
  initialize() {
    const e = new i(`Pong Game

Click to complete demo`, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 16777215,
      align: "center"
    });
    e.anchor.set(0.5), e.x = this.config.width / 2, e.y = this.config.height / 2, this.container.addChild(e), this.container.eventMode = "static", this.container.cursor = "pointer", this.container.on("pointerdown", () => {
      this.complete(!0, 80, { demo: !0 });
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
   * Get ball speed based on difficulty
   *
   * @returns Ball speed multiplier
   * @private
   */
  getDifficultyBasedBallSpeed() {
    switch (this.config.difficulty) {
      case "easy":
        return 4;
      case "medium":
        return 6;
      case "hard":
        return 8;
      default:
        return 6;
    }
  }
  /**
   * Get paddle height based on difficulty
   *
   * @returns Paddle height in pixels
   * @private
   */
  getDifficultyBasedPaddleHeight() {
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
  /**
   * Get AI difficulty based on game difficulty
   *
   * @returns AI difficulty (0-1)
   * @private
   */
  getDifficultyBasedAIDifficulty() {
    switch (this.config.difficulty) {
      case "easy":
        return 0.3;
      case "medium":
        return 0.6;
      case "hard":
        return 0.9;
      default:
        return 0.6;
    }
  }
  /**
   * Get points needed to win based on difficulty
   *
   * @returns Points needed to win
   * @private
   */
  getDifficultyBasedPointsToWin() {
    switch (this.config.difficulty) {
      case "easy":
        return 3;
      case "medium":
        return 5;
      case "hard":
        return 7;
      default:
        return 5;
    }
  }
}
export {
  c as PongGame
};
//# sourceMappingURL=index131.js.map
