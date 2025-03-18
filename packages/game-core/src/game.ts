/**
 * Core Game class for GameShield
 * 
 * Handles game creation, lifecycle management, and event handling
 * 
 * @packageDocumentation
 */

import * as PIXI from 'pixi.js';
import { 
  GameOptions, 
  GameResult, 
  GameEventType, 
  GameEventHandler, 
  GameType 
} from './types';
import { 
  DEFAULT_WIDTH, 
  DEFAULT_HEIGHT, 
  DEFAULT_BACKGROUND_COLOR, 
  DEFAULT_DIFFICULTY,
  DEFAULT_GAME_TYPE
} from './constants';
import { GameFactory } from './games';
import { debug } from './utils';

/**
 * Required GameOptions with all properties defined
 */
interface RequiredGameOptions extends Required<Omit<GameOptions, 'container'>> {
  container: HTMLElement | null;
}

/**
 * Main Game controller class
 * 
 * Manages game lifecycle, rendering, and event handling
 */
export class Game {
  /** PIXI Application instance */
  private app: PIXI.Application | null = null;
  
  /** Current active game implementation */
  private currentGame: any = null;
  
  /** Game options with defaults applied */
  private options: RequiredGameOptions;
  
  /** HTML container element */
  private container: HTMLElement | null = null;
  
  /** Event handlers mapped by event type */
  private eventHandlers: Map<GameEventType, GameEventHandler[]> = new Map();
  
  /** Interaction metrics being collected */
  private metrics = {
    mouseMovements: 0,
    keyPresses: 0,
    interactionDuration: 0,
    startTime: 0
  };
  
  /** Whether the game is currently running */
  private isRunning = false;
  
  /** Whether initialization has completed */
  private isInitialized = false;

  /**
   * Create a new Game instance
   * 
   * @param options - Game configuration options
   */
  constructor(options: GameOptions = {}) {
    // Set default options
    this.options = {
      width: options.width ?? DEFAULT_WIDTH,
      height: options.height ?? DEFAULT_HEIGHT,
      backgroundColor: options.backgroundColor ?? DEFAULT_BACKGROUND_COLOR,
      difficulty: options.difficulty ?? DEFAULT_DIFFICULTY,
      container: null, // Will be set in mount method
      gameType: options.gameType ?? DEFAULT_GAME_TYPE,
      scale: options.scale ?? 'fit',
      maxFPS: options.maxFPS ?? 60,
      assetsPath: options.assetsPath ?? '', // Default to empty string instead of undefined
      onLoad: options.onLoad ?? (() => {})
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
  public mount(container: HTMLElement | string): void {
    if (typeof container === 'string') {
      const element = document.getElementById(container);
      if (!element) {
        throw new Error(`Game container element with id '${container}' not found`);
      }
      this.container = element;
    } else {
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
  private initialize(): void {
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
    this.container.appendChild(this.app.view as unknown as HTMLElement);
    
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
  private initializeGame(): void {
    if (!this.app) {
      throw new Error('Cannot initialize game: PIXI application not created');
    }
    
    const { gameType, difficulty } = this.options;
    
    // Create the game based on selected type
    this.currentGame = GameFactory.createGame(
      gameType, 
      {
        app: this.app,
        difficulty,
        onComplete: this.handleGameComplete.bind(this)
      }
    );
    
    debug('Game implementation initialized', { type: gameType, difficulty });
  }

  /**
   * Apply scaling mode to the game canvas
   * @private
   */
  private applyScaling(): void {
    if (!this.app || !this.container) return;
    
    const view = this.app.view as unknown as HTMLElement;
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
  private handleResize(): void {
    this.applyScaling();
  }

  /**
   * Set up interaction tracking
   * @private
   */
  private setupInteractionTracking(): void {
    if (!this.container) return;
    
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
  private handleGameComplete(result: GameResult): void {
    // Calculate total interaction duration
    if (this.metrics.startTime > 0) {
      this.metrics.interactionDuration = Date.now() - this.metrics.startTime;
    }
    
    // Combine metrics with result
    const finalResult: GameResult = {
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
  public start(): void {
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
  public pause(): void {
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
  public resume(): void {
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
  public reset(): void {
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
  public changeGameType(gameType: GameType): void {
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
  public on(event: GameEventType, handler: GameEventHandler): Game {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    
    this.eventHandlers.get(event)!.push(handler);
    return this;
  }

  /**
   * Remove an event handler
   * 
   * @param event - Event type
   * @param handler - Handler to remove (optional, removes all if not specified)
   * @returns The game instance for chaining
   */
  public off(event: GameEventType, handler?: GameEventHandler): Game {
    if (!handler) {
      // Remove all handlers for this event
      this.eventHandlers.delete(event);
    } else if (this.eventHandlers.has(event)) {
      // Remove specific handler
      const handlers = this.eventHandlers.get(event)!;
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
  public once(event: GameEventType, handler: GameEventHandler): Game {
    const onceHandler: GameEventHandler = (data) => {
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
  private emit(event: GameEventType, data?: any): void {
    if (this.eventHandlers.has(event)) {
      this.eventHandlers.get(event)!.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
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
  public onComplete(callback: (result: GameResult) => void): void {
    this.on('complete', callback);
  }

  /**
   * Clean up and destroy the game
   */
  public destroy(): void {
    // Remove event listeners
    if (this.container) {
      this.container.removeEventListener('mousemove', () => {});
    }
    window.removeEventListener('keydown', () => {});
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
export function createGame(options: GameOptions): Game {
  return new Game(options);
}
