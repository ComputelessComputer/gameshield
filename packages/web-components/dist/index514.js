import t from "./index39.js";
function W(a, x, m, n, g, r, u) {
  const o = t(a, x, 2);
  if (!o)
    return;
  for (let l = 0; l < o.length; l += 3)
    r[u++] = o[l] + g, r[u++] = o[l + 1] + g, r[u++] = o[l + 2] + g;
  let h = g * n;
  for (let l = 0; l < a.length; l += 2)
    m[h] = a[l], m[h + 1] = a[l + 1], h += n;
}
export {
  W as triangulateWithHoles
};
//# sourceMappingURL=index514.js.map
