import { MSAA_QUALITY as i } from "./index164.js";
import "./index22.js";
import "./index23.js";
import "./index24.js";
import { Rectangle as t } from "./index25.js";
import "./index26.js";
import "./index27.js";
import "./index28.js";
import "./index29.js";
import "./index30.js";
import "./index31.js";
class g {
  constructor() {
    this.renderTexture = null, this.target = null, this.legacy = !1, this.resolution = 1, this.multisample = i.NONE, this.sourceFrame = new t(), this.destinationFrame = new t(), this.bindingSourceFrame = new t(), this.bindingDestinationFrame = new t(), this.filters = [], this.transform = null;
  }
  /** Clears the state */
  clear() {
    this.target = null, this.filters = null, this.renderTexture = null;
  }
}
export {
  g as FilterState
};
//# sourceMappingURL=index208.js.map
