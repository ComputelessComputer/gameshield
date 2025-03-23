const u = {
  default: -1
};
function d(t = "default") {
  return u[t] === void 0 && (u[t] = -1), ++u[t];
}
export {
  d as uid
};
//# sourceMappingURL=index416.js.map
