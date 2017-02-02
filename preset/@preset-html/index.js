'use strict';

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