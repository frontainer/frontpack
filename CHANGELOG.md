<a name="3.0.0-beta.1"></a>
# [3.0.0-beta.1](https://github.com/frontainer/frontpack/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2017-04-25)


### new

* @preset-common contextをデフォルトでsrcに指定 ([46d6619e1bc998c7c096ac7df83ef01bbcce318a](https://github.com/frontainer/frontpack/commit/46d6619e1bc998c7c096ac7df83ef01bbcce318a))



<a name="3.0.0-beta.0"></a>
# [3.0.0-beta.0](https://github.com/frontainer/frontpack/compare/v2.0.0...v3.0.0-beta.0) (2017-04-25)


### breaking

* @preset-html webpackConfig.contextを参照するように ([ee33f761a741bcdb48a6dc3410493d32a6e91a38](https://github.com/frontainer/frontpack/commit/ee33f761a741bcdb48a6dc3410493d32a6e91a38))
* @preset-style ファイル出力時のcontextはwebpackConfig.contextに統一 ([3561398348fb2ec3064f852d09a40aab6ef10456](https://github.com/frontainer/frontpack/commit/3561398348fb2ec3064f852d09a40aab6ef10456))

### new

* @preset-angular awesome-typescript-loaderのオプションを渡せるように ([ac2269090b8a3adb4a730b62730888ef491d9f88](https://github.com/frontainer/frontpack/commit/ac2269090b8a3adb4a730b62730888ef491d9f88))
* @preset-common environments/environmentを呼び出した場合にprocess.env.NODE_ENVを付与したもので振り分けされるように ([8be4f33b12ef1ad201c5be619831905a2b049990](https://github.com/frontainer/frontpack/commit/8be4f33b12ef1ad201c5be619831905a2b049990))
* @preset-style sass-loader,postcssのオプションを設定できるように ([593b061eae7e613c506f05a651e4b6ce69e6a35f](https://github.com/frontainer/frontpack/commit/593b061eae7e613c506f05a651e4b6ce69e6a35f))
* @preset-typescript awesome-typescript-loaderのオプションを変更できるように ([a983a555de58971e509ee5ca9cbb9f012b0165f4](https://github.com/frontainer/frontpack/commit/a983a555de58971e509ee5ca9cbb9f012b0165f4))
* webpackからenvの値をもらえるように & process.env.NODE_ENVにenvを反映させるように ([9f28b3326d1045fab6440b4d289b03593de8ee7f](https://github.com/frontainer/frontpack/commit/9f28b3326d1045fab6440b4d289b03593de8ee7f))

### update

* @preset-babel babel-loader to 7.0.0 ([3437cec0929532c74b19b9e1bc557ac394355476](https://github.com/frontainer/frontpack/commit/3437cec0929532c74b19b9e1bc557ac394355476))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/frontainer/frontpack/compare/v1.0.1...v2.0.0) (2017-04-08)


### breaking

* html.filesを指定してもデフォルトが残ってしまうので、指定がなければデフォルトを入れるよう変更 ([60e5dc8d9176a755efe375bcc29cc11d5c594356](https://github.com/frontainer/frontpack/commit/60e5dc8d9176a755efe375bcc29cc11d5c594356))
* option.outputPathを廃止してwebpackConfigのoutput.pathに統一 ([f97e9fc5cb5b74e7ff9c2e4bf794e2c6afba87b2](https://github.com/frontainer/frontpack/commit/f97e9fc5cb5b74e7ff9c2e4bf794e2c6afba87b2))

### new

* preset側でconfigで追加されたwebpackConfigを参照できるように ([d48dcd746002031052cb654ebf88f1c0c6b22ecf](https://github.com/frontainer/frontpack/commit/d48dcd746002031052cb654ebf88f1c0c6b22ecf))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/frontainer/frontpack/compare/v1.0.0...v1.0.1) (2017-04-08)


### fix

* peerDependencies frontpack version to 1.x ([bd7838955eb4bc6af77ca1121aea6675a7cbe8b0](https://github.com/frontainer/frontpack/commit/bd7838955eb4bc6af77ca1121aea6675a7cbe8b0))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/frontainer/frontpack/compare/v0.0.7...v1.0.0) (2017-04-08)


### breaking

* change aot build tool @ngtools/webpack from ngc-webpack ([593300097c322e34e0fc29ac07326d275d75b6e6](https://github.com/frontainer/frontpack/commit/593300097c322e34e0fc29ac07326d275d75b6e6))

### update

* @preset-babel babel-core to 6.24.1, babel-preset-es2015 to 6.24.1 ([bffbbf8d6ac2ed55606ae72957c21f343ff34844](https://github.com/frontainer/frontpack/commit/bffbbf8d6ac2ed55606ae72957c21f343ff34844))
* @preset-style stylelint to 7.10.1 ([2dc81c78aee0f40888ddbd1724814a06c06a3ee5](https://github.com/frontainer/frontpack/commit/2dc81c78aee0f40888ddbd1724814a06c06a3ee5))



<a name="0.0.7"></a>
## [0.0.7](https://github.com/frontainer/frontpack/compare/v0.0.6...v0.0.7) (2017-04-02)


### new

* avoid ng4 warning ([ac8f33686abd4db49f223a2a8a30d5a7005bea9e](https://github.com/frontainer/frontpack/commit/ac8f33686abd4db49f223a2a8a30d5a7005bea9e))

### update

* @preset-angular packages ([ebe816f3e1beb46004ef1c8095465a0fa082985f](https://github.com/frontainer/frontpack/commit/ebe816f3e1beb46004ef1c8095465a0fa082985f))
* @preset-babel packages ([4f4ec1ffc46e33d008df011dc1115372dda8e306](https://github.com/frontainer/frontpack/commit/4f4ec1ffc46e33d008df011dc1115372dda8e306))
* @preset-common packages ([c09ddbcf448ef66fd58a63499043ae28312f48e6](https://github.com/frontainer/frontpack/commit/c09ddbcf448ef66fd58a63499043ae28312f48e6))
* @preset-copy packages ([76ede8b27d474e701313ae4fe7b7535b89a4da8f](https://github.com/frontainer/frontpack/commit/76ede8b27d474e701313ae4fe7b7535b89a4da8f))
* @preset-html ejs-compiled-loader to 2.2.0 ([cfbc96884f58dbc520cd008f711379536cc62d05](https://github.com/frontainer/frontpack/commit/cfbc96884f58dbc520cd008f711379536cc62d05))
* @preset-html packages ([8f037d381197516da349a03883b338a9d4fabb25](https://github.com/frontainer/frontpack/commit/8f037d381197516da349a03883b338a9d4fabb25))
* @preset-server packages ([a0983f2569762a6e9c46b568d1e9ba710567a8b9](https://github.com/frontainer/frontpack/commit/a0983f2569762a6e9c46b568d1e9ba710567a8b9))
* @preset-sprite packages ([4f1256a3cc2515e1625bd3715d2163dce868cea7](https://github.com/frontainer/frontpack/commit/4f1256a3cc2515e1625bd3715d2163dce868cea7))
* @preset-style packages ([f454e3148b58c328a980ed50ee3eacf23603c5fe](https://github.com/frontainer/frontpack/commit/f454e3148b58c328a980ed50ee3eacf23603c5fe))
* @preset-typescript packages ([dbcf84fff817b14df13a6751085ec43b52ca99b7](https://github.com/frontainer/frontpack/commit/dbcf84fff817b14df13a6751085ec43b52ca99b7))
* frontpack packages ([719e5bc02966043e26cd54ad6dc001e114f37f11](https://github.com/frontainer/frontpack/commit/719e5bc02966043e26cd54ad6dc001e114f37f11))



<a name="0.0.6"></a>
## [0.0.6](https://github.com/frontainer/frontpack/compare/v0.0.5...v0.0.6) (2017-03-02)


### fix

* @preset-html syntax error ([0fdba9b3d553ba39a9d9db1268fa417f428abecd](https://github.com/frontainer/frontpack/commit/0fdba9b3d553ba39a9d9db1268fa417f428abecd))
* @preset-html webpack参照漏れ ([294922eb2b03f7298e9b1c98e6089cedac336212](https://github.com/frontainer/frontpack/commit/294922eb2b03f7298e9b1c98e6089cedac336212))



<a name="0.0.5"></a>
## [0.0.5](https://github.com/frontainer/frontpack/compare/v0.0.4...v0.0.5) (2017-03-02)


### fix

* ExtractTextPluginのオプションをconfigで設定できるように ([79fca87af7efd386ca33e9d5d772608dabf03d41](https://github.com/frontainer/frontpack/commit/79fca87af7efd386ca33e9d5d772608dabf03d41))
* html-loaderのminifyで影響が大きいremoveAttributeQuotesとcaseSensitiveをデフォルトで無効化 ([e67ffb163cc5fa8d55aa6b057d667af4dd1f17e2](https://github.com/frontainer/frontpack/commit/e67ffb163cc5fa8d55aa6b057d667af4dd1f17e2))
* presets install commands ([f38e2b90f1e43f5dd5399d4b663883e2a152c57a](https://github.com/frontainer/frontpack/commit/f38e2b90f1e43f5dd5399d4b663883e2a152c57a))

### update

* @preset-angular packages ([25c6bafa2d9cbb12ccc3ab0524e579b2daf35886](https://github.com/frontainer/frontpack/commit/25c6bafa2d9cbb12ccc3ab0524e579b2daf35886))
* @preset-babel packages ([e051c4b352301e1033dfa8b618e6a3d5d3c83b76](https://github.com/frontainer/frontpack/commit/e051c4b352301e1033dfa8b618e6a3d5d3c83b76))
* @preset-copy packages ([32c0f46e78803e863416ffe6e2efb68dbefc2d08](https://github.com/frontainer/frontpack/commit/32c0f46e78803e863416ffe6e2efb68dbefc2d08))
* @preset-html packages ([3814039f04a33c644d294b6e27d9ef9ec927dc25](https://github.com/frontainer/frontpack/commit/3814039f04a33c644d294b6e27d9ef9ec927dc25))
* @preset-server packages ([f55f2b844a1a1894cbbb68654506567234427ef7](https://github.com/frontainer/frontpack/commit/f55f2b844a1a1894cbbb68654506567234427ef7))
* @preset-sprite packages ([609ad363a5c3e04501e596fa8ea62f532d1aba9a](https://github.com/frontainer/frontpack/commit/609ad363a5c3e04501e596fa8ea62f532d1aba9a))
* @preset-style packages ([3dc7276b8bc88d01c90d1bf05430707ceb130d8a](https://github.com/frontainer/frontpack/commit/3dc7276b8bc88d01c90d1bf05430707ceb130d8a))
* @preset-typescript packages ([ac19be7f8abb893ebf2b858c0ca872b46a62fd71](https://github.com/frontainer/frontpack/commit/ac19be7f8abb893ebf2b858c0ca872b46a62fd71))
* core packages ([e8343c57a103f603269919738b381b50bea230a5](https://github.com/frontainer/frontpack/commit/e8343c57a103f603269919738b381b50bea230a5))



<a name="0.0.4"></a>
## [0.0.4](https://github.com/frontainer/frontpack/compare/v0.0.3...v0.0.4) (2017-02-22)


### fix

* node_modules内と.cssファイルが参照できない ([fd854afb7a14ad286e358562bbd133494f8ae969](https://github.com/frontainer/frontpack/commit/fd854afb7a14ad286e358562bbd133494f8ae969))
* node_modules内のHTML/EJSが参照できない ([d6607cc79901b15f9a1471496ea0d0b9cd4dd205](https://github.com/frontainer/frontpack/commit/d6607cc79901b15f9a1471496ea0d0b9cd4dd205))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/frontainer/frontpack/compare/v0.0.2...v0.0.3) (2017-02-21)


### fix

* angular2-template-loader@0.6.2で一部表現が正しく変換されないため0.6.1へ ([44597ff80c433313ae98c87bbbd50b7d5d0c4bf3](https://github.com/frontainer/frontpack/commit/44597ff80c433313ae98c87bbbd50b7d5d0c4bf3))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/frontainer/frontpack/compare/v0.0.1...v0.0.2) (2017-02-19)




<a name="0.0.1"></a>
## 0.0.1 (2017-02-19)




