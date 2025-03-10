import { defineConfig } from 'vitepress'
import { filterPlugin } from './plugins/filter-plugin.js'

// Get filter from command line arguments
const getFilter = () => {
  const filterIndex = process.argv.indexOf('--filter')
  if (filterIndex > -1 && process.argv.length > filterIndex + 1) {
    return process.argv[filterIndex + 1]
  }
  return ''
}

const filter = getFilter()

export default defineConfig({
  title: "🎮 Gameshield 🛡️",
  description: "Generative Game CAPTCHA - Prevent bots with interactive games",
  themeConfig: {
    siteTitle: '🎮 Gameshield 🛡️',
    logo: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/your-username/gameshield' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Gameshield?', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'How it Works', link: '/guide/how-it-works' },
            { text: 'Game Types', link: '/guide/game-types' },
            { text: 'Security Features', link: '/guide/security-features' },
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Customization', link: '/guide/customization' },
            { text: 'Integration Examples', link: '/guide/integration-examples' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'SDK Methods', link: '/api/sdk-methods' },
            { text: 'Server API', link: '/api/server' },
            { text: 'Configuration', link: '/api/configuration' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/gameshield' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2025 Gameshield'
    },
    search: {
      provider: 'local',
      options: {
        appId: 'gameshield',
        apiKey: 'local-search-key',
        indexName: 'gameshield-docs',
        locales: {
          root: {
            placeholder: 'Search Documentation',
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation'
              }
            }
          }
        }
      }
    }
  },
  // Add filter information to the site
  head: filter ? [
    ['meta', { name: 'filter', content: filter }],
    ['meta', { name: 'robots', content: 'noindex' }]
  ] : [],
  // Add custom CSS for filter banner
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'filter-banner-styles',
          Once(root) {
            if (filter) {
              root.append(`
                .filter-banner {
                  background-color: #f0f7ff;
                  border-left: 4px solid #3498db;
                  padding: 10px 15px;
                  margin-bottom: 20px;
                  border-radius: 0 4px 4px 0;
                }
                .filter-banner a {
                  font-weight: bold;
                }
              `)
            }
          }
        }
      ]
    }
  },
  // Use the filter plugin
  vite: {
    plugins: [
      filter ? filterPlugin(filter) : null
    ].filter(Boolean)
  }
})
