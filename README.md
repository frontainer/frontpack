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
  .preset([
    'common',
    'babel',
    'style',
    'server',
    // './my-preset/my.js',
    // 'frontpack-external-preset'
  ])   // load from preset
  .config({ // your webpack config
    entry: {
      main: [
        './src/assets/js/main.js',
        './src/assets/css/style.scss'
      ]
    }
  }).option({   // preset options
    copy: [],   // copy {from: '/path/from/file', to: '/path/to'}
    options: {  // loader options

    }
  }).export();  // export webpack config object!!
module.exports = config;
```

## Preset

... todo

- @frontpack/@preset-angular
- @frontpack/@preset-babel
- @frontpack/@preset-common
- @frontpack/@preset-copy
- @frontpack/@preset-dll
- @frontpack/@preset-html
- @frontpack/@preset-server
- @frontpack/@preset-sprite
- @frontpack/@preset-style
- @frontpack/@preset-typescript

## Examples

## API

... todo

frontpack.preset

frontpack.config

frontpack.option

frontpack.export

frontpack.strategy

## Custom preset

... todo


## ToDo

- update documentation
- preset package
- add examples