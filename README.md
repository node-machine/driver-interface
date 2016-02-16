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
> If you have questions, feel free to open an issue.

## License

MIT &copy; 2016 contributors

