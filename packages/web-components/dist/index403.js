function t(n) {
  return n += n === 0 ? 1 : 0, --n, n |= n >>> 1, n |= n >>> 2, n |= n >>> 4, n |= n >>> 8, n |= n >>> 16, n + 1;
}
function o(n) {
  return !(n & n - 1) && !!n;
}
export {
  o as isPow2,
  t as nextPow2
};
//# sourceMappingURL=index403.js.map
