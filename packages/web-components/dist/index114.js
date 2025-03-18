import "./index23.js";
import { Color as g } from "./index24.js";
import { TYPES as z } from "./index146.js";
import { ExtensionType as M, extensions as T } from "./index140.js";
import "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import { Matrix as w } from "./index31.js";
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
import { correctBlendMode as P } from "./index44.js";
import "./index45.js";
import "./index46.js";
import "./index47.js";
import "./index48.js";
import "./index49.js";
import { Shader as R } from "./index182.js";
import "./index50.js";
import { ObjectRenderer as N } from "./index179.js";
import "./index51.js";
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
import "./index64.js";
import "./index65.js";
import "./index66.js";
import "./index67.js";
import "./index68.js";
import "./index69.js";
import "./index70.js";
import "./index71.js";
import { State as B } from "./index72.js";
import "./index73.js";
import "./index74.js";
import "./index75.js";
import "./index76.js";
import "./index77.js";
import "./index78.js";
import "./index79.js";
import "./index80.js";
import "./index81.js";
import { ParticleBuffer as _ } from "./index273.js";
import C from "./index274.js";
import D from "./index275.js";
class S extends N {
  /**
   * @param renderer - The renderer this sprite batch works for.
   */
  constructor(p) {
    super(p), this.shader = null, this.properties = null, this.tempMatrix = new w(), this.properties = [
      // verticesData
      {
        attributeName: "aVertexPosition",
        size: 2,
        uploadFunction: this.uploadVertices,
        offset: 0
      },
      // positionData
      {
        attributeName: "aPositionCoord",
        size: 2,
        uploadFunction: this.uploadPosition,
        offset: 0
      },
      // rotationData
      {
        attributeName: "aRotation",
        size: 1,
        uploadFunction: this.uploadRotation,
        offset: 0
      },
      // uvsData
      {
        attributeName: "aTextureCoord",
        size: 2,
        uploadFunction: this.uploadUvs,
        offset: 0
      },
      // tintData
      {
        attributeName: "aColor",
        size: 1,
        type: z.UNSIGNED_BYTE,
        uploadFunction: this.uploadTint,
        offset: 0
      }
    ], this.shader = R.from(D, C, {}), this.state = B.for2d();
  }
  /**
   * Renders the particle container object.
   * @param container - The container to render using this ParticleRenderer.
   */
  render(p) {
    const m = p.children, u = p._maxSize, i = p._batchSize, o = this.renderer;
    let t = m.length;
    if (t === 0)
      return;
    t > u && !p.autoResize && (t = u);
    let r = p._buffers;
    r || (r = p._buffers = this.generateBuffers(p));
    const e = m[0]._texture.baseTexture, h = e.alphaMode > 0;
    this.state.blendMode = P(p.blendMode, h), o.state.set(this.state);
    const d = o.gl, b = p.worldTransform.copyTo(this.tempMatrix);
    b.prepend(o.globalUniforms.uniforms.projectionMatrix), this.shader.uniforms.translationMatrix = b.toArray(!0), this.shader.uniforms.uColor = g.shared.setValue(p.tintRgb).premultiply(p.worldAlpha, h).toArray(this.shader.uniforms.uColor), this.shader.uniforms.uSampler = e, this.renderer.shader.bind(this.shader);
    let l = !1;
    for (let a = 0, x = 0; a < t; a += i, x += 1) {
      let s = t - a;
      s > i && (s = i), x >= r.length && r.push(this._generateOneMoreBuffer(p));
      const n = r[x];
      n.uploadDynamic(m, a, s);
      const c = p._bufferUpdateIDs[x] || 0;
      l = l || n._updateID < c, l && (n._updateID = p._updateID, n.uploadStatic(m, a, s)), o.geometry.bind(n.geometry), d.drawElements(d.TRIANGLES, s * 6, d.UNSIGNED_SHORT, 0);
    }
  }
  /**
   * Creates one particle buffer for each child in the container we want to render and updates internal properties.
   * @param container - The container to render using this ParticleRenderer
   * @returns - The buffers
   */
  generateBuffers(p) {
    const m = [], u = p._maxSize, i = p._batchSize, o = p._properties;
    for (let t = 0; t < u; t += i)
      m.push(new _(this.properties, o, i));
    return m;
  }
  /**
   * Creates one more particle buffer, because container has autoResize feature.
   * @param container - The container to render using this ParticleRenderer
   * @returns - The generated buffer
   */
  _generateOneMoreBuffer(p) {
    const m = p._batchSize, u = p._properties;
    return new _(this.properties, u, m);
  }
  /**
   * Uploads the vertices.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their vertices uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */
  uploadVertices(p, m, u, i, o, t) {
    let r = 0, e = 0, h = 0, d = 0;
    for (let b = 0; b < u; ++b) {
      const l = p[m + b], a = l._texture, x = l.scale.x, s = l.scale.y, n = a.trim, c = a.orig;
      n ? (e = n.x - l.anchor.x * c.width, r = e + n.width, d = n.y - l.anchor.y * c.height, h = d + n.height) : (r = c.width * (1 - l.anchor.x), e = c.width * -l.anchor.x, h = c.height * (1 - l.anchor.y), d = c.height * -l.anchor.y), i[t] = e * x, i[t + 1] = d * s, i[t + o] = r * x, i[t + o + 1] = d * s, i[t + o * 2] = r * x, i[t + o * 2 + 1] = h * s, i[t + o * 3] = e * x, i[t + o * 3 + 1] = h * s, t += o * 4;
    }
  }
  /**
   * Uploads the position.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their positions uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */
  uploadPosition(p, m, u, i, o, t) {
    for (let r = 0; r < u; r++) {
      const e = p[m + r].position;
      i[t] = e.x, i[t + 1] = e.y, i[t + o] = e.x, i[t + o + 1] = e.y, i[t + o * 2] = e.x, i[t + o * 2 + 1] = e.y, i[t + o * 3] = e.x, i[t + o * 3 + 1] = e.y, t += o * 4;
    }
  }
  /**
   * Uploads the rotation.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their rotation uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */
  uploadRotation(p, m, u, i, o, t) {
    for (let r = 0; r < u; r++) {
      const e = p[m + r].rotation;
      i[t] = e, i[t + o] = e, i[t + o * 2] = e, i[t + o * 3] = e, t += o * 4;
    }
  }
  /**
   * Uploads the UVs.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their rotation uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */
  uploadUvs(p, m, u, i, o, t) {
    for (let r = 0; r < u; ++r) {
      const e = p[m + r]._texture._uvs;
      e ? (i[t] = e.x0, i[t + 1] = e.y0, i[t + o] = e.x1, i[t + o + 1] = e.y1, i[t + o * 2] = e.x2, i[t + o * 2 + 1] = e.y2, i[t + o * 3] = e.x3, i[t + o * 3 + 1] = e.y3, t += o * 4) : (i[t] = 0, i[t + 1] = 0, i[t + o] = 0, i[t + o + 1] = 0, i[t + o * 2] = 0, i[t + o * 2 + 1] = 0, i[t + o * 3] = 0, i[t + o * 3 + 1] = 0, t += o * 4);
    }
  }
  /**
   * Uploads the tint.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their rotation uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */
  uploadTint(p, m, u, i, o, t) {
    for (let r = 0; r < u; ++r) {
      const e = p[m + r], h = g.shared.setValue(e._tintRGB).toPremultiplied(e.alpha, e.texture.baseTexture.alphaMode > 0);
      i[t] = h, i[t + o] = h, i[t + o * 2] = h, i[t + o * 3] = h, t += o * 4;
    }
  }
  /** Destroys the ParticleRenderer. */
  destroy() {
    super.destroy(), this.shader && (this.shader.destroy(), this.shader = null), this.tempMatrix = null;
  }
}
S.extension = {
  name: "particle",
  type: M.RendererPlugin
};
T.add(S);
export {
  S as ParticleRenderer
};
//# sourceMappingURL=index114.js.map
