import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";

// import router from "./router";
// import router from "./router/dynamic";
// import router from "./router/routeguard";
import router from "./router/scroll";
// import router from "./router/hash";

Vue.config.productionTip = false;

// 把整个vue实例挂在到#app元素上
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
