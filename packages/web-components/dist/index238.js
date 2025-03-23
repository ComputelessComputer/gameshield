import { uniformParsers as u } from "./index244.js";
import "./index33.js";
import { mapSize as h } from "./index245.js";
function z(r, n, t, e, a) {
  t.buffer.update(a);
}
const S = {
  float: `
        data[offset] = v;
    `,
  vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
  vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
  vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
  mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
  mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
  mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
}, p = {
  float: 4,
  vec2: 8,
  vec3: 12,
  vec4: 16,
  int: 4,
  ivec2: 8,
  ivec3: 12,
  ivec4: 16,
  uint: 4,
  uvec2: 8,
  uvec3: 12,
  uvec4: 16,
  bool: 4,
  bvec2: 8,
  bvec3: 12,
  bvec4: 16,
  mat2: 16 * 2,
  mat3: 16 * 3,
  mat4: 16 * 4
};
function $(r) {
  const n = r.map((o) => ({
    data: o,
    offset: 0,
    dataLen: 0,
    dirty: 0
  }));
  let t = 0, e = 0, a = 0;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    if (t = p[s.data.type], s.data.size > 1 && (t = Math.max(t, 16) * s.data.size), s.dataLen = t, e % t !== 0 && e < 16) {
      const f = e % t % 16;
      e += f, a += f;
    }
    e + t > 16 ? (a = Math.ceil(a / 16) * 16, s.offset = a, a += t, e = t) : (s.offset = a, e += t, a += t);
  }
  return a = Math.ceil(a / 16) * 16, { uboElements: n, size: a };
}
function y(r, n) {
  const t = [];
  for (const e in r)
    n[e] && t.push(n[e]);
  return t.sort((e, a) => e.index - a.index), t;
}
function g(r, n) {
  if (!r.autoManage)
    return { size: 0, syncFunc: z };
  const t = y(r.uniforms, n), { uboElements: e, size: a } = $(t), o = [`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];
  for (let s = 0; s < e.length; s++) {
    const f = e[s], c = r.uniforms[f.data.name], i = f.data.name;
    let m = !1;
    for (let v = 0; v < u.length; v++) {
      const d = u[v];
      if (d.codeUbo && d.test(f.data, c)) {
        o.push(
          `offset = ${f.offset / 4};`,
          u[v].codeUbo(f.data.name, c)
        ), m = !0;
        break;
      }
    }
    if (!m)
      if (f.data.size > 1) {
        const v = h(f.data.type), d = Math.max(p[f.data.type] / 16, 1), l = v / d, b = (4 - l % 4) % 4;
        o.push(`
                cv = ud.${i}.value;
                v = uv.${i};
                offset = ${f.offset / 4};

                t = 0;

                for(var i=0; i < ${f.data.size * d}; i++)
                {
                    for(var j = 0; j < ${l}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${b};
                }

                `);
      } else {
        const v = S[f.data.type];
        o.push(`
                cv = ud.${i}.value;
                v = uv.${i};
                offset = ${f.offset / 4};
                ${v};
                `);
      }
  }
  return o.push(`
       renderer.buffer.update(buffer);
    `), {
    size: a,
    // eslint-disable-next-line no-new-func
    syncFunc: new Function(
      "ud",
      "uv",
      "renderer",
      "syncData",
      "buffer",
      o.join(`
`)
    )
  };
}
export {
  $ as createUBOElements,
  g as generateUniformBufferSync,
  y as getUBOData
};
//# sourceMappingURL=index238.js.map
