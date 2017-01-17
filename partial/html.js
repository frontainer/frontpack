'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEFAULT_OPTIONS = {
  files: [
    {
      inject: true,
      filename: 'index.html',
      template: './src/index.ejs'
    }
  ],
  params: {}
};

module.exports = function(options = {}) {
  const op = webpackMerge({
    params: {}
  },DEFAULT_OPTIONS,options);
  const plugins = op.files.map((file) => {
    file.isProduction = (process.env.NODE_ENV === 'production')
    file.params = webpackMerge({}, file.params,op.params);
    return new HtmlWebpackPlugin(file);
  });

  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: 'html-loader'
        },
        {
          test: /\.ejs$/,
          exclude: /node_modules/,
          loader: 'ejs-compiled-loader'
        }
      ]
    },
    plugins: plugins
  };
};