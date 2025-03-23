import { Color as c } from "./index377.js";
const o = [
  "align",
  "breakWords",
  "cssOverrides",
  "fontVariant",
  "fontWeight",
  "leading",
  "letterSpacing",
  "lineHeight",
  "padding",
  "textBaseline",
  "trim",
  "whiteSpace",
  "wordWrap",
  "wordWrapWidth",
  "fontFamily",
  "fontStyle",
  "fontSize"
];
function e(r) {
  const a = [];
  let t = 0;
  for (let n = 0; n < o.length; n++) {
    const u = `_${o[n]}`;
    a[t++] = r[u];
  }
  return t = i(r._fill, a, t), t = f(r._stroke, a, t), t = l(r.dropShadow, a, t), a.join("-");
}
function i(r, a, t) {
  var n;
  return r && (a[t++] = r.color, a[t++] = r.alpha, a[t++] = (n = r.fill) == null ? void 0 : n.styleKey), t;
}
function f(r, a, t) {
  return r && (t = i(r, a, t), a[t++] = r.width, a[t++] = r.alignment, a[t++] = r.cap, a[t++] = r.join, a[t++] = r.miterLimit), t;
}
function l(r, a, t) {
  return r && (a[t++] = r.alpha, a[t++] = r.angle, a[t++] = r.blur, a[t++] = r.distance, a[t++] = c.shared.setValue(r.color).toNumber()), t;
}
export {
  e as generateTextStyleKey
};
//# sourceMappingURL=index577.js.map
