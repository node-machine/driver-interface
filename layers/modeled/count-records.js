module.exports = {


  friendlyName: 'Count (records)',


  description: 'Return the count of the records matched by the query.',


  sideEffects: 'cacheable',


  inputs: {
    query: require('../../constants/query.input'),
    connection: require('../../constants/connection.input'),
    dryOrm: require('../../constants/dry-orm.input'),
  },


  exits: {

    success: {
      outputFriendlyName: 'Total (# of records)',
      outputDescription: 'The number of matching records.',
      outputExample: 59
    },

  },


};
