'use strict';
const frontpack = require('frontpack');

const fp = new frontpack({
  debug: false
});

const config = fp
  .preset([
    'common',
    'style',
    'angular',
    'html',
    'copy',
    'server'
  ])
  .config({
    entry: {
      main: process.env.NODE_ENV === 'production' ? [
          './src/main-aot',
          './src/assets/css/style.scss'
        ] : [
          './src/main',
          './src/assets/css/style.scss'
        ]
    }
  }).option({
    server: {
      historyApiFallback: true
    },
    copy: [],
    options: {}
  }).export();
module.exports = config;