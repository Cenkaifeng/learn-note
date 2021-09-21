<template>
  <div id="">
   hook 参数id:   {{id}}
   props.value: {{props.value}}
   loading {{loading ? '下载中': '已完成'}}
  <div v-for="{ name } in info">
    {{ name }}
  </div>
  </div>
  <button type="button" @click="onNext">onNext</button>
  
  <div v-for="{ name } in info2">
    {{ name }}
  </div>
  </div>
  <button type="button" @click="onNext2">onNext</button>
</template>


<script setup>
import { ref,  } from 'vue'
import useUserInfo from './hooks'
// https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E4%BD%BF%E7%94%A8%E7%BB%84%E4%BB%B6
const props = defineProps({
  value: String
})

// defineEmits
const id = ref(1)
const id2 = ref(1)
const { info, loading } = useUserInfo(id)
const { info: info2 } = useUserInfo(id2)

const onNext = () => {
  id.value++
}
const onNext2 = () => {
  id2.value++
}
</script>

<!-- 
createData

{
  mounted() {
    
  },
  data() {
    return {
      
    }
  }
}


mixins: [createData] -->