import { Buffer as e } from "./index193.js";
import { Geometry as v } from "./index194.js";
class c extends v {
  constructor() {
    super(), this.vertices = new Float32Array([
      -1,
      -1,
      1,
      -1,
      1,
      1,
      -1,
      1
    ]), this.uvs = new Float32Array([
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      1
    ]), this.vertexBuffer = new e(this.vertices), this.uvBuffer = new e(this.uvs), this.addAttribute("aVertexPosition", this.vertexBuffer).addAttribute("aTextureCoord", this.uvBuffer).addIndex([0, 1, 2, 0, 2, 3]);
  }
  /**
   * Maps two Rectangle to the quad.
   * @param targetTextureFrame - The first rectangle
   * @param destinationFrame - The second rectangle
   * @returns - Returns itself.
   */
  map(i, t) {
    let h = 0, s = 0;
    return this.uvs[0] = h, this.uvs[1] = s, this.uvs[2] = h + t.width / i.width, this.uvs[3] = s, this.uvs[4] = h + t.width / i.width, this.uvs[5] = s + t.height / i.height, this.uvs[6] = h, this.uvs[7] = s + t.height / i.height, h = t.x, s = t.y, this.vertices[0] = h, this.vertices[1] = s, this.vertices[2] = h + t.width, this.vertices[3] = s, this.vertices[4] = h + t.width, this.vertices[5] = s + t.height, this.vertices[6] = h, this.vertices[7] = s + t.height, this.invalidate(), this;
  }
  /**
   * Legacy upload method, just marks buffers dirty.
   * @returns - Returns itself.
   */
  invalidate() {
    return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this;
  }
}
export {
  c as QuadUv
};
//# sourceMappingURL=index210.js.map
