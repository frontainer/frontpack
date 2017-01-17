# frontpack

webpack configuration helper and presets.

** This package is beta version **

# Usage

```
npm i --save-dev frontpack
```

webpack.config.js
```
'use strict';
const frontpack = require('frontpack'); // load frontpack

const fp = new frontpack({
  debug: false, // debug mode (default false)
  verbose: true // echo information (default true)
});

const config = fp
  .preset('standard')   // load from preset
  .config({ // your webpack config
    entry: {
      main: [
        './src/assets/js/main.js',
        './src/assets/css/style.scss'
      ]
    }
  }).option({
    copy: [],   // copy {from: '/path/from/file', to: '/path/to'}
    options: {  // loader options

    }
  }).export();  // export webpack config object!!
module.exports = config;
```

## preset

... todo

- standard: ['common','style','typescript','babel','html','server','copy','sprite','develop|production']
- dll: ['common','typescript','babel','dll']
- angular: ['common','style','typescript','babel','html','server','copy','develop|production','angular']

## partial

... todo

- angular
- babel
- common
- copy
- develop
- dll
- html
- production
- server
- sprite
- style
- typescript

## API

... todo

frontpack.preset

frontpack.config

frontpack.option

frontpack.export

frontpack.strategy

frontpack.removePlugin

frontpack.load

## Custom preset

... todo

## Custom partial

... todo

