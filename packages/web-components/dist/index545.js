import { getAttributeInfoFromFormat as f } from "./index462.js";
function d(n) {
  return {
    dynamicUpdate: o(n, !0),
    staticUpdate: o(n, !1)
  };
}
function o(n, r) {
  const t = [];
  t.push(`
      
        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);
  let e = 0;
  for (const s in n) {
    const i = n[s];
    if (r !== i.dynamic)
      continue;
    t.push(`offset = index + ${e}`), t.push(i.code);
    const u = f(i.format);
    e += u.stride / 4;
  }
  t.push(`
            index += stride * 4;
        }
    `), t.unshift(`
        var stride = ${e};
    `);
  const c = t.join(`
`);
  return new Function("ps", "f32v", "u32v", c);
}
export {
  d as generateParticleUpdateFunction
};
//# sourceMappingURL=index545.js.map
