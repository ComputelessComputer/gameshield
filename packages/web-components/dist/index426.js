import { GlProgram as m } from "./index432.js";
import { GpuProgram as o } from "./index433.js";
import { compileHighShader as i, compileHighShaderGl as a } from "./index434.js";
import { fragmentGPUTemplate as n, vertexGPUTemplate as l, vertexGlTemplate as p, fragmentGlTemplate as f } from "./index435.js";
import { globalUniformsBit as g, globalUniformsBitGl as c } from "./index436.js";
function x({ bits: e, name: r }) {
  const t = i({
    template: {
      fragment: n,
      vertex: l
    },
    bits: [
      g,
      ...e
    ]
  });
  return o.from({
    name: r,
    vertex: {
      source: t.vertex,
      entryPoint: "main"
    },
    fragment: {
      source: t.fragment,
      entryPoint: "main"
    }
  });
}
function v({ bits: e, name: r }) {
  return new m({
    name: r,
    ...a({
      template: {
        vertex: p,
        fragment: f
      },
      bits: [
        c,
        ...e
      ]
    })
  });
}
export {
  v as compileHighShaderGlProgram,
  x as compileHighShaderGpuProgram
};
//# sourceMappingURL=index426.js.map
