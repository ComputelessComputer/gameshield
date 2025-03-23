const c = {}, i = "8.0.0", t = "8.3.4";
function l(e, n, r = 3) {
  if (c[n])
    return;
  let o = new Error().stack;
  typeof o > "u" ? console.warn("PixiJS Deprecation Warning: ", `${n}
Deprecated since v${e}`) : (o = o.split(`
`).splice(r).join(`
`), console.groupCollapsed ? (console.groupCollapsed(
    "%cPixiJS Deprecation Warning: %c%s",
    "color:#614108;background:#fffbe6",
    "font-weight:normal;color:#614108;background:#fffbe6",
    `${n}
Deprecated since v${e}`
  ), console.warn(o), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${n}
Deprecated since v${e}`), console.warn(o))), c[n] = !0;
}
export {
  l as deprecation,
  i as v8_0_0,
  t as v8_3_4
};
//# sourceMappingURL=index477.js.map
