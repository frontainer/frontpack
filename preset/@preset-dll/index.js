'use strict';
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const DEFAULT_OPTIONS = {
  outputPath: 'public'
};
module.exports = function(options = {}, extConfig = {}) {
  const outputPath = (extConfig.output && extConfig.output.path) ? extConfig.output.path : 'public';
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  const config = {
    output: {
      path: path.join(process.cwd(), outputPath),
      publicPath: '/',
      filename: "assets/js/[name].js",
      jsonpFunction: 'fr',
      library: '[name]_library'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass', '.scss', '.ejs', '.html'],
      modules: [
        path.join(process.cwd(), 'src'),
        path.join(process.cwd(), 'node_modules')
      ]
    },
    plugins: [
      new webpack.DllPlugin({
        context: process.cwd(),
        path: '[name]-manifest.json',
        name: '[name]_library'
      })
    ],
    stats: 'minimal',
    performance: {
      hints: false
    }
  };
  return config;
};