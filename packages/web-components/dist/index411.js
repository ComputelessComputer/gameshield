const a = [
  "precision mediump float;",
  "void main(void){",
  "float test = 0.1;",
  "%forloop%",
  "gl_FragColor = vec4(0.0);",
  "}"
].join(`
`);
function n(t) {
  let e = "";
  for (let r = 0; r < t; ++r)
    r > 0 && (e += `
else `), r < t - 1 && (e += `if(test == ${r}.0){}`);
  return e;
}
function i(t, e) {
  if (t === 0)
    throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
  const r = e.createShader(e.FRAGMENT_SHADER);
  try {
    for (; ; ) {
      const o = a.replace(/%forloop%/gi, n(t));
      if (e.shaderSource(r, o), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS))
        t = t / 2 | 0;
      else
        break;
    }
  } finally {
    e.deleteShader(r);
  }
  return t;
}
export {
  i as checkMaxIfStatementsInShader
};
//# sourceMappingURL=index411.js.map
