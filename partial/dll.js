'use strict';

const webpack = require('webpack');
module.exports = function() {
  return {
    plugins: [
      new webpack.DllPlugin({
        context: process.cwd(),
        path: '[name]-manifest.json',
        name: '[name]_library'
      }),
      new webpack.BannerPlugin({
        banner: 'console.warn("This script is development version.");',
        raw: true,
        entryOnly: true
      })
    ],
    performance: {
      hints: false
    }
  };
};