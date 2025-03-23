import { Game, GameOptions } from "../types";
import * as PIXI from "pixi.js";

export class PongGame implements Game {
  private app: PIXI.Application | null = null;
  private paddle: PIXI.Graphics | null = null;
  private ball: PIXI.Graphics | null = null;
  private aiPaddle: PIXI.Graphics | null = null;
  private scoreText: PIXI.Text | null = null;
  private instructionText: PIXI.Text | null = null;

  private ballVelocity = { x: 0, y: 0 };
  private score = 0;
  private targetScore = 3;
  private gameStarted = false;
  private gameEnded = false;

  private readonly options: GameOptions;

  constructor(options: GameOptions) {
    this.options = options;

    switch (options.difficulty) {
      case "easy":
        this.targetScore = 2;
        break;
      case "medium":
        this.targetScore = 3;
        break;
      case "hard":
        this.targetScore = 5;
        break;
    }
  }

  public async mount(container: HTMLElement): Promise<void> {
    this.app = new PIXI.Application({
      width: this.options.width,
      height: this.options.height,
      backgroundColor: 0x1a1a1a,
      resolution: window.devicePixelRatio || 1,
      antialias: true,
    });

    container.appendChild(this.app.view as unknown as HTMLCanvasElement);

    this.createGameElements();

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));

    this.app.ticker.add(this.gameLoop.bind(this));
  }

  public destroy(): void {
    if (this.app) {
      window.removeEventListener("keydown", this.handleKeyDown.bind(this));
      window.removeEventListener("keyup", this.handleKeyUp.bind(this));
      window.removeEventListener("mousemove", this.handleMouseMove.bind(this));

      this.app.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true,
      });
      this.app = null;
    }

    this.paddle = null;
    this.ball = null;
    this.aiPaddle = null;
    this.scoreText = null;
    this.instructionText = null;
    this.gameStarted = false;
    this.gameEnded = false;
    this.score = 0;
  }

  private createGameElements(): void {
    if (!this.app) return;

    this.paddle = new PIXI.Graphics();
    this.paddle.beginFill(0xffffff);
    this.paddle.drawRect(0, 0, 100, 10);
    this.paddle.endFill();
    this.paddle.x = this.app.screen.width / 2 - 50;
    this.paddle.y = this.app.screen.height - 20;
    this.app.stage.addChild(this.paddle);

    this.aiPaddle = new PIXI.Graphics();
    this.aiPaddle.beginFill(0xff0000);
    this.aiPaddle.drawRect(0, 0, 100, 10);
    this.aiPaddle.endFill();
    this.aiPaddle.x = this.app.screen.width / 2 - 50;
    this.aiPaddle.y = 20;
    this.app.stage.addChild(this.aiPaddle);

    this.ball = new PIXI.Graphics();
    this.ball.beginFill(0xffffff);
    this.ball.drawCircle(0, 0, 8);
    this.ball.endFill();
    this.ball.x = this.app.screen.width / 2;
    this.ball.y = this.app.screen.height / 2;
    this.app.stage.addChild(this.ball);

    this.scoreText = new PIXI.Text(`Score: ${this.score}/${this.targetScore}`, {
      fontFamily: "Arial",
      fontSize: 16,
      fill: 0xffffff,
    });
    this.scoreText.x = 10;
    this.scoreText.y = 10;
    this.app.stage.addChild(this.scoreText);

    this.instructionText = new PIXI.Text("Press SPACE to start", {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 0xffffff,
    });
    this.instructionText.x =
      this.app.screen.width / 2 - this.instructionText.width / 2;
    this.instructionText.y = this.app.screen.height / 2 - 50;
    this.app.stage.addChild(this.instructionText);

    this.resetBall();
  }

  private resetBall(): void {
    if (!this.app || !this.ball) return;

    this.ball.x = this.app.screen.width / 2;
    this.ball.y = this.app.screen.height / 2;

    const angle = (Math.random() * Math.PI) / 2 - Math.PI / 4 + Math.PI; // π ± π/4
    const speed = 5;

    this.ballVelocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.code === "Space" && !this.gameStarted && !this.gameEnded) {
      this.startGame();
    }
  }

  private handleKeyUp(): void {}

  private handleMouseMove(event: MouseEvent): void {
    if (!this.app || !this.paddle) return;

    const rect = (this.app.view as HTMLCanvasElement).getBoundingClientRect();
    const relativeX = event.clientX - rect.left;

    // Move paddle with mouse
    this.paddle.x = Math.max(
      0,
      Math.min(
        this.app.screen.width - this.paddle.width,
        relativeX - this.paddle.width / 2
      )
    );
  }

  private startGame(): void {
    if (!this.app || !this.instructionText) return;

    this.gameStarted = true;
    this.app.stage.removeChild(this.instructionText);
    this.instructionText = null;
  }

  private endGame(success: boolean): void {
    if (!this.app || this.gameEnded) return;

    this.gameEnded = true;

    const resultText = new PIXI.Text(
      success ? "CAPTCHA Passed!" : "CAPTCHA Failed!",
      {
        fontFamily: "Arial",
        fontSize: 24,
        fill: success ? 0x00ff00 : 0xff0000,
        fontWeight: "bold",
      }
    );

    resultText.x = this.app.screen.width / 2 - resultText.width / 2;
    resultText.y = this.app.screen.height / 2 - resultText.height / 2;
    this.app.stage.addChild(resultText);

    setTimeout(() => {
      this.options.onComplete({
        success,
        score: this.score,
      });
    }, 1500);
  }

  private gameLoop(delta: number): void {
    if (
      !this.app ||
      !this.ball ||
      !this.paddle ||
      !this.aiPaddle ||
      !this.scoreText
    )
      return;

    if (!this.gameStarted || this.gameEnded) return;

    this.ball.x += this.ballVelocity.x * delta;
    this.ball.y += this.ballVelocity.y * delta;

    const aiTargetX = this.ball.x - this.aiPaddle.width / 2;
    this.aiPaddle.x += (aiTargetX - this.aiPaddle.x) * 0.1 * delta;

    this.aiPaddle.x = Math.max(
      0,
      Math.min(this.app.screen.width - this.aiPaddle.width, this.aiPaddle.x)
    );

    if (this.ball.x <= 0 || this.ball.x >= this.app.screen.width) {
      this.ballVelocity.x *= -1;
    }

    if (this.ball.y <= 0) {
      this.score += 1;
      this.scoreText.text = `Score: ${this.score}/${this.targetScore}`;
      this.resetBall();

      if (this.score >= this.targetScore) {
        this.endGame(true);
      }
    }

    if (this.ball.y >= this.app.screen.height) {
      this.endGame(false);
    }

    if (
      this.ball.y <= this.aiPaddle.y + this.aiPaddle.height &&
      this.ball.y >= this.aiPaddle.y &&
      this.ball.x >= this.aiPaddle.x &&
      this.ball.x <= this.aiPaddle.x + this.aiPaddle.width
    ) {
      this.ballVelocity.y *= -1;
      this.ball.y = this.aiPaddle.y + this.aiPaddle.height;

      this.ballVelocity.x += (Math.random() - 0.5) * 2;
    }

    if (
      this.ball.y >= this.paddle.y - this.ball.height &&
      this.ball.y <= this.paddle.y + this.paddle.height &&
      this.ball.x >= this.paddle.x &&
      this.ball.x <= this.paddle.x + this.paddle.width
    ) {
      this.ballVelocity.y *= -1;
      this.ball.y = this.paddle.y - this.ball.height;

      const hitPosition = (this.ball.x - this.paddle.x) / this.paddle.width;
      this.ballVelocity.x = (hitPosition - 0.5) * 10;
    }
  }
}
