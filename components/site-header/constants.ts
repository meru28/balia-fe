export const menus = [
    {
        title: "Elements",
        href: "#elements",
    },
    {
        title: "Why Dash Tail",
        href: "#whyDashTail",
    },
    {
        title: "Pricing",
        href: "#pricing",
    },
    {
        title: "More",
        child: [
            {
                title: "Documentation",
                href: "/docs/introduction",
            },
            {
                title: "Changelog",
                href: "/docs/update-log",
            },
            {
                title: "Github Access",
                href: "https://codeshaperbd.freshdesk.com/support/login",
            },
            {
                title: "Report a bug",
                href: "https://codeshaperbd.freshdesk.com/support/login",
            },
            {
                title: "Support",
                href: "https://codeshaperbd.freshdesk.com/support/login",
            },
            {
                title: "Hire Us",
                href: "https://codeshaper.net/",
            },
        ],
    },
];
export type Menu = typeof menus[number];
