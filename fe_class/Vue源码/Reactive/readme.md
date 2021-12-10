# 深入理解响应式设计

---

[svelte](https://github.com/sveltejs/svelte);



```html
<script>
  let count = 1;
  function handleIncrease() {
    count ++
  }

  $: doubleCount = count * 2;
</script>

<div>{count}</div>
<div>{doubleCount}</div>
<button on:click={handleIncrease}>+</button>
```