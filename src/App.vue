<script setup lang="ts">
import demo1 from './example/demo1.vue'
import demo2 from './example/demo2.vue'
import demo3 from './example/demo3.vue'
//import demo4 from './example/demo4.vue'
</script>

<template>
  <div id="main-container">
    <demo1 />
    <demo2 />
    <demo3 />
    <!-- <demo4 /> -->
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
