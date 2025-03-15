var r, a;
function u() {
  return a || (a = 1, r = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), s = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(s) !== "[object Symbol]")
      return !1;
    var o = 42;
    e[t] = o;
    for (var y in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
      return !1;
    var n = Object.getOwnPropertySymbols(e);
    if (n.length !== 1 || n[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var f = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(e, t)
      );
      if (f.value !== o || f.enumerable !== !0)
        return !1;
    }
    return !0;
  }), r;
}
export {
  u as __require
};
//# sourceMappingURL=index357.js.map
