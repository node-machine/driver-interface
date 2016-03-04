module.exports = {


  friendlyName: 'Get connection',


  description: 'Get an active connection to the database.',


  extendedDescription: 'This may involve opening a new connection, or aquiring an already-open connection from an existing pool.  The implementation is left up to the driver.',


  inputs: {

    manager: {
      friendlyName: 'Manager',
      description: 'The connection manager instance to acquire the connection from.',
      extendedDescription: 'Only managers built using the `createManager()` method of this driver are supported.  Also, the database connection manager instance provided must not have been destroyed--i.e. once `destroyManager()` is called on a manager, no more connections can be acquired from it (also note that all existing connections become inactive-- see `destroyManager()` for more on that).',
      example: '===',
      required: true
    },

    meta:
      require('../constants/meta.input')

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

    badManager: {
      friendlyName: 'Bad manager',
      description: 'Could not acquire a connection to the database because the provided connection manager is no longer active; or possibly never was.',
      extendedDescription:
        'Usually, this means the manager has already been destroyed.  But depending on the driver '+
        'it could also mean that database cannot be accessed.  In production, this can mean that the database '+
        'server(s) became overwhelemed or were shut off while some business logic was in progress.'+
        '\n'+
        'Note that the underlying interpretation of this exit varies depending on the driver\'s implementation. '+
        'It also might depend on any database-specific metadata within the provided connection manager.  For example, '+
        'a driver might allow a few different types of connection managers to be created.  In some cases, the connection manager '+
        'communicates with the database when it is created, but in others, it does not communicate with the database until '+
        'a connection is actually acquired w/ `getConnection()`. The latter case is a prime example of when this exit '+
        'would be called. Finally, as hinted at above, it also might be called if the pool encapsulated within the provided '+
        'connection manager is no longer active (e.g. because it has already been destroyed).',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance with more information and a stack trace.  The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    }

  }


};
