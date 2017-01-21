'use strict';

const fs = require('fs');
const path = require('path');
module.exports = function(dir) {
  return new Promise((resolve,reject) => {
    fs.readdir(dir, function(err, files){
      if (err) throw reject(err);
      const fileList = [];
      files.filter(function(file){
        return fs.statSync(path.join(dir,file)).isDirectory(); //絞り込み
      }).forEach(function (file) {
        fileList.push(path.join(dir,file));
      });
      resolve(fileList);
    });
  })
};