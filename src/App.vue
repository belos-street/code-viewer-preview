<script setup lang="ts">
import demo1 from './example/demo1.vue'
import demo2 from './example/demo2.vue'
</script>

<template>


  <div>
    <demo1 />
    <demo2 />
  </div>

  <svg width="38" height="164" viewBox="0 0 38 164" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38 24V164L0.25 140V1L38 24" fill="url(#paint0_linear_2073_34671)" stroke="#3EC390"
      stroke-width="0.506104" />
    <defs>
      <linearGradient id="paint0_linear_2073_34671" x1="37.5488" y1="0.999513" x2="89.2191" y2="118.224"
        gradientUnits="userSpaceOnUse">
        <stop stop-color="#00FF95" stop-opacity="0.01" />
        <stop offset="1" stop-color="#00FF95" stop-opacity="0.552941" />
      </linearGradient>
    </defs>
  </svg>

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
