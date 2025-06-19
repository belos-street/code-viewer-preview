<!-- 行号插件示例 -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CodeViewer } from 'lib/core'
import { createLineNumberPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'
import lineNumberCodeRaw from '../code-examples/line-number-code.txt?raw'

const codeLines = ref<RawCodeLine[]>([])

onMounted(() => {
  // 将代码文本转换为行数据
  codeLines.value = lineNumberCodeRaw.split('\n').map((line, index) => ({
    id: `line-${index + 1}`,
    content: line
  }))
})
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">行号插件</h3>
      <p class="text-sm text-gray-600">这个示例展示了代码行号功能。</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="border border-gray-200 rounded-md overflow-hidden flex flex-col">
        <div class="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <h4 class="text-sm font-medium text-gray-700">带行号</h4>
        </div>
        <div class="flex-1 h-96">
          <CodeViewer 
            :code="codeLines" 
            :plugins="[createLineNumberPlugin()]" 
            language="javascript" 
            size="medium" 
          />
        </div>
      </div>
      
      <div class="border border-gray-200 rounded-md overflow-hidden flex flex-col">
        <div class="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <h4 class="text-sm font-medium text-gray-700">无行号</h4>
        </div>
        <div class="flex-1 h-96">
          <CodeViewer 
            :code="codeLines" 
            language="javascript"
            size="medium" 
          />
        </div>
      </div>
    </div>
  </div>
</template>
