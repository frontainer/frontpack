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
    this._presetOption = {};
    this._option = {};
  }

  _generatePresetPath(preset) {
    return [
      path.join(`@frontpack/frontpack-preset-${preset}`),
      path.join(`frontpack-preset-${preset}`),
      path.join(`${preset}`)
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
    const merge = webpackMerge.strategy(this._strategy);
    const extConfig = this._config.reduce((prev,conf) => {
      return merge(prev, conf);
    }, {});

    // 重複指定を削除
    this._preset = this._arrayUnique(this._preset);

    // プリセットの設定を取り込む
    this._preset.forEach((preset) => {
      config = merge(config,util.require(this._generatePresetPath(preset))(this._option[preset], extConfig));
    });

    // 外部からのconfigをマージ
    config = merge(config, extConfig)


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