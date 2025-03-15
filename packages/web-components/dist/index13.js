import "./index14.js";
import "./index15.js";
import "./index16.js";
import "./index17.js";
import "./index18.js";
import { Application as r } from "./index19.js";
import "./index20.js";
import "./index21.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import "./index54.js";
import "./index55.js";
import "./index56.js";
import "./index57.js";
import "./index58.js";
import "./index59.js";
import "./index60.js";
import "./index61.js";
import "./index62.js";
import "./index63.js";
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import "./index82.js";
import "./index83.js";
import "./index84.js";
import "./index85.js";
import "./index86.js";
import "./index87.js";
import "./index88.js";
import "./index89.js";
import "./index90.js";
import "./index91.js";
import "./index92.js";
import "./index93.js";
import "./index94.js";
import "./index95.js";
import "./index96.js";
import "./index97.js";
import "./index98.js";
import "./index99.js";
import "./index100.js";
import "./index101.js";
import "./index102.js";
import "./index103.js";
import "./index104.js";
import "./index105.js";
import "./index106.js";
import "./index107.js";
import "./index108.js";
import "./index109.js";
import "./index110.js";
import { Graphics as s } from "./index111.js";
import "./index112.js";
import "./index113.js";
import "./index114.js";
import "./index115.js";
import "./index116.js";
import "./index117.js";
import "./index118.js";
import "./index119.js";
import "./index120.js";
import { Text as o } from "./index121.js";
import "./index122.js";
import "./index123.js";
import "./index124.js";
import "./index125.js";
import "./index126.js";
import "./index127.js";
import "./index128.js";
class gi {
  constructor(i) {
    switch (this.app = null, this.dino = null, this.ground = null, this.obstacles = [], this.scoreText = null, this.instructionText = null, this.dinoY = 0, this.dinoVelocity = 0, this.isJumping = !1, this.score = 0, this.targetScore = 10, this.gameStarted = !1, this.gameEnded = !1, this.obstacleTimer = 0, this.gravity = 0.5, this.gameSpeed = 5, this.options = i, i.difficulty) {
      case "easy":
        this.targetScore = 5, this.gameSpeed = 4;
        break;
      case "medium":
        this.targetScore = 10, this.gameSpeed = 5;
        break;
      case "hard":
        this.targetScore = 15, this.gameSpeed = 6;
        break;
    }
  }
  /**
   * Mount the game to a container element
   */
  async mount(i) {
    this.app = new r({
      width: this.options.width,
      height: this.options.height,
      backgroundColor: 1710618,
      resolution: window.devicePixelRatio || 1,
      antialias: !0
    }), i.appendChild(this.app.view), this.createGameElements(), window.addEventListener("keydown", this.handleKeyDown.bind(this)), window.addEventListener("mousedown", this.handleMouseDown.bind(this)), window.addEventListener("touchstart", this.handleTouchStart.bind(this)), this.app.ticker.add(this.gameLoop.bind(this));
  }
  /**
   * Destroy the game and clean up resources
   */
  destroy() {
    this.app && (window.removeEventListener("keydown", this.handleKeyDown.bind(this)), window.removeEventListener("mousedown", this.handleMouseDown.bind(this)), window.removeEventListener("touchstart", this.handleTouchStart.bind(this)), this.app.destroy(!0, { children: !0, texture: !0, baseTexture: !0 }), this.app = null), this.dino = null, this.ground = null, this.obstacles = [], this.scoreText = null, this.instructionText = null, this.gameStarted = !1, this.gameEnded = !1, this.score = 0;
  }
  /**
   * Create game elements
   */
  createGameElements() {
    this.app && (this.ground = new s(), this.ground.beginFill(3355443), this.ground.drawRect(0, 0, this.app.screen.width, 2), this.ground.endFill(), this.ground.y = this.app.screen.height - 50, this.app.stage.addChild(this.ground), this.dino = new s(), this.dino.beginFill(65280), this.dino.drawRect(0, 0, 30, 50), this.dino.endFill(), this.dino.x = 50, this.dino.y = this.ground.y - this.dino.height, this.dinoY = this.dino.y, this.app.stage.addChild(this.dino), this.scoreText = new o(`Score: ${this.score}/${this.targetScore}`, {
      fontFamily: "Arial",
      fontSize: 16,
      fill: 16777215
    }), this.scoreText.x = 10, this.scoreText.y = 10, this.app.stage.addChild(this.scoreText), this.instructionText = new o("Press SPACE, click, or tap to jump", {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 16777215
    }), this.instructionText.x = this.app.screen.width / 2 - this.instructionText.width / 2, this.instructionText.y = this.app.screen.height / 2 - 50, this.app.stage.addChild(this.instructionText));
  }
  /**
   * Create a new obstacle
   */
  createObstacle() {
    if (!this.app || !this.ground)
      return;
    const i = Math.random() * 20 + 20, e = 20, t = new s();
    t.beginFill(16711680), t.drawRect(0, 0, e, i), t.endFill(), t.x = this.app.screen.width, t.y = this.ground.y - i, this.app.stage.addChild(t), this.obstacles.push({
      graphics: t,
      x: t.x,
      width: e,
      height: i
    });
  }
  /**
   * Handle keyboard input
   */
  handleKeyDown(i) {
    i.code === "Space" && (!this.gameStarted && !this.gameEnded ? this.startGame() : this.gameStarted && !this.isJumping && this.jump());
  }
  /**
   * Handle mouse input
   */
  handleMouseDown() {
    !this.gameStarted && !this.gameEnded ? this.startGame() : this.gameStarted && !this.isJumping && this.jump();
  }
  /**
   * Handle touch input
   */
  handleTouchStart() {
    !this.gameStarted && !this.gameEnded ? this.startGame() : this.gameStarted && !this.isJumping && this.jump();
  }
  /**
   * Make the dino jump
   */
  jump() {
    !this.dino || this.isJumping || (this.isJumping = !0, this.dinoVelocity = -12);
  }
  /**
   * Start the game
   */
  startGame() {
    !this.app || !this.instructionText || (this.gameStarted = !0, this.app.stage.removeChild(this.instructionText), this.instructionText = null);
  }
  /**
   * End the game
   */
  endGame(i) {
    if (!this.app || this.gameEnded)
      return;
    this.gameEnded = !0;
    const e = new o(
      i ? "CAPTCHA Passed!" : "CAPTCHA Failed!",
      {
        fontFamily: "Arial",
        fontSize: 24,
        fill: i ? 65280 : 16711680,
        fontWeight: "bold"
      }
    );
    e.x = this.app.screen.width / 2 - e.width / 2, e.y = this.app.screen.height / 2 - e.height / 2, this.app.stage.addChild(e), setTimeout(() => {
      this.options.onComplete({
        success: i,
        score: this.score
      });
    }, 1500);
  }
  /**
   * Game loop
   */
  gameLoop(i) {
    if (!(!this.app || !this.dino || !this.ground || !this.scoreText) && !(!this.gameStarted || this.gameEnded)) {
      this.dinoVelocity += this.gravity, this.dinoY += this.dinoVelocity, this.dinoY >= this.ground.y - this.dino.height && (this.dinoY = this.ground.y - this.dino.height, this.dinoVelocity = 0, this.isJumping = !1), this.dino.y = this.dinoY, this.obstacleTimer += i, this.obstacleTimer > 60 && (this.obstacleTimer = 0, Math.random() < 0.3 && this.createObstacle());
      for (let e = 0; e < this.obstacles.length; e++) {
        const t = this.obstacles[e];
        if (t.x -= this.gameSpeed * i, t.graphics.x = t.x, this.dino.x < t.x + t.width && this.dino.x + this.dino.width > t.x && this.dino.y < t.graphics.y + t.height && this.dino.y + this.dino.height > t.graphics.y) {
          this.endGame(!1);
          return;
        }
        if (t.x + t.width < 0 && (this.app.stage.removeChild(t.graphics), this.obstacles.splice(e, 1), e--, this.score++, this.scoreText.text = `Score: ${this.score}/${this.targetScore}`, this.gameSpeed += 0.05, this.score >= this.targetScore)) {
          this.endGame(!0);
          return;
        }
      }
    }
  }
}
export {
  gi as DinoRunGame
};
//# sourceMappingURL=index13.js.map
