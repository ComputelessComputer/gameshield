import { deprecation as w, v8_0_0 as Y } from "./index477.js";
import { MeshGeometry as b } from "./index535.js";
const d = class l extends b {
  constructor(...t) {
    super({});
    let h = t[0] ?? {};
    typeof h == "number" && (w(Y, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"), h = {
      width: h,
      height: t[1],
      verticesX: t[2],
      verticesY: t[3]
    }), this.build(h);
  }
  /**
   * Refreshes plane coordinates
   * @param options - Options to be applied to plane geometry
   */
  build(t) {
    t = { ...l.defaultOptions, ...t }, this.verticesX = this.verticesX ?? t.verticesX, this.verticesY = this.verticesY ?? t.verticesY, this.width = this.width ?? t.width, this.height = this.height ?? t.height;
    const h = this.verticesX * this.verticesY, o = [], n = [], v = [], r = this.verticesX - 1, c = this.verticesY - 1, f = this.width / r, X = this.height / c;
    for (let e = 0; e < h; e++) {
      const s = e % this.verticesX, i = e / this.verticesX | 0;
      o.push(s * f, i * X), n.push(s / r, i / c);
    }
    const p = r * c;
    for (let e = 0; e < p; e++) {
      const s = e % r, i = e / r | 0, y = i * this.verticesX + s, a = i * this.verticesX + s + 1, u = (i + 1) * this.verticesX + s, m = (i + 1) * this.verticesX + s + 1;
      v.push(
        y,
        a,
        u,
        a,
        m,
        u
      );
    }
    this.buffers[0].data = new Float32Array(o), this.buffers[1].data = new Float32Array(n), this.indexBuffer.data = new Uint32Array(v), this.buffers[0].update(), this.buffers[1].update(), this.indexBuffer.update();
  }
};
d.defaultOptions = {
  width: 100,
  height: 100,
  verticesX: 10,
  verticesY: 10
};
let G = d;
export {
  G as PlaneGeometry
};
//# sourceMappingURL=index534.js.map
