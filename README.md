# Proposed Waterline Adapter Interface

An abstract machinepack describing the next-gen Waterline adapter interface.

> Warning: This is a work in progress and will rapidly evolve over the next few days. 
> The focus right now is on providing lower-level access to the underlying database,
> and on empowering adapter authors to be able to tune their packages without sacrificing
> the uniformity that is necessary for Waterline core to work its magic.
>
> The first generation of adapters implemented using this spec will be used _within existing Waterline adapters_.
> The interface specced here is not high-level enough to fulfill the full Waterline adapter interface today--
> rather the goal is for it to gradually replace underlying APIs from the inside out.
>
> Note that adapters implementing this interface are not currently usable as drop in replacements for
> existing adapters in Sails apps or other apps using vanilla Waterline.  However, they can be required and
> used _directly_ from [any Node.js script](http://node-machine.org/).
>
> If you have questions, feel free to open an issue.



### Layers

The currently planned interface includes multiple echelons of functionality an adapter author can choose to implement.  This ranges from the baseline of raw connection management all the way up to native support for database transactions.

The following compatibility layers are furcated based on the functionality they expose in a generic sense-- i.e. what they make possible without knowing anything about the underlying implementation.


##### Driveable
+ `.getConnection()`
+ `.releaseConnection()`

##### Queryable
+ `.compileStatement()`
+ `.sendNativeQuery()`

##### Transactional
+ `.beginTransaction()`
+ `.commitTransaction()`
+ `.rollbackTransaction()`


| Interface Layer | Description
|:----------------|:------------------------------------------------------------------------------------------------------------------|
| Driveable       | Any database.  Doesn't necessarily need to support persistent connections.
| Queryable       | Databases which support conventionally-defined tables, primary keys, and uniqueness constraints.
| Transactional   | Databases with native support for transactions.




### Usage

For a sneak peek of the declarative syntax supported by `compileStatement()`, see the following links and/or have a look at @particlebanana's repos.

##### Query Language
See https://github.com/mikermcneil/waterline-query-builder/blob/master/docs/syntax.md.

##### Errors
See https://github.com/mikermcneil/waterline-query-builder/blob/master/docs/errors.md.


### Extensibility

Every machine in this interface supports a custom `meta` input on the way in, and each of its exits' outputs support a custom `meta` property on the way out.  The only exception is the catchall `error` exit, which is used for handling unrecognized exceptions.

In addition, adapters are free to implement extensions to this interface by adding machines or making customizations WL syntax, provided those extensions are in the form of additional properties within prescribed namespaces.  The API for this is still in flux, but for some conceptual background information, see https://github.com/mikermcneil/waterline-query-builder/blob/master/docs/overview.md (warning: slightly out of date).



### Official Support

Our primary focus at the moment is to finish, test, and document feature-complete implementations of this interface for MySQL, MongoDB, and PostgreSQL.  Early versions of some adapters will be available for testing as early as the end of this month (February 2016).



## License

MIT &copy; 2016 contributors

