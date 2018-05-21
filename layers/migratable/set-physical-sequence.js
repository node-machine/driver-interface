module.exports = {


  friendlyName: 'Set physical sequence',


  description: 'Reset an auto-incrementing sequence to the specified value.',


  sideEffects: 'idempotent',


  inputs: {

    connection:
      require('../../constants/connection.input'),

    sequenceName: {
      description: 'The (physical layer) name of the auto-incrementing sequence.',
      example: 'user_id_seq',
      required: true
    },

    sequenceValue: {
      example: 1,
      required: true
    },

    meta:
      require('../../constants/meta.input'),

  },


  exits: {

    success: {
      description: 'The auto-incrementing sequence was successfully reset to the specified value.',
      extendedDescription: 'This means the next value in this auto-incrementing sequence will start from here.'
    },

    notFound: {
      description: 'Could not find a sequence with the specified name.'
    },

  },


};
