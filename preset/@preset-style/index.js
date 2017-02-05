'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const queryString = require('query-string');
const autoprefixer = require('autoprefixer');
const DEFAULT_OPTIONS = {
  sass: {
    sourceMap: true,
    importLoaders: 1,
    localIdentName: '[name]-[local]-[hash:base64:5]',
    'import': true,
    url: true
  },
  file: {
    name: '[path][name].[ext]',
    context: './src'
  },
  stylelint: {
    quiet: true
  }
};

module.exports = function (options = {}) {
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  let cssQuery = queryString.stringify(options.sass);
  let fileQuery = queryString.stringify(options.file);
  const config = {
    module: {
      rules: [
        {
          test: /\.s(c|a)ss$/,
          exclude: /(node_modules|\.component\.scss)/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              `css-loader?${cssQuery}`, // CSS Moduleの場合 &modules をつける
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.component\.s(a|c)ss$/,
          loaders: [
            'raw-loader',
            'postcss-loader',
            'sass-loader'
          ]
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
          sassLoader: {
            sourceMap: true,
            includePaths: [
              path.join(process.cwd(), 'node_modules'),
              path.join(process.cwd(), './src/assets/css')
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
        allChunks: true
      })
    ]
  };
  if (options.stylelint) {
    config.plugins.push(new StyleLintPlugin(options.stylelint));
  }
  return config;
};