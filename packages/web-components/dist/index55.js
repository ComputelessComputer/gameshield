import { ENV as R, BUFFER_BITS as T, MSAA_QUALITY as u } from "./index164.js";
import { ExtensionType as c, extensions as p } from "./index140.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import { Rectangle as E } from "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
import "./index32.js";
import "./index33.js";
import "./index34.js";
import { settings as g } from "./index150.js";
import "./index36.js";
import { Framebuffer as a } from "./index205.js";
import { GLFramebuffer as m } from "./index206.js";
const N = new E();
class F {
  /**
   * @param renderer - The renderer this System works for.
   */
  constructor(t) {
    this.renderer = t, this.managedFramebuffers = [], this.unknownFramebuffer = new a(10, 10), this.msaaSamples = null;
  }
  /** Sets up the renderer context and necessary buffers. */
  contextChange() {
    this.disposeAll(!0);
    const t = this.gl = this.renderer.gl;
    if (this.CONTEXT_UID = this.renderer.CONTEXT_UID, this.current = this.unknownFramebuffer, this.viewport = new E(), this.hasMRT = !0, this.writeDepthTexture = !0, this.renderer.context.webGLVersion === 1) {
      let r = this.renderer.context.extensions.drawBuffers, e = this.renderer.context.extensions.depthTexture;
      g.PREFER_ENV === R.WEBGL_LEGACY && (r = null, e = null), r ? t.drawBuffers = (i) => r.drawBuffersWEBGL(i) : (this.hasMRT = !1, t.drawBuffers = () => {
      }), e || (this.writeDepthTexture = !1);
    } else
      this.msaaSamples = t.getInternalformatParameter(t.RENDERBUFFER, t.RGBA8, t.SAMPLES);
  }
  /**
   * Bind a framebuffer.
   * @param framebuffer
   * @param frame - frame, default is framebuffer size
   * @param mipLevel - optional mip level to set on the framebuffer - defaults to 0
   */
  bind(t, r, e = 0) {
    const { gl: i } = this;
    if (t) {
      const n = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t);
      this.current !== t && (this.current = t, i.bindFramebuffer(i.FRAMEBUFFER, n.framebuffer)), n.mipLevel !== e && (t.dirtyId++, t.dirtyFormat++, n.mipLevel = e), n.dirtyId !== t.dirtyId && (n.dirtyId = t.dirtyId, n.dirtyFormat !== t.dirtyFormat ? (n.dirtyFormat = t.dirtyFormat, n.dirtySize = t.dirtySize, this.updateFramebuffer(t, e)) : n.dirtySize !== t.dirtySize && (n.dirtySize = t.dirtySize, this.resizeFramebuffer(t)));
      for (let s = 0; s < t.colorTextures.length; s++) {
        const d = t.colorTextures[s];
        this.renderer.texture.unbind(d.parentTextureArray || d);
      }
      if (t.depthTexture && this.renderer.texture.unbind(t.depthTexture), r) {
        const s = r.width >> e, d = r.height >> e, h = s / r.width;
        this.setViewport(
          r.x * h,
          r.y * h,
          s,
          d
        );
      } else {
        const s = t.width >> e, d = t.height >> e;
        this.setViewport(0, 0, s, d);
      }
    } else
      this.current && (this.current = null, i.bindFramebuffer(i.FRAMEBUFFER, null)), r ? this.setViewport(r.x, r.y, r.width, r.height) : this.setViewport(0, 0, this.renderer.width, this.renderer.height);
  }
  /**
   * Set the WebGLRenderingContext's viewport.
   * @param x - X position of viewport
   * @param y - Y position of viewport
   * @param width - Width of viewport
   * @param height - Height of viewport
   */
  setViewport(t, r, e, i) {
    const n = this.viewport;
    t = Math.round(t), r = Math.round(r), e = Math.round(e), i = Math.round(i), (n.width !== e || n.height !== i || n.x !== t || n.y !== r) && (n.x = t, n.y = r, n.width = e, n.height = i, this.gl.viewport(t, r, e, i));
  }
  /**
   * Get the size of the current width and height. Returns object with `width` and `height` values.
   * @readonly
   */
  get size() {
    return this.current ? { x: 0, y: 0, width: this.current.width, height: this.current.height } : { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height };
  }
  /**
   * Clear the color of the context
   * @param r - Red value from 0 to 1
   * @param g - Green value from 0 to 1
   * @param b - Blue value from 0 to 1
   * @param a - Alpha value from 0 to 1
   * @param {PIXI.BUFFER_BITS} [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */
  clear(t, r, e, i, n = T.COLOR | T.DEPTH) {
    const { gl: s } = this;
    s.clearColor(t, r, e, i), s.clear(n);
  }
  /**
   * Initialize framebuffer for this context
   * @protected
   * @param framebuffer
   * @returns - created GLFramebuffer
   */
  initFramebuffer(t) {
    const { gl: r } = this, e = new m(r.createFramebuffer());
    return e.multisample = this.detectSamples(t.multisample), t.glFramebuffers[this.CONTEXT_UID] = e, this.managedFramebuffers.push(t), t.disposeRunner.add(this), e;
  }
  /**
   * Resize the framebuffer
   * @param framebuffer
   * @protected
   */
  resizeFramebuffer(t) {
    const { gl: r } = this, e = t.glFramebuffers[this.CONTEXT_UID];
    if (e.stencil) {
      r.bindRenderbuffer(r.RENDERBUFFER, e.stencil);
      let s;
      this.renderer.context.webGLVersion === 1 ? s = r.DEPTH_STENCIL : t.depth && t.stencil ? s = r.DEPTH24_STENCIL8 : t.depth ? s = r.DEPTH_COMPONENT24 : s = r.STENCIL_INDEX8, e.msaaBuffer ? r.renderbufferStorageMultisample(
        r.RENDERBUFFER,
        e.multisample,
        s,
        t.width,
        t.height
      ) : r.renderbufferStorage(r.RENDERBUFFER, s, t.width, t.height);
    }
    const i = t.colorTextures;
    let n = i.length;
    r.drawBuffers || (n = Math.min(n, 1));
    for (let s = 0; s < n; s++) {
      const d = i[s], h = d.parentTextureArray || d;
      this.renderer.texture.bind(h, 0), s === 0 && e.msaaBuffer && (r.bindRenderbuffer(r.RENDERBUFFER, e.msaaBuffer), r.renderbufferStorageMultisample(
        r.RENDERBUFFER,
        e.multisample,
        h._glTextures[this.CONTEXT_UID].internalFormat,
        t.width,
        t.height
      ));
    }
    t.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(t.depthTexture, 0);
  }
  /**
   * Update the framebuffer
   * @param framebuffer
   * @param mipLevel
   * @protected
   */
  updateFramebuffer(t, r) {
    const { gl: e } = this, i = t.glFramebuffers[this.CONTEXT_UID], n = t.colorTextures;
    let s = n.length;
    e.drawBuffers || (s = Math.min(s, 1)), i.multisample > 1 && this.canMultisampleFramebuffer(t) ? i.msaaBuffer = i.msaaBuffer || e.createRenderbuffer() : i.msaaBuffer && (e.deleteRenderbuffer(i.msaaBuffer), i.msaaBuffer = null, i.blitFramebuffer && (i.blitFramebuffer.dispose(), i.blitFramebuffer = null));
    const d = [];
    for (let h = 0; h < s; h++) {
      const o = n[h], l = o.parentTextureArray || o;
      this.renderer.texture.bind(l, 0), h === 0 && i.msaaBuffer ? (e.bindRenderbuffer(e.RENDERBUFFER, i.msaaBuffer), e.renderbufferStorageMultisample(
        e.RENDERBUFFER,
        i.multisample,
        l._glTextures[this.CONTEXT_UID].internalFormat,
        t.width,
        t.height
      ), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, i.msaaBuffer)) : (e.framebufferTexture2D(
        e.FRAMEBUFFER,
        e.COLOR_ATTACHMENT0 + h,
        o.target,
        l._glTextures[this.CONTEXT_UID].texture,
        r
      ), d.push(e.COLOR_ATTACHMENT0 + h));
    }
    if (d.length > 1 && e.drawBuffers(d), t.depthTexture && this.writeDepthTexture) {
      const h = t.depthTexture;
      this.renderer.texture.bind(h, 0), e.framebufferTexture2D(
        e.FRAMEBUFFER,
        e.DEPTH_ATTACHMENT,
        e.TEXTURE_2D,
        h._glTextures[this.CONTEXT_UID].texture,
        r
      );
    }
    if ((t.stencil || t.depth) && !(t.depthTexture && this.writeDepthTexture)) {
      i.stencil = i.stencil || e.createRenderbuffer();
      let h, o;
      this.renderer.context.webGLVersion === 1 ? (h = e.DEPTH_STENCIL_ATTACHMENT, o = e.DEPTH_STENCIL) : t.depth && t.stencil ? (h = e.DEPTH_STENCIL_ATTACHMENT, o = e.DEPTH24_STENCIL8) : t.depth ? (h = e.DEPTH_ATTACHMENT, o = e.DEPTH_COMPONENT24) : (h = e.STENCIL_ATTACHMENT, o = e.STENCIL_INDEX8), e.bindRenderbuffer(e.RENDERBUFFER, i.stencil), i.msaaBuffer ? e.renderbufferStorageMultisample(
        e.RENDERBUFFER,
        i.multisample,
        o,
        t.width,
        t.height
      ) : e.renderbufferStorage(e.RENDERBUFFER, o, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, h, e.RENDERBUFFER, i.stencil);
    } else
      i.stencil && (e.deleteRenderbuffer(i.stencil), i.stencil = null);
  }
  /**
   * Returns true if the frame buffer can be multisampled.
   * @param framebuffer
   */
  canMultisampleFramebuffer(t) {
    return this.renderer.context.webGLVersion !== 1 && t.colorTextures.length <= 1 && !t.depthTexture;
  }
  /**
   * Detects number of samples that is not more than a param but as close to it as possible
   * @param samples - number of samples
   * @returns - recommended number of samples
   */
  detectSamples(t) {
    const { msaaSamples: r } = this;
    let e = u.NONE;
    if (t <= 1 || r === null)
      return e;
    for (let i = 0; i < r.length; i++)
      if (r[i] <= t) {
        e = r[i];
        break;
      }
    return e === 1 && (e = u.NONE), e;
  }
  /**
   * Only works with WebGL2
   *
   * blits framebuffer to another of the same or bigger size
   * after that target framebuffer is bound
   *
   * Fails with WebGL warning if blits multisample framebuffer to different size
   * @param framebuffer - by default it blits "into itself", from renderBuffer to texture.
   * @param sourcePixels - source rectangle in pixels
   * @param destPixels - dest rectangle in pixels, assumed to be the same as sourcePixels
   */
  blit(t, r, e) {
    const { current: i, renderer: n, gl: s, CONTEXT_UID: d } = this;
    if (n.context.webGLVersion !== 2 || !i)
      return;
    const h = i.glFramebuffers[d];
    if (!h)
      return;
    if (!t) {
      if (!h.msaaBuffer)
        return;
      const l = i.colorTextures[0];
      if (!l)
        return;
      h.blitFramebuffer || (h.blitFramebuffer = new a(i.width, i.height), h.blitFramebuffer.addColorTexture(0, l)), t = h.blitFramebuffer, t.colorTextures[0] !== l && (t.colorTextures[0] = l, t.dirtyId++, t.dirtyFormat++), (t.width !== i.width || t.height !== i.height) && (t.width = i.width, t.height = i.height, t.dirtyId++, t.dirtySize++);
    }
    r || (r = N, r.width = i.width, r.height = i.height), e || (e = r);
    const o = r.width === e.width && r.height === e.height;
    this.bind(t), s.bindFramebuffer(s.READ_FRAMEBUFFER, h.framebuffer), s.blitFramebuffer(
      r.left,
      r.top,
      r.right,
      r.bottom,
      e.left,
      e.top,
      e.right,
      e.bottom,
      s.COLOR_BUFFER_BIT,
      o ? s.NEAREST : s.LINEAR
    ), s.bindFramebuffer(s.READ_FRAMEBUFFER, t.glFramebuffers[this.CONTEXT_UID].framebuffer);
  }
  /**
   * Disposes framebuffer.
   * @param framebuffer - framebuffer that has to be disposed of
   * @param contextLost - If context was lost, we suppress all delete function calls
   */
  disposeFramebuffer(t, r) {
    const e = t.glFramebuffers[this.CONTEXT_UID], i = this.gl;
    if (!e)
      return;
    delete t.glFramebuffers[this.CONTEXT_UID];
    const n = this.managedFramebuffers.indexOf(t);
    n >= 0 && this.managedFramebuffers.splice(n, 1), t.disposeRunner.remove(this), r || (i.deleteFramebuffer(e.framebuffer), e.msaaBuffer && i.deleteRenderbuffer(e.msaaBuffer), e.stencil && i.deleteRenderbuffer(e.stencil)), e.blitFramebuffer && this.disposeFramebuffer(e.blitFramebuffer, r);
  }
  /**
   * Disposes all framebuffers, but not textures bound to them.
   * @param [contextLost=false] - If context was lost, we suppress all delete function calls
   */
  disposeAll(t) {
    const r = this.managedFramebuffers;
    this.managedFramebuffers = [];
    for (let e = 0; e < r.length; e++)
      this.disposeFramebuffer(r[e], t);
  }
  /**
   * Forcing creation of stencil buffer for current framebuffer, if it wasn't done before.
   * Used by MaskSystem, when its time to use stencil mask for Graphics element.
   *
   * Its an alternative for public lazy `framebuffer.enableStencil`, in case we need stencil without rebind.
   * @private
   */
  forceStencil() {
    const t = this.current;
    if (!t)
      return;
    const r = t.glFramebuffers[this.CONTEXT_UID];
    if (!r || r.stencil && t.stencil)
      return;
    t.stencil = !0;
    const e = t.width, i = t.height, n = this.gl, s = r.stencil = n.createRenderbuffer();
    n.bindRenderbuffer(n.RENDERBUFFER, s);
    let d, h;
    this.renderer.context.webGLVersion === 1 ? (d = n.DEPTH_STENCIL_ATTACHMENT, h = n.DEPTH_STENCIL) : t.depth ? (d = n.DEPTH_STENCIL_ATTACHMENT, h = n.DEPTH24_STENCIL8) : (d = n.STENCIL_ATTACHMENT, h = n.STENCIL_INDEX8), r.msaaBuffer ? n.renderbufferStorageMultisample(n.RENDERBUFFER, r.multisample, h, e, i) : n.renderbufferStorage(n.RENDERBUFFER, h, e, i), n.framebufferRenderbuffer(n.FRAMEBUFFER, d, n.RENDERBUFFER, s);
  }
  /** Resets framebuffer stored state, binds screen framebuffer. Should be called before renderTexture reset(). */
  reset() {
    this.current = this.unknownFramebuffer, this.viewport = new E();
  }
  destroy() {
    this.renderer = null;
  }
}
F.extension = {
  type: c.RendererSystem,
  name: "framebuffer"
};
p.add(F);
export {
  F as FramebufferSystem
};
//# sourceMappingURL=index55.js.map
