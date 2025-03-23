import { addBits as i } from "./index437.js";
import { compileHooks as u } from "./index438.js";
import { compileInputs as p } from "./index439.js";
import { compileOutputs as x } from "./index440.js";
import { injectBits as s } from "./index441.js";
const c = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ new Map();
let v = 0;
function M({
  template: t,
  bits: r
}) {
  const e = g(t, r);
  if (c[e])
    return c[e];
  const { vertex: n, fragment: o } = d(t, r);
  return c[e] = l(n, o, r), c[e];
}
function O({
  template: t,
  bits: r
}) {
  const e = g(t, r);
  return c[e] || (c[e] = l(t.vertex, t.fragment, r)), c[e];
}
function d(t, r) {
  const e = r.map((m) => m.vertex).filter((m) => !!m), n = r.map((m) => m.fragment).filter((m) => !!m);
  let o = p(e, t.vertex, !0);
  o = x(e, o);
  const f = p(n, t.fragment, !0);
  return {
    vertex: o,
    fragment: f
  };
}
function g(t, r) {
  return r.map((e) => (a.has(e) || a.set(e, v++), a.get(e))).sort((e, n) => e - n).join("-") + t.vertex + t.fragment;
}
function l(t, r, e) {
  const n = u(t), o = u(r);
  return e.forEach((f) => {
    i(f.vertex, n, f.name), i(f.fragment, o, f.name);
  }), {
    vertex: s(t, n),
    fragment: s(r, o)
  };
}
export {
  M as compileHighShader,
  O as compileHighShaderGl
};
//# sourceMappingURL=index434.js.map
