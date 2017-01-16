'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const autoprefixer = require('autoprefixer');

module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.s(c|a)ss$/,
          exclude: /(node_modules|\.component\.scss)/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              'css-loader?sourceMap&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]', // CSS Moduleの場合 &modules をつける
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