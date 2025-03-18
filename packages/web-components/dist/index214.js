let a;
function r() {
  if (typeof a == "boolean")
    return a;
  try {
    a = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({ a: "b" }, "a", "b") === !0;
  } catch {
    a = !1;
  }
  return a;
}
export {
  r as unsafeEvalSupported
};
//# sourceMappingURL=index214.js.map
