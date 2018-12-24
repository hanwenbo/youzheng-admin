export default [
    // user
    {
        path: "/login",
        component: "../layouts/userLayout",
        routes: [
            { path: "/login", component: "/user/login" }
        ]
    },
    // app
    {
        path: "/",
        component: "../layouts/basicLayout",
        routes: [
            // dashboard
            { path: "/", redirect: "/dashboard/analysis" },
            {
                path: "/dashboard/analysis",
                name: "概况",
                component: "./dashboard/analysis"
            },
            {
                path: "/order",
                name: "订单",
                routes: [
                    { path: "/order", redirect: "/order/list" },
                    { path: "/order/list", name: "订单管理", component: "/order/list" },
                    { path: "/order/list/detail", component: "/order/detail" },
                ]
            },
        ]
    }
];
