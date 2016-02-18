module.exports = {


  friendlyName: 'Parse native query error',


  description: 'Attempt to identify and normalize a raw error from the database (i.e. that was obtained by sending a native query).',


  cacheable: true,


  sync: true,


  inputs: {

    statement: { /* todo */ },
    // -OR-
    // operationType: 'select',// insert/delete/update/etc

    nativeQueryError: { /* todo */ },

  },


  exits: {

    success: {
      outputVariableName: 'report',
      example: {
        problem: 'notUnique',
        columns: [],
        error: '===',
        meta: '==='
      }
    },

  },


  fn: function(inputs, exits) {
    //
    // TODO
    //
    return exits.success({
      // TODO
    });
  },



};
