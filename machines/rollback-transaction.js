module.exports = {


  friendlyName: 'Rollback transaction',


  description: 'Abort and revert (i.e. "roll back") the database transaction that was begun on the specified active connection.',


  extendedDescription: 'The provided connection must already have a transaction begun on it.',


  inputs: {

    connection:
      require('../constants/connection.input'),

    meta:
      require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The transaction was successfully rolled back.',
      extendedDescription: 'Subsequent queries on this connection will no longer be transactional unless a new transaction is begun.',
      outputVariableName: 'report',
      outputDescription: 'The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        meta: '==='
      }
    },

    badConnection:
      require('../constants/badConnection.exit')

  }


};
