import { css as c, LitElement as m, html as d } from "lit";
import { customElement as g } from "./index4.js";
import { property as a } from "./index5.js";
import { state as h } from "./index6.js";
import "./index7.js";
import { GameFactory as y } from "./index8.js";
import { BehaviorAnalyzer as u } from "./index9.js";
import { SecurityUtils as f } from "./index3.js";
var b = Object.defineProperty, v = Object.getOwnPropertyDescriptor, i = (t, s, n, o) => {
  for (var r = o > 1 ? void 0 : o ? v(s, n) : s, p = t.length - 1, l; p >= 0; p--)
    (l = t[p]) && (r = (o ? l(s, n, r) : l(r)) || r);
  return o && r && b(s, n, r), r;
};
let e = class extends m {
  constructor() {
    super(...arguments), this.apiKey = "", this.gameType = "random", this.difficulty = "medium", this.apiEndpoint = "", this.width = "400px", this.height = "400px", this.isVerified = !1, this.token = null, this.gameInstance = null, this.isLoading = !0, this.error = null, this.behaviorAnalyzer = new u(), this.securityUtils = new f(), this.sessionId = this.securityUtils.generateSessionId();
  }
  connectedCallback() {
    super.connectedCallback(), this.behaviorAnalyzer.startTracking(), this.gameType = "random", this.style.setProperty("--game-shield-width", this.width), this.style.setProperty("--game-shield-height", this.height);
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
    } catch (t) {
      this.error = t instanceof Error ? t.message : "Failed to initialize game", this.isLoading = !1, console.error("GameShield initialization error:", t);
    }
  }
  handleGameComplete(t) {
    if (this.isVerified = t.success, t.success) {
      const s = this.behaviorAnalyzer.analyze(), n = {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        gameType: this.gameType,
        behaviorMetrics: s,
        gameResult: {
          success: t.success,
          score: t.score
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
  async verifyWithServer(t) {
    const s = await fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey
      },
      body: JSON.stringify({ token: t })
    });
    if (!s.ok)
      throw new Error(`Server verification failed: ${s.statusText}`);
    return await s.json();
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
e.styles = c`
    :host {
      display: block;
      width: var(--game-shield-width, 400px);
      height: var(--game-shield-height, 400px);
      max-width: 500px;
      max-height: 500px;
      aspect-ratio: 1 / 1;
      border: 1px solid #ccc;
      border-radius: 8px;
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
i([
  a({ type: String })
], e.prototype, "apiKey", 2);
i([
  a({ type: String, attribute: "game-type" })
], e.prototype, "gameType", 2);
i([
  a({ type: String })
], e.prototype, "difficulty", 2);
i([
  a({ type: String })
], e.prototype, "apiEndpoint", 2);
i([
  a({ type: String })
], e.prototype, "width", 2);
i([
  a({ type: String })
], e.prototype, "height", 2);
i([
  h()
], e.prototype, "isVerified", 2);
i([
  h()
], e.prototype, "token", 2);
i([
  h()
], e.prototype, "gameInstance", 2);
i([
  h()
], e.prototype, "isLoading", 2);
i([
  h()
], e.prototype, "error", 2);
e = i([
  g("game-shield")
], e);
export {
  e as GameShield
};
//# sourceMappingURL=index2.js.map
