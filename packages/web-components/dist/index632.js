import { o as u } from "./index631.js";
import { t as f } from "./index630.js";
var v = u, d = f, a = function(e, n, i) {
  for (var t = e, r; (r = t.next) != null; t = r)
    if (r.key === n)
      return t.next = r.next, i || (r.next = /** @type {NonNullable<typeof list.next>} */
      e.next, e.next = r), r;
}, l = function(e, n) {
  if (e) {
    var i = a(e, n);
    return i && i.value;
  }
}, s = function(e, n, i) {
  var t = a(e, n);
  t ? t.value = i : e.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
  {
    // eslint-disable-line no-param-reassign, no-extra-parens
    key: n,
    next: e.next,
    value: i
  };
}, c = function(e, n) {
  return e ? !!a(e, n) : !1;
}, x = function(e, n) {
  if (e)
    return a(e, n, !0);
}, m = function() {
  var n, i = {
    assert: function(t) {
      if (!i.has(t))
        throw new d("Side channel does not contain " + v(t));
    },
    delete: function(t) {
      var r = n && n.next, o = x(n, t);
      return o && r && r === o && (n = void 0), !!o;
    },
    get: function(t) {
      return l(n, t);
    },
    has: function(t) {
      return c(n, t);
    },
    set: function(t, r) {
      n || (n = {
        next: void 0
      }), s(
        /** @type {NonNullable<typeof $o>} */
        n,
        t,
        r
      );
    }
  };
  return i;
};
export {
  m as s
};
//# sourceMappingURL=index632.js.map
