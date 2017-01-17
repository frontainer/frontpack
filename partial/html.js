'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEFAULT_OPTIONS = {
  files: [
    {
      inject: true,
      filename: 'index.html',
      template: './src/index.ejs',
    }
  ],
  params: {
    isProduction: (process.env.NODE_ENV === 'production')
  }
};

module.exports = function(options = {}) {
  const op = Object.assign({
    params: {}
  },DEFAULT_OPTIONS,options);
  const plugins = op.files.map((file) => {
    return new HtmlWebpackPlugin(file);
  });
  plugins.push(new webpack.LoaderOptionsPlugin({
    options: {
      ejsHtml: {
        context: options.params
      }
    }
  }));

  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: 'html-loader'
        },
        {
          test: /\.ejs$/,
          exclude: /node_modules/,
          loaders: ['ejs-compiled-loader']
        }
      ]
    },
    plugins: plugins
  };
};