import { randomGameType as m } from "./index127.js";
import { PuzzleGame as a } from "./index128.js";
import { BreakoutGame as n } from "./index129.js";
import { SnakeGame as t } from "./index130.js";
import { PongGame as u } from "./index131.js";
import { DinoRunGame as o } from "./index132.js";
import "./index8.js";
class k {
  /**
   * Create a game instance of the specified type
   *
   * @param type - Type of game to create
   * @param options - Game creation options
   * @returns Game instance
   */
  static createGame(r, e) {
    switch (r === "random" && (r = m()), r) {
      case "puzzle":
        return new a(e);
      case "breakout":
        return new n(e);
      case "snake":
        return new t(e);
      case "pong":
        return new u(e);
      case "dino-run":
        return new o(e);
      default:
        return new a(e);
    }
  }
  /**
   * Get available game types
   *
   * @returns Array of available game types
   */
  static getAvailableTypes() {
    return ["puzzle", "breakout", "snake", "pong", "dino-run"];
  }
}
export {
  n as BreakoutGame,
  o as DinoRunGame,
  k as GameFactory,
  u as PongGame,
  a as PuzzleGame,
  t as SnakeGame
};
//# sourceMappingURL=index9.js.map
