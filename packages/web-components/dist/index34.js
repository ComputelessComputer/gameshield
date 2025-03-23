import { settings as e } from "./index163.js";
import "./index33.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import { deprecation as i } from "./index137.js";
import "./index21.js";
import "./index41.js";
import "./index42.js";
import { Ticker as t } from "./index35.js";
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
//# sourceMappingURL=index34.js.map
