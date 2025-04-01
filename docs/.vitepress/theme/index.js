// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import FilterSearch from '../components/FilterSearch.vue'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('FilterSearch', FilterSearch)
  }
}
