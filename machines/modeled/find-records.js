module.exports = {


  friendlyName: 'Find (records)',


  description: 'Find record(s) in the database.',


  sideEffects: 'cacheable',


  inputs: {
    query: require('../../constants/query.input'),
    connection: require('../../constants/connection.input'),
    dryOrm: require('../../constants/dry-orm.input'),
  },


  exits: {

    success: {
      outputFriendlyName: 'Records',
      outputDescription: 'An array of physical records.',
      outputExample: '===' //[ {===} ]
    },

  }


};
