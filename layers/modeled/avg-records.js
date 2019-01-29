module.exports = {


  friendlyName: 'Avg (records)',


  description: 'Compute the average of the specified field over matching records.',


  sideEffects: 'cacheable',


  inputs: {
    query: require('../../constants/query.input'),
    connection: require('../../constants/connection.input'),
    dryOrm: require('../../constants/dry-orm.input'),
  },


  exits: {

    success: {
      outputFriendlyName: 'Average (mean)',
      outputDescription: 'The average value of the given property across all records.',
      extendedDecription: 'If the underlying database would normally return a non-numeric value like `null`, return `0` instead.',
      outputExample: -48.1293
    },

  }

};
