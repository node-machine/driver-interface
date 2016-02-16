module.exports = {


  friendlyName: 'Compile statement',


  description: 'Compile a Waterline statement to a native query for the database.',


  cacheable: true,


  sync: true,


  inputs: {

    statement: {
      description: 'A Waterline statement.',
      moreInfoUrl: 'https://github.com/mikermcneil/waterline-query-builder/blob/master/docs/syntax.md',
      example: {},
      required: true
    },

    meta:
      require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The provided Waterline statement was compiled successfully.',
      outputVariableName: 'report',
      outputDescription: 'The `nativeQuery` property is the compiled native query for the database.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        nativeQuery: '===',
        meta: '==='
      }
    },

    malformed: {
      description: 'The provided Waterline statement could not be compiled due to malformed syntax.',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript error instance explaining that (or preferably even _why_) the Waterline syntax is not valid.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    },

    notSupported: {
      description: 'The provided Waterline statement could not be compiled because it is not supported by this adapter.',
      extendedDescription: 'If even one clause of the Waterline statement is not supported by the adapter, the compilation of the entire statement _always fails_.',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript error instance explaining that (or preferably even _why_) the Waterline statement is not supported.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    }

  }


};
