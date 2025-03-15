import { Matrix as r } from "./index31.js";
import { ObservablePoint as h } from "./index32.js";
const a = class {
  constructor() {
    this.worldTransform = new r(), this.localTransform = new r(), this.position = new h(this.onChange, this, 0, 0), this.scale = new h(this.onChange, this, 1, 1), this.pivot = new h(this.onChange, this, 0, 0), this.skew = new h(this.updateSkew, this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._localID = 0, this._currentLocalID = 0, this._worldID = 0, this._parentID = 0;
  }
  /** Called when a value changes. */
  onChange() {
    this._localID++;
  }
  /** Called when the skew or the rotation changes. */
  updateSkew() {
    this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this._localID++;
  }
  /** Updates the local transformation matrix. */
  updateLocalTransform() {
    const s = this.localTransform;
    this._localID !== this._currentLocalID && (s.a = this._cx * this.scale.x, s.b = this._sx * this.scale.x, s.c = this._cy * this.scale.y, s.d = this._sy * this.scale.y, s.tx = this.position.x - (this.pivot.x * s.a + this.pivot.y * s.c), s.ty = this.position.y - (this.pivot.x * s.b + this.pivot.y * s.d), this._currentLocalID = this._localID, this._parentID = -1);
  }
  /**
   * Updates the local and the world transformation matrices.
   * @param parentTransform - The parent transform
   */
  updateTransform(s) {
    const t = this.localTransform;
    if (this._localID !== this._currentLocalID && (t.a = this._cx * this.scale.x, t.b = this._sx * this.scale.x, t.c = this._cy * this.scale.y, t.d = this._sy * this.scale.y, t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c), t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d), this._currentLocalID = this._localID, this._parentID = -1), this._parentID !== s._worldID) {
      const i = s.worldTransform, o = this.worldTransform;
      o.a = t.a * i.a + t.b * i.c, o.b = t.a * i.b + t.b * i.d, o.c = t.c * i.a + t.d * i.c, o.d = t.c * i.b + t.d * i.d, o.tx = t.tx * i.a + t.ty * i.c + i.tx, o.ty = t.tx * i.b + t.ty * i.d + i.ty, this._parentID = s._worldID, this._worldID++;
    }
  }
  /**
   * Decomposes a matrix and sets the transforms properties based on it.
   * @param matrix - The matrix to decompose
   */
  setFromMatrix(s) {
    s.decompose(this), this._localID++;
  }
  /** The rotation of the object in radians. */
  get rotation() {
    return this._rotation;
  }
  set rotation(s) {
    this._rotation !== s && (this._rotation = s, this.updateSkew());
  }
};
a.IDENTITY = new a();
let n = a;
n.prototype.toString = function() {
  return `[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
};
export {
  n as Transform
};
//# sourceMappingURL=index34.js.map
