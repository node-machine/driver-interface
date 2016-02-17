# Constants

This directory contains shared constants used by various machines in this pack. For example:

+ commonly used input definitions
+ commonly used exit definitions
+ commonly used exemplars
+ commonly used words or phrases
+ etc.



### Should I use constants in my package?

The use of normalized constants is not necessarily a good thing-- but it's not an antipattern either.

There are pros and cons, and it really comes down to what your needs are.

##### Pros
- Makes your package more DRY:
  - requires less find/replacing to make changes to identical input/exit defs used in multiple files
  - forces consistency (since identical input/exit defs are changed in one place)

##### Cons
- Makes individual machine files harder to read:
  - takes longer to look up a particular input/exit when you need to edit it
  - easy to accidentally miss an input/exit when you're looking at a file
- Can encourage too much generalization; that is, many inputs/exits are _similar_ (but not _identical_).  Once you start using constants, it is really tempting to do all sorts of crazy hacks to make your code even more DRY.  This wastes time and makes things hard to read and understand, which can make your code harder to debug down the road.

> Note that the automatically-generated documentation for a machinepack avoids most of the cons mentioned above.

##### Our recommendations

The following is a set of loose guidelines to use when considering whether to use constants for input/exit definitions shared by a given group of machines:

- If the machines _are being changed a lot **in a short period of time**_, then you might benefit from using constants for their shared input/exit defs _(for a while!)_
- Otherwise, if the machines are being changed ~5 times per week or less, but they are not 100% stable (i.e. you think that more changes are likely to be made in the future), then using constants for shared input/exit defs is not recommended (it just makes things harder to read, and since you won't be 100% fresh on what the various constants represent when you come back to work on your machines, using constants just increases the time and cognitive load required).
- Finally, if the machines are 100% stable (you don't think they'll need to be changed again), then you could go either way (however, if you are not using any kind of generated documentation, you might consider avoiding constants since you'll be referring to the machine source files for reference)

