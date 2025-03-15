import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import { groupD8 as h } from "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
class l {
  constructor() {
    this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1, this.uvsFloat32 = new Float32Array(8);
  }
  /**
   * Sets the texture Uvs based on the given frame information.
   * @protected
   * @param frame - The frame of the texture
   * @param baseFrame - The base frame of the texture
   * @param rotate - Rotation of frame, see {@link PIXI.groupD8}
   */
  set(s, d, i) {
    const t = d.width, x = d.height;
    if (i) {
      const y = s.width / 2 / t, u = s.height / 2 / x, o = s.x / t + y, p = s.y / x + u;
      i = h.add(i, h.NW), this.x0 = o + y * h.uX(i), this.y0 = p + u * h.uY(i), i = h.add(i, 2), this.x1 = o + y * h.uX(i), this.y1 = p + u * h.uY(i), i = h.add(i, 2), this.x2 = o + y * h.uX(i), this.y2 = p + u * h.uY(i), i = h.add(i, 2), this.x3 = o + y * h.uX(i), this.y3 = p + u * h.uY(i);
    } else
      this.x0 = s.x / t, this.y0 = s.y / x, this.x1 = (s.x + s.width) / t, this.y1 = s.y / x, this.x2 = (s.x + s.width) / t, this.y2 = (s.y + s.height) / x, this.x3 = s.x / t, this.y3 = (s.y + s.height) / x;
    this.uvsFloat32[0] = this.x0, this.uvsFloat32[1] = this.y0, this.uvsFloat32[2] = this.x1, this.uvsFloat32[3] = this.y1, this.uvsFloat32[4] = this.x2, this.uvsFloat32[5] = this.y2, this.uvsFloat32[6] = this.x3, this.uvsFloat32[7] = this.y3;
  }
}
l.prototype.toString = function() {
  return `[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`;
};
export {
  l as TextureUvs
};
//# sourceMappingURL=index67.js.map
