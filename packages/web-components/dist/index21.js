import { extend as m, colord as _ } from "./index378.js";
import p from "./index379.js";
m([p]);
const e = class h {
  /**
   * @param {PIXI.ColorSource} value - Optional value to use, if not provided, white is used.
   */
  constructor(t = 16777215) {
    this._value = null, this._components = new Float32Array(4), this._components.fill(1), this._int = 16777215, this.value = t;
  }
  /** Get red component (0 - 1) */
  get red() {
    return this._components[0];
  }
  /** Get green component (0 - 1) */
  get green() {
    return this._components[1];
  }
  /** Get blue component (0 - 1) */
  get blue() {
    return this._components[2];
  }
  /** Get alpha component (0 - 1) */
  get alpha() {
    return this._components[3];
  }
  /**
   * Set the value, suitable for chaining
   * @param value
   * @see PIXI.Color.value
   */
  setValue(t) {
    return this.value = t, this;
  }
  /**
   * The current color source.
   *
   * When setting:
   * - Setting to an instance of `Color` will copy its color source and components.
   * - Otherwise, `Color` will try to normalize the color source and set the components.
   *   If the color source is invalid, an `Error` will be thrown and the `Color` will left unchanged.
   *
   * Note: The `null` in the setter's parameter type is added to match the TypeScript rule: return type of getter
   * must be assignable to its setter's parameter type. Setting `value` to `null` will throw an `Error`.
   *
   * When getting:
   * - A return value of `null` means the previous value was overridden (e.g., {@link PIXI.Color.multiply multiply},
   *   {@link PIXI.Color.premultiply premultiply} or {@link PIXI.Color.round round}).
   * - Otherwise, the color source used when setting is returned.
   * @type {PIXI.ColorSource}
   */
  set value(t) {
    if (t instanceof h)
      this._value = this.cloneSource(t._value), this._int = t._int, this._components.set(t._components);
    else {
      if (t === null)
        throw new Error("Cannot set PIXI.Color#value to null");
      (this._value === null || !this.isSourceEqual(this._value, t)) && (this.normalize(t), this._value = this.cloneSource(t));
    }
  }
  get value() {
    return this._value;
  }
  /**
   * Copy a color source internally.
   * @param value - Color source
   */
  cloneSource(t) {
    return typeof t == "string" || typeof t == "number" || t instanceof Number || t === null ? t : Array.isArray(t) || ArrayBuffer.isView(t) ? t.slice(0) : typeof t == "object" && t !== null ? { ...t } : t;
  }
  /**
   * Equality check for color sources.
   * @param value1 - First color source
   * @param value2 - Second color source
   * @returns `true` if the color sources are equal, `false` otherwise.
   */
  isSourceEqual(t, n) {
    const r = typeof t;
    if (r !== typeof n)
      return !1;
    if (r === "number" || r === "string" || t instanceof Number)
      return t === n;
    if (Array.isArray(t) && Array.isArray(n) || ArrayBuffer.isView(t) && ArrayBuffer.isView(n))
      return t.length !== n.length ? !1 : t.every((s, o) => s === n[o]);
    if (t !== null && n !== null) {
      const s = Object.keys(t), o = Object.keys(n);
      return s.length !== o.length ? !1 : s.every((i) => t[i] === n[i]);
    }
    return t === n;
  }
  /**
   * Convert to a RGBA color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1, a: 1 }
   */
  toRgba() {
    const [t, n, r, s] = this._components;
    return { r: t, g: n, b: r, a: s };
  }
  /**
   * Convert to a RGB color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1 }
   */
  toRgb() {
    const [t, n, r] = this._components;
    return { r: t, g: n, b: r };
  }
  /** Convert to a CSS-style rgba string: `rgba(255,255,255,1.0)`. */
  toRgbaString() {
    const [t, n, r] = this.toUint8RgbArray();
    return `rgba(${t},${n},${r},${this.alpha})`;
  }
  toUint8RgbArray(t) {
    const [n, r, s] = this._components;
    return t = t ?? [], t[0] = Math.round(n * 255), t[1] = Math.round(r * 255), t[2] = Math.round(s * 255), t;
  }
  toRgbArray(t) {
    t = t ?? [];
    const [n, r, s] = this._components;
    return t[0] = n, t[1] = r, t[2] = s, t;
  }
  /**
   * Convert to a hexadecimal number.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toNumber(); // returns 16777215
   */
  toNumber() {
    return this._int;
  }
  /**
   * Convert to a hexadecimal number in little endian format (e.g., BBGGRR).
   * @example
   * import { Color } from 'pixi.js';
   * new Color(0xffcc99).toLittleEndianNumber(); // returns 0x99ccff
   * @returns {number} - The color as a number in little endian format.
   */
  toLittleEndianNumber() {
    const t = this._int;
    return (t >> 16) + (t & 65280) + ((t & 255) << 16);
  }
  /**
   * Multiply with another color. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param {PIXI.ColorSource} value - The color to multiply by.
   */
  multiply(t) {
    const [n, r, s, o] = h.temp.setValue(t)._components;
    return this._components[0] *= n, this._components[1] *= r, this._components[2] *= s, this._components[3] *= o, this.refreshInt(), this._value = null, this;
  }
  /**
   * Converts color to a premultiplied alpha format. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {PIXI.Color} - Itself.
   */
  premultiply(t, n = !0) {
    return n && (this._components[0] *= t, this._components[1] *= t, this._components[2] *= t), this._components[3] = t, this.refreshInt(), this._value = null, this;
  }
  /**
   * Premultiplies alpha with current color.
   * @param {number} alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {number} tint multiplied by alpha
   */
  toPremultiplied(t, n = !0) {
    if (t === 1)
      return (255 << 24) + this._int;
    if (t === 0)
      return n ? 0 : this._int;
    let r = this._int >> 16 & 255, s = this._int >> 8 & 255, o = this._int & 255;
    return n && (r = r * t + 0.5 | 0, s = s * t + 0.5 | 0, o = o * t + 0.5 | 0), (t * 255 << 24) + (r << 16) + (s << 8) + o;
  }
  /**
   * Convert to a hexidecimal string.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHex(); // returns "#ffffff"
   */
  toHex() {
    const t = this._int.toString(16);
    return `#${"000000".substring(0, 6 - t.length) + t}`;
  }
  /**
   * Convert to a hexidecimal string with alpha.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHexa(); // returns "#ffffffff"
   */
  toHexa() {
    const t = Math.round(this._components[3] * 255).toString(16);
    return this.toHex() + "00".substring(0, 2 - t.length) + t;
  }
  /**
   * Set alpha, suitable for chaining.
   * @param alpha
   */
  setAlpha(t) {
    return this._components[3] = this._clamp(t), this;
  }
  /**
   * Rounds the specified color according to the step. This action is destructive, and will
   * override the previous `value` property to be `null`. The alpha component is not rounded.
   * @param steps - Number of steps which will be used as a cap when rounding colors
   * @deprecated since 7.3.0
   */
  round(t) {
    const [n, r, s] = this._components;
    return this._components[0] = Math.round(n * t) / t, this._components[1] = Math.round(r * t) / t, this._components[2] = Math.round(s * t) / t, this.refreshInt(), this._value = null, this;
  }
  toArray(t) {
    t = t ?? [];
    const [n, r, s, o] = this._components;
    return t[0] = n, t[1] = r, t[2] = s, t[3] = o, t;
  }
  /**
   * Normalize the input value into rgba
   * @param value - Input value
   */
  normalize(t) {
    let n, r, s, o;
    if ((typeof t == "number" || t instanceof Number) && t >= 0 && t <= 16777215) {
      const i = t;
      n = (i >> 16 & 255) / 255, r = (i >> 8 & 255) / 255, s = (i & 255) / 255, o = 1;
    } else if ((Array.isArray(t) || t instanceof Float32Array) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t), [n, r, s, o = 1] = t;
    else if ((t instanceof Uint8Array || t instanceof Uint8ClampedArray) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t, 0, 255), [n, r, s, o = 255] = t, n /= 255, r /= 255, s /= 255, o /= 255;
    else if (typeof t == "string" || typeof t == "object") {
      if (typeof t == "string") {
        const c = h.HEX_PATTERN.exec(t);
        c && (t = `#${c[2]}`);
      }
      const i = _(t);
      i.isValid() && ({ r: n, g: r, b: s, a: o } = i.rgba, n /= 255, r /= 255, s /= 255);
    }
    if (n !== void 0)
      this._components[0] = n, this._components[1] = r, this._components[2] = s, this._components[3] = o, this.refreshInt();
    else
      throw new Error(`Unable to convert color ${t}`);
  }
  /** Refresh the internal color rgb number */
  refreshInt() {
    this._clamp(this._components);
    const [t, n, r] = this._components;
    this._int = (t * 255 << 16) + (n * 255 << 8) + (r * 255 | 0);
  }
  /**
   * Clamps values to a range. Will override original values
   * @param value - Value(s) to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   */
  _clamp(t, n = 0, r = 1) {
    return typeof t == "number" ? Math.min(Math.max(t, n), r) : (t.forEach((s, o) => {
      t[o] = Math.min(Math.max(s, n), r);
    }), t);
  }
};
e.shared = new e(), /**
* Temporary Color object for static uses internally.
* As to not conflict with Color.shared.
* @ignore
*/
e.temp = new e(), /** Pattern for hex strings */
e.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
let b = e;
export {
  b as Color
};
//# sourceMappingURL=index21.js.map
