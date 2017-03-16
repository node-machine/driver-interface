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
      outputExample: -48.1293
    },

  }

};
