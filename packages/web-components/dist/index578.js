import { Color as a } from "./index377.js";
function l(t) {
  const n = t._stroke, e = t._fill, o = [`div { ${[
    `color: ${a.shared.setValue(e.color).toHex()}`,
    `font-size: ${t.fontSize}px`,
    `font-family: ${t.fontFamily}`,
    `font-weight: ${t.fontWeight}`,
    `font-style: ${t.fontStyle}`,
    `font-variant: ${t.fontVariant}`,
    `letter-spacing: ${t.letterSpacing}px`,
    `text-align: ${t.align}`,
    `padding: ${t.padding}px`,
    `white-space: ${t.whiteSpace === "pre" && t.wordWrap ? "pre-wrap" : t.whiteSpace}`,
    ...t.lineHeight ? [`line-height: ${t.lineHeight}px`] : [],
    ...t.wordWrap ? [
      `word-wrap: ${t.breakWords ? "break-all" : "break-word"}`,
      `max-width: ${t.wordWrapWidth}px`
    ] : [],
    ...n ? [h(n)] : [],
    ...t.dropShadow ? [s(t.dropShadow)] : [],
    ...t.cssOverrides
  ].join(";")} }`];
  return f(t.tagStyles, o), o.join(" ");
}
function s(t) {
  const n = a.shared.setValue(t.color).setAlpha(t.alpha).toHexa(), e = Math.round(Math.cos(t.angle) * t.distance), i = Math.round(Math.sin(t.angle) * t.distance), o = `${e}px ${i}px`;
  return t.blur > 0 ? `text-shadow: ${o} ${t.blur}px ${n}` : `text-shadow: ${o} ${n}`;
}
function h(t) {
  return [
    `-webkit-text-stroke-width: ${t.width}px`,
    `-webkit-text-stroke-color: ${a.shared.setValue(t.color).toHex()}`,
    `text-stroke-width: ${t.width}px`,
    `text-stroke-color: ${a.shared.setValue(t.color).toHex()}`,
    "paint-order: stroke"
  ].join(";");
}
const c = {
  fontSize: "font-size: {{VALUE}}px",
  fontFamily: "font-family: {{VALUE}}",
  fontWeight: "font-weight: {{VALUE}}",
  fontStyle: "font-style: {{VALUE}}",
  fontVariant: "font-variant: {{VALUE}}",
  letterSpacing: "letter-spacing: {{VALUE}}px",
  align: "text-align: {{VALUE}}",
  padding: "padding: {{VALUE}}px",
  whiteSpace: "white-space: {{VALUE}}",
  lineHeight: "line-height: {{VALUE}}px",
  wordWrapWidth: "max-width: {{VALUE}}px"
}, p = {
  fill: (t) => `color: ${a.shared.setValue(t).toHex()}`,
  breakWords: (t) => `word-wrap: ${t ? "break-all" : "break-word"}`,
  stroke: h,
  dropShadow: s
};
function f(t, n) {
  for (const e in t) {
    const i = t[e], o = [];
    for (const r in i)
      p[r] ? o.push(p[r](i[r])) : c[r] && o.push(c[r].replace("{{VALUE}}", i[r]));
    n.push(`${e} { ${o.join(";")} }`);
  }
}
export {
  l as textStyleToCSS
};
//# sourceMappingURL=index578.js.map
