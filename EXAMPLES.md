# Examples

> Warning: These examples do not demonstrate any error handling--
> they are designed to be as consise as possible for getting up to
> speed quickly.   Please do not copy and paste them without also
> handling errors!


## One-off connections

##### In a route/action or script or whatever

```javascript
MySQL.createManager({
  connectionString: 'mysql://localhost:3306/vending',
  
  // Driver-specific settings:
  meta: {
    connectionType: 'adhoc', // tells the driver to have this manager produce adhoc connections instead of its default (pooling)
    // ... other driver-specific stuff like character encoding, etc.
  }
}).exec(function (err, r) {
  var mgr = r.manager;

  // getConnection() can be called as many times as we like-- each one will be a fresh connection.
  // This behavior is a required part of the spec.
  MySQL.getConnection({
    manager: mgr,
  }).exec(function (err, r){
    var conn = r.connection;

    MySQL.sendNativeQuery({
      connection: conn,
      nativeQuery: 'SELECT * FROM snacks;'
    },function (err, r){
      console.log(r.result);

      // #### What about releaseConnection()?
      //
      // Because destroyManager() destroys any remaining connections,
      // the connection does not _have_ to be manually released in this case.
      // Calling releaseConnection() _can_ be called here, but it is not necessary
      // since the manager is being destroyed straight away.
      
      MySQL.destroyManager({
        manager: mgr,
      }).exec(function (err, r){
        // Done.
      });//</destroyManager()>
    });//</sendNativeQuery()>
  });//</getConnection()>
});//</createManager()>
```


## Pools and/or clustering

##### In the bootstrap or whatever

```javascript
global.datastores = {
  localMySQL: undefined
};

MySQL.createManager({
  connectionString: 'mysql://localhost:3306/vending',
  // Driver-specific settings:
  meta: {
    // The MySQL driver uses a connection pool for its managers by default
    // (this decision is completely up to the driver)
    // ... other driver-specific stuff like character encoding, etc.
  }
}).exec(function (err, r) {
  global.datastores.localMySQL = r.manager;
  // Done.
});
```


##### In a route/action or script or whatever

```javascript
MySQL.getConnection({
  manager: global.datastores.localMySQL,
}).exec(function (err, r){
  var conn = r.connection;

  MySQL.sendNativeQuery({
    connection: conn,
    nativeQuery: 'SELECT * FROM snacks;'
  },function (err, r){
    console.log(r.result);

    MySQL.releaseConnection({
      connection: conn
    }).exec(function (err, r){
      // Done.
    });//</releaseConnection()>
  });//</sendNativeQuery()>
});//</getConnection()>
```


##### When everything is being gracefully shut down or whatever

```javascript
MySQL.destroyManager({
  manager: global.datastores.localMySQL
}).exec(function (err, r){
  // Done.
});//</destroyManager()>
```


