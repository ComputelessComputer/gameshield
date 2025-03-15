import { CLEAR_MODES as p, DRAW_MODES as T, MSAA_QUALITY as S } from "./index164.js";
import { ExtensionType as P, extensions as R } from "./index140.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as A } from "./index28.js";
import "./index29.js";
import "./index30.js";
import { Matrix as b } from "./index31.js";
import "./index32.js";
import { Point as x } from "./index33.js";
import "./index34.js";
import { RenderTexturePool as v } from "./index68.js";
import { UniformGroup as C } from "./index193.js";
import { Quad as E } from "./index197.js";
import { QuadUv as B } from "./index198.js";
import { FilterState as U } from "./index196.js";
const f = [new x(), new x(), new x(), new x()], w = new b();
class M {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(r) {
    this.renderer = r, this.defaultFilterStack = [{}], this.texturePool = new v(), this.statePool = [], this.quad = new E(), this.quadUv = new B(), this.tempRect = new A(), this.activeState = {}, this.globalUniforms = new C({
      outputFrame: new A(),
      inputSize: new Float32Array(4),
      inputPixel: new Float32Array(4),
      inputClamp: new Float32Array(4),
      resolution: 1,
      // legacy variables
      filterArea: new Float32Array(4),
      filterClamp: new Float32Array(4)
    }, !0), this.forceClear = !1, this.useMaxPadding = !1;
  }
  init() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  /**
   * Pushes a set of filters to be applied later to the system. This will redirect further rendering into an
   * input render-texture for the rest of the filtering pipeline.
   * @param {PIXI.DisplayObject} target - The target of the filter to render.
   * @param filters - The filters to apply.
   */
  push(r, t) {
    const i = this.renderer, o = this.defaultFilterStack, e = this.statePool.pop() || new U(), a = i.renderTexture;
    let n, h;
    if (a.current) {
      const u = a.current;
      n = u.resolution, h = u.multisample;
    } else
      n = i.resolution, h = i.multisample;
    let s = t[0].resolution || n, l = t[0].multisample ?? h, m = t[0].padding, c = t[0].autoFit, g = t[0].legacy ?? !0;
    for (let u = 1; u < t.length; u++) {
      const d = t[u];
      s = Math.min(s, d.resolution || n), l = Math.min(l, d.multisample ?? h), m = this.useMaxPadding ? Math.max(m, d.padding) : m + d.padding, c = c && d.autoFit, g = g || (d.legacy ?? !0);
    }
    o.length === 1 && (this.defaultFilterStack[0].renderTexture = a.current), o.push(e), e.resolution = s, e.multisample = l, e.legacy = g, e.target = r, e.sourceFrame.copyFrom(r.filterArea || r.getBounds(!0)), e.sourceFrame.pad(m);
    const y = this.tempRect.copyFrom(a.sourceFrame);
    i.projection.transform && this.transformAABB(
      w.copyFrom(i.projection.transform).invert(),
      y
    ), c ? (e.sourceFrame.fit(y), (e.sourceFrame.width <= 0 || e.sourceFrame.height <= 0) && (e.sourceFrame.width = 0, e.sourceFrame.height = 0)) : e.sourceFrame.intersects(y) || (e.sourceFrame.width = 0, e.sourceFrame.height = 0), this.roundFrame(
      e.sourceFrame,
      a.current ? a.current.resolution : i.resolution,
      a.sourceFrame,
      a.destinationFrame,
      i.projection.transform
    ), e.renderTexture = this.getOptimalFilterTexture(
      e.sourceFrame.width,
      e.sourceFrame.height,
      s,
      l
    ), e.filters = t, e.destinationFrame.width = e.renderTexture.width, e.destinationFrame.height = e.renderTexture.height;
    const F = this.tempRect;
    F.x = 0, F.y = 0, F.width = e.sourceFrame.width, F.height = e.sourceFrame.height, e.renderTexture.filterFrame = e.sourceFrame, e.bindingSourceFrame.copyFrom(a.sourceFrame), e.bindingDestinationFrame.copyFrom(a.destinationFrame), e.transform = i.projection.transform, i.projection.transform = null, a.bind(e.renderTexture, e.sourceFrame, F), i.framebuffer.clear(0, 0, 0, 0);
  }
  /** Pops off the filter and applies it. */
  pop() {
    const r = this.defaultFilterStack, t = r.pop(), i = t.filters;
    this.activeState = t;
    const o = this.globalUniforms.uniforms;
    o.outputFrame = t.sourceFrame, o.resolution = t.resolution;
    const e = o.inputSize, a = o.inputPixel, n = o.inputClamp;
    if (e[0] = t.destinationFrame.width, e[1] = t.destinationFrame.height, e[2] = 1 / e[0], e[3] = 1 / e[1], a[0] = Math.round(e[0] * t.resolution), a[1] = Math.round(e[1] * t.resolution), a[2] = 1 / a[0], a[3] = 1 / a[1], n[0] = 0.5 * a[2], n[1] = 0.5 * a[3], n[2] = t.sourceFrame.width * e[2] - 0.5 * a[2], n[3] = t.sourceFrame.height * e[3] - 0.5 * a[3], t.legacy) {
      const s = o.filterArea;
      s[0] = t.destinationFrame.width, s[1] = t.destinationFrame.height, s[2] = t.sourceFrame.x, s[3] = t.sourceFrame.y, o.filterClamp = o.inputClamp;
    }
    this.globalUniforms.update();
    const h = r[r.length - 1];
    if (this.renderer.framebuffer.blit(), i.length === 1)
      i[0].apply(this, t.renderTexture, h.renderTexture, p.BLEND, t), this.returnFilterTexture(t.renderTexture);
    else {
      let s = t.renderTexture, l = this.getOptimalFilterTexture(
        s.width,
        s.height,
        t.resolution
      );
      l.filterFrame = s.filterFrame;
      let m = 0;
      for (m = 0; m < i.length - 1; ++m) {
        m === 1 && t.multisample > 1 && (l = this.getOptimalFilterTexture(
          s.width,
          s.height,
          t.resolution
        ), l.filterFrame = s.filterFrame), i[m].apply(this, s, l, p.CLEAR, t);
        const c = s;
        s = l, l = c;
      }
      i[m].apply(this, s, h.renderTexture, p.BLEND, t), m > 1 && t.multisample > 1 && this.returnFilterTexture(t.renderTexture), this.returnFilterTexture(s), this.returnFilterTexture(l);
    }
    t.clear(), this.statePool.push(t);
  }
  /**
   * Binds a renderTexture with corresponding `filterFrame`, clears it if mode corresponds.
   * @param filterTexture - renderTexture to bind, should belong to filter pool or filter stack
   * @param clearMode - clearMode, by default its CLEAR/YES. See {@link PIXI.CLEAR_MODES}
   */
  bindAndClear(r, t = p.CLEAR) {
    const {
      renderTexture: i,
      state: o
    } = this.renderer;
    if (r === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? this.renderer.projection.transform = this.activeState.transform : this.renderer.projection.transform = null, r == null ? void 0 : r.filterFrame) {
      const a = this.tempRect;
      a.x = 0, a.y = 0, a.width = r.filterFrame.width, a.height = r.filterFrame.height, i.bind(r, r.filterFrame, a);
    } else
      r !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture ? i.bind(r) : this.renderer.renderTexture.bind(
        r,
        this.activeState.bindingSourceFrame,
        this.activeState.bindingDestinationFrame
      );
    const e = o.stateId & 1 || this.forceClear;
    (t === p.CLEAR || t === p.BLIT && e) && this.renderer.framebuffer.clear(0, 0, 0, 0);
  }
  /**
   * Draws a filter using the default rendering process.
   *
   * This should be called only by {@link PIXI.Filter#apply}.
   * @param filter - The filter to draw.
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it
   */
  applyFilter(r, t, i, o) {
    const e = this.renderer;
    e.state.set(r.state), this.bindAndClear(i, o), r.uniforms.uSampler = t, r.uniforms.filterGlobals = this.globalUniforms, e.shader.bind(r), r.legacy = !!r.program.attributeData.aTextureCoord, r.legacy ? (this.quadUv.map(t._frame, t.filterFrame), e.geometry.bind(this.quadUv), e.geometry.draw(T.TRIANGLES)) : (e.geometry.bind(this.quad), e.geometry.draw(T.TRIANGLE_STRIP));
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {PIXI.Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(r, t) {
    const { sourceFrame: i, destinationFrame: o } = this.activeState, { orig: e } = t._texture, a = r.set(
      o.width,
      0,
      0,
      o.height,
      i.x,
      i.y
    ), n = t.worldTransform.copyTo(b.TEMP_MATRIX);
    return n.invert(), a.prepend(n), a.scale(1 / e.width, 1 / e.height), a.translate(t.anchor.x, t.anchor.y), a;
  }
  /** Destroys this Filter System. */
  destroy() {
    this.renderer = null, this.texturePool.clear(!1);
  }
  /**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture in real pixels.
   * @param minHeight - The minimum height of the render texture in real pixels.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns - The new render texture.
   */
  getOptimalFilterTexture(r, t, i = 1, o = S.NONE) {
    return this.texturePool.getOptimalTexture(r, t, i, o);
  }
  /**
   * Gets extra render texture to use inside current filter
   * To be compliant with older filters, you can use params in any order
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   * @param multisample - number of samples of the renderTexture
   */
  getFilterTexture(r, t, i) {
    if (typeof r == "number") {
      const e = r;
      r = t, t = e;
    }
    r = r || this.activeState.renderTexture;
    const o = this.texturePool.getOptimalTexture(
      r.width,
      r.height,
      t || r.resolution,
      i || S.NONE
    );
    return o.filterFrame = r.filterFrame, o;
  }
  /**
   * Frees a render texture back into the pool.
   * @param renderTexture - The renderTarget to free
   */
  returnFilterTexture(r) {
    this.texturePool.returnTexture(r);
  }
  /** Empties the texture pool. */
  emptyPool() {
    this.texturePool.clear(!0);
  }
  /** Calls `texturePool.resize()`, affects fullScreen renderTextures. */
  resize() {
    this.texturePool.setScreenSize(this.renderer.view);
  }
  /**
   * @param matrix - first param
   * @param rect - second param
   */
  transformAABB(r, t) {
    const i = f[0], o = f[1], e = f[2], a = f[3];
    i.set(t.left, t.top), o.set(t.left, t.bottom), e.set(t.right, t.top), a.set(t.right, t.bottom), r.apply(i, i), r.apply(o, o), r.apply(e, e), r.apply(a, a);
    const n = Math.min(i.x, o.x, e.x, a.x), h = Math.min(i.y, o.y, e.y, a.y), s = Math.max(i.x, o.x, e.x, a.x), l = Math.max(i.y, o.y, e.y, a.y);
    t.x = n, t.y = h, t.width = s - n, t.height = l - h;
  }
  roundFrame(r, t, i, o, e) {
    if (!(r.width <= 0 || r.height <= 0 || i.width <= 0 || i.height <= 0)) {
      if (e) {
        const { a, b: n, c: h, d: s } = e;
        if ((Math.abs(n) > 1e-4 || Math.abs(h) > 1e-4) && (Math.abs(a) > 1e-4 || Math.abs(s) > 1e-4))
          return;
      }
      e = e ? w.copyFrom(e) : w.identity(), e.translate(-i.x, -i.y).scale(
        o.width / i.width,
        o.height / i.height
      ).translate(o.x, o.y), this.transformAABB(e, r), r.ceil(t), this.transformAABB(e.invert(), r);
    }
  }
}
M.extension = {
  type: P.RendererSystem,
  name: "filter"
};
R.add(M);
export {
  M as FilterSystem
};
//# sourceMappingURL=index53.js.map
