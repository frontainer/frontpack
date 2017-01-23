'use strict';
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback');
const DEFAULT_OPTIONS = {
  server: {
    host: 'localhost',
    port: 3000,
    server: {
      baseDir: 'public',
      middleware: []
    },
    watchOptions: {
      ignoreInitial: true,
      ignored: '*.map'
    },
    files: [
      '!**/*.map',
      'public/**/*'
    ]
  },
  historyApiFallback: false,
  file: {
    log: false
  }
};
module.exports = function(options = {}) {
  options = webpackMerge({},DEFAULT_OPTIONS,options);
  if (options.historyApiFallback) {
    if (typeof options.server === 'string') {
      options.server = {
        baseDir: options.server,
        middleware: []
      };
    }
    options.server.middleware = options.server.middleware || [];
    options.server.middleware.push(historyApiFallback());
  }
  if (options.server.proxy) {
    delete options.server.server;
  }
  return {
    plugins: [
      new BrowserSyncPlugin(options.server,{reload: false})
    ]
  };
};