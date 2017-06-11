var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

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
  // make new file by the same title of the url in the sites folder
  urls.forEach(url => {
    if (!fs.existsSync(exports.paths.archivedSites + '/' + url)) {
      // We use fs.openSync to create the file
      var file = fs.openSync(exports.paths.archivedSites + '/' + url, 'w');
      fs.closeSync(file);
    }
    exports.getUrlData(url, body => {
      fs.writeFile(exports.paths.archivedSites + '/' + url, body, (err) => {
        if (err) {
          throw err;
        }
        console.log('The file has been saved!');
      });
    });
  });
};

// gets data from on particular url, and parse it, and send it to the callback
exports.getUrlData = function(url, callback) {
  var options = {
    host: url,
    path: '/index.html'
  };

  var req = http.get(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      // console.log('BODY: ' + body);
      // ...and/or process the entire body here.
      callback(body);
    });
  });
};