import * as PIXI from "pixi.js";

export interface GameOptions {
  width?: number;
  height?: number;
  backgroundColor?: number;
}

export class Game {
  private app: PIXI.Application;
  private container: HTMLElement | null = null;

  constructor(options: GameOptions = {}) {
    this.app = new PIXI.Application({
      width: options.width || 400,
      height: options.height || 300,
      backgroundColor: options.backgroundColor || 0x1099bb
    });
  }

  mount(container: HTMLElement | string): void {
    if (typeof container === 'string') {
      const element = document.getElementById(container);
      if (!element) {
        throw new Error(`Container element with id '${container}' not found`);
      }
      this.container = element;
    } else {
      this.container = container;
    }
    
    if (this.container) {
      this.container.appendChild(this.app.view as unknown as HTMLElement);
    }
  }

  destroy(): void {
    if (this.app) {
      this.app.destroy(true);
    }
  }
}

// Keep the original function for backward compatibility
export function createGame(container: HTMLElement) {
  const app = new PIXI.Application({ width: 400, height: 300 });
  container.appendChild(app.view as unknown as HTMLElement);
  return app;
}
