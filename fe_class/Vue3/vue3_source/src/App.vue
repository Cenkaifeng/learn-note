<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" hello="hello" />
  <!-- <Async />
  <async-component></async-component> -->
  <teleport to="body">
    <!-- <input v-focus v-if="show" /> -->
  </teleport>
  <button type="button" @click="show=!show">移除input</button>
  <!-- <input v-focus /> -->
    <!-- <Functional v-bind="item" id="id" /> -->
    <Compose />
    <Inject />
    <Lifecycle />
    <Hook value="props" />
</template>

<script>
  // https://vue3js.cn/docs/zh/guide/migration/key-attribute.html
import { defineAsyncComponent, readonly } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const Async = defineAsyncComponent(() =>
  import('./components/Async.vue')
)
import Functional from './components/Functional'
import Compose from './components/Compose.vue'
import Inject from './components/Inject.vue'
import Lifecycle from './components/Lifecycle.vue'
import Hook from './components/Hook.vue'

export default {
  name: 'App',
  data() {
    return {
      show: false,
      item: {id: 5},
      list: Array(10).fill(0).map((_, index) => ({ id: index + 1 }))
    }
  },
  provide: {
    state: readonly({ name: '厂里'}),
    onChange() {
      
    }
  },
  components: {
    HelloWorld, Async, Functional, Compose, Inject, Lifecycle, Hook
  }
}
</script>