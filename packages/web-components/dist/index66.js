import { Color as w } from "./index21.js";
import { ExtensionType as g, extensions as f } from "./index158.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import { Rectangle as d } from "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
const l = new d(), a = new d();
class m {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(e) {
    this.renderer = e, this.defaultMaskStack = [], this.current = null, this.sourceFrame = new d(), this.destinationFrame = new d(), this.viewportFrame = new d();
  }
  contextChange() {
    var t;
    const e = (t = this.renderer) == null ? void 0 : t.gl.getContextAttributes();
    this._rendererPremultipliedAlpha = !!(e && e.alpha && e.premultipliedAlpha);
  }
  /**
   * Bind the current render texture.
   * @param renderTexture - RenderTexture to bind, by default its `null` - the screen.
   * @param sourceFrame - Part of world that is mapped to the renderTexture.
   * @param destinationFrame - Part of renderTexture, by default it has the same size as sourceFrame.
   */
  bind(e = null, t, r) {
    const h = this.renderer;
    this.current = e;
    let n, o, s;
    e ? (n = e.baseTexture, s = n.resolution, t || (l.width = e.frame.width, l.height = e.frame.height, t = l), r || (a.x = e.frame.x, a.y = e.frame.y, a.width = t.width, a.height = t.height, r = a), o = n.framebuffer) : (s = h.resolution, t || (l.width = h._view.screen.width, l.height = h._view.screen.height, t = l), r || (r = l, r.width = t.width, r.height = t.height));
    const i = this.viewportFrame;
    i.x = r.x * s, i.y = r.y * s, i.width = r.width * s, i.height = r.height * s, e || (i.y = h.view.height - (i.y + i.height)), i.ceil(), this.renderer.framebuffer.bind(o, i), this.renderer.projection.update(r, t, s, !o), e ? this.renderer.mask.setMaskStack(n.maskStack) : this.renderer.mask.setMaskStack(this.defaultMaskStack), this.sourceFrame.copyFrom(t), this.destinationFrame.copyFrom(r);
  }
  /**
   * Erases the render texture and fills the drawing area with a colour.
   * @param clearColor - The color as rgba, default to use the renderer backgroundColor
   * @param [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */
  clear(e, t) {
    const r = this.current ? this.current.baseTexture.clear : this.renderer.background.backgroundColor, h = w.shared.setValue(e || r);
    (this.current && this.current.baseTexture.alphaMode > 0 || !this.current && this._rendererPremultipliedAlpha) && h.premultiply(h.alpha);
    const n = this.destinationFrame, o = this.current ? this.current.baseTexture : this.renderer._view.screen, s = n.width !== o.width || n.height !== o.height;
    if (s) {
      let { x: i, y: p, width: c, height: u } = this.viewportFrame;
      i = Math.round(i), p = Math.round(p), c = Math.round(c), u = Math.round(u), this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST), this.renderer.gl.scissor(i, p, c, u);
    }
    this.renderer.framebuffer.clear(h.red, h.green, h.blue, h.alpha, t), s && this.renderer.scissor.pop();
  }
  resize() {
    this.bind(null);
  }
  /** Resets render-texture state. */
  reset() {
    this.bind(null);
  }
  destroy() {
    this.renderer = null;
  }
}
m.extension = {
  type: g.RendererSystem,
  name: "renderTexture"
};
f.add(m);
export {
  m as RenderTextureSystem
};
//# sourceMappingURL=index66.js.map
