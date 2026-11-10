# What's a Fix?
If you spend any time looking at Bopl Battle's code or mods, you've probably noticed the `Fix` class being used for numbers. Fixed numbers (commonly shortened to Fixes) are floating-point decimal numbers that help prevent desynchronizations in online matches.

## Why not just use floats?
Floating-point computing is somewhat flawed across CPU manufacturers and architectures. If you run specific operations on two CPUs from different companies (e.g. Intel and AMD), you can end up with extremely minor differences in results with identical inputs.

## Why is this a big deal?
Most of the problems of using floats comes from how Bopl Battle handles networking. While most games have a central host server that gets input packets and sends out the game state every so often, Bopl Battle instead relies on a peer-to-peer system where players send input packets to one another and then use the recieved inputs to build a 1:1 recreation of the game state on their machine.

A major flaw of this system is that it requires the game to be fully deterministic. If even one client has a slightly different physics calculation or misses an input packet, the entire game state will desynchronize (desync) with the other players. This makes the game effectively unplayable for both the desynced player and the rest of the lobby, as desynced players are not aware of what is truly happening and may be able to end the round early if they are killed on their screen.

Despite already making a custom deterministic physics engine more suited to his purposes, Zapray encountered the floating-point issues and was forced to create a custom floating-point number system called `BoplFixedMath`. This abstracts most of the floating-point arithmetic to C# code, which makes it more accurate at the cost of most calculations performing slightly slower.

## When should I use Fixes in my mods?
Floating point types like `float` or `double` can safely be used in client-side environments like UI development. However, any number that can modify the game state should always be a Fix in order to prevent floating-point error accumulation.

A common way to use Fixes is by casting a `float` to a Fix:
```csharp
Fix number = (Fix)10f;
```
For simple values, you can also use the predefined constants:
```csharp
Fix zero = Fix.Zero; // (Fix)0f;
Fix one = Fix.One;   // (Fix)1f;
Fix pi = Fix.Pi;     // (Fix)Math.PI;
```