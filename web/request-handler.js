var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers.js');
var publicRoot = archive.paths.siteAssets + '/';

// require more modules/folders here!
exports.handleRequest = function (req, res) {

  if (req.url === '/') {
    if (req.method === 'GET') {
      statusCode = 200;
      http.headers['Content-Type'] = 'text/html';
      res.writeHead(statusCode, http.headers);

      http.serveAssets(res, publicRoot + 'index.html', function(data) {
        res.end(data);
      });
    } else if (req.method === 'POST') {
      statusCode = 201;
      http.headers['Content-Type'] = 'text/html';
      res.writeHead(statusCode, http.headers);
      // if it is in archive (already existing function of archive.isUrlArchived)
        // as callback: serve the asset (already http.serveAssets(req.url, res)
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
