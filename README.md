# frontpack

webpack configuration helper and presets.

__This package is beta version__

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
    'common',  // use @frontpack/preset-common
    'babel',   // use @frontpack/preset-babel
    'style',   // use @frontpack/preset-style
    'server',  // use @frontpack/preset-server
    // './my-preset/my.js',    // local config
    // 'frontpack-external-preset'  // external package
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
  }).export();  // export webpack config object
module.exports = config;
```

## Preset

### preset-common

基本設定をまとめたプリセット
 
```
npm i -D @frontpack/@preset-common
```

### preset-babel

babelを使うためのプリセット
 
```
npm i -D @frontpack/@preset-babel
```

### preset-typescript

typescriptを使うためのプリセット
 
```
npm i -D @frontpack/@preset-typescript
```

### preset-html

HTMLを生成するためのプリセット
 
```
npm i -D @frontpack/@preset-html
```

### preset-style

SASS/CSSをビルドして生成するためのプリセット
 
```
npm i -D @frontpack/@preset-style
```

### preset-sprite

複数の画像からスプライト画像とscssを生成するためのプリセット
 
```
npm i -D @frontpack/@preset-sprite
```

### preset-dll

簡単にDLLファイルを生成するためのプリセット

- 要 preset-common 

```
npm i -D @frontpack/@preset-dll
```

### preset-server

開発用サーバーを立ち上げるプリセット

- 要 preset-common 

```
npm i -D @frontpack/@preset-server
```

### preset-angular

- 要 preset-html 
- 要 preset-style 

angular(2.x)のためのプリセット
 
```
npm i -D @frontpack/@preset-angular
```

## Examples

## API

frontpack.preset

frontpack.config

frontpack.option

frontpack.export

frontpack.strategy

- document coming soon...

## Custom preset

- document coming soon...

## Examples

### frontpack-example-standard

Babelを使った汎用Web制作テンプレート
[frontpack-example-standard](https://github.com/frontainer/frontpack-example-standard) 

### frontpack-example-angular

angular(2.x)を使った開発のためのテンプレート
[frontpack-example-angular](https://github.com/frontainer/frontpack-example-angular) 

## ToDo

- update documentation
- unit testing
- preset-react
- preset-vue