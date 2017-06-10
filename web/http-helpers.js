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

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  var fileLoc = path.resolve(asset);
  fileLoc = path.join(fileLoc, res.url);

  fs.readFile(fileLoc, function(err, data) {
    if (err) {
      res.writeHead(404, 'Not Found');
      res.write('404: File Not Found!');
      return res.end();
    }

    res.statusCode = 200;

    res.write(data);
    return res.end();
  });
};



// As you progress, keep thinking about what helper functions you can put here!