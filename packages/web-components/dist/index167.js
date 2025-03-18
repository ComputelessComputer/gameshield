const r = (s, c) => {
  const a = c.split("?")[1];
  return a && (s += `?${a}`), s;
};
export {
  r as copySearchParams
};
//# sourceMappingURL=index167.js.map
