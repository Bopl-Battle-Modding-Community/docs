import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Bopl Battle Modding Docs",
    description: "Documentation for modding Bopl Battle",

    head: [["link", { rel: "icon", href: "/images/branding/boplglitch.ico" }]],

    lastUpdated: true,

    cleanUrls: true,

    srcExclude: ["**/README.md"],

    assetsDir: "public",

    markdown: {
        lineNumbers: true
    },

    titleTemplate: ":title - Bopl Battle Modding Docs",

    themeConfig: {
        logo: "/images/branding/boplglitch.png",

        editLink: {
            pattern:
                "https://github.com/Bopl-Battle-Modding-Community/docs/edit/main/:path",
        },

        externalLinkIcon: true,

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Install", link: "/install/quickstart" },
            { text: "Create", link: "/create/quickstart" },
        ],

        footer: {
            message: `This website is not affiliated by or associated with Johan Grönvall or <a href="https://zapraygames.com/" target="_blank" rel="noreferrer">Zapray Games</a>.`,
            copyright: `Made by the <a href="https://github.com/Bopl-Battle-Modding-Community" target="_blank" rel="noreferrer">Bopl Battle Modding Community</a>.`,
        },

        sidebar: [
            {
                text: "Installing",
                items: [
                    {
                        text: "Quickstart",
                        link: "/install/quickstart",
                    },
                    {
                        text: "Install a mod manager",
                        link: "/install/mod-manager",
                        collapsed: false,
                        items: [
                            {
                                text: "Gale",
                                link: "/install/mod-manager/gale",
                            },
                            {
                                text: "r2modman",
                                link: "/install/mod-manager/r2modman",
                            },
                            {
                                text: "Thunderstore Mod Manager",
                                link: "/install/mod-manager/tsmm",
                            },
                            {
                                text: "Manual installation",
                                link: "/install/mod-manager/manual",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Creating",
                items: [
                    {
                        text: "Quickstart",
                        link: "/create/quickstart",
                    },
                    {
                        text: "Choosing an IDE",
                        link: "/create/ide",
                    },
                    {
                        text: "Installing the .NET SDK",
                        link: "/create/installing",
                    },
                    {
                        text: "Creating your mod",
                        link: "/create/create",
                    },
                    {
                        text: "Modding tools",
                        link: "/create/tools",
                    },
                    {
                        text: "Your first mod",
                        link: "/create/your-first-mod",
                    },
                    {
                        text: "What's a Fix?",
                        link: "/create/whats-a-fix"
                    }
                ],
            },
        ],

        search: {
            provider: "local",
        },

        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/Bopl-Battle-Modding-Community/docs",
                ariaLabel: "Documentation GitHub repository",
            },
            {
                icon: "discord",
                link: "https://discord.gg/uhtpWwkaUm",
                ariaLabel: "Bopl Battle Community Discord server"
            },
            {
                icon: "steam",
                link: "https://store.steampowered.com/app/1686940/Bopl_Battle/",
                ariaLabel: "Bopl Battle Steam page"
            },
        ],
    },
});
