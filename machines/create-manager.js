module.exports = {


  friendlyName: 'Create manager',


  description: 'Build and initialize a connection manager instance for this database.',


  extendedDescription:
  'The `manager` instance returned by this method contains any configuration that is necessary '+
  'for communicating with the database and establishing connections (e.g. host, user, password) '+
  'as well as any other relevant metadata.  The manager will often also contain a reference '+
  'to some kind of native container (e.g. a connection pool). '+
  'Note that a manager instance does not necessarily need to correspond with a pool though--'+
  'it might simply be a container for storing config, or it might refer to multiple pools '+
  '(e.g. a ClusterPool from felixge\'s `mysql` package)',


  inputs: {

    connectionString: {
      description: 'A string containing the/ primary configuration/credentials necessary for connecting to the database (almost always a URI).',
      extendedDescription:
        'If the database does not explicitly support a connection string, then careful, '+
        'step-by-step instructions for generating the appropriate connection string (such '+
        'as stringifying a JSON dictionary or using a particular string in conjunction with'+
        'information in the `meta` input) should be included in the `whereToGet` of this '+
        'input definition.  Driver implementors should use `extendedDescription` and/or '+
        '`moreInfoUrl` for explaining what the connection string means rather than focusing '+
        'on how to generate it (use `whereToGet` for that).',
      example: 'postgres://localhost:5432/thedatabase',
      required: true
    },

    onUnexpectedFailure: {
      description: 'A function to call any time an unexpected error event is received from this manager or any of its connections.',
      extendedDescription:
        'This can be used for anything you like, whether that\'s sending an email to devops, '+
        'or something as simple as logging a warning to the console.\n'+
        '\n'+
        'For example:\n'+
        '```\n'+
        'onUnexpectedFailure: function (err) {\n'+
        '  console.warn(\'Unexpected failure in database manager:\',err);\n'+
        '}\n'+
        '```',
      example: '->',
      required: true
    },

    meta:
      require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The manager was successfully created.',
      outputVariableName: 'report',
      outputDescription: 'The `manager` property is a manager instance that will be passed into `getConnection()`. The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        manager: '===',
        meta: '==='
      }
    },

    malformed: {
      description: 'The provided connection string is malformed.',
      extendedDescription: 'The format of connection strings varies across different databases and their drivers.  This exit indicates that the provided string is not valid as per the custom rules of this driver. Note that if this exit is traversed, it means the driver DID NOT ATTEMPT to create a manager-- instead the invalid connection string was discovered during a check performed beforehand.',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance explaining that (and preferably "why") the provided connection string is invalid.  The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    },

    failed: {
      description: 'Could not create a connection manager for this database using the specified connection string.',
      extendedDescription: 'Even if the database is unreachable, bad credentials are being used, etc, this exit will not '+
      'necessarily be called-- that depends on the implementation of this driver. '+
      'If this exit is called, it might mean any of the following:\n'+
      ' + the credentials encoded in the connection string are incorrect\n'+
      ' + there is no database server running at the provided host (i.e. even if it is just that the database process needs to be started)\n'+
      ' + there is no software "database" with the specified name running on the server\n'+
      ' + the provided connection string does not have necessary access rights for the specified software "database"\n'+
      ' + this Node.js process could not connect to the database, perhaps because of firewall/proxy settings\n'+
      ' + any other miscellaneous connection error',
      outputVariableName: 'report',
      outputDescription: 'The `error` property is a JavaScript Error instance with more information and a stack trace.  The `meta` property is reserved for custom driver-specific extensions.',
      example: {
        error: '===',
        meta: '==='
      }
    }

  }


};
