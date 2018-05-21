module.exports = {


  friendlyName: 'Drop (physical model)',


  description: 'Completely drop & destroy any traces of a particular physical model (e.g. relational table or Mongo collection, etc).',


  sideEffects: 'idempotent',


  inputs: {

    connection:
      require('../../constants/connection.input'),

    tableName:
      require('../../constants/tableName.input'),

    meta:
      require('../../constants/meta.input'),

  },


  exits: {

    success: {
      description: 'If such a physical model exists, it was dropped successfully.'
    }

  },


};
