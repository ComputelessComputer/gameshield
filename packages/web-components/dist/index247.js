const c = {
  5: [0.153388, 0.221461, 0.250301],
  7: [0.071303, 0.131514, 0.189879, 0.214607],
  9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
  11: [93e-4, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
  13: [2406e-6, 9255e-6, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
  15: [489e-6, 2403e-6, 9246e-6, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
}, i = [
  "varying vec2 vBlurTexCoords[%size%];",
  "uniform sampler2D uSampler;",
  "void main(void)",
  "{",
  "    gl_FragColor = vec4(0.0);",
  "    %blur%",
  "}"
].join(`
`);
function p(l) {
  const u = c[l], n = u.length;
  let r = i, o = "";
  const g = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;";
  let t;
  for (let e = 0; e < l; e++) {
    let a = g.replace("%index%", e.toString());
    t = e, e >= n && (t = l - e - 1), a = a.replace("%value%", u[t].toString()), o += a, o += `
`;
  }
  return r = r.replace("%blur%", o), r = r.replace("%size%", l.toString()), r;
}
export {
  p as generateBlurFragSource
};
//# sourceMappingURL=index247.js.map
