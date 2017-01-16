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
    ],
    performance: {
      hints: false
    }
  };
};