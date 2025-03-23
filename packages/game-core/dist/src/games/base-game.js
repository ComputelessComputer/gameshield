/**
 * Base Game Class
 *
 * Abstract base class that all game implementations must extend.
 * Provides common functionality and enforces consistent interface.
 *
 * @packageDocumentation
 */
import * as PIXI from 'pixi.js';
import { difficultyToValue } from '../utils';
/**
 * Abstract base class for all games
 */
export class BaseGame {
    /**
     * Create a new BaseGame instance
     *
     * @param app - PIXI Application instance
     * @param config - Game configuration
     */
    constructor(app, config = {}) {
        var _a, _b, _c, _d, _e, _f;
        /** Whether the game is currently running */
        this.isRunning = false;
        /** Whether the game has been initialized */
        this.isInitialized = false;
        /** Game start timestamp */
        this.startTime = 0;
        /** Game completion callback */
        this.onCompleteCallback = null;
        /** Interaction metrics being collected */
        this.metrics = {
            mouseMovements: 0,
            keyPresses: 0,
            interactionDuration: 0
        };
        this.app = app;
        this.container = new PIXI.Container();
        // Set default configuration
        this.config = {
            width: (_a = config.width) !== null && _a !== void 0 ? _a : 400,
            height: (_b = config.height) !== null && _b !== void 0 ? _b : 300,
            backgroundColor: (_c = config.backgroundColor) !== null && _c !== void 0 ? _c : 0x1099bb,
            difficulty: (_d = config.difficulty) !== null && _d !== void 0 ? _d : 'medium',
            assetsPath: (_e = config.assetsPath) !== null && _e !== void 0 ? _e : '',
            onLoad: (_f = config.onLoad) !== null && _f !== void 0 ? _f : (() => { })
        };
        // Convert difficulty to numeric value
        this.difficultyValue = difficultyToValue(this.config.difficulty);
        // Add container to stage
        this.app.stage.addChild(this.container);
    }
    /**
     * Initialize resources and setup
     */
    init() {
        if (this.isInitialized) {
            return;
        }
        // Track interaction metrics
        this.setupInteractionTracking();
        // Initialize game-specific elements
        this.initialize();
        this.isInitialized = true;
        // Call onLoad callback if provided
        if (this.config.onLoad) {
            this.config.onLoad();
        }
    }
    /**
     * Set up interaction tracking
     *
     * @protected
     */
    setupInteractionTracking() {
        // Track mouse movements within the app view
        this.app.view.addEventListener('mousemove', () => {
            if (this.isRunning) {
                this.metrics.mouseMovements++;
            }
        });
        // Track key presses
        window.addEventListener('keydown', (e) => {
            if (this.isRunning) {
                this.metrics.keyPresses++;
            }
        });
    }
    /**
     * Start the game
     */
    start() {
        if (!this.isInitialized) {
            this.init();
        }
        if (this.isRunning) {
            return;
        }
        this.startTime = Date.now();
        this.isRunning = true;
        // Reset metrics
        this.metrics.mouseMovements = 0;
        this.metrics.keyPresses = 0;
        this.metrics.interactionDuration = 0;
    }
    /**
     * Pause the game
     */
    pause() {
        this.isRunning = false;
    }
    /**
     * Resume the game
     */
    resume() {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
    }
    /**
     * Reset the game state
     */
    reset() {
        this.isRunning = false;
        this.startTime = 0;
        // Reset metrics
        this.metrics.mouseMovements = 0;
        this.metrics.keyPresses = 0;
        this.metrics.interactionDuration = 0;
    }
    /**
     * Mount the game to a DOM container
     *
     * @param container - HTML element to mount to
     */
    mount(container) {
        // PIXI handles this at a higher level
        // This is here for API consistency
    }
    /**
     * Set completion callback
     *
     * @param callback - Function to call when game completes
     */
    setCompletionCallback(callback) {
        this.onCompleteCallback = callback;
    }
    /**
     * Complete the game and notify with result
     *
     * @param success - Whether the game was completed successfully
     * @param score - Score achieved (0-100)
     * @param gameData - Optional game-specific data
     * @protected
     */
    complete(success, score, gameData) {
        if (!this.isRunning) {
            return;
        }
        this.isRunning = false;
        // Calculate duration
        const time = Date.now() - this.startTime;
        this.metrics.interactionDuration = time;
        // Create result object
        const result = {
            success,
            score,
            time,
            metrics: { ...this.metrics },
            gameData
        };
        // Call completion callback if set
        if (this.onCompleteCallback) {
            this.onCompleteCallback(result);
        }
    }
    /**
     * Clean up and destroy game
     */
    destroy() {
        // Remove event listeners
        this.app.view.removeEventListener('mousemove', () => { });
        window.removeEventListener('keydown', () => { });
        // Remove container from stage
        this.app.stage.removeChild(this.container);
        // Clean up PIXI resources
        this.container.destroy({ children: true });
        // Reset properties
        this.isInitialized = false;
        this.isRunning = false;
        this.onCompleteCallback = null;
    }
}
