import { Cache as a } from "./index340.js";
import { deprecation as y, v8_0_0 as g } from "./index477.js";
import { warn as F } from "./index338.js";
import { TextStyle as u } from "./index564.js";
import { DynamicBitmapFont as d } from "./index565.js";
import { getBitmapTextLayout as C } from "./index566.js";
import { resolveCharacters as v } from "./index567.js";
let l = 0;
class b {
  constructor() {
    this.ALPHA = [["a", "z"], ["A", "Z"], " "], this.NUMERIC = [["0", "9"]], this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], this.ASCII = [[" ", "~"]], this.defaultOptions = {
      chars: this.ALPHANUMERIC,
      resolution: 1,
      padding: 4,
      skipKerning: !1
    };
  }
  /**
   * Get a font for the specified text and style.
   * @param text - The text to get the font for
   * @param style - The style to use
   */
  getFont(i, t) {
    var s;
    let e = `${t.fontFamily}-bitmap`, o = !0;
    if (t._fill.fill && !t._stroke)
      e += t._fill.fill.styleKey, o = !1;
    else if (t._stroke || t.dropShadow) {
      let n = t.styleKey;
      n = n.substring(0, n.lastIndexOf("-")), e = `${n}-bitmap`, o = !1;
    }
    if (!a.has(e)) {
      const n = new d({
        style: t,
        overrideFill: o,
        overrideSize: !0,
        ...this.defaultOptions
      });
      l++, l > 50 && F("BitmapText", `You have dynamically created ${l} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``), n.once("destroy", () => {
        l--, a.remove(e);
      }), a.set(
        e,
        n
      );
    }
    const r = a.get(e);
    return (s = r.ensureCharacters) == null || s.call(r, i), r;
  }
  /**
   * Get the layout of a text for the specified style.
   * @param text - The text to get the layout for
   * @param style - The style to use
   * @param trimEnd - Whether to ignore whitespaces at the end of each line
   */
  getLayout(i, t, e = !0) {
    const o = this.getFont(i, t);
    return C([...i], t, o, e);
  }
  /**
   * Measure the text using the specified style.
   * @param text - The text to measure
   * @param style - The style to use
   * @param trimEnd - Whether to ignore whitespaces at the end of each line
   */
  measureText(i, t, e = !0) {
    return this.getLayout(i, t, e);
  }
  // eslint-disable-next-line max-len
  install(...i) {
    var p, f, m, c;
    let t = i[0];
    typeof t == "string" && (t = {
      name: t,
      style: i[1],
      chars: (p = i[2]) == null ? void 0 : p.chars,
      resolution: (f = i[2]) == null ? void 0 : f.resolution,
      padding: (m = i[2]) == null ? void 0 : m.padding,
      skipKerning: (c = i[2]) == null ? void 0 : c.skipKerning
    }, y(g, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));
    const e = t == null ? void 0 : t.name;
    if (!e)
      throw new Error("[BitmapFontManager] Property `name` is required.");
    t = { ...this.defaultOptions, ...t };
    const o = t.style, r = o instanceof u ? o : new u(o), s = r._fill.fill !== null && r._fill.fill !== void 0, n = new d({
      style: r,
      overrideFill: s,
      skipKerning: t.skipKerning,
      padding: t.padding,
      resolution: t.resolution,
      overrideSize: !1
    }), h = v(t.chars);
    return n.ensureCharacters(h.join("")), a.set(`${e}-bitmap`, n), n.once("destroy", () => a.remove(`${e}-bitmap`)), n;
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * @param {string} name - The name of the bitmap font to uninstall.
   */
  uninstall(i) {
    const t = `${i}-bitmap`, e = a.get(t);
    e && e.destroy();
  }
}
const I = new b();
export {
  I as BitmapFontManager
};
//# sourceMappingURL=index563.js.map
