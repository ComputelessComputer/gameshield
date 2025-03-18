import { GLProgram as u } from "./index207.js";
import { compileShader as c } from "./index217.js";
import { defaultValue as S } from "./index218.js";
import { getAttributeData as b } from "./index219.js";
import { getUniformData as D } from "./index220.js";
import { logProgramError as T } from "./index221.js";
function V(t, a) {
  var m;
  const n = c(t, t.VERTEX_SHADER, a.vertexSrc), i = c(t, t.FRAGMENT_SHADER, a.fragmentSrc), e = t.createProgram();
  t.attachShader(e, n), t.attachShader(e, i);
  const s = (m = a.extra) == null ? void 0 : m.transformFeedbackVaryings;
  if (s && (typeof t.transformFeedbackVaryings != "function" ? console.warn("TransformFeedback is not supported but TransformFeedbackVaryings are given.") : t.transformFeedbackVaryings(
    e,
    s.names,
    s.bufferMode === "separate" ? t.SEPARATE_ATTRIBS : t.INTERLEAVED_ATTRIBS
  )), t.linkProgram(e), t.getProgramParameter(e, t.LINK_STATUS) || T(t, e, n, i), a.attributeData = b(e, t), a.uniformData = D(e, t), !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(a.vertexSrc)) {
    const o = Object.keys(a.attributeData);
    o.sort((r, d) => r > d ? 1 : -1);
    for (let r = 0; r < o.length; r++)
      a.attributeData[o[r]].location = r, t.bindAttribLocation(e, r, o[r]);
    t.linkProgram(e);
  }
  t.deleteShader(n), t.deleteShader(i);
  const f = {};
  for (const o in a.uniformData) {
    const r = a.uniformData[o];
    f[o] = {
      location: t.getUniformLocation(e, o),
      value: S(r.type, r.size)
    };
  }
  return new u(e, f);
}
export {
  V as generateProgram
};
//# sourceMappingURL=index215.js.map
