import { closePointEps as b } from "./index510.js";
function m(t, o, r, n) {
  const s = b;
  if (t.length === 0)
    return;
  const f = t[0], u = t[1], a = t[t.length - 2], g = t[t.length - 1], x = o || Math.abs(f - a) < s && Math.abs(u - g) < s, h = r, c = t.length / 2, l = h.length / 2;
  for (let e = 0; e < c; e++)
    h.push(t[e * 2]), h.push(t[e * 2 + 1]);
  for (let e = 0; e < c - 1; e++)
    n.push(l + e, l + e + 1);
  x && n.push(l + c - 1, l);
}
export {
  m as buildPixelLine
};
//# sourceMappingURL=index512.js.map
