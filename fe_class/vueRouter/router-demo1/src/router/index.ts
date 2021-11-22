import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue"; // vue页面

// 通过use方法，引入vueRouter插件，进而使用vueRouter
Vue.use(VueRouter);

// 路由匹配的顺序是由上而下
const routes: Array<RouteConfig> = [
    {
        path: "/", // 路径
        name: "Home", // 名称
        component: Home // 路径对应的组件/页面
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: "*", // 这个路由可以匹配所有的路径 /list
        name: "ErrorPage",
        component: () =>
            import(/* webpackChunkName: "errorPage" */ "../views/ErrorPage.vue")
    }
];

// 新建一个router实例
const router = new VueRouter({
    mode: "history", // hash，选择模式，history/hash
    base: process.env.BASE_URL,
    routes // 传入配置文件
});

export default router;
