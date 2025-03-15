async function r(e) {
  if ("Image" in globalThis)
    return new Promise((t) => {
      const a = new Image();
      a.onload = () => {
        t(!0);
      }, a.onerror = () => {
        t(!1);
      }, a.src = e;
    });
  if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
    try {
      const t = await (await fetch(e)).blob();
      await createImageBitmap(t);
    } catch {
      return !1;
    }
    return !0;
  }
  return !1;
}
export {
  r as testImageFormat
};
//# sourceMappingURL=index147.js.map
