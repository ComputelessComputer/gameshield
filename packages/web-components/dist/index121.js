import "./index23.js";
import { Color as A } from "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as C } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import { settings as b } from "./index150.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import { deprecation as I } from "./index133.js";
import "./index44.js";
import { sign as M } from "./index283.js";
import "./index45.js";
import { trimCanvas as B } from "./index285.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
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
import { Texture as v } from "./index131.js";
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
import "./index67.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import { Sprite as O } from "./index132.js";
import { TEXT_GRADIENT as P } from "./index284.js";
import { TextMetrics as w } from "./index122.js";
import { TextStyle as R } from "./index123.js";
const E = {
  texture: !0,
  children: !1,
  baseTexture: !0
}, D = class k extends O {
  /**
   * @param text - The string that you would like the text to display
   * @param style - The style parameters
   * @param canvas - The canvas element for drawing text
   */
  constructor(t, e, i) {
    let o = !1;
    i || (i = b.ADAPTER.createCanvas(), o = !0), i.width = 3, i.height = 3;
    const s = v.from(i);
    s.orig = new C(), s.trim = new C(), super(s), this._ownCanvas = o, this.canvas = i, this.context = i.getContext("2d", {
      // required for trimming to work without warnings
      willReadFrequently: !0
    }), this._resolution = k.defaultResolution ?? b.RESOLUTION, this._autoResolution = k.defaultAutoResolution, this._text = null, this._style = null, this._styleListener = null, this._font = "", this.text = t, this.style = e, this.localStyleID = -1;
  }
  /**
   * @see PIXI.TextMetrics.experimentalLetterSpacing
   * @deprecated since 7.1.0
   */
  static get experimentalLetterSpacing() {
    return w.experimentalLetterSpacing;
  }
  static set experimentalLetterSpacing(t) {
    I(
      "7.1.0",
      "Text.experimentalLetterSpacing is deprecated, use TextMetrics.experimentalLetterSpacing"
    ), w.experimentalLetterSpacing = t;
  }
  /**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param respectDirty - Whether to abort updating the text if the Text isn't dirty and the function is called.
   */
  updateText(t) {
    const e = this._style;
    if (this.localStyleID !== e.styleID && (this.dirty = !0, this.localStyleID = e.styleID), !this.dirty && t)
      return;
    this._font = this._style.toFontString();
    const i = this.context, o = w.measureText(this._text || " ", this._style, this._style.wordWrap, this.canvas), s = o.width, d = o.height, l = o.lines, u = o.lineHeight, m = o.lineWidths, n = o.maxLineWidth, h = o.fontProperties;
    this.canvas.width = Math.ceil(Math.ceil(Math.max(1, s) + e.padding * 2) * this._resolution), this.canvas.height = Math.ceil(Math.ceil(Math.max(1, d) + e.padding * 2) * this._resolution), i.scale(this._resolution, this._resolution), i.clearRect(0, 0, this.canvas.width, this.canvas.height), i.font = this._font, i.lineWidth = e.strokeThickness, i.textBaseline = e.textBaseline, i.lineJoin = e.lineJoin, i.miterLimit = e.miterLimit;
    let a, r;
    const p = e.dropShadow ? 2 : 1;
    for (let c = 0; c < p; ++c) {
      const S = e.dropShadow && c === 0, f = S ? Math.ceil(Math.max(1, d) + e.padding * 2) : 0, y = f * this._resolution;
      if (S) {
        i.fillStyle = "black", i.strokeStyle = "black";
        const g = e.dropShadowColor, x = e.dropShadowBlur * this._resolution, _ = e.dropShadowDistance * this._resolution;
        i.shadowColor = A.shared.setValue(g).setAlpha(e.dropShadowAlpha).toRgbaString(), i.shadowBlur = x, i.shadowOffsetX = Math.cos(e.dropShadowAngle) * _, i.shadowOffsetY = Math.sin(e.dropShadowAngle) * _ + y;
      } else
        i.fillStyle = this._generateFillStyle(e, l, o), i.strokeStyle = e.stroke, i.shadowColor = "black", i.shadowBlur = 0, i.shadowOffsetX = 0, i.shadowOffsetY = 0;
      let T = (u - h.fontSize) / 2;
      u - h.fontSize < 0 && (T = 0);
      for (let g = 0; g < l.length; g++)
        a = e.strokeThickness / 2, r = e.strokeThickness / 2 + g * u + h.ascent + T, e.align === "right" ? a += n - m[g] : e.align === "center" && (a += (n - m[g]) / 2), e.stroke && e.strokeThickness && this.drawLetterSpacing(
          l[g],
          a + e.padding,
          r + e.padding - f,
          !0
        ), e.fill && this.drawLetterSpacing(
          l[g],
          a + e.padding,
          r + e.padding - f
        );
    }
    this.updateTexture();
  }
  /**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */
  drawLetterSpacing(t, e, i, o = !1) {
    const s = this._style.letterSpacing;
    let d = !1;
    if (w.experimentalLetterSpacingSupported && (w.experimentalLetterSpacing ? (this.context.letterSpacing = `${s}px`, this.context.textLetterSpacing = `${s}px`, d = !0) : (this.context.letterSpacing = "0px", this.context.textLetterSpacing = "0px")), s === 0 || d) {
      o ? this.context.strokeText(t, e, i) : this.context.fillText(t, e, i);
      return;
    }
    let l = e;
    const u = w.graphemeSegmenter(t);
    let m = this.context.measureText(t).width, n = 0;
    for (let h = 0; h < u.length; ++h) {
      const a = u[h];
      o ? this.context.strokeText(a, l, i) : this.context.fillText(a, l, i);
      let r = "";
      for (let p = h + 1; p < u.length; ++p)
        r += u[p];
      n = this.context.measureText(r).width, l += m - n + s, m = n;
    }
  }
  /** Updates texture size based on canvas size. */
  updateTexture() {
    const t = this.canvas;
    if (this._style.trim) {
      const d = B(t);
      d.data && (t.width = d.width, t.height = d.height, this.context.putImageData(d.data, 0, 0));
    }
    const e = this._texture, i = this._style, o = i.trim ? 0 : i.padding, s = e.baseTexture;
    e.trim.width = e._frame.width = t.width / this._resolution, e.trim.height = e._frame.height = t.height / this._resolution, e.trim.x = -o, e.trim.y = -o, e.orig.width = e._frame.width - o * 2, e.orig.height = e._frame.height - o * 2, this._onTextureUpdate(), s.setRealSize(t.width, t.height, this._resolution), e.updateUvs(), this.dirty = !1;
  }
  /**
   * Renders the object using the WebGL renderer
   * @param renderer - The renderer
   */
  _render(t) {
    this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0), this.updateText(!0), super._render(t);
  }
  /** Updates the transform on all children of this container for rendering. */
  updateTransform() {
    this.updateText(!0), super.updateTransform();
  }
  getBounds(t, e) {
    return this.updateText(!0), this._textureID === -1 && (t = !1), super.getBounds(t, e);
  }
  /**
   * Gets the local bounds of the text object.
   * @param rect - The output rectangle.
   * @returns The bounds.
   */
  getLocalBounds(t) {
    return this.updateText(!0), super.getLocalBounds.call(this, t);
  }
  /** Calculates the bounds of the Text as a rectangle. The bounds calculation takes the worldTransform into account. */
  _calculateBounds() {
    this.calculateVertices(), this._bounds.addQuad(this.vertexData);
  }
  /**
   * Generates the fill style. Can automatically generate a gradient based on the fill style being an array
   * @param style - The style.
   * @param lines - The lines of text.
   * @param metrics
   * @returns The fill style
   */
  _generateFillStyle(t, e, i) {
    const o = t.fill;
    if (Array.isArray(o)) {
      if (o.length === 1)
        return o[0];
    } else
      return o;
    let s;
    const d = t.dropShadow ? t.dropShadowDistance : 0, l = t.padding || 0, u = this.canvas.width / this._resolution - d - l * 2, m = this.canvas.height / this._resolution - d - l * 2, n = o.slice(), h = t.fillGradientStops.slice();
    if (!h.length) {
      const a = n.length + 1;
      for (let r = 1; r < a; ++r)
        h.push(r / a);
    }
    if (n.unshift(o[0]), h.unshift(0), n.push(o[o.length - 1]), h.push(1), t.fillGradientType === P.LINEAR_VERTICAL) {
      s = this.context.createLinearGradient(u / 2, l, u / 2, m + l);
      const a = i.fontProperties.fontSize + t.strokeThickness;
      for (let r = 0; r < e.length; r++) {
        const p = i.lineHeight * (r - 1) + a, c = i.lineHeight * r;
        let S = c;
        r > 0 && p > c && (S = (c + p) / 2);
        const f = c + a, y = i.lineHeight * (r + 1);
        let T = f;
        r + 1 < e.length && y < f && (T = (f + y) / 2);
        const g = (T - S) / m;
        for (let x = 0; x < n.length; x++) {
          let _ = 0;
          typeof h[x] == "number" ? _ = h[x] : _ = x / n.length;
          let L = Math.min(1, Math.max(
            0,
            S / m + _ * g
          ));
          L = Number(L.toFixed(5)), s.addColorStop(L, n[x]);
        }
      }
    } else {
      s = this.context.createLinearGradient(l, m / 2, u + l, m / 2);
      const a = n.length + 1;
      let r = 1;
      for (let p = 0; p < n.length; p++) {
        let c;
        typeof h[p] == "number" ? c = h[p] : c = r / a, s.addColorStop(c, n[p]), r++;
      }
    }
    return s;
  }
  /**
   * Destroys this text object.
   *
   * Note* Unlike a Sprite, a Text object will automatically destroy its baseTexture and texture as
   * the majority of the time the texture will not be shared with any other Sprites.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their
   *  destroy method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=true] - Should it destroy the current texture of the sprite as well
   * @param {boolean} [options.baseTexture=true] - Should it destroy the base texture of the sprite as well
   */
  destroy(t) {
    typeof t == "boolean" && (t = { children: t }), t = Object.assign({}, E, t), super.destroy(t), this._ownCanvas && (this.canvas.height = this.canvas.width = 0), this.context = null, this.canvas = null, this._style = null;
  }
  /** The width of the Text, setting this will actually modify the scale to achieve the value set. */
  get width() {
    return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(t) {
    this.updateText(!0);
    const e = M(this.scale.x) || 1;
    this.scale.x = e * t / this._texture.orig.width, this._width = t;
  }
  /** The height of the Text, setting this will actually modify the scale to achieve the value set. */
  get height() {
    return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(t) {
    this.updateText(!0);
    const e = M(this.scale.y) || 1;
    this.scale.y = e * t / this._texture.orig.height, this._height = t;
  }
  /**
   * Set the style of the text.
   *
   * Set up an event listener to listen for changes on the style object and mark the text as dirty.
   *
   * If setting the `style` can also be partial {@link PIXI.ITextStyle}.
   */
  get style() {
    return this._style;
  }
  set style(t) {
    t = t || {}, t instanceof R ? this._style = t : this._style = new R(t), this.localStyleID = -1, this.dirty = !0;
  }
  /** Set the copy for the text object. To split a line you can use '\n'. */
  get text() {
    return this._text;
  }
  set text(t) {
    t = String(t ?? ""), this._text !== t && (this._text = t, this.dirty = !0);
  }
  /**
   * The resolution / device pixel ratio of the canvas.
   *
   * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
   * @default 1
   */
  get resolution() {
    return this._resolution;
  }
  set resolution(t) {
    this._autoResolution = !1, this._resolution !== t && (this._resolution = t, this.dirty = !0);
  }
};
D.defaultAutoResolution = !0;
let Qt = D;
export {
  Qt as Text
};
//# sourceMappingURL=index121.js.map
