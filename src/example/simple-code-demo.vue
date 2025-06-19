<!-- 简单代码示例 -->

<script setup lang="ts">
import { CodeViewer, type RawCodeLine } from 'lib/index'
import simpleCodeRaw from '../code-examples/simple-code.txt?raw'

const codeLines: RawCodeLine[] = simpleCodeRaw.split('\n').map((line, index) => ({
  id: `line${index + 1}`,
  content: line
}))
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">简单代码渲染</h3>
      <p class="text-sm text-gray-600">这个示例展示了基本的代码渲染功能，没有使用任何插件。</p>
    </div>

    <div class="h-80 border border-gray-200 rounded-md overflow-hidden">
      <CodeViewer :code="codeLines" />
    </div>
  </div>
</template>
