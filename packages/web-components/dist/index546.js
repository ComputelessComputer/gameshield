import { Color as t } from "./index377.js";
import { Matrix as m } from "./index393.js";
import { GlProgram as u } from "./index432.js";
import { GpuProgram as a } from "./index433.js";
import { Shader as n } from "./index431.js";
import { Texture as i } from "./index360.js";
import { TextureStyle as f } from "./index476.js";
import p from "./index480.js";
import s from "./index481.js";
import r from "./index482.js";
class h extends n {
  constructor() {
    const o = u.from({
      vertex: s,
      fragment: p
    }), e = a.from({
      fragment: {
        source: r,
        entryPoint: "mainFragment"
      },
      vertex: {
        source: r,
        entryPoint: "mainVertex"
      }
    });
    super({
      glProgram: o,
      gpuProgram: e,
      resources: {
        // this will be replaced with the texture from the particle container
        uTexture: i.WHITE.source,
        // this will be replaced with the texture style from the particle container
        uSampler: new f({}),
        // this will be replaced with the local uniforms from the particle container
        uniforms: {
          uTranslationMatrix: { value: new m(), type: "mat3x3<f32>" },
          uColor: { value: new t(16777215), type: "vec4<f32>" },
          uRound: { value: 1, type: "f32" },
          uResolution: { value: [0, 0], type: "vec2<f32>" }
        }
      }
    });
  }
}
export {
  h as ParticleShader
};
//# sourceMappingURL=index546.js.map
