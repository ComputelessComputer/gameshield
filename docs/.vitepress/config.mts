import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'GameShield',
  description: 'Tetris-based CAPTCHA for the modern web',
  ignoreDeadLinks: [/localhost/],
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      {
        text: 'GitHub',
        link: 'https://github.com/ComputelessComputer/gameshield',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },
        {
          text: 'Integration',
          items: [
            { text: 'Widget', link: '/guide/widget' },
            { text: 'Server Verification', link: '/guide/server-verification' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ComputelessComputer/gameshield' },
    ],
    footer: {
      message: 'Released under the MIT License.',
    },
  },
});
