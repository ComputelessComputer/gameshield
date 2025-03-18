import "./index23.js";
import { Color as X } from "./index24.js";
import { BLEND_MODES as A } from "./index164.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import { ObservablePoint as G } from "./index32.js";
import { Point as I } from "./index33.js";
import "./index34.js";
import "./index35.js";
import { settings as U } from "./index153.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import { removeItems as Z } from "./index141.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import { Program as J } from "./index49.js";
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
import { Texture as T } from "./index131.js";
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
import "./index102.js";
import { Container as K } from "./index103.js";
import "./index104.js";
import { Mesh as Y } from "./index113.js";
import { MeshGeometry as Q } from "./index256.js";
import { MeshMaterial as k } from "./index257.js";
import { BitmapFont as y } from "./index124.js";
import tt from "./index291.js";
import et from "./index292.js";
import "./index121.js";
import "./index122.js";
import "./index123.js";
import { extractCharCode as it } from "./index289.js";
import { splitTextToCharacters as st } from "./index293.js";
const j = [], V = [], $ = [], rt = class q extends K {
  /**
   * @param text - A string that you would like the text to display.
   * @param style - The style parameters.
   * @param {string} style.fontName - The installed BitmapFont name.
   * @param {number} [style.fontSize] - The size of the font in pixels, e.g. 24. If undefined,
   *.     this will default to the BitmapFont size.
   * @param {string} [style.align='left'] - Alignment for multiline text ('left', 'center', 'right' or 'justify'),
   *      does not affect single line text.
   * @param {PIXI.ColorSource} [style.tint=0xFFFFFF] - The tint color.
   * @param {number} [style.letterSpacing=0] - The amount of spacing between letters.
   * @param {number} [style.maxWidth=0] - The max width of the text before line wrapping.
   */
  constructor(t, p = {}) {
    super();
    const { align: l, tint: a, maxWidth: c, letterSpacing: x, fontName: f, fontSize: P } = Object.assign(
      {},
      q.styleDefaults,
      p
    );
    if (!y.available[f])
      throw new Error(`Missing BitmapFont "${f}"`);
    this._activePagesMeshData = [], this._textWidth = 0, this._textHeight = 0, this._align = l, this._tintColor = new X(a), this._font = void 0, this._fontName = f, this._fontSize = P, this.text = t, this._maxWidth = c, this._maxLineHeight = 0, this._letterSpacing = x, this._anchor = new G(() => {
      this.dirty = !0;
    }, this, 0, 0), this._roundPixels = U.ROUND_PIXELS, this.dirty = !0, this._resolution = U.RESOLUTION, this._autoResolution = !0, this._textureCache = {};
  }
  /** Renders text and updates it when needed. This should only be called if the BitmapFont is regenerated. */
  updateText() {
    var R;
    const t = y.available[this._fontName], p = this.fontSize, l = p / t.size, a = new I(), c = [], x = [], f = [], P = this._text.replace(/(?:\r\n|\r)/g, `
`) || " ", C = st(P), w = this._maxWidth * t.size / p, W = t.distanceFieldType === "none" ? j : V;
    let v = null, _ = 0, g = 0, b = 0, S = -1, B = 0, O = 0, z = 0, N = 0;
    for (let i = 0; i < C.length; i++) {
      const e = C[i], n = it(e);
      if (/(?:\s)/.test(e) && (S = i, B = _, N++), e === "\r" || e === `
`) {
        x.push(_), f.push(-1), g = Math.max(g, _), ++b, ++O, a.x = 0, a.y += t.lineHeight, v = null, N = 0;
        continue;
      }
      const s = t.chars[n];
      if (!s)
        continue;
      v && s.kerning[v] && (a.x += s.kerning[v]);
      const h = $.pop() || {
        texture: T.EMPTY,
        line: 0,
        charCode: 0,
        prevSpaces: 0,
        position: new I()
      };
      h.texture = s.texture, h.line = b, h.charCode = n, h.position.x = Math.round(a.x + s.xOffset + this._letterSpacing / 2), h.position.y = Math.round(a.y + s.yOffset), h.prevSpaces = N, c.push(h), _ = h.position.x + Math.max(s.xAdvance - s.xOffset, s.texture.orig.width), a.x += s.xAdvance + this._letterSpacing, z = Math.max(z, s.yOffset + s.texture.height), v = n, S !== -1 && w > 0 && a.x > w && (++O, Z(c, 1 + S - O, 1 + i - S), i = S, S = -1, x.push(B), f.push(c.length > 0 ? c[c.length - 1].prevSpaces : 0), g = Math.max(g, B), b++, a.x = 0, a.y += t.lineHeight, v = null, N = 0);
    }
    const L = C[C.length - 1];
    L !== "\r" && L !== `
` && (/(?:\s)/.test(L) && (_ = B), x.push(_), g = Math.max(g, _), f.push(-1));
    const E = [];
    for (let i = 0; i <= b; i++) {
      let e = 0;
      this._align === "right" ? e = g - x[i] : this._align === "center" ? e = (g - x[i]) / 2 : this._align === "justify" && (e = f[i] < 0 ? 0 : (g - x[i]) / f[i]), E.push(e);
    }
    const H = c.length, M = {}, D = [], F = this._activePagesMeshData;
    W.push(...F);
    for (let i = 0; i < H; i++) {
      const e = c[i].texture, n = e.baseTexture.uid;
      if (!M[n]) {
        let s = W.pop();
        if (!s) {
          const m = new Q();
          let r, d;
          t.distanceFieldType === "none" ? (r = new k(T.EMPTY), d = A.NORMAL) : (r = new k(
            T.EMPTY,
            { program: J.from(et, tt), uniforms: { uFWidth: 0 } }
          ), d = A.NORMAL_NPM);
          const u = new Y(m, r);
          u.blendMode = d, s = {
            index: 0,
            indexCount: 0,
            vertexCount: 0,
            uvsCount: 0,
            total: 0,
            mesh: u,
            vertices: null,
            uvs: null,
            indices: null
          };
        }
        s.index = 0, s.indexCount = 0, s.vertexCount = 0, s.uvsCount = 0, s.total = 0;
        const { _textureCache: h } = this;
        h[n] = h[n] || new T(e.baseTexture), s.mesh.texture = h[n], s.mesh.tint = this._tintColor.value, D.push(s), M[n] = s;
      }
      M[n].total++;
    }
    for (let i = 0; i < F.length; i++)
      D.includes(F[i]) || this.removeChild(F[i].mesh);
    for (let i = 0; i < D.length; i++)
      D[i].mesh.parent !== this && this.addChild(D[i].mesh);
    this._activePagesMeshData = D;
    for (const i in M) {
      const e = M[i], n = e.total;
      if (!(((R = e.indices) == null ? void 0 : R.length) > 6 * n) || e.vertices.length < Y.BATCHABLE_SIZE * 2)
        e.vertices = new Float32Array(4 * 2 * n), e.uvs = new Float32Array(4 * 2 * n), e.indices = new Uint16Array(6 * n);
      else {
        const s = e.total, h = e.vertices;
        for (let m = s * 4 * 2; m < h.length; m++)
          h[m] = 0;
      }
      e.mesh.size = 6 * n;
    }
    for (let i = 0; i < H; i++) {
      const e = c[i];
      let n = e.position.x + E[e.line] * (this._align === "justify" ? e.prevSpaces : 1);
      this._roundPixels && (n = Math.round(n));
      const s = n * l, h = e.position.y * l, m = e.texture, r = M[m.baseTexture.uid], d = m.frame, u = m._uvs, o = r.index++;
      r.indices[o * 6 + 0] = 0 + o * 4, r.indices[o * 6 + 1] = 1 + o * 4, r.indices[o * 6 + 2] = 2 + o * 4, r.indices[o * 6 + 3] = 0 + o * 4, r.indices[o * 6 + 4] = 2 + o * 4, r.indices[o * 6 + 5] = 3 + o * 4, r.vertices[o * 8 + 0] = s, r.vertices[o * 8 + 1] = h, r.vertices[o * 8 + 2] = s + d.width * l, r.vertices[o * 8 + 3] = h, r.vertices[o * 8 + 4] = s + d.width * l, r.vertices[o * 8 + 5] = h + d.height * l, r.vertices[o * 8 + 6] = s, r.vertices[o * 8 + 7] = h + d.height * l, r.uvs[o * 8 + 0] = u.x0, r.uvs[o * 8 + 1] = u.y0, r.uvs[o * 8 + 2] = u.x1, r.uvs[o * 8 + 3] = u.y1, r.uvs[o * 8 + 4] = u.x2, r.uvs[o * 8 + 5] = u.y2, r.uvs[o * 8 + 6] = u.x3, r.uvs[o * 8 + 7] = u.y3;
    }
    this._textWidth = g * l, this._textHeight = (a.y + t.lineHeight) * l;
    for (const i in M) {
      const e = M[i];
      if (this.anchor.x !== 0 || this.anchor.y !== 0) {
        let m = 0;
        const r = this._textWidth * this.anchor.x, d = this._textHeight * this.anchor.y;
        for (let u = 0; u < e.total; u++)
          e.vertices[m++] -= r, e.vertices[m++] -= d, e.vertices[m++] -= r, e.vertices[m++] -= d, e.vertices[m++] -= r, e.vertices[m++] -= d, e.vertices[m++] -= r, e.vertices[m++] -= d;
      }
      this._maxLineHeight = z * l;
      const n = e.mesh.geometry.getBuffer("aVertexPosition"), s = e.mesh.geometry.getBuffer("aTextureCoord"), h = e.mesh.geometry.getIndex();
      n.data = e.vertices, s.data = e.uvs, h.data = e.indices, n.update(), s.update(), h.update();
    }
    for (let i = 0; i < c.length; i++)
      $.push(c[i]);
    this._font = t, this.dirty = !1;
  }
  updateTransform() {
    this.validate(), this.containerUpdateTransform();
  }
  _render(t) {
    this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0);
    const { distanceFieldRange: p, distanceFieldType: l, size: a } = y.available[this._fontName];
    if (l !== "none") {
      const { a: c, b: x, c: f, d: P } = this.worldTransform, C = Math.sqrt(c * c + x * x), w = Math.sqrt(f * f + P * P), W = (Math.abs(C) + Math.abs(w)) / 2, v = this.fontSize / a, _ = t._view.resolution;
      for (const g of this._activePagesMeshData)
        g.mesh.shader.uniforms.uFWidth = W * p * v * _;
    }
    super._render(t);
  }
  /**
   * Validates text before calling parent's getLocalBounds
   * @returns - The rectangular bounding area
   */
  getLocalBounds() {
    return this.validate(), super.getLocalBounds();
  }
  /**
   * Updates text when needed
   * @private
   */
  validate() {
    const t = y.available[this._fontName];
    if (!t)
      throw new Error(`Missing BitmapFont "${this._fontName}"`);
    this._font !== t && (this.dirty = !0), this.dirty && this.updateText();
  }
  /**
   * The tint of the BitmapText object.
   * @default 0xffffff
   */
  get tint() {
    return this._tintColor.value;
  }
  set tint(t) {
    if (this.tint !== t) {
      this._tintColor.setValue(t);
      for (let p = 0; p < this._activePagesMeshData.length; p++)
        this._activePagesMeshData[p].mesh.tint = t;
    }
  }
  /**
   * The alignment of the BitmapText object.
   * @member {string}
   * @default 'left'
   */
  get align() {
    return this._align;
  }
  set align(t) {
    this._align !== t && (this._align = t, this.dirty = !0);
  }
  /** The name of the BitmapFont. */
  get fontName() {
    return this._fontName;
  }
  set fontName(t) {
    if (!y.available[t])
      throw new Error(`Missing BitmapFont "${t}"`);
    this._fontName !== t && (this._fontName = t, this.dirty = !0);
  }
  /** The size of the font to display. */
  get fontSize() {
    return this._fontSize ?? y.available[this._fontName].size;
  }
  set fontSize(t) {
    this._fontSize !== t && (this._fontSize = t, this.dirty = !0);
  }
  /**
   * The anchor sets the origin point of the text.
   *
   * The default is `(0,0)`, this means the text's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the text's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the text's origin point will be the bottom right corner.
   */
  get anchor() {
    return this._anchor;
  }
  set anchor(t) {
    typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t);
  }
  /** The text of the BitmapText object. */
  get text() {
    return this._text;
  }
  set text(t) {
    t = String(t ?? ""), this._text !== t && (this._text = t, this.dirty = !0);
  }
  /**
   * The max width of this bitmap text in pixels. If the text provided is longer than the
   * value provided, line breaks will be automatically inserted in the last whitespace.
   * Disable by setting the value to 0.
   */
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(t) {
    this._maxWidth !== t && (this._maxWidth = t, this.dirty = !0);
  }
  /**
   * The max line height. This is useful when trying to use the total height of the Text,
   * i.e. when trying to vertically align.
   * @readonly
   */
  get maxLineHeight() {
    return this.validate(), this._maxLineHeight;
  }
  /**
   * The width of the overall text, different from fontSize,
   * which is defined in the style object.
   * @readonly
   */
  get textWidth() {
    return this.validate(), this._textWidth;
  }
  /** Additional space between characters. */
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(t) {
    this._letterSpacing !== t && (this._letterSpacing = t, this.dirty = !0);
  }
  /**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
   * @default PIXI.settings.ROUND_PIXELS
   */
  get roundPixels() {
    return this._roundPixels;
  }
  set roundPixels(t) {
    t !== this._roundPixels && (this._roundPixels = t, this.dirty = !0);
  }
  /**
   * The height of the overall text, different from fontSize,
   * which is defined in the style object.
   * @readonly
   */
  get textHeight() {
    return this.validate(), this._textHeight;
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
  destroy(t) {
    const { _textureCache: p } = this, l = y.available[this._fontName].distanceFieldType === "none" ? j : V;
    l.push(...this._activePagesMeshData);
    for (const a of this._activePagesMeshData)
      this.removeChild(a.mesh);
    this._activePagesMeshData = [], l.filter((a) => p[a.mesh.texture.baseTexture.uid]).forEach((a) => {
      a.mesh.texture = T.EMPTY;
    });
    for (const a in p)
      p[a].destroy(), delete p[a];
    this._font = null, this._tintColor = null, this._textureCache = null, super.destroy(t);
  }
};
rt.styleDefaults = {
  align: "left",
  tint: 16777215,
  maxWidth: 0,
  letterSpacing: 0
};
//# sourceMappingURL=index125.js.map
