import { Matrix as m } from "./index393.js";
import { getMaxTexturesPerBatch as a } from "./index412.js";
import { compileHighShaderGpuProgram as i, compileHighShaderGlProgram as l } from "./index426.js";
import { colorBit as f, colorBitGl as p } from "./index427.js";
import { generateTextureBatchBit as s, generateTextureBatchBitGl as u } from "./index428.js";
import { roundPixelsBit as n, roundPixelsBitGl as c } from "./index429.js";
import { getBatchSamplersUniformGroup as B } from "./index430.js";
import { Shader as d } from "./index431.js";
import { UniformGroup as h } from "./index396.js";
import { localUniformMSDFBit as x, localUniformMSDFBitGl as g } from "./index594.js";
import { mSDFBit as S, mSDFBitGl as G } from "./index595.js";
let o, t;
class C extends d {
  constructor() {
    const e = new h({
      uColor: { value: new Float32Array([1, 1, 1, 1]), type: "vec4<f32>" },
      uTransformMatrix: { value: new m(), type: "mat3x3<f32>" },
      uDistance: { value: 4, type: "f32" },
      uRound: { value: 0, type: "f32" }
    }), r = a();
    o ?? (o = i({
      name: "sdf-shader",
      bits: [
        f,
        s(r),
        x,
        S,
        n
      ]
    })), t ?? (t = l({
      name: "sdf-shader",
      bits: [
        p,
        u(r),
        g,
        G,
        c
      ]
    })), super({
      glProgram: t,
      gpuProgram: o,
      resources: {
        localUniforms: e,
        batchSamplers: B(r)
      }
    });
  }
}
export {
  C as SdfShader
};
//# sourceMappingURL=index569.js.map
