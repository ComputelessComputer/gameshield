import { getDefaultExportFromCjs as K } from "./index303.js";
import { __module as B } from "./index305.js";
B.exports = C;
B.exports.default = C;
function C(e, r, n) {
  n = n || 2;
  var t = r && r.length, x = t ? r[0] * n : e.length, u = V(e, 0, x, n, !0), f = [];
  if (!u || u.next === u.prev)
    return f;
  var i, o, v, c, h, l, w;
  if (t && (u = j(e, r, u, n)), e.length > 80 * n) {
    i = v = e[0], o = c = e[1];
    for (var p = n; p < x; p += n)
      h = e[p], l = e[p + 1], h < i && (i = h), l < o && (o = l), h > v && (v = h), l > c && (c = l);
    w = Math.max(v - i, c - o), w = w !== 0 ? 32767 / w : 0;
  }
  return k(u, f, n, i, o, w, 0), f;
}
function V(e, r, n, t, x) {
  var u, f;
  if (x === $(e, r, n, t) > 0)
    for (u = r; u < n; u += t)
      f = T(u, e[u], e[u + 1], f);
  else
    for (u = n - t; u >= r; u -= t)
      f = T(u, e[u], e[u + 1], f);
  return f && P(f, f.next) && (z(f), f = f.next), f;
}
function g(e, r) {
  if (!e)
    return e;
  r || (r = e);
  var n = e, t;
  do
    if (t = !1, !n.steiner && (P(n, n.next) || Z(n.prev, n, n.next) === 0)) {
      if (z(n), n = r = n.prev, n === n.next)
        break;
      t = !0;
    } else
      n = n.next;
  while (t || n !== r);
  return r;
}
function k(e, r, n, t, x, u, f) {
  if (e) {
    !f && u && q(e, t, x, u);
    for (var i = e, o, v; e.prev !== e.next; ) {
      if (o = e.prev, v = e.next, u ? Q(e, t, x, u) : N(e)) {
        r.push(o.i / n | 0), r.push(e.i / n | 0), r.push(v.i / n | 0), z(e), e = v.next, i = v.next;
        continue;
      }
      if (e = v, e === i) {
        f ? f === 1 ? (e = U(g(e), r, n), k(e, r, n, t, x, u, 2)) : f === 2 && W(e, r, n, t, x, u) : k(g(e), r, n, t, x, u, 1);
        break;
      }
    }
  }
}
function N(e) {
  var r = e.prev, n = e, t = e.next;
  if (Z(r, n, t) >= 0)
    return !1;
  for (var x = r.x, u = n.x, f = t.x, i = r.y, o = n.y, v = t.y, c = x < u ? x < f ? x : f : u < f ? u : f, h = i < o ? i < v ? i : v : o < v ? o : v, l = x > u ? x > f ? x : f : u > f ? u : f, w = i > o ? i > v ? i : v : o > v ? o : v, p = t.next; p !== r; ) {
    if (p.x >= c && p.x <= l && p.y >= h && p.y <= w && F(x, i, u, o, f, v, p.x, p.y) && Z(p.prev, p, p.next) >= 0)
      return !1;
    p = p.next;
  }
  return !0;
}
function Q(e, r, n, t) {
  var x = e.prev, u = e, f = e.next;
  if (Z(x, u, f) >= 0)
    return !1;
  for (var i = x.x, o = u.x, v = f.x, c = x.y, h = u.y, l = f.y, w = i < o ? i < v ? i : v : o < v ? o : v, p = c < h ? c < l ? c : l : h < l ? h : l, M = i > o ? i > v ? i : v : o > v ? o : v, L = c > h ? c > l ? c : l : h > l ? h : l, O = D(w, p, r, n, t), R = D(M, L, r, n, t), s = e.prevZ, y = e.nextZ; s && s.z >= O && y && y.z <= R; ) {
    if (s.x >= w && s.x <= M && s.y >= p && s.y <= L && s !== x && s !== f && F(i, c, o, h, v, l, s.x, s.y) && Z(s.prev, s, s.next) >= 0 || (s = s.prevZ, y.x >= w && y.x <= M && y.y >= p && y.y <= L && y !== x && y !== f && F(i, c, o, h, v, l, y.x, y.y) && Z(y.prev, y, y.next) >= 0))
      return !1;
    y = y.nextZ;
  }
  for (; s && s.z >= O; ) {
    if (s.x >= w && s.x <= M && s.y >= p && s.y <= L && s !== x && s !== f && F(i, c, o, h, v, l, s.x, s.y) && Z(s.prev, s, s.next) >= 0)
      return !1;
    s = s.prevZ;
  }
  for (; y && y.z <= R; ) {
    if (y.x >= w && y.x <= M && y.y >= p && y.y <= L && y !== x && y !== f && F(i, c, o, h, v, l, y.x, y.y) && Z(y.prev, y, y.next) >= 0)
      return !1;
    y = y.nextZ;
  }
  return !0;
}
function U(e, r, n) {
  var t = e;
  do {
    var x = t.prev, u = t.next.next;
    !P(x, u) && G(x, t, t.next, u) && H(x, u) && H(u, x) && (r.push(x.i / n | 0), r.push(t.i / n | 0), r.push(u.i / n | 0), z(t), z(t.next), t = e = u), t = t.next;
  } while (t !== e);
  return g(t);
}
function W(e, r, n, t, x, u) {
  var f = e;
  do {
    for (var i = f.next.next; i !== f.prev; ) {
      if (f.i !== i.i && b(f, i)) {
        var o = J(f, i);
        f = g(f, f.next), o = g(o, o.next), k(f, r, n, t, x, u, 0), k(o, r, n, t, x, u, 0);
        return;
      }
      i = i.next;
    }
    f = f.next;
  } while (f !== e);
}
function j(e, r, n, t) {
  var x = [], u, f, i, o, v;
  for (u = 0, f = r.length; u < f; u++)
    i = r[u] * t, o = u < f - 1 ? r[u + 1] * t : e.length, v = V(e, i, o, t, !1), v === v.next && (v.steiner = !0), x.push(m(v));
  for (x.sort(I), u = 0; u < x.length; u++)
    n = S(x[u], n);
  return n;
}
function I(e, r) {
  return e.x - r.x;
}
function S(e, r) {
  var n = X(e, r);
  if (!n)
    return r;
  var t = J(n, e);
  return g(t, t.next), g(n, n.next);
}
function X(e, r) {
  var n = r, t = e.x, x = e.y, u = -1 / 0, f;
  do {
    if (x <= n.y && x >= n.next.y && n.next.y !== n.y) {
      var i = n.x + (x - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
      if (i <= t && i > u && (u = i, f = n.x < n.next.x ? n : n.next, i === t))
        return f;
    }
    n = n.next;
  } while (n !== r);
  if (!f)
    return null;
  var o = f, v = f.x, c = f.y, h = 1 / 0, l;
  n = f;
  do
    t >= n.x && n.x >= v && t !== n.x && F(x < c ? t : u, x, v, c, x < c ? u : t, x, n.x, n.y) && (l = Math.abs(x - n.y) / (t - n.x), H(n, e) && (l < h || l === h && (n.x > f.x || n.x === f.x && Y(f, n))) && (f = n, h = l)), n = n.next;
  while (n !== o);
  return f;
}
function Y(e, r) {
  return Z(e.prev, e, r.prev) < 0 && Z(r.next, e, e.next) < 0;
}
function q(e, r, n, t) {
  var x = e;
  do
    x.z === 0 && (x.z = D(x.x, x.y, r, n, t)), x.prevZ = x.prev, x.nextZ = x.next, x = x.next;
  while (x !== e);
  x.prevZ.nextZ = null, x.prevZ = null, a(x);
}
function a(e) {
  var r, n, t, x, u, f, i, o, v = 1;
  do {
    for (n = e, e = null, u = null, f = 0; n; ) {
      for (f++, t = n, i = 0, r = 0; r < v && (i++, t = t.nextZ, !!t); r++)
        ;
      for (o = v; i > 0 || o > 0 && t; )
        i !== 0 && (o === 0 || !t || n.z <= t.z) ? (x = n, n = n.nextZ, i--) : (x = t, t = t.nextZ, o--), u ? u.nextZ = x : e = x, x.prevZ = u, u = x;
      n = t;
    }
    u.nextZ = null, v *= 2;
  } while (f > 1);
  return e;
}
function D(e, r, n, t, x) {
  return e = (e - n) * x | 0, r = (r - t) * x | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, r = (r | r << 8) & 16711935, r = (r | r << 4) & 252645135, r = (r | r << 2) & 858993459, r = (r | r << 1) & 1431655765, e | r << 1;
}
function m(e) {
  var r = e, n = e;
  do
    (r.x < n.x || r.x === n.x && r.y < n.y) && (n = r), r = r.next;
  while (r !== e);
  return n;
}
function F(e, r, n, t, x, u, f, i) {
  return (x - f) * (r - i) >= (e - f) * (u - i) && (e - f) * (t - i) >= (n - f) * (r - i) && (n - f) * (u - i) >= (x - f) * (t - i);
}
function b(e, r) {
  return e.next.i !== r.i && e.prev.i !== r.i && !d(e, r) && // dones't intersect other edges
  (H(e, r) && H(r, e) && ee(e, r) && // locally visible
  (Z(e.prev, e, r.prev) || Z(e, r.prev, r)) || // does not create opposite-facing sectors
  P(e, r) && Z(e.prev, e, e.next) > 0 && Z(r.prev, r, r.next) > 0);
}
function Z(e, r, n) {
  return (r.y - e.y) * (n.x - r.x) - (r.x - e.x) * (n.y - r.y);
}
function P(e, r) {
  return e.x === r.x && e.y === r.y;
}
function G(e, r, n, t) {
  var x = A(Z(e, r, n)), u = A(Z(e, r, t)), f = A(Z(n, t, e)), i = A(Z(n, t, r));
  return !!(x !== u && f !== i || x === 0 && E(e, n, r) || u === 0 && E(e, t, r) || f === 0 && E(n, e, t) || i === 0 && E(n, r, t));
}
function E(e, r, n) {
  return r.x <= Math.max(e.x, n.x) && r.x >= Math.min(e.x, n.x) && r.y <= Math.max(e.y, n.y) && r.y >= Math.min(e.y, n.y);
}
function A(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function d(e, r) {
  var n = e;
  do {
    if (n.i !== e.i && n.next.i !== e.i && n.i !== r.i && n.next.i !== r.i && G(n, n.next, e, r))
      return !0;
    n = n.next;
  } while (n !== e);
  return !1;
}
function H(e, r) {
  return Z(e.prev, e, e.next) < 0 ? Z(e, r, e.next) >= 0 && Z(e, e.prev, r) >= 0 : Z(e, r, e.prev) < 0 || Z(e, e.next, r) < 0;
}
function ee(e, r) {
  var n = e, t = !1, x = (e.x + r.x) / 2, u = (e.y + r.y) / 2;
  do
    n.y > u != n.next.y > u && n.next.y !== n.y && x < (n.next.x - n.x) * (u - n.y) / (n.next.y - n.y) + n.x && (t = !t), n = n.next;
  while (n !== e);
  return t;
}
function J(e, r) {
  var n = new _(e.i, e.x, e.y), t = new _(r.i, r.x, r.y), x = e.next, u = r.prev;
  return e.next = r, r.prev = e, n.next = x, x.prev = n, t.next = n, n.prev = t, u.next = t, t.prev = u, t;
}
function T(e, r, n, t) {
  var x = new _(e, r, n);
  return t ? (x.next = t.next, x.prev = t, t.next.prev = x, t.next = x) : (x.prev = x, x.next = x), x;
}
function z(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function _(e, r, n) {
  this.i = e, this.x = r, this.y = n, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
C.deviation = function(e, r, n, t) {
  var x = r && r.length, u = x ? r[0] * n : e.length, f = Math.abs($(e, 0, u, n));
  if (x)
    for (var i = 0, o = r.length; i < o; i++) {
      var v = r[i] * n, c = i < o - 1 ? r[i + 1] * n : e.length;
      f -= Math.abs($(e, v, c, n));
    }
  var h = 0;
  for (i = 0; i < t.length; i += 3) {
    var l = t[i] * n, w = t[i + 1] * n, p = t[i + 2] * n;
    h += Math.abs(
      (e[l] - e[p]) * (e[w + 1] - e[l + 1]) - (e[l] - e[w]) * (e[p + 1] - e[l + 1])
    );
  }
  return f === 0 && h === 0 ? 0 : Math.abs((h - f) / f);
};
function $(e, r, n, t) {
  for (var x = 0, u = r, f = n - t; u < n; u += t)
    x += (e[f] - e[u]) * (e[u + 1] + e[f + 1]), f = u;
  return x;
}
C.flatten = function(e) {
  for (var r = e[0][0].length, n = { vertices: [], holes: [], dimensions: r }, t = 0, x = 0; x < e.length; x++) {
    for (var u = 0; u < e[x].length; u++)
      for (var f = 0; f < r; f++)
        n.vertices.push(e[x][u][f]);
    x > 0 && (t += e[x - 1].length, n.holes.push(t));
  }
  return n;
};
var ne = B.exports;
const xe = /* @__PURE__ */ K(ne);
export {
  xe as default
};
//# sourceMappingURL=index42.js.map
