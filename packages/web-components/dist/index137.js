import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import { Matrix as a } from "./index31.js";
import "./index32.js";
import { Point as e } from "./index33.js";
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
import { Filter as n } from "./index52.js";
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
import l from "./index258.js";
import h from "./index259.js";
class yt extends n {
  /**
   * @param {PIXI.Sprite} sprite - The sprite used for the displacement map. (make sure its added to the scene!)
   * @param scale - The scale of the displacement
   */
  constructor(r, i) {
    const o = new a();
    r.renderable = !1, super(h, l, {
      mapSampler: r._texture,
      filterMatrix: o,
      scale: { x: 1, y: 1 },
      rotation: new Float32Array([1, 0, 0, 1])
    }), this.maskSprite = r, this.maskMatrix = o, i == null && (i = 20), this.scale = new e(i, i);
  }
  /**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - clearMode.
   */
  apply(r, i, o, s) {
    this.uniforms.filterMatrix = r.calculateSpriteMatrix(this.maskMatrix, this.maskSprite), this.uniforms.scale.x = this.scale.x, this.uniforms.scale.y = this.scale.y;
    const t = this.maskSprite.worldTransform, m = Math.sqrt(t.a * t.a + t.b * t.b), p = Math.sqrt(t.c * t.c + t.d * t.d);
    m !== 0 && p !== 0 && (this.uniforms.rotation[0] = t.a / m, this.uniforms.rotation[1] = t.b / m, this.uniforms.rotation[2] = t.c / p, this.uniforms.rotation[3] = t.d / p), r.applyFilter(this, i, o, s);
  }
  /** The texture used for the displacement map. Must be power of 2 sized texture. */
  get map() {
    return this.uniforms.mapSampler;
  }
  set map(r) {
    this.uniforms.mapSampler = r;
  }
}
export {
  yt as DisplacementFilter
};
//# sourceMappingURL=index137.js.map
