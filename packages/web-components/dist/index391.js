import { ExtensionType as i } from "./index153.js";
class t {
  constructor(e) {
    this._renderer = e;
  }
  push(e, p, r) {
    this._renderer.renderPipes.batch.break(r), r.add({
      renderPipeId: "filter",
      canBundle: !1,
      action: "pushFilter",
      container: p,
      filterEffect: e
    });
  }
  pop(e, p, r) {
    this._renderer.renderPipes.batch.break(r), r.add({
      renderPipeId: "filter",
      action: "popFilter",
      canBundle: !1
    });
  }
  execute(e) {
    e.action === "pushFilter" ? this._renderer.filter.push(e) : e.action === "popFilter" && this._renderer.filter.pop();
  }
  destroy() {
    this._renderer = null;
  }
}
t.extension = {
  type: [
    i.WebGLPipes,
    i.WebGPUPipes,
    i.CanvasPipes
  ],
  name: "filter"
};
export {
  t as FilterPipe
};
//# sourceMappingURL=index391.js.map
