import "./index23.js";
import { Color as o } from "./index24.js";
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
import { Program as p } from "./index49.js";
import { Shader as e } from "./index182.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import { TextureMatrix as a } from "./index190.js";
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
import s from "./index258.js";
import h from "./index259.js";
class Ct extends e {
  /**
   * @param uSampler - Texture that material uses to render.
   * @param options - Additional options
   * @param {number} [options.alpha=1] - Default alpha.
   * @param {PIXI.ColorSource} [options.tint=0xFFFFFF] - Default tint.
   * @param {string} [options.pluginName='batch'] - Renderer plugin for batching.
   * @param {PIXI.Program} [options.program=0xFFFFFF] - Custom program.
   * @param {object} [options.uniforms] - Custom uniforms.
   */
  constructor(t, r) {
    const i = {
      uSampler: t,
      alpha: 1,
      uTextureMatrix: m.IDENTITY,
      uColor: new Float32Array([1, 1, 1, 1])
    };
    r = Object.assign({
      tint: 16777215,
      alpha: 1,
      pluginName: "batch"
    }, r), r.uniforms && Object.assign(i, r.uniforms), super(r.program || p.from(h, s), i), this._colorDirty = !1, this.uvMatrix = new a(t), this.batchable = r.program === void 0, this.pluginName = r.pluginName, this._tintColor = new o(r.tint), this._tintRGB = this._tintColor.toLittleEndianNumber(), this._colorDirty = !0, this.alpha = r.alpha;
  }
  /** Reference to the texture being rendered. */
  get texture() {
    return this.uniforms.uSampler;
  }
  set texture(t) {
    this.uniforms.uSampler !== t && (!this.uniforms.uSampler.baseTexture.alphaMode != !t.baseTexture.alphaMode && (this._colorDirty = !0), this.uniforms.uSampler = t, this.uvMatrix.texture = t);
  }
  /**
   * This gets automatically set by the object using this.
   * @default 1
   */
  set alpha(t) {
    t !== this._alpha && (this._alpha = t, this._colorDirty = !0);
  }
  get alpha() {
    return this._alpha;
  }
  /**
   * Multiply tint for the material.
   * @default 0xFFFFFF
   */
  set tint(t) {
    t !== this.tint && (this._tintColor.setValue(t), this._tintRGB = this._tintColor.toLittleEndianNumber(), this._colorDirty = !0);
  }
  get tint() {
    return this._tintColor.value;
  }
  /**
   * Get the internal number from tint color
   * @ignore
   */
  get tintValue() {
    return this._tintColor.toNumber();
  }
  /** Gets called automatically by the Mesh. Intended to be overridden for custom {@link PIXI.MeshMaterial} objects. */
  update() {
    if (this._colorDirty) {
      this._colorDirty = !1;
      const t = this.texture.baseTexture.alphaMode;
      o.shared.setValue(this._tintColor).premultiply(this._alpha, t).toArray(this.uniforms.uColor);
    }
    this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord);
  }
}
export {
  Ct as MeshMaterial
};
//# sourceMappingURL=index257.js.map
