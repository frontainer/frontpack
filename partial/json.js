'use strict';

// npm i -D json-loader

module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.json$/,
          exclude: /node_modules/,
          loader: 'json-loader'
        }
      ]
    }
  };
};