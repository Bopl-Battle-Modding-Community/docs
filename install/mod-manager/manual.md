# Manual installation
If you do not want to use a mod manager (likely for testing mods or full control), you can choose to manually install BepInEx.

## Download 
1. Download the latest version of BepInEx 5 from the [official repository](https://github.com/BepInEx/BepInEx/releases/latest). Download the file with the name `BepInEx_win_x64_X.X.XX.X.zip`, regardless of your operating system.

::: warning

**Do not download any BepInEx 6 versions**, as it is heavily designed around IL2CPP games and is not supported by most, if not all, Bopl Battle mods.

:::

2. Locate your Bopl Battle installation. This is usually at the following paths:

Windows: `C:\Program Files (x86)\Steam\steamapps\common\Bopl Battle` \
Linux: `~/.local/share/Steam/steamapps/common/Bopl Battle`

If you can't find it, open Bopl Battle in your Steam library and open this menu:

![Steam screenshot of user hovering on "Browse local files" button](/images/screenshots/installing/browse-local-files.png)

Your file explorer should open to your Bopl Battle install folder.

3. Extract **the contents** of the BepInEx .zip to your Bopl Battle folder. If you did it right, you should see files like `doorstop_config.ini` and `changelog.txt` in the main Bopl Battle folder, as well as a folder titled `BepInEx`.

![Screenshot of file explorer in the Bopl Battle folder after BepInEx was properly installed](/images/screenshots/installing/bepinex.png)

4. Run the game once. You only have to get as far as the main menu, and then you can close the game again. This allows BepInEx to generate the required files and folders needed to use mods.

5. To verify that BepInEx is properly installed, open the `BepInEx` folder and check that the `plugins`, `cache`, and `config` folders exist. If they don't, make sure you [extracted the .zip correctly](/install/mod-manager/manual#:~:text=Extract,zip).

6. Place your mod `.dll` files in the `plugins` folder.

::: info

If you also want to see a debug console in-game, open `config/BepInEx.cfg` and enable the debug console:

```toml:line-numbers=43 {6}
[Logging.Console]

## Enables showing a console for log output.
# Setting type: Boolean
# Default value: false
Enabled = true
```

:::

7. Run the game. If all goes well, your mods should be running as well.