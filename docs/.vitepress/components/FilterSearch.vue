<template>
  <div class="filter-search">
    <div class="filter-search-input">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search in documentation..."
        @keyup.enter="applyFilter"
      />
      <button @click="applyFilter" class="filter-button">Filter</button>
      <button v-if="currentFilter" @click="clearFilter" class="clear-button">Clear</button>
    </div>
    <div v-if="currentFilter" class="current-filter">
      <span>Current filter: <strong>{{ currentFilter }}</strong></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
const searchQuery = ref('')
const currentFilter = ref('')

// Get the current filter from meta tag
onMounted(() => {
  const filterMeta = document.querySelector('meta[name="filter"]')
  if (filterMeta) {
    currentFilter.value = filterMeta.getAttribute('content')
    searchQuery.value = currentFilter.value
  }
})

// Apply the filter by reloading with the filter parameter
const applyFilter = () => {
  if (!searchQuery.value.trim()) {
    clearFilter()
    return
  }
  
  // Store the current path
  const currentPath = window.location.pathname
  
  // Reload the page with the filter parameter
  window.location.href = `/?filter=${encodeURIComponent(searchQuery.value.trim())}`
}

// Clear the filter
const clearFilter = () => {
  // Store the current path
  const currentPath = window.location.pathname
  
  // Reload without the filter
  window.location.href = '/'
}
</script>

<style scoped>
.filter-search {
  margin: 1rem 0;
  width: 100%;
}

.filter-search-input {
  display: flex;
  gap: 0.5rem;
}

.filter-search-input input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.9rem;
}

.filter-button, .clear-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
}

.filter-button {
  background-color: var(--vp-c-brand);
  color: white;
}

.clear-button {
  background-color: var(--vp-c-gray);
  color: white;
}

.current-filter {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
</style>
