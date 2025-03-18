import { settings as e } from "./index153.js";
import "./index36.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import { deprecation as i } from "./index133.js";
import "./index24.js";
import "./index44.js";
import "./index45.js";
import { Ticker as t } from "./index38.js";
Object.defineProperties(e, {
  /**
   * Target frames per millisecond.
   * @static
   * @name TARGET_FPMS
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.Ticker.targetFPMS
   */
  TARGET_FPMS: {
    get() {
      return t.targetFPMS;
    },
    set(r) {
      i("7.1.0", "settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS"), t.targetFPMS = r;
    }
  }
});
export {
  e as settings
};
//# sourceMappingURL=index37.js.map
