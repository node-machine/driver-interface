# Examples

> Warning: These examples do not demonstrate any error handling--
> they are designed to be as consise as possible for getting up to
> speed quickly.   Please do not copy and paste them without also
> handling errors!


## One-off connections

##### In a request or script or whatever

```javascript
MySQL.createManager({
  connectionString: 'mysql://localhost:3306/vending'
}).exec(function (err, r) {
  var mgr = r.manager;

  MySQL.getConnection({
    manager: mgr,
  }).exec(function (err, r){
    var conn = r.connection;

    MySQL.sendNativeQuery({
      connection: conn,
      nativeQuery: 'SELECT * FROM snacks;'
    },function (err, r){
      console.log(r.result);

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
  connectionString: 'mysql://localhost:3306/vending'
}).exec(function (err, r) {
  global.datastores.localMySQL = r.manager;
  // Done.
});
```


##### In a request or script or whatever

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


