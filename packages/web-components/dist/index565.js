import { Color as I } from "./index377.js";
import { Rectangle as R } from "./index407.js";
import { CanvasPool as T } from "./index473.js";
import { ImageSource as K } from "./index325.js";
import { Texture as w } from "./index360.js";
import { deprecation as X, v8_0_0 as Y } from "./index477.js";
import { CanvasTextMetrics as k } from "./index570.js";
import { fontStringFromTextStyle as v } from "./index571.js";
import { getCanvasFillStyle as b } from "./index572.js";
import { TextStyle as W } from "./index564.js";
import { AbstractBitmapFont as G } from "./index558.js";
import { resolveCharacters as $ } from "./index567.js";
const M = class O extends G {
  /**
   * @param options - The options for the dynamic bitmap font.
   */
  constructor(e) {
    super(), this.resolution = 1, this.pages = [], this._padding = 0, this._measureCache = /* @__PURE__ */ Object.create(null), this._currentChars = [], this._currentX = 0, this._currentY = 0, this._currentPageIndex = -1, this._skipKerning = !1;
    const t = { ...O.defaultOptions, ...e };
    this._textureSize = t.textureSize, this._mipmap = t.mipmap;
    const i = t.style.clone();
    t.overrideFill && (i._fill.color = 16777215, i._fill.alpha = 1, i._fill.texture = w.WHITE, i._fill.fill = null), this.applyFillAsTint = t.overrideFill;
    const r = i.fontSize;
    i.fontSize = this.baseMeasurementFontSize;
    const n = v(i);
    t.overrideSize ? i._stroke && (i._stroke.width *= this.baseRenderedFontSize / r) : i.fontSize = this.baseRenderedFontSize = r, this._style = i, this._skipKerning = t.skipKerning ?? !1, this.resolution = t.resolution ?? 1, this._padding = t.padding ?? 4, this.fontMetrics = k.measureFont(n), this.lineHeight = i.lineHeight || this.fontMetrics.fontSize || i.fontSize;
  }
  ensureCharacters(e) {
    var C, z;
    const t = $(e).filter((p) => !this._currentChars.includes(p)).filter((p, d, f) => f.indexOf(p) === d);
    if (!t.length)
      return;
    this._currentChars = [...this._currentChars, ...t];
    let i;
    this._currentPageIndex === -1 ? i = this._nextPage() : i = this.pages[this._currentPageIndex];
    let { canvas: r, context: n } = i.canvasAndContext, s = i.texture.source;
    const a = this._style;
    let h = this._currentX, o = this._currentY;
    const l = this.baseRenderedFontSize / this.baseMeasurementFontSize, c = this._padding * l;
    let u = 0, m = !1;
    const _ = r.width / this.resolution, A = r.height / this.resolution;
    for (let p = 0; p < t.length; p++) {
      const d = t[p], f = k.measureText(d, a, r, !1);
      f.lineHeight = f.height;
      const F = f.width * l, P = Math.ceil((a.fontStyle === "italic" ? 2 : 1) * F), B = f.height * l, x = P + c * 2, S = B + c * 2;
      if (m = !1, d !== `
` && d !== "\r" && d !== "	" && d !== " " && (m = !0, u = Math.ceil(Math.max(S, u))), h + x > _ && (o += u, u = S, h = 0, o + u > A)) {
        s.update();
        const g = this._nextPage();
        r = g.canvasAndContext.canvas, n = g.canvasAndContext.context, s = g.texture.source, o = 0;
      }
      const H = F / l - (((C = a.dropShadow) == null ? void 0 : C.distance) ?? 0) - (((z = a._stroke) == null ? void 0 : z.width) ?? 0);
      if (this.chars[d] = {
        id: d.codePointAt(0),
        xOffset: -this._padding,
        yOffset: -this._padding,
        xAdvance: H,
        kerning: {}
      }, m) {
        this._drawGlyph(
          n,
          f,
          h + c,
          o + c,
          l,
          a
        );
        const g = s.width * l, y = s.height * l, D = new R(
          h / g * s.width,
          o / y * s.height,
          x / g * s.width,
          S / y * s.height
        );
        this.chars[d].texture = new w({
          source: s,
          frame: D
        }), h += Math.ceil(x);
      }
    }
    s.update(), this._currentX = h, this._currentY = o, this._skipKerning && this._applyKerning(t, n);
  }
  /**
   * @deprecated since 8.0.0
   * The map of base page textures (i.e., sheets of glyphs).
   */
  get pageTextures() {
    return X(Y, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages;
  }
  _applyKerning(e, t) {
    const i = this._measureCache;
    for (let r = 0; r < e.length; r++) {
      const n = e[r];
      for (let s = 0; s < this._currentChars.length; s++) {
        const a = this._currentChars[s];
        let h = i[n];
        h || (h = i[n] = t.measureText(n).width);
        let o = i[a];
        o || (o = i[a] = t.measureText(a).width);
        let l = t.measureText(n + a).width, c = l - (h + o);
        c && (this.chars[n].kerning[a] = c), l = t.measureText(n + a).width, c = l - (h + o), c && (this.chars[a].kerning[n] = c);
      }
    }
  }
  _nextPage() {
    this._currentPageIndex++;
    const e = this.resolution, t = T.getOptimalCanvasAndContext(
      this._textureSize,
      this._textureSize,
      e
    );
    this._setupContext(t.context, this._style, e);
    const i = e * (this.baseRenderedFontSize / this.baseMeasurementFontSize), r = new w({
      source: new K({
        resource: t.canvas,
        resolution: i,
        alphaMode: "premultiply-alpha-on-upload",
        autoGenerateMipmaps: this._mipmap
      })
    }), n = {
      canvasAndContext: t,
      texture: r
    };
    return this.pages[this._currentPageIndex] = n, n;
  }
  // canvas style!
  _setupContext(e, t, i) {
    t.fontSize = this.baseRenderedFontSize, e.scale(i, i), e.font = v(t), t.fontSize = this.baseMeasurementFontSize, e.textBaseline = t.textBaseline;
    const r = t._stroke, n = (r == null ? void 0 : r.width) ?? 0;
    if (r && (e.lineWidth = n, e.lineJoin = r.join, e.miterLimit = r.miterLimit, e.strokeStyle = b(r, e)), t._fill && (e.fillStyle = b(t._fill, e)), t.dropShadow) {
      const s = t.dropShadow, a = I.shared.setValue(s.color).toArray(), h = s.blur * i, o = s.distance * i;
      e.shadowColor = `rgba(${a[0] * 255},${a[1] * 255},${a[2] * 255},${s.alpha})`, e.shadowBlur = h, e.shadowOffsetX = Math.cos(s.angle) * o, e.shadowOffsetY = Math.sin(s.angle) * o;
    } else
      e.shadowColor = "black", e.shadowBlur = 0, e.shadowOffsetX = 0, e.shadowOffsetY = 0;
  }
  _drawGlyph(e, t, i, r, n, s) {
    const a = t.text, h = t.fontProperties, o = s._stroke, l = ((o == null ? void 0 : o.width) ?? 0) * n, c = i + l / 2, u = r - l / 2, m = h.descent * n, _ = t.lineHeight * n;
    s.stroke && l && e.strokeText(a, c, u + _ - m), s._fill && e.fillText(a, c, u + _ - m);
  }
  destroy() {
    super.destroy();
    for (let e = 0; e < this.pages.length; e++) {
      const { canvasAndContext: t, texture: i } = this.pages[e];
      T.returnCanvasAndContext(t), i.destroy(!0);
    }
    this.pages = null;
  }
};
M.defaultOptions = {
  textureSize: 512,
  style: new W(),
  mipmap: !0
};
let it = M;
export {
  it as DynamicBitmapFont
};
//# sourceMappingURL=index565.js.map
