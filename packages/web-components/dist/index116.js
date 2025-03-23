import "./index20.js";
import "./index21.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import { Rectangle as n } from "./index25.js";
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
import { getResolutionOfUrl as _ } from "./index165.js";
import "./index43.js";
import "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import "./index50.js";
import { BaseTexture as u } from "./index51.js";
import "./index52.js";
import "./index53.js";
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
import { Texture as l } from "./index135.js";
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
import "./index64.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
const c = class m {
  /** @ignore */
  constructor(t, e, i) {
    this.linkedSheets = [], (t instanceof u || t instanceof l) && (t = { texture: t, data: e, resolutionFilename: i });
    const { texture: r, data: o, resolutionFilename: s = null, cachePrefix: a = "" } = t;
    this.cachePrefix = a, this._texture = r instanceof l ? r : null, this.baseTexture = r instanceof u ? r : this._texture.baseTexture, this.textures = {}, this.animations = {}, this.data = o;
    const h = this.baseTexture.resource;
    this.resolution = this._updateResolution(s || (h ? h.url : null)), this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
  }
  /**
   * Generate the resolution from the filename or fallback
   * to the meta.scale field of the JSON data.
   * @param resolutionFilename - The filename to use for resolving
   *        the default resolution.
   * @returns Resolution to use for spritesheet.
   */
  _updateResolution(t = null) {
    const { scale: e } = this.data.meta;
    let i = _(t, null);
    return i === null && (i = typeof e == "number" ? e : parseFloat(e ?? "1")), i !== 1 && this.baseTexture.setResolution(i), i;
  }
  /**
   * Parser spritesheet from loaded data. This is done asynchronously
   * to prevent creating too many Texture within a single process.
   * @method PIXI.Spritesheet#parse
   */
  parse() {
    return new Promise((t) => {
      this._callback = t, this._batchIndex = 0, this._frameKeys.length <= m.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch();
    });
  }
  /**
   * Process a batch of frames
   * @param initialFrameIndex - The index of frame to start.
   */
  _processFrames(t) {
    let e = t;
    const i = m.BATCH_SIZE;
    for (; e - t < i && e < this._frameKeys.length; ) {
      const r = this._frameKeys[e], o = this._frames[r], s = o.frame;
      if (s) {
        let a = null, h = null;
        const p = o.trimmed !== !1 && o.sourceSize ? o.sourceSize : o.frame, f = new n(
          0,
          0,
          Math.floor(p.w) / this.resolution,
          Math.floor(p.h) / this.resolution
        );
        o.rotated ? a = new n(
          Math.floor(s.x) / this.resolution,
          Math.floor(s.y) / this.resolution,
          Math.floor(s.h) / this.resolution,
          Math.floor(s.w) / this.resolution
        ) : a = new n(
          Math.floor(s.x) / this.resolution,
          Math.floor(s.y) / this.resolution,
          Math.floor(s.w) / this.resolution,
          Math.floor(s.h) / this.resolution
        ), o.trimmed !== !1 && o.spriteSourceSize && (h = new n(
          Math.floor(o.spriteSourceSize.x) / this.resolution,
          Math.floor(o.spriteSourceSize.y) / this.resolution,
          Math.floor(s.w) / this.resolution,
          Math.floor(s.h) / this.resolution
        )), this.textures[r] = new l(
          this.baseTexture,
          a,
          f,
          h,
          o.rotated ? 2 : 0,
          o.anchor,
          o.borders
        ), l.addToCache(this.textures[r], this.cachePrefix + r.toString());
      }
      e++;
    }
  }
  /** Parse animations config. */
  _processAnimations() {
    const t = this.data.animations || {};
    for (const e in t) {
      this.animations[e] = [];
      for (let i = 0; i < t[e].length; i++) {
        const r = t[e][i];
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
    this._processFrames(this._batchIndex * m.BATCH_SIZE), this._batchIndex++, setTimeout(() => {
      this._batchIndex * m.BATCH_SIZE < this._frameKeys.length ? this._nextBatch() : (this._processAnimations(), this._parseComplete());
    }, 0);
  }
  /**
   * Destroy Spritesheet and don't use after this.
   * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
   */
  destroy(t = !1) {
    var e;
    for (const i in this.textures)
      this.textures[i].destroy();
    this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && ((e = this._texture) == null || e.destroy(), this.baseTexture.destroy()), this._texture = null, this.baseTexture = null, this.linkedSheets = [];
  }
};
c.BATCH_SIZE = 1e3;
let It = c;
export {
  It as Spritesheet
};
//# sourceMappingURL=index116.js.map
