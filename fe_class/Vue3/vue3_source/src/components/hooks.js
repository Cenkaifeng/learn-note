import { ref, onMounted, watch } from 'vue'

const fetch = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(
      Array(10).fill(0).map((_, index) => ({name: 'user-' + Math.random(), id}))
    );
  }, 2000)
})

export default function useUserInfo(id) { // id 为响应式数据源
  const info = ref({})
  const loading = ref(false)
  const getUserInfo = () => {
    loading.value = true
    fetch(id.value).then(user => {
      info.value = user
      loading.value = false
    })
  }
  onMounted(getUserInfo)
  watch(() => id.value, getUserInfo);
  return { info, loading }
}
