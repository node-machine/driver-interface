module.exports = {


  friendlyName: 'Destroy manager',


  description: 'Destroy the specified connection manager and all of its active connections.',


  extendedDescription: 'This may involve destroying a pool and its connections, destroying multiple pools and their connections, doing nothing at all (if this manager just does ad-hoc connections), or something even more exotic.  The implementation is left up to the driver.',


  inputs: {

    manager: {
      friendlyName: 'Manager',
      description: 'The connection manager instance to destroy.',
      extendedDescription: 'Only managers built using the `createManager()` method of this driver are supported.  Also, the database connection manager instance provided must not have been destroyed--i.e. once `destroyManager()` is called on a manager, it cannot be destroyed again (also note that all existing connections become inactive).',
      example: '===',
      required: true
    },

    meta:
      require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The specified manager and all of its active connections were successfully destroyed.',
      outputVariableName: 'report',
      outputDescription: 'The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        meta: '==='
      }
    },

    badManager: {
      friendlyName: 'Bad manager',
      description: 'The provided connection manager is no longer active; or possibly never was.',
      extendedDescription:
        'Usually, this means the manager has already been destroyed.  But depending on the driver '+
        'it could also mean that database cannot be accessed.  In production, this can mean that the database '+
        'server(s) became overwhelemed or were shut off while some business logic was in progress.',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance with more information and a stack trace.  The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    }

  }


};
