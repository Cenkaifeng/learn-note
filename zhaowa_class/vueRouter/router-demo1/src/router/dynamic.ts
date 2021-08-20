import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// 由于有的页面在多个路由中使用,所以单独提出来一个变量，方便复用
const AboutComponent = () =>
    import(/* webpackChunkName: "about" */ "../views/About.vue");

const DynamicComponent = () =>
    import(/* webpackChunkName: "dynamic" */ "../views/Dynamic.vue");

export enum RouteNames {
    About = "about",
    Home = "home"
}

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: RouteNames.Home,
        component: Home
    },
    {
        path: "/about",
        name: RouteNames.About,
        component: AboutComponent
    },
    {
        path: "/dynamic", // /dynamic/1
        name: "Dynamic",
        component: DynamicComponent,
        children: [
            {
                path: "",
                component: DynamicComponent
            },
            {
                path: ":id", // 动态匹配参数
                component: DynamicComponent
            },
            {
                path: ":id/:name", // 动态匹配两个参数 /1/qiuku
                component: DynamicComponent
            }
        ]
    },
    {
        path: "*",
        name: "ErrorPage",
        component: () =>
            import(/* webpackChunkName: "errorPage" */ "../views/ErrorPage.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
