module.exports = {


  friendlyName: 'Send native query',


  description: 'Send a native query to the database.',


  inputs: {

    connection:
      require('../constants/connection.input'),

    nativeQuery: {
      description: 'A native query for the database.',
      extendedDescription: 'This is oftentimes compiled from Waterline query syntax using "Compile statement", however it could also originate from userland code.',
      example: '*',
      required: true
    },

    meta:
      require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The native query was executed successfully.',
      outputVariableName: 'report',
      outputDescription: 'The `result` property is the result data the database sent back.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        result: '*',
        meta: '==='
      }
    },

    badConnection:
      require('../constants/badConnection.exit'),

    notUnique: {
      friendlyName: 'Not unique',
      description: 'The provided query failed because it would violate one or more uniqueness constraints.',
      outputVariableName: 'report',
      outputDescription: 'The `columns` property is an array containing the names of columns with uniquness constraint violations. The `error` property is a JavaScript Error instance containing the raw error from the database.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        // For implementation help w/ building `columns` for a few particular adapters, see:
        //  • https://github.com/balderdashy/sails-mongo/blob/0656ff3471339b8bae299e6fd8b7b379f7a34c15/lib/utils.js#L182
        //  • https://github.com/balderdashy/sails-mysql/blob/2c414f1191c3595df2cea8e40259811eb3ca05f9/lib/adapter.js#L1223
        //  • https://github.com/balderdashy/sails-postgresql/blob/a51b3643777dcf1af5517acbf76e09612d36b301/lib/adapter.js#L1308
        columns: [ 'email_address' ],
        error: '===',
        meta: '==='
      }
    },

    unrecognizedTable: {
      friendlyName: 'Unrecognized table',
      description: 'The provided query failed because it mentions an unrecognized table.',
      example: {
        table: 'user_accounts',
        error: '===',
        meta: '==='
      }
    }

  }


};
