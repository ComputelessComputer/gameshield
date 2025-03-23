function A(x, l, m) {
  const d = (s, n) => {
    const t = n.x - s.x, i = n.y - s.y, a = Math.sqrt(t * t + i * i), e = t / a, o = i / a;
    return { len: a, nx: e, ny: o };
  }, u = (s, n) => {
    s === 0 ? x.moveTo(n.x, n.y) : x.lineTo(n.x, n.y);
  };
  let y = l[l.length - 1];
  for (let s = 0; s < l.length; s++) {
    const n = l[s % l.length], t = n.radius ?? m;
    if (t <= 0) {
      u(s, n), y = n;
      continue;
    }
    const i = l[(s + 1) % l.length], a = d(n, y), e = d(n, i);
    if (a.len < 1e-4 || e.len < 1e-4) {
      u(s, n), y = n;
      continue;
    }
    let o = Math.asin(a.nx * e.ny - a.ny * e.nx), c = 1, f = !1;
    a.nx * e.nx - a.ny * -e.ny < 0 ? o < 0 ? o = Math.PI + o : (o = Math.PI - o, c = -1, f = !0) : o > 0 && (c = -1, f = !0);
    const r = o / 2;
    let h, M = Math.abs(
      Math.cos(r) * t / Math.sin(r)
    );
    M > Math.min(a.len / 2, e.len / 2) ? (M = Math.min(a.len / 2, e.len / 2), h = Math.abs(M * Math.sin(r) / Math.cos(r))) : h = t;
    const P = n.x + e.nx * M + -e.ny * h * c, T = n.y + e.ny * M + e.nx * h * c, v = Math.atan2(a.ny, a.nx) + Math.PI / 2 * c, g = Math.atan2(e.ny, e.nx) - Math.PI / 2 * c;
    s === 0 && x.moveTo(
      P + Math.cos(v) * h,
      T + Math.sin(v) * h
    ), x.arc(P, T, h, v, g, f), y = n;
  }
}
function D(x, l, m, d) {
  const u = (n, t) => Math.sqrt((n.x - t.x) ** 2 + (n.y - t.y) ** 2), y = (n, t, i) => ({
    x: n.x + (t.x - n.x) * i,
    y: n.y + (t.y - n.y) * i
  }), s = l.length;
  for (let n = 0; n < s; n++) {
    const t = l[(n + 1) % s], i = t.radius ?? m;
    if (i <= 0) {
      n === 0 ? x.moveTo(t.x, t.y) : x.lineTo(t.x, t.y);
      continue;
    }
    const a = l[n], e = l[(n + 2) % s], o = u(a, t);
    let c;
    if (o < 1e-4)
      c = t;
    else {
      const h = Math.min(o / 2, i);
      c = y(
        t,
        a,
        h / o
      );
    }
    const f = u(e, t);
    let r;
    if (f < 1e-4)
      r = t;
    else {
      const h = Math.min(f / 2, i);
      r = y(
        t,
        e,
        h / f
      );
    }
    n === 0 ? x.moveTo(c.x, c.y) : x.lineTo(c.x, c.y), x.quadraticCurveTo(t.x, t.y, r.x, r.y, d);
  }
}
export {
  A as roundedShapeArc,
  D as roundedShapeQuadraticCurve
};
//# sourceMappingURL=index527.js.map
