'use strict';
const frontpack = require('frontpack');

const fp = new frontpack({
  debug: false
});

const config = fp
  .preset('standard')
  .config({
    entry: {
      main: [
        './src/assets/js/main.js',
        './src/assets/css/style.scss'
      ]
    }
  }).option({
    copy: [],
    options: {

    }
  }).export();
module.exports = config;