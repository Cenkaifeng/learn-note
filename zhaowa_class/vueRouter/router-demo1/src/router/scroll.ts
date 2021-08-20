import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const AboutComponent = () =>
    import(/* webpackChunkName: "about" */ "../views/About.vue");

const DynamicComponent = () =>
    import(/* webpackChunkName: "dynamic" */ "../views/Dynamic.vue");

const DetailComponent = () =>
    import(/* webpackChunkName: "detail" */ "../views/Detail.vue");

const ListComponent = () =>
    import(/* webpackChunkName: "list" */ "../views/List.vue");

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: AboutComponent
    },
    {
        path: "/dynamic",
        name: "Dynamic",
        component: DynamicComponent,
        children: [
            {
                path: "",
                component: DynamicComponent
            },
            {
                path: ":id",
                component: DynamicComponent
            },
            {
                path: ":id/:name",
                component: DynamicComponent
            }
        ]
    },
    {
        path: "/detail/:id",
        name: "Detail",
        component: DetailComponent
    },
    {
        path: "/list",
        name: "List",
        component: ListComponent
    },
    {
        path: "*",
        name: "ErrorPage",
        component: () =>
            import(/* webpackChunkName: "errorPage" */ "../views/ErrorPage.vue")
    }
];

// 1. 手动点击浏览器返回或者前进按钮 记住滚动条的位置，基于history，go,back,forward
// 2. router-link，并没有记住滚动条的位置

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: (to, from, savedPosition) => {
        console.log(savedPosition); // 已报错的位置信息
        return savedPosition;
    }
});

export default router;
