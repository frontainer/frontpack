'use strict';

const path = require('path');
const webpack = require('webpack');
module.exports = function() {
  let config = {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
  try {
    let manifest = require.resolve(path.join(process.cwd(),'vendor-manifest.json'));
    config.plugins.push(new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: path.join(process.cwd(),'vendor-manifest.json')
    }));
  } catch (e) {}
  return config;
};