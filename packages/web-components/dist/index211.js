import "./index22.js";
import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Matrix as m } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import { TextureMatrix as e } from "./index212.js";
import { Filter as o } from "./index49.js";
import h from "./index213.js";
import l from "./index214.js";
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
//# sourceMappingURL=index211.js.map
