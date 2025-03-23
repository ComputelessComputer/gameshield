function a(o, n, e) {
  return new Promise(async (s) => {
    e && await new Promise((t) => setTimeout(t, 100)), o.onload = () => {
      s();
    }, o.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(n)}`, o.crossOrigin = "anonymous";
  });
}
export {
  a as loadSVGImage
};
//# sourceMappingURL=index586.js.map
