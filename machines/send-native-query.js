module.exports = {


  friendlyName: 'Send native query',


  description: 'Send a native query to the database.',


  inputs: {

    connection:
      require('../constants/connection.input'),

    nativeQuery: {
      description: 'A native query for the database.',
      extendedDescription: 'This is oftentimes compiled from Waterline query syntax using "Compile statement", however it could also originate from userland code.',
      example: '*',
      required: true
    },

    meta:
      require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The native query was executed successfully.',
      outputVariableName: 'report',
      outputDescription: 'The `result` property is the result data the database sent back.  The `meta` property is reserved for custom adapter-specific extensions.',
      example: {
        result: '*',
        meta: '==='
      }
    }

  }


};
