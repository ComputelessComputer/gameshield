const n = {};
function o(e) {
  const t = [];
  if (e === 1)
    t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"), t.push("@group(1) @binding(1) var textureSampler1: sampler;");
  else {
    let r = 0;
    for (let u = 0; u < e; u++)
      t.push(`@group(1) @binding(${r++}) var textureSource${u + 1}: texture_2d<f32>;`), t.push(`@group(1) @binding(${r++}) var textureSampler${u + 1}: sampler;`);
  }
  return t.join(`
`);
}
function d(e) {
  const t = [];
  if (e === 1)
    t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");
  else {
    t.push("switch vTextureId {");
    for (let r = 0; r < e; r++)
      r === e - 1 ? t.push("  default:{") : t.push(`  case ${r}:{`), t.push(`      outColor = textureSampleGrad(textureSource${r + 1}, textureSampler${r + 1}, vUV, uvDx, uvDy);`), t.push("      break;}");
    t.push("}");
  }
  return t.join(`
`);
}
function l(e) {
  return n[e] || (n[e] = {
    name: "texture-batch-bit",
    vertex: {
      header: `
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,
      main: `
                vTextureId = aTextureIdAndRound.y;
            `,
      end: `
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `
    },
    fragment: {
      header: `
                @in @interpolate(flat) vTextureId: u32;

                ${o(e)}
            `,
      main: `
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${d(e)}
            `
    }
  }), n[e];
}
const i = {};
function a(e) {
  const t = [];
  for (let r = 0; r < e; r++)
    r > 0 && t.push("else"), r < e - 1 && t.push(`if(vTextureId < ${r}.5)`), t.push("{"), t.push(`	outColor = texture(uTextures[${r}], vUV);`), t.push("}");
  return t.join(`
`);
}
function p(e) {
  return i[e] || (i[e] = {
    name: "texture-batch-bit",
    vertex: {
      header: `
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,
      main: `
                vTextureId = aTextureIdAndRound.y;
            `,
      end: `
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `
    },
    fragment: {
      header: `
                in float vTextureId;

                uniform sampler2D uTextures[${e}];

            `,
      main: `

                ${a(e)}
            `
    }
  }), i[e];
}
export {
  l as generateTextureBatchBit,
  p as generateTextureBatchBitGl
};
//# sourceMappingURL=index428.js.map
