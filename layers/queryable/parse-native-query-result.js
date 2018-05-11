module.exports = {


  friendlyName: 'Parse native query result',


  description: 'Parse a raw result from a native query and normalize it for the specified query type.',


  cacheable: true,


  sync: true,


  inputs: {

    queryType: {
      description: 'The type of query operation this raw result came from.',
      extendedDescription:
        'Either "select", "insert", "delete", "update", "count", "sum", or "avg".  '+
        'This determines how the provided raw result will be parsed/coerced.',
      moreInfoUrl: 'https://github.com/node-machine/waterline-driver-interface#query-results',
      required: true,
      example: 'select',// (select|insert|delete|update|count|sum|avg)
    },

    nativeQueryResult: {
      description: 'The result data sent back from the the database as a result of a native query.',
      required: true,
      example: '==='
    },

    meta:
      require('../../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The result was successfully normalized.',
      extendedDescription: 'The normalized result (`result`) will be coerced to a JSON-serializable value if it isn\'t one already (see [rttc.dehydrate()](https://github.com/node-machine/rttc#dehydratevalue-allownullfalse-dontstringifyfunctionsfalse)). That means any Date instances therein will be converted to timezone-agnostic ISO timestamp strings (i.e. JSON timestamps).',
      outputVariableName: 'report',
      outputDescription: 'The `result` property is the normalized version of the raw result originally provided.   The `meta` property is reserved for custom driver-specific extensions.',
      outputExample: {
        result: '*',
        meta: '==='
      }
    },

  }


};
