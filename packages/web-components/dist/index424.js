import { ExtensionType as X } from "./index153.js";
import { Batcher as Y } from "./index415.js";
import { BatchGeometry as E } from "./index421.js";
import { DefaultShader as G } from "./index425.js";
let P = null;
const R = class T extends Y {
  constructor() {
    super(...arguments), this.geometry = new E(), this.shader = P || (P = new G(this.maxTextures)), this.name = T.extension.name, this.vertexSize = 6;
  }
  /**
   * Packs the attributes of a DefaultBatchableMeshElement into the provided views.
   * @param element - The DefaultBatchableMeshElement to pack.
   * @param float32View - The Float32Array view to pack into.
   * @param uint32View - The Uint32Array view to pack into.
   * @param index - The starting index in the views.
   * @param textureId - The texture ID to use.
   */
  packAttributes(o, s, u, t, k) {
    const z = k << 16 | o.roundPixels & 65535, c = o.transform, m = c.a, p = c.b, B = c.c, g = c.d, v = c.tx, A = c.ty, { positions: h, uvs: n } = o, D = o.color, y = o.attributeOffset, S = y + o.attributeSize;
    for (let r = y; r < S; r++) {
      const a = r * 2, b = h[a], I = h[a + 1];
      s[t++] = m * b + B * I + v, s[t++] = g * I + p * b + A, s[t++] = n[a], s[t++] = n[a + 1], u[t++] = D, u[t++] = z;
    }
  }
  /**
   * Packs the attributes of a DefaultBatchableQuadElement into the provided views.
   * @param element - The DefaultBatchableQuadElement to pack.
   * @param float32View - The Float32Array view to pack into.
   * @param uint32View - The Uint32Array view to pack into.
   * @param index - The starting index in the views.
   * @param textureId - The texture ID to use.
   */
  packQuadAttributes(o, s, u, t, k) {
    const z = o.texture, c = o.transform, m = c.a, p = c.b, B = c.c, g = c.d, v = c.tx, A = c.ty, h = o.bounds, n = h.maxX, D = h.minX, y = h.maxY, S = h.minY, r = z.uvs, a = o.color, b = k << 16 | o.roundPixels & 65535;
    s[t + 0] = m * D + B * S + v, s[t + 1] = g * S + p * D + A, s[t + 2] = r.x0, s[t + 3] = r.y0, u[t + 4] = a, u[t + 5] = b, s[t + 6] = m * n + B * S + v, s[t + 7] = g * S + p * n + A, s[t + 8] = r.x1, s[t + 9] = r.y1, u[t + 10] = a, u[t + 11] = b, s[t + 12] = m * n + B * y + v, s[t + 13] = g * y + p * n + A, s[t + 14] = r.x2, s[t + 15] = r.y2, u[t + 16] = a, u[t + 17] = b, s[t + 18] = m * D + B * y + v, s[t + 19] = g * y + p * D + A, s[t + 20] = r.x3, s[t + 21] = r.y3, u[t + 22] = a, u[t + 23] = b;
  }
};
R.extension = {
  type: [
    X.Batcher
  ],
  name: "default"
};
let q = R;
export {
  q as DefaultBatcher
};
//# sourceMappingURL=index424.js.map
