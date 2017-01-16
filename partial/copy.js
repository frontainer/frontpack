'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(options = []) {
  return {
    plugins: [
      new CopyWebpackPlugin(options)
    ]
  };
};