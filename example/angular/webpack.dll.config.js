'use strict';
const frontpack = require('frontpack');

const fp = new frontpack();
const config = fp
  .preset([
    'common',
    'angular',
    'dll'
  ])
  .config({
    entry: {
      vendor: ['./src/vendor']
    }
  }).option({
    typescript: {
      lint: false
    },
  }).export();
module.exports = config;