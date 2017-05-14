'use strict';
const queryString = require('query-string');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const DEFAULT_OPTIONS = {
  lint: true,
  ts: {},
  tsConfig: {},
  tslint: {
    emitErrors: true,
    failOnHint: false,
    typeCheck: false,
    fix: false
  }
};
module.exports = function(options = {}, extConfig = {}) {
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  const config = {
    module: {
      rules: [
        {
          test: /\.ts/,
          loader: `awesome-typescript-loader?${queryString.stringify(options.ts)}`
        }
      ]
    },
    plugins: [
      new TsConfigPathsPlugin(options.tsConfig),
      new webpack.LoaderOptionsPlugin({
        options: {
          tslint: options.tslint
        }
      })
    ]
  };
  if (options.lint) {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'tslint-loader',
      enforce: 'pre'
    });
  }
  return config;
};
