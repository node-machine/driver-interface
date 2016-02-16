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


### Support

The currently planned interface includes multiple echelons of functionality an adapter author can choose to implement.  This ranges from the baseline of raw connection management and raw queries all the way up to native support for database transactions.

The following compatibility layers are furcated based on the functionality they expose in a generic sense-- i.e. what they make possible without knowing anything about the underlying implementation.

##### Driveable
+ `.getConnection()`
+ `.releaseConnection()`
+ `.sendNativeQuery()`

##### Queryable
+ `.compileStatement()`

##### Transactional
+ `.beginTransaction()`
+ `.commitTransaction()`
+ `.rollbackTransaction()`



## License

MIT &copy; 2016 contributors

