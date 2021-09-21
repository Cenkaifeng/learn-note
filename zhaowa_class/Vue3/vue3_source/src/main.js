import { createApp, defineAsyncComponent } from 'vue'

import App from './App.vue'
import './index.css'

/* const Async = defineAsyncComponent(() =>
  import('./components/Async.vue')
) */

const app = createApp(App)

// app.component('async-component', Async)

app.directive('focus', {
  beforeMount(el, binding, vnode, prevVnode) {
    console.log(binding.instance)
  },
  mounted(el) {
    el.focus()
  },
  unmounted() {
    alert('我被卸载了')
  }
})

app.mount('#app')
