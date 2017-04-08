'use strict';
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(options = {}, extConfig = {}) {
  options.files = options.files || [];
  return {
    plugins: [
      new CopyWebpackPlugin(options.files)
    ]
  };
};