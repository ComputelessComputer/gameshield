---
layout: page
---

<script setup>
import TetrisDemo from './.vitepress/components/TetrisDemo.vue'
</script>

<div class="hero-section">
  <div class="hero-text">
    <h1 class="hero-title">&gt; GameShield_</h1>
    <p class="hero-tagline">CAPTCHA, but fun.</p>
    <p class="hero-desc">Replace image puzzles with Tetris. Verify humans through gameplay — deterministically validated server-side.</p>
    <div class="hero-actions">
      <a href="/guide/getting-started" class="btn-primary">[GET STARTED]</a>
      <a href="https://github.com/ComputelessComputer/gameshield" class="btn-secondary">[GITHUB]</a>
    </div>
  </div>
  <TetrisDemo />
</div>

<div class="features">
  <div class="feature">
    <pre class="feature-icon">[&gt;_]</pre>
    <h3>Game-based verification</h3>
    <p>Users play a quick round of Tetris instead of clicking on fire hydrants. Better UX, same security.</p>
  </div>
  <div class="feature">
    <pre class="feature-icon">[#=]</pre>
    <h3>Deterministic replay</h3>
    <p>Server generates a seeded piece sequence. Moves are replayed server-side to verify legitimacy — no trust in the client.</p>
  </div>
  <div class="feature">
    <pre class="feature-icon">[&lt;/&gt;]</pre>
    <h3>Drop-in integration</h3>
    <p>One web component on the frontend, one API call on the backend. Same siteverify pattern as reCAPTCHA and hCaptcha.</p>
  </div>
</div>

<style>
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64px;
  padding: 64px 24px 48px;
  max-width: 1100px;
  margin: 0 auto;
}

.hero-text {
  max-width: 380px;
}

.hero-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 28px;
  font-weight: 400;
  line-height: 1.3;
  margin: 0;
  color: #6366f1;
}

.hero-tagline {
  font-family: 'Press Start 2P', monospace;
  font-size: 13px;
  font-weight: 400;
  margin: 16px 0 0;
  color: var(--vp-c-text-1);
}

.hero-desc {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 16px 0 0;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: 10px 20px;
  font-family: 'Press Start 2P', monospace;
  font-size: 9px;
  text-decoration: none;
  border: 2px solid;
  transition: all 0.1s;
  text-transform: uppercase;
}

.btn-primary {
  background: #6366f1;
  border-color: #6366f1;
  color: #fff;
}

.btn-primary:hover {
  background: #4f46e5;
  border-color: #4f46e5;
}

.btn-secondary {
  background: transparent;
  border-color: var(--vp-c-text-2);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  border-color: var(--vp-c-text-1);
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.feature {
  padding: 24px;
  border: 2px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

.feature-icon {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 18px;
  font-weight: 700;
  color: #6366f1;
  margin: 0 0 12px;
  line-height: 1;
}

.feature h3 {
  font-family: 'Press Start 2P', monospace;
  margin: 0 0 8px;
  font-size: 10px;
  line-height: 1.6;
}

.feature p {
  margin: 0;
  font-family: 'Courier New', Consolas, monospace;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    gap: 32px;
    padding: 40px 24px 32px;
  }
  .hero-actions {
    justify-content: center;
  }
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
