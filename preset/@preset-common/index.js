'use strict';
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const DEFAULT_OPTIONS = {
  outputPath: 'public',
  clean: {
    path: [],
    options: {
      root: process.cwd()
    }
  },
  uglify: {
    compress: {
      warnings: false
    },
    comments: false,
    sourceMap: true
  }
};
module.exports = function (options = {}) {
  const env = process.env.NODE_ENV || 'development';
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  const ignore = new RegExp(`node_modules|${options.outputPath}`);
  const config = {
    devtool: '#source-map',
    output: {
      path: path.join(process.cwd(), options.outputPath),
      publicPath: '/',
      filename: "assets/js/[name].js",
      jsonpFunction: 'fr',
      library: '[name]_library'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass', '.scss', '.ejs', '.html'],
      modules: [
        path.join(process.cwd(), 'src'),
        path.join(process.cwd(), 'node_modules')
      ]
    },
    stats: {
      assets: false,
      modules: false,
      children: false
    },
    watchOptions: {
      ignored: ignore
    },
    performance: {
      hints: false
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env)
        }
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: process.cwd(),
          output: {
            path: path.join(process.cwd(),options.outputPath)
          }
        }
      })
    ]
  };

  if (env === 'production') { // for production
    if (options.clean !== false) {
      if (options.clean.path.length === 0) {
        options.clean.path.push(options.outputPath);
      }
      config.plugins.push(new CleanWebpackPlugin(options.clean.path, options.clean.options));
    }
    config.plugins.push(
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin(options.uglify)
    );
  } else {  // for development
    try {
      let manifest = require.resolve(path.join(process.cwd(), 'vendor-manifest.json'));
      config.plugins.push(new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: path.join(process.cwd(), 'vendor-manifest.json')
      }));
    } catch (e) {
      console.log('Not found vendor-manifest.json');
    }
  }
  return config;
};