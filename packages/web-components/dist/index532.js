function r(s) {
  const t = s.match(/url\s*\(\s*['"]?\s*#([^'"\s)]+)\s*['"]?\s*\)/i);
  return t ? t[1] : "";
}
export {
  r as extractSvgUrlId
};
//# sourceMappingURL=index532.js.map
