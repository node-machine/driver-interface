module.exports = {


  friendlyName: 'Send native query',


  description: 'Send a native query to the database.',


  inputs: {

    nativeQuery: {
      description: 'A native query for the database.',
      extendedDescription: 'If `valuesToEscape` is provided, this supports template syntax like `$1`, `$2`, etc.',
      whereToGet: {
        description: 'Write a native query for this database, or if this driver supports it, use `compileStatement()` to build a native query from Waterline syntax.',
        extendedDescription: 'This might be compiled from a Waterline statement (stage 4 query) using "Compile statement", however it could also originate directly from userland code.'
      },
      example: 'SELECT * FROM pets WHERE species=$1 AND nickname=$2',
      required: true
    },

    valuesToEscape: {
      description: 'An optional list of strings, numbers, or special literals (true, false, or null) to escape and include in the native query, in order.',
      extendedDescription: 'The first value in the list will be used to replace `$1`, the second value to replace `$2`, and so on.  Note that numbers, `true`, `false`, and `null` are interpreted _differently_ than if they were strings wrapped in quotes.  This array must never contain any arrays or dictionaries.',
      example: [ '*' ],
      defaultsTo: []
    },
    
    connection:
      require('../../constants/connection.input'),

    meta:
      require('../../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The native query was executed successfully.',
      outputVariableName: 'report',
      outputDescription: 'The `result` property is the result data the database sent back.  The `meta` property is reserved for custom driver-specific extensions.',
      outputExample: {
        result: '===',
        meta: '==='
      }
    },

    queryFailed: {
      description: 'The database returned an error when attempting to execute the native query.',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance with more details about what went wrong.  The `meta` property is reserved for custom driver-specific extensions.',
      outputExample: {
        error: '===',
        meta: '==='
      }
    },

    badConnection:
      require('../../constants/badConnection.exit')

  }


};
