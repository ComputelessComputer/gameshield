<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

// ---------- states ----------
type State = 'idle' | 'verifying' | 'game' | 'verified'
const state = ref<State>('idle')

// ---------- inline game engine ----------

type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'

interface Piece {
  type: PieceType
  shape: number[][]
  color: string
  x: number
  y: number
  rotation: number
}

const COLORS: Record<PieceType, string> = {
  I: '#00f0f0', O: '#f0f000', T: '#a000f0', S: '#00f000',
  Z: '#f00000', J: '#0000f0', L: '#f0a000',
}

const SHAPES: Record<PieceType, number[][][]> = {
  I: [
    [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
    [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
    [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
  ],
  O: [[[1,1],[1,1]],[[1,1],[1,1]],[[1,1],[1,1]],[[1,1],[1,1]]],
  T: [
    [[0,1,0],[1,1,1],[0,0,0]],[[0,1,0],[0,1,1],[0,1,0]],
    [[0,0,0],[1,1,1],[0,1,0]],[[0,1,0],[1,1,0],[0,1,0]],
  ],
  S: [
    [[0,1,1],[1,1,0],[0,0,0]],[[0,1,0],[0,1,1],[0,0,1]],
    [[0,0,0],[0,1,1],[1,1,0]],[[1,0,0],[1,1,0],[0,1,0]],
  ],
  Z: [
    [[1,1,0],[0,1,1],[0,0,0]],[[0,0,1],[0,1,1],[0,1,0]],
    [[0,0,0],[1,1,0],[0,1,1]],[[0,1,0],[1,1,0],[1,0,0]],
  ],
  J: [
    [[1,0,0],[1,1,1],[0,0,0]],[[0,1,1],[0,1,0],[0,1,0]],
    [[0,0,0],[1,1,1],[0,0,1]],[[0,1,0],[0,1,0],[1,1,0]],
  ],
  L: [
    [[0,0,1],[1,1,1],[0,0,0]],[[0,1,0],[0,1,0],[0,1,1]],
    [[0,0,0],[1,1,1],[1,0,0]],[[1,1,0],[0,1,0],[0,1,0]],
  ],
}

const W = 10
const H = 20
const CELL = 20
const TYPES: PieceType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

function makePiece(t: PieceType): Piece {
  return { type: t, shape: SHAPES[t][0], color: COLORS[t], x: t === 'O' ? 4 : 3, y: 0, rotation: 0 }
}

// ---------- game state ----------

const canvas = ref<HTMLCanvasElement | null>(null)
const previewCanvas = ref<HTMLCanvasElement | null>(null)
const REQUIRED_LINES = 2

const playing = ref(false)
const gameOver = ref(false)
const score = ref(0)
const lines = ref(0)
const level = ref(0)

let board: (string | null)[][] = []
let current: Piece | null = null
let next: Piece | null = null
let raf: number | null = null
let lastDrop = 0
let dropInterval = 1000

function randomType(): PieceType {
  return TYPES[Math.floor(Math.random() * TYPES.length)]
}

function resetGame() {
  board = Array.from({ length: H }, () => Array(W).fill(null))
  score.value = 0
  lines.value = 0
  level.value = 0
  gameOver.value = false
  dropInterval = 1000
  next = makePiece(randomType())
  spawnPiece()
}

function spawnPiece() {
  current = next!
  next = makePiece(randomType())
  if (!valid(current)) {
    gameOver.value = true
    playing.value = false
  }
}

function valid(p: Piece, ox = 0, oy = 0): boolean {
  for (let r = 0; r < p.shape.length; r++)
    for (let c = 0; c < p.shape[r].length; c++)
      if (p.shape[r][c]) {
        const nx = p.x + c + ox, ny = p.y + r + oy
        if (nx < 0 || nx >= W || ny >= H) return false
        if (ny >= 0 && board[ny][nx]) return false
      }
  return true
}

function lock() {
  if (!current) return
  for (let r = 0; r < current.shape.length; r++)
    for (let c = 0; c < current.shape[r].length; c++)
      if (current.shape[r][c]) {
        const y = current.y + r
        if (y >= 0) board[y][current.x + c] = current.color
      }
  let cleared = 0
  for (let r = H - 1; r >= 0; r--) {
    if (board[r].every(c => c !== null)) {
      board.splice(r, 1)
      board.unshift(Array(W).fill(null))
      cleared++
      r++
    }
  }
  if (cleared > 0) {
    const pts = [0, 100, 300, 500, 800]
    score.value += (pts[cleared] || 0) * (level.value + 1)
    lines.value += cleared
    level.value = Math.floor(lines.value / 10)
    dropInterval = Math.max(100, 1000 - level.value * 50)
  }
  // check verification goal
  if (lines.value >= REQUIRED_LINES) {
    state.value = 'verified'
    playing.value = false
    draw()
    return
  }
  spawnPiece()
}

function moveDown() {
  if (!current) return
  if (valid(current, 0, 1)) { current.y++ } else { lock() }
}

function moveLeft() {
  if (current && valid(current, -1, 0)) current.x--
}

function moveRight() {
  if (current && valid(current, 1, 0)) current.x++
}

function hardDrop() {
  if (!current) return
  while (valid(current, 0, 1)) current.y++
  lock()
}

function rotate() {
  if (!current) return
  const nr = (current.rotation + 1) % 4
  const ns = SHAPES[current.type][nr]
  const test = { ...current, shape: ns, rotation: nr }
  for (const kick of [0, -1, 1, -2, 2]) {
    if (valid(test, kick, 0)) {
      current.shape = ns
      current.rotation = nr
      current.x += kick
      return
    }
  }
}

// ---------- rendering ----------

function draw() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return

  // background
  ctx.fillStyle = '#0f0f17'
  ctx.fillRect(0, 0, W * CELL, H * CELL)

  // grid
  ctx.strokeStyle = '#1a1a2e'
  ctx.lineWidth = 0.5
  for (let x = 0; x <= W; x++) {
    ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H * CELL); ctx.stroke()
  }
  for (let y = 0; y <= H; y++) {
    ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W * CELL, y * CELL); ctx.stroke()
  }

  // board
  for (let r = 0; r < H; r++)
    for (let c = 0; c < W; c++)
      if (board[r][c]) drawCell(ctx, c, r, board[r][c]!)

  // ghost piece
  if (current) {
    let ghostY = current.y
    while (valid(current, 0, ghostY - current.y + 1)) ghostY++
    if (ghostY !== current.y) {
      for (let r = 0; r < current.shape.length; r++)
        for (let c = 0; c < current.shape[r].length; c++)
          if (current.shape[r][c]) {
            const y = ghostY + r
            if (y >= 0) {
              ctx.fillStyle = 'rgba(255,255,255,0.08)'
              ctx.fillRect(
                (current.x + c) * CELL + 1,
                y * CELL + 1,
                CELL - 2, CELL - 2
              )
            }
          }
    }

    // current piece
    for (let r = 0; r < current.shape.length; r++)
      for (let c = 0; c < current.shape[r].length; c++)
        if (current.shape[r][c] && current.y + r >= 0)
          drawCell(ctx, current.x + c, current.y + r, current.color)
  }

  // preview
  drawPreview()
}

