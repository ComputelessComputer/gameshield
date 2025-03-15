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
import { deprecation as i } from "./index133.js";
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
import { AlphaFilter as m } from "./index134.js";
import { BlurFilter as p } from "./index135.js";
import { BlurFilterPass as e } from "./index136.js";
import { ColorMatrixFilter as l } from "./index109.js";
import { DisplacementFilter as f } from "./index137.js";
import { FXAAFilter as s } from "./index138.js";
import { NoiseFilter as F } from "./index139.js";
const t = {
  /**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.AlphaFilter
   */
  AlphaFilter: m,
  /**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.BlurFilter
   */
  BlurFilter: p,
  /**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.BlurFilterPass
   */
  BlurFilterPass: e,
  /**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.ColorMatrixFilter
   */
  ColorMatrixFilter: l,
  /**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.DisplacementFilter
   */
  DisplacementFilter: f,
  /**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.FXAAFilter
   */
  FXAAFilter: s,
  /**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.NoiseFilter
   */
  NoiseFilter: F
};
Object.entries(t).forEach(([r, o]) => {
  Object.defineProperty(t, r, {
    get() {
      return i("7.1.0", `filters.${r} has moved to ${r}`), o;
    }
  });
});
export {
  t as filters
};
//# sourceMappingURL=index17.js.map
