import "./index14.js";
import "./index15.js";
import "./index16.js";
import "./index17.js";
import "./index18.js";
import { Application as c } from "./index19.js";
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
import { Graphics as m } from "./index111.js";
import "./index112.js";
import "./index113.js";
import "./index114.js";
import "./index115.js";
import "./index116.js";
import "./index117.js";
import "./index118.js";
import "./index119.js";
import "./index120.js";
import { Text as n } from "./index121.js";
import "./index122.js";
import "./index123.js";
import "./index124.js";
import "./index125.js";
import "./index126.js";
import "./index127.js";
import "./index128.js";
class ki {
  constructor(t) {
    switch (this.app = null, this.paddle = null, this.ball = null, this.bricks = [], this.scoreText = null, this.instructionText = null, this.ballVelocity = { x: 0, y: 0 }, this.score = 0, this.targetScore = 5, this.gameStarted = !1, this.gameEnded = !1, this.options = t, t.difficulty) {
      case "easy":
        this.targetScore = 5;
        break;
      case "medium":
        this.targetScore = 10;
        break;
      case "hard":
        this.targetScore = 15;
        break;
    }
  }
  /**
   * Mount the game to a container element
   */
  async mount(t) {
    this.app = new c({
      width: this.options.width,
      height: this.options.height,
      backgroundColor: 1710618,
      resolution: window.devicePixelRatio || 1,
      antialias: !0
    }), t.appendChild(this.app.view), this.createGameElements(), window.addEventListener("keydown", this.handleKeyDown.bind(this)), window.addEventListener("mousemove", this.handleMouseMove.bind(this)), this.app.ticker.add(this.gameLoop.bind(this));
  }
  /**
   * Destroy the game and clean up resources
   */
  destroy() {
    this.app && (window.removeEventListener("keydown", this.handleKeyDown.bind(this)), window.removeEventListener("mousemove", this.handleMouseMove.bind(this)), this.app.destroy(!0, { children: !0, texture: !0, baseTexture: !0 }), this.app = null), this.paddle = null, this.ball = null, this.bricks = [], this.scoreText = null, this.instructionText = null, this.gameStarted = !1, this.gameEnded = !1, this.score = 0;
  }
  /**
   * Create game elements
   */
  createGameElements() {
    this.app && (this.paddle = new m(), this.paddle.beginFill(16777215), this.paddle.drawRect(0, 0, 100, 10), this.paddle.endFill(), this.paddle.x = this.app.screen.width / 2 - 50, this.paddle.y = this.app.screen.height - 20, this.app.stage.addChild(this.paddle), this.ball = new m(), this.ball.beginFill(16777215), this.ball.drawCircle(0, 0, 8), this.ball.endFill(), this.ball.x = this.app.screen.width / 2, this.ball.y = this.app.screen.height - 40, this.app.stage.addChild(this.ball), this.createBricks(), this.scoreText = new n(`Score: ${this.score}/${this.targetScore}`, {
      fontFamily: "Arial",
      fontSize: 16,
      fill: 16777215
    }), this.scoreText.x = 10, this.scoreText.y = 10, this.app.stage.addChild(this.scoreText), this.instructionText = new n("Press SPACE to start", {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 16777215
    }), this.instructionText.x = this.app.screen.width / 2 - this.instructionText.width / 2, this.instructionText.y = this.app.screen.height / 2, this.app.stage.addChild(this.instructionText));
  }
  /**
   * Create brick layout
   */
  createBricks() {
    if (!this.app)
      return;
    const t = 50, e = 20, i = 5, o = 4, h = Math.floor(this.app.screen.width / (t + i)), l = (this.app.screen.width - (h * (t + i) - i)) / 2, p = 50, r = [16711680, 16744192, 16776960, 65280, 255, 4915330, 9699539];
    for (let a = 0; a < o; a++)
      for (let d = 0; d < h; d++) {
        const s = new m();
        s.beginFill(r[a % r.length]), s.drawRect(0, 0, t, e), s.endFill(), s.x = l + d * (t + i), s.y = p + a * (e + i), this.app.stage.addChild(s), this.bricks.push({
          graphics: s,
          health: 1
        });
      }
  }
  /**
   * Reset ball position and velocity
   */
  resetBall() {
    if (!this.app || !this.ball || !this.paddle)
      return;
    this.ball.x = this.paddle.x + this.paddle.width / 2, this.ball.y = this.paddle.y - 10;
    const t = Math.random() * Math.PI / 2 + Math.PI / 4, e = 5;
    this.ballVelocity = {
      x: Math.cos(t) * e,
      y: -Math.sin(t) * e
    };
  }
  /**
   * Handle keyboard input
   */
  handleKeyDown(t) {
    t.code === "Space" && !this.gameStarted && !this.gameEnded && this.startGame();
  }
  /**
   * Handle mouse movement for paddle control
   */
  handleMouseMove(t) {
    if (!this.app || !this.paddle)
      return;
    const e = this.app.view.getBoundingClientRect(), i = t.clientX - e.left;
    this.paddle.x = Math.max(0, Math.min(this.app.screen.width - this.paddle.width, i - this.paddle.width / 2));
  }
  /**
   * Start the game
   */
  startGame() {
    !this.app || !this.instructionText || (this.gameStarted = !0, this.resetBall(), this.app.stage.removeChild(this.instructionText), this.instructionText = null);
  }
  /**
   * End the game
   */
  endGame(t) {
    if (!this.app || this.gameEnded)
      return;
    this.gameEnded = !0;
    const e = new n(
      t ? "CAPTCHA Passed!" : "CAPTCHA Failed!",
      {
        fontFamily: "Arial",
        fontSize: 24,
        fill: t ? 65280 : 16711680,
        fontWeight: "bold"
      }
    );
    e.x = this.app.screen.width / 2 - e.width / 2, e.y = this.app.screen.height / 2 - e.height / 2, this.app.stage.addChild(e), setTimeout(() => {
      this.options.onComplete({
        success: t,
        score: this.score
      });
    }, 1500);
  }
  /**
   * Game loop
   */
  gameLoop(t) {
    if (!(!this.app || !this.ball || !this.paddle || !this.scoreText) && !(!this.gameStarted || this.gameEnded)) {
      if (this.ball.x += this.ballVelocity.x * t, this.ball.y += this.ballVelocity.y * t, (this.ball.x <= 0 || this.ball.x >= this.app.screen.width) && (this.ballVelocity.x *= -1), this.ball.y <= 0 && (this.ballVelocity.y *= -1), this.ball.y >= this.app.screen.height) {
        this.endGame(!1);
        return;
      }
      if (this.ball.y >= this.paddle.y - this.ball.height / 2 && this.ball.y <= this.paddle.y + this.paddle.height && this.ball.x >= this.paddle.x && this.ball.x <= this.paddle.x + this.paddle.width) {
        this.ballVelocity.y *= -1, this.ball.y = this.paddle.y - this.ball.height / 2;
        const e = (this.ball.x - this.paddle.x) / this.paddle.width;
        this.ballVelocity.x = (e - 0.5) * 10;
      }
      for (let e = 0; e < this.bricks.length; e++) {
        const i = this.bricks[e];
        if (this.ball.x >= i.graphics.x - this.ball.width / 2 && this.ball.x <= i.graphics.x + i.graphics.width + this.ball.width / 2 && this.ball.y >= i.graphics.y - this.ball.height / 2 && this.ball.y <= i.graphics.y + i.graphics.height + this.ball.height / 2) {
          const o = this.ball.x - (i.graphics.x - this.ball.width / 2), h = i.graphics.x + i.graphics.width + this.ball.width / 2 - this.ball.x, l = this.ball.y - (i.graphics.y - this.ball.height / 2), p = i.graphics.y + i.graphics.height + this.ball.height / 2 - this.ball.y, r = Math.min(o, h, l, p);
          if (r === o || r === h ? this.ballVelocity.x *= -1 : this.ballVelocity.y *= -1, i.health--, i.health <= 0 && (this.app.stage.removeChild(i.graphics), this.bricks.splice(e, 1), e--, this.score++, this.scoreText.text = `Score: ${this.score}/${this.targetScore}`, this.score >= this.targetScore || this.bricks.length === 0)) {
            this.endGame(!0);
            return;
          }
          break;
        }
      }
    }
  }
}
export {
  ki as BreakoutGame
};
//# sourceMappingURL=index12.js.map
