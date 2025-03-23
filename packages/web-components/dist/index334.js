import { ExtensionType as r } from "./index153.js";
import { UPDATE_PRIORITY as s } from "./index335.js";
import { Ticker as e } from "./index336.js";
class c {
  /**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */
  static init(t) {
    t = Object.assign({
      autoStart: !0,
      sharedTicker: !1
    }, t), Object.defineProperty(
      this,
      "ticker",
      {
        set(i) {
          this._ticker && this._ticker.remove(this.render, this), this._ticker = i, i && i.add(this.render, this, s.LOW);
        },
        get() {
          return this._ticker;
        }
      }
    ), this.stop = () => {
      this._ticker.stop();
    }, this.start = () => {
      this._ticker.start();
    }, this._ticker = null, this.ticker = t.sharedTicker ? e.shared : new e(), t.autoStart && this.start();
  }
  /**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */
  static destroy() {
    if (this._ticker) {
      const t = this._ticker;
      this.ticker = null, t.destroy();
    }
  }
}
c.extension = r.Application;
export {
  c as TickerPlugin
};
//# sourceMappingURL=index334.js.map
