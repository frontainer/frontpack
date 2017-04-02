'use strict';
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const NgcWebpack = require('ngc-webpack');
const USE_AOT = (process.env.NODE_ENV === 'production');
const DEFAULT_OPTIONS = {
  lint: true,
  tslint: {
    emitErrors: true,
    failOnHint: true
  },
  genDir: 'src/aot-compiled',
  ngc: {
    tsConfig: process.cwd() + '/tsconfig.json'
  }
};
module.exports = function(options) {
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  const config = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loaders: [
            'awesome-typescript-loader?useWebpackText',
            'angular2-template-loader',
            `angular-router-loader?aot=${USE_AOT}&genDir=${options.genDir}`
          ]
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          tslint: options.tslint
        }
      }),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        process.cwd()
      ),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        process.cwd()
      )
    ]
  };
  if (USE_AOT) {
    config.plugins.push(
      new NgcWebpack.NgcWebpackPlugin(options.ngc)
    );
  }
  if (options.lint) {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'tslint-loader',
      enforce: 'pre'
    });
  }
  return config;
};
