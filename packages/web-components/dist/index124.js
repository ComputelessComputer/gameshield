import "./index23.js";
import "./index24.js";
import { ALPHA_MODES as L, MIPMAP_MODES as R } from "./index164.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as $ } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import "./index35.js";
import { settings as B } from "./index150.js";
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
import { getResolutionOfUrl as I } from "./index154.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import "./index52.js";
import "./index53.js";
import { BaseTexture as U } from "./index54.js";
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
import { Texture as C } from "./index131.js";
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
import "./index121.js";
import { TextMetrics as N } from "./index122.js";
import { TextStyle as k } from "./index123.js";
import { BitmapFontData as D } from "./index286.js";
import { autoDetectFormat as W } from "./index287.js";
import { drawGlyph as j } from "./index288.js";
import { extractCharCode as O } from "./index289.js";
import { resolveCharacters as G } from "./index290.js";
const y = class f {
  /**
   * @param data
   * @param textures
   * @param ownsTextures - Setting to `true` will destroy page textures
   *        when the font is uninstalled.
   */
  constructor(t, r, x) {
    var w;
    const [d] = t.info, [A] = t.common, [p] = t.page, [s] = t.distanceField, i = I(p.file), l = {};
    this._ownsTextures = x, this.font = d.face, this.size = d.size, this.lineHeight = A.lineHeight / i, this.chars = {}, this.pageTextures = l;
    for (let e = 0; e < t.page.length; e++) {
      const { id: h, file: o } = t.page[e];
      l[h] = r instanceof Array ? r[e] : r[o], s != null && s.fieldType && s.fieldType !== "none" && (l[h].baseTexture.alphaMode = L.NO_PREMULTIPLIED_ALPHA, l[h].baseTexture.mipmap = R.OFF);
    }
    for (let e = 0; e < t.char.length; e++) {
      const { id: h, page: o } = t.char[e];
      let { x: n, y: m, width: a, height: c, xoffset: E, yoffset: T, xadvance: M } = t.char[e];
      n /= i, m /= i, a /= i, c /= i, E /= i, T /= i, M /= i;
      const H = new $(
        n + l[o].frame.x / i,
        m + l[o].frame.y / i,
        a,
        c
      );
      this.chars[h] = {
        xOffset: E,
        yOffset: T,
        xAdvance: M,
        kerning: {},
        texture: new C(
          l[o].baseTexture,
          H
        ),
        page: o
      };
    }
    for (let e = 0; e < t.kerning.length; e++) {
      let { first: h, second: o, amount: n } = t.kerning[e];
      h /= i, o /= i, n /= i, this.chars[o] && (this.chars[o].kerning[h] = n);
    }
    this.distanceFieldRange = s == null ? void 0 : s.distanceRange, this.distanceFieldType = ((w = s == null ? void 0 : s.fieldType) == null ? void 0 : w.toLowerCase()) ?? "none";
  }
  /** Remove references to created glyph textures. */
  destroy() {
    for (const t in this.chars)
      this.chars[t].texture.destroy(), this.chars[t].texture = null;
    for (const t in this.pageTextures)
      this._ownsTextures && this.pageTextures[t].destroy(!0), this.pageTextures[t] = null;
    this.chars = null, this.pageTextures = null;
  }
  /**
   * Register a new bitmap font.
   * @param data - The
   *        characters map that could be provided as xml or raw string.
   * @param textures - List of textures for each page.
   * @param ownsTextures - Set to `true` to destroy page textures
   *        when the font is uninstalled. By default fonts created with
   *        `BitmapFont.from` or from the `BitmapFontLoader` are `true`.
   * @returns {PIXI.BitmapFont} Result font object with font, size, lineHeight
   *         and char fields.
   */
  static install(t, r, x) {
    let d;
    if (t instanceof D)
      d = t;
    else {
      const p = W(t);
      if (!p)
        throw new Error("Unrecognized data format for font.");
      d = p.parse(t);
    }
    r instanceof C && (r = [r]);
    const A = new f(d, r, x);
    return f.available[A.font] = A, A;
  }
  /**
   * Remove bitmap font by name.
   * @param name - Name of the font to uninstall.
   */
  static uninstall(t) {
    const r = f.available[t];
    if (!r)
      throw new Error(`No font found named '${t}'`);
    r.destroy(), delete f.available[t];
  }
  /**
   * Generates a bitmap-font for the given style and character set. This does not support
   * kernings yet. With `style` properties, only the following non-layout properties are used:
   *
   * - {@link PIXI.TextStyle#dropShadow|dropShadow}
   * - {@link PIXI.TextStyle#dropShadowDistance|dropShadowDistance}
   * - {@link PIXI.TextStyle#dropShadowColor|dropShadowColor}
   * - {@link PIXI.TextStyle#dropShadowBlur|dropShadowBlur}
   * - {@link PIXI.TextStyle#dropShadowAngle|dropShadowAngle}
   * - {@link PIXI.TextStyle#fill|fill}
   * - {@link PIXI.TextStyle#fillGradientStops|fillGradientStops}
   * - {@link PIXI.TextStyle#fillGradientType|fillGradientType}
   * - {@link PIXI.TextStyle#fontFamily|fontFamily}
   * - {@link PIXI.TextStyle#fontSize|fontSize}
   * - {@link PIXI.TextStyle#fontVariant|fontVariant}
   * - {@link PIXI.TextStyle#fontWeight|fontWeight}
   * - {@link PIXI.TextStyle#lineJoin|lineJoin}
   * - {@link PIXI.TextStyle#miterLimit|miterLimit}
   * - {@link PIXI.TextStyle#stroke|stroke}
   * - {@link PIXI.TextStyle#strokeThickness|strokeThickness}
   * - {@link PIXI.TextStyle#textBaseline|textBaseline}
   * @param name - The name of the custom font to use with BitmapText.
   * @param textStyle - Style options to render with BitmapFont.
   * @param options - Setup options for font or name of the font.
   * @returns Font generated by style options.
   * @example
   * import { BitmapFont, BitmapText } from 'pixi.js';
   *
   * BitmapFont.from('TitleFont', {
   *     fontFamily: 'Arial',
   *     fontSize: 12,
   *     strokeThickness: 2,
   *     fill: 'purple',
   * });
   *
   * const title = new BitmapText('This is the title', { fontName: 'TitleFont' });
   */
  static from(t, r, x) {
    if (!t)
      throw new Error("[BitmapFont] Property `name` is required.");
    const {
      chars: d,
      padding: A,
      resolution: p,
      textureWidth: s,
      textureHeight: i,
      ...l
    } = Object.assign({}, f.defaultOptions, x), w = G(d), e = r instanceof k ? r : new k(r), h = s, o = new D();
    o.info[0] = {
      face: e.fontFamily,
      size: e.fontSize
    }, o.common[0] = {
      lineHeight: e.fontSize
    };
    let n = 0, m = 0, a, c, E, T = 0;
    const M = [];
    for (let u = 0; u < w.length; u++) {
      a || (a = B.ADAPTER.createCanvas(), a.width = s, a.height = i, c = a.getContext("2d"), E = new U(a, { resolution: p, ...l }), M.push(new C(E)), o.page.push({
        id: M.length - 1,
        file: ""
      }));
      const F = w[u], g = N.measureText(F, e, !1, a), b = g.width, v = Math.ceil(g.height), z = Math.ceil((e.fontStyle === "italic" ? 2 : 1) * b);
      if (m >= i - v * p) {
        if (m === 0)
          throw new Error(`[BitmapFont] textureHeight ${i}px is too small (fontFamily: '${e.fontFamily}', fontSize: ${e.fontSize}px, char: '${F}')`);
        --u, a = null, c = null, E = null, m = 0, n = 0, T = 0;
        continue;
      }
      if (T = Math.max(v + g.fontProperties.descent, T), z * p + n >= h) {
        if (n === 0)
          throw new Error(`[BitmapFont] textureWidth ${s}px is too small (fontFamily: '${e.fontFamily}', fontSize: ${e.fontSize}px, char: '${F}')`);
        --u, m += T * p, m = Math.ceil(m), n = 0, T = 0;
        continue;
      }
      j(a, c, g, n, m, p, e);
      const P = O(g.text);
      o.char.push({
        id: P,
        page: M.length - 1,
        x: n / p,
        y: m / p,
        width: z,
        height: v,
        xoffset: 0,
        yoffset: 0,
        xadvance: b - (e.dropShadow ? e.dropShadowDistance : 0) - (e.stroke ? e.strokeThickness : 0)
      }), n += (z + 2 * A) * p, n = Math.ceil(n);
    }
    if (!(x != null && x.skipKerning))
      for (let u = 0, F = w.length; u < F; u++) {
        const g = w[u];
        for (let b = 0; b < F; b++) {
          const v = w[b], z = c.measureText(g).width, P = c.measureText(v).width, S = c.measureText(g + v).width - (z + P);
          S && o.kerning.push({
            first: O(g),
            second: O(v),
            amount: S
          });
        }
      }
    const H = new f(o, M, !0);
    return f.available[t] !== void 0 && f.uninstall(t), f.available[t] = H, H;
  }
};
y.ALPHA = [["a", "z"], ["A", "Z"], " "], /**
* This character set includes all decimal digits (from 0 to 9).
* @type {string[][]}
* @example
* BitmapFont.from('ExampleFont', style, { chars: BitmapFont.NUMERIC })
*/
y.NUMERIC = [["0", "9"]], /**
* This character set is the union of `BitmapFont.ALPHA` and `BitmapFont.NUMERIC`.
* @type {string[][]}
*/
y.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], /**
* This character set consists of all the ASCII table.
* @member {string[][]}
* @see http://www.asciitable.com/
*/
y.ASCII = [[" ", "~"]], /**
* Collection of default options when using `BitmapFont.from`.
* @property {number} [resolution=1] -
* @property {number} [textureWidth=512] -
* @property {number} [textureHeight=512] -
* @property {number} [padding=4] -
* @property {string|string[]|string[][]} chars = PIXI.BitmapFont.ALPHANUMERIC
*/
y.defaultOptions = {
  resolution: 1,
  textureWidth: 512,
  textureHeight: 512,
  padding: 4,
  chars: y.ALPHANUMERIC
}, /** Collection of available/installed fonts. */
y.available = {};
let ae = y;
export {
  ae as BitmapFont
};
//# sourceMappingURL=index124.js.map
