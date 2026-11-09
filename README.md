# Bopl Battle Modding Docs
This repository contains documentation for creating mods for Bopl Battle.

The public website can be found at https://boplmods.reallybad.dev.

## Development
This site uses VitePress for development. More information can be found on its [website](https://vitepress.dev/).

To install locally:
1. Clone the repo (`git clone --recursive https://github.com/Bopl-Battle-Modding-Community/docs.git`)
2. Install dependencies (`npm i`)
3. Run the dev server (`npm run dev`)
4. Visit http://localhost:5173

If you already have an older existing copy, make sure to pull any changes:
```sh
git pull && git submodule update --init --recursive
``` 

Make sure to keep the documentation organized in folders and follow the general style.

For VitePress-specific Markdown extensions, see [Guide/Markdown Extensions](https://vitepress.dev/guide/markdown).
