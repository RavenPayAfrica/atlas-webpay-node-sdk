/* eslint-disable comma-dangle */
import { resolve } from 'path'
import sourceMaps from 'rollup-plugin-sourcemaps'
import pluginNodeResolve, { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import pluginCommonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'
import pluginTypescript from '@rollup/plugin-typescript'
import { getIfUtils, removeEmpty } from 'webpack-config-utils'

import pkg from '../package.json'
const {
  pascalCase,
  normalizePackageName,
  getOutputFileName,
} = require('./helpers')

/**
 * @typedef {import('./types').RollupConfig} Config
 */
/**
 * @typedef {import('./types').RollupPlugin} Plugin
 */

const env = process.env.NODE_ENV || 'development'
const { ifProduction } = getIfUtils(env)

const LIB_NAME = pascalCase(normalizePackageName(pkg.name))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')
const author = pkg.author
const inputFileName = 'src/index.ts'
const banner = `
  /**
   * @license
   * author: ${author}
   * ${LIB_NAME}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`

/**
 * Object literals are open-ended for js checking, so we need to be explicit
 * We can use the rollup typescript plugin for rollup
 * @type {{entry:{esm5: string, esm2015: string},bundles:string}}
 */
const PATHS = {
  entry: resolve(ROOT, '/src/index.js'),
  bundles: resolve(DIST),
}

/**
 * @type {string[]}
 */
const external = Object.keys(pkg.peerDependencies) || []

/**
 *  @type {Plugin[]}
 */
const plugins = /** @type {Plugin[]} */ ([
  // Allow json resolution
  json(),

  // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
  // commonjs(),

  // Allow node_modules resolution, so you can use 'external' to control
  // which external modules to include in the bundle
  // https://github.com/rollup/rollup-plugin-node-resolve#usage
  nodeResolve(),

  // Resolve source maps to the original source
  sourceMaps({
    typescript: true,
  }),

  // properly set process.env.NODE_ENV within `./environment.ts`
  replace({
    exclude: 'node_modules/**',
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
])

/**
 * @type {Config}
 */
const CommonConfig = {
  input: {},
  output: {},
  // inlineDynamicImports: true,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external,
}

// console.log(resolve(PATHS.bundles, 'index.js'))

/**
 * @type {Config}
 */
export default [
  // UMD
  {
    ...CommonConfig,
    input: inputFileName,
    output: [
      {
        file: getOutputFileName(resolve(PATHS.bundles, 'index.js')),
        format: 'iife',
        name: LIB_NAME,
        esModule: false,
        sourcemap: true,
        banner,
      },
      {
        name: LIB_NAME,
        file: getOutputFileName(
          resolve(PATHS.bundles, 'index.js'),
          ifProduction()
        ),
        format: 'iife',
        sourcemap: true,
        banner,
        plugins: removeEmpty(
          /** @type {Plugin[]} */ ([...plugins, ifProduction(terser())])
        ),
      },
    ],
    plugins: [
      pluginTypescript({
        sourceMap: false,
      }),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      babel({
        babelHelpers: 'bundled',
        configFile: resolve(__dirname, '../.babelrc.js'),
      }),
      nodeResolve({
        browser: true,
      }),
    ],
  },

  // ESM
  {
    input: inputFileName,
    output: [
      {
        file: getOutputFileName(resolve(PATHS.bundles, pkg.module)),
        format: 'es',
        sourcemap: true,
        banner,
        exports: 'named',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginTypescript({
        sourceMap: false,
      }),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      babel({
        babelHelpers: 'bundled',
        configFile: resolve(__dirname, '../.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },

  // CommonJS
  {
    input: inputFileName,
    output: [
      {
        file: getOutputFileName(resolve(PATHS.bundles, pkg.main)),
        format: 'cjs',
        sourcemap: false,
        banner,
        exports: 'default',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginTypescript({
        sourceMap: false,
      }),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      babel({
        babelHelpers: 'bundled',
        configFile: resolve(__dirname, '../.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },
]
