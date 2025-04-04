import { GameOptions, GameType } from "../types";
import { BaseGame } from "./base-game";
import { SnakeGame } from "./snake-game";
import { BreakoutGame } from "./breakout-game";
import { TetrisGame } from "./tetris-game";

/**
 * Factory class for creating game instances
 */
export class GameFactory {
  /**
   * Creates a game instance based on the specified type and options
   * @param type Game type to create
   * @param options Game options
   * @returns Game instance
   */
  public static createGame(type: GameType, options: GameOptions): BaseGame {
    if (type === "random") {
      const gameTypes: GameType[] = [
        "snake",
        "breakout",
        "tetris",
      ];
      type = gameTypes[Math.floor(Math.random() * gameTypes.length)];
    }

    switch (type) {
      case "snake":
        return new SnakeGame(options);
      case "breakout":
        return new BreakoutGame(options);
      case "tetris":
        return new TetrisGame(options);
      default:
        throw new Error(`Unknown game type: ${type}`);
    }
  }
}
