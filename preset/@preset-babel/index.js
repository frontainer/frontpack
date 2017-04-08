'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const DEFAULT_OPTIONS = {
  lint: true
};
module.exports = function(options = {}, extConfig = {}) {
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  const config = {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            failOnError: true
          }
        }
      })
    ]
  };
  if (options.lint) {
    config.module.rules.push({
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      enforce: 'pre'
    });
  }
  return config;
};