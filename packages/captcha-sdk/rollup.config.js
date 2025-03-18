// rollup.config.js
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import analyze from 'rollup-plugin-analyzer';

const isProduction = process.env.NODE_ENV === 'production';
const shouldAnalyze = process.argv.includes('--analyze');

const baseConfig = {
  input: 'src/index.ts',
  external: ['pixi.js'],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
    }),
    isProduction && terser(),
    shouldAnalyze && analyze({ summaryOnly: true })
  ]
};

export default [
  // ESM build
  defineConfig({
    ...baseConfig,
    output: {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    }
  }),
  // UMD build (for direct browser usage)
  defineConfig({
    ...baseConfig,
    output: {
      file: 'dist/gameshield.umd.js',
      format: 'umd',
      name: 'GameShield',
      sourcemap: true,
      globals: {
        'pixi.js': 'PIXI'
      }
    }
  }),
  // Types
  defineConfig({
    input: 'dist/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  })
];
