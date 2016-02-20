# Waterline Driver Interface

An abstract machinepack describing the next-gen Waterline driver interface.

For the latest information and tips about the adapter interface for the **currently released version of Sails and Waterline** as of February 2016, see [https://github.com/balderdashy/sails-docs/issues/637](https://github.com/balderdashy/sails-docs/issues/637).

For a more visual explanation of the improvements coming in the next version of Waterline, check out [this diagram](https://docs.google.com/drawings/d/11rNJuuNdTNdX_JLUxU9qnAyb5aZHlVJQCijTgSbWSgY/edit).

For historical perspective, see https://github.com/mikermcneil/waterline-query-builder/blob/master/docs/ and https://github.com/mikermcneil/waterline2.


### Available Drivers

| Datasource | Repo                                                 | Interface Layers Supported           |
|------------|------------------------------------------------------|--------------------------------------|
| MongoDB    | http://github.com/particlebanana/machinepack-mongodb | Driveable, Queryable
| PostgreSQL | http://github.com/mikermcneil/machinepack-postgresql | Driveable, Queryable, Transactional
| MySQL      | _todo_                                               | Driveable, Queryable, Transactional
| Redis      | https://github.com/mikermcneil/machinepack-redis     | Driveable



### Interface Layers

The currently planned interface includes multiple echelons of functionality a driver author can choose to implement.  This ranges from the baseline of raw connection management all the way up to native support for database transactions.

The following compatibility layers are furcated based on the functionality they expose in a generic sense-- i.e. what they make possible without knowing anything about the underlying implementation.


##### Driveable
+ `.getConnection()`
+ `.releaseConnection()`

##### Queryable
+ `.sendNativeQuery()`
+ `.compileStatement()`
+ `.parseNativeQueryResult()`
+ `.parseNativeQueryError()`

##### Transactional
+ `.beginTransaction()`
+ `.commitTransaction()`
+ `.rollbackTransaction()`


| Interface Layer | Description
|:----------------|:------------------------------------------------------------------------------------------------------------------|
| Driveable       | Any database.  Doesn't necessarily need to support persistent connections (they just need to be uniquely identifiable).
| Queryable       | Databases which support conventionally-defined tables, primary keys, and uniqueness constraints.
| Transactional   | Databases with native support for transactions.



> **Warning**
>
> This interface is a work in progress and will rapidly evolve over the next few days. 
> The focus right now is on providing lower-level access to the underlying database,
> and on empowering adapter authors to be able to tune their packages without sacrificing
> the uniformity that is necessary for Waterline core to work its magic.
>
> Note that machinepacks implementing this interface are not currently usable as drop in replacements for
> existing adapters in Sails apps or other apps using vanilla Waterline.  The interface specced here is
> not high-level enough to fulfill the full Waterline adapter interface today-- rather the goal is for it
> to gradually extend underlying APIs from the inside out.  Tthe first generation of drivers implemented
> using this spec will be used _within existing Waterline adapters_. They can also be required and used
> _directly_ from [any Node.js script](http://node-machine.org/).
>
> If you have questions, feel free to open an issue.



### Usage

##### Methods
See the machines in this repo.


##### Errors
See the other exit definitions of machines in this repo.
In the "Queryable" interface layer, raw errors returned from sending native queries can be parsed using `parseNativeQueryError()`.  The output is one of a set of standardized error footprints (see the "Footprints" section below).

##### Query Language
The Queryable interface layer supports declarative syntax for most types of DQL/DML queries via `compileStatement()`, and the normalized result returned by `parseNativeQueryResult()`.  See https://github.com/particlebanana/waterline-query-docs for more information.

##### Expected Return Values
See the `success` exit definition of the machines in this repo.
In the "Queryable" interface layer, raw results returned from sending native queries can be parsed using `parseNativeQueryResult()`.  The normalized result depends on the query type:


| Query Type            | RTTC Exemplar                    | Additional Info
|-----------------------|----------------------------------|:----------------------------------------------------------------------------------------------------------|
| insert                | `{ inserted: '*' }`              | The `'*'` is the primary key value of the newly inserted record.  It is either a number or a string.
| select                | `[ {} ]`                         | Each `{}` is an individual record returned from the database.
| update                | `{ numRecordsUpdated: 7 }`       |
| delete                | `{ numRecordsDeleted: 13 }`      |


##### Errors
See the other exit definitions of machines in this repo.
In the "Queryable" interface layer, raw errors returned from sending native queries can be parsed using `parseNativeQueryError()`.  The result is one of a set of standardized error footprints (see below).

##### Query Language
The Queryable interface layer supports declarative syntax for most types of DQL/DML queries via `compileStatement()`, and the normalized result returned by `parseNativeQueryResult()`.  See https://github.com/particlebanana/waterline-query-docs for more information.


### Footprints

##### notUnique

> _Can occur with "insert" and "update" query types._

The query failed because it would violate one or more uniqueness constraints.

```js
{
  identity: 'notUnique',
  columns: [ 'email_address' ]
}
```

| Property              | Type             | Details
|-----------------------|------------------|:----------------------------------------------------------------------------------------------------------|
| identity              | ((string))       | Uniquely identifies the footprint.
| columns               | ((array))        | The `columns` property is an array containing the names of columns with uniquness constraint violations.


##### catchall

> _Can occur with any type of query._

The error from the query cannot be identified as any other known kind of query footprint.

```js
{
  identity: 'catchall'
}
```

| Property              | Type             | Details
|-----------------------|------------------|:----------------------------------------------------------------------------------------------------------|
| identity              | ((string))       | Uniquely identifies the footprint.



### Extensibility

Every machine in this interface supports a custom `meta` input on the way in, and each of its exits' outputs support a custom `meta` property on the way out.  The only exception is the catchall `error` exit, which is used for handling unrecognized exceptions.

Drivers are free to implement extensions to this interface with customizations to WL syntax, provided those extensions are in the form of additional properties within prescribed namespaces: i.e. the `opts` property, which is available recursively deep at each subquery level (as a sibling to `from`/`select`/`where`/`limit`/etc).  The exact API for this is still in flux, but for some conceptual background information, see https://github.com/mikermcneil/waterline-query-builder/blob/master/docs/overview.md (warning: slightly out of date).

Finally, drivers can add their own custom machines-- although this should be used with care, in case custom machines clash with future additions to the specification.  For similar reasons, drivers should not add new exits or inputs to official machines, and the semantic skeleton (`friendlyName`, `example`,`required`) of standardized inputs and exits should not be changed (although `description`, `extendedDescription`, `moreInfoUrl`, `outputDescription`, `whereToGet`, and `outputVariableName` are all fair game).


### Official Support

Our primary focus at the moment is to finish, test, and document feature-complete implementations of this interface for MySQL, MongoDB, and PostgreSQL.  Early versions of some drivers will be available for testing as early as the end of this month (February 2016).



## License

MIT &copy; 2016 [Cody Stoltman](http://github.com/particlebanana), [Mike McNeil](http://github.com/mikermcneil) and contributors

