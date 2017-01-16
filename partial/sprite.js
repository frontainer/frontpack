'use strict';

const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = function (options = []) {
  const plugins = options.map((sprite) => {
    return new SpritesmithPlugin(sprite);
  });
  return {
    plugins: plugins
  };
};