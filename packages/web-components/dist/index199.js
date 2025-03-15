import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import { Matrix as m } from "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import { TextureMatrix as e } from "./index200.js";
import { Filter as o } from "./index52.js";
import h from "./index201.js";
import l from "./index202.js";
class A extends o {
  /** @ignore */
  constructor(t, r, p) {
    let a = null;
    typeof t != "string" && r === void 0 && p === void 0 && (a = t, t = void 0, r = void 0, p = void 0), super(t || l, r || h, p), this.maskSprite = a, this.maskMatrix = new m();
  }
  /**
   * Sprite mask
   * @type {PIXI.DisplayObject}
   */
  get maskSprite() {
    return this._maskSprite;
  }
  set maskSprite(t) {
    this._maskSprite = t, this._maskSprite && (this._maskSprite.renderable = !1);
  }
  /**
   * Applies the filter
   * @param filterManager - The renderer to retrieve the filter from
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it.
   */
  apply(t, r, p, a) {
    const s = this._maskSprite, i = s._texture;
    i.valid && (i.uvMatrix || (i.uvMatrix = new e(i, 0)), i.uvMatrix.update(), this.uniforms.npmAlpha = i.baseTexture.alphaMode ? 0 : 1, this.uniforms.mask = i, this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, s).prepend(i.uvMatrix.mapCoord), this.uniforms.alpha = s.worldAlpha, this.uniforms.maskClamp = i.uvMatrix.uClampFrame, t.applyFilter(this, r, p, a));
  }
}
export {
  A as SpriteMaskFilter
};
//# sourceMappingURL=index199.js.map
