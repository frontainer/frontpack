'use strict';
module.exports = {
  readPackageJson() {
    let jsonPath = path.join(process.cwd(), 'package.json');
    try {
      if (fs.statSync(jsonPath).isFile()) {
        return require(jsonPath);
      }
    } catch (e) {
    }
    return require(path.join(__dirname, '../package.json'));
  },
  exists(path) {
    try {
      require.resolve(path);
    } catch(e) {
      return false;
    }
    return true;
  },
  require(...modules) {
    modules = modules.reduce(function(a, b) {
      return a.concat(b);
    });
    try {
      for (let i = 0, len = modules.length; i < len; i++) {
        try {
          let module = require(modules[i]);
          return module;
        } catch(e) {}
      }
    } catch(e) {
      throw new Error(e.stack);
    }
    throw new ReferenceError(modules);
  }
};