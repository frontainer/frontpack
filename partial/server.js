'use strict';

const path = require('path');
const webpack = require('webpack');
module.exports = function() {
  return {
    devServer: {
      publicPath: '/',
      contentBase: path.join(process.cwd(),'public'),
      hot: (process.env.NODE_ENV !== 'production'),
      open: true,
      historyApiFallback: false, // SPA作るときはtrueに
      stats: 'minimal'
    }
  };
};