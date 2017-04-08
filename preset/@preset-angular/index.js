'use strict';
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const USE_AOT = (process.env.NODE_ENV === 'production');
const DEFAULT_OPTIONS = {
  lint: true,
  tslint: {
    emitErrors: true,
    failOnHint: true
  },
  aot: {
    tsConfigPath: './tsconfig.json',
    mainPath: './src/main.ts'
  }
};
module.exports = function(options) {
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  const config = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loaders: USE_AOT ? ['@ngtools/webpack'] : [
              'awesome-typescript-loader?useWebpackText',
              'angular2-template-loader',
              `angular-router-loader`
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
