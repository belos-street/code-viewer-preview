<!-- 测试 简单组件 -->

<script setup lang="ts">
const codeViewerRef = ref<InstanceType<typeof CodeViewer> | null>(null)

const sampleCode: RawCodeLine[] = [
  { id: '1', content: 'This line has no specific style.' },
  { id: '2', content: 'This line should have a yellow background.', meta: { bgColor: 'yellow' } },
  { id: '3', content: 'This line should have blue text.', meta: { bgColor: 'blue' } },
  {
    id: '4',
    content: 'This line should be bold and have a green background.',
    meta: { backgroundColor: 'green', fontWeight: 'bold' }
  },
  { id: '5', content: 'Another normal line.' }
]

onMounted(() => {
  if (codeViewerRef.value) {
    codeViewerRef.value.registerPlugin(LineBgColorPlugin)
  }
})
import { ref, onMounted } from 'vue'
import { CodeViewer, type RawCodeLine } from 'lib/index'
import { LineBgColorPlugin } from 'lib/plugin'
</script>

<template>
  <div class="container">
    <h1>Simple Code Demo</h1>
    <CodeViewer ref="codeViewerRef" :code="sampleCode" />
  </div>
</template>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 200px;
}
</style>
