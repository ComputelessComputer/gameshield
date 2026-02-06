import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TetrisEngine, BOARD_WIDTH, BOARD_HEIGHT } from './game/engine.js';
import { GameShieldClient, type ChallengeResponse } from './api/client.js';

type WidgetState = 'initial' | 'loading' | 'playing' | 'verifying' | 'success' | 'error';

const CELL_SIZE = 20;
const PREVIEW_CELL_SIZE = 15;

@customElement('gameshield-captcha')
export class GameShieldCaptcha extends LitElement {
  @property({ attribute: 'site-key' }) siteKey = '';
  @property({ attribute: 'api-url' }) apiUrl = 'http://localhost:3001';
  @property({ attribute: 'data-callback' }) dataCallback = '';
  @property({ attribute: 'data-error-callback' }) dataErrorCallback = '';
  @property({ attribute: 'theme' }) theme: 'light' | 'dark' | 'auto' = 'auto';

  @state() private widgetState: WidgetState = 'initial';
  @state() private error: string | null = null;
  @state() private verificationToken: string | null = null;

  private client: GameShieldClient | null = null;
  private engine: TetrisEngine | null = null;
  private challenge: ChallengeResponse | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private previewCanvas: HTMLCanvasElement | null = null;
  private boundKeyHandler: ((e: KeyboardEvent) => void) | null = null;

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .container {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      background: #fff;
      max-width: 280px;
    }

    .container.dark {
      background: #1a1a1a;
      border-color: #333;
      color: #fff;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .logo {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
    }

    .title {
      font-size: 14px;
      font-weight: 500;
    }

    .initial-box {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #f5f5f5;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .initial-box:hover {
      background: #ebebeb;
    }

    .dark .initial-box {
      background: #2a2a2a;
    }

    .dark .initial-box:hover {
      background: #333;
    }

    .checkbox {
      width: 24px;
      height: 24px;
      border: 2px solid #ccc;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .checkbox.checked {
      background: #22c55e;
      border-color: #22c55e;
    }

    .checkbox.checked::after {
      content: '✓';
      color: white;
      font-size: 14px;
    }

    .initial-text {
      font-size: 13px;
      color: #666;
    }

    .dark .initial-text {
      color: #aaa;
    }

    .game-area {
      display: flex;
      gap: 12px;
    }

    .board-container {
      position: relative;
    }

    canvas {
      border: 2px solid #333;
      border-radius: 4px;
      display: block;
    }

