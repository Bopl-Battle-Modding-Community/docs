# Creating your mod
You can create your mod in one of two ways:
- Making a project from a template
- Using a [premade mod](https://github.com/Bopl-Battle-Modding-Community/mod-template) as a reference.

Both of these will give a similar starter project, but the rest of this guide will go off of the premade mod template.

## Create from a template

::: warning

Creating from a template may not work if you do not have .NET 6 installed and activated. If you cannot get .NET 6 or need to use a newer version, use the [premade mod](/create/create#create-from-a-premade-mod) as a base instead.

:::

First, install the BepInEx template through NuGet:
```bash
dotnet new -i BepInEx.Templates --nuget-source https://nuget.bepinex.dev/v3/index.json
```
When successful, this shows the following:
```text{3}
Templates                                     Short Name            Language    Tags
--------------------------------------------  --------------------  ----------  --------------------------------------
BepInEx 5 Plugin Template                     bepinex5plugin        [C#]        BepInEx/BepInEx 5/Plugin
BepInEx 6 .NET Launcher Plugin Template       bep6plugin_netfx      [C#]        BepInEx/BepInEx 6/Plugin/.NET Launcher
BepInEx 6 Il2Cpp Plugin Template              bep6plugin_il2cpp     [C#]        BepInEx/BepInEx 6/Plugin/Il2Cpp
BepInEx 6 Unity Mono Plugin Template          bep6plugin_unitymono  [C#]        BepInEx/BepInEx 6/Plugin/Unity Mono
```
The only relevant template here is the `BepInEx 5 Plugin Template` (highlighted above).

Once the template is installed, create the project:
```bash
dotnet new bepinex5plugin -n MyFirstBoplPlugin -T netstandard2.1 -U 2022.3.60
```
Each of the different parameters influence the starter project:
- `-n MyFirstBoplPlugin`: Sets the name of the project. You can change this to change the final assembly (`.dll` file) name.
- `-T netstandard2.1`: Sets the target .NET framework for the project. Only change this if you know what you're doing.
- `-U 2022.3.60`: Sets the game's Unity version (fully written as `v2022.3.60f1`).

After running the command, you should see this message: 
```text
The template "BepInEx 5 Plugin Template" was created successfully.
```

## Create from a premade mod
If you cannot create the template provided by BepInEx, you can use the premade mod template. 

### With Git
If you want to create a GitHub repository based off of the template, go to the [GitHub repository](https://github.com/Bopl-Battle-Modding-Community/mod-template) and click "Use this template" in the top right. After setting up the repository, clone it on your computer and skip the rest of this section.

Otherwise, clone the repository from the command line:
```bash
git clone https://github.com/Bopl-Battle-Modding-Community/mod-template.git
```

If you're cloning directly from the repo, make sure to remove the original repository from your remote sources:
```bash
git remote remove origin
```

### Without Git
First, [download the `.zip`](https://github.com/Bopl-Battle-Modding-Community/mod-template/archive/refs/heads/main.zip) containing all the repository files and extract it:
![GitHub screenshot of user about to click "Download ZIP" button](/images/screenshots/creating/download.png)
![File explorer screenshot of downloaded ZIP file and extracted folder](/images/screenshots/creating/extract.png)

If all goes well, you should see these files in your folder:

::: code-group

<<< @/public/external/mod-template/Plugin.cs

<<< @/public/external/mod-template/ModInfo.cs

<<< @/public/external/mod-template/NuGet.Config{xml}

<<< @/public/external/mod-template/dependencies.txt

<<< @/public/external/mod-template/TemplateMod.csproj{xml}

<<< @/public/external/mod-template/.gitignore

:::