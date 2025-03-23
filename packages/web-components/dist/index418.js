function y(n, e) {
  const t = n.byteLength / 8 | 0, o = new Float64Array(n, 0, t);
  new Float64Array(e, 0, t).set(o);
  const i = n.byteLength - t * 8;
  if (i > 0) {
    const a = new Uint8Array(n, t * 8, i);
    new Uint8Array(e, t * 8, i).set(a);
  }
}
export {
  y as fastCopy
};
//# sourceMappingURL=index418.js.map
