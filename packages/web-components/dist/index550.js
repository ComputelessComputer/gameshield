import { Matrix as n } from "./index393.js";
import { compileHighShaderGpuProgram as T, compileHighShaderGlProgram as d } from "./index426.js";
import { localUniformBit as v, localUniformBitGl as x } from "./index442.js";
import { roundPixelsBit as h, roundPixelsBitGl as S } from "./index429.js";
import { Shader as C } from "./index431.js";
import { UniformGroup as p } from "./index396.js";
import { Texture as c } from "./index360.js";
import { tilingBit as A, tilingBitGl as M } from "./index549.js";
let m, a;
class O extends C {
  constructor() {
    m ?? (m = T({
      name: "tiling-sprite-shader",
      bits: [
        v,
        A,
        h
      ]
    })), a ?? (a = d({
      name: "tiling-sprite-shader",
      bits: [
        x,
        M,
        S
      ]
    }));
    const e = new p({
      uMapCoord: { value: new n(), type: "mat3x3<f32>" },
      uClampFrame: { value: new Float32Array([0, 0, 1, 1]), type: "vec4<f32>" },
      uClampOffset: { value: new Float32Array([0, 0]), type: "vec2<f32>" },
      uTextureTransform: { value: new n(), type: "mat3x3<f32>" },
      uSizeAnchor: { value: new Float32Array([100, 100, 0.5, 0.5]), type: "vec4<f32>" }
    });
    super({
      glProgram: a,
      gpuProgram: m,
      resources: {
        localUniforms: new p({
          uTransformMatrix: { value: new n(), type: "mat3x3<f32>" },
          uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
          uRound: { value: 0, type: "f32" }
        }),
        tilingUniforms: e,
        uTexture: c.EMPTY.source,
        uSampler: c.EMPTY.source.style
      }
    });
  }
  updateUniforms(e, i, o, g, y, t) {
    const r = this.resources.tilingUniforms, l = t.width, f = t.height, u = t.textureMatrix, s = r.uniforms.uTextureTransform;
    s.set(
      o.a * l / e,
      o.b * l / i,
      o.c * f / e,
      o.d * f / i,
      o.tx / e,
      o.ty / i
    ), s.invert(), r.uniforms.uMapCoord = u.mapCoord, r.uniforms.uClampFrame = u.uClampFrame, r.uniforms.uClampOffset = u.uClampOffset, r.uniforms.uTextureTransform = s, r.uniforms.uSizeAnchor[0] = e, r.uniforms.uSizeAnchor[1] = i, r.uniforms.uSizeAnchor[2] = g, r.uniforms.uSizeAnchor[3] = y, t && (this.resources.uTexture = t.source, this.resources.uSampler = t.source.style);
  }
}
export {
  O as TilingSpriteShader
};
//# sourceMappingURL=index550.js.map
