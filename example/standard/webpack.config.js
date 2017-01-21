'use strict';
const frontpack = require('frontpack');
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
    'sprite',
    'server'
  ])
  .config({
    entry: {
      main: [
        './src/assets/js/main.js',
        './src/assets/css/style.scss'
      ]
    },
    plugins: [
    ]
  }).option({
    copy: {
      files: [
        {
          from: 'src/assets/lib/**/*'
        }
      ]
    },
    options: {

    }
  }).export();
module.exports = config;