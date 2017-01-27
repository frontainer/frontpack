'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const DEFAULT_OPTIONS = {
  lint: true
};
module.exports = function(options = {}) {
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  const config = {
    module: {
      rules: [
        {
          test: /\.ts/,
          loader: 'awesome-typescript-loader?useWebpackText&useBabel&useCache&silent'
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          tslint: {
            emitErrors: true,
            failOnHint: true
          }
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