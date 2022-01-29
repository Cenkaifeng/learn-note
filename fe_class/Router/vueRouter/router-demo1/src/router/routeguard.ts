import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const AboutComponent = () =>
    import(/* webpackChunkName: "about" */ "../views/About.vue");

const DynamicComponent = () =>
    import(/* webpackChunkName: "dynamic" */ "../views/Dynamic.vue");

const TestComponent = () =>
    import(/* webpackChunkName: "test" */ "../views/Test.vue");

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "首页"
        }
    },
    {
        path: "/about",
        name: "About",
        component: AboutComponent,
        meta: {
            title: "关于"
        }
    },
    {
        path: "/dynamic",
        name: "Dynamic",
        component: DynamicComponent,
        meta: {
            title: "动态传参"
        },
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
        path: "/test",
        name: "Test",
        component: TestComponent,
        meta: {
            title: "测试导航守卫"
        },
        children: [
            {
                path: "",
                component: TestComponent
            },
            {
                path: ":id",
                component: TestComponent
            }
        ],
        beforeEnter: (to, from, next) => {
            // 配置数组里针对单个路由的导航守卫
            console.log(
                `TestComponent route config beforeEnter => from=${from.path}, to=${to.path}`
            );
            next();
        }
    },
    {
        path: "*",
        name: "ErrorPage",
        meta: {
            // 路由的自定义元信息
            title: "页面出错了"
        },
        component: () =>
            import(/* webpackChunkName: "errorPage" */ "../views/ErrorPage.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// 全局的导航守卫
router.beforeEach((to, from, next) => {
    console.log(`Router.beforeEach => from=${from.path}, to=${to.path}`);
    document.title = to.meta.title || "默认标题";
    // 执行下一个路由导航
    next();
});

router.afterEach((to, from) => {
    console.log(`Router.afterEach => from=${from.path}, to=${to.path}`);
});

export default router;
