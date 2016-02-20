module.exports = {


  friendlyName: 'Parse native query error',


  description: 'Attempt to identify and parse a raw error from sending a native query and normalize it to a standard error footprint.',


  cacheable: true,


  sync: true,


  inputs: {

    queryType: {
      description: 'The type of query operation this raw error came from.',
      extendedDescription: 'Either "select", "insert", "delete", or "update".  This determines how the provided raw error will be parsed/coerced.',
      moreInfoUrl: 'https://github.com/particlebanana/waterline-query-builder/blob/master/docs/syntax.md',
      required: true,
      example: 'select',// (select|insert|delete|update)
    },

    nativeQueryError: {
      description: 'The error sent back from the database as a result of a native query.',
      extendedDescription: 'This is referring to e.g. the output (`err`) returned through the `error` exit of `sendNativeQuery()` in this driver.',
      required: true,
      example: '==='
    },

    meta:
      require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The normalization is complete.  If the error cannot be normalized into any other more specific footprint, then the catchall footprint will be returned.',
      extendedDescription: 'The footprint (`footprint`) will be coerced to a JSON-serializable dictionary if it isn\'t one already (see [rttc.dehydrate()](https://github.com/node-machine/rttc#dehydratevalue-allownullfalse-dontstringifyfunctionsfalse)). That means any Error instances therein will be converted to stacktrace strings.',
      outputVariableName: 'report',
      outputDescription: 'The `footprint` property is the normalized "footprint" representing the provided raw error.  Conforms to one of a handful of standardized footprint types expected by the Waterline driver interface.   The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        footprint: {},
        meta: '==='
      }
    },

  }


};
