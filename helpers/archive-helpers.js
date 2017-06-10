var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  
  fs.readFile(exports.paths.list, 'utf8', function (err, urls) {
    if (err) {
      callback(err, urls);
      console.log('fs.readFile failed :(\n', err);
    } else {
      urls = urls.split('\n');
      console.log('fs.readFile successfully completed :)\n', urls);
      callback(urls);
    }
  });

};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function (urls) {
    urls.indexOf(url) === -1 ? callback(false) : callback(true);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, 'utf8', callback);
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    var result = false;
    for (let i = 0; i < files.length; i++) {
      if (files[i] === url) {
        result = true;
      }
    }
    callback(result);
  });
};

exports.downloadUrls = function(urls) {
  // exports.isUrlArchived();

};