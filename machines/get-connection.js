module.exports = {


  friendlyName: 'Get connection',


  description: 'Get an active connection to the database.',


  extendedDescription: 'This may involve opening a new connection, or aquiring an already-open connection from an existing pool.  The implementation is left up to the adapter.',


  inputs: {

    connectionString: {
      description: 'A string containing all metadata and credentials necessary for connecting to the database.',
      extendedDescription: 'If the database does not explicitly support a connection string, then careful, step-by-step instructions for generating the appropriate connection string (such as stringifying a JSON dictionary) should be included in the `whereToGet` of this input definition.  Use `extendedDescription` and/or `moreInfoUrl` for explaining what the connection string means rather than focusing on how to generate it.',
      example: 'postgres://localhost:5432/thedatabase',
      required: true
    },

    meta:
      require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'A connection was successfully acquired.',
      extendedDescription: 'This connection should be eventually released.  Otherwise, it may time out.  It is not a good idea to rely on database connections timing out-- be sure to release this connection when finished with it!',
      outputVariableName: 'report',
      outputDescription: 'The `connection` property is an active connection to the database.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        connection: '===',
        meta: '==='
      }
    },

    malformed: {
      description: 'The provided connection string is malformed (the adapter DID NOT ATTEMPT to acquire a connection).',
      extendedDescription: 'The format of connection strings varies across different databases and their adapters.  This exit indicates that the provided string is not valid as per the custom rules of this adapter.',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance explaining that (and preferably "why") the provided connection string is invalid.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    },

    failedToConnect: {
      description: 'Could not acquire a connection to the database using the specified connection string.',
      extendedDescription: 'This might mean any of the following:\n'+
      ' + the credentials encoded in the connection string are incorrect\n'+
      ' + there is no database server running at the provided host (i.e. even if it is just that the database process needs to be started)\n'+
      ' + there is no software "database" with the specified name running on the server\n'+
      ' + the provided connection string does not have necessary access rights for the specified software "database"\n'+
      ' + this Node.js process could not connect to the database, perhaps because of firewall/proxy settings\n'+
      ' + any other miscellaneous connection error',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance explaining that a connection could not be made.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    }

  }


};
