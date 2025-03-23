import * as PIXI from "pixi.js";
import { GameFactory } from "./games";
export class Game {
    constructor(options = {}) {
        this.game = null;
        this.container = null;
        this.onGameComplete = null;
        this.options = {
            width: options.width || 400,
            height: options.height || 300,
            backgroundColor: options.backgroundColor || 0x1099bb,
            gameType: options.gameType || 'random',
            difficulty: options.difficulty || 'medium'
        };
    }
    mount(container) {
        if (typeof container === 'string') {
            const element = document.getElementById(container);
            if (!element) {
                throw new Error(`Container element with id '${container}' not found`);
            }
            this.container = element;
        }
        else {
            this.container = container;
        }
        if (this.container) {
            this.initGame();
        }
    }
    setCompletionCallback(callback) {
        this.onGameComplete = callback;
        if (this.game) {
            this.game.setCompletionCallback(this.handleGameComplete.bind(this));
        }
    }
    initGame() {
        // Create the game based on the specified type
        this.game = GameFactory.createGame(this.options.gameType, this.options);
        // Set completion callback if available
        if (this.onGameComplete) {
            this.game.setCompletionCallback(this.handleGameComplete.bind(this));
        }
        // Mount the game to the container
        if (this.container) {
            this.game.mount(this.container);
        }
    }
    handleGameComplete(result) {
        if (this.onGameComplete) {
            this.onGameComplete(result);
        }
    }
    destroy() {
        if (this.game) {
            this.game.destroy();
            this.game = null;
        }
    }
}
// Keep the original function for backward compatibility
export function createGame(container) {
    const app = new PIXI.Application({ width: 400, height: 300 });
    container.appendChild(app.view);
    return app;
}
