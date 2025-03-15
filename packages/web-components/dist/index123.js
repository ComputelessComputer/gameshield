import { TEXT_GRADIENT as p } from "./index284.js";
import "./index23.js";
import { Color as a } from "./index24.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import "./index36.js";
import "./index37.js";
import "./index38.js";
import "./index39.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index44.js";
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
import "./index67.js";
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
import "./index79.js";
import "./index80.js";
import "./index81.js";
const d = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
], l = class o {
  /**
   * @param style - TextStyle properties to be set on the text. See {@link PIXI.TextStyle.defaultStyle}
   *       for the default values.
   */
  constructor(t) {
    this.styleID = 0, this.reset(), n(this, t, t);
  }
  /**
   * Creates a new TextStyle object with the same values as this one.
   * Note that the only the properties of the object are cloned.
   *
   * @return New cloned TextStyle object
   */
  clone() {
    const t = {};
    return n(t, this, o.defaultStyle), new o(t);
  }
  /** Resets all properties to the defaults specified in TextStyle.prototype._default */
  reset() {
    n(this, o.defaultStyle, o.defaultStyle);
  }
  /**
   * Alignment for multiline text, does not affect single line text.
   *
   * @member {'left'|'center'|'right'|'justify'}
   */
  get align() {
    return this._align;
  }
  set align(t) {
    this._align !== t && (this._align = t, this.styleID++);
  }
  /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(t) {
    this._breakWords !== t && (this._breakWords = t, this.styleID++);
  }
  /** Set a drop shadow for the text. */
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(t) {
    this._dropShadow !== t && (this._dropShadow = t, this.styleID++);
  }
  /** Set alpha for the drop shadow. */
  get dropShadowAlpha() {
    return this._dropShadowAlpha;
  }
  set dropShadowAlpha(t) {
    this._dropShadowAlpha !== t && (this._dropShadowAlpha = t, this.styleID++);
  }
  /** Set a angle of the drop shadow. */
  get dropShadowAngle() {
    return this._dropShadowAngle;
  }
  set dropShadowAngle(t) {
    this._dropShadowAngle !== t && (this._dropShadowAngle = t, this.styleID++);
  }
  /** Set a shadow blur radius. */
  get dropShadowBlur() {
    return this._dropShadowBlur;
  }
  set dropShadowBlur(t) {
    this._dropShadowBlur !== t && (this._dropShadowBlur = t, this.styleID++);
  }
  /** A fill style to be used on the dropshadow e.g., 'red', '#00FF00'. */
  get dropShadowColor() {
    return this._dropShadowColor;
  }
  set dropShadowColor(t) {
    const i = h(t);
    this._dropShadowColor !== i && (this._dropShadowColor = i, this.styleID++);
  }
  /** Set a distance of the drop shadow. */
  get dropShadowDistance() {
    return this._dropShadowDistance;
  }
  set dropShadowDistance(t) {
    this._dropShadowDistance !== t && (this._dropShadowDistance = t, this.styleID++);
  }
  /**
   * A canvas fillstyle that will be used on the text e.g., 'red', '#00FF00'.
   *
   * Can be an array to create a gradient e.g., `['#000000','#FFFFFF']`
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
   *
   * @member {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */
  get fill() {
    return this._fill;
  }
  set fill(t) {
    const i = h(t);
    this._fill !== i && (this._fill = i, this.styleID++);
  }
  /**
   * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
   *
   * @type {PIXI.TEXT_GRADIENT}
   */
  get fillGradientType() {
    return this._fillGradientType;
  }
  set fillGradientType(t) {
    this._fillGradientType !== t && (this._fillGradientType = t, this.styleID++);
  }
  /**
   * If fill is an array of colours to create a gradient, this array can set the stop points
   * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
   */
  get fillGradientStops() {
    return this._fillGradientStops;
  }
  set fillGradientStops(t) {
    m(this._fillGradientStops, t) || (this._fillGradientStops = t, this.styleID++);
  }
  /**
   * The font family, can be a single font name, or a list of names where the first
   * is the preferred font.
   */
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(t) {
    this.fontFamily !== t && (this._fontFamily = t, this.styleID++);
  }
  /**
   * The font size
   * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
   */
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(t) {
    this._fontSize !== t && (this._fontSize = t, this.styleID++);
  }
  /**
   * The font style.
   *
   * @member {'normal'|'italic'|'oblique'}
   */
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(t) {
    this._fontStyle !== t && (this._fontStyle = t, this.styleID++);
  }
  /**
   * The font variant.
   *
   * @member {'normal'|'small-caps'}
   */
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(t) {
    this._fontVariant !== t && (this._fontVariant = t, this.styleID++);
  }
  /**
   * The font weight.
   *
   * @member {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(t) {
    this._fontWeight !== t && (this._fontWeight = t, this.styleID++);
  }
  /** The amount of spacing between letters, default is 0. */
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(t) {
    this._letterSpacing !== t && (this._letterSpacing = t, this.styleID++);
  }
  /** The line height, a number that represents the vertical space that a letter uses. */
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(t) {
    this._lineHeight !== t && (this._lineHeight = t, this.styleID++);
  }
  /** The space between lines. */
  get leading() {
    return this._leading;
  }
  set leading(t) {
    this._leading !== t && (this._leading = t, this.styleID++);
  }
  /**
   * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
   * Default is 'miter' (creates a sharp corner).
   *
   * @member {'miter'|'round'|'bevel'}
   */
  get lineJoin() {
    return this._lineJoin;
  }
  set lineJoin(t) {
    this._lineJoin !== t && (this._lineJoin = t, this.styleID++);
  }
  /**
   * The miter limit to use when using the 'miter' lineJoin mode.
   *
   * This can reduce or increase the spikiness of rendered text.
   */
  get miterLimit() {
    return this._miterLimit;
  }
  set miterLimit(t) {
    this._miterLimit !== t && (this._miterLimit = t, this.styleID++);
  }
  /**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   */
  get padding() {
    return this._padding;
  }
  set padding(t) {
    this._padding !== t && (this._padding = t, this.styleID++);
  }
  /**
   * A canvas fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'
   */
  get stroke() {
    return this._stroke;
  }
  set stroke(t) {
    const i = h(t);
    this._stroke !== i && (this._stroke = i, this.styleID++);
  }
  /**
   * A number that represents the thickness of the stroke.
   *
   * @default 0
   */
  get strokeThickness() {
    return this._strokeThickness;
  }
  set strokeThickness(t) {
    this._strokeThickness !== t && (this._strokeThickness = t, this.styleID++);
  }
  /**
   * The baseline of the text that is rendered.
   *
   * @member {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(t) {
    this._textBaseline !== t && (this._textBaseline = t, this.styleID++);
  }
  /** Trim transparent borders. */
  get trim() {
    return this._trim;
  }
  set trim(t) {
    this._trim !== t && (this._trim = t, this.styleID++);
  }
  /**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   *
   * @member {'normal'|'pre'|'pre-line'}
   */
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(t) {
    this._whiteSpace !== t && (this._whiteSpace = t, this.styleID++);
  }
  /** Indicates if word wrap should be used. */
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(t) {
    this._wordWrap !== t && (this._wordWrap = t, this.styleID++);
  }
  /** The width at which text will wrap, it needs wordWrap to be set to true. */
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(t) {
    this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.styleID++);
  }
  /**
   * Generates a font style string to use for `TextMetrics.measureFont()`.
   *
   * @return Font style string, for passing to `TextMetrics.measureFont()`
   */
  toFontString() {
    const t = typeof this.fontSize == "number" ? `${this.fontSize}px` : this.fontSize;
    let i = this.fontFamily;
    Array.isArray(this.fontFamily) || (i = this.fontFamily.split(","));
    for (let e = i.length - 1; e >= 0; e--) {
      let s = i[e].trim();
      !/([\"\'])[^\'\"]+\1/.test(s) && !d.includes(s) && (s = `"${s}"`), i[e] = s;
    }
    return `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${t} ${i.join(",")}`;
  }
};
l.defaultStyle = {
  /**
   * See {@link PIXI.TextStyle.align}
   * @type {'left'|'center'|'right'|'justify'}
   */
  align: "left",
  /** See {@link PIXI.TextStyle.breakWords} */
  breakWords: !1,
  /** See {@link PIXI.TextStyle.dropShadow} */
  dropShadow: !1,
  /** See {@link PIXI.TextStyle.dropShadowAlpha} */
  dropShadowAlpha: 1,
  /**
   * See {@link PIXI.TextStyle.dropShadowAngle}
   * @type {number}
   * @default Math.PI / 6
   */
  dropShadowAngle: Math.PI / 6,
  /** See {@link PIXI.TextStyle.dropShadowBlur} */
  dropShadowBlur: 0,
  /**
   * See {@link PIXI.TextStyle.dropShadowColor}
   * @type {string|number}
   */
  dropShadowColor: "black",
  /** See {@link PIXI.TextStyle.dropShadowDistance} */
  dropShadowDistance: 5,
  /**
   * See {@link PIXI.TextStyle.fill}
   * @type {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */
  fill: "black",
  /**
   * See {@link PIXI.TextStyle.fillGradientType}
   * @type {PIXI.TEXT_GRADIENT}
   * @default PIXI.TEXT_GRADIENT.LINEAR_VERTICAL
   */
  fillGradientType: p.LINEAR_VERTICAL,
  /**
   * See {@link PIXI.TextStyle.fillGradientStops}
   * @type {number[]}
   * @default []
   */
  fillGradientStops: [],
  /**
   * See {@link PIXI.TextStyle.fontFamily}
   * @type {string|string[]}
   */
  fontFamily: "Arial",
  /**
   * See {@link PIXI.TextStyle.fontSize}
   * @type {number|string} 
   */
  fontSize: 26,
  /**
   * See {@link PIXI.TextStyle.fontStyle}
   * @type {'normal'|'italic'|'oblique'}
   */
  fontStyle: "normal",
  /**
   * See {@link PIXI.TextStyle.fontVariant}
   * @type {'normal'|'small-caps'}
   */
  fontVariant: "normal",
  /**
   * See {@link PIXI.TextStyle.fontWeight}
   * @type {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  fontWeight: "normal",
  /** See {@link PIXI.TextStyle.leading} */
  leading: 0,
  /** See {@link PIXI.TextStyle.letterSpacing} */
  letterSpacing: 0,
  /** See {@link PIXI.TextStyle.lineHeight} */
  lineHeight: 0,
  /**
   * See {@link PIXI.TextStyle.lineJoin}
   * @type {'miter'|'round'|'bevel'}
   */
  lineJoin: "miter",
  /** See {@link PIXI.TextStyle.miterLimit} */
  miterLimit: 10,
  /** See {@link PIXI.TextStyle.padding} */
  padding: 0,
  /**
   * See {@link PIXI.TextStyle.stroke}
   * @type {string|number}
   */
  stroke: "black",
  /** See {@link PIXI.TextStyle.strokeThickness} */
  strokeThickness: 0,
  /**
   * See {@link PIXI.TextStyle.textBaseline} 
   * @type {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  textBaseline: "alphabetic",
  /** See {@link PIXI.TextStyle.trim} */
  trim: !1,
  /**
   * See {@link PIXI.TextStyle.whiteSpace}
   * @type {'normal'|'pre'|'pre-line'}
   */
  whiteSpace: "pre",
  /** See {@link PIXI.TextStyle.wordWrap} */
  wordWrap: !1,
  /** See {@link PIXI.TextStyle.wordWrapWidth} */
  wordWrapWidth: 100
};
let wt = l;
function h(r) {
  const t = a.shared, i = (e) => {
    const s = t.setValue(e);
    return s.alpha === 1 ? s.toHex() : s.toRgbaString();
  };
  return Array.isArray(r) ? r.map(i) : i(r);
}
function m(r, t) {
  if (!Array.isArray(r) || !Array.isArray(t) || r.length !== t.length)
    return !1;
  for (let i = 0; i < r.length; ++i)
    if (r[i] !== t[i])
      return !1;
  return !0;
}
function n(r, t, i) {
  for (const e in i)
    Array.isArray(t[e]) ? r[e] = t[e].slice() : r[e] = t[e];
}
export {
  wt as TextStyle
};
//# sourceMappingURL=index123.js.map
