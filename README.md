# Waterline Driver Interface

Abstract machines describing the Waterline driver API.

For the latest information and tips about the **adapter interface for the currently released version of Sails and Waterline** as of February 2016, see [https://github.com/balderdashy/sails-docs/issues/637](https://github.com/balderdashy/sails-docs/issues/637).


## Available Drivers

| Datasource | Repo                                                 | Interface Layers Supported           |
|------------|------------------------------------------------------|--------------------------------------|
| MongoDB    | http://github.com/particlebanana/machinepack-mongodb | Driveable, Queryable
| PostgreSQL | http://github.com/mikermcneil/machinepack-postgresql | Driveable, Queryable, Transactional
| MySQL      | _todo_                                               | Driveable, Queryable, Transactional
| Redis      | https://github.com/mikermcneil/machinepack-redis     | Driveable

> Waterline drivers are a not-yet-released feature as of WL>=v0.12; however they _can actually be used directly_ from any Node.js application-- including an app using an earlier version of Waterline.


## Purpose
So why add another API? Isn't the adapter system enough?

#### The Adapter System
The adapter system exists to provide the Waterline ORM/ODM with mappings it can use to expose a normalized interface which hides the complexity inherent in working with one or more underlying databases directly.  Adapters expose methods like `.find()` and `.create()` which are designed to be called by Waterline core.  This means that userland code in Waterline-powered applications focuses on business logic; working with logical models, attributes and records rather than physical tables/columns/rows or collections/fields/documents.

This approach alone works great for most teams and applications...at least for the first 18 months.  The reality is that, when using any ORM or database abstraction framework, there is always a certain level of scale at which lower-level access to the database becomes necessary.  As an app's user base grows the amount of data and traffic grows with it, and adapter-specific features like replicas, sharding, dynamic connection management, and transactions can suddenly become very important.  Plus, depending on the amount of data you're working with, you start wanting to squeeze out more performance (e.g. by replacing your most frequently-used ORM calls with handwritten native queries).

> There is one other impetus for the driver API which is worth pointing out: apps that work with dynamic database connections _as their stated purpose_ (e.g. imagine rolling your own `phpMyAdmin`).  This is not a terribly common use case, but it has come up more than once over the years.  These types of apps almost always still have models and their own metadatabase; but they also work with remote databases in the same way you might work with the Mandrill or Twilio API.


#### Going Below Deck
Historically, the database-specific connection and querying logic necessary for these lower-level features was sprinkled throughout adapters. This led to duplicative code with a high degree of variability; which in turn, restricted the kind of database-specific features that could be added to adapters.  Worse, this murkiness meant that, despite the fact that tons of lower-level logic was already implemented in adapters, it could not be called directly from userland.  Instead, Sails/Waterline developers had to use NPM packages directly (e.g. `mysql`, `redis`, `pg`).  This is time consuming and can be tricky; especially for folks new to Node.  

The Waterline driver interface is designed to solve this problem bottom-up, once and for all.  Drivers sit one rung _below_ adapters on the ladder of abstraction.  They provide the same functionality as  a _standard, database-agnostic interface_ for low-level database operations.

> For a **visualization** of where drivers sit in relation to adapters, check out [this diagram](https://docs.google.com/drawings/d/11rNJuuNdTNdX_JLUxU9qnAyb5aZHlVJQCijTgSbWSgY/edit).
>
> For **historical perspective**, see https://github.com/mikermcneil/waterline-query-builder/blob/master/docs/ and https://github.com/mikermcneil/waterline2.


## Philosophy

The design of the WL driver spec shares some characteristics with standardization efforts like ODBC, but with an emphasis on maximizing [extensibility](#extensibility) and statelessness.

Waterline drivers are machinepacks, which means they inherit all of the advantages of the Node-Machine ecosystem and toolchain.  Like any other machinepack, every method in a WL driver is compatible with the [machine specification](http://node-machine.org/spec/machine).  That means not only is it is [strongly-typed](https://github.com/node-machine/rttc) and self-documented with declarative metadata; it is also stateless, with a single clear purpose.

#### Extensibility
Every machine in this interface supports a custom `meta` input on the way in, and each of its exits' outputs support a custom `meta` property on the way out.  The only exception is the catchall `error` exit, which is used for handling unrecognized exceptions.

Drivers are free to implement extensions to this interface with customizations to WL syntax, provided those extensions are in the form of additional properties within prescribed namespaces: i.e. the `opts` property, which is available recursively deep at each subquery level (as a sibling to `from`/`select`/`where`/`limit`/etc).  The exact API for this is still in flux, but for some conceptual background information, see https://github.com/mikermcneil/waterline-query-builder/blob/master/docs/overview.md (warning: slightly out of date).

Finally, drivers can add their own custom machines-- although this should be used with care, in case custom machines clash with future additions to the specification.  For similar reasons, drivers should not add new exits or inputs to official machines, and the semantic skeleton (`friendlyName`, `example`,`required`) of standardized inputs and exits should not be changed (although `description`, `extendedDescription`, `moreInfoUrl`, `outputDescription`, `whereToGet`, and `outputVariableName` are all fair game).



#### Interface Layers

The currently planned interface includes multiple echelons of functionality a driver author can choose to implement.  This ranges from the baseline of raw connection management all the way up to native support for database transactions.

The following compatibility layers are furcated based on the functionality they expose in a generic sense-- i.e. what they make possible without knowing anything about the underlying implementation.


#### Driveable
+ `.getConnection()`
+ `.releaseConnection()`

#### Queryable
+ `.sendNativeQuery()`
+ `.compileStatement()`
+ `.parseNativeQueryResult()`
+ `.parseNativeQueryError()`

#### Transactional
+ `.beginTransaction()`
+ `.commitTransaction()`
+ `.rollbackTransaction()`


| Interface Layer | Description
|:----------------|:------------------------------------------------------------------------------------------------------------------|
| Driveable       | Any database.  Doesn't necessarily need to support persistent connections (they just need to be uniquely identifiable).
| Queryable       | Databases which support conventionally-defined tables, primary keys, and uniqueness constraints.
| Transactional   | Databases with native support for transactions.



## Usage

>
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


#### Methods
See the machines in this repo.

#### Expected Return Values
See the `success` exit definition of the machines in this repo and the section on [Query Results](#query-results) below for more information.

#### Errors
See the other exit definitions of machines in this repo and/or the section on [Footprints](#footprints) below for more information.

#### Query Language
The Queryable interface layer supports declarative syntax for most types of DQL/DML queries via `compileStatement()`, and the normalized result returned by `parseNativeQueryResult()`.  See https://github.com/particlebanana/waterline-query-docs for more information.



## Query Results
In the "Queryable" interface layer, raw results returned from sending native queries can be parsed using `parseNativeQueryResult()`. The normalized result depends on the query type:


| Source Query          | Result Type        |
|:----------------------|--------------------|
| insert                | ((dictionary))     |
| select                | ((array))          |
| update                | ((dictionary))     |
| delete                | ((dictionary))     |


#### insert

The successful result data from a query that inserted a new record.


```js
{
  inserted: '*'
}
```


| Property              | Type             | Details
|-----------------------|------------------|:----------------------------------------------------------------------------------------------------------|
| `inserted`            | ((json))         | The primary key value of the newly inserted record.  It is either a number or a string.



#### select

The successful result data from a query that fetched, joined, or aggregated a set of existing records.

```js
[
  {}
]
```

Each item in the result array is a dictionary (`{}`) that corresponds with an individual record or virtual record (e.g. "count") returned from the database.  Guaranteed to be JSON-compatible (Date instances will be cast to tz-agnostic ISO strings).




#### update

The successful result data from a query that updated a set of existing records.


```js
{
  numRecordsUpdated: 7
}
```


| Property              | Type             | Details
|-----------------------|------------------|:-----------------------------------------------------------------------|
| `numRecordsUpdated`   | ((number))       | The number of records that were updated by this query.



#### delete

The successful result data from a query that deleted a set of existing records.


```js
{
  numRecordsDeleted: 13
}
```



| Property              | Type             | Details
|-----------------------|------------------|:-----------------------------------------------------------------------|
| `numRecordsDeleted`   | ((number))       | The number of records that were deleted by this query.





## Footprints

In the "Queryable" interface layer, raw errors returned from sending native queries can be parsed using `parseNativeQueryError()`.  The output is one of a set of standardized error footprints:

| Footprint             | Potential Source Queries | Error Description
|-----------------------|--------------------------|:-----------------------------------------------------------------------------------|
| notUnique             | `update`, `create`       | The query failed because it would violate one or more uniqueness constraints.
| catchall              | _any_                    | The error from the query cannot be identified as any other known kind of query footprint.


#### notUnique

The query failed because it would violate one or more uniqueness constraints.

> _Can occur with "insert" and "update" query types._

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


#### catchall

The error from the query cannot be identified as any other known kind of query footprint.

> _Can occur with any type of query._

```js
{
  identity: 'catchall'
}
```

| Property              | Type             | Details
|-----------------------|------------------|:----------------------------------------------------------------------------------------------------------|
| identity              | ((string))       | Uniquely identifies the footprint.



## Official Support

Our primary focus at the moment is to finish, test, and document feature-complete implementations of this interface for MySQL, MongoDB, and PostgreSQL.  Early versions of some drivers will be available for testing as early as the end of this month (February 2016).



## License

MIT &copy; 2016 [Cody Stoltman](http://github.com/particlebanana), [Mike McNeil](http://github.com/mikermcneil) and contributors

