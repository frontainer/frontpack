'use strict';

const webpack = require('webpack');
module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
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
};