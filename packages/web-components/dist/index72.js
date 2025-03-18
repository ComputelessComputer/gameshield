import { BLEND_MODES as h } from "./index146.js";
const e = 0, s = 1, a = 2, i = 3, d = 4, o = 5;
class n {
  constructor() {
    this.data = 0, this.blendMode = h.NORMAL, this.polygonOffset = 0, this.blend = !0, this.depthMask = !0;
  }
  /**
   * Activates blending of the computed fragment color values.
   * @default true
   */
  get blend() {
    return !!(this.data & 1 << e);
  }
  set blend(t) {
    !!(this.data & 1 << e) !== t && (this.data ^= 1 << e);
  }
  /**
   * Activates adding an offset to depth values of polygon's fragments
   * @default false
   */
  get offsets() {
    return !!(this.data & 1 << s);
  }
  set offsets(t) {
    !!(this.data & 1 << s) !== t && (this.data ^= 1 << s);
  }
  /**
   * Activates culling of polygons.
   * @default false
   */
  get culling() {
    return !!(this.data & 1 << a);
  }
  set culling(t) {
    !!(this.data & 1 << a) !== t && (this.data ^= 1 << a);
  }
  /**
   * Activates depth comparisons and updates to the depth buffer.
   * @default false
   */
  get depthTest() {
    return !!(this.data & 1 << i);
  }
  set depthTest(t) {
    !!(this.data & 1 << i) !== t && (this.data ^= 1 << i);
  }
  /**
   * Enables or disables writing to the depth buffer.
   * @default true
   */
  get depthMask() {
    return !!(this.data & 1 << o);
  }
  set depthMask(t) {
    !!(this.data & 1 << o) !== t && (this.data ^= 1 << o);
  }
  /**
   * Specifies whether or not front or back-facing polygons can be culled.
   * @default false
   */
  get clockwiseFrontFace() {
    return !!(this.data & 1 << d);
  }
  set clockwiseFrontFace(t) {
    !!(this.data & 1 << d) !== t && (this.data ^= 1 << d);
  }
  /**
   * The blend mode to be applied when this state is set. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
   * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
   * @default PIXI.BLEND_MODES.NORMAL
   */
  get blendMode() {
    return this._blendMode;
  }
  set blendMode(t) {
    this.blend = t !== h.NONE, this._blendMode = t;
  }
  /**
   * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
   * @default 0
   */
  get polygonOffset() {
    return this._polygonOffset;
  }
  set polygonOffset(t) {
    this.offsets = !!t, this._polygonOffset = t;
  }
  static for2d() {
    const t = new n();
    return t.depthTest = !1, t.blend = !0, t;
  }
}
n.prototype.toString = function() {
  return `[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`;
};
export {
  n as State
};
//# sourceMappingURL=index72.js.map
