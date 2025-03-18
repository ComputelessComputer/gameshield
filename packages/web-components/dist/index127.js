import "./index23.js";
import "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as g } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import { settings as c } from "./index145.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
import { sign as _ } from "./index276.js";
import "./index45.js";
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
import { Texture as x } from "./index131.js";
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
import { Sprite as y } from "./index132.js";
import "./index121.js";
import "./index122.js";
import { TextStyle as w } from "./index123.js";
import { HTMLTextStyle as u } from "./index128.js";
const d = class l extends y {
  /**
   * @param {string} [text] - Text contents
   * @param {PIXI.HTMLTextStyle|PIXI.TextStyle|PIXI.ITextStyle} [style] - Style setting to use.
   *        Strongly recommend using an HTMLTextStyle object. Providing a PIXI.TextStyle
   *        will convert the TextStyle to an HTMLTextStyle and will no longer be linked.
   */
  constructor(t = "", e = {}) {
    super(x.EMPTY), this._text = null, this._style = null, this._autoResolution = !0, this.localStyleID = -1, this.dirty = !1, this._updateID = 0, this.ownsStyle = !1;
    const s = new Image(), i = x.from(s, {
      scaleMode: c.SCALE_MODE,
      resourceOptions: {
        autoLoad: !1
      }
    });
    i.orig = new g(), i.trim = new g(), this.texture = i;
    const o = "http://www.w3.org/2000/svg", h = "http://www.w3.org/1999/xhtml", n = document.createElementNS(o, "svg"), r = document.createElementNS(o, "foreignObject"), a = document.createElementNS(h, "div"), m = document.createElementNS(h, "style");
    r.setAttribute("width", "10000"), r.setAttribute("height", "10000"), r.style.overflow = "hidden", n.appendChild(r), this.maxWidth = l.defaultMaxWidth, this.maxHeight = l.defaultMaxHeight, this._domElement = a, this._styleElement = m, this._svgRoot = n, this._foreignObject = r, this._foreignObject.appendChild(m), this._foreignObject.appendChild(a), this._image = s, this._loadImage = new Image(), this._autoResolution = l.defaultAutoResolution, this._resolution = l.defaultResolution ?? c.RESOLUTION, this.text = t, this.style = e;
  }
  /**
   * Calculate the size of the output text without actually drawing it.
   * This includes the `padding` in the `style` object.
   * This can be used as a fast-pass to do things like text-fitting.
   * @param {object} [overrides] - Overrides for the text, style, and resolution.
   * @param {string} [overrides.text] - The text to measure, if not specified, the current text is used.
   * @param {PIXI.HTMLTextStyle} [overrides.style] - The style to measure, if not specified, the current style is used.
   * @param {number} [overrides.resolution] - The resolution to measure, if not specified, the current resolution is used.
   * @returns {PIXI.ISize} Width and height of the measured text.
   */
  measureText(t) {
    var m, p;
    const { text: e, style: s, resolution: i } = Object.assign({
      text: this._text,
      style: this._style,
      resolution: this._resolution
    }, t);
    Object.assign(this._domElement, {
      innerHTML: e,
      style: s.toCSS(i)
    }), this._styleElement.textContent = s.toGlobalCSS(), document.body.appendChild(this._svgRoot);
    const o = this._domElement.getBoundingClientRect();
    this._svgRoot.remove();
    const { width: h, height: n } = o;
    (h > this.maxWidth || n > this.maxHeight) && console.warn("[HTMLText] Large expanse of text, increase HTMLText.maxWidth or HTMLText.maxHeight property.");
    const r = Math.min(this.maxWidth, Math.ceil(h)), a = Math.min(this.maxHeight, Math.ceil(n));
    return this._svgRoot.setAttribute("width", r.toString()), this._svgRoot.setAttribute("height", a.toString()), e !== this._text && (this._domElement.innerHTML = this._text), s !== this._style && (Object.assign(this._domElement, { style: (m = this._style) == null ? void 0 : m.toCSS(i) }), this._styleElement.textContent = (p = this._style) == null ? void 0 : p.toGlobalCSS()), {
      width: r + s.padding * 2,
      height: a + s.padding * 2
    };
  }
  /**
   * Manually refresh the text.
   * @public
   * @param {boolean} respectDirty - Whether to abort updating the
   *        text if the Text isn't dirty and the function is called.
   */
  async updateText(t = !0) {
    const { style: e, _image: s, _loadImage: i } = this;
    if (this.localStyleID !== e.styleID && (this.dirty = !0, this.localStyleID = e.styleID), !this.dirty && t)
      return;
    const { width: o, height: h } = this.measureText();
    s.width = i.width = Math.ceil(Math.max(1, o)), s.height = i.height = Math.ceil(Math.max(1, h)), this._updateID++;
    const n = this._updateID;
    await new Promise((r) => {
      i.onload = async () => {
        if (n < this._updateID) {
          r();
          return;
        }
        await e.onBeforeDraw(), s.src = i.src, i.onload = null, i.src = "", this.updateTexture(), r();
      };
      const a = new XMLSerializer().serializeToString(this._svgRoot);
      i.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(a)}`;
    });
  }
  /** The raw image element that is rendered under-the-hood. */
  get source() {
    return this._image;
  }
  /**
   * Update the texture resource.
   * @private
   */
  updateTexture() {
    const { style: t, texture: e, _image: s, resolution: i } = this, { padding: o } = t, { baseTexture: h } = e;
    e.trim.width = e._frame.width = s.width / i, e.trim.height = e._frame.height = s.height / i, e.trim.x = -o, e.trim.y = -o, e.orig.width = e._frame.width - o * 2, e.orig.height = e._frame.height - o * 2, this._onTextureUpdate(), h.setRealSize(s.width, s.height, i), this.dirty = !1;
  }
  /**
   * Renders the object using the WebGL renderer
   * @param {PIXI.Renderer} renderer - The renderer
   * @private
   */
  _render(t) {
    this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0), this.updateText(!0), super._render(t);
  }
  /**
   * Renders the object using the Canvas Renderer.
   * @private
   * @param {PIXI.CanvasRenderer} renderer - The renderer
   */
  _renderCanvas(t) {
    this._autoResolution && this._resolution !== t.resolution && (this._resolution = t.resolution, this.dirty = !0), this.updateText(!0), super._renderCanvas(t);
  }
  /**
   * Get the local bounds.
   * @param {PIXI.Rectangle} rect - Input rectangle.
   * @returns {PIXI.Rectangle} Local bounds
   */
  getLocalBounds(t) {
    return this.updateText(!0), super.getLocalBounds(t);
  }
  _calculateBounds() {
    this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData);
  }
  /**
   * Handle dirty style changes
   * @private
   */
  _onStyleChange() {
    this.dirty = !0;
  }
  /**
   * Destroy this Text object. Don't use after calling.
   * @param {boolean|object} options - Same as Sprite destroy options.
   */
  destroy(t) {
    var s, i, o, h, n;
    typeof t == "boolean" && (t = { children: t }), t = Object.assign({}, l.defaultDestroyOptions, t), super.destroy(t);
    const e = null;
    this.ownsStyle && ((s = this._style) == null || s.cleanFonts()), this._style = e, (i = this._svgRoot) == null || i.remove(), this._svgRoot = e, (o = this._domElement) == null || o.remove(), this._domElement = e, (h = this._foreignObject) == null || h.remove(), this._foreignObject = e, (n = this._styleElement) == null || n.remove(), this._styleElement = e, this._loadImage.src = "", this._loadImage.onload = null, this._loadImage = e, this._image.src = "", this._image = e;
  }
  /**
   * Get the width in pixels.
   * @member {number}
   */
  get width() {
    return this.updateText(!0), Math.abs(this.scale.x) * this._image.width / this.resolution;
  }
  set width(t) {
    this.updateText(!0);
    const e = _(this.scale.x) || 1;
    this.scale.x = e * t / this._image.width / this.resolution, this._width = t;
  }
  /**
   * Get the height in pixels.
   * @member {number}
   */
  get height() {
    return this.updateText(!0), Math.abs(this.scale.y) * this._image.height / this.resolution;
  }
  set height(t) {
    this.updateText(!0);
    const e = _(this.scale.y) || 1;
    this.scale.y = e * t / this._image.height / this.resolution, this._height = t;
  }
  /** The base style to render with text. */
  get style() {
    return this._style;
  }
  set style(t) {
    this._style !== t && (t = t || {}, t instanceof u ? (this.ownsStyle = !1, this._style = t) : t instanceof w ? (console.warn("[HTMLText] Cloning TextStyle, if this is not what you want, use HTMLTextStyle"), this.ownsStyle = !0, this._style = u.from(t)) : (this.ownsStyle = !0, this._style = new u(t)), this.localStyleID = -1, this.dirty = !0);
  }
  /**
   * Contents of text. This can be HTML text and include tags.
   * @example
   * const text = new HTMLText('This is a <em>styled</em> text!');
   * @member {string}
   */
  get text() {
    return this._text;
  }
  set text(t) {
    t = String(t === "" || t === null || t === void 0 ? " " : t), t = this.sanitiseText(t), this._text !== t && (this._text = t, this.dirty = !0);
  }
  /**
   * The resolution / device pixel ratio of the canvas.
   * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
   * @member {number}
   * @default 1
   */
  get resolution() {
    return this._resolution;
  }
  set resolution(t) {
    this._autoResolution = !1, this._resolution !== t && (this._resolution = t, this.dirty = !0);
  }
  /**
   * Sanitise text - replace `<br>` with `<br/>`, `&nbsp;` with `&#160;`
   * @param text
   * @see https://www.sitepoint.com/community/t/xhtml-1-0-transitional-xml-parsing-error-entity-nbsp-not-defined/3392/3
   */
  sanitiseText(t) {
    return t.replace(/<br>/gi, "<br/>").replace(/<hr>/gi, "<hr/>").replace(/&nbsp;/gi, "&#160;");
  }
};
d.defaultDestroyOptions = {
  texture: !0,
  children: !1,
  baseTexture: !0
}, /** Default maxWidth, set at construction */
d.defaultMaxWidth = 2024, /** Default maxHeight, set at construction */
d.defaultMaxHeight = 2024, /** Default autoResolution for all HTMLText objects */
d.defaultAutoResolution = !0;
//# sourceMappingURL=index127.js.map
