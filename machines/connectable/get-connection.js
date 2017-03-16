module.exports = {


  friendlyName: 'Get connection',


  description: 'Get an active connection to the database.',


  extendedDescription:
    'Depending on what driver this is, and the config of the specified connection manager, `getConnection()` '+
    'may involve opening a new connection, aquiring an already-open connection from an existing pool, or even '+
    'just returning a mock connection (e.g. a dictionary containing host/port/credentials-- for connection-less '+
    'database servers like ElasticSearch).',


  inputs: {

    manager: {
      friendlyName: 'Manager',
      description: 'The connection manager instance to acquire the connection from.',
      extendedDescription:
        'Only managers built using the `createManager()` method of this driver are supported. '+
        'Also, the database connection manager instance provided must not have been destroyed--'+
        'i.e. once `destroyManager()` is called on a manager, no more connections can be acquired '+
        'from it (also note that all existing connections become inactive-- see `destroyManager()` '+
        'for more on that).',
      example: '===',
      required: true
    },

    meta:
      require('../../constants/meta.input')

  },


  exits: {

    success: {
      description: 'A connection was successfully acquired.',
      extendedDescription: 'This connection should be eventually released, or its enclosing manager should be destroyed.  Otherwise, it may time out.  It is not a good idea to rely on database connections timing out-- be sure to release this connection (or destroy its manager) when finished with it!',
      outputVariableName: 'report',
      outputDescription: 'The `connection` property is an active connection to the database.  The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        connection: '===',
        meta: '==='
      }
    },

    failed: {
      friendlyName: 'Failed',
      description: 'Could not acquire a connection to the database via the provided connection manager.',
      extendedDescription:
        'If this exit is called, it might mean any of the following:\n'+
        ' + there is no database server running at manager\'s configured host (i.e. even if it is just that the database process needs to be started)\n'+
        ' + this Node.js process could not connect to the database server, perhaps because of firewall/proxy settings\n'+
        ' + the database server doesn\'t recognize the configured "database" in the manager\'s connection string\n'+
        ' + the credentials encoded in the manager\'s connection string are unrecognized or have insufficient access rights for this database\n'+
        ' + the manager is no longer active, e.g. because it has already been destroyed, timed out, or the db server went offline\n'+
        ' + any other miscellaneous connection error'+
        '\n'+
        'Advanced users should note that the underlying interpretation of this exit varies depending on three major '+
        'factors: (1) the implementation of the underlying database being supported, (2) the implementation of this driver, '+
        'and (3) any database-specific metadata within the provided connection manager (i.e. that was passed into the `meta` input '+
        'of `createManager()`.  For example, a driver might choose to allow a few different types of connection managers to be '+
        'created.  In some cases, the driver communicates with the db when the connection manager is created, but in others, it '+
        'waits until `getConnection()` is called. If an invalid connection string was supplied to `createManager()`, then in the '+
        'latter case, the manager would still be created successfully.  But when `getConnection()` was called it would fail, '+
        'triggering this exit.',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance with more information and a stack trace.  The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    }

  }


};