function drawCell(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2)
  ctx.fillStyle = 'rgba(255,255,255,0.25)'
  ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, 2)
}

function drawPreview() {
  const ctx = previewCanvas.value?.getContext('2d')
  if (!ctx || !next) return
  const S = 16
  ctx.fillStyle = '#0f0f17'
  ctx.fillRect(0, 0, 4 * S, 4 * S)
  const ox = (4 * S - next.shape[0].length * S) / 2
  const oy = (4 * S - next.shape.length * S) / 2
  for (let r = 0; r < next.shape.length; r++)
    for (let c = 0; c < next.shape[r].length; c++)
      if (next.shape[r][c]) {
        ctx.fillStyle = next.color
        ctx.fillRect(ox + c * S + 1, oy + r * S + 1, S - 2, S - 2)
      }
}

// ---------- game loop ----------

function loop() {
  if (!playing.value || gameOver.value || state.value === 'verified') return
  const now = Date.now()
  if (now - lastDrop >= dropInterval) {
    moveDown()
    lastDrop = now
  }
  draw()
  raf = requestAnimationFrame(loop)
}

function startGame() {
  resetGame()
  playing.value = true
  lastDrop = Date.now()
  loop()
}

// ---------- checkbox click handler ----------

function onCheckboxClick() {
  if (state.value !== 'idle') return
  state.value = 'verifying'
  
  // Simulate verification loading, then transition to game
  setTimeout(() => {
    state.value = 'game'
  }, 1500)
}

