/**
 * Module dependencies
 */

var path = require('path');
var includeAll = require('include-all');


var inventory = includeAll({
  dirname: path.resolve(__dirname, 'layers/'),
  filter: /(.+)\.js/,
  exclude: [
    /^index.js$/
  ],
  flatten: true
});

module.exports = inventory;
