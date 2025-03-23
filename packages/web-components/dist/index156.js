import { Cache as u } from "./index340.js";
import { extensions as a, ExtensionType as h } from "./index153.js";
import { TextureSource as m } from "./index474.js";
import { Texture as f } from "./index360.js";
const n = [];
a.handleByList(h.TextureSource, n);
function x(e = {}) {
  const t = e && e.resource, c = t ? e.resource : e, r = t ? e : { resource: e };
  for (let s = 0; s < n.length; s++) {
    const o = n[s];
    if (o.test(c))
      return new o(r);
  }
  throw new Error(`Could not find a source type for resource: ${r.resource}`);
}
function l(e = {}, t = !1) {
  const c = e && e.resource, r = c ? e.resource : e, s = c ? e : { resource: e };
  if (!t && u.has(r))
    return u.get(r);
  const o = new f({ source: x(s) });
  return o.on("destroy", () => {
    u.has(r) && u.remove(r);
  }), t || u.set(r, o), o;
}
function T(e, t = !1) {
  return typeof e == "string" ? u.get(e) : e instanceof m ? new f({ source: e }) : l(e, t);
}
f.from = T;
m.from = x;
export {
  l as resourceToTexture,
  T as textureFrom
};
//# sourceMappingURL=index156.js.map
