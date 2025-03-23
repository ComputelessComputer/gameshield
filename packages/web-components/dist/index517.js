import { Color as O } from "./index377.js";
import { DOMAdapter as L } from "./index365.js";
import { Matrix as C } from "./index393.js";
import { ImageSource as G } from "./index325.js";
import { Texture as z } from "./index360.js";
import { uid as M } from "./index416.js";
import { deprecation as v } from "./index477.js";
import { definedProps as _ } from "./index475.js";
const b = [{ offset: 0, color: "white" }, { offset: 1, color: "black" }], m = class y {
  constructor(...e) {
    this.uid = M("fillGradient"), this.type = "linear", this.colorStops = [];
    let t = V(e);
    t = { ...t.type === "radial" ? y.defaultRadialOptions : y.defaultLinearOptions, ..._(t) }, this._textureSize = t.textureSize, t.type === "radial" ? (this.center = t.center, this.outerCenter = t.outerCenter ?? this.center, this.innerRadius = t.innerRadius, this.outerRadius = t.outerRadius, this.scale = t.scale, this.rotation = t.rotation) : (this.start = t.start, this.end = t.end), this.textureSpace = t.textureSpace, this.type = t.type, t.colorStops.forEach((o) => {
      this.addColorStop(o.offset, o.color);
    });
  }
  /**
   * Adds a color stop to the gradient
   * @param offset - Position of the stop (0-1)
   * @param color - Color of the stop
   * @returns This gradient instance for chaining
   */
  addColorStop(e, t) {
    return this.colorStops.push({ offset: e, color: O.shared.setValue(t).toHexa() }), this;
  }
  /**
   * Builds the internal texture and transform for the gradient.
   * Called automatically when the gradient is first used.
   * @internal
   */
  buildLinearGradient() {
    if (this.texture)
      return;
    const e = this.colorStops.length ? this.colorStops : b, t = this._textureSize, { canvas: n, context: o } = w(t, 1), u = o.createLinearGradient(0, 0, this._textureSize, 0);
    g(u, e), o.fillStyle = u, o.fillRect(0, 0, t, 1), this.texture = new z({
      source: new G({
        resource: n
      })
    });
    const { x: h, y: c } = this.start, { x: p, y: x } = this.end, i = new C(), a = p - h, l = x - c, s = Math.sqrt(a * a + l * l), d = Math.atan2(l, a);
    i.scale(s / t, 1), i.rotate(d), i.translate(h, c), this.textureSpace === "local" && i.scale(t, t), this.transform = i;
  }
  buildGradient() {
    this.type === "linear" ? this.buildLinearGradient() : this.buildRadialGradient();
  }
  buildRadialGradient() {
    if (this.texture)
      return;
    const e = this.colorStops.length ? this.colorStops : b, t = this._textureSize, { canvas: n, context: o } = w(t, t), { x: u, y: h } = this.center, { x: c, y: p } = this.outerCenter, x = this.innerRadius, i = this.outerRadius, a = c - i, l = p - i, s = t / (i * 2), d = (u - a) * s, S = (h - l) * s, R = o.createRadialGradient(
      d,
      S,
      x * s,
      (c - a) * s,
      (p - l) * s,
      i * s
    );
    g(R, e), o.fillStyle = e[e.length - 1].color, o.fillRect(0, 0, t, t), o.fillStyle = R, o.translate(d, S), o.rotate(this.rotation), o.scale(1, this.scale), o.translate(-d, -S), o.fillRect(0, 0, t, t), this.texture = new z({
      source: new G({
        resource: n,
        addressModeU: "clamp-to-edge",
        addressModeV: "clamp-to-edge"
      })
    });
    const f = new C();
    f.scale(1 / s, 1 / s), f.translate(a, l), this.textureSpace === "local" && f.scale(t, t), this.transform = f;
  }
  /**
   * Gets a unique key representing the current state of the gradient.
   * Used internally for caching.
   * @returns Unique string key
   */
  get styleKey() {
    return this.uid;
  }
  destroy() {
    var e;
    (e = this.texture) == null || e.destroy(!0), this.texture = null;
  }
};
m.defaultLinearOptions = {
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  colorStops: [],
  textureSpace: "local",
  type: "linear",
  textureSize: 256
};
m.defaultRadialOptions = {
  center: { x: 0.5, y: 0.5 },
  innerRadius: 0,
  outerRadius: 0.5,
  colorStops: [],
  scale: 1,
  textureSpace: "local",
  type: "radial",
  textureSize: 256
};
let F = m;
function g(r, e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    r.addColorStop(n.offset, n.color);
  }
}
function w(r, e) {
  const t = L.get().createCanvas(r, e), n = t.getContext("2d");
  return { canvas: t, context: n };
}
function V(r) {
  let e = r[0] ?? {};
  return (typeof e == "number" || r[1]) && (v("8.5.2", "use options object instead"), e = {
    type: "linear",
    start: { x: r[0], y: r[1] },
    end: { x: r[2], y: r[3] },
    textureSpace: r[4],
    textureSize: r[5] ?? F.defaultLinearOptions.textureSize
  }), e;
}
export {
  F as FillGradient
};
//# sourceMappingURL=index517.js.map
