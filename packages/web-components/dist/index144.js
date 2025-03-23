import "./index8.js";
import { difficultyToValue as h } from "./index127.js";
import { Container as l } from "./index148.js";
class f {
  /**
   * Create a new BaseGame instance
   *
   * @param app - PIXI Application instance
   * @param config - Game configuration
   */
  constructor(t, i = {}) {
    var e, s, n, o, a, r;
    this.isRunning = !1, this.isInitialized = !1, this.startTime = 0, this.onCompleteCallback = null, this.metrics = {
      mouseMovements: 0,
      keyPresses: 0,
      interactionDuration: 0
    }, this.app = t, this.container = new l(), this.config = {
      width: (e = i.width) !== null && e !== void 0 ? e : 400,
      height: (s = i.height) !== null && s !== void 0 ? s : 300,
      backgroundColor: (n = i.backgroundColor) !== null && n !== void 0 ? n : 1087931,
      difficulty: (o = i.difficulty) !== null && o !== void 0 ? o : "medium",
      assetsPath: (a = i.assetsPath) !== null && a !== void 0 ? a : "",
      onLoad: (r = i.onLoad) !== null && r !== void 0 ? r : () => {
      }
    }, this.difficultyValue = h(this.config.difficulty), this.app.stage.addChild(this.container);
  }
  /**
   * Initialize resources and setup
   */
  init() {
    this.isInitialized || (this.setupInteractionTracking(), this.initialize(), this.isInitialized = !0, this.config.onLoad && this.config.onLoad());
  }
  /**
   * Set up interaction tracking
   *
   * @protected
   */
  setupInteractionTracking() {
    this.app.view.addEventListener("mousemove", () => {
      this.isRunning && this.metrics.mouseMovements++;
    }), window.addEventListener("keydown", (t) => {
      this.isRunning && this.metrics.keyPresses++;
    });
  }
  /**
   * Start the game
   */
  start() {
    this.isInitialized || this.init(), !this.isRunning && (this.startTime = Date.now(), this.isRunning = !0, this.metrics.mouseMovements = 0, this.metrics.keyPresses = 0, this.metrics.interactionDuration = 0);
  }
  /**
   * Pause the game
   */
  pause() {
    this.isRunning = !1;
  }
  /**
   * Resume the game
   */
  resume() {
    this.isRunning || (this.isRunning = !0);
  }
  /**
   * Reset the game state
   */
  reset() {
    this.isRunning = !1, this.startTime = 0, this.metrics.mouseMovements = 0, this.metrics.keyPresses = 0, this.metrics.interactionDuration = 0;
  }
  /**
   * Mount the game to a DOM container
   *
   * @param container - HTML element to mount to
   */
  mount(t) {
  }
  /**
   * Set completion callback
   *
   * @param callback - Function to call when game completes
   */
  setCompletionCallback(t) {
    this.onCompleteCallback = t;
  }
  /**
   * Complete the game and notify with result
   *
   * @param success - Whether the game was completed successfully
   * @param score - Score achieved (0-100)
   * @param gameData - Optional game-specific data
   * @protected
   */
  complete(t, i, e) {
    if (!this.isRunning)
      return;
    this.isRunning = !1;
    const s = Date.now() - this.startTime;
    this.metrics.interactionDuration = s;
    const n = {
      success: t,
      score: i,
      time: s,
      metrics: { ...this.metrics },
      gameData: e
    };
    this.onCompleteCallback && this.onCompleteCallback(n);
  }
  /**
   * Clean up and destroy game
   */
  destroy() {
    this.app.view.removeEventListener("mousemove", () => {
    }), window.removeEventListener("keydown", () => {
    }), this.app.stage.removeChild(this.container), this.container.destroy({ children: !0 }), this.isInitialized = !1, this.isRunning = !1, this.onCompleteCallback = null;
  }
}
export {
  f as BaseGame
};
//# sourceMappingURL=index144.js.map
