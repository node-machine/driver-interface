module.exports = {


  friendlyName: 'Parse native query result',


  description: 'Parse and normalize a raw result from the database (i.e. that was obtained by sending a native query).',


  cacheable: true,


  sync: true,


  inputs: {

    statement: { /* todo */ },
    // -OR-
    // operationType: 'select',// insert/delete/update/etc

    nativeQueryResult: { /* todo */ },

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits) {
    return exits.success();
  },



};
