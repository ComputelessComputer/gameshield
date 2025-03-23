import { DOMAdapter as a } from "./index365.js";
import { ExtensionType as r } from "./index153.js";
import { warn as o } from "./index338.js";
import { TextureSource as c } from "./index474.js";
class m extends c {
  constructor(e) {
    if (e.resource && globalThis.HTMLImageElement && e.resource instanceof HTMLImageElement) {
      const t = a.get().createCanvas(e.resource.width, e.resource.height);
      t.getContext("2d").drawImage(e.resource, 0, 0, e.resource.width, e.resource.height), e.resource = t, o("ImageSource: Image element passed, converting to canvas. Use CanvasSource instead.");
    }
    super(e), this.uploadMethodId = "image", this.autoGarbageCollect = !0;
  }
  static test(e) {
    return globalThis.HTMLImageElement && e instanceof HTMLImageElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || globalThis.VideoFrame && e instanceof VideoFrame;
  }
}
m.extension = r.TextureSource;
export {
  m as ImageSource
};
//# sourceMappingURL=index325.js.map
