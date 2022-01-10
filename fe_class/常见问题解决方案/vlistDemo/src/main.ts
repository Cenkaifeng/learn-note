import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { Performance } from './lib/performance';

Vue.config.productionTip = false;

Performance.init();

new Vue({
  router,
  render: (h) => h(App),
  mixins: [Performance.record(router)]
}).$mount('#app');
