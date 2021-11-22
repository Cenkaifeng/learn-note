<template>
  <div class="">
    Inject： state
  </div>
  
</template>

<script>
import { inject } from 'vue'
export default {
  setup(props, context) {
    const state = inject('state');
    const onChange = inject('onChange');
    
    
    
    return { state, onChange }
  }
}
</script>
