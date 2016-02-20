/**
 * @module constants/connection.input.js
 * @constant
 */
module.exports = {
  friendlyName: 'Connection',
  description: 'An active database connection.',
  extendedDescription: 'The provided database connection instance must still be active.  Only database connection instances created by the `getConnection()` machine in this driver are supported.',
  example: '===',
  required: true
};
