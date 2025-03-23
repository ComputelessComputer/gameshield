import { warn as i } from "./index338.js";
import { TextStyle as o } from "./index564.js";
import { generateTextStyleKey as h } from "./index577.js";
import { textStyleToCSS as d } from "./index578.js";
class r extends o {
  constructor(t = {}) {
    super(t), this._cssOverrides = [], this.cssOverrides ?? (this.cssOverrides = t.cssOverrides), this.tagStyles = t.tagStyles ?? {};
  }
  /** List of style overrides that will be applied to the HTML text. */
  set cssOverrides(t) {
    this._cssOverrides = t instanceof Array ? t : [t], this.update();
  }
  get cssOverrides() {
    return this._cssOverrides;
  }
  _generateKey() {
    return this._styleKey = h(this) + this._cssOverrides.join("-"), this._styleKey;
  }
  update() {
    this._cssStyle = null, super.update();
  }
  /**
   * Creates a new HTMLTextStyle object with the same values as this one.
   * @returns New cloned HTMLTextStyle object
   */
  clone() {
    return new r({
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this.dropShadow ? { ...this.dropShadow } : null,
      fill: this._fill,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth,
      cssOverrides: this.cssOverrides
    });
  }
  get cssStyle() {
    return this._cssStyle || (this._cssStyle = d(this)), this._cssStyle;
  }
  /**
   * Add a style override, this can be any CSS property
   * it will override any built-in style. This is the
   * property and the value as a string (e.g., `color: red`).
   * This will override any other internal style.
   * @param {string} value - CSS style(s) to add.
   * @example
   * style.addOverride('background-color: red');
   */
  addOverride(...t) {
    const s = t.filter((e) => !this.cssOverrides.includes(e));
    s.length > 0 && (this.cssOverrides.push(...s), this.update());
  }
  /**
   * Remove any overrides that match the value.
   * @param {string} value - CSS style to remove.
   * @example
   * style.removeOverride('background-color: red');
   */
  removeOverride(...t) {
    const s = t.filter((e) => this.cssOverrides.includes(e));
    s.length > 0 && (this.cssOverrides = this.cssOverrides.filter((e) => !s.includes(e)), this.update());
  }
  set fill(t) {
    typeof t != "string" && typeof t != "number" && i("[HTMLTextStyle] only color fill is not supported by HTMLText"), super.fill = t;
  }
  set stroke(t) {
    t && typeof t != "string" && typeof t != "number" && i("[HTMLTextStyle] only color stroke is not supported by HTMLText"), super.stroke = t;
  }
}
export {
  r as HTMLTextStyle
};
//# sourceMappingURL=index576.js.map
