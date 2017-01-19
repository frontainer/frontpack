'use strict';
const frontpack = require('frontpack');
const webpack = require('webpack');
const fp = new frontpack({
  debug: false
});

const config = fp
  .preset([
    'common',
    'style',
    'babel',
    'html',
    'copy',
    'sprite'
  ])
  .config({
    entry: {
      main: [
        './src/assets/js/main.js'
      ],
      style: [
        './src/assets/css/style.scss'
      ]
    }
  }).option({
    copy: [],
    options: {

    }
  }).export();
module.exports = config;