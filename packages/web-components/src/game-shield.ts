import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GameType, Difficulty } from './types';
import { GameFactory } from './games/game-factory';
import { BehaviorAnalyzer } from './behavior/behavior-analyzer';
import { SecurityUtils } from './security/security-utils';

/**
 * GameShield Web Component
 * 
 * A CAPTCHA system that uses interactive games to verify human users.
 * 
 * @element game-shield
 * 
 * @prop {string} apiKey - API key for server verification
 * @prop {string} apiEndpoint - Endpoint for server verification
 * @prop {string} size - Size of the component (1:1 aspect ratio)
 * 
 * @fires success - When CAPTCHA is successfully completed
 * @fires failure - When CAPTCHA fails
 * @fires timeout - When CAPTCHA times out
 */
@customElement('game-shield')
export class GameShield extends LitElement {
  // Public properties (attributes)
  @property({ type: String }) apiKey = '';
  @property({ type: String, attribute: 'game-type' }) gameType: GameType = 'random';
  @property({ type: String }) difficulty: Difficulty = 'medium';
  @property({ type: String }) apiEndpoint = '';
  @property({ type: String }) size = '400px';
  
  // Internal state
  @state() private isVerified = false;
  @state() private token: string | null = null;
  @state() private gameInstance: any = null;
  @state() private isLoading = true;
  @state() private error: string | null = null;
  
  // Private properties
  private behaviorAnalyzer = new BehaviorAnalyzer();
  private securityUtils = new SecurityUtils();
  private sessionId = this.securityUtils.generateSessionId();
  private gameContainer?: HTMLElement;
  
  static styles = css`
    :host {
      display: block;
      width: var(--game-shield-size, 400px);
      height: var(--game-shield-size, 400px);
      max-width: 500px;
      max-height: 500px;
      min-width: 200px;
      min-height: 200px;
      aspect-ratio: 1 / 1;
      border: 1px solid #ccc;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      /* Force hardware acceleration and cross-browser compatibility */
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    }
    
    .game-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: #000000;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    }
    
    .loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      z-index: 10;
    }
    
    .success-badge {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: #4CAF50;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 5;
    }
    
    .error {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 0, 0, 0.1);
      color: #d32f2f;
      text-align: center;
      padding: 20px;
      z-index: 10;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #3498db;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  
  connectedCallback() {
    super.connectedCallback();
    // Start behavior analysis as soon as component is connected
    this.behaviorAnalyzer.startTracking();
    
    // Always force random game type for security
    this.gameType = 'random';
    
    // Set CSS variable for size (1:1 aspect ratio)
    this.style.setProperty('--game-shield-size', this.size);
    
    // Ensure proper sizing and cross-browser compatibility
    if (this.size === '100%') {
      // If size is 100%, make sure it respects max dimensions
      this.style.width = '100%';
      this.style.height = '100%'; 
      this.style.maxWidth = '500px';
      this.style.maxHeight = '500px';
    } else {
      // For specific size values
      const parsedSize = parseInt(this.size);
      const finalSize = parsedSize > 500 ? '500px' : this.size;
      this.style.width = finalSize;
      this.style.height = finalSize;
    }
  }
  
  firstUpdated() {
    this.gameContainer = this.renderRoot.querySelector('.game-container') as HTMLElement;
    this.initializeGame();
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    this.destroyGame();
    this.behaviorAnalyzer.stopTracking();
  }
  
  private async initializeGame() {
    try {
      this.isLoading = true;
      
      if (!this.gameContainer) {
        throw new Error('Game container not found');
      }
      
      // Create game instance - always use random type
      this.gameInstance = GameFactory.createGame('random', {
        difficulty: 'medium',
        width: this.gameContainer.clientWidth,
        height: this.gameContainer.clientHeight,
        onComplete: this.handleGameComplete.bind(this)
      });
      
      // Mount game to container
      await this.gameInstance.mount(this.gameContainer);
      
      this.isLoading = false;
      
      // Add timeout handling
      setTimeout(() => {
        if (!this.isVerified && !this.error) {
          this.dispatchEvent(new CustomEvent('timeout', {
            detail: { message: 'Game timeout' },
            bubbles: true,
            composed: true
          }));
        }
      }, 120000); // 2 minute timeout
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to initialize game';
      this.isLoading = false;
      this.dispatchEvent(new CustomEvent('failure', {
        detail: { reason: this.error },
        bubbles: true,
        composed: true
      }));
      console.error('GameShield initialization error:', error);
    }
  }
  
  private handleGameComplete(result: { success: boolean; score: number }) {
    this.isVerified = result.success;
    
    if (result.success) {
      // Get behavior analysis results
      const behaviorResult = this.behaviorAnalyzer.analyze();
      
      // Generate token
      const payload = {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        gameType: this.gameType,
        behaviorMetrics: behaviorResult,
        gameResult: {
          success: result.success,
          score: result.score
        }
      };
      
      this.token = this.securityUtils.generateToken(payload);
      
      // Dispatch success event
      this.dispatchEvent(new CustomEvent('success', { 
        detail: { token: this.token },
        bubbles: true,
        composed: true
      }));
      
      // Verify with server if endpoint is provided
      if (this.apiEndpoint && this.token) {
        this.verifyWithServer(this.token).catch(error => {
          console.error('Server verification failed:', error);
        });
      }
    } else {
      this.dispatchEvent(new CustomEvent('failure', {
        detail: { reason: 'Game failed' },
        bubbles: true,
        composed: true
      }));
    }
  }
  
  private async verifyWithServer(token: string) {
    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey
      },
      body: JSON.stringify({ token })
    });
    
    if (!response.ok) {
      throw new Error(`Server verification failed: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  /**
   * Reset the CAPTCHA to its initial state
   */
  reset() {
    this.destroyGame();
    this.sessionId = this.securityUtils.generateSessionId();
    this.token = null;
    this.isVerified = false;
    this.error = null;
    this.behaviorAnalyzer.reset();
    this.initializeGame();
  }
  
  private destroyGame() {
    if (this.gameInstance) {
      this.gameInstance.destroy();
      this.gameInstance = null;
    }
  }
  
  render() {
    return html`
      <div class="game-container"></div>
      
      ${this.isLoading ? 
        html`<div class="loading"><div class="spinner"></div></div>` : 
        ''
      }
      
      ${this.error ? 
        html`<div class="error">${this.error}</div>` : 
        ''
      }
      
      ${this.isVerified ? 
        html`<div class="success-badge">✓ Verified</div>` : 
        ''
      }
    `;
  }
}
