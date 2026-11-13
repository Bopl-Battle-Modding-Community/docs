<!--@include: ../in-progress.md-->

# Modding tools
While it is technically possible to make a Bopl Battle mod just with what you have installed, it's very inconvenient and troublesome to do so. Luckily, other developers have made tools that simplify the process, allowing you to create better mods with less effort.

## ILSpy <Badge type="tip" text="recommended" />
In order to modify the game's code, you first have to know how the game works. [ILSpy](https://github.com/icsharpcode/ilspy) is a free tool that lets you decompile .NET assemblies (like Bopl Battle) and view their C# code. **This is highly recommended for people who wish to modify any part of the original source code.** It is available for all major operating systems.

## Assembly publicizers
A lot of Bopl Battle's classes, fields, and methods are often made private, making it difficult to modify internal properties. Using an assembly publicizer allows you to modify anything in the game's code, making it easy to make changes.

Some popular ones are:
- [BepInEx/BepInEx.AssemblyPublicizer](https://github.com/BepInEx/BepInEx.AssemblyPublicizer) (may not work with newer .NET versions)
- [CabbageCrow/AssemblyPublicizer](https://github.com/CabbageCrow/AssemblyPublicizer)
- [helightdev/UnityPublicizer](https://github.com/helightdev/UnityPublicizer)

## Thunderstore Packager
The [Thunderstore Packager](/create/tools/thunderstore-packager) allows you to easily create your own package for upload to Thunderstore by walking you step-by-step through the process.

If you want, you can also use [the original version](https://abstractmelon.net/thunderstore-packager/) by Abstractmelon.