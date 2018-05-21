module.exports = {


  friendlyName: 'Define (physical model)',


  description: 'Define a physical model (e.g. relational table or Mongo collection, etc) with the specified characteristics, creating indexes as needed.',


  sideEffects: 'idempotent',


  inputs: {

    connection:
      require('../../constants/connection.input'),

    tableName:
      require('../../constants/tableName.input'),

    columns: {
      description: 'An array of column definitions.',
      required: true,
      type: [ {}, ],
      example: [
        {
          columnName: 'foo_bar',
          unique: true,
          columnType: 'VARCHAR(255)',
          autoIncrement: false,
        },
      ]
    },

    meta:
      require('../../constants/meta.input'),

  },


  exits: {

    success: {
      description: 'New physical model (and any necessary indexes) were created successfully.'
    }

  },


};
