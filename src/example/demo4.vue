<script setup lang="ts">
import { CodeViewer, createLineBgColorPlugin, type RawCodeLine } from 'lib/index'

const sampleCode: RawCodeLine[] = [
  { id: '1', content: 'This line has no specific style.' },
  { id: '2', content: 'This line should have a red background.', meta: { bgColor: 'red' } },
  { id: '3', content: 'This line should have blue text.', meta: { bgColor: 'blue' } },
  {
    id: '4',
    content: 'This line should be have a green background.',
    meta: { bgColor: 'green' }
  },
  { id: '5', content: 'Another normal line.' }
]
</script>

<template>
  <div class="container">
    <h1>Plugin Test</h1>
    <CodeViewer :code="sampleCode" :plugins="[createLineBgColorPlugin()]" />
  </div>
</template>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 200px;
}
</style>
