import { readFileSync } from 'fs';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
// import { terser } from "rollup-plugin-terser";
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

const copyright = readFileSync('./LICENSE', 'utf-8')
  .split(/\n/g)
  .filter((line) => /^Copyright\s+/.test(line))
  .map((line) => line.replace(/^Copyright\s+/, ''))
  .join(', ');

const preamble = `// ${pkg.homepage} v${pkg.version} Copyright ${copyright}`;

export default [
  // browser-friendly UMD build
  {
    input: 'src/browser.ts',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
    },
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }), // so Rollup can convert TypeScript to JavaScript
      resolve(), // so Rollup can find dependencies
      commonjs(), // so Rollup can convert dependencies to an ES module
      postcss({ extract: true }),
      // terser({ output: { preamble } }), // so Rollup can minify (done by default by most cdns)
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    external: [
      'highlight.js/lib/common',
      'htl',
      'katex',
      'lodash.keyby',
      'lodash.range',
      'marked',
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }), // so Rollup can convert TypeScript to JavaScript
    ],
    output: [
      { file: pkg.main, format: 'cjs', banner: preamble },
      { file: pkg.module, format: 'es', banner: preamble },
    ],
  },
  {
    input: 'src/presentation.ts',
    external: ['htl'],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    output: [
      { file: 'dist/lib/presentation.js', format: 'cjs', banner: preamble },
      { file: 'dist/es/presentation.js', format: 'es', banner: preamble },
    ],
  },
  {
    input: 'src/navigation.ts',
    external: ['lodash.keyby', 'lodash.range'],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    output: [
      { file: 'dist/lib/navigation.js', format: 'cjs', banner: preamble },
      { file: 'dist/es/navigation.js', format: 'es', banner: preamble },
    ],
  },
  {
    input: 'src/md.ts',
    external: ['marked', 'highlight.js/lib/common'],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    output: [
      { file: 'dist/lib/md.js', format: 'cjs', banner: preamble },
      { file: 'dist/es/md.js', format: 'es', banner: preamble },
    ],
  },
  {
    input: 'src/html.ts',
    external: ['htl'],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    output: [
      { file: 'dist/lib/html.js', format: 'cjs', banner: preamble },
      { file: 'dist/es/html.js', format: 'es', banner: preamble },
    ],
  },
  {
    input: 'src/svg.ts',
    external: ['htl'],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    output: [
      { file: 'dist/lib/svg.js', format: 'cjs', banner: preamble },
      { file: 'dist/es/svg.js', format: 'es', banner: preamble },
    ],
  },
  {
    input: 'src/tex.ts',
    external: ['katex'],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    output: [
      { file: 'dist/lib/tex.js', format: 'cjs', banner: preamble },
      { file: 'dist/es/tex.js', format: 'es', banner: preamble },
    ],
  },
  {
    // path to your declaration files root
    input: './dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
