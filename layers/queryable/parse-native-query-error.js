module.exports = {


  friendlyName: 'Parse native query error',


  description: 'Attempt to identify and parse a raw error from sending a native query and normalize it to a standard error footprint.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    nativeQueryError: {
      description: 'The error sent back from the database as a result of a native query.',
      extendedDescription: 'This is referring to the raw error; i.e. the `error` property of the output report returned through the `queryFailed` exit of `sendNativeQuery()` in this driver.',
      required: true,
      example: '==='
    },

    meta:
      require('../../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The normalization is complete.  If the error cannot be normalized into any other more specific footprint, then the catchall footprint will be returned.',
      extendedDescription: 'The footprint (`footprint`) will be coerced to a JSON-serializable dictionary if it isn\'t one already (see [rttc.dehydrate()](https://github.com/node-machine/rttc#dehydratevalue-allownullfalse-dontstringifyfunctionsfalse)). That means any Error instances therein will be converted to stacktrace strings.',
      outputVariableName: 'report',
      outputDescription: 'The `footprint` property is the normalized "footprint" representing the provided raw error.  Conforms to one of a handful of standardized footprint types expected by the Waterline driver interface.   The `meta` property is reserved for custom driver-specific extensions.',
      outputExample: {
        footprint: {},
        meta: '==='
      }
    },

  }


};
