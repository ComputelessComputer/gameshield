import { ExtensionType as r } from "./index153.js";
import { GlParticleContainerAdaptor as t } from "./index538.js";
import { ParticleContainerPipe as i } from "./index541.js";
class o extends i {
  constructor(e) {
    super(e, new t());
  }
}
o.extension = {
  type: [
    r.WebGLPipes
  ],
  name: "particle"
};
export {
  o as GlParticleContainerPipe
};
//# sourceMappingURL=index540.js.map
