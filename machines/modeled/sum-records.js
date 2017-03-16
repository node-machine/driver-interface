module.exports = {


  friendlyName: 'Sum (records)',


  description: 'Return the cumulative sum (∑) of a particular property over matching records.',


  sideEffects: 'cacheable',


  inputs: {
    query: require('../../constants/query.input'),
    connection: require('../../constants/connection.input'),
    dryOrm: require('../../constants/dry-orm.input'),
  },


  exits: {

    success: {
      outputFriendlyName: 'Total (sum)',
      outputDescription: 'The sum of the given property across all matching records.',
      outputExample: 999.99
    },

  }


};
