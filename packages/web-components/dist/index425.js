import { compileHighShaderGlProgram as e, compileHighShaderGpuProgram as i } from "./index426.js";
import { colorBitGl as m, colorBit as a } from "./index427.js";
import { generateTextureBatchBitGl as c, generateTextureBatchBit as l } from "./index428.js";
import { roundPixelsBitGl as p, roundPixelsBit as s } from "./index429.js";
import { getBatchSamplersUniformGroup as h } from "./index430.js";
import { Shader as g } from "./index431.js";
class S extends g {
  constructor(r) {
    const o = e({
      name: "batch",
      bits: [
        m,
        c(r),
        p
      ]
    }), t = i({
      name: "batch",
      bits: [
        a,
        l(r),
        s
      ]
    });
    super({
      glProgram: o,
      gpuProgram: t,
      resources: {
        batchSamplers: h(r)
      }
    });
  }
}
export {
  S as DefaultShader
};
//# sourceMappingURL=index425.js.map
