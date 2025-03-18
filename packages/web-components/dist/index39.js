import { ExtensionType as s, extensions as c } from "./index140.js";
import { UPDATE_PRIORITY as h } from "./index277.js";
import { Ticker as e } from "./index38.js";
class r {
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
          this._ticker && this._ticker.remove(this.render, this), this._ticker = i, i && i.add(this.render, this, h.LOW);
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
r.extension = s.Application;
c.add(r);
export {
  r as TickerPlugin
};
//# sourceMappingURL=index39.js.map
