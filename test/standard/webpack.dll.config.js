'use strict';
const frontpack = require('frontpack');

const fp = new frontpack();
const config = fp
  .preset([
    'common',
    'babel',
    'dll'
  ])
  .config({
    entry: {
      vendor: ['./src/assets/js/vendor']
    }
  }).export();
module.exports = config;