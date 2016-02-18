module.exports = {


  friendlyName: 'Send native query',


  description: 'Send a native query to the database.',


  inputs: {

    connection:
      require('../constants/connection.input'),

    nativeQuery: {
      description: 'A native query for the database.',
      extendedDescription: 'The provided native query will be coerced to a JSON-serializable value if it isn\'t one already (see [rttc.dehydrate()](https://github.com/node-machine/rttc#dehydratevalue-allownullfalse-dontstringifyfunctionsfalse)). That means any provided Date instances will be converted to timezone-agnostic ISO timestamp strings (i.e. JSON timestamps).',
      whereToGet: {
        description: 'Write a native query for this database, or if this driver supports it, use `compileStatement()` to build a native query from Waterline syntax.',
        extendedDescription: 'This is oftentimes compiled from Waterline query syntax using "Compile statement", however it could also originate from userland code.'
      },
      example: '*',
      required: true
    },

    meta:
      require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The native query was executed successfully.',
      extendedDescription: 'The `result` returned will be coerced to a JSON-serializable value if it isn\'t one already (see [rttc.dehydrate()](https://github.com/node-machine/rttc#dehydratevalue-allownullfalse-dontstringifyfunctionsfalse)). That means any Date instances therein will be converted to timezone-agnostic ISO timestamp strings (i.e. JSON timestamps).',
      outputVariableName: 'report',
      outputDescription: 'The `result` property is the result data the database sent back.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        result: '*',
        meta: '==='
      }
    },

    badConnection:
      require('../constants/badConnection.exit')

  }


};
