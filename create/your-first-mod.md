# Your first mod
In this guide, you will:
- Use [ILSpy](/create/tools#ilspy) to view the game's source code
- Use Harmony to remove all cooldowns from abilities
- Build and test your mod

This guide is based off of the [Zero Ability Cooldowns mod](https://thunderstore.io/c/bopl-battle/p/Mangochicken/ZeroAbilityCooldowns/) by Mangochicken.

::: warning
This guide assumes you have followed all of the previous pages. If not, [go back](/create/quickstart) and do so.
:::

## Edit the project

In order to edit the project, you need to open it in your [IDE of choice](/create/ide).

## Using Harmony
[Harmony](https://harmony.pardeike.net/v2/) (more specifically Harmony 2) is a library that allows for modifying methods in an assembly and overriding their original functions. This is the most popular way to modify the behavior of Bopl Battle without destructively overwriting the original source code.

First, start by initializing a Harmony instance in your code:
::: code-group
```csharp [Plugin.cs]{2,14-15}
using BepInEx;
using HarmonyLib;

namespace MyFirstBoplPlugin;

[BepInPlugin(ModInfo.PLUGIN_GUID, ModInfo.PLUGIN_NAME, ModInfo.PLUGIN_VERSION)]
public class Plugin : BaseUnityPlugin
{
    private void Awake()
    {
        // Plugin startup logic
        Logger.LogInfo($"Plugin {ModInfo.PLUGIN_GUID} is loaded!");

        // Only use the mod's GUID to avoid patch conflicts
        Harmony harmony = new Harmony(ModInfo.PLUGIN_GUID);
    }
}
```
:::

Next, create a custom class that houses all your patches. It's recommended to keep this in a separate file to keep your code organized and easier to find like so:

::: code-group
```csharp [Patches.cs]
using HarmonyLib;

namespace MyFirstBoplPlugin;

public class Patches {
    // patches will go here
}
```
:::

Additionally, remember to apply any patches you create:

::: code-group
```csharp [Plugin.cs]{16}
using BepInEx;
using HarmonyLib;

namespace MyFirstBoplPlugin;

[BepInPlugin(ModInfo.PLUGIN_GUID, ModInfo.PLUGIN_NAME, ModInfo.PLUGIN_VERSION)]
public class Plugin : BaseUnityPlugin
{
    private void Awake()
    {
        // Plugin startup logic
        Logger.LogInfo($"Plugin {ModInfo.PLUGIN_GUID} is loaded!");

        // Only use the mod's GUID to avoid patch conflicts
        Harmony harmony = new Harmony(ModInfo.PLUGIN_GUID);
        harmony.PatchAll(typeof(Patches));
    }
}
```
:::


## Using ILSpy
[ILSpy](/create/tools#ilspy) is a popular and modern .NET assembly decompiler that allows for users to obtain readable C# code from .NET IL assemblies. 

In order to read Bopl Battle's code, we need to decompile `Assembly-CSharp.dll`. After downloading and opening ILSpy, go to `File > Open` and open `<path to Bopl Battle>/BoplBattle_Data/Managed/Assembly-CSharp.dll`.

Once that is done, ILSpy should look like this:

![Picture of ILSpy after opening Assembly-CSharp.dll](/images/screenshots/creating/ilspy.png)

Scroll down to the `Ability` class and expand it. We will be patching the `UpdateSim` function found near the bottom.

## Patching a function
Back in your `Patches` class, add a function like so:

::: code-group
```csharp [Patches.cs]{2,8-13}
using HarmonyLib;
using BoplFixedMath;

namespace MyFirstBoplPlugin;

public class Patches
{
    [HarmonyPatch(typeof(Ability),nameof(Ability.GetCooldown))]
    [HarmonyPostfix]
    public static void AbilityPatch(ref bool __result)
    {
        // code goes here
    }
}
```
:::

For this, we're patching the `GetCooldown` method in order to make it always return zero. This will eliminate cooldowns for (most of the) abilities.

The `[HarmonyPatch]` annotation tells Harmony the exact class and method you want to patch, and `[HarmonyPostfix]` tells Harmony to apply the patch after the original method runs. `ref bool __result` is the original result of the method and can be modified inside the patch, which is exactly what we're about to do.

::: code-group
```csharp [Patches.cs]{12}
using HarmonyLib;
using BoplFixedMath;

namespace MyFirstBoplPlugin;

public class Patches
{
    [HarmonyPatch(typeof(Ability),nameof(Ability.GetCooldown))]
    [HarmonyPostfix]
    public static void AbilityPatch(ref bool __result)
    {
        __result = Fix.Zero;
    }
}
```
:::

This added line sets the result to zero and returns the new result.

If you're not sure why we use the `Fix` class in this example, check out the [next page](/create/advanced/whats-a-fix).

## Building and running
::: warning
Before proceeding any further, ensure that you have a [manual BepInEx installation](/install/mod-manager/manual) set up. It is possible to load in local mods through most mod managers, but it is often faster to load it manually during development.
:::

Once you have finished coding your mod, you can build it to a `.dll` file. For most IDEs, you can simply press `Ctrl+(Shift)+B` or click the "Build" action.

If you are not using an IDE with integrated build support, you can also build your project from the CLI:

```bash
dotnet build
```

After building, copy the built mod file (found in `./bin/Debug/netstandard2.1`) to your BepInEx install's `plugins` folder. Once the mod is installed, you can run the game.