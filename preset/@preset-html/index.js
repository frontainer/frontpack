'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const DEFAULT_OPTIONS = {
  files: [
    {
      inject: true,
      filename: 'index.html',
      template: './src/index.ejs'
    }
  ],
  params: {},
  preload: {
    rel: 'prefetch',
    as: 'script',
    include: 'asyncChunks'
  }
};

module.exports = function (options = {}) {
  const op = webpackMerge({
    params: {}
  }, DEFAULT_OPTIONS, options);
  const plugins = op.files.map((file) => {
    file.isProduction = (process.env.NODE_ENV === 'production');
    file.params = webpackMerge({}, file.params, op.params);
    return new HtmlWebpackPlugin(file);
  });
  plugins.push(new PreloadWebpackPlugin(op.preload));
  plugins.push(new webpack.LoaderOptionsPlugin({
    options: {
      htmlLoader: {
        removeAttributeQuotes: false, // quote取ると:や/がattributeに使えなくなる
        caseSensitive: true // ngIfがngifにされてしまうので
      }
    }
  }));
  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.ejs$/,
          loader: 'ejs-compiled-loader'
        }
      ]
    },
    plugins: plugins
  };
};
