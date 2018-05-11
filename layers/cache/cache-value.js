module.exports = {


  friendlyName: 'Cache value',


  description: 'Cache a value using the specified key.',


  extendedDescription: 'If a `ttl` ("time-to-live") timeout is specified, the key will be deleted automatically after the specified number of seconds.',


  inputs: {

    connection: {
      friendlyName: 'Connection',
      description: 'An active connection.',
      extendedDescription: 'The provided connection instance must still be active.  Only connection instances created by the `getConnection()` machine in the same driver are supported.',
      example: '===',
      required: true
    },

    key: {
      friendlyName: 'Key',
      description: 'The unique key under which this value should be stored.',
      extendedDescription: 'The case-sensitivity and allowable characters in keys may vary between drivers.',
      required: true,
      example: 'myNamespace.foo.bar_baz'
    },

    value: {
      friendlyName: 'Value',
      description: 'The value to cache.',
      extendedDescription: 'Must be JSON-serializable-- that is, a string, number, boolean, dictionary, array, or `null`.  If a dictionary or array, must contain exclusively JSON-serializable contents.',
      required: true,
      example: '*'
    },

    ttl: {
      friendlyName: 'Time-to-live (TTL)',
      description: 'The number of seconds to store this value before automatically deleting it.',
      extendedDescription: 'For example, to keep the value cached for 24 hours, use `86400` (24 hours * 60 minutes * 60 seconds).  If `ttl` is left unspecified, the key will not be deleted automatically-- i.e. it will be cached _forever_.',
      example: 86400
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
      description: 'Value was successfully written.',
      outputFriendlyName: 'report',
      outputDescription: 'The `meta` property is reserved for custom driver-specific extensions.',
      outputExample: {
        meta: '==='
      }
    },

    badConnection: require('../../constants/badConnection.exit')

  }


};
