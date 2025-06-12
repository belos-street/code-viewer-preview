<script setup lang="ts">
import demo2 from './example/demo2.vue'
import demo3 from './example/demo3.vue'
import demo4 from './example/demo4.vue'
import demo5 from './example/demo5.vue'
import demoSyntax from './example/demo-syntax.vue'
import demoLineNumber from './example/demo-line-number.vue'
</script>

<template>
  <div id="main-container">
    <demo2 />
    <demo3 />
    <demo4 />
    <demo5 />
    <demoSyntax />
    <demoLineNumber />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  display: flex;
}

#main-container {
  width: 100%;
  height: 100%;
  padding: 0 50px;
}
</style>
