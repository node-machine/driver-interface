module.exports = {


  friendlyName: 'Flush cache',


  description: 'Flushes the cache, removing all data from it.',


  cacheable: true,


  inputs: {

    connection: {
      friendlyName: 'Connection',
      description: 'An active connection.',
      extendedDescription: 'The provided connection instance must still be active.  Only connection instances created by the `getConnection()` machine in the same driver are supported.',
      example: '===',
      required: true
    },

    meta: {
      friendlyName: 'Meta (custom)',
      description: 'Additional metadata to pass to the driver.',
      extendedDescription: 'This input is not currently in use, but is reserved for driver-specific customizations in the future.',
      example: '==='
    }

  },


  exits: {

    success: {
      description: 'Cache was successfully flushed.',
      outputVariableName: 'report',
      outputDescription: 'The `value` property is true when the cache was successfully flushed.  The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        value: true,
        meta: '==='
      }
    },

    badConnection: require('../constants/badConnection.exit')

  }


};
