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

      var data = fs.readFile(index, 'utf8', function(err, data) {
        if (err) {
          console.log('fs.readFile failed :(\n', err);
        } else {
          res.end(data);
        }
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

    // if that request address is in our list       // get the 
    // isUrlInList(req.url, function() { console.log('yea'); });
    //   decorate res such that it leads to index.html
    // else if ( req.url in archivedPaths)
    //   go to our archived index.html that represents to url requested  
    // else
    //   change to loading.html while
    //   we go to the address and archive the page