    .dark canvas {
      border-color: #555;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .preview-box {
      padding: 8px;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .dark .preview-box {
      background: #2a2a2a;
    }

    .preview-label {
      font-size: 10px;
      text-transform: uppercase;
      color: #888;
      margin-bottom: 4px;
    }

    .stats {
      font-size: 12px;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .stat-label {
      color: #888;
    }

    .stat-value {
      font-weight: 600;
    }

    .requirement {
      padding: 8px;
      background: #fef3c7;
      border-radius: 4px;
      font-size: 11px;
      color: #92400e;
    }

    .dark .requirement {
      background: #422006;
      color: #fcd34d;
    }

    .controls {
      margin-top: 8px;
      font-size: 10px;
      color: #888;
      text-align: center;
    }

    .content {
      min-height: ${BOARD_HEIGHT * CELL_SIZE + 4 + 28}px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .message {
      padding: 16px;
      text-align: center;
    }

    .spinner {
      width: 24px;
      height: 24px;
      border: 2px solid #e0e0e0;
      border-top-color: #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .success-icon {
      width: 48px;
      height: 48px;
      background: #22c55e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
      color: white;
      font-size: 24px;
    }

    .error-text {
      color: #ef4444;
      font-size: 13px;
    }

    .retry-btn {
      margin-top: 8px;
      padding: 8px 16px;
      background: #6366f1;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }

    .retry-btn:hover {
      background: #4f46e5;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.siteKey) {
      this.client = new GameShieldClient(this.siteKey, this.apiUrl);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanup();
  }

  private cleanup() {
    if (this.engine) {
      this.engine.stop();
      this.engine = null;
    }
    if (this.boundKeyHandler) {
      window.removeEventListener('keydown', this.boundKeyHandler);
      this.boundKeyHandler = null;
    }
  }

  private async startChallenge() {
    if (!this.client) return;

    this.widgetState = 'loading';
    this.error = null;

    try {
      this.challenge = await this.client.getChallenge();
      this.engine = new TetrisEngine(this.challenge.seed);

      this.engine.setUpdateCallback(() => this.requestUpdate());
      this.engine.setGameOverCallback(() => this.handleGameOver());

      this.widgetState = 'playing';

      await this.updateComplete;
      this.setupCanvas();
      this.setupKeyboardControls();
      this.engine.start();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to start challenge';
      this.widgetState = 'error';
      this.callErrorCallback(this.error);
    }
  }

  private setupCanvas() {
    this.canvas = this.shadowRoot?.querySelector('#game-board') as HTMLCanvasElement;
    this.previewCanvas = this.shadowRoot?.querySelector('#preview') as HTMLCanvasElement;
  }

  private setupKeyboardControls() {
    this.boundKeyHandler = (e: KeyboardEvent) => {
      if (!this.engine || this.widgetState !== 'playing') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.engine.moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.engine.moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.engine.moveDown();
          break;
        case 'ArrowUp':
        case 'x':
          e.preventDefault();
          this.engine.rotate(1);
          break;
        case 'z':
          e.preventDefault();
          this.engine.rotate(-1);
          break;
        case ' ':
          e.preventDefault();
          this.engine.hardDrop();
          break;
      }
    };

    window.addEventListener('keydown', this.boundKeyHandler);
  }

  private async handleGameOver() {
    if (!this.engine || !this.challenge || !this.client) return;

    const state = this.engine.getState();

    // Check if minimum lines were cleared
    if (state.score.lines < this.challenge.minLinesRequired) {
      this.error = `Need to clear at least ${this.challenge.minLinesRequired} lines. You cleared ${state.score.lines}.`;
      this.widgetState = 'error';
      this.cleanup();
      return;
    }

    this.widgetState = 'verifying';
    this.cleanup();

    try {
      const result = await this.client.redeemChallenge(
        this.challenge.challengeId,
        this.challenge.token,
        state.moves,
        state.score.score,
        state.score.lines,
        this.engine.getSolveTime()
      );

      if (result.success && result.verificationToken) {
        this.verificationToken = result.verificationToken;
        this.widgetState = 'success';
        this.callSuccessCallback(result.verificationToken);
      } else {
        this.error = result.error || 'Verification failed';
        this.widgetState = 'error';
        this.callErrorCallback(this.error);
      }
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Verification failed';
      this.widgetState = 'error';
      this.callErrorCallback(this.error);
    }
  }

  private callSuccessCallback(token: string) {
    if (this.dataCallback) {
      const fn = (window as Record<string, unknown>)[this.dataCallback];
      if (typeof fn === 'function') {
        fn(token);
      }
    }
    this.dispatchEvent(new CustomEvent('success', { detail: { token } }));
  }

  private callErrorCallback(error: string) {
    if (this.dataErrorCallback) {
      const fn = (window as Record<string, unknown>)[this.dataErrorCallback];
      if (typeof fn === 'function') {
        fn(error);
      }
    }
    this.dispatchEvent(new CustomEvent('error', { detail: { error } }));
  }

  private retry() {
    this.cleanup();
    this.widgetState = 'initial';
    this.error = null;
    this.verificationToken = null;
  }

  getVerificationToken(): string | null {
    return this.verificationToken;
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (this.widgetState === 'playing' && this.engine) {
      this.renderGame();
    }
  }

  private renderGame() {
    if (!this.canvas || !this.engine) return;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    const state = this.engine.getState();
    const isDark = this.theme === 'dark';

    // Clear canvas
    ctx.fillStyle = isDark ? '#1a1a1a' : '#fff';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid
    ctx.strokeStyle = isDark ? '#333' : '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(BOARD_WIDTH * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }

    // Draw placed pieces
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const cell = state.board[y][x];
        if (cell) {
          this.drawCell(ctx, x, y, cell);
        }
      }
    }

    // Draw current piece
    if (state.currentPiece) {
      const piece = state.currentPiece;
      for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
          if (piece.shape[row][col]) {
            const y = piece.y + row;
            if (y >= 0) {
              this.drawCell(ctx, piece.x + col, y, piece.color);
            }
          }
        }
      }
    }

