'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = (env = 'safe', argv = {}) => {
  const {mode = process.env.NODE_ENV || 'production'} = argv;

  return {
    name: 'trial',
    mode,
    entry: {
      trial: [path.resolve('src/foo.ts'), path.resolve('src/bar.ts')],
    },
    output: {
      path: path.resolve('tmp'),
      pathinfo: false,
      filename: '[name].main.[contenthash].js',
      libraryTarget: 'amd',
    },
    resolve: {
      symlinks: false,
      modules: [path.resolve('node_modules'), 'node_modules'],
      extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          oneOf: [
            {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    envName: mode,
                    configFile: true,
                    cacheDirectory: true,
                    cacheCompression: false,
                  },
                },
                {
                  loader: 'ts-loader',
                  options: {
                    onlyCompileBundledFiles: true,
                  },
                },
              ].filter(Boolean),
            },
            {
              test: /\.(mjs|js|jsx)$/,
              include: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    envName: mode,
                    configFile: true,
                    cacheDirectory: true,
                    cacheCompression: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    plugins: [new webpack.HashedModuleIdsPlugin()],
    optimization: {
      splitChunks: false,
      runtimeChunk: false,
    },
    performance: {
      hints: false,
    },
    devtool: 'none',
    stats: 'normal',
  };
};
