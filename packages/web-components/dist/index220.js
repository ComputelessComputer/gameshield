import { defaultValue as s } from "./index218.js";
import { mapType as p } from "./index310.js";
function y(a, t) {
  const i = {}, n = t.getProgramParameter(a, t.ACTIVE_UNIFORMS);
  for (let r = 0; r < n; r++) {
    const e = t.getActiveUniform(a, r), m = e.name.replace(/\[.*?\]$/, ""), f = !!e.name.match(/\[.*?\]$/), o = p(t, e.type);
    i[m] = {
      name: m,
      index: r,
      type: o,
      size: e.size,
      isArray: f,
      value: s(o, e.size)
    };
  }
  return i;
}
export {
  y as getUniformData
};
//# sourceMappingURL=index220.js.map
