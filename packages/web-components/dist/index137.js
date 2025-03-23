const e = {};
function i(c, n, r = 3) {
  if (e[n])
    return;
  let o = new Error().stack;
  typeof o > "u" ? console.warn("PixiJS Deprecation Warning: ", `${n}
Deprecated since v${c}`) : (o = o.split(`
`).splice(r).join(`
`), console.groupCollapsed ? (console.groupCollapsed(
    "%cPixiJS Deprecation Warning: %c%s",
    "color:#614108;background:#fffbe6",
    "font-weight:normal;color:#614108;background:#fffbe6",
    `${n}
Deprecated since v${c}`
  ), console.warn(o), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${n}
Deprecated since v${c}`), console.warn(o))), e[n] = !0;
}
export {
  i as deprecation
};
//# sourceMappingURL=index137.js.map
