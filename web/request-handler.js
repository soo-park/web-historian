var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers.js');
var publicRoot = archive.paths.siteAssets + '/';

// require more modules/folders here!
exports.handleRequest = function (req, res) {

  if (req.url === '/') { // || req.url is there in archive) {
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

      // archive.isUrlArchived(req.url, function(result) {
      //   if (result) {
      //     http.serveAssets(res, req.url, function(data) {
      //       res.end(data);
      //     });
      //   } else {
      //     archive.downloadUrls(req.url, function(data) {
      //       http.serveAssets(res, req.url, function(data) {
      //         res.end(data);
      //       });
      //     });          
      //   }
      // });

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
