/**
 * Core Game class for GameShield
 *
 * Handles game creation, lifecycle management, and event handling
 *
 * @packageDocumentation
 */
import * as PIXI from 'pixi.js';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_BACKGROUND_COLOR, DEFAULT_DIFFICULTY, DEFAULT_GAME_TYPE } from './constants';
import { GameFactory } from './games';
import { debug } from './utils';
/**
 * Main Game controller class
 *
 * Manages game lifecycle, rendering, and event handling
 */
export class Game {
    /**
     * Create a new Game instance
     *
     * @param options - Game configuration options
     */
    constructor(options = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        /** PIXI Application instance */
        this.app = null;
        /** Current active game implementation */
        this.currentGame = null;
        /** HTML container element */
        this.container = null;
        /** Event handlers mapped by event type */
        this.eventHandlers = new Map();
        /** Interaction metrics being collected */
        this.metrics = {
            mouseMovements: 0,
            keyPresses: 0,
            interactionDuration: 0,
            startTime: 0
        };
        /** Whether the game is currently running */
        this.isRunning = false;
        /** Whether initialization has completed */
        this.isInitialized = false;
        // Set default options
        this.options = {
            width: (_a = options.width) !== null && _a !== void 0 ? _a : DEFAULT_WIDTH,
            height: (_b = options.height) !== null && _b !== void 0 ? _b : DEFAULT_HEIGHT,
            backgroundColor: (_c = options.backgroundColor) !== null && _c !== void 0 ? _c : DEFAULT_BACKGROUND_COLOR,
            difficulty: (_d = options.difficulty) !== null && _d !== void 0 ? _d : DEFAULT_DIFFICULTY,
            container: null, // Will be set in mount method
            gameType: (_e = options.gameType) !== null && _e !== void 0 ? _e : DEFAULT_GAME_TYPE,
            scale: (_f = options.scale) !== null && _f !== void 0 ? _f : 'fit',
            maxFPS: (_g = options.maxFPS) !== null && _g !== void 0 ? _g : 60,
            assetsPath: (_h = options.assetsPath) !== null && _h !== void 0 ? _h : '', // Default to empty string instead of undefined
            onLoad: (_j = options.onLoad) !== null && _j !== void 0 ? _j : (() => { })
        };
        // Initialize if container is provided
        if (options.container) {
            this.mount(options.container);
        }
    }
    /**
     * Mount the game to a DOM container
     *
     * @param container - HTML element or element ID to mount the game
     * @throws Error if container element is not found
     */
    mount(container) {
        if (typeof container === 'string') {
            const element = document.getElementById(container);
            if (!element) {
                throw new Error(`Game container element with id '${container}' not found`);
            }
            this.container = element;
        }
        else {
            this.container = container;
        }
        // At this point this.container is guaranteed to be an HTMLElement
        this.options.container = this.container;
        this.initialize();
    }
    /**
     * Initialize the game
     *
     * Creates PIXI application and sets up event listeners
     * @private
     */
    initialize() {
        if (!this.container) {
            throw new Error('Cannot initialize game: container is not set');
        }
        if (this.isInitialized) {
            return;
        }
        // Create PIXI application
        this.app = new PIXI.Application({
            width: this.options.width,
            height: this.options.height,
            backgroundColor: this.options.backgroundColor,
            autoDensity: true,
            antialias: true
        });
        // Add canvas to container
        this.container.appendChild(this.app.view);
        // Apply scaling mode
        this.applyScaling();
        // Set up resize handling
        window.addEventListener('resize', this.handleResize.bind(this));
        // Set up interaction tracking
        this.setupInteractionTracking();
        this.isInitialized = true;
        // Initialize game implementation
        this.initializeGame();
        // Notify loading complete
        if (this.options.onLoad) {
            this.options.onLoad();
        }
        debug('Game initialized', this.options);
    }
    /**
     * Initialize the selected game implementation
     * @private
     */
    initializeGame() {
        if (!this.app) {
            throw new Error('Cannot initialize game: PIXI application not created');
        }
        const { gameType, difficulty } = this.options;
        // Create the game based on selected type
        this.currentGame = GameFactory.createGame(gameType, {
            app: this.app,
            difficulty,
            onComplete: this.handleGameComplete.bind(this)
        });
        debug('Game implementation initialized', { type: gameType, difficulty });
    }
    /**
     * Apply scaling mode to the game canvas
     * @private
     */
    applyScaling() {
        if (!this.app || !this.container)
            return;
        const view = this.app.view;
        const { scale } = this.options;
        // Reset any existing styles
        view.style.width = '';
        view.style.height = '';
        switch (scale) {
            case 'fit':
                view.style.width = '100%';
                view.style.height = 'auto';
                break;
            case 'fill':
                view.style.width = '100%';
                view.style.height = '100%';
                break;
            case 'none':
            default:
                // Use original dimensions
                view.style.width = `${this.options.width}px`;
                view.style.height = `${this.options.height}px`;
        }
    }
    /**
     * Handle window resize event
     * @private
     */
    handleResize() {
        this.applyScaling();
    }
    /**
     * Set up interaction tracking
     * @private
     */
    setupInteractionTracking() {
        if (!this.container)
            return;
        // Track mouse movements
        this.container.addEventListener('mousemove', () => {
            this.metrics.mouseMovements++;
            this.emit('interaction', { type: 'mousemove', count: this.metrics.mouseMovements });
        });
        // Track key presses
        window.addEventListener('keydown', () => {
            this.metrics.keyPresses++;
            this.emit('interaction', { type: 'keydown', count: this.metrics.keyPresses });
        });
    }
    /**
     * Handle game completion
     *
     * @param result - Result object from the game implementation
     * @private
     */
    handleGameComplete(result) {
        // Calculate total interaction duration
        if (this.metrics.startTime > 0) {
            this.metrics.interactionDuration = Date.now() - this.metrics.startTime;
        }
        // Combine metrics with result
        const finalResult = {
            ...result,
            metrics: {
                mouseMovements: this.metrics.mouseMovements,
                keyPresses: this.metrics.keyPresses,
                interactionDuration: this.metrics.interactionDuration,
                ...(result.metrics || {})
            }
        };
        // Set game as not running
        this.isRunning = false;
        // Emit complete event
        this.emit('complete', finalResult);
        debug('Game completed', finalResult);
    }
    /**
     * Start the game
     */
    start() {
        if (!this.isInitialized) {
            throw new Error('Cannot start game: not initialized');
        }
        if (this.isRunning) {
            return;
        }
        // Reset metrics
        this.metrics.mouseMovements = 0;
        this.metrics.keyPresses = 0;
        this.metrics.interactionDuration = 0;
        this.metrics.startTime = Date.now();
        // Start game implementation
        if (this.currentGame && typeof this.currentGame.start === 'function') {
            this.currentGame.start();
        }
        this.isRunning = true;
        this.emit('start');
        debug('Game started');
    }
    /**
     * Pause the game
     */
    pause() {
        if (!this.isRunning) {
            return;
        }
        if (this.currentGame && typeof this.currentGame.pause === 'function') {
            this.currentGame.pause();
        }
        this.isRunning = false;
        this.emit('pause');
        debug('Game paused');
    }
    /**
     * Resume the game
     */
    resume() {
        if (this.isRunning) {
            return;
        }
        if (this.currentGame && typeof this.currentGame.resume === 'function') {
            this.currentGame.resume();
        }
        this.isRunning = true;
        this.emit('resume');
        debug('Game resumed');
    }
    /**
     * Reset the game
     */
    reset() {
        // Stop the current game
        this.pause();
        // Reset metrics
        this.metrics.mouseMovements = 0;
        this.metrics.keyPresses = 0;
        this.metrics.interactionDuration = 0;
        this.metrics.startTime = 0;
        // Reset the game implementation
        if (this.currentGame && typeof this.currentGame.reset === 'function') {
            this.currentGame.reset();
        }
        debug('Game reset');
    }
    /**
     * Change the game type
     *
     * @param gameType - New game type
     */
    changeGameType(gameType) {
        // Stop the current game
        this.pause();
        // Update options
        this.options.gameType = gameType;
        // Re-initialize the game
        this.initializeGame();
        debug('Game type changed', { type: gameType });
    }
    /**
     * Register an event handler
     *
     * @param event - Event type to listen for
     * @param handler - Event handler function
     * @returns The game instance for chaining
     */
    on(event, handler) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, []);
        }
        this.eventHandlers.get(event).push(handler);
        return this;
    }
    /**
     * Remove an event handler
     *
     * @param event - Event type
     * @param handler - Handler to remove (optional, removes all if not specified)
     * @returns The game instance for chaining
     */
    off(event, handler) {
        if (!handler) {
            // Remove all handlers for this event
            this.eventHandlers.delete(event);
        }
        else if (this.eventHandlers.has(event)) {
            // Remove specific handler
            const handlers = this.eventHandlers.get(event);
            const index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
            if (handlers.length === 0) {
                this.eventHandlers.delete(event);
            }
        }
        return this;
    }
    /**
     * Register a one-time event handler
     *
     * @param event - Event type to listen for
     * @param handler - Event handler function
     * @returns The game instance for chaining
     */
    once(event, handler) {
        const onceHandler = (data) => {
            this.off(event, onceHandler);
            handler(data);
        };
        return this.on(event, onceHandler);
    }
    /**
     * Emit an event
     *
     * @param event - Event type to emit
     * @param data - Event data
     * @private
     */
    emit(event, data) {
        if (this.eventHandlers.has(event)) {
            this.eventHandlers.get(event).forEach(handler => {
                try {
                    handler(data);
                }
                catch (error) {
                    console.error(`Error in ${event} event handler:`, error);
                }
            });
        }
    }
    /**
     * Set callback for game completion
     *
     * @param callback - Function to call when game completes
     * @deprecated Use on('complete', callback) instead
     */
    onComplete(callback) {
        this.on('complete', callback);
    }
    /**
     * Clean up and destroy the game
     */
    destroy() {
        // Remove event listeners
        if (this.container) {
            this.container.removeEventListener('mousemove', () => { });
        }
        window.removeEventListener('keydown', () => { });
        window.removeEventListener('resize', this.handleResize.bind(this));
        // Destroy game implementation
        if (this.currentGame && typeof this.currentGame.destroy === 'function') {
            this.currentGame.destroy();
        }
        // Destroy PIXI application
        if (this.app) {
            // Use the correct destroy options for PIXI v8
            this.app.destroy(true, {
                children: true,
                texture: true
            });
            this.app = null;
        }
        // Clear container
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.isInitialized = false;
        this.isRunning = false;
        this.currentGame = null;
    }
}
/**
 * Helper function to create a new Game instance
 *
 * @param options - Game options
 * @returns New Game instance
 */
export function createGame(options) {
    return new Game(options);
}
