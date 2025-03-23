import { Matrix as p } from "./index393.js";
import { matrixPool as i, boundsPool as a } from "./index449.js";
function I(e, l, c) {
  return l.clear(), c || (c = p.IDENTITY), u(e, l, c, e, !0), l.isValid || l.set(0, 0, 0, 0), l;
}
function u(e, l, c, n, T) {
  var d, m;
  let o;
  if (T)
    o = i.get(), o = c.copyTo(o);
  else {
    if (!e.visible || !e.measurable)
      return;
    e.updateLocalTransform();
    const f = e.localTransform;
    o = i.get(), o.appendFrom(f, c);
  }
  const B = l, s = !!e.effects.length;
  if (s && (l = a.get().clear()), e.boundsArea)
    l.addRect(e.boundsArea, o);
  else {
    e.renderPipeId && (l.matrix = o, l.addBounds(e.bounds));
    const f = e.children;
    for (let r = 0; r < f.length; r++)
      u(f[r], l, o, n, !1);
  }
  if (s) {
    for (let f = 0; f < e.effects.length; f++)
      (m = (d = e.effects[f]).addLocalBounds) == null || m.call(d, l, n);
    B.addBounds(l, p.IDENTITY), a.return(l);
  }
  i.return(o);
}
export {
  I as getLocalBounds
};
//# sourceMappingURL=index448.js.map
