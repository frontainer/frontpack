'use strict';

const spawn = require('cross-spawn');

function update(dir,type) {
  return new Promise((resolve, reject) => {
    spawn('npm', ['version', type], {
      cwd: dir,
      stdio: 'inherit'
    }).on('exit', (code) => {
      if (code === 1) {
        return reject('update error');
      }
      resolve(dir);
    });
  });
}

module.exports = function(list,type) {
  console.log(`npm version ${type}`);
  let promises = list.map((name) => {
    return update(name, type);
  });
  // promises.push(update('.', type));
  return Promise.all(promises);
};