function a(l, n = null) {
  const e = l * 6;
  if (e > 65535 ? n || (n = new Uint32Array(e)) : n || (n = new Uint16Array(e)), n.length !== e)
    throw new Error(`Out buffer length is incorrect, got ${n.length} and expected ${e}`);
  for (let i = 0, c = 0; i < e; i += 6, c += 4)
    n[i + 0] = c + 0, n[i + 1] = c + 1, n[i + 2] = c + 2, n[i + 3] = c + 0, n[i + 4] = c + 2, n[i + 5] = c + 3;
  return n;
}
export {
  a as createIndicesForQuads
};
//# sourceMappingURL=index544.js.map
