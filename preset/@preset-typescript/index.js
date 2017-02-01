'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const DEFAULT_OPTIONS = {

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
    }
  };
  return config;
};