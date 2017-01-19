'use strict';
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const DEFAULT_OPTIONS = {
  clean: {
    path: ['public'],
    options: {
      root: process.cwd(),
    }
  },
  uglify: {
    compress: {
      warnings: false
    },
    comments: false,
    sourceMap: true
  },
  browserSync: {
    server: {
      baseDir: ['public']
    }
  }
};
module.exports = function (options = {}) {
  const env = process.env.NODE_ENV || 'development';
  options = webpackMerge({}, DEFAULT_OPTIONS, options);
  const config = {
    devtool: '#source-map',
    output: {
      path: path.join(process.cwd(), 'public'),
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
    stats: 'minimal',
    watchOptions: {
      ignored: /node_modules/
    },
    performance: {
      hints: false
    },
    devServer: {
      publicPath: '/',
      contentBase: path.join(process.cwd(),'public'),
      hot: (env !== 'production'),
      open: true,
      historyApiFallback: false, // SPA作るときはtrueに
      stats: 'minimal'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin("main"),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env)
        }
      })
    ]
  };

  if (env === 'production') { // for production
    config.plugins.push(
      new CleanWebpackPlugin(options.clean.path, options.clean.options),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin(options.uglify)
    );
  } else {  // for development
    try {
      config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      );
      let manifest = require.resolve(path.join(process.cwd(), 'vendor-manifest.json'));
      config.plugins.push(new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: path.join(process.cwd(), 'vendor-manifest.json')
      }));
    } catch (e) {
    }
  }
  return config;
};