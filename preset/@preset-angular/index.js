'use strict';
const webpack = require('webpack');
const queryString = require('query-string');
const webpackMerge = require('webpack-merge');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const DEFAULT_OPTIONS = {
  lint: true,
  ts: {},
  tsConfig: {},
  tslint: {
    emitErrors: true,
    failOnHint: true
  },
  aot: {
    tsConfigPath: './tsconfig.json',
    mainPath: './src/main.ts'
  }
};
module.exports = function(options = {}, extConfig = {}) {
  const USE_AOT = (process.env.NODE_ENV === 'production');
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  const config = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loaders: USE_AOT ? ['@ngtools/webpack'] : [
              `awesome-typescript-loader?${queryString.stringify(options.ts)}`,
              'angular2-template-loader',
              `angular-router-loader`
            ]
        }
      ]
    },
    plugins: [
      new TsConfigPathsPlugin(options.tsConfig),
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
      new AotPlugin(options.aot)
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
