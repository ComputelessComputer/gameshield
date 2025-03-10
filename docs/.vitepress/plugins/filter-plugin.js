// Filter plugin for VitePress
// This plugin allows filtering pages based on a search term

export function filterPlugin(filter) {
  return {
    name: 'vitepress-filter-plugin',
    enforce: 'pre',
    
    // Hook into the VitePress page transformation process
    async transform(code, id) {
      // Only process markdown files
      if (!id.endsWith('.md')) return null;
      
      // If no filter is specified, include all pages
      if (!filter || filter.trim() === '') return null;
      
      // Get the relative path from the docs directory
      const relativePath = id.split('/docs/')[1];
      if (!relativePath) return null;
      
      // Check if the filter matches the path or content
      const pathMatches = relativePath.toLowerCase().includes(filter.toLowerCase());
      const contentMatches = code.toLowerCase().includes(filter.toLowerCase());
      
      // If neither path nor content matches, exclude this page
      if (!pathMatches && !contentMatches) {
        // Return an empty page with a note about filtering
        return `---
title: Filtered Out
---

# This page is filtered out

This page is not shown because it doesn't match the current filter: "${filter}".

[Clear filter](/)`
      }
      
      // If it matches, add a banner to indicate it's included in the filter
      const filterBanner = `
::: tip Filter Active
This page matches your filter: "${filter}". [Clear filter](/)
:::

`;
      
      // Add the banner after the frontmatter (if any)
      if (code.startsWith('---')) {
        const secondFrontmatterDelimiter = code.indexOf('---', 3);
        if (secondFrontmatterDelimiter !== -1) {
          return code.slice(0, secondFrontmatterDelimiter + 3) + filterBanner + code.slice(secondFrontmatterDelimiter + 3);
        }
      }
      
      return filterBanner + code;
    }
  }
}
