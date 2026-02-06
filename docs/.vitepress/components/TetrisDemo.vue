<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// ---------- inline game engine (mirrors packages/widget) ----------

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
const CELL = 28
const TYPES: PieceType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L']

function makePiece(t: PieceType): Piece {
  return { type: t, shape: SHAPES[t][0], color: COLORS[t], x: t === 'O' ? 4 : 3, y: 0, rotation: 0 }
}

// ---------- state ----------

const canvas = ref<HTMLCanvasElement | null>(null)
const previewCanvas = ref<HTMLCanvasElement | null>(null)
const REQUIRED_LINES = 2

const playing = ref(false)
const gameOver = ref(false)
const verified = ref(false)
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
  verified.value = false
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
    verified.value = true
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
  ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, 3)
}

function drawPreview() {
  const ctx = previewCanvas.value?.getContext('2d')
  if (!ctx || !next) return
  const S = 20
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
  if (!playing.value || gameOver.value || verified.value) return
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

// ---------- input ----------

function onKey(e: KeyboardEvent) {
  if (!playing.value || gameOver.value || verified.value) return
  switch (e.key) {
    case 'ArrowLeft':  e.preventDefault(); moveLeft(); draw(); break
    case 'ArrowRight': e.preventDefault(); moveRight(); draw(); break
    case 'ArrowDown':  e.preventDefault(); moveDown(); draw(); break
    case 'ArrowUp':    e.preventDefault(); rotate(); draw(); break
    case ' ':          e.preventDefault(); hardDrop(); draw(); break
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  // draw empty board
  resetGame()
  playing.value = false
  gameOver.value = false
  draw()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="demo-wrapper">
    <div class="game-container">
      <div class="board-side">
        <canvas
          ref="canvas"
          :width="W * CELL"
          :height="H * CELL"
          class="game-canvas"
        />
        <div v-if="verified" class="overlay overlay-verified">
          <div class="overlay-content">
            <div class="overlay-check">[✓]</div>
            <div class="overlay-title">Verified</div>
            <div class="overlay-score">{{ score }} pts · {{ lines }} lines</div>
            <button class="play-btn" @click="startGame">Play Again</button>
          </div>
        </div>
        <div v-else-if="!playing" class="overlay" @click="startGame">
          <div v-if="gameOver" class="overlay-content">
            <div class="overlay-title">Game Over</div>
            <div class="overlay-score">{{ score }} pts · {{ lines }} lines</div>
            <button class="play-btn">Play Again</button>
          </div>
          <div v-else class="overlay-content">
            <button class="play-btn">▶ Play</button>
            <div class="overlay-hint">Clear {{ REQUIRED_LINES }} lines to verify</div>
          </div>
        </div>
      </div>
      <div class="sidebar">
        <div class="stat-block">
          <div class="stat-label">Next</div>
          <canvas ref="previewCanvas" :width="80" :height="80" class="preview-canvas" />
        </div>
        <div class="stat-block">
          <div class="stat-label">Score</div>
          <div class="stat-value">{{ score.toLocaleString() }}</div>
        </div>
        <div class="stat-block">
          <div class="stat-label">Lines</div>
          <div class="stat-value" :class="{ 'stat-done': lines >= REQUIRED_LINES }">{{ lines }}/{{ REQUIRED_LINES }}</div>
        </div>
        <div class="stat-block">
          <div class="stat-label">Level</div>
          <div class="stat-value">{{ level }}</div>
        </div>
        <div class="controls">
          <kbd>←</kbd><kbd>→</kbd> Move<br>
          <kbd>↑</kbd> Rotate<br>
          <kbd>↓</kbd> Soft drop<br>
          <kbd>Space</kbd> Hard drop
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-wrapper {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

.game-container {
  display: flex;
  gap: 16px;
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
  font-size: 14px;
  color: #fff;
  margin-bottom: 6px;
}

.overlay-score {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 16px;
}

.overlay-hint {
  margin-top: 10px;
  font-family: 'Courier New', Consolas, monospace;
  font-size: 10px;
  color: #555;
}

.play-btn {
  padding: 10px 24px;
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
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
  gap: 14px;
  min-width: 100px;
}

.stat-block {
  background: #0f0f17;
  border: 2px solid #2a2a3e;
  padding: 10px 12px;
}

.stat-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #666;
  margin-bottom: 6px;
}

.stat-value {
  font-family: 'Press Start 2P', monospace;
  font-size: 14px;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

.preview-canvas {
  display: block;
}

.controls {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 10px;
  color: #555;
  line-height: 2;
}

kbd {
  display: inline-block;
  padding: 2px 5px;
  font-family: 'Courier New', Consolas, monospace;
  font-size: 10px;
  background: #1a1a2e;
  border: 1px solid #2a2a3e;
  color: #ccc;
}

.overlay-verified {
  background: rgba(15, 15, 23, 0.92);
  cursor: default;
}

.overlay-check {
  font-family: 'Press Start 2P', monospace;
  font-size: 24px;
  color: #22c55e;
  margin-bottom: 12px;
}

.overlay-verified .overlay-title {
  color: #22c55e;
}

.stat-done {
  color: #22c55e;
}
</style>
