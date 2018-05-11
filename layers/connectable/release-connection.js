module.exports = {


  friendlyName: 'Release connection',


  description: 'Release an active database connection.',


  extendedDescription: 'Depending on the implementation of this driver, this might release the connection back into the pool or close it entirely.  Regardless, if the provided connection has a transaction started, be sure to end the transaction by either committing it or rolling it back before releasing the connection.',


  inputs: {

    connection:
      require('../../constants/connection.input'),

    meta:
      require('../../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The connection was released and is no longer active.',
      extendedDescription: 'The provided connection may no longer be used for any subsequent queries.'
    },

    badConnection:
      require('../../constants/badConnection.exit')

  }


};
