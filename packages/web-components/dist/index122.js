import "./index23.js";
import "./index24.js";
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
import { settings as M } from "./index153.js";
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
const C = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
}, f = class i {
  /**
   * Checking that we can use modern canvas 2D API.
   *
   * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
   * @see PIXI.TextMetrics.experimentalLetterSpacing
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/letterSpacing
   * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
   */
  static get experimentalLetterSpacingSupported() {
    let e = i._experimentalLetterSpacingSupported;
    if (e !== void 0) {
      const t = M.ADAPTER.getCanvasRenderingContext2D().prototype;
      e = i._experimentalLetterSpacingSupported = "letterSpacing" in t || "textLetterSpacing" in t;
    }
    return e;
  }
  /**
   * @param text - the text that was measured
   * @param style - the style that was measured
   * @param width - the measured width of the text
   * @param height - the measured height of the text
   * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
   * @param lineWidths - an array of the line widths for each line matched to `lines`
   * @param lineHeight - the measured line height for this style
   * @param maxLineWidth - the maximum line width for all measured lines
   * @param {PIXI.IFontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
   */
  constructor(e, t, a, o, n, r, s, c, d) {
    this.text = e, this.style = t, this.width = a, this.height = o, this.lines = n, this.lineWidths = r, this.lineHeight = s, this.maxLineWidth = c, this.fontProperties = d;
  }
  /**
   * Measures the supplied string of text and returns a Rectangle.
   * @param text - The text to measure.
   * @param style - The text style to use for measuring
   * @param wordWrap - Override for if word-wrap should be applied to the text.
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns Measured width and height of the text.
   */
  static measureText(e, t, a, o = i._canvas) {
    a = a ?? t.wordWrap;
    const n = t.toFontString(), r = i.measureFont(n);
    r.fontSize === 0 && (r.fontSize = t.fontSize, r.ascent = t.fontSize);
    const s = o.getContext("2d", C);
    s.font = n;
    const c = (a ? i.wordWrap(e, t, o) : e).split(/(?:\r\n|\r|\n)/), d = new Array(c.length);
    let u = 0;
    for (let l = 0; l < c.length; l++) {
      const h = i._measureText(c[l], t.letterSpacing, s);
      d[l] = h, u = Math.max(u, h);
    }
    let g = u + t.strokeThickness;
    t.dropShadow && (g += t.dropShadowDistance);
    const p = t.lineHeight || r.fontSize + t.strokeThickness;
    let m = Math.max(p, r.fontSize + t.strokeThickness * 2) + t.leading + (c.length - 1) * (p + t.leading);
    return t.dropShadow && (m += t.dropShadowDistance), new i(
      e,
      t,
      g,
      m,
      c,
      d,
      p + t.leading,
      u,
      r
    );
  }
  static _measureText(e, t, a) {
    let o = !1;
    i.experimentalLetterSpacingSupported && (i.experimentalLetterSpacing ? (a.letterSpacing = `${t}px`, a.textLetterSpacing = `${t}px`, o = !0) : (a.letterSpacing = "0px", a.textLetterSpacing = "0px"));
    let n = a.measureText(e).width;
    return n > 0 && (o ? n -= t : n += (i.graphemeSegmenter(e).length - 1) * t), n;
  }
  /**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   * @param text - String to apply word wrapping to
   * @param style - the style to use when wrapping
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns New string with new lines applied where required
   */
  static wordWrap(e, t, a = i._canvas) {
    const o = a.getContext("2d", C);
    let n = 0, r = "", s = "";
    const c = /* @__PURE__ */ Object.create(null), { letterSpacing: d, whiteSpace: u } = t, g = i.collapseSpaces(u), p = i.collapseNewlines(u);
    let m = !g;
    const l = t.wordWrapWidth + d, h = i.tokenize(e);
    for (let L = 0; L < h.length; L++) {
      let S = h[L];
      if (i.isNewline(S)) {
        if (!p) {
          s += i.addLine(r), m = !g, r = "", n = 0;
          continue;
        }
        S = " ";
      }
      if (g) {
        const k = i.isBreakingSpace(S), x = i.isBreakingSpace(r[r.length - 1]);
        if (k && x)
          continue;
      }
      const E = i.getFromCache(S, d, c, o);
      if (E > l)
        if (r !== "" && (s += i.addLine(r), r = "", n = 0), i.canBreakWords(S, t.breakWords)) {
          const k = i.wordWrapSplit(S);
          for (let x = 0; x < k.length; x++) {
            let w = k[x], W = w, T = 1;
            for (; k[x + T]; ) {
              const B = k[x + T];
              if (!i.canBreakChars(W, B, S, x, t.breakWords))
                w += B;
              else
                break;
              W = B, T++;
            }
            x += T - 1;
            const R = i.getFromCache(w, d, c, o);
            R + n > l && (s += i.addLine(r), m = !1, r = "", n = 0), r += w, n += R;
          }
        } else {
          r.length > 0 && (s += i.addLine(r), r = "", n = 0);
          const k = L === h.length - 1;
          s += i.addLine(S, !k), m = !1, r = "", n = 0;
        }
      else
        E + n > l && (m = !1, s += i.addLine(r), r = "", n = 0), (r.length > 0 || !i.isBreakingSpace(S) || m) && (r += S, n += E);
    }
    return s += i.addLine(r, !1), s;
  }
  /**
   * Convienience function for logging each line added during the wordWrap method.
   * @param line    - The line of text to add
   * @param newLine - Add new line character to end
   * @returns A formatted line
   */
  static addLine(e, t = !0) {
    return e = i.trimRight(e), e = t ? `${e}
` : e, e;
  }
  /**
   * Gets & sets the widths of calculated characters in a cache object
   * @param key            - The key
   * @param letterSpacing  - The letter spacing
   * @param cache          - The cache
   * @param context        - The canvas context
   * @returns The from cache.
   */
  static getFromCache(e, t, a, o) {
    let n = a[e];
    return typeof n != "number" && (n = i._measureText(e, t, o) + t, a[e] = n), n;
  }
  /**
   * Determines whether we should collapse breaking spaces.
   * @param whiteSpace - The TextStyle property whiteSpace
   * @returns Should collapse
   */
  static collapseSpaces(e) {
    return e === "normal" || e === "pre-line";
  }
  /**
   * Determines whether we should collapse newLine chars.
   * @param whiteSpace - The white space
   * @returns should collapse
   */
  static collapseNewlines(e) {
    return e === "normal";
  }
  /**
   * Trims breaking whitespaces from string.
   * @param text - The text
   * @returns Trimmed string
   */
  static trimRight(e) {
    if (typeof e != "string")
      return "";
    for (let t = e.length - 1; t >= 0; t--) {
      const a = e[t];
      if (!i.isBreakingSpace(a))
        break;
      e = e.slice(0, -1);
    }
    return e;
  }
  /**
   * Determines if char is a newline.
   * @param char - The character
   * @returns True if newline, False otherwise.
   */
  static isNewline(e) {
    return typeof e != "string" ? !1 : i._newlines.includes(e.charCodeAt(0));
  }
  /**
   * Determines if char is a breaking whitespace.
   *
   * It allows one to determine whether char should be a breaking whitespace
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param char - The character
   * @param [_nextChar] - The next character
   * @returns True if whitespace, False otherwise.
   */
  static isBreakingSpace(e, t) {
    return typeof e != "string" ? !1 : i._breakingSpaces.includes(e.charCodeAt(0));
  }
  /**
   * Splits a string into words, breaking-spaces and newLine characters
   * @param text - The text
   * @returns A tokenized array
   */
  static tokenize(e) {
    const t = [];
    let a = "";
    if (typeof e != "string")
      return t;
    for (let o = 0; o < e.length; o++) {
      const n = e[o], r = e[o + 1];
      if (i.isBreakingSpace(n, r) || i.isNewline(n)) {
        a !== "" && (t.push(a), a = ""), t.push(n);
        continue;
      }
      a += n;
    }
    return a !== "" && t.push(a), t;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to customise which words should break
   * Examples are if the token is CJK or numbers.
   * It must return a boolean.
   * @param _token - The token
   * @param breakWords - The style attr break words
   * @returns Whether to break word or not
   */
  static canBreakWords(e, t) {
    return t;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to determine whether a pair of characters
   * should be broken by newlines
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param _char - The character
   * @param _nextChar - The next character
   * @param _token - The token/word the characters are from
   * @param _index - The index in the token of the char
   * @param _breakWords - The style attr break words
   * @returns whether to break word or not
   */
  static canBreakChars(e, t, a, o, n) {
    return !0;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It is called when a token (usually a word) has to be split into separate pieces
   * in order to determine the point to break a word.
   * It must return an array of characters.
   * @param token - The token to split
   * @returns The characters of the token
   * @see TextMetrics.graphemeSegmenter
   */
  static wordWrapSplit(e) {
    return i.graphemeSegmenter(e);
  }
  /**
   * Calculates the ascent, descent and fontSize of a given font-style
   * @param font - String representing the style of the font
   * @returns Font properties object
   */
  static measureFont(e) {
    if (i._fonts[e])
      return i._fonts[e];
    const t = {
      ascent: 0,
      descent: 0,
      fontSize: 0
    }, a = i._canvas, o = i._context;
    o.font = e;
    const n = i.METRICS_STRING + i.BASELINE_SYMBOL, r = Math.ceil(o.measureText(n).width);
    let s = Math.ceil(o.measureText(i.BASELINE_SYMBOL).width);
    const c = Math.ceil(i.HEIGHT_MULTIPLIER * s);
    if (s = s * i.BASELINE_MULTIPLIER | 0, r === 0 || c === 0)
      return i._fonts[e] = t, t;
    a.width = r, a.height = c, o.fillStyle = "#f00", o.fillRect(0, 0, r, c), o.font = e, o.textBaseline = "alphabetic", o.fillStyle = "#000", o.fillText(n, 0, s);
    const d = o.getImageData(0, 0, r, c).data, u = d.length, g = r * 4;
    let p = 0, m = 0, l = !1;
    for (p = 0; p < s; ++p) {
      for (let h = 0; h < g; h += 4)
        if (d[m + h] !== 255) {
          l = !0;
          break;
        }
      if (!l)
        m += g;
      else
        break;
    }
    for (t.ascent = s - p, m = u - g, l = !1, p = c; p > s; --p) {
      for (let h = 0; h < g; h += 4)
        if (d[m + h] !== 255) {
          l = !0;
          break;
        }
      if (!l)
        m -= g;
      else
        break;
    }
    return t.descent = p - s, t.fontSize = t.ascent + t.descent, i._fonts[e] = t, t;
  }
  /**
   * Clear font metrics in metrics cache.
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */
  static clearMetrics(e = "") {
    e ? delete i._fonts[e] : i._fonts = {};
  }
  /**
   * Cached canvas element for measuring text
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _canvas() {
    var e;
    if (!i.__canvas) {
      let t;
      try {
        const a = new OffscreenCanvas(0, 0);
        if ((e = a.getContext("2d", C)) != null && e.measureText)
          return i.__canvas = a, a;
        t = M.ADAPTER.createCanvas();
      } catch {
        t = M.ADAPTER.createCanvas();
      }
      t.width = t.height = 10, i.__canvas = t;
    }
    return i.__canvas;
  }
  /**
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _context() {
    return i.__context || (i.__context = i._canvas.getContext("2d", C)), i.__context;
  }
};
f.METRICS_STRING = "|ÉqÅ", /** Baseline symbol for calculate font metrics. */
f.BASELINE_SYMBOL = "M", /** Baseline multiplier for calculate font metrics. */
f.BASELINE_MULTIPLIER = 1.4, /** Height multiplier for setting height of canvas to calculate font metrics. */
f.HEIGHT_MULTIPLIER = 2, /**
* A Unicode "character", or "grapheme cluster", can be composed of multiple Unicode code points,
* such as letters with diacritical marks (e.g. `'\u0065\u0301'`, letter e with acute)
* or emojis with modifiers (e.g. `'\uD83E\uDDD1\u200D\uD83D\uDCBB'`, technologist).
* The new `Intl.Segmenter` API in ES2022 can split the string into grapheme clusters correctly. If it is not available,
* PixiJS will fallback to use the iterator of String, which can only spilt the string into code points.
* If you want to get full functionality in environments that don't support `Intl.Segmenter` (such as Firefox),
* you can use other libraries such as [grapheme-splitter]{@link https://www.npmjs.com/package/grapheme-splitter}
* or [graphemer]{@link https://www.npmjs.com/package/graphemer} to create a polyfill. Since these libraries can be
* relatively large in size to handle various Unicode grapheme clusters properly, PixiJS won't use them directly.
*/
f.graphemeSegmenter = (() => {
  if (typeof (Intl == null ? void 0 : Intl.Segmenter) == "function") {
    const I = new Intl.Segmenter();
    return (e) => [...I.segment(e)].map((t) => t.segment);
  }
  return (I) => [...I];
})(), /**
* New rendering behavior for letter-spacing which uses Chrome's new native API. This will
* lead to more accurate letter-spacing results because it does not try to manually draw
* each character. However, this Chrome API is experimental and may not serve all cases yet.
* @see PIXI.TextMetrics.experimentalLetterSpacingSupported
*/
f.experimentalLetterSpacing = !1, /** Cache of {@see PIXI.TextMetrics.FontMetrics} objects. */
f._fonts = {}, /** Cache of new line chars. */
f._newlines = [
  10,
  // line feed
  13
  // carriage return
], /** Cache of breaking spaces. */
f._breakingSpaces = [
  9,
  // character tabulation
  32,
  // space
  8192,
  // en quad
  8193,
  // em quad
  8194,
  // en space
  8195,
  // em space
  8196,
  // three-per-em space
  8197,
  // four-per-em space
  8198,
  // six-per-em space
  8200,
  // punctuation space
  8201,
  // thin space
  8202,
  // hair space
  8287,
  // medium mathematical space
  12288
  // ideographic space
];
let Dt = f;
export {
  Dt as TextMetrics
};
//# sourceMappingURL=index122.js.map
