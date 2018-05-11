module.exports = {


  friendlyName: 'Destroy cached values',


  description: 'Destroy the values stored under the specified keys.',


  inputs: {

    connection: {
      friendlyName: 'Connection',
      description: 'An active connection.',
      extendedDescription: 'The provided connection instance must still be active.  Only connection instances created by the `getConnection()` machine in the same driver are supported.',
      example: '===',
      required: true
    },

    keys: {
      friendlyName: 'Keys',
      description: 'An array of unique keys to delete.',
      extendedDescription: 'The case-sensitivity and allowable characters in keys may vary between drivers. '+
      'If keys are specified more than once, the duplicates will be ignored. And if the array of keys '+
      'is empty, then no keys will be deleted-- but this method will still exit successfully.',
      required: true,
      example: ['myNamespace.foo.bar_baz']
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
      description: 'The specified array of keys were deleted.',
      outputFriendlyName: 'report',
      outputDescription: 'The `meta` property is reserved for custom driver-specific extensions.',
      outputExample: {
        meta: '==='
      }
    },

    invalidKeys: {
      description: 'The specified array of keys contains one or more keys which are not valid for this cache.',
      extendedDescription: 'For example, the driver might reject certain reserved keys.  Or the underlying database might not permit certain keys to be used.',
      outputFriendlyName: 'report',
      outputDescription: 'The `meta` property is reserved for custom driver-specific extensions.',
      outputExample: {
        meta: '==='
      }
    },

    failed: {
      description: 'The cache encountered an error while attempting to destroy one or more of the specified keys.',
      outputFriendlyName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance explaining the exact error.  The `meta` property is reserved for custom driver-specific extensions.',
      outputExample: {
        error: '===',
        meta: '==='
      }
    },

    badConnection: require('../../constants/badConnection.exit')

  }


};
