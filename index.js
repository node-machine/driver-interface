/**
 * Module dependencies
 */

var path = require('path');
// var _ = require('@sailshq/lodash');
// var Machine = require('machine');
var includeAll = require('include-all');


// /**
//  * Module constants
//  */

// // Build up a constant array of unconventional method names
// // (used below to show a warning if a machine identity looks too similar to native JS or Node stuff.)
// var UNCONVENTIONAL_METHOD_NAMES = [
//   'inspect', 'toString', 'valueOf', 'toLocaleString',
//   'prototype', 'constructor',
//   'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable'
// ];




var inventory = includeAll({
  dirname: path.resolve(__dirname, 'layers/'),
  filter: /(.+)\.js/,
  exclude: [
    /^index.js$/
  ],
  flatten: true
});

module.exports = inventory;


// var PackedModules = _.reduce(inventory, function (memo, rawNMDef, key) {

//   // Come up with an identity for debugging purposes.
//   rawNMDef.identity = _.kebabCase(key);


//   // Determine the method name.
//   var methodName = Machine.getMethodName(rawNMDef.identity);
//   if (_.contains(UNCONVENTIONAL_METHOD_NAMES, methodName)) {
//     console.warn('Warning: Machine "'+rawNMDef.identity+'" has an unconventional identity that, when converted to a method name (`'+methodName+'`), could conflict with native features of JavaScript/Node.js.  Please consider changing it!');
//   }

//   if (rawNMDef.fn) {
//     console.warn('Warning: Machine "'+rawNMDef.identity+'" has a `fn` -- but machines in an abstract interface pack shouldn\'t have those!  Please remove the `fn`.');
//   }
//   rawNMDef.fn = function(inputs, exits) { return exits.error(new Error('Not implemented')); };

//   memo[methodName] = Machine.build(rawNMDef);
//   return memo;
// }, {});


// module.exports = PackedModules;
