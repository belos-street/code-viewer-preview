<!-- 测试 简单组件 -->

<script setup lang="ts">
const codeViewerRef = ref<InstanceType<typeof CodeViewer> | null>(null)

const sampleCode: CodeList = [
  { id: '1', index: 1, content: 'This line has no specific style.' },
  { id: '2', index: 2, content: 'This line should have a yellow background.', meta: { backgroundColor: 'yellow' } },
  { id: '3', index: 3, content: 'This line should have blue text.', meta: { color: 'blue' } },
  {
    id: '4',
    index: 4,
    content: 'This line should be bold and have a green background.',
    meta: { backgroundColor: 'green', fontWeight: 'bold' }
  },
  { id: '5', index: 5, content: 'Another normal line.' }
]

onMounted(() => {
  if (codeViewerRef.value) {
    codeViewerRef.value.registerPlugin(new LineStylerPlugin())
  }
})
import { ref, onMounted } from 'vue'
import { CodeViewer, type CodeList } from 'lib/index'
import { LineStylerPlugin } from 'lib/plugin/line-styler-plugin'
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
}
</style>
