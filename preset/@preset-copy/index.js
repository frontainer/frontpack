'use strict';
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(options = {}) {
  options.files = options.files || [];
  return {
    plugins: [
      new CopyWebpackPlugin(options.files)
    ]
  };
};