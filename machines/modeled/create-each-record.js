module.exports = {


  friendlyName: 'Create each (record)',


  description: 'Insert multiple records into a collection in the database.',


  inputs: {
    query: require('../../constants/query.input'),
    connection: require('../../constants/connection.input'),
    dryOrm: require('../../constants/dry-orm.input'),
  },


  exits: {

    success: {
      outputFriendlyName: 'Records (maybe)',
      outputDescription: 'Either `null` or (if `fetch:true`) an array of new physical records that were created.',
      outputExample: '==='
    },

    notUnique: require('../../constants/not-unique.exit'),

  },


};
