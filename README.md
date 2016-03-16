# Waterline Driver Interface

An extensible meta-interface for Node.js, designed to make it easier to build plugin systems.

Whether open-source or proprietary, these plugins (called drivers) are most commonly installed using [NPM](http://npmjs.org). Drivers are [machinepacks](http://node-machine.org) that implement one or more standardized **interface layers**.  A particular driver _implements_ an interface layer if it contains its own implementations of all of the machines expected by that layer.

An interface layer is defined by a name (e.g. "Queryable"), a stability level (e.g. "Draft"), and a set of _abstract machines_ (machines with no implementation).  The abstract machines in this repo each belong to _exactly one_ of the several available layers, and correspond with a particular method that driver package implementors make available at runtime.  These methods are explicitly intended to be useful directly from userland code; but it is also not uncommon for them to be accessed via a higher level abstraction such as an ORM, another machinepack, a middleware module, or a web framework.


## Available Drivers

| Database   | Repo                                                 | Layers Supported           |
|------------|------------------------------------------------------|--------------------------------------|
| MongoDB    | http://github.com/particlebanana/machinepack-mongodb | Driveable, Queryable
| PostgreSQL | http://github.com/mikermcneil/machinepack-postgresql | Driveable, Queryable, Transactional
| MySQL      | http://github.com/mikermcneil/machinepack-mysql      | Driveable, Queryable, Transactional
| Redis      | https://github.com/mikermcneil/machinepack-redis     | Driveable

> While the latest stable release of officially supported Waterline/Sails.js adapters do not yet rely on the new drivers, that will be changing soon.  In the mean time, drivers _can actually be used directly_ from any Node.js application-- including an app using an earlier version of Waterline.
>
> For the latest information and tips about the **adapter interface for the currently released version of Sails and Waterline** as of February 2016, see [https://github.com/balderdashy/sails-docs/issues/637](https://github.com/balderdashy/sails-docs/issues/637).
>
> For more information about the Node-Machine project, see [http://node-machine.org](http://node-machine.org).




## Interface Layers

The currently planned interface includes multiple echelons of functionality a driver author can choose to implement.  This ranges from the baseline of raw connection management all the way up to native support for database transactions.

The following compatibility layers are furcated based on the functionality they expose in a generic sense-- i.e. what they make possible without knowing anything about the underlying implementation.

First, a quick summary:

| Interface Layer | Stability Level | Introduced | Depends on layer(s)...
|:----------------|:----------------|:-----------|:-----------------------------------------|
| Driveable       | _Draft_         | Jan 2016   | _n/a_
| Cache           | _Experimental_  | Mar 2016   | Driveable
| Queryable       | _Draft_         | Jan 2016   | Driveable
| Transactional   | _Draft_         | Jan 2016   | Queryable






#### Driveable
Any database-- doesn't necessarily need to support persistent connections.

A driver implements the _Driveable_ interface layer if it includes the following machines:
+ `.createManager()`
+ `.destroyManager()`
+ `.getConnection()`
+ `.releaseConnection()`

#### Queryable
Any database which supports the concept of queries, uniqueness constraints, and tables/collections.  Uses [WLQL](https://github.com/particlebanana/waterline-query-docs) syntax, which is based on [Knex](http://knexjs.org/).

A driver implements the _Queryable_ IL if it includes all machines nececssary for _Driveable_, in addition to the following:
+ `.sendNativeQuery()`
+ `.compileStatement()`
+ `.parseNativeQueryResult()`
+ `.parseNativeQueryError()`

#### Transactional
Any database with native support for transactions.

A driver implements the _Transactional_ IL if it includes all machines nececssary for _Queryable_, in addition to the following:

+ `.beginTransaction()`
+ `.commitTransaction()`
+ `.rollbackTransaction()`

#### Cache
Any database which can function as a cache, with native support for key expiry.

A driver implements the _Cache_ interface layer if it includes all machines nececssary for _Driveable_, in addition to the following:

+ `.cacheValue()`
+ `.getCachedValues()`
+ `.destroyCachedValues()`




## Usage

#### Methods
See the [abstract machines](./machines) defined in this repo.

#### Query Language
The Queryable interface layer supports declarative syntax for most types of DQL/DML queries via `compileStatement()`, and the normalized result returned by `parseNativeQueryResult()`.  See the [WLQL docs](https://github.com/particlebanana/waterline-query-docs/blob/master/docs/) for more information.

#### Expected Return Values
See the `success` exit definitions of the machines in this repo and the section on [**Query Results** in the WLQL docs](https://github.com/particlebanana/waterline-query-docs/blob/master/docs/results.md) for more information.

#### Errors
See the other exit definitions of machines in this repo and/or the section on [Errors in the WLQL docs](https://github.com/particlebanana/waterline-query-docs/blob/master/docs/errors.md) for more information.


## Official Support

Our primary focus at the moment is to finish, test, and document feature-complete implementations of the supported interface layers for MySQL, MongoDB, and PostgreSQL.  Early versions of some drivers are available as of March 2016.

> See https://github.com/particlebanana/waterline-query-docs/issues/2#issuecomment-186622547 for more discussion about the future of this specification and related APIs in Waterline and the Node-Machine project.


## License

MIT &copy; 2016 [Cody Stoltman](http://github.com/particlebanana), [Mike McNeil](http://github.com/mikermcneil) and contributors

