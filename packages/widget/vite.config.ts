import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/gameshield-widget.ts',
      name: 'GameShieldWidget',
      fileName: 'gameshield-widget',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
    minify: 'esbuild',
    target: 'es2020',
  },
  server: {
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['vitepress'],
  },
});
