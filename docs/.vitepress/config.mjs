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
  title: "🎮 GameShield 🛡️",
  description: "Generative Game CAPTCHA - Prevent bots with interactive games",
  ignoreDeadLinks: true,
  themeConfig: {
    siteTitle: '🎮 GameShield 🛡️',
    logo: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/ComputelessComputer/gameshield' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is GameShield?', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'How it Works', link: '/guide/how-it-works' },
            { text: 'Architecture', link: '/guide/architecture' },
            { 
              text: 'Game Types', 
              link: '/guide/game-types',
              collapsed: false,
              items: [
                { text: '🏓 Pong', link: '/guide/games/pong' },
                { text: '🐍 Snake', link: '/guide/games/snake' },
                { text: '🧱 Breakout', link: '/guide/games/breakout' },
                { text: '🦖 Dino Run', link: '/guide/games/dino-run' }
              ]
            },
            { text: 'Security Features', link: '/guide/security-features' }
          ]
        },
        {
          text: 'Packages',
          items: [
            { text: '@gameshield/core', link: '/guide/packages/core' },
            { text: '@gameshield/react', link: '/guide/packages/react' },
            { text: '@gameshield/server', link: '/guide/packages/server' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Customization', link: '/guide/customization' },
            { text: 'Integration Examples', link: '/guide/integration-examples' },
            { text: 'Behavior Analysis', link: '/guide/behavior-analysis' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Core Package',
          items: [
            { text: 'Overview', link: '/api/core/' },
            { text: 'Game Factory', link: '/api/core/game-factory' },
            { text: 'Token Management', link: '/api/core/token' },
            { text: 'Behavior Analyzer', link: '/api/core/behavior-analyzer' }
          ]
        },
        {
          text: 'React Package',
          items: [
            { text: 'Overview', link: '/api/react/' },
            { text: 'GameShield Component', link: '/api/react/game-shield' },
            { text: 'Hooks', link: '/api/react/hooks' },
            { text: 'Theming', link: '/api/react/theming' }
          ]
        },
        {
          text: 'Server Package',
          items: [
            { text: 'Overview', link: '/api/server/' },
            { text: 'Verification API', link: '/api/server/verification' },
            { text: 'Security Utilities', link: '/api/server/security' },
            { text: 'Configuration', link: '/api/server/configuration' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ComputelessComputer/gameshield' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2025 GameShield'
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
