function t(n) {
  if (n.BYTES_PER_ELEMENT === 4)
    return n instanceof Float32Array ? "Float32Array" : n instanceof Uint32Array ? "Uint32Array" : "Int32Array";
  if (n.BYTES_PER_ELEMENT === 2) {
    if (n instanceof Uint16Array)
      return "Uint16Array";
  } else if (n.BYTES_PER_ELEMENT === 1 && n instanceof Uint8Array)
    return "Uint8Array";
  return null;
}
export {
  t as getBufferType
};
//# sourceMappingURL=index209.js.map