function playAgain() {
  state.value = 'game'
  startGame()
}

function resetToCheckbox() {
  state.value = 'idle'
  playing.value = false
  gameOver.value = false
}

// ---------- input ----------

function onKey(e: KeyboardEvent) {
  if (state.value !== 'game' || !playing.value || gameOver.value) return
  switch (e.key) {
    case 'ArrowLeft':  e.preventDefault(); moveLeft(); draw(); break
    case 'ArrowRight': e.preventDefault(); moveRight(); draw(); break
    case 'ArrowDown':  e.preventDefault(); moveDown(); draw(); break
    case 'ArrowUp':    e.preventDefault(); rotate(); draw(); break
    case ' ':          e.preventDefault(); hardDrop(); draw(); break
  }
}

// Watch for game state to start the game when expanded
watch(state, (newState) => {
  if (newState === 'game') {
    // Wait for canvas to be mounted
    setTimeout(() => {
      startGame()
    }, 50)
  }
})

onMounted(() => {
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="interactive-wrapper">
    <!-- Idle state: checkbox -->
    <div 
      v-if="state === 'idle'" 
      class="checkbox-container"
      @click="onCheckboxClick"
    >
      <div class="checkbox-box">
        <div class="checkbox-inner"></div>
      </div>
      <span class="checkbox-label">I'm not a robot</span>
      <div class="checkbox-brand">
        <div class="brand-icon">[G]</div>
        <div class="brand-text">GameShield</div>
      </div>
    </div>

    <!-- Verifying state: loading spinner -->
    <div 
      v-else-if="state === 'verifying'" 
      class="checkbox-container verifying"
    >
      <div class="checkbox-box">
        <div class="spinner"></div>
      </div>
      <span class="checkbox-label">Verifying...</span>
      <div class="checkbox-brand">
        <div class="brand-icon">[G]</div>
        <div class="brand-text">GameShield</div>
      </div>
    </div>

    <!-- Game state: expanded Tetris -->
    <div 
      v-else-if="state === 'game'" 
      class="game-expanded"
    >
      <div class="game-header">
        <span class="game-title">Complete the challenge</span>
        <div class="checkbox-brand small">
          <div class="brand-icon">[G]</div>
          <div class="brand-text">GameShield</div>
        </div>
      </div>
      <div class="game-body">
        <div class="board-side">
          <canvas
            ref="canvas"
            :width="W * CELL"
            :height="H * CELL"
            class="game-canvas"
          />
          <div v-if="gameOver && !playing" class="overlay" @click="startGame">
            <div class="overlay-content">
              <div class="overlay-title">Game Over</div>
              <div class="overlay-score">{{ score }} pts · {{ lines }} lines</div>
              <button class="play-btn">Try Again</button>
            </div>
          </div>
        </div>
        <div class="sidebar">
          <div class="stat-block">
            <div class="stat-label">Next</div>
            <canvas ref="previewCanvas" :width="64" :height="64" class="preview-canvas" />
          </div>
          <div class="stat-block">
            <div class="stat-label">Lines</div>
            <div class="stat-value lines-progress">{{ lines }}/{{ REQUIRED_LINES }}</div>
          </div>
          <div class="stat-block">
            <div class="stat-label">Score</div>
            <div class="stat-value">{{ score }}</div>
          </div>
          <div class="controls">
            <kbd>←</kbd><kbd>→</kbd> Move<br>
            <kbd>↑</kbd> Rotate<br>
            <kbd>↓</kbd> Soft drop<br>
            <kbd>Space</kbd> Hard drop
          </div>
        </div>
      </div>
      <div class="game-footer">
        Clear {{ REQUIRED_LINES }} lines to verify
      </div>
    </div>

    <!-- Verified state: success checkbox -->
    <div 
      v-else-if="state === 'verified'" 
      class="checkbox-container verified"
    >
      <div class="checkbox-box checked">
        <div class="checkmark">✓</div>
      </div>
      <div class="verified-info">
        <span class="checkbox-label">Verified</span>
        <span class="verified-score">{{ score }} pts · {{ lines }} lines</span>
      </div>
      <div class="checkbox-brand">
        <div class="brand-icon">[G]</div>
        <div class="brand-text">GameShield</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interactive-wrapper {
  display: flex;
  justify-content: center;
}

/* ── Checkbox states ── */

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #0f0f17;
  border: 2px solid #2a2a3e;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 280px;
}

.checkbox-container:hover:not(.verifying):not(.verified) {
  border-color: #3a3a4e;
}

.checkbox-container.verifying {
  cursor: default;
}

.checkbox-container.verified {
  cursor: default;
  border-color: #22c55e;
}

.checkbox-box {
  width: 24px;
  height: 24px;
  border: 2px solid #4a4a5e;
  background: #1a1a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.checkbox-box.checked {
  background: #22c55e;
  border-color: #22c55e;
}

.checkbox-inner {
  width: 0;
  height: 0;
}

.checkmark {
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #2a2a3e;
  border-top-color: #6366f1;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.checkbox-label {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 13px;
  color: #ccc;
  flex: 1;
}

.verified-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.verified-score {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 10px;
  color: #666;
}

.checkbox-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-left: 8px;
}

