import { TYPES as t } from "./index164.js";
import { Buffer as r } from "./index180.js";
import { Geometry as f } from "./index181.js";
class s extends f {
  /**
   * @param {boolean} [_static=false] - Optimization flag, where `false`
   *        is updated every frame, `true` doesn't change frame-to-frame.
   */
  constructor(e = !1) {
    super(), this._buffer = new r(null, e, !1), this._indexBuffer = new r(null, e, !0), this.addAttribute("aVertexPosition", this._buffer, 2, !1, t.FLOAT).addAttribute("aTextureCoord", this._buffer, 2, !1, t.FLOAT).addAttribute("aColor", this._buffer, 4, !0, t.UNSIGNED_BYTE).addAttribute("aTextureId", this._buffer, 1, !0, t.FLOAT).addIndex(this._indexBuffer);
  }
}
export {
  s as BatchGeometry
};
//# sourceMappingURL=index179.js.map
