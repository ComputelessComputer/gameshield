const e = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
function r(i) {
  const f = typeof i.fontSize == "number" ? `${i.fontSize}px` : i.fontSize;
  let n = i.fontFamily;
  Array.isArray(i.fontFamily) || (n = i.fontFamily.split(","));
  for (let o = n.length - 1; o >= 0; o--) {
    let t = n[o].trim();
    !/([\"\'])[^\'\"]+\1/.test(t) && !e.includes(t) && (t = `"${t}"`), n[o] = t;
  }
  return `${i.fontStyle} ${i.fontVariant} ${i.fontWeight} ${f} ${n.join(",")}`;
}
export {
  r as fontStringFromTextStyle
};
//# sourceMappingURL=index571.js.map
