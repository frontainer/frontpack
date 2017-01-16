'use strict';
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackOptionsMerge = require('webpack-loader-options-merge');
const chalk = require('chalk');
const util = require('./util');
const inspect = require('util').inspect;

const DEFAULT_OPTIONS = {
  verbose: true,
  debug: false
};

module.exports = class FrontPack {
  constructor(option) {
    this._packOption = Object.assign({},DEFAULT_OPTIONS,option);
    this._strategy = {};
    this._config = [];
    this._preset = [];
    this._partial = [];
    this._presetOption = {};
    this._removePlugin = [];
    this._option = {};
  }

  _generatePresetPath(preset) {
    return this._generatePath('preset', preset);
  }
  _generatePartialPath(partial) {
    return this._generatePath('partial', partial);
  }
  _generatePath(prefix,name) {
    return [
      path.join(process.cwd(), `${prefix}/${name}`),                             //  コマンド実行箇所のpreset内
      path.join(process.cwd(), `${prefix}/${prefix}-${name}`),                             //  コマンド実行箇所のpreset内
      path.join(process.cwd(), `node_modules/frontpack/frontplack-${name}`), // コマンド実行箇所のnode_modules/@frontpack内
      path.join(process.cwd(), `node_modules/frontpack/frontplack-${prefix}-${name}`), // コマンド実行箇所のnode_modules/@frontpack内
      path.join(process.cwd(), `node_modules/frontpack/${prefix}/${name}`), // コマンド実行箇所のnode_modules/@frontpack/frontpack/preset内
      path.join(process.cwd(), `node_modules/frontpack/${prefix}/${prefix}-${name}`), // コマンド実行箇所のnode_modules/@frontpack/frontpack/preset内
      path.join(process.cwd(), `node_modules/@frontpack/frontplack-${name}`), // コマンド実行箇所のnode_modules/@frontpack内
      path.join(process.cwd(), `node_modules/@frontpack/frontplack-${prefix}-${name}`), // コマンド実行箇所のnode_modules/@frontpack内
      path.join(process.cwd(), `node_modules/@frontpack/frontpack/${prefix}/${name}`), // コマンド実行箇所のnode_modules/@frontpack/frontpack/preset内
      path.join(process.cwd(), `node_modules/@frontpack/frontpack/${prefix}/${prefix}-${name}`), // コマンド実行箇所のnode_modules/@frontpack/frontpack/preset内
    ];
  }
  _arrayUnique(arr) {
    return arr.filter(function (name, i, self) {
      return self.indexOf(name) === i;
    });
  }

  config(...customConfig) {
    this._config = this._config.concat(customConfig);
    return this;
  }

  /**
   * presetからまとめて設定する
   * @param presets
   * @param presetOptions
   * @returns {FrontPack}
   */
  preset(presets, presetOptions) {
    this._preset = this._preset.concat(presets);
    this._presetOption = Object.assign(this._presetOption, presetOptions);
    return this;
  }
  /**
   * partialから個別に設定する
   * @param presets
   * @param presetOptions
   * @returns {FrontPack}
   */
  load(partials) {
    this._partial = this._partial.concat(partials);
    return this;
  }
  /**
   * pluginsから指定されたプラグインを取り除く
   * @param pluginNames
   * @returns {FrontPack}
   */
  removePlugin(pluginNames) {
    this._removePlugin = this._removePlugin.concat(pluginNames);
    return this;
  }

  /**
   * マージのルールを設定
   * @param strategy
   * @returns {FrontPack}
   */
  strategy(strategy) {
    this._strategy = strategy;
    return this;
  }

  /**
   * Loaderのオプションを設定
   * @param options
   * @returns {FrontPack}
   */
  option(options) {
    this._option = Object.assign(this._option, options);
    return this;
  }

  /**
   * webpack.configを生成して返却
   */
  export() {
    let config = {
      plugins: []
    };
    let merge = webpackMerge.strategy(this._strategy);

    // 重複指定を削除
    this._preset = this._arrayUnique(this._preset);
    // プリセットの設定を取り込む
    this._preset.forEach((preset) => {
      util.require(this._generatePresetPath(preset))(this);
    });

    // partialの重複（presetで追加されたものも含む）を削除
    this._partial = this._arrayUnique(this._partial);

    // 個別設定を取り込む
    this._partial.forEach((partial) => {
      let p = util.require(this._generatePartialPath(partial));
      config = merge(config, p(this._option[partial]));
    });

    // 外部からのconfigをマージする
    this._config.forEach((conf) => {
      config = merge(config, conf);
    });

    // 重複指定を削除
    this._removePlugin = this._arrayUnique(this._removePlugin);
    // 不要なプラグインを取り除く
    let len = config.plugins.length;
    while(len--) {
      let p =  config.plugins[len];
      if (this._removePlugin.indexOf(p.constructor.name) !== -1) {
        config.plugins.splice(len,1);
      }
    }
    // オプションの定義
    config.plugins.push(
      new webpack.LoaderOptionsPlugin(this._option)
    );

    if (this._packOption.verbose || this._packOption.debug) {
      console.log(chalk.green('- frontpack -'));
      if (this._preset.length > 0) {
        console.log(chalk.green(`preset:`), `[${this._preset.join(',')}]`);
      } else {
        console.log(chalk.green(`preset:`), `no set`);
      }
      if (this._partial.length > 0) {
        console.log(chalk.green(`partial:`), `[${this._partial.join(',')}]`);
      } else {
        console.log(chalk.green(`partial:`), `no set`);
      }
      if (this._removePlugin.length > 0) {
        console.log(chalk.yellow(`remove:`), `[${this._removePlugin.join(',')}]`);
      } else {
        console.log(chalk.yellow(`remove:`), `no set`);
      }
    }

    let result = webpackOptionsMerge(config);

    if (this._packOption.debug) {

      if (this._config.length > 0) {
        console.log(chalk.green(`config:`));
        this._config.forEach((c) => {
          console.log(inspect(c,false,null));
        });
      } else {
        console.log(chalk.green(`config:`), `no set`);
      }
      console.log(chalk.green(`------------------result-----------------`));
      console.log(inspect(result,false,null));
      console.log(chalk.green(`-----------------/result-----------------`));
    }
    return result;
  }
};