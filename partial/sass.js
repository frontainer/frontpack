'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEFAULT_OPTIONS = {
  sourceMap: true,
  importLoaders: true,
  localIdentName: '[name]-[local]-[hash:base64:5]',
  'import': true,
  url: true
};
const autoprefixer = require('autoprefixer');

module.exports = function (options) {
  options = webpackMerge({}, DEFAULT_OPTIONS, options);

  let query = Object.keys(options).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`).join('&');
  return {
    module: {
      rules: [
        {
          test: /\.s(c|a)ss$/,
          exclude: /(node_modules|\.component\.scss)/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              `css-loader?${query}`, // CSS Moduleの場合 &modules をつける
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(ttf|woff2?|eot|svg|gif|jpg|png)$/,
          loader: 'file-loader?name=[path][name].[ext]&context=./src'
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          context: process.cwd(),
          sassLoader: {
            sourceMap: true,
            includePaths: [
              path.resolve(process.cwd(), 'node_modules'),
              path.resolve(process.cwd(), './src/assets/css'),
            ]
          },
          postcss: {
            sourceMap: true,
            plugins: [
              autoprefixer({
                browsers: ['> 3% in JP']
              })
            ]
          }
        }
      }),
      new ExtractTextPlugin({
        filename: 'assets/css/[name].css',
        allChunks: true,
        disable: process.env.NODE_ENV !== 'production'
      })
    ]
  };
};