import { settings as n } from "./index153.js";
import "./index36.js";
import "./index40.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index24.js";
import "./index44.js";
import { uid as g } from "./index129.js";
import "./index45.js";
import { BaseImageResource as d } from "./index236.js";
const a = class o extends d {
  /**
   * @param sourceBase64 - Base64 encoded SVG element or URL for SVG file.
   * @param {object} [options] - Options to use
   * @param {number} [options.scale=1] - Scale to apply to SVG. Overridden by...
   * @param {number} [options.width] - Rasterize SVG this wide. Aspect ratio preserved if height not specified.
   * @param {number} [options.height] - Rasterize SVG this high. Aspect ratio preserved if width not specified.
   * @param {boolean} [options.autoLoad=true] - Start loading right away.
   */
  constructor(s, t) {
    t = t || {}, super(n.ADAPTER.createCanvas()), this._width = 0, this._height = 0, this.svg = s, this.scale = t.scale || 1, this._overrideWidth = t.width, this._overrideHeight = t.height, this._resolve = null, this._crossorigin = t.crossorigin, this._load = null, t.autoLoad !== !1 && this.load();
  }
  load() {
    return this._load ? this._load : (this._load = new Promise((s) => {
      if (this._resolve = () => {
        this.update(), s(this);
      }, o.SVG_XML.test(this.svg.trim())) {
        if (!btoa)
          throw new Error("Your browser doesn't support base64 conversions.");
        this.svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`;
      }
      this._loadSvg();
    }), this._load);
  }
  /** Loads an SVG image from `imageUrl` or `data URL`. */
  _loadSvg() {
    const s = new Image();
    d.crossOrigin(s, this.svg, this._crossorigin), s.src = this.svg, s.onerror = (t) => {
      this._resolve && (s.onerror = null, this.onError.emit(t));
    }, s.onload = () => {
      if (!this._resolve)
        return;
      const t = s.width, e = s.height;
      if (!t || !e)
        throw new Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");
      let i = t * this.scale, r = e * this.scale;
      (this._overrideWidth || this._overrideHeight) && (i = this._overrideWidth || this._overrideHeight / e * t, r = this._overrideHeight || this._overrideWidth / t * e), i = Math.round(i), r = Math.round(r);
      const h = this.source;
      h.width = i, h.height = r, h._pixiId = `canvas_${g()}`, h.getContext("2d").drawImage(s, 0, 0, t, e, 0, 0, i, r), this._resolve(), this._resolve = null;
    };
  }
  /**
   * Get size from an svg string using a regular expression.
   * @param svgString - a serialized svg element
   * @returns - image extension
   */
  static getSize(s) {
    const t = o.SVG_SIZE.exec(s), e = {};
    return t && (e[t[1]] = Math.round(parseFloat(t[3])), e[t[5]] = Math.round(parseFloat(t[7]))), e;
  }
  /** Destroys this texture. */
  dispose() {
    super.dispose(), this._resolve = null, this._crossorigin = null;
  }
  /**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} - If the source is a SVG source or data file
   */
  static test(s, t) {
    return t === "svg" || typeof s == "string" && s.startsWith("data:image/svg+xml") || typeof s == "string" && o.SVG_XML.test(s);
  }
  // eslint-disable-line max-len
};
a.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m, /**
* Regular expression for SVG size.
* @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
* @readonly
*/
a.SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;
let G = a;
export {
  G as SVGResource
};
//# sourceMappingURL=index80.js.map
