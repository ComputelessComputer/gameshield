import { DOMAdapter as T } from "./index365.js";
import { fontStringFromTextStyle as R } from "./index571.js";
const v = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
}, h = class n {
  /**
   * Checking that we can use modern canvas 2D API.
   *
   * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
   * @see TextMetrics.experimentalLetterSpacing
   * @see https://developer.mozilla.org/en-US/docs/Web/API/ICanvasRenderingContext2D/letterSpacing
   * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
   */
  static get experimentalLetterSpacingSupported() {
    let e = n._experimentalLetterSpacingSupported;
    if (e !== void 0) {
      const t = T.get().getCanvasRenderingContext2D().prototype;
      e = n._experimentalLetterSpacingSupported = "letterSpacing" in t || "textLetterSpacing" in t;
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
   * @param {FontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
   */
  constructor(e, t, a, s, i, r, c, g, u) {
    this.text = e, this.style = t, this.width = a, this.height = s, this.lines = i, this.lineWidths = r, this.lineHeight = c, this.maxLineWidth = g, this.fontProperties = u;
  }
  /**
   * Measures the supplied string of text and returns a Rectangle.
   * @param text - The text to measure.
   * @param style - The text style to use for measuring
   * @param canvas - optional specification of the canvas to use for measuring.
   * @param wordWrap
   * @returns Measured width and height of the text.
   */
  static measureText(e = " ", t, a = n._canvas, s = t.wordWrap) {
    var L;
    const i = `${e}:${t.styleKey}`;
    if (n._measurementCache[i])
      return n._measurementCache[i];
    const r = R(t), c = n.measureFont(r);
    c.fontSize === 0 && (c.fontSize = t.fontSize, c.ascent = t.fontSize);
    const g = n.__context;
    g.font = r;
    const p = (s ? n._wordWrap(e, t, a) : e).split(/(?:\r\n|\r|\n)/), x = new Array(p.length);
    let B = 0;
    for (let o = 0; o < p.length; o++) {
      const l = n._measureText(p[o], t.letterSpacing, g);
      x[o] = l, B = Math.max(B, l);
    }
    const f = ((L = t._stroke) == null ? void 0 : L.width) || 0;
    let w = B + f;
    t.dropShadow && (w += t.dropShadow.distance);
    const m = t.lineHeight || c.fontSize;
    let S = Math.max(m, c.fontSize + f) + (p.length - 1) * (m + t.leading);
    return t.dropShadow && (S += t.dropShadow.distance), new n(
      e,
      t,
      w,
      S,
      p,
      x,
      m + t.leading,
      B,
      c
    );
  }
  static _measureText(e, t, a) {
    let s = !1;
    n.experimentalLetterSpacingSupported && (n.experimentalLetterSpacing ? (a.letterSpacing = `${t}px`, a.textLetterSpacing = `${t}px`, s = !0) : (a.letterSpacing = "0px", a.textLetterSpacing = "0px"));
    const i = a.measureText(e);
    let r = i.width;
    const c = -i.actualBoundingBoxLeft;
    let u = i.actualBoundingBoxRight - c;
    if (r > 0)
      if (s)
        r -= t, u -= t;
      else {
        const p = (n.graphemeSegmenter(e).length - 1) * t;
        r += p, u += p;
      }
    return Math.max(r, u);
  }
  /**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   * @param text - String to apply word wrapping to
   * @param style - the style to use when wrapping
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns New string with new lines applied where required
   */
  static _wordWrap(e, t, a = n._canvas) {
    const s = a.getContext("2d", v);
    let i = 0, r = "", c = "";
    const g = /* @__PURE__ */ Object.create(null), { letterSpacing: u, whiteSpace: p } = t, x = n._collapseSpaces(p), B = n._collapseNewlines(p);
    let f = !x;
    const w = t.wordWrapWidth + u, m = n._tokenize(e);
    for (let S = 0; S < m.length; S++) {
      let d = m[S];
      if (n._isNewline(d)) {
        if (!B) {
          c += n._addLine(r), f = !x, r = "", i = 0;
          continue;
        }
        d = " ";
      }
      if (x) {
        const o = n.isBreakingSpace(d), l = n.isBreakingSpace(r[r.length - 1]);
        if (o && l)
          continue;
      }
      const L = n._getFromCache(d, u, g, s);
      if (L > w)
        if (r !== "" && (c += n._addLine(r), r = "", i = 0), n.canBreakWords(d, t.breakWords)) {
          const o = n.wordWrapSplit(d);
          for (let l = 0; l < o.length; l++) {
            let k = o[l], I = k, C = 1;
            for (; o[l + C]; ) {
              const _ = o[l + C];
              if (!n.canBreakChars(I, _, d, l, t.breakWords))
                k += _;
              else
                break;
              I = _, C++;
            }
            l += C - 1;
            const M = n._getFromCache(k, u, g, s);
            M + i > w && (c += n._addLine(r), f = !1, r = "", i = 0), r += k, i += M;
          }
        } else {
          r.length > 0 && (c += n._addLine(r), r = "", i = 0);
          const o = S === m.length - 1;
          c += n._addLine(d, !o), f = !1, r = "", i = 0;
        }
      else
        L + i > w && (f = !1, c += n._addLine(r), r = "", i = 0), (r.length > 0 || !n.isBreakingSpace(d) || f) && (r += d, i += L);
    }
    return c += n._addLine(r, !1), c;
  }
  /**
   * Convenience function for logging each line added during the wordWrap method.
   * @param line    - The line of text to add
   * @param newLine - Add new line character to end
   * @returns A formatted line
   */
  static _addLine(e, t = !0) {
    return e = n._trimRight(e), e = t ? `${e}
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
  static _getFromCache(e, t, a, s) {
    let i = a[e];
    return typeof i != "number" && (i = n._measureText(e, t, s) + t, a[e] = i), i;
  }
  /**
   * Determines whether we should collapse breaking spaces.
   * @param whiteSpace - The TextStyle property whiteSpace
   * @returns Should collapse
   */
  static _collapseSpaces(e) {
    return e === "normal" || e === "pre-line";
  }
  /**
   * Determines whether we should collapse newLine chars.
   * @param whiteSpace - The white space
   * @returns should collapse
   */
  static _collapseNewlines(e) {
    return e === "normal";
  }
  /**
   * Trims breaking whitespaces from string.
   * @param text - The text
   * @returns Trimmed string
   */
  static _trimRight(e) {
    if (typeof e != "string")
      return "";
    for (let t = e.length - 1; t >= 0; t--) {
      const a = e[t];
      if (!n.isBreakingSpace(a))
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
  static _isNewline(e) {
    return typeof e != "string" ? !1 : n._newlines.includes(e.charCodeAt(0));
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
    return typeof e != "string" ? !1 : n._breakingSpaces.includes(e.charCodeAt(0));
  }
  /**
   * Splits a string into words, breaking-spaces and newLine characters
   * @param text - The text
   * @returns A tokenized array
   */
  static _tokenize(e) {
    const t = [];
    let a = "";
    if (typeof e != "string")
      return t;
    for (let s = 0; s < e.length; s++) {
      const i = e[s], r = e[s + 1];
      if (n.isBreakingSpace(i, r) || n._isNewline(i)) {
        a !== "" && (t.push(a), a = ""), t.push(i);
        continue;
      }
      a += i;
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
  static canBreakChars(e, t, a, s, i) {
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
   * @see CanvasTextMetrics.graphemeSegmenter
   */
  static wordWrapSplit(e) {
    return n.graphemeSegmenter(e);
  }
  /**
   * Calculates the ascent, descent and fontSize of a given font-style
   * @param font - String representing the style of the font
   * @returns Font properties object
   */
  static measureFont(e) {
    if (n._fonts[e])
      return n._fonts[e];
    const t = n._context;
    t.font = e;
    const a = t.measureText(n.METRICS_STRING + n.BASELINE_SYMBOL), s = {
      ascent: a.actualBoundingBoxAscent,
      descent: a.actualBoundingBoxDescent,
      fontSize: a.actualBoundingBoxAscent + a.actualBoundingBoxDescent
    };
    return n._fonts[e] = s, s;
  }
  /**
   * Clear font metrics in metrics cache.
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */
  static clearMetrics(e = "") {
    e ? delete n._fonts[e] : n._fonts = {};
  }
  /**
   * Cached canvas element for measuring text
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _canvas() {
    if (!n.__canvas) {
      let e;
      try {
        const t = new OffscreenCanvas(0, 0), a = t.getContext("2d", v);
        if (a != null && a.measureText)
          return n.__canvas = t, t;
        e = T.get().createCanvas();
      } catch {
        e = T.get().createCanvas();
      }
      e.width = e.height = 10, n.__canvas = e;
    }
    return n.__canvas;
  }
  /**
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _context() {
    return n.__context || (n.__context = n._canvas.getContext("2d", v)), n.__context;
  }
};
h.METRICS_STRING = "|ÉqÅ";
h.BASELINE_SYMBOL = "M";
h.BASELINE_MULTIPLIER = 1.4;
h.HEIGHT_MULTIPLIER = 2;
h.graphemeSegmenter = (() => {
  if (typeof (Intl == null ? void 0 : Intl.Segmenter) == "function") {
    const W = new Intl.Segmenter();
    return (e) => [...W.segment(e)].map((t) => t.segment);
  }
  return (W) => [...W];
})();
h.experimentalLetterSpacing = !1;
h._fonts = {};
h._newlines = [
  10,
  // line feed
  13
  // carriage return
];
h._breakingSpaces = [
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
h._measurementCache = {};
let b = h;
export {
  b as CanvasTextMetrics
};
//# sourceMappingURL=index570.js.map
