// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import moduleFederationConfig from './module-federation.config.js';

const isDev = process.env.NODE_ENV === 'development';
const MFE_DEV_PORT = Number(process.env.MFE_DEV_PORT) || 3002;

export default defineConfig({
  entry: {
    main: './src/main.jsx',
  },
  target: ['browserslist:last 2 versions, > 0.2%, not dead, Firefox ESR'],
  output: {
    uniqueName: 'mfe2',
    publicPath: isDev ? `http://localhost:${MFE_DEV_PORT}/` : 'auto',
  },
  devServer: {
    port: MFE_DEV_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['...', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.css$/,
        type: 'css/auto',
      },
      {
        test: /\.(?:js|jsx|mjs|cjs)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            /** @type {import('@rspack/core').SwcLoaderOptions} */
            options: {
              detectSyntax: 'auto',
              jsc: {
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(moduleFederationConfig),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    isDev && new ReactRefreshRspackPlugin(),
  ],
});
