import "./index14.js";
import "./index15.js";
import "./index16.js";
import "./index17.js";
import "./index18.js";
import { Application as a } from "./index19.js";
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
import { Text as h } from "./index121.js";
import "./index122.js";
import "./index123.js";
import "./index124.js";
import "./index125.js";
import "./index126.js";
import "./index127.js";
import "./index128.js";
class ui {
  constructor(i) {
    switch (this.app = null, this.snake = [], this.food = null, this.scoreText = null, this.instructionText = null, this.direction = { x: 0, y: 0 }, this.nextDirection = { x: 0, y: 0 }, this.gridSize = 20, this.score = 0, this.targetScore = 5, this.gameStarted = !1, this.gameEnded = !1, this.gameLoopCounter = 0, this.gameSpeed = 10, this.options = i, i.difficulty) {
      case "easy":
        this.targetScore = 3, this.gameSpeed = 12;
        break;
      case "medium":
        this.targetScore = 5, this.gameSpeed = 10;
        break;
      case "hard":
        this.targetScore = 8, this.gameSpeed = 7;
        break;
    }
  }
  /**
   * Mount the game to a container element
   */
  async mount(i) {
    this.app = new a({
      width: this.options.width,
      height: this.options.height,
      backgroundColor: 1710618,
      resolution: window.devicePixelRatio || 1,
      antialias: !0
    }), i.appendChild(this.app.view), this.createGameElements(), window.addEventListener("keydown", this.handleKeyDown.bind(this)), this.app.ticker.add(this.gameLoop.bind(this));
  }
  /**
   * Destroy the game and clean up resources
   */
  destroy() {
    this.app && (window.removeEventListener("keydown", this.handleKeyDown.bind(this)), this.app.destroy(!0, { children: !0, texture: !0, baseTexture: !0 }), this.app = null), this.snake = [], this.food = null, this.scoreText = null, this.instructionText = null, this.gameStarted = !1, this.gameEnded = !1, this.score = 0, this.direction = { x: 0, y: 0 }, this.nextDirection = { x: 0, y: 0 };
  }
  /**
   * Create game elements
   */
  createGameElements() {
    if (!this.app)
      return;
    const i = Math.floor(this.app.screen.width / this.gridSize / 2) * this.gridSize, r = Math.floor(this.app.screen.height / this.gridSize / 2) * this.gridSize;
    for (let t = 0; t < 3; t++) {
      const e = new s();
      e.beginFill(65280), e.drawRect(0, 0, this.gridSize - 2, this.gridSize - 2), e.endFill(), e.x = i - t * this.gridSize, e.y = r, this.snake.push(e), this.app.stage.addChild(e);
    }
    this.food = new s(), this.food.beginFill(16711680), this.food.drawRect(0, 0, this.gridSize - 2, this.gridSize - 2), this.food.endFill(), this.placeFood(), this.app.stage.addChild(this.food), this.scoreText = new h(`Score: ${this.score}/${this.targetScore}`, {
      fontFamily: "Arial",
      fontSize: 16,
      fill: 16777215
    }), this.scoreText.x = 10, this.scoreText.y = 10, this.app.stage.addChild(this.scoreText), this.instructionText = new h("Use arrow keys to start", {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 16777215
    }), this.instructionText.x = this.app.screen.width / 2 - this.instructionText.width / 2, this.instructionText.y = this.app.screen.height / 2 - 50, this.app.stage.addChild(this.instructionText);
  }
  /**
   * Place food at a random position
   */
  placeFood() {
    if (!this.app || !this.food)
      return;
    const i = Math.floor(this.app.screen.width / this.gridSize), r = Math.floor(this.app.screen.height / this.gridSize);
    let t, e, o = !1;
    for (; !o; ) {
      t = Math.floor(Math.random() * i) * this.gridSize, e = Math.floor(Math.random() * r) * this.gridSize, o = !0;
      for (const p of this.snake)
        if (p.x === t && p.y === e) {
          o = !1;
          break;
        }
    }
    this.food.x = t, this.food.y = e;
  }
  /**
   * Handle keyboard input
   */
  handleKeyDown(i) {
    switch (!this.gameStarted && !this.gameEnded && (i.code === "ArrowUp" || i.code === "ArrowDown" || i.code === "ArrowLeft" || i.code === "ArrowRight") && this.startGame(), i.code) {
      case "ArrowUp":
        this.direction.y === 0 && (this.nextDirection = { x: 0, y: -1 });
        break;
      case "ArrowDown":
        this.direction.y === 0 && (this.nextDirection = { x: 0, y: 1 });
        break;
      case "ArrowLeft":
        this.direction.x === 0 && (this.nextDirection = { x: -1, y: 0 });
        break;
      case "ArrowRight":
        this.direction.x === 0 && (this.nextDirection = { x: 1, y: 0 });
        break;
    }
  }
  /**
   * Start the game
   */
  startGame() {
    !this.app || !this.instructionText || (this.gameStarted = !0, this.direction = { x: 1, y: 0 }, this.nextDirection = { x: 1, y: 0 }, this.app.stage.removeChild(this.instructionText), this.instructionText = null);
  }
  /**
   * End the game
   */
  endGame(i) {
    if (!this.app || this.gameEnded)
      return;
    this.gameEnded = !0;
    const r = new h(
      i ? "CAPTCHA Passed!" : "CAPTCHA Failed!",
      {
        fontFamily: "Arial",
        fontSize: 24,
        fill: i ? 65280 : 16711680,
        fontWeight: "bold"
      }
    );
    r.x = this.app.screen.width / 2 - r.width / 2, r.y = this.app.screen.height / 2 - r.height / 2, this.app.stage.addChild(r), setTimeout(() => {
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
    if (!this.app || !this.food || !this.scoreText || !this.gameStarted || this.gameEnded || (this.gameLoopCounter += i, this.gameLoopCounter < this.gameSpeed))
      return;
    this.gameLoopCounter = 0, this.direction = { ...this.nextDirection };
    const r = this.snake[0], t = new s();
    if (t.beginFill(65280), t.drawRect(0, 0, this.gridSize - 2, this.gridSize - 2), t.endFill(), t.x = r.x + this.direction.x * this.gridSize, t.y = r.y + this.direction.y * this.gridSize, t.x < 0 || t.x >= this.app.screen.width || t.y < 0 || t.y >= this.app.screen.height) {
      this.endGame(!1);
      return;
    }
    for (const e of this.snake)
      if (t.x === e.x && t.y === e.y) {
        this.endGame(!1);
        return;
      }
    if (t.x === this.food.x && t.y === this.food.y) {
      if (this.score += 1, this.scoreText.text = `Score: ${this.score}/${this.targetScore}`, this.placeFood(), this.score >= this.targetScore) {
        this.endGame(!0);
        return;
      }
    } else {
      const e = this.snake.pop();
      e && this.app.stage.removeChild(e);
    }
    this.snake.unshift(t), this.app.stage.addChild(t);
  }
}
export {
  ui as SnakeGame
};
//# sourceMappingURL=index11.js.map
