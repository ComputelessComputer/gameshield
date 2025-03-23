import { MSAA_QUALITY as s } from "./index164.js";
import { Program as a } from "./index46.js";
import { Shader as u } from "./index204.js";
import { State as n } from "./index69.js";
import d from "./index206.js";
import m from "./index207.js";
const i = class e extends u {
  /**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */
  constructor(t, r, o) {
    const l = a.from(
      t || e.defaultVertexSrc,
      r || e.defaultFragmentSrc
    );
    super(l, o), this.padding = 0, this.resolution = e.defaultResolution, this.multisample = e.defaultMultisample, this.enabled = !0, this.autoFit = !0, this.state = new n();
  }
  /**
   * Applies the filter
   * @param {PIXI.FilterSystem} filterManager - The renderer to retrieve the filter from
   * @param {PIXI.RenderTexture} input - The input render target.
   * @param {PIXI.RenderTexture} output - The target to output to.
   * @param {PIXI.CLEAR_MODES} [clearMode] - Should the output be cleared before rendering to it.
   * @param {object} [_currentState] - It's current state of filter.
   *        There are some useful properties in the currentState :
   *        target, filters, sourceFrame, destinationFrame, renderTarget, resolution
   */
  apply(t, r, o, l, f) {
    t.applyFilter(this, r, o, l);
  }
  /**
   * Sets the blend mode of the filter.
   * @default PIXI.BLEND_MODES.NORMAL
   */
  get blendMode() {
    return this.state.blendMode;
  }
  set blendMode(t) {
    this.state.blendMode = t;
  }
  /**
   * The resolution of the filter. Setting this to be lower will lower the quality but
   * increase the performance of the filter.
   * If set to `null` or `0`, the resolution of the current render target is used.
   * @default PIXI.Filter.defaultResolution
   */
  get resolution() {
    return this._resolution;
  }
  set resolution(t) {
    this._resolution = t;
  }
  /**
   * The default vertex shader source
   * @readonly
   */
  static get defaultVertexSrc() {
    return m;
  }
  /**
   * The default fragment shader source
   * @readonly
   */
  static get defaultFragmentSrc() {
    return d;
  }
};
i.defaultResolution = 1, /**
* Default filter samples for any filter.
* @static
* @type {PIXI.MSAA_QUALITY|null}
* @default PIXI.MSAA_QUALITY.NONE
*/
i.defaultMultisample = s.NONE;
let M = i;
export {
  M as Filter
};
//# sourceMappingURL=index49.js.map
