import { css as c, LitElement as m, html as d } from "lit";
import { customElement as g } from "./index4.js";
import { property as n } from "./index5.js";
import { state as h } from "./index6.js";
import "./index7.js";
import { GameFactory as u } from "./index8.js";
import { BehaviorAnalyzer as b } from "./index9.js";
import { SecurityUtils as y } from "./index3.js";
var f = Object.defineProperty, x = Object.getOwnPropertyDescriptor, s = (e, t, a, o) => {
  for (var r = o > 1 ? void 0 : o ? x(t, a) : t, l = e.length - 1, p; l >= 0; l--)
    (p = e[l]) && (r = (o ? p(t, a, r) : p(r)) || r);
  return o && r && f(t, a, r), r;
};
let i = class extends m {
  constructor() {
    super(...arguments), this.apiKey = "", this.gameType = "random", this.difficulty = "medium", this.apiEndpoint = "", this.size = "400px", this.isVerified = !1, this.token = null, this.gameInstance = null, this.isLoading = !0, this.error = null, this.behaviorAnalyzer = new b(), this.securityUtils = new y(), this.sessionId = this.securityUtils.generateSessionId();
  }
  connectedCallback() {
    if (super.connectedCallback(), this.behaviorAnalyzer.startTracking(), this.gameType = "random", this.style.setProperty("--game-shield-size", this.size), this.size === "100%")
      this.style.width = "100%", this.style.height = "100%", this.style.maxWidth = "500px", this.style.maxHeight = "500px";
    else {
      const t = parseInt(this.size) > 500 ? "500px" : this.size;
      this.style.width = t, this.style.height = t;
    }
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
      this.gameInstance = u.createGame("random", {
        difficulty: "medium",
        width: this.gameContainer.clientWidth,
        height: this.gameContainer.clientHeight,
        onComplete: this.handleGameComplete.bind(this)
      }), await this.gameInstance.mount(this.gameContainer), this.isLoading = !1, setTimeout(() => {
        !this.isVerified && !this.error && this.dispatchEvent(new CustomEvent("timeout", {
          detail: { message: "Game timeout" },
          bubbles: !0,
          composed: !0
        }));
      }, 12e4);
    } catch (e) {
      this.error = e instanceof Error ? e.message : "Failed to initialize game", this.isLoading = !1, this.dispatchEvent(new CustomEvent("failure", {
        detail: { reason: this.error },
        bubbles: !0,
        composed: !0
      })), console.error("GameShield initialization error:", e);
    }
  }
  handleGameComplete(e) {
    if (this.isVerified = e.success, e.success) {
      const t = this.behaviorAnalyzer.analyze(), a = {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        gameType: this.gameType,
        behaviorMetrics: t,
        gameResult: {
          success: e.success,
          score: e.score
        }
      };
      this.token = this.securityUtils.generateToken(a), this.dispatchEvent(new CustomEvent("success", {
        detail: { token: this.token },
        bubbles: !0,
        composed: !0
      })), this.apiEndpoint && this.token && this.verifyWithServer(this.token).catch((o) => {
        console.error("Server verification failed:", o);
      });
    } else
      this.dispatchEvent(new CustomEvent("failure", {
        detail: { reason: "Game failed" },
        bubbles: !0,
        composed: !0
      }));
  }
  async verifyWithServer(e) {
    const t = await fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey
      },
      body: JSON.stringify({ token: e })
    });
    if (!t.ok)
      throw new Error(`Server verification failed: ${t.statusText}`);
    return await t.json();
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
i.styles = c`
    :host {
      display: block;
      width: var(--game-shield-size, 400px);
      height: var(--game-shield-size, 400px);
      max-width: 500px;
      max-height: 500px;
      min-width: 200px;
      min-height: 200px;
      aspect-ratio: 1 / 1;
      border: 1px solid #ccc;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      /* Force hardware acceleration and cross-browser compatibility */
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    }
    
    .game-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: #000000;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
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
  n({ type: String })
], i.prototype, "apiKey", 2);
s([
  n({ type: String, attribute: "game-type" })
], i.prototype, "gameType", 2);
s([
  n({ type: String })
], i.prototype, "difficulty", 2);
s([
  n({ type: String })
], i.prototype, "apiEndpoint", 2);
s([
  n({ type: String })
], i.prototype, "size", 2);
s([
  h()
], i.prototype, "isVerified", 2);
s([
  h()
], i.prototype, "token", 2);
s([
  h()
], i.prototype, "gameInstance", 2);
s([
  h()
], i.prototype, "isLoading", 2);
s([
  h()
], i.prototype, "error", 2);
i = s([
  g("game-shield")
], i);
export {
  i as GameShield
};
//# sourceMappingURL=index2.js.map
