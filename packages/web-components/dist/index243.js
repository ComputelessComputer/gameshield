function i(o, e) {
  const a = o.getShaderSource(e).split(`
`).map((r, l) => `${l}: ${r}`), t = o.getShaderInfoLog(e), s = t.split(`
`), c = {}, g = s.map((r) => parseFloat(r.replace(/^ERROR\: 0\:([\d]+)\:.*$/, "$1"))).filter((r) => r && !c[r] ? (c[r] = !0, !0) : !1), n = [""];
  g.forEach((r) => {
    a[r - 1] = `%c${a[r - 1]}%c`, n.push("background: #FF0000; color:#FFFFFF; font-size: 10px", "font-size: 10px");
  });
  const d = a.join(`
`);
  n[0] = d, console.error(t), console.groupCollapsed("click to view full shader code"), console.warn(...n), console.groupEnd();
}
function S(o, e, a, t) {
  o.getProgramParameter(e, o.LINK_STATUS) || (o.getShaderParameter(a, o.COMPILE_STATUS) || i(o, a), o.getShaderParameter(t, o.COMPILE_STATUS) || i(o, t), console.error("PixiJS Error: Could not initialize shader."), o.getProgramInfoLog(e) !== "" && console.warn("PixiJS Warning: gl.getProgramInfoLog()", o.getProgramInfoLog(e)));
}
export {
  S as logProgramError
};
//# sourceMappingURL=index243.js.map
