import { css as l, LitElement as d, html as m } from "lit";
import { customElement as f } from "./index4.js";
import { property as a } from "./index5.js";
import { state as n } from "./index6.js";
import "./index7.js";
import "./index8.js";
import { GameFactory as u } from "./index9.js";
import { BehaviorAnalyzer as g } from "./index10.js";
import { SecurityUtils as y } from "./index3.js";
import "./index11.js";
import "./index12.js";
import "./index13.js";
import "./index14.js";
import "./index15.js";
import { Application as b } from "./index16.js";
import "./index17.js";
import "./index18.js";
import "./index19.js";
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
import "./index111.js";
import "./index112.js";
import "./index113.js";
import "./index114.js";
import "./index115.js";
import "./index116.js";
import "./index117.js";
import "./index118.js";
import "./index119.js";
import "./index120.js";
import "./index121.js";
import "./index122.js";
import "./index123.js";
import "./index124.js";
import "./index125.js";
var v = Object.defineProperty, x = Object.getOwnPropertyDescriptor, r = (i, t, o, p) => {
  for (var s = p > 1 ? void 0 : p ? x(t, o) : t, h = i.length - 1, c; h >= 0; h--)
    (c = i[h]) && (s = (p ? c(t, o, s) : c(s)) || s);
  return p && s && v(t, o, s), s;
};
let e = class extends d {
  constructor() {
    super(...arguments), this.apiKey = "", this.gameType = "random", this.difficulty = "medium", this.apiEndpoint = "", this.size = "400px", this.isVerified = !1, this.token = null, this.gameInstance = null, this.pixiApp = null, this.isLoading = !1, this.error = null, this.behaviorAnalyzer = new g(), this.securityUtils = new y(), this.sessionId = this.securityUtils.generateSessionId();
  }
  connectedCallback() {
    super.connectedCallback(), this.behaviorAnalyzer.startTracking(), this.gameType = "random", this.updateSize(), this.setupResizeObserver();
  }
  /**
   * Updates the component size based on the size property
   * Ensures consistent rendering across different browsers
   */
  updateSize() {
    const i = this.size.trim();
    if (i === "100%")
      this.style.width = "100%", this.style.height = "100%";
    else {
      const t = parseInt(i);
      if (isNaN(t))
        this.style.width = i, this.style.height = i;
      else {
        const o = Math.min(t, 500) + "px";
        this.style.width = o, this.style.height = o;
      }
    }
  }
  /**
   * Sets up a resize observer to handle responsive sizing
   */
  setupResizeObserver() {
    if (typeof ResizeObserver < "u") {
      const i = new ResizeObserver(() => {
        this.updateSize(), this.gameInstance && this.gameContainer && typeof this.gameInstance.resize == "function" && this.gameInstance.resize(
          this.gameContainer.clientWidth,
          this.gameContainer.clientHeight
        );
      });
      i.observe(this), this._resizeObserver = i;
    }
  }
  firstUpdated() {
    this.gameContainer = this.renderRoot.querySelector(
      ".game-container"
    ), this.startVerification();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopVerification(), this.behaviorAnalyzer.stopTracking(), this._resizeObserver && this._resizeObserver.disconnect(), this.timeoutId && clearTimeout(this.timeoutId);
  }
  async startVerification() {
    var i;
    this.isLoading = !0, this.isVerified = !1, this.token = null;
    try {
      if (this.gameContainer = (i = this.shadowRoot) == null ? void 0 : i.querySelector(".game-container"), !this.gameContainer)
        throw new Error("Game container not found");
      this.pixiApp = new b({
        width: this.gameContainer.clientWidth,
        height: this.gameContainer.clientHeight,
        backgroundColor: 1087931
      }), this.gameInstance = u.createGame(this.gameType, {
        app: this.pixiApp,
        difficulty: this.difficulty,
        onComplete: (t) => this.handleGameCompletion(t)
      }), this.gameContainer.appendChild(this.pixiApp.view), this.gameInstance.mount(this.gameContainer), this.isLoading = !1, this.behaviorAnalyzer.startTracking(), this.timeoutId = setTimeout(() => {
        !this.isVerified && !this.error && this.dispatchEvent(
          new CustomEvent("timeout", {
            detail: { message: "Game timeout" },
            bubbles: !0,
            composed: !0
          })
        );
      }, 12e4);
    } catch (t) {
      console.error("Error starting verification:", t), this.isLoading = !1;
    }
  }
  stopVerification() {
    this.gameInstance && (this.gameInstance.destroy(), this.gameInstance = null), this.pixiApp && (this.pixiApp.destroy(!0), this.pixiApp = null), this.behaviorAnalyzer && this.behaviorAnalyzer.stopTracking();
  }
  handleGameCompletion(i) {
    if (this.isVerified = i.success, this.timeoutId && clearTimeout(this.timeoutId), i.success) {
      const t = this.behaviorAnalyzer.analyze(), o = {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        gameType: this.gameType,
        behaviorMetrics: t,
        gameResult: {
          success: i.success,
          score: i.score
        }
      };
      this.token = this.securityUtils.generateToken(o), this.dispatchEvent(
        new CustomEvent("success", {
          detail: { token: this.token },
          bubbles: !0,
          composed: !0
        })
      ), this.apiEndpoint && this.token && this.verifyWithServer(this.token).catch((p) => {
        console.error("Server verification failed:", p);
      });
    } else
      this.dispatchEvent(
        new CustomEvent("failure", {
          detail: { reason: "Game failed" },
          bubbles: !0,
          composed: !0
        })
      );
  }
  async verifyWithServer(i) {
    const t = await fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey
      },
      body: JSON.stringify({ token: i })
    });
    if (!t.ok)
      throw new Error(`Server verification failed: ${t.statusText}`);
    return await t.json();
  }
  /**
   * Reset the CAPTCHA to its initial state
   */
  reset() {
    this.stopVerification(), this.sessionId = this.securityUtils.generateSessionId(), this.token = null, this.isVerified = !1, this.error = null, this.behaviorAnalyzer.reset(), this.startVerification();
  }
  render() {
    return m`
      <div class="game-container"></div>

      ${this.isLoading ? m`<div class="loading"><div class="spinner"></div></div>` : ""}
      ${this.error ? m`<div class="error">${this.error}</div>` : ""}
      ${this.isVerified ? m`<div class="success-badge">✓ Verified</div>` : ""}
    `;
  }
};
e.styles = l`
    :host {
      display: block;
      width: 400px;
      height: 400px;
      max-width: 500px;
      max-height: 500px;
      min-width: 200px;
      min-height: 200px;
      border: none;
      position: relative;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    .game-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000000;
      box-sizing: border-box;
      border: 1px solid #ccc;
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
      background: #4caf50;
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
      to {
        transform: rotate(360deg);
      }
    }
  `;
r([
  a({ type: String })
], e.prototype, "apiKey", 2);
r([
  a({ type: String, attribute: "game-type" })
], e.prototype, "gameType", 2);
r([
  a({ type: String })
], e.prototype, "difficulty", 2);
r([
  a({ type: String })
], e.prototype, "apiEndpoint", 2);
r([
  a({ type: String })
], e.prototype, "size", 2);
r([
  n()
], e.prototype, "isVerified", 2);
r([
  n()
], e.prototype, "token", 2);
r([
  n()
], e.prototype, "gameInstance", 2);
r([
  n()
], e.prototype, "pixiApp", 2);
r([
  n()
], e.prototype, "isLoading", 2);
r([
  n()
], e.prototype, "error", 2);
e = r([
  f("game-shield")
], e);
export {
  e as GameShield
};
//# sourceMappingURL=index2.js.map
