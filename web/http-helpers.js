var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

// give the asset
exports.serveAssets = function(res, asset, callback) {
 // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  var data = fs.readFile(asset, 'utf8', function(err, data) {
    if (err) {
      console.log('fs.readFile failed :(\n', err);
    } else {
      callback(data);
    }
  });
  // archive.isUrlArchived(asset, function(result) {
  //   // if result
  //     // serve the existing asset
  //   // else
  //     // change current page to loading
  //     // archive.downlaodUrls
};


// parse the asset
exports.makeFile = function(asset, callback) {
  exports.getUrlData(url, content => {
    //fs.writeFile to location in archive/sites/urlname
    fs.writeFile(url, content, err => {
      if (err) {
        throw err;
      }
      // do something!!! asset has to be the URL coming in from the response
      exports.serveAssets(asset, callback); // do not delete
      console.log(exports.paths.archivedSites, urls);
    });
  }); 
};
