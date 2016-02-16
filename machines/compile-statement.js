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
      variableName: 'malformed',
      description: 'The provided Waterline statement could not be compiled due to malformed syntax.'
    }

  }


};