.checkbox-brand.small {
  flex-direction: row;
  gap: 6px;
}

.brand-icon {
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  color: #6366f1;
}

.brand-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  color: #666;
  text-transform: uppercase;
}

/* ── Game expanded ── */

.game-expanded {
  background: #0f0f17;
  border: 2px solid #2a2a3e;
  animation: expand 0.3s ease-out;
}

@keyframes expand {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid #2a2a3e;
}

.game-title {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 12px;
  color: #ccc;
}

.game-body {
  display: flex;
  gap: 12px;
  padding: 12px;
}

.board-side {
  position: relative;
}

.game-canvas {
  border: 2px solid #2a2a3e;
  display: block;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 23, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.overlay-content {
  text-align: center;
}

.overlay-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  color: #fff;
  margin-bottom: 6px;
}

.overlay-score {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 11px;
  color: #aaa;
  margin-bottom: 14px;
}

.play-btn {
  padding: 8px 16px;
  font-family: 'Press Start 2P', monospace;
  font-size: 8px;
  color: #fff;
  background: #6366f1;
  border: 2px solid #6366f1;
  cursor: pointer;
  transition: background 0.1s;
}

.play-btn:hover {
  background: #4f46e5;
  border-color: #4f46e5;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 80px;
}

.stat-block {
  background: #1a1a2e;
  border: 1px solid #2a2a3e;
  padding: 8px 10px;
}

.stat-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  color: #fff;
}

.lines-progress {
  color: #6366f1;
}

.preview-canvas {
  display: block;
}

.controls {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 9px;
  color: #555;
  line-height: 1.8;
}

kbd {
  display: inline-block;
  padding: 1px 4px;
  font-family: 'Courier New', Consolas, monospace;
  font-size: 9px;
  background: #1a1a2e;
  border: 1px solid #2a2a3e;
  color: #ccc;
}

.game-footer {
  padding: 8px 14px;
  border-top: 1px solid #2a2a3e;
  font-family: 'Courier New', Consolas, monospace;
  font-size: 10px;
  color: #666;
  text-align: center;
}
</style>
