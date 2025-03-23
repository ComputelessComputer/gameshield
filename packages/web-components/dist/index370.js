import { Texture as a } from "./index360.js";
import { warn as n } from "./index338.js";
import { Cache as r } from "./index340.js";
function c(s, o, e) {
  s.label = e, s._sourceOrigin = e;
  const t = new a({
    source: s,
    label: e
  }), d = () => {
    delete o.promiseCache[e], r.has(e) && r.remove(e);
  };
  return t.source.once("destroy", () => {
    o.promiseCache[e] && (n("[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource."), d());
  }), t.once("destroy", () => {
    s.destroyed || (n("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."), d());
  }), t;
}
export {
  c as createTexture
};
//# sourceMappingURL=index370.js.map