    // Draw preview
    this.renderPreview();
  }

  private drawCell(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    const padding = 1;
    ctx.fillStyle = color;
    ctx.fillRect(
      x * CELL_SIZE + padding,
      y * CELL_SIZE + padding,
      CELL_SIZE - padding * 2,
      CELL_SIZE - padding * 2
    );

    // Add highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(
      x * CELL_SIZE + padding,
      y * CELL_SIZE + padding,
      CELL_SIZE - padding * 2,
      3
    );
  }

  private renderPreview() {
    if (!this.previewCanvas || !this.engine) return;

    const ctx = this.previewCanvas.getContext('2d');
    if (!ctx) return;

    const state = this.engine.getState();
    const isDark = this.theme === 'dark';

    ctx.fillStyle = isDark ? '#2a2a2a' : '#f5f5f5';
    ctx.fillRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);

    const piece = state.nextPiece;
    const offsetX = (this.previewCanvas.width - piece.shape[0].length * PREVIEW_CELL_SIZE) / 2;
    const offsetY = (this.previewCanvas.height - piece.shape.length * PREVIEW_CELL_SIZE) / 2;

    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          ctx.fillStyle = piece.color;
          ctx.fillRect(
            offsetX + col * PREVIEW_CELL_SIZE + 1,
            offsetY + row * PREVIEW_CELL_SIZE + 1,
            PREVIEW_CELL_SIZE - 2,
            PREVIEW_CELL_SIZE - 2
          );
        }
      }
    }
  }

  render() {
    const isDark = this.theme === 'dark' ||
      (this.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return html`
      <div class="container ${isDark ? 'dark' : ''}">
        <div class="header">
          <div class="logo">G</div>
          <span class="title">GameShield</span>
        </div>

        <div class="content">
          ${this.renderContent()}
        </div>
      </div>
    `;
  }

  private renderContent() {
    switch (this.widgetState) {
      case 'initial':
        return html`
          <div class="initial-box" @click=${this.startChallenge}>
            <div class="checkbox"></div>
            <span class="initial-text">I'm not a robot</span>
          </div>
        `;

      case 'loading':
        return html`
          <div class="message">
            <div class="spinner"></div>
            <div>Loading challenge...</div>
          </div>
        `;

      case 'playing':
        return this.renderGame2();

      case 'verifying':
        return html`
          <div class="message">
            <div class="spinner"></div>
            <div>Verifying...</div>
          </div>
        `;

      case 'success':
        return html`
          <div class="message">
            <div class="success-icon">✓</div>
            <div>Verification complete!</div>
          </div>
        `;

      case 'error':
        return html`
          <div class="message">
            <div class="error-text">${this.error}</div>
            <button class="retry-btn" @click=${this.retry}>Try Again</button>
          </div>
        `;
    }
  }

  private renderGame2() {
    const state = this.engine?.getState();
    if (!state || !this.challenge) return html``;

    return html`
      <div class="game-area">
        <div class="board-container">
          <canvas
            id="game-board"
            width=${BOARD_WIDTH * CELL_SIZE}
            height=${BOARD_HEIGHT * CELL_SIZE}
          ></canvas>
        </div>
        <div class="sidebar">
          <div class="preview-box">
            <div class="preview-label">Next</div>
            <canvas
              id="preview"
              width=${4 * PREVIEW_CELL_SIZE}
              height=${4 * PREVIEW_CELL_SIZE}
            ></canvas>
          </div>
          <div class="stats">
            <div class="stat-row">
              <span class="stat-label">Score</span>
              <span class="stat-value">${state.score.score}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Lines</span>
              <span class="stat-value">${state.score.lines}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Level</span>
              <span class="stat-value">${state.score.level}</span>
            </div>
          </div>
          <div class="requirement">
            Clear ${this.challenge.minLinesRequired} lines to verify
          </div>
        </div>
      </div>
      <div class="controls">
        ← → Move | ↑ Rotate | ↓ Drop | Space Hard Drop
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gameshield-captcha': GameShieldCaptcha;
  }
}
