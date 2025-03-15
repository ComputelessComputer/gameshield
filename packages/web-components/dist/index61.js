import { ExtensionType as c, extensions as l } from "./index140.js";
import { settings as i } from "./index150.js";
import "./index36.js";
import { AbstractMaskSystem as a } from "./index212.js";
class o extends a {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    super(e), this.glConst = i.ADAPTER.getWebGLRenderingContext().STENCIL_TEST;
  }
  getStackLength() {
    const e = this.maskStack[this.maskStack.length - 1];
    return e ? e._stencilCounter : 0;
  }
  /**
   * Applies the Mask and adds it to the current stencil stack.
   * @param maskData - The mask data
   */
  push(e) {
    const r = e.maskObject, { gl: t } = this.renderer, s = e._stencilCounter;
    s === 0 && (this.renderer.framebuffer.forceStencil(), t.clearStencil(0), t.clear(t.STENCIL_BUFFER_BIT), t.enable(t.STENCIL_TEST)), e._stencilCounter++;
    const n = e._colorMask;
    n !== 0 && (e._colorMask = 0, t.colorMask(!1, !1, !1, !1)), t.stencilFunc(t.EQUAL, s, 4294967295), t.stencilOp(t.KEEP, t.KEEP, t.INCR), r.renderable = !0, r.render(this.renderer), this.renderer.batch.flush(), r.renderable = !1, n !== 0 && (e._colorMask = n, t.colorMask(
      (n & 1) !== 0,
      (n & 2) !== 0,
      (n & 4) !== 0,
      (n & 8) !== 0
    )), this._useCurrent();
  }
  /**
   * Pops stencil mask. MaskData is already removed from stack
   * @param {PIXI.DisplayObject} maskObject - object of popped mask data
   */
  pop(e) {
    const r = this.renderer.gl;
    if (this.getStackLength() === 0)
      r.disable(r.STENCIL_TEST);
    else {
      const t = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null, s = t ? t._colorMask : 15;
      s !== 0 && (t._colorMask = 0, r.colorMask(!1, !1, !1, !1)), r.stencilOp(r.KEEP, r.KEEP, r.DECR), e.renderable = !0, e.render(this.renderer), this.renderer.batch.flush(), e.renderable = !1, s !== 0 && (t._colorMask = s, r.colorMask(
        (s & 1) !== 0,
        (s & 2) !== 0,
        (s & 4) !== 0,
        (s & 8) !== 0
      )), this._useCurrent();
    }
  }
  /**
   * Setup renderer to use the current stencil data.
   * @private
   */
  _useCurrent() {
    const e = this.renderer.gl;
    e.stencilFunc(e.EQUAL, this.getStackLength(), 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP);
  }
}
o.extension = {
  type: c.RendererSystem,
  name: "stencil"
};
l.add(o);
export {
  o as StencilSystem
};
//# sourceMappingURL=index61.js.map
