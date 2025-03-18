import { ExtensionType as p, extensions as l } from "./index140.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as u } from "./index28.js";
import "./index29.js";
import "./index30.js";
import { Matrix as S } from "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import { settings as R } from "./index145.js";
import "./index36.js";
import { AbstractMaskSystem as x } from "./index203.js";
const h = new S(), n = [], d = class o extends x {
  /**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */
  constructor(t) {
    super(t), this.glConst = R.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST;
  }
  getStackLength() {
    const t = this.maskStack[this.maskStack.length - 1];
    return t ? t._scissorCounter : 0;
  }
  /**
   * evaluates _boundsTransformed, _scissorRect for MaskData
   * @param maskData
   */
  calcScissorRect(t) {
    if (t._scissorRectLocal)
      return;
    const e = t._scissorRect, { maskObject: r } = t, { renderer: c } = this, s = c.renderTexture, i = r.getBounds(!0, n.pop() ?? new u());
    this.roundFrameToPixels(
      i,
      s.current ? s.current.resolution : c.resolution,
      s.sourceFrame,
      s.destinationFrame,
      c.projection.transform
    ), e && i.fit(e), t._scissorRectLocal = i;
  }
  static isMatrixRotated(t) {
    if (!t)
      return !1;
    const { a: e, b: r, c, d: s } = t;
    return (Math.abs(r) > 1e-4 || Math.abs(c) > 1e-4) && (Math.abs(e) > 1e-4 || Math.abs(s) > 1e-4);
  }
  /**
   * Test, whether the object can be scissor mask with current renderer projection.
   * Calls "calcScissorRect()" if its true.
   * @param maskData - mask data
   * @returns whether Whether the object can be scissor mask
   */
  testScissor(t) {
    const { maskObject: e } = t;
    if (!e.isFastRect || !e.isFastRect() || o.isMatrixRotated(e.worldTransform) || o.isMatrixRotated(this.renderer.projection.transform))
      return !1;
    this.calcScissorRect(t);
    const r = t._scissorRectLocal;
    return r.width > 0 && r.height > 0;
  }
  roundFrameToPixels(t, e, r, c, s) {
    o.isMatrixRotated(s) || (s = s ? h.copyFrom(s) : h.identity(), s.translate(-r.x, -r.y).scale(
      c.width / r.width,
      c.height / r.height
    ).translate(c.x, c.y), this.renderer.filter.transformAABB(s, t), t.fit(c), t.x = Math.round(t.x * e), t.y = Math.round(t.y * e), t.width = Math.round(t.width * e), t.height = Math.round(t.height * e));
  }
  /**
   * Applies the Mask and adds it to the current stencil stack.
   * @author alvin
   * @param maskData - The mask data.
   */
  push(t) {
    t._scissorRectLocal || this.calcScissorRect(t);
    const { gl: e } = this.renderer;
    t._scissorRect || e.enable(e.SCISSOR_TEST), t._scissorCounter++, t._scissorRect = t._scissorRectLocal, this._useCurrent();
  }
  /**
   * This should be called after a mask is popped off the mask stack. It will rebind the scissor box to be latest with the
   * last mask in the stack.
   *
   * This can also be called when you directly modify the scissor box and want to restore PixiJS state.
   * @param maskData - The mask data.
   */
  pop(t) {
    const { gl: e } = this.renderer;
    t && n.push(t._scissorRectLocal), this.getStackLength() > 0 ? this._useCurrent() : e.disable(e.SCISSOR_TEST);
  }
  /**
   * Setup renderer to use the current scissor data.
   * @private
   */
  _useCurrent() {
    const t = this.maskStack[this.maskStack.length - 1]._scissorRect;
    let e;
    this.renderer.renderTexture.current ? e = t.y : e = this.renderer.height - t.height - t.y, this.renderer.gl.scissor(t.x, e, t.width, t.height);
  }
};
d.extension = {
  type: p.RendererSystem,
  name: "scissor"
};
let y = d;
l.add(y);
export {
  y as ScissorSystem
};
//# sourceMappingURL=index60.js.map
