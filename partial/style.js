'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEFAULT_OPTIONS = {
  sass: {
    sourceMap: true,
    importLoaders: true,
    localIdentName: '[name]-[local]-[hash:base64:5]',
    'import': true,
    url: true
  },
  file: {
    name : '[path][name].[ext]',
    context: './src'
  }
};
const autoprefixer = require('autoprefixer');

function objectToQuery(obj) {
  if(!obj) return {};
  return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

module.exports = function (options) {
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  let cssQuery = objectToQuery(options.sass);
  let fileQuery = objectToQuery(options.file);
  return {
    module: {
      rules: [
        {
          test: /\.s(c|a)ss$/,
          exclude: /(node_modules|\.component\.scss)/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              `css-loader?${cssQuery}`, // CSS Moduleの場合 &modules をつける
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(ttf|woff2?|eot|svg|gif|jpg|png)$/,
          loader: `file-loader?${fileQuery}`
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