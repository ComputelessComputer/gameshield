import { Matrix as r } from "./index393.js";
import { uid as d } from "./index416.js";
const t = {
  repeat: {
    addressModeU: "repeat",
    addressModeV: "repeat"
  },
  "repeat-x": {
    addressModeU: "repeat",
    addressModeV: "clamp-to-edge"
  },
  "repeat-y": {
    addressModeU: "clamp-to-edge",
    addressModeV: "repeat"
  },
  "no-repeat": {
    addressModeU: "clamp-to-edge",
    addressModeV: "clamp-to-edge"
  }
};
class l {
  constructor(e, s) {
    this.uid = d("fillPattern"), this.transform = new r(), this._styleKey = null, this.texture = e, this.transform.scale(
      1 / e.frame.width,
      1 / e.frame.height
    ), s && (e.source.style.addressModeU = t[s].addressModeU, e.source.style.addressModeV = t[s].addressModeV);
  }
  setTransform(e) {
    const s = this.texture;
    this.transform.copyFrom(e), this.transform.invert(), this.transform.scale(
      1 / s.frame.width,
      1 / s.frame.height
    ), this._styleKey = null;
  }
  get styleKey() {
    return this._styleKey ? this._styleKey : (this._styleKey = `fill-pattern-${this.uid}-${this.texture.uid}-${this.transform.toArray().join("-")}`, this._styleKey);
  }
}
export {
  l as FillPattern
};
//# sourceMappingURL=index518.js.map
