import { Color as Y } from "./index377.js";
import { ExtensionType as _ } from "./index153.js";
import { nextPow2 as O } from "./index403.js";
import { CanvasPool as v } from "./index473.js";
import { TexturePool as E } from "./index397.js";
import { getCanvasBoundingBox as G } from "./index593.js";
import { deprecation as H } from "./index477.js";
import { TextStyle as B } from "./index564.js";
import { getPo2TextureFromSource as K } from "./index581.js";
import { CanvasTextMetrics as g } from "./index570.js";
import { fontStringFromTextStyle as X } from "./index571.js";
import { getCanvasFillStyle as R } from "./index572.js";
class $ {
  constructor(t) {
    this._activeTextures = {}, this._renderer = t;
  }
  getTextureSize(t, e, n) {
    const i = g.measureText(t || " ", n);
    let a = Math.ceil(Math.ceil(Math.max(1, i.width) + n.padding * 2) * e), r = Math.ceil(Math.ceil(Math.max(1, i.height) + n.padding * 2) * e);
    return a = Math.ceil(a - 1e-6), r = Math.ceil(r - 1e-6), a = O(a), r = O(r), { width: a, height: r };
  }
  getTexture(t, e, n, i) {
    typeof t == "string" && (H("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"), t = {
      text: t,
      style: n,
      resolution: e
    }), t.style instanceof B || (t.style = new B(t.style));
    const { texture: a, canvasAndContext: r } = this.createTextureAndCanvas(
      t
    );
    return this._renderer.texture.initSource(a._source), v.returnCanvasAndContext(r), a;
  }
  createTextureAndCanvas(t) {
    const { text: e, style: n } = t, i = t.resolution ?? this._renderer.resolution, a = g.measureText(e || " ", n), r = Math.ceil(Math.ceil(Math.max(1, a.width) + n.padding * 2) * i), c = Math.ceil(Math.ceil(Math.max(1, a.height) + n.padding * 2) * i), o = v.getOptimalCanvasAndContext(r, c), { canvas: d } = o;
    this.renderTextToCanvas(e, n, i, o);
    const h = K(d, r, c, i);
    if (n.trim) {
      const l = G(d, i);
      h.frame.copyFrom(l), h.updateUvs();
    }
    return { texture: h, canvasAndContext: o };
  }
  getManagedTexture(t) {
    t._resolution = t._autoResolution ? this._renderer.resolution : t.resolution;
    const e = t._getKey();
    if (this._activeTextures[e])
      return this._increaseReferenceCount(e), this._activeTextures[e].texture;
    const { texture: n, canvasAndContext: i } = this.createTextureAndCanvas(t);
    return this._activeTextures[e] = {
      canvasAndContext: i,
      texture: n,
      usageCount: 1
    }, n;
  }
  _increaseReferenceCount(t) {
    this._activeTextures[t].usageCount++;
  }
  /**
   * Returns a texture that was created wit the above `getTexture` function.
   * Handy if you are done with a texture and want to return it to the pool.
   * @param texture - The texture to be returned.
   */
  returnTexture(t) {
    const e = t.source;
    e.resource = null, e.uploadMethodId = "unknown", e.alphaMode = "no-premultiply-alpha", E.returnTexture(t);
  }
  decreaseReferenceCount(t) {
    const e = this._activeTextures[t];
    e.usageCount--, e.usageCount === 0 && (v.returnCanvasAndContext(e.canvasAndContext), this.returnTexture(e.texture), this._activeTextures[t] = null);
  }
  getReferenceCount(t) {
    return this._activeTextures[t].usageCount;
  }
  /**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param text
   * @param style
   * @param resolution
   * @param canvasAndContext
   */
  renderTextToCanvas(t, e, n, i) {
    var w, M, k, L;
    const { canvas: a, context: r } = i, c = X(e), o = g.measureText(t || " ", e), d = o.lines, h = o.lineHeight, l = o.lineWidths, T = o.maxLineWidth, p = o.fontProperties, f = a.height;
    if (r.resetTransform(), r.scale(n, n), r.textBaseline = e.textBaseline, (w = e._stroke) != null && w.width) {
      const x = e._stroke;
      r.lineWidth = x.width, r.miterLimit = x.miterLimit, r.lineJoin = x.join, r.lineCap = x.cap;
    }
    r.font = c;
    let u, m;
    const S = e.dropShadow ? 2 : 1;
    for (let x = 0; x < S; ++x) {
      const P = e.dropShadow && x === 0, C = P ? Math.ceil(Math.max(1, f) + e.padding * 2) : 0, F = C * n;
      if (P) {
        r.fillStyle = "black", r.strokeStyle = "black";
        const s = e.dropShadow, j = s.color, z = s.alpha;
        r.shadowColor = Y.shared.setValue(j).setAlpha(z).toRgbaString();
        const U = s.blur * n, b = s.distance * n;
        r.shadowBlur = U, r.shadowOffsetX = Math.cos(s.angle) * b, r.shadowOffsetY = Math.sin(s.angle) * b + F;
      } else {
        if (r.fillStyle = e._fill ? R(e._fill, r, o) : null, (M = e._stroke) != null && M.width) {
          const s = e._stroke.width * e._stroke.alignment;
          r.strokeStyle = R(e._stroke, r, o, s);
        }
        r.shadowColor = "black";
      }
      let A = (h - p.fontSize) / 2;
      h - p.fontSize < 0 && (A = 0);
      const W = ((k = e._stroke) == null ? void 0 : k.width) ?? 0;
      for (let s = 0; s < d.length; s++)
        u = W / 2, m = W / 2 + s * h + p.ascent + A, e.align === "right" ? u += T - l[s] : e.align === "center" && (u += (T - l[s]) / 2), (L = e._stroke) != null && L.width && this._drawLetterSpacing(
          d[s],
          e,
          i,
          u + e.padding,
          m + e.padding - C,
          !0
        ), e._fill !== void 0 && this._drawLetterSpacing(
          d[s],
          e,
          i,
          u + e.padding,
          m + e.padding - C
        );
    }
  }
  /**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param style
   * @param canvasAndContext
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */
  _drawLetterSpacing(t, e, n, i, a, r = !1) {
    const { context: c } = n, o = e.letterSpacing;
    let d = !1;
    if (g.experimentalLetterSpacingSupported && (g.experimentalLetterSpacing ? (c.letterSpacing = `${o}px`, c.textLetterSpacing = `${o}px`, d = !0) : (c.letterSpacing = "0px", c.textLetterSpacing = "0px")), o === 0 || d) {
      r ? c.strokeText(t, i, a) : c.fillText(t, i, a);
      return;
    }
    let h = i;
    const l = g.graphemeSegmenter(t);
    let T = c.measureText(t).width, p = 0;
    for (let f = 0; f < l.length; ++f) {
      const u = l[f];
      r ? c.strokeText(u, h, a) : c.fillText(u, h, a);
      let m = "";
      for (let S = f + 1; S < l.length; ++S)
        m += l[S];
      p = c.measureText(m).width, h += T - p + o, T = p;
    }
  }
  destroy() {
    this._activeTextures = null;
  }
}
$.extension = {
  type: [
    _.WebGLSystem,
    _.WebGPUSystem,
    _.CanvasSystem
  ],
  name: "canvasText"
};
export {
  $ as CanvasTextSystem
};
//# sourceMappingURL=index592.js.map
