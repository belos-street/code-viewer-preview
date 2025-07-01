<!-- 行背景色插件示例 -->

<script setup lang="ts">
import { CodeViewer, LineBgColorPlugin, type RawCodeLine } from 'lib/index'

const codeLines: RawCodeLine[] = [
  { id: '1', content: 'This line has no specific style.' },
  { id: '2', content: 'This line should have a red background.', meta: { bgColor: 'red' } },
  { id: '3', content: 'This line should have blue text.', meta: { bgColor: 'blue' } },
  { id: '4', content: 'This line should be have a green background.', meta: { bgColor: 'green' } },
  { id: '5', content: 'Another normal line.' }
]
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">行背景色插件</h3>
      <p class="text-sm text-gray-600">这个示例展示了如何使用行背景色插件为不同的代码行设置不同的背景颜色。</p>
    </div>

    <div class="h-60 border border-gray-200">
      <CodeViewer :code="codeLines" :plugins="[LineBgColorPlugin]" />
    </div>
  </div>
</template>
