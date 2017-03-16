module.exports = {


  friendlyName: 'Create (record)',


  description: 'Create a new physical record in the database.',


  inputs: {
    query: require('../../constants/query.input'),
    connection: require('../../constants/connection.input'),
    dryOrm: require('../../constants/dry-orm.input'),
  },


  exits: {

    success: {
      outputFriendlyName: 'Record (maybe)',
      outputDescription: 'Either `null` or (if `fetch:true`) a dictionary representing the new record that was created.',
      outputExample: '==='
    },

    notUnique: require('../../constants/not-unique.exit'),

  },

};
