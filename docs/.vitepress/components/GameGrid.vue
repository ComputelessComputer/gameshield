<template>
  <div class="game-grid">
    <div v-for="game in games" :key="game.id" class="game-card">
      <a :href="game.link" class="game-link">
        <div class="game-icon">{{ game.icon }}</div>
        <h3>{{ game.title }}</h3>
        <p>{{ game.description }}</p>
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  games: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.game-card {
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  height: 100%;
}

.game-card:hover {
  background-color: var(--vp-c-bg-mute);
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.game-link {
  display: block;
  padding: 1.5rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  height: 100%;
  box-sizing: border-box;
}

.game-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
}

p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>
