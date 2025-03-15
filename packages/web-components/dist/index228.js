import { mapSize as c } from "./index232.js";
import { mapType as s } from "./index310.js";
function p(a, t) {
  const n = {}, r = t.getProgramParameter(a, t.ACTIVE_ATTRIBUTES);
  for (let i = 0; i < r; i++) {
    const e = t.getActiveAttrib(a, i);
    if (e.name.startsWith("gl_"))
      continue;
    const o = s(t, e.type), m = {
      type: o,
      name: e.name,
      size: c(o),
      location: t.getAttribLocation(a, e.name)
    };
    n[e.name] = m;
  }
  return n;
}
export {
  p as getAttributeData
};
//# sourceMappingURL=index228.js.map
