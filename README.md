# Waterline Driver Interface

An extensible meta-interface for Node.js, designed to make it easier to build plugin systems.

Drivers are just Node modules.  They are most commonly installed as [NPM](http://npmjs.org) packages, but you can bring them into your projects any way you like, and they can be open-source or proprietary.

What makes drivers different from normal NPM packages is that they have a standard interface.  Specifically, drivers are [machinepacks](http://node-machine.org) that implement one or more supported **interface layers**.  A particular driver _implements_ an interface layer if it contains its own implementations of all of the methods (called "machines") expected by that layer.  For example, since the MySQL driver has all 4 of the methods required by the "Connectable" interface layer, we say that it implements that layer.

An interface layer is defined by a name (e.g. "Queryable"), a stability level (e.g. "Draft"), and a set of _abstract machines_ (machines with no implementation).  The abstract machines in this repo each belong to _exactly one_ of the several available layers, and correspond with a particular method that driver package implementors make available at runtime.  These methods are explicitly intended to be useful directly from userland code; but it is also not uncommon for them to be accessed via a higher level abstraction such as an ORM, another machinepack, a middleware module, or a web framework.


## Available Drivers

| Database   | Repo                                                 | Layers Supported                     |
|------------|------------------------------------------------------|--------------------------------------|
| MongoDB    | https://github.com/treelinehq/machinepack-mongodb    | Connectable, Queryable
| PostgreSQL | https://github.com/treelinehq/machinepack-postgresql | Connectable, Queryable, Transactional
| MySQL      | https://github.com/treelinehq/machinepack-mysql      | Connectable, Queryable, Transactional
| Redis      | https://github.com/treelinehq/machinepack-redis      | Connectable, Cache

> While the latest stable release of officially supported Waterline/Sails.js adapters do not yet rely on the new drivers, that will be changing soon.  In the mean time, drivers _can actually be used directly_ from any Node.js application-- including an app using an earlier version of Waterline.
>
> For the latest information and tips about the **adapter interface for the currently released version of Sails and Waterline** as of February 2016, see [https://github.com/balderdashy/sails-docs/issues/637](https://github.com/balderdashy/sails-docs/issues/637).
>
> For more information about the Node-Machine project, see [http://node-machine.org](http://node-machine.org).




## Interface Layers

The currently planned interface includes multiple echelons of functionality a driver author can choose to implement.  This ranges from the baseline of raw connection management all the way up to native support for database transactions.

The following layers are furcated based on compatibility-- i.e. what they make possible without knowing anything about the underlying implementation.

First, a quick summary:

| Interface Layer | Stability Level | Introduced | Depends On...
|:----------------|:----------------|:-----------|:-----------------------------------------|
| Connectable     | _Stable_        | Jan 2016   | _n/a_
| Modeled         | _Draft_         | Nov 2016   | Connectable
| Migratable      | _Experimental_  | Mar 2017   | Connectable
| Cache           | _Draft_         | Mar 2016   | Connectable
| Queryable       | _Unstable_      | Jan 2016   | Connectable
| Transactional   | _Stable_        | Jan 2016   | Queryable
| Tradeable       | _Experimental_  | Nov 2017   | _n/a_


#### Connectable
Any database or system-- doesn't necessarily need to support persistent connections.

A driver implements the _Connectable_ interface layer if it includes the following machines:
+ [`.createManager()`](./layers/connectable/create-manager.js)
+ [`.destroyManager()`](./layers/connectable/destroy-manager.js)
+ [`.getConnection()`](./layers/connectable/get-connection.js)
+ [`.releaseConnection()`](./layers/connectable/release-connection.js)

#### Modeled
Any database that fully supports CRUD operations against predefined data models; including basic batch record manipulation, filtering, pagination, and a few of the most common aggregation operations.

A driver implements the _Modeled_ interface layer if it includes the following machines:
+ [`.verifyModelDef()`](./layers/modeled/verify-model-def.js)
+ [`.createRecord()`](./layers/modeled/create-record.js)
+ [`.createEachRecord()`](./layers/modeled/create-each-record.js)
+ [`.updateRecords()`](./layers/modeled/update-records.js)
+ [`.destroyRecords()`](./layers/modeled/destroy-records.js)
+ [`.findRecords()`](./layers/modeled/find-records.js)
+ [`.countRecords()`](./layers/modeled/count-records.js)
+ [`.sumRecords()`](./layers/modeled/sum-records.js)
+ [`.avgRecords()`](./layers/modeled/avg-records.js)

#### Migratable
Any database or system that supports a concept of tabular data with unique indexes.

A driver implements the _Migratable_ interface layer if it includes the following machines:
+ [`.definePhysicalModel()`](./layers/migratable/define-physical-model.js)
+ [`.dropPhysicalModel()`](./layers/migratable/drop-physical-model.js)
+ [`.setPhysicalSequence()`](./layers/migratable/set-physical-sequence.js)

#### Cache
Any database or system which can function as a cache, with native support for key expiry.

A driver implements the _Cache_ interface layer if it includes all machines necessary for _Connectable_, in addition to the following:

+ [`.cacheValue()`](./layers/cache/cache-value.js)
+ [`.getCachedValue()`](./layers/cache/get-cached-value.js)
+ [`.destroyCachedValues()`](./layers/cache/destroy-cached-values.js)
+ [`.flushCache()`](./layers/cache/flush-cache.js)

#### Queryable
Any database or system which supports the concept of queries, uniqueness constraints, and tables/collections.  Uses [WLQL (stage 4 query)](https://github.com/treelinehq/waterline-query-docs) syntax, which is based on [Knex](http://knexjs.org/).

A driver implements the _Queryable_ IL if it includes all machines nececssary for _Connectable_, in addition to the following:
+ [`.sendNativeQuery()`](./layers/queryable/send-native-query.js)
+ ~~[`.compileStatement()`](./layers/queryable/compile-statement.js)~~ _(deprecated)_
+ [`.parseNativeQueryResult()`](./layers/queryable/parse-native-query-result.js) _(will potentially be consolidated into `sendNativeQuery`)_
+ [`.parseNativeQueryError()`](./layers/queryable/parse-native-query-error.js) _(will potentially be consolidated into `sendNativeQuery`)_

#### Transactional
Any database with native support for transactions.

A driver implements the _Transactional_ IL if it includes all machines nececssary for _Queryable_, in addition to the following:

+ [`.beginTransaction()`](./layers/transactional/begin-transaction.js)
+ [`.commitTransaction()`](./layers/transactional/commit-transaction.js)
+ [`.rollbackTransaction()`](./layers/transactional/rollback-transaction.js)


#### Tradeable
Any stock, forex, security, commodity, or cryptocurrency exchange that allows selling some of one thing for some of another thing.

A driver implements the _Tradeable_ interface layer if it includes the following machines:
+ [`.cancelEachOrder()`](https://www.npmjs.com/package/privateer#canceleachorder)
+ [`.createEachOrder()`](https://www.npmjs.com/package/privateer#createeachorder)
+ [`.getActiveOrders()`](https://www.npmjs.com/package/privateer#getactiveorders)
+ [`.getExchangeRates()`](https://www.npmjs.com/package/privateer#getexchangerates)
+ [`.getHoldings()`](https://www.npmjs.com/package/privateer#getholdings)


## Usage

#### Methods
See the [abstract machines](./layers) defined in this repo.

#### Query Language
The Queryable interface layer supports declarative syntax for most types of DQL/DML queries via `compileStatement()`, and the normalized result returned by `parseNativeQueryResult()`.  See the [WLQL (stage 4 query) docs](https://github.com/treelinehq/waterline-query-docs/blob/master/docs/) for more information.

#### Expected Return Values
See the `success` exit definitions of the machines in this repo and the section on [**Query Results** in the WLQL (stage 4 query) docs](https://github.com/treelinehq/waterline-query-docs/blob/master/docs/results.md) for more information.

#### Errors
See the other exit definitions of machines in this repo and/or the section on [**Errors** in the WLQL (stage 4 query) docs](https://github.com/treelinehq/waterline-query-docs/blob/master/docs/errors.md) for more information.


## Philosophy

The design of the WL driver spec shares some characteristics with standardization efforts like ODBC, but with an emphasis on maximizing [extensibility](#extensibility) and statelessness.

Waterline drivers are machinepacks, which means they inherit all of the advantages of the Node-Machine ecosystem and toolchain.  Like any other machinepack, every method in a WL driver is compatible with the [machine specification](http://node-machine.org/spec/machine).  That means not only is it is [strongly-typed](https://github.com/node-machine/rttc) and self-documented with declarative metadata; it is also stateless, with a single clear purpose.

#### Extensibility
Every machine in this interface supports a custom `meta` input on the way in, and each of its exits' outputs support a custom `meta` property on the way out.  The only exception is the catchall `error` exit, which is used for handling unrecognized exceptions.

Drivers are free to implement extensions to this interface with customizations to WL syntax, provided those extensions are in the form of additional properties within prescribed namespaces: i.e. the `opts` property, which is available recursively deep at each subquery level (as a sibling to `from`/`select`/`where`/`limit`/etc).  The exact API for this is still in flux, but for some conceptual background information, see https://github.com/mikermcneil/waterline-query-builder/blob/master/docs/overview.md (warning: slightly out of date).

Finally, drivers can add their own custom machines-- although this should be used with care, in case custom machines clash with future additions to the specification.  For similar reasons, drivers should not add new exits or inputs to official machines, and the semantic skeleton (`friendlyName`, `example`,`required`) of standardized inputs and exits should not be changed (although `description`, `extendedDescription`, `moreInfoUrl`, `outputDescription`, `whereToGet`, and `outputVariableName` are all fair game).

A driver can be validated against the interface defined in this repo using the `machinepack` command-line tool.  Just run `mp compare /path/to/your-local-copy-of-driver-interface`.


## How is this different from Sails/Waterline adapters?

Why add another API? Isn't the Waterline adapter system enough?

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



## License

MIT &copy; 2016-present [Mike McNeil](http://github.com/mikermcneil)

