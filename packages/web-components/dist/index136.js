import "./index23.js";
import "./index24.js";
import { CLEAR_MODES as n } from "./index146.js";
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
import { Filter as l } from "./index52.js";
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
import { generateBlurFragSource as g } from "./index246.js";
import { generateBlurVertSource as u } from "./index247.js";
class xt extends l {
  /**
   * @param horizontal - Do pass along the x-axis (`true`) or y-axis (`false`).
   * @param strength - The strength of the blur filter.
   * @param quality - The quality of the blur filter.
   * @param {number|null} [resolution=PIXI.Filter.defaultResolution] - The resolution of the blur filter.
   * @param kernelSize - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
   */
  constructor(t, i = 8, r = 4, p = l.defaultResolution, s = 5) {
    const e = u(s, t), o = g(s);
    super(
      // vertex shader
      e,
      // fragment shader
      o
    ), this.horizontal = t, this.resolution = p, this._quality = 0, this.quality = r, this.blur = i;
  }
  /**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - How to clear
   */
  apply(t, i, r, p) {
    if (r ? this.horizontal ? this.uniforms.strength = 1 / r.width * (r.width / i.width) : this.uniforms.strength = 1 / r.height * (r.height / i.height) : this.horizontal ? this.uniforms.strength = 1 / t.renderer.width * (t.renderer.width / i.width) : this.uniforms.strength = 1 / t.renderer.height * (t.renderer.height / i.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, this.passes === 1)
      t.applyFilter(this, i, r, p);
    else {
      const s = t.getFilterTexture(), e = t.renderer;
      let o = i, m = s;
      this.state.blend = !1, t.applyFilter(this, o, m, n.CLEAR);
      for (let h = 1; h < this.passes - 1; h++) {
        t.bindAndClear(o, n.BLIT), this.uniforms.uSampler = m;
        const d = m;
        m = o, o = d, e.shader.bind(this), e.geometry.draw(5);
      }
      this.state.blend = !0, t.applyFilter(this, m, r, p), t.returnFilterTexture(s);
    }
  }
  /**
   * Sets the strength of both the blur.
   * @default 16
   */
  get blur() {
    return this.strength;
  }
  set blur(t) {
    this.padding = 1 + Math.abs(t) * 2, this.strength = t;
  }
  /**
   * Sets the quality of the blur by modifying the number of passes. More passes means higher
   * quality bluring but the lower the performance.
   * @default 4
   */
  get quality() {
    return this._quality;
  }
  set quality(t) {
    this._quality = t, this.passes = t;
  }
}
export {
  xt as BlurFilterPass
};
//# sourceMappingURL=index136.js.map
