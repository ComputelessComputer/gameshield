import { GameOptions, GameType } from "../types";
import { BaseGame } from "./base-game";
import { PongGame } from "./pong-game";
import { SnakeGame } from "./snake-game";
import { BreakoutGame } from "./breakout-game";
import { DinoRunGame } from "./dino-run-game";
import { TetrisGame } from "./tetris-game";
import { FlappyBirdGame } from "./flappy-bird-game";
import { AsteroidsGame } from "./asteroids-game";
import { PacmanGame } from "./pacman-game";

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
        "pong",
        "snake",
        "breakout",
        "dino-run",
        "tetris",
        "flappy-bird",
        "asteroids",
        "pacman",
      ];
      type = gameTypes[Math.floor(Math.random() * gameTypes.length)];
    }

    switch (type) {
      case "pong":
        return new PongGame(options);
      case "snake":
        return new SnakeGame(options);
      case "breakout":
        return new BreakoutGame(options);
      case "dino-run":
        return new DinoRunGame(options);
      case "tetris":
        return new TetrisGame(options);
      case "flappy-bird":
        return new FlappyBirdGame(options);
      case "asteroids":
        return new AsteroidsGame(options);
      case "pacman":
        return new PacmanGame(options);
      default:
        throw new Error(`Unknown game type: ${type}`);
    }
  }
}
