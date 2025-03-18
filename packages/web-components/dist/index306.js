function t(l, n = null) {
  const e = l * 6;
  if (n = n || new Uint16Array(e), n.length !== e)
    throw new Error(`Out buffer length is incorrect, got ${n.length} and expected ${e}`);
  for (let c = 0, i = 0; c < e; c += 6, i += 4)
    n[c + 0] = i + 0, n[c + 1] = i + 1, n[c + 2] = i + 2, n[c + 3] = i + 0, n[c + 4] = i + 2, n[c + 5] = i + 3;
  return n;
}
export {
  t as createIndicesForQuads
};
//# sourceMappingURL=index306.js.map
