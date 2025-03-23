const p = {
  build(i) {
    const s = i.shape, t = s.x, e = s.y, n = s.width, h = s.height, o = i.points;
    o.length = 0, n >= 0 && h >= 0 && o.push(
      t,
      e,
      t + n,
      e,
      t + n,
      e + h,
      t,
      e + h
    );
  },
  triangulate(i, s) {
    const t = i.points, e = s.points;
    if (t.length === 0)
      return;
    const n = e.length / 2;
    e.push(
      t[0],
      t[1],
      t[2],
      t[3],
      t[6],
      t[7],
      t[4],
      t[5]
    ), s.indices.push(
      n,
      n + 1,
      n + 2,
      n + 1,
      n + 2,
      n + 3
    );
  }
};
export {
  p as buildRectangle
};
//# sourceMappingURL=index280.js.map
