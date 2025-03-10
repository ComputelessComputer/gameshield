<template>
  <div class="theme">
    <Layout>
      <!-- Remove the filter search from the top -->
    </Layout>
  </div>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import FilterSearch from '../components/FilterSearch.vue'

const { Layout } = DefaultTheme
</script>

<style>
/* Styles for the filter search container are no longer needed */
</style>
