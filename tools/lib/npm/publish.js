'use strict';

const spawn = require('cross-spawn');

function publish(dir) {
  return new Promise((resolve, reject) => {
    spawn('npm', ['publish','--access', 'public'], {
      cwd: dir,
      stdio: 'inherit'
    }).on('exit', (code) => {
      if (code === 1) {
        return reject('publish error');
      }
      resolve(dir);
    });
  });
}

module.exports = function(list,type) {
  let promises = list.map((name) => {
    return publish(name);
  });
  promises.push(publish('.', type));
  return Promise.all(promises);
};