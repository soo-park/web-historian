var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers.js');
var index = archive.paths.siteAssets + '/index.html';

// require more modules/folders here!
exports.handleRequest = function (req, res) {

  if (req.url === '/') {
    if (req.method === 'GET') {
      statusCode = 200;
      http.headers['Content-Type'] = 'text/html';
      res.writeHead(statusCode, http.headers);

      var data = http.serveAssets(res, index, function(data) {
        res.end(data);
      });

    } else if (req.method === 'POST') {
      statusCode = 201;
      http.headers['Content-Type'] = 'text/html';
      res.writeHead(statusCode, http.headers);
      // here, define the place to go to      
      res.end(); // send me to the posted page archive

    } else {
      console.log('DELETE, OPTIONS, PUT not supported');
    }
  } else {
    statusCode = 404;
    res.writeHead(statusCode, http.headers);
    res.end('404: not found');
  }
};
