module.exports = {


  friendlyName: 'Update (records)',


  description: 'Update record(s) in the database based on a query criteria.',


  sideEffects: 'idempotent',


  inputs: {
    query: require('../../constants/query.input'),
    connection: require('../../constants/connection.input'),
    dryOrm: require('../../constants/dry-orm.input'),
  },


  exits: {

    success: {
      outputFriendlyName: 'Records (maybe)',
      outputDescription: 'Either `null` OR (if `fetch:true`) an array of physical records that were updated.',
      outputExample: '==='
    },

    notUnique: require('../../constants/not-unique.exit'),

  },


};
