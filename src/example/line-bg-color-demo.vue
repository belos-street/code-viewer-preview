<!-- 行背景色插件示例 -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CodeViewer, createLineBgColorPlugin, type RawCodeLine } from 'lib/index'
import lineBgColorCodeRaw from '../code-examples/line-bg-color-code.txt?raw'

const codeLines = ref<RawCodeLine[]>([])

onMounted(() => {
  // 将代码文本转换为行数据，并添加背景色元数据
  const lines = lineBgColorCodeRaw.split('\n')
  codeLines.value = [
    { id: '1', content: lines[0] || 'This line has no specific style.' },
    { id: '2', content: lines[1] || 'This line should have a red background.', meta: { bgColor: 'red' } },
    { id: '3', content: lines[2] || 'This line should have blue text.', meta: { bgColor: 'blue' } },
    { id: '4', content: lines[3] || 'This line should be have a green background.', meta: { bgColor: 'green' } },
    { id: '5', content: lines[4] || 'Another normal line.' }
  ]
})
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">行背景色插件</h3>
      <p class="text-sm text-gray-600">这个示例展示了如何使用行背景色插件为不同的代码行设置不同的背景颜色。</p>
    </div>

    <div class="h-60 border border-gray-200 rounded-md overflow-hidden">
      <CodeViewer :code="codeLines" :plugins="[createLineBgColorPlugin()]" />
    </div>
  </div>
</template>
