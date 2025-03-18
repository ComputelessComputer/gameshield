import { SAMPLER_TYPES as o, TYPES as m, MIPMAP_MODES as h, WRAP_MODES as p, SCALE_MODES as n } from "./index164.js";
import { ExtensionType as l, extensions as _ } from "./index140.js";
import "./index40.js";
import "./index36.js";
import "./index41.js";
import "./index42.js";
import "./index43.js";
import "./index24.js";
import "./index44.js";
import { removeItems as u } from "./index141.js";
import "./index45.js";
import { BaseTexture as I } from "./index54.js";
import { GLTexture as a } from "./index228.js";
import { mapInternalFormatToSamplerType as y } from "./index234.js";
import { mapTypeAndFormatToInternalFormat as R } from "./index235.js";
class E {
  /**
   * @param renderer - The renderer this system works for.
   */
  constructor(e) {
    this.renderer = e, this.boundTextures = [], this.currentLocation = -1, this.managedTextures = [], this._unknownBoundTextures = !1, this.unknownTexture = new I(), this.hasIntegerTextures = !1;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    const e = this.gl = this.renderer.gl;
    this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.webGLVersion = this.renderer.context.webGLVersion, this.internalFormats = R(e), this.samplerTypes = y(e);
    const t = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS);
    this.boundTextures.length = t;
    for (let i = 0; i < t; i++)
      this.boundTextures[i] = null;
    this.emptyTextures = {};
    const r = new a(e.createTexture());
    e.bindTexture(e.TEXTURE_2D, r.texture), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, new Uint8Array(4)), this.emptyTextures[e.TEXTURE_2D] = r, this.emptyTextures[e.TEXTURE_CUBE_MAP] = new a(e.createTexture()), e.bindTexture(e.TEXTURE_CUBE_MAP, this.emptyTextures[e.TEXTURE_CUBE_MAP].texture);
    for (let i = 0; i < 6; i++)
      e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, null);
    e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_CUBE_MAP, e.TEXTURE_MIN_FILTER, e.LINEAR);
    for (let i = 0; i < this.boundTextures.length; i++)
      this.bind(null, i);
  }
  /**
   * Bind a texture to a specific location
   *
   * If you want to unbind something, please use `unbind(texture)` instead of `bind(null, textureLocation)`
   * @param texture - Texture to bind
   * @param [location=0] - Location to bind at
   */
  bind(e, t = 0) {
    const { gl: r } = this;
    if (e = e == null ? void 0 : e.castToBaseTexture(), (e == null ? void 0 : e.valid) && !e.parentTextureArray) {
      e.touched = this.renderer.textureGC.count;
      const i = e._glTextures[this.CONTEXT_UID] || this.initTexture(e);
      this.boundTextures[t] !== e && (this.currentLocation !== t && (this.currentLocation = t, r.activeTexture(r.TEXTURE0 + t)), r.bindTexture(e.target, i.texture)), i.dirtyId !== e.dirtyId ? (this.currentLocation !== t && (this.currentLocation = t, r.activeTexture(r.TEXTURE0 + t)), this.updateTexture(e)) : i.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(e), this.boundTextures[t] = e;
    } else
      this.currentLocation !== t && (this.currentLocation = t, r.activeTexture(r.TEXTURE0 + t)), r.bindTexture(r.TEXTURE_2D, this.emptyTextures[r.TEXTURE_2D].texture), this.boundTextures[t] = null;
  }
  /** Resets texture location and bound textures Actual `bind(null, i)` calls will be performed at next `unbind()` call */
  reset() {
    this._unknownBoundTextures = !0, this.hasIntegerTextures = !1, this.currentLocation = -1;
    for (let e = 0; e < this.boundTextures.length; e++)
      this.boundTextures[e] = this.unknownTexture;
  }
  /**
   * Unbind a texture.
   * @param texture - Texture to bind
   */
  unbind(e) {
    const { gl: t, boundTextures: r } = this;
    if (this._unknownBoundTextures) {
      this._unknownBoundTextures = !1;
      for (let i = 0; i < r.length; i++)
        r[i] === this.unknownTexture && this.bind(null, i);
    }
    for (let i = 0; i < r.length; i++)
      r[i] === e && (this.currentLocation !== i && (t.activeTexture(t.TEXTURE0 + i), this.currentLocation = i), t.bindTexture(e.target, this.emptyTextures[e.target].texture), r[i] = null);
  }
  /**
   * Ensures that current boundTextures all have FLOAT sampler type,
   * see {@link PIXI.SAMPLER_TYPES} for explanation.
   * @param maxTextures - number of locations to check
   */
  ensureSamplerType(e) {
    const { boundTextures: t, hasIntegerTextures: r, CONTEXT_UID: i } = this;
    if (r)
      for (let s = e - 1; s >= 0; --s) {
        const T = t[s];
        T && T._glTextures[i].samplerType !== o.FLOAT && this.renderer.texture.unbind(T);
      }
  }
  /**
   * Initialize a texture
   * @private
   * @param texture - Texture to initialize
   */
  initTexture(e) {
    const t = new a(this.gl.createTexture());
    return t.dirtyId = -1, e._glTextures[this.CONTEXT_UID] = t, this.managedTextures.push(e), e.on("dispose", this.destroyTexture, this), t;
  }
  initTextureType(e, t) {
    var r;
    t.internalFormat = ((r = this.internalFormats[e.type]) == null ? void 0 : r[e.format]) ?? e.format, t.samplerType = this.samplerTypes[t.internalFormat] ?? o.FLOAT, this.webGLVersion === 2 && e.type === m.HALF_FLOAT ? t.type = this.gl.HALF_FLOAT : t.type = e.type;
  }
  /**
   * Update a texture
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to initialize
   */
  updateTexture(e) {
    var i;
    const t = e._glTextures[this.CONTEXT_UID];
    if (!t)
      return;
    const r = this.renderer;
    if (this.initTextureType(e, t), (i = e.resource) == null ? void 0 : i.upload(r, e, t))
      t.samplerType !== o.FLOAT && (this.hasIntegerTextures = !0);
    else {
      const s = e.realWidth, T = e.realHeight, d = r.gl;
      (t.width !== s || t.height !== T || t.dirtyId < 0) && (t.width = s, t.height = T, d.texImage2D(
        e.target,
        0,
        t.internalFormat,
        s,
        T,
        0,
        e.format,
        t.type,
        null
      ));
    }
    e.dirtyStyleId !== t.dirtyStyleId && this.updateTextureStyle(e), t.dirtyId = e.dirtyId;
  }
  /**
   * Deletes the texture from WebGL
   * @private
   * @param texture - the texture to destroy
   * @param [skipRemove=false] - Whether to skip removing the texture from the TextureManager.
   */
  destroyTexture(e, t) {
    const { gl: r } = this;
    if (e = e.castToBaseTexture(), e._glTextures[this.CONTEXT_UID] && (this.unbind(e), r.deleteTexture(e._glTextures[this.CONTEXT_UID].texture), e.off("dispose", this.destroyTexture, this), delete e._glTextures[this.CONTEXT_UID], !t)) {
      const i = this.managedTextures.indexOf(e);
      i !== -1 && u(this.managedTextures, i, 1);
    }
  }
  /**
   * Update texture style such as mipmap flag
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to update
   */
  updateTextureStyle(e) {
    var r;
    const t = e._glTextures[this.CONTEXT_UID];
    t && ((e.mipmap === h.POW2 || this.webGLVersion !== 2) && !e.isPowerOfTwo ? t.mipmap = !1 : t.mipmap = e.mipmap >= 1, this.webGLVersion !== 2 && !e.isPowerOfTwo ? t.wrapMode = p.CLAMP : t.wrapMode = e.wrapMode, (r = e.resource) != null && r.style(this.renderer, e, t) || this.setStyle(e, t), t.dirtyStyleId = e.dirtyStyleId);
  }
  /**
   * Set style for texture
   * @private
   * @param texture - Texture to update
   * @param glTexture
   */
  setStyle(e, t) {
    const r = this.gl;
    if (t.mipmap && e.mipmap !== h.ON_MANUAL && r.generateMipmap(e.target), r.texParameteri(e.target, r.TEXTURE_WRAP_S, t.wrapMode), r.texParameteri(e.target, r.TEXTURE_WRAP_T, t.wrapMode), t.mipmap) {
      r.texParameteri(e.target, r.TEXTURE_MIN_FILTER, e.scaleMode === n.LINEAR ? r.LINEAR_MIPMAP_LINEAR : r.NEAREST_MIPMAP_NEAREST);
      const i = this.renderer.context.extensions.anisotropicFiltering;
      if (i && e.anisotropicLevel > 0 && e.scaleMode === n.LINEAR) {
        const s = Math.min(e.anisotropicLevel, r.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
        r.texParameterf(e.target, i.TEXTURE_MAX_ANISOTROPY_EXT, s);
      }
    } else
      r.texParameteri(e.target, r.TEXTURE_MIN_FILTER, e.scaleMode === n.LINEAR ? r.LINEAR : r.NEAREST);
    r.texParameteri(e.target, r.TEXTURE_MAG_FILTER, e.scaleMode === n.LINEAR ? r.LINEAR : r.NEAREST);
  }
  destroy() {
    this.renderer = null;
  }
}
E.extension = {
  type: l.RendererSystem,
  name: "texture"
};
_.add(E);
export {
  E as TextureSystem
};
//# sourceMappingURL=index75.js.map
