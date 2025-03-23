import "./index20.js";
import "./index21.js";
import { FORMATS as w } from "./index164.js";
import { ExtensionType as f, extensions as g } from "./index158.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import { Rectangle as A } from "./index25.js";
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
import { CanvasRenderTarget as y } from "./index264.js";
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
import { RenderTexture as T } from "./index134.js";
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
import "./index64.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
const l = new A(), x = 4, b = class s {
  /**
   * @param renderer - A reference to the current renderer
   */
  constructor(r) {
    this.renderer = r, this._rendererPremultipliedAlpha = !1;
  }
  contextChange() {
    var e;
    const r = (e = this.renderer) == null ? void 0 : e.gl.getContextAttributes();
    this._rendererPremultipliedAlpha = !!(r && r.alpha && r.premultipliedAlpha);
  }
  /**
   * Will return a HTML Image of the target
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param format - Image format, e.g. "image/jpeg" or "image/webp".
   * @param quality - JPEG or Webp compression from 0 to 1. Default is 0.92.
   * @param frame - The frame the extraction is restricted to.
   * @returns - HTML Image of the target
   */
  async image(r, e, t, o) {
    const n = new Image();
    return n.src = await this.base64(r, e, t, o), n;
  }
  /**
   * Will return a base64 encoded string of this target. It works by calling
   *  `Extract.canvas` and then running toDataURL on that.
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param format - Image format, e.g. "image/jpeg" or "image/webp".
   * @param quality - JPEG or Webp compression from 0 to 1. Default is 0.92.
   * @param frame - The frame the extraction is restricted to.
   * @returns - A base64 encoded string of the texture.
   */
  async base64(r, e, t, o) {
    const n = this.canvas(r, o);
    if (n.toBlob !== void 0)
      return new Promise((m, i) => {
        n.toBlob((p) => {
          if (!p) {
            i(new Error("ICanvas.toBlob failed!"));
            return;
          }
          const a = new FileReader();
          a.onload = () => m(a.result), a.onerror = i, a.readAsDataURL(p);
        }, e, t);
      });
    if (n.toDataURL !== void 0)
      return n.toDataURL(e, t);
    if (n.convertToBlob !== void 0) {
      const m = await n.convertToBlob({ type: e, quality: t });
      return new Promise((i, p) => {
        const a = new FileReader();
        a.onload = () => i(a.result), a.onerror = p, a.readAsDataURL(m);
      });
    }
    throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented");
  }
  /**
   * Creates a Canvas element, renders this target to it and then returns it.
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param frame - The frame the extraction is restricted to.
   * @returns - A Canvas element with the texture rendered on.
   */
  canvas(r, e) {
    const { pixels: t, width: o, height: n, flipY: m, premultipliedAlpha: i } = this._rawPixels(r, e);
    m && s._flipY(t, o, n), i && s._unpremultiplyAlpha(t);
    const p = new y(o, n, 1), a = new ImageData(new Uint8ClampedArray(t.buffer), o, n);
    return p.context.putImageData(a, 0, 0), p.canvas;
  }
  /**
   * Will return a one-dimensional array containing the pixel data of the entire texture in RGBA
   * order, with integer values between 0 and 255 (included).
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param frame - The frame the extraction is restricted to.
   * @returns - One-dimensional array containing the pixel data of the entire texture
   */
  pixels(r, e) {
    const { pixels: t, width: o, height: n, flipY: m, premultipliedAlpha: i } = this._rawPixels(r, e);
    return m && s._flipY(t, o, n), i && s._unpremultiplyAlpha(t), t;
  }
  _rawPixels(r, e) {
    const t = this.renderer;
    if (!t)
      throw new Error("The Extract has already been destroyed");
    let o, n = !1, m = !1, i, p = !1;
    r && (r instanceof T ? i = r : (i = t.generateTexture(r, {
      region: e,
      resolution: t.resolution,
      multisample: t.multisample
    }), p = !0, e && (l.width = e.width, l.height = e.height, e = l)));
    const a = t.gl;
    if (i) {
      if (o = i.baseTexture.resolution, e = e ?? i.frame, n = !1, m = i.baseTexture.alphaMode > 0 && i.baseTexture.format === w.RGBA, !p) {
        t.renderTexture.bind(i);
        const c = i.framebuffer.glFramebuffers[t.CONTEXT_UID];
        c.blitFramebuffer && t.framebuffer.bind(c.blitFramebuffer);
      }
    } else
      o = t.resolution, e || (e = l, e.width = t.width / o, e.height = t.height / o), n = !0, m = this._rendererPremultipliedAlpha, t.renderTexture.bind();
    const h = Math.max(Math.round(e.width * o), 1), d = Math.max(Math.round(e.height * o), 1), u = new Uint8Array(x * h * d);
    return a.readPixels(
      Math.round(e.x * o),
      Math.round(e.y * o),
      h,
      d,
      a.RGBA,
      a.UNSIGNED_BYTE,
      u
    ), p && (i == null || i.destroy(!0)), { pixels: u, width: h, height: d, flipY: n, premultipliedAlpha: m };
  }
  /** Destroys the extract. */
  destroy() {
    this.renderer = null;
  }
  static _flipY(r, e, t) {
    const o = e << 2, n = t >> 1, m = new Uint8Array(o);
    for (let i = 0; i < n; i++) {
      const p = i * o, a = (t - i - 1) * o;
      m.set(r.subarray(p, p + o)), r.copyWithin(p, a, a + o), r.set(m, a);
    }
  }
  static _unpremultiplyAlpha(r) {
    r instanceof Uint8ClampedArray && (r = new Uint8Array(r.buffer));
    const e = r.length;
    for (let t = 0; t < e; t += 4) {
      const o = r[t + 3];
      if (o !== 0) {
        const n = 255.001 / o;
        r[t] = r[t] * n + 0.5, r[t + 1] = r[t + 1] * n + 0.5, r[t + 2] = r[t + 2] * n + 0.5;
      }
    }
  }
};
b.extension = {
  name: "extract",
  type: f.RendererSystem
};
let E = b;
g.add(E);
export {
  E as Extract
};
//# sourceMappingURL=index105.js.map
