'use strict';
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback');
const DEFAULT_OPTIONS = {
  browserSync: {
    server: {
      baseDir: 'public',
      middleware: []
    },
    watchOptions: {
      ignoreInitial: true,
      ignored: '*.map'
    },
    files: [
      '!**/*.map'
    ]
  },
  historyApiFallback: false,
  file: {
    log: false
  }
};
module.exports = function(options = {}, extConfig = {}) {
  const outputPath = (extConfig.output && extConfig.output.path) ? extConfig.output.path : 'public';
  options = webpackMerge({},DEFAULT_OPTIONS,options);
  options.browserSync.files.push(outputPath);

  if (options.historyApiFallback) {
    if (typeof options.browserSync.server === 'string') {
      options.browserSync.server = {
        baseDir: [options.browserSync.server],
        middleware: []
      };
    }
    options.browserSync.server.middleware = options.browserSync.server.middleware || [];
    options.browserSync.server.middleware.push(historyApiFallback());
  }
  if (options.browserSync.proxy) {
    delete options.browserSync.server;
  }
  return {
    plugins: [
      new BrowserSyncPlugin(options.browserSync,{reload: false})
    ]
  };
};