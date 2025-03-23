import { Rectangle as a } from "./index407.js";
import { Texture as u } from "./index360.js";
const f = class h {
  /**
   * @param texture - Reference to the source BaseTexture object.
   * @param {object} data - Spritesheet image data.
   */
  constructor(t, e) {
    this.linkedSheets = [], this._texture = t instanceof u ? t : null, this.textureSource = t.source, this.textures = {}, this.animations = {}, this.data = e;
    const o = parseFloat(e.meta.scale);
    o ? (this.resolution = o, t.source.resolution = this.resolution) : this.resolution = t.source._resolution, this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
  }
  /**
   * Parser spritesheet from loaded data. This is done asynchronously
   * to prevent creating too many Texture within a single process.
   */
  parse() {
    return new Promise((t) => {
      this._callback = t, this._batchIndex = 0, this._frameKeys.length <= h.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch();
    });
  }
  /**
   * Process a batch of frames
   * @param initialFrameIndex - The index of frame to start.
   */
  _processFrames(t) {
    let e = t;
    const o = h.BATCH_SIZE;
    for (; e - t < o && e < this._frameKeys.length; ) {
      const r = this._frameKeys[e], s = this._frames[r], i = s.frame;
      if (i) {
        let l = null, n = null;
        const c = s.trimmed !== !1 && s.sourceSize ? s.sourceSize : s.frame, m = new a(
          0,
          0,
          Math.floor(c.w) / this.resolution,
          Math.floor(c.h) / this.resolution
        );
        s.rotated ? l = new a(
          Math.floor(i.x) / this.resolution,
          Math.floor(i.y) / this.resolution,
          Math.floor(i.h) / this.resolution,
          Math.floor(i.w) / this.resolution
        ) : l = new a(
          Math.floor(i.x) / this.resolution,
          Math.floor(i.y) / this.resolution,
          Math.floor(i.w) / this.resolution,
          Math.floor(i.h) / this.resolution
        ), s.trimmed !== !1 && s.spriteSourceSize && (n = new a(
          Math.floor(s.spriteSourceSize.x) / this.resolution,
          Math.floor(s.spriteSourceSize.y) / this.resolution,
          Math.floor(i.w) / this.resolution,
          Math.floor(i.h) / this.resolution
        )), this.textures[r] = new u({
          source: this.textureSource,
          frame: l,
          orig: m,
          trim: n,
          rotate: s.rotated ? 2 : 0,
          defaultAnchor: s.anchor,
          defaultBorders: s.borders,
          label: r.toString()
        });
      }
      e++;
    }
  }
  /** Parse animations config. */
  _processAnimations() {
    const t = this.data.animations || {};
    for (const e in t) {
      this.animations[e] = [];
      for (let o = 0; o < t[e].length; o++) {
        const r = t[e][o];
        this.animations[e].push(this.textures[r]);
      }
    }
  }
  /** The parse has completed. */
  _parseComplete() {
    const t = this._callback;
    this._callback = null, this._batchIndex = 0, t.call(this, this.textures);
  }
  /** Begin the next batch of textures. */
  _nextBatch() {
    this._processFrames(this._batchIndex * h.BATCH_SIZE), this._batchIndex++, setTimeout(() => {
      this._batchIndex * h.BATCH_SIZE < this._frameKeys.length ? this._nextBatch() : (this._processAnimations(), this._parseComplete());
    }, 0);
  }
  /**
   * Destroy Spritesheet and don't use after this.
   * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
   */
  destroy(t = !1) {
    var e;
    for (const o in this.textures)
      this.textures[o].destroy();
    this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && ((e = this._texture) == null || e.destroy(), this.textureSource.destroy()), this._texture = null, this.textureSource = null, this.linkedSheets = [];
  }
};
f.BATCH_SIZE = 1e3;
let d = f;
export {
  d as Spritesheet
};
//# sourceMappingURL=index596.js.map
