'use strict';
const frontpack = require('frontpack');

const fp = new frontpack();
const config = fp
  .preset('dll')
  .load(['angular'])
  .config({
    entry: {
      vendor: ['./src/vendor']
    }
  }).export();
module.exports = config;