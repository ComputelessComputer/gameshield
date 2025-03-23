import { Matrix as u } from "./index393.js";
import { matrixPool as i, boundsPool as s } from "./index449.js";
function h(e, l, o) {
  o.clear();
  let n, r;
  return e.parent ? l ? n = e.parent.worldTransform : (r = i.get().identity(), n = t(e, r)) : n = u.IDENTITY, m(e, o, n, l), r && i.return(r), o.isValid || o.set(0, 0, 0, 0), o;
}
function m(e, l, o, n) {
  var d, a;
  if (!e.visible || !e.measurable)
    return;
  let r;
  n ? r = e.worldTransform : (e.updateLocalTransform(), r = i.get(), r.appendFrom(e.localTransform, o));
  const p = l, c = !!e.effects.length;
  if (c && (l = s.get().clear()), e.boundsArea)
    l.addRect(e.boundsArea, r);
  else {
    e.bounds && (l.matrix = r, l.addBounds(e.bounds));
    for (let f = 0; f < e.children.length; f++)
      m(e.children[f], l, r, n);
  }
  if (c) {
    for (let f = 0; f < e.effects.length; f++)
      (a = (d = e.effects[f]).addBounds) == null || a.call(d, l);
    p.addBounds(l, u.IDENTITY), s.return(l);
  }
  n || i.return(r);
}
function t(e, l) {
  const o = e.parent;
  return o && (t(o, l), o.updateLocalTransform(), l.append(o.localTransform)), l;
}
export {
  m as _getGlobalBounds,
  h as getGlobalBounds,
  t as updateTransformBackwards
};
//# sourceMappingURL=index447.js.map
