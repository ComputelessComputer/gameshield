import "./index23.js";
import { Color as d } from "./index24.js";
import "./index25.js";
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
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import "./index51.js";
import { Filter as a } from "./index52.js";
import "./index53.js";
import { defaultFilterVertex as y } from "./index167.js";
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
import "./index64.js";
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
import "./index76.js";
import "./index77.js";
import "./index78.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import w from "./index175.js";
class _ extends a {
  constructor() {
    const i = {
      m: new Float32Array([
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ]),
      uAlpha: 1
    };
    super(y, w, i), this.alpha = 1;
  }
  /**
   * Transforms current matrix and set the new one
   * @param {number[]} matrix - 5x4 matrix
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  _loadMatrix(i, r = !1) {
    let t = i;
    r && (this._multiply(t, this.uniforms.m, i), t = this._colorMatrix(t)), this.uniforms.m = t;
  }
  /**
   * Multiplies two mat5's
   * @private
   * @param out - 5x4 matrix the receiving matrix
   * @param a - 5x4 matrix the first operand
   * @param b - 5x4 matrix the second operand
   * @returns {number[]} 5x4 matrix
   */
  _multiply(i, r, t) {
    return i[0] = r[0] * t[0] + r[1] * t[5] + r[2] * t[10] + r[3] * t[15], i[1] = r[0] * t[1] + r[1] * t[6] + r[2] * t[11] + r[3] * t[16], i[2] = r[0] * t[2] + r[1] * t[7] + r[2] * t[12] + r[3] * t[17], i[3] = r[0] * t[3] + r[1] * t[8] + r[2] * t[13] + r[3] * t[18], i[4] = r[0] * t[4] + r[1] * t[9] + r[2] * t[14] + r[3] * t[19] + r[4], i[5] = r[5] * t[0] + r[6] * t[5] + r[7] * t[10] + r[8] * t[15], i[6] = r[5] * t[1] + r[6] * t[6] + r[7] * t[11] + r[8] * t[16], i[7] = r[5] * t[2] + r[6] * t[7] + r[7] * t[12] + r[8] * t[17], i[8] = r[5] * t[3] + r[6] * t[8] + r[7] * t[13] + r[8] * t[18], i[9] = r[5] * t[4] + r[6] * t[9] + r[7] * t[14] + r[8] * t[19] + r[9], i[10] = r[10] * t[0] + r[11] * t[5] + r[12] * t[10] + r[13] * t[15], i[11] = r[10] * t[1] + r[11] * t[6] + r[12] * t[11] + r[13] * t[16], i[12] = r[10] * t[2] + r[11] * t[7] + r[12] * t[12] + r[13] * t[17], i[13] = r[10] * t[3] + r[11] * t[8] + r[12] * t[13] + r[13] * t[18], i[14] = r[10] * t[4] + r[11] * t[9] + r[12] * t[14] + r[13] * t[19] + r[14], i[15] = r[15] * t[0] + r[16] * t[5] + r[17] * t[10] + r[18] * t[15], i[16] = r[15] * t[1] + r[16] * t[6] + r[17] * t[11] + r[18] * t[16], i[17] = r[15] * t[2] + r[16] * t[7] + r[17] * t[12] + r[18] * t[17], i[18] = r[15] * t[3] + r[16] * t[8] + r[17] * t[13] + r[18] * t[18], i[19] = r[15] * t[4] + r[16] * t[9] + r[17] * t[14] + r[18] * t[19] + r[19], i;
  }
  /**
   * Create a Float32 Array and normalize the offset component to 0-1
   * @param {number[]} matrix - 5x4 matrix
   * @returns {number[]} 5x4 matrix with all values between 0-1
   */
  _colorMatrix(i) {
    const r = new Float32Array(i);
    return r[4] /= 255, r[9] /= 255, r[14] /= 255, r[19] /= 255, r;
  }
  /**
   * Adjusts brightness
   * @param b - value of the brigthness (0-1, where 0 is black)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  brightness(i, r) {
    const t = [
      i,
      0,
      0,
      0,
      0,
      0,
      i,
      0,
      0,
      0,
      0,
      0,
      i,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(t, r);
  }
  /**
   * Sets each channel on the diagonal of the color matrix.
   * This can be used to achieve a tinting effect on Containers similar to the tint field of some
   * display objects like Sprite, Text, Graphics, and Mesh.
   * @param color - Color of the tint. This is a hex value.
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  tint(i, r) {
    const [t, o, p] = d.shared.setValue(i).toArray(), m = [
      t,
      0,
      0,
      0,
      0,
      0,
      o,
      0,
      0,
      0,
      0,
      0,
      p,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(m, r);
  }
  /**
   * Set the matrices in grey scales
   * @param scale - value of the grey (0-1, where 0 is black)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  greyscale(i, r) {
    const t = [
      i,
      i,
      i,
      0,
      0,
      i,
      i,
      i,
      0,
      0,
      i,
      i,
      i,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(t, r);
  }
  /**
   * Set the black and white matrice.
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  blackAndWhite(i) {
    const r = [
      0.3,
      0.6,
      0.1,
      0,
      0,
      0.3,
      0.6,
      0.1,
      0,
      0,
      0.3,
      0.6,
      0.1,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /**
   * Set the hue property of the color
   * @param rotation - in degrees
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  hue(i, r) {
    i = (i || 0) / 180 * Math.PI;
    const t = Math.cos(i), o = Math.sin(i), p = Math.sqrt, m = 1 / 3, s = p(m), x = t + (1 - t) * m, h = m * (1 - t) - s * o, l = m * (1 - t) + s * o, e = m * (1 - t) + s * o, c = t + m * (1 - t), M = m * (1 - t) - s * o, n = m * (1 - t) - s * o, f = m * (1 - t) + s * o, g = t + m * (1 - t), A = [
      x,
      h,
      l,
      0,
      0,
      e,
      c,
      M,
      0,
      0,
      n,
      f,
      g,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(A, r);
  }
  /**
   * Set the contrast matrix, increase the separation between dark and bright
   * Increase contrast : shadows darker and highlights brighter
   * Decrease contrast : bring the shadows up and the highlights down
   * @param amount - value of the contrast (0-1)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  contrast(i, r) {
    const t = (i || 0) + 1, o = -0.5 * (t - 1), p = [
      t,
      0,
      0,
      0,
      o,
      0,
      t,
      0,
      0,
      o,
      0,
      0,
      t,
      0,
      o,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(p, r);
  }
  /**
   * Set the saturation matrix, increase the separation between colors
   * Increase saturation : increase contrast, brightness, and sharpness
   * @param amount - The saturation amount (0-1)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  saturate(i = 0, r) {
    const t = i * 2 / 3 + 1, o = (t - 1) * -0.5, p = [
      t,
      o,
      o,
      0,
      0,
      o,
      t,
      o,
      0,
      0,
      o,
      o,
      t,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(p, r);
  }
  /** Desaturate image (remove color) Call the saturate function */
  desaturate() {
    this.saturate(-1);
  }
  /**
   * Negative image (inverse of classic rgb matrix)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  negative(i) {
    const r = [
      -1,
      0,
      0,
      1,
      0,
      0,
      -1,
      0,
      1,
      0,
      0,
      0,
      -1,
      1,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /**
   * Sepia image
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  sepia(i) {
    const r = [
      0.393,
      0.7689999,
      0.18899999,
      0,
      0,
      0.349,
      0.6859999,
      0.16799999,
      0,
      0,
      0.272,
      0.5339999,
      0.13099999,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /**
   * Color motion picture process invented in 1916 (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  technicolor(i) {
    const r = [
      1.9125277891456083,
      -0.8545344976951645,
      -0.09155508482755585,
      0,
      11.793603434377337,
      -0.3087833385928097,
      1.7658908555458428,
      -0.10601743074722245,
      0,
      -70.35205161461398,
      -0.231103377548616,
      -0.7501899197440212,
      1.847597816108189,
      0,
      30.950940869491138,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /**
   * Polaroid filter
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  polaroid(i) {
    const r = [
      1.438,
      -0.062,
      -0.062,
      0,
      0,
      -0.122,
      1.378,
      -0.122,
      0,
      0,
      -0.016,
      -0.016,
      1.483,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /**
   * Filter who transforms : Red -> Blue and Blue -> Red
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  toBGR(i) {
    const r = [
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /**
   * Color reversal film introduced by Eastman Kodak in 1935. (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  kodachrome(i) {
    const r = [
      1.1285582396593525,
      -0.3967382283601348,
      -0.03992559172921793,
      0,
      63.72958762196502,
      -0.16404339962244616,
      1.0835251566291304,
      -0.05498805115633132,
      0,
      24.732407896706203,
      -0.16786010706155763,
      -0.5603416277695248,
      1.6014850761964943,
      0,
      35.62982807460946,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /**
   * Brown delicious browni filter (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  browni(i) {
    const r = [
      0.5997023498159715,
      0.34553243048391263,
      -0.2708298674538042,
      0,
      47.43192855600873,
      -0.037703249837783157,
      0.8609577587992641,
      0.15059552388459913,
      0,
      -36.96841498319127,
      0.24113635128153335,
      -0.07441037908422492,
      0.44972182064877153,
      0,
      -7.562075277591283,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /**
   * Vintage filter (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  vintage(i) {
    const r = [
      0.6279345635605994,
      0.3202183420819367,
      -0.03965408211312453,
      0,
      9.651285835294123,
      0.02578397704808868,
      0.6441188644374771,
      0.03259127616149294,
      0,
      7.462829176470591,
      0.0466055556782719,
      -0.0851232987247891,
      0.5241648018700465,
      0,
      5.159190588235296,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /**
   * We don't know exactly what it does, kind of gradient map, but funny to play with!
   * @param desaturation - Tone values.
   * @param toned - Tone values.
   * @param lightColor - Tone values, example: `0xFFE580`
   * @param darkColor - Tone values, example: `0xFFE580`
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  colorTone(i, r, t, o, p) {
    i = i || 0.2, r = r || 0.15, t = t || 16770432, o = o || 3375104;
    const m = d.shared, [s, x, h] = m.setValue(t).toArray(), [l, e, c] = m.setValue(o).toArray(), M = [
      0.3,
      0.59,
      0.11,
      0,
      0,
      s,
      x,
      h,
      i,
      0,
      l,
      e,
      c,
      r,
      0,
      s - l,
      x - e,
      h - c,
      0,
      0
    ];
    this._loadMatrix(M, p);
  }
  /**
   * Night effect
   * @param intensity - The intensity of the night effect.
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  night(i, r) {
    i = i || 0.1;
    const t = [
      i * -2,
      -i,
      0,
      0,
      0,
      -i,
      0,
      i,
      0,
      0,
      0,
      i,
      i * 2,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(t, r);
  }
  /**
   * Predator effect
   *
   * Erase the current matrix by setting a new indepent one
   * @param amount - how much the predator feels his future victim
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  predator(i, r) {
    const t = [
      // row 1
      11.224130630493164 * i,
      -4.794486999511719 * i,
      -2.8746118545532227 * i,
      0 * i,
      0.40342438220977783 * i,
      // row 2
      -3.6330697536468506 * i,
      9.193157196044922 * i,
      -2.951810836791992 * i,
      0 * i,
      -1.316135048866272 * i,
      // row 3
      -3.2184197902679443 * i,
      -4.2375030517578125 * i,
      7.476448059082031 * i,
      0 * i,
      0.8044459223747253 * i,
      // row 4
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(t, r);
  }
  /**
   * LSD effect
   *
   * Multiply the current matrix
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */
  lsd(i) {
    const r = [
      2,
      -0.4,
      0.5,
      0,
      0,
      -0.5,
      2,
      -0.4,
      0,
      0,
      -0.4,
      -0.5,
      3,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(r, i);
  }
  /** Erase the current matrix by setting the default one. */
  reset() {
    const i = [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ];
    this._loadMatrix(i, !1);
  }
  /**
   * The matrix of the color matrix filter
   * @member {number[]}
   * @default [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
   */
  get matrix() {
    return this.uniforms.m;
  }
  set matrix(i) {
    this.uniforms.m = i;
  }
  /**
   * The opacity value to use when mixing the original and resultant colors.
   *
   * When the value is 0, the original color is used without modification.
   * When the value is 1, the result color is used.
   * When in the range (0, 1) the color is interpolated between the original and result by this amount.
   * @default 1
   */
  get alpha() {
    return this.uniforms.uAlpha;
  }
  set alpha(i) {
    this.uniforms.uAlpha = i;
  }
}
_.prototype.grayscale = _.prototype.greyscale;
export {
  _ as ColorMatrixFilter
};
//# sourceMappingURL=index109.js.map
