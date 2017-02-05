'use strict';

const spawn = require('cross-spawn');

module.exports = function() {
  return new Promise((resolve, reject) => {
    spawn('npm',['whoami']).stdout.on('data', (d) => {
      if (d.toString() === 'frontpack\n') {
        return resolve()
      }
      return reject(`please login frontpack: logged in ${d.toString()}`);
    });
  });
};