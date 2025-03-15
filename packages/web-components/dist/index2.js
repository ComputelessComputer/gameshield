import { css as p, LitElement as m, html as d } from "lit";
import { customElement as g } from "./index4.js";
import { property as h } from "./index5.js";
import { state as a } from "./index6.js";
import "./index7.js";
import { GameFactory as y } from "./index8.js";
import { BehaviorAnalyzer as f } from "./index9.js";
import { SecurityUtils as u } from "./index3.js";
var b = Object.defineProperty, v = Object.getOwnPropertyDescriptor, s = (e, i, n, o) => {
  for (var r = o > 1 ? void 0 : o ? v(i, n) : i, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (r = (o ? c(i, n, r) : c(r)) || r);
  return o && r && b(i, n, r), r;
};
let t = class extends m {
  constructor() {
    super(...arguments), this.apiKey = "", this.gameType = "random", this.difficulty = "medium", this.apiEndpoint = "", this.isVerified = !1, this.token = null, this.gameInstance = null, this.isLoading = !0, this.error = null, this.behaviorAnalyzer = new f(), this.securityUtils = new u(), this.sessionId = this.securityUtils.generateSessionId();
  }
  connectedCallback() {
    super.connectedCallback(), this.behaviorAnalyzer.startTracking(), this.gameType = "random";
  }
  firstUpdated() {
    this.gameContainer = this.renderRoot.querySelector(".game-container"), this.initializeGame();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.destroyGame(), this.behaviorAnalyzer.stopTracking();
  }
  async initializeGame() {
    try {
      if (this.isLoading = !0, !this.gameContainer)
        throw new Error("Game container not found");
      this.gameInstance = y.createGame("random", {
        difficulty: "medium",
        width: this.gameContainer.clientWidth,
        height: this.gameContainer.clientHeight,
        onComplete: this.handleGameComplete.bind(this)
      }), await this.gameInstance.mount(this.gameContainer), this.isLoading = !1;
    } catch (e) {
      this.error = e instanceof Error ? e.message : "Failed to initialize game", this.isLoading = !1, console.error("GameShield initialization error:", e);
    }
  }
  handleGameComplete(e) {
    if (this.isVerified = e.success, e.success) {
      const i = this.behaviorAnalyzer.analyze(), n = {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        gameType: this.gameType,
        behaviorMetrics: i,
        gameResult: {
          success: e.success,
          score: e.score
        }
      };
      this.token = this.securityUtils.generateToken(n), this.dispatchEvent(new CustomEvent("success", {
        detail: { token: this.token },
        bubbles: !0,
        composed: !0
      })), this.apiEndpoint && this.token && this.verifyWithServer(this.token).catch((o) => {
        console.error("Server verification failed:", o);
      });
    } else
      this.dispatchEvent(new CustomEvent("failure", {
        bubbles: !0,
        composed: !0
      }));
  }
  async verifyWithServer(e) {
    const i = await fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey
      },
      body: JSON.stringify({ token: e })
    });
    if (!i.ok)
      throw new Error(`Server verification failed: ${i.statusText}`);
    return await i.json();
  }
  /**
   * Reset the CAPTCHA to its initial state
   */
  reset() {
    this.destroyGame(), this.sessionId = this.securityUtils.generateSessionId(), this.token = null, this.isVerified = !1, this.error = null, this.behaviorAnalyzer.reset(), this.initializeGame();
  }
  destroyGame() {
    this.gameInstance && (this.gameInstance.destroy(), this.gameInstance = null);
  }
  render() {
    return d`
      <div class="game-container"></div>
      
      ${this.isLoading ? d`<div class="loading"><div class="spinner"></div></div>` : ""}
      
      ${this.error ? d`<div class="error">${this.error}</div>` : ""}
      
      ${this.isVerified ? d`<div class="success-badge">✓ Verified</div>` : ""}
    `;
  }
};
t.styles = p`
    :host {
      display: block;
      width: 400px;
      height: 300px;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .game-container {
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
    }
    
    .loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      z-index: 10;
    }
    
    .success-badge {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: #4CAF50;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 5;
    }
    
    .error {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 0, 0, 0.1);
      color: #d32f2f;
      text-align: center;
      padding: 20px;
      z-index: 10;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #3498db;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
s([
  h({ type: String })
], t.prototype, "apiKey", 2);
s([
  h({ type: String, attribute: "game-type" })
], t.prototype, "gameType", 2);
s([
  h({ type: String })
], t.prototype, "difficulty", 2);
s([
  h({ type: String })
], t.prototype, "apiEndpoint", 2);
s([
  a()
], t.prototype, "isVerified", 2);
s([
  a()
], t.prototype, "token", 2);
s([
  a()
], t.prototype, "gameInstance", 2);
s([
  a()
], t.prototype, "isLoading", 2);
s([
  a()
], t.prototype, "error", 2);
t = s([
  g("game-shield")
], t);
export {
  t as GameShield
};
//# sourceMappingURL=index2.js.map
