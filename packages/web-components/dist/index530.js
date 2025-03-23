import { getDefaultExportFromCjs as h } from "./index316.js";
var n = i, u = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 }, p = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
function i(l) {
  var t = [];
  return l.replace(p, function(o, r, e) {
    var a = r.toLowerCase();
    for (e = f(e), a == "m" && e.length > 2 && (t.push([r].concat(e.splice(0, 2))), a = "l", r = r == "m" ? "l" : "L"); ; ) {
      if (e.length == u[a])
        return e.unshift(r), t.push(e);
      if (e.length < u[a])
        throw new Error("malformed path data");
      t.push([r].concat(e.splice(0, u[a])));
    }
  }), t;
}
var s = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;
function f(l) {
  var t = l.match(s);
  return t ? t.map(Number) : [];
}
const c = /* @__PURE__ */ h(n);
export {
  c as default
};
//# sourceMappingURL=index530.js.map
