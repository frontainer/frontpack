'use strict';
const frontpack = require('frontpack');

const fp = new frontpack();
const config = fp
  .preset([
    'common',
    'typescript',
    'dll'
  ])
  .config({
    entry: {
      vendor: ['./src/vendor']
    }
  }).option({
    babel: {
      lint: false
    },
    typescript: {
      lint: false
    },
  }).export();
module.exports = config;