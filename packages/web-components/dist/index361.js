async function r(t) {
  if ("Image" in globalThis)
    return new Promise((e) => {
      const a = new Image();
      a.onload = () => {
        e(!0);
      }, a.onerror = () => {
        e(!1);
      }, a.src = t;
    });
  if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
    try {
      const e = await (await fetch(t)).blob();
      await createImageBitmap(e);
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
//# sourceMappingURL=index361.js.map
