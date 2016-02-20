/**
 * @module constants/badConnection.exit.js
 * @constant
 */
module.exports = {
  friendlyName: 'Unrecognized table',
  description: 'The provided query failed because it mentions an unrecognized table.',
  outputVariableName: 'report',
  outputDescription: 'The `table` property is the name of the unrecognized table.  The `error` property is a JavaScript Error instance containing the raw error from the database.  The `meta` property is reserved for custom driver-specific extensions.',
  example: {
    table: 'user_accounts',
    error: '===',
    meta: '==='
  }
};
