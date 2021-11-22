<template>
  <button @click="increment">增加</button>
  <!-- <button @click="increment2">增加2</button> -->
  Compose: {{data.value}}
  dataRef: {{dataRef}}
  total{{total}}
</template>

<script type="text/javascript">
import { reactive, watch, watchEffect, ref, computed } from 'vue'

export default {
  setup(props, context) {
    const data = reactive({ value: 0, count: 0, /* data: { a: 1 } */ })
    const dataRef = ref(0)
    // const data2 = reactive({ value: 0 })
    const increment = () => {
      // data.value++
      dataRef.value++
    }
    /* const increment2 = () => {
      data2.value++
    } */
   /* watch(// 第一个参数为函数，以返回值的变化作为副作用执行的条件；
      () => data.value > 2,
      exceeded => {console.log('超过了2')
        if (exceeded) {
          // console.log('超过了2')
        }
      }
    );
    
    watch(// 第一个参数为函数，以返回值的变化作为副作用执行的条件；
    // 副作用的参数就是该返回值
      () => data.value,
      (value, prev) => {
        console.log('changed', value, prev)
      }
    ); */
    
    /* watch(// 第一个参数为响应式对象，以对象属性变化作为副作用执行的条件；
    // 副作用的参数就是该响应式对象
      data,
      (value) => {
        console.log('watch', value)
      },
      // { immediate: true }
    ); */
    
    const total = computed(() => dataRef.value ** 2);
    
    
    /* watchEffect(() => { // 内部的响应式对象有变化，就会执行
      console.log('watchEffect', data, data2.value)
    })
    */
    return { data, increment,/* data2, increment2 */ dataRef,/* 
    props: dataRef.value */
     total
     
     }
  }
}
</script>