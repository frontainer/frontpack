'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DEFAULT_OPTIONS = {
  clean: {
    path: ['public'],
    options: {
      root: process.cwd(),
    }
  },
  uglify: {
    compress: {
      warnings: false
    },
    comments: false,
    sourceMap: true
  }
};
module.exports = function(options) {
  options = webpackMerge({},DEFAULT_OPTIONS,options);
  return {
    plugins: [
      new CleanWebpackPlugin(options.clean.path,options.clean.options),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin(options.uglify)
    ]
  }
};