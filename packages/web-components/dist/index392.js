import { ExtensionType as R } from "./index153.js";
import { Matrix as G } from "./index393.js";
import { Point as v } from "./index383.js";
import { BindGroup as B } from "./index394.js";
import { Geometry as I } from "./index395.js";
import { UniformGroup as P } from "./index396.js";
import { Texture as F } from "./index360.js";
import { TexturePool as T } from "./index397.js";
import { RendererType as M } from "./index398.js";
import { Bounds as A } from "./index399.js";
import { getGlobalRenderableBounds as E } from "./index400.js";
import { warn as U } from "./index338.js";
const q = new I({
  attributes: {
    aPosition: {
      buffer: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
      format: "float32x2",
      stride: 2 * 4,
      offset: 0
    }
  },
  indexBuffer: new Uint32Array([0, 1, 2, 0, 2, 3])
});
class D {
  constructor(t) {
    this._filterStackIndex = 0, this._filterStack = [], this._filterGlobalUniforms = new P({
      uInputSize: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputPixel: { value: new Float32Array(4), type: "vec4<f32>" },
      uInputClamp: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uGlobalFrame: { value: new Float32Array(4), type: "vec4<f32>" },
      uOutputTexture: { value: new Float32Array(4), type: "vec4<f32>" }
    }), this._globalFilterBindGroup = new B({}), this.renderer = t;
  }
  /**
   * The back texture of the currently active filter. Requires the filter to have `blendRequired` set to true.
   * @readonly
   */
  get activeBackTexture() {
    var t;
    return (t = this._activeFilterData) == null ? void 0 : t.backTexture;
  }
  push(t) {
    var m;
    const e = this.renderer, o = t.filterEffect.filters;
    this._filterStack[this._filterStackIndex] || (this._filterStack[this._filterStackIndex] = this._getFilterData());
    const i = this._filterStack[this._filterStackIndex];
    if (this._filterStackIndex++, o.length === 0) {
      i.skip = !0;
      return;
    }
    const r = i.bounds;
    if (t.renderables ? E(t.renderables, r) : t.filterEffect.filterArea ? (r.clear(), r.addRect(t.filterEffect.filterArea), r.applyMatrix(t.container.worldTransform)) : t.container.getFastGlobalBounds(!0, r), t.container) {
      const n = (t.container.renderGroup || t.container.parentRenderGroup).cacheToLocalTransform;
      n && r.applyMatrix(n);
    }
    const l = e.renderTarget.renderTarget.colorTexture.source;
    let a = 1 / 0, s = 0, f = !0, x = !1, c = !1, p = !0;
    for (let u = 0; u < o.length; u++) {
      const n = o[u];
      if (a = Math.min(a, n.resolution === "inherit" ? l._resolution : n.resolution), s += n.padding, n.antialias === "off" ? f = !1 : n.antialias === "inherit" && f && (f = l.antialias), n.clipToViewport || (p = !1), !!!(n.compatibleRenderers & e.type)) {
        c = !1;
        break;
      }
      if (n.blendRequired && !(((m = e.backBuffer) == null ? void 0 : m.useBackBuffer) ?? !0)) {
        U("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."), c = !1;
        break;
      }
      c = n.enabled || c, x || (x = n.blendRequired);
    }
    if (!c) {
      i.skip = !0;
      return;
    }
    if (p) {
      const u = e.renderTarget.rootViewPort, n = e.renderTarget.renderTarget.resolution;
      r.fitBounds(0, u.width / n, 0, u.height / n);
    }
    if (r.scale(a).ceil().scale(1 / a).pad(s | 0), !r.isPositive) {
      i.skip = !0;
      return;
    }
    i.skip = !1, i.bounds = r, i.blendRequired = x, i.container = t.container, i.filterEffect = t.filterEffect, i.previousRenderSurface = e.renderTarget.renderSurface, i.inputTexture = T.getOptimalTexture(
      r.width,
      r.height,
      a,
      f
    ), e.renderTarget.bind(i.inputTexture, !0), e.globalUniforms.push({
      offset: r
    });
  }
  pop() {
    const t = this.renderer;
    this._filterStackIndex--;
    const e = this._filterStack[this._filterStackIndex];
    if (e.skip)
      return;
    this._activeFilterData = e;
    const o = e.inputTexture, i = e.bounds;
    let r = F.EMPTY;
    if (t.renderTarget.finishRenderPass(), e.blendRequired) {
      const a = this._filterStackIndex > 0 ? this._filterStack[this._filterStackIndex - 1].bounds : null, s = t.renderTarget.getRenderTarget(e.previousRenderSurface);
      r = this.getBackTexture(s, i, a);
    }
    e.backTexture = r;
    const l = e.filterEffect.filters;
    if (this._globalFilterBindGroup.setResource(o.source.style, 2), this._globalFilterBindGroup.setResource(r.source, 3), t.globalUniforms.pop(), l.length === 1)
      l[0].apply(this, o, e.previousRenderSurface, !1), T.returnTexture(o);
    else {
      let a = e.inputTexture, s = T.getOptimalTexture(
        i.width,
        i.height,
        a.source._resolution,
        !1
      ), f = 0;
      for (f = 0; f < l.length - 1; ++f) {
        l[f].apply(this, a, s, !0);
        const c = a;
        a = s, s = c;
      }
      l[f].apply(this, a, e.previousRenderSurface, !1), T.returnTexture(a), T.returnTexture(s);
    }
    e.blendRequired && T.returnTexture(r);
  }
  getBackTexture(t, e, o) {
    const i = t.colorTexture.source._resolution, r = T.getOptimalTexture(
      e.width,
      e.height,
      i,
      !1
    );
    let l = e.minX, a = e.minY;
    o && (l -= o.minX, a -= o.minY), l = Math.floor(l * i), a = Math.floor(a * i);
    const s = Math.ceil(e.width * i), f = Math.ceil(e.height * i);
    return this.renderer.renderTarget.copyToTexture(
      t,
      r,
      { x: l, y: a },
      { width: s, height: f },
      { x: 0, y: 0 }
    ), r;
  }
  applyFilter(t, e, o, i) {
    const r = this.renderer, l = this._filterStack[this._filterStackIndex], a = l.bounds, s = v.shared, x = l.previousRenderSurface === o;
    let c = this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution, p = this._filterStackIndex - 1;
    for (; p > 0 && this._filterStack[p].skip; )
      --p;
    p > 0 && (c = this._filterStack[p].inputTexture.source._resolution);
    const m = this._filterGlobalUniforms, u = m.uniforms, n = u.uOutputFrame, h = u.uInputSize, d = u.uInputPixel, b = u.uInputClamp, k = u.uGlobalFrame, g = u.uOutputTexture;
    if (x) {
      let _ = this._filterStackIndex;
      for (; _ > 0; ) {
        _--;
        const S = this._filterStack[this._filterStackIndex - 1];
        if (!S.skip) {
          s.x = S.bounds.minX, s.y = S.bounds.minY;
          break;
        }
      }
      n[0] = a.minX - s.x, n[1] = a.minY - s.y;
    } else
      n[0] = 0, n[1] = 0;
    n[2] = e.frame.width, n[3] = e.frame.height, h[0] = e.source.width, h[1] = e.source.height, h[2] = 1 / h[0], h[3] = 1 / h[1], d[0] = e.source.pixelWidth, d[1] = e.source.pixelHeight, d[2] = 1 / d[0], d[3] = 1 / d[1], b[0] = 0.5 * d[2], b[1] = 0.5 * d[3], b[2] = e.frame.width * h[2] - 0.5 * d[2], b[3] = e.frame.height * h[3] - 0.5 * d[3];
    const w = this.renderer.renderTarget.rootRenderTarget.colorTexture;
    k[0] = s.x * c, k[1] = s.y * c, k[2] = w.source.width * c, k[3] = w.source.height * c;
    const y = this.renderer.renderTarget.getRenderTarget(o);
    if (r.renderTarget.bind(o, !!i), o instanceof F ? (g[0] = o.frame.width, g[1] = o.frame.height) : (g[0] = y.width, g[1] = y.height), g[2] = y.isRoot ? -1 : 1, m.update(), r.renderPipes.uniformBatch) {
      const _ = r.renderPipes.uniformBatch.getUboResource(m);
      this._globalFilterBindGroup.setResource(_, 0);
    } else
      this._globalFilterBindGroup.setResource(m, 0);
    this._globalFilterBindGroup.setResource(e.source, 1), this._globalFilterBindGroup.setResource(e.source.style, 2), t.groups[0] = this._globalFilterBindGroup, r.encoder.draw({
      geometry: q,
      shader: t,
      state: t._state,
      topology: "triangle-list"
    }), r.type === M.WEBGL && r.renderTarget.finishRenderPass();
  }
  _getFilterData() {
    return {
      skip: !1,
      inputTexture: null,
      bounds: new A(),
      container: null,
      filterEffect: null,
      blendRequired: !1,
      previousRenderSurface: null
    };
  }
  /**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */
  calculateSpriteMatrix(t, e) {
    const o = this._activeFilterData, i = t.set(
      o.inputTexture._source.width,
      0,
      0,
      o.inputTexture._source.height,
      o.bounds.minX,
      o.bounds.minY
    ), r = e.worldTransform.copyTo(G.shared), l = e.renderGroup || e.parentRenderGroup;
    return l && l.cacheToLocalTransform && r.prepend(l.cacheToLocalTransform), r.invert(), i.prepend(r), i.scale(
      1 / e.texture.frame.width,
      1 / e.texture.frame.height
    ), i.translate(e.anchor.x, e.anchor.y), i;
  }
}
D.extension = {
  type: [
    R.WebGLSystem,
    R.WebGPUSystem
  ],
  name: "filter"
};
export {
  D as FilterSystem
};
//# sourceMappingURL=index392.js.map
