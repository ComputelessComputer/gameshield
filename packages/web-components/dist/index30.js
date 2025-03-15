import { Matrix as h } from "./index31.js";
const s = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], r = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], e = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], u = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], v = [], E = [], c = Math.sign;
function A() {
  for (let t = 0; t < 16; t++) {
    const a = [];
    v.push(a);
    for (let i = 0; i < 16; i++) {
      const p = c(s[t] * s[i] + e[t] * r[i]), R = c(r[t] * s[i] + u[t] * r[i]), M = c(s[t] * e[i] + e[t] * u[i]), N = c(r[t] * e[i] + u[t] * u[i]);
      for (let o = 0; o < 16; o++)
        if (s[o] === p && r[o] === R && e[o] === M && u[o] === N) {
          a.push(o);
          break;
        }
    }
  }
  for (let t = 0; t < 16; t++) {
    const a = new h();
    a.set(s[t], r[t], e[t], u[t], 0, 0), E.push(a);
  }
}
A();
const n = {
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 0°       | East      |
   * @readonly
   */
  E: 0,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 45°↻     | Southeast |
   * @readonly
   */
  SE: 1,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 90°↻     | South     |
   * @readonly
   */
  S: 2,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 135°↻    | Southwest |
   * @readonly
   */
  SW: 3,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 180°     | West      |
   * @readonly
   */
  W: 4,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -135°/225°↻ | Northwest    |
   * @readonly
   */
  NW: 5,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -90°/270°↻  | North        |
   * @readonly
   */
  N: 6,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -45°/315°↻  | Northeast    |
   * @readonly
   */
  NE: 7,
  /**
   * Reflection about Y-axis.
   * @readonly
   */
  MIRROR_VERTICAL: 8,
  /**
   * Reflection about the main diagonal.
   * @readonly
   */
  MAIN_DIAGONAL: 10,
  /**
   * Reflection about X-axis.
   * @readonly
   */
  MIRROR_HORIZONTAL: 12,
  /**
   * Reflection about reverse diagonal.
   * @readonly
   */
  REVERSE_DIAGONAL: 14,
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the U-axis
   *    after rotating the axes.
   */
  uX: (t) => s[t],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */
  uY: (t) => r[t],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */
  vX: (t) => e[t],
  /**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */
  vY: (t) => u[t],
  /**
   * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
   */
  inv: (t) => t & 8 ? t & 15 : -t & 7,
  /**
   * Composes the two D8 operations.
   *
   * Taking `^` as reflection:
   *
   * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
   * |-------|-----|-----|-----|-----|------|-------|-------|-------|
   * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
   * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
   * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
   * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
   * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
   * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
   * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
   * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
   *
   * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation, which
   *   is the row in the above cayley table.
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation, which
   *   is the column in the above cayley table.
   * @returns {PIXI.GD8Symmetry} Composed operation
   */
  add: (t, a) => v[t][a],
  /**
   * Reverse of `add`.
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */
  sub: (t, a) => v[t][n.inv(a)],
  /**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */
  rotate180: (t) => t ^ 4,
  /**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @param {PIXI.GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */
  isVertical: (t) => (t & 3) === 2,
  // rotation % 4 === 2
  /**
   * Approximates the vector `V(dx,dy)` into one of the
   * eight directions provided by `groupD8`.
   * @param {number} dx - X-component of the vector
   * @param {number} dy - Y-component of the vector
   * @returns {PIXI.GD8Symmetry} Approximation of the vector into
   *  one of the eight symmetries.
   */
  byDirection: (t, a) => Math.abs(t) * 2 <= Math.abs(a) ? a >= 0 ? n.S : n.N : Math.abs(a) * 2 <= Math.abs(t) ? t > 0 ? n.E : n.W : a > 0 ? t > 0 ? n.SE : n.SW : t > 0 ? n.NE : n.NW,
  /**
   * Helps sprite to compensate texture packer rotation.
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: (t, a, i = 0, p = 0) => {
    const R = E[n.inv(a)];
    R.tx = i, R.ty = p, t.append(R);
  }
};
export {
  n as groupD8
};
//# sourceMappingURL=index30.js.map
