## VueRouter
1. 【组件】前一个组件的beforeRouterLeave
2. 【全局】beforeEach
3. 【组件】如果有路由参数的变化， /test => /test/1 , 触发 beforeRouteUpdate
4. 【配置文件】 下一个组件的 beforeEnter
5. 【组件】 beforeEnter
6. 【全局】 afterEach