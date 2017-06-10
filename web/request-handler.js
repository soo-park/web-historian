var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var archivedPaths = archive.paths.list;
  // console.log(http);
  if (req.url === '/') {
    // console.log(res.url);//= where our loading is?);
    //decorate res such that it leads to index.html
    // some kind of a function for callback 

    // what is asset= index.html
    var asset = fs.readFile('./web/public/index.html', function(err, res, data) {
      if (err) {
        throw err;
      } else {

        var message = '';
        res.on('data', function(data) {
          message += data;
        });
        
        res.on('end', function() {
          message.push(JSON.parse(message));
        });
        
        res.writeHead(200, http.headers);
        res.write(message);
        res.end();
      }
    });

    // http.serveAssets(res, asset, callback);
  // // if that request address is in our list
  // } else if ( req.url in archivedPaths) {
  //   // go to our archived index.html that represents to url requested
  
  // } else {
  //   // change to loading.html while
  //   // we go to the address and archive the page

  // }
  }
};