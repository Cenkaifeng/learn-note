<template>
  <button type="button" @click="onChange">onChange</button>
  Lifecycle: {{ state.value }}
</template>

<script>
import { reactive, onMounted, onUpdated } from 'vue'

export default {
  setup(props, context) { // 在组件加载时执行一次
    
    const state = reactive({ value: 1});
    const onChange = () => {
      state.value++
    };
    
    onUpdated(() => {
      console.log('onUpdated', state)
    })
    onMounted(() => {
      console.log('onMounted')
    })
    
    return { state, onChange }
  }
}
</script>
