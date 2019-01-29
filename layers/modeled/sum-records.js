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
      extendedDecription: 'If the underlying database would normally return a non-numeric value like `null`, return `0` instead.',
      outputExample: 999.99
    },

  }


};
