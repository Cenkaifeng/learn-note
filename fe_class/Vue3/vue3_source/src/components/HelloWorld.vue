<template>
  <!-- <div class=""> -->
    <h1>{{ msg }}</h1>
    <button v-bind="$attrs" @click="count++">count is: {{ count }}</button>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'HelloWorld',
  // functional: true,
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
