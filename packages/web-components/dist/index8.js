import { PongGame as n } from "./index10.js";
import { SnakeGame as o } from "./index11.js";
import { BreakoutGame as t } from "./index12.js";
import { DinoRunGame as m } from "./index13.js";
class w {
  /**
   * Create a game instance
   */
  static createGame(r, e) {
    if (r === "random") {
      const a = ["pong", "snake", "breakout", "dino-run"];
      r = a[Math.floor(Math.random() * a.length)];
    }
    switch (r) {
      case "pong":
        return new n(e);
      case "snake":
        return new o(e);
      case "breakout":
        return new t(e);
      case "dino-run":
        return new m(e);
      default:
        throw new Error(`Unsupported game type: ${r}`);
    }
  }
}
export {
  w as GameFactory
};
//# sourceMappingURL=index8.js.map
