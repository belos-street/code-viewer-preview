<script setup lang="ts">
import demo1 from './example/demo1.vue'
import demo2 from './example/demo2.vue'
import demo3 from './example/demo3.vue'
</script>

<template>


  <div>
    <demo1 />
    <demo2 />
    <demo3 />
  </div>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
