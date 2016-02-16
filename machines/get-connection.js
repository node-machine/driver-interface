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
    }

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

    invalidConnection: {
      description: 'The connection string was incorrect or a client could not connect.'
    }

  }


};
