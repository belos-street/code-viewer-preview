<!-- 语法高亮插件示例 -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CodeViewer } from 'lib/core'
import { createLineBgColorPlugin, createSyntaxHighlightPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'
import syntaxHighlightCodeRaw from '../code-examples/syntax-highlight-code.txt?raw'

const codeLines = ref<RawCodeLine[]>([])

onMounted(() => {
  // 将代码文本转换为行数据
  codeLines.value = syntaxHighlightCodeRaw.split('\n').map((line, index) => ({
    id: `line-${index + 1}`,
    content: line,
    meta: { bgColor: '#00000010' } // 添加轻微的背景色以增强可读性
  }))
})
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">语法高亮插件</h3>
      <p class="text-sm text-gray-600">这个示例展示了代码语法高亮功能。</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="border border-gray-200 rounded-md overflow-hidden flex flex-col">
        <div class="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <h4 class="text-sm font-medium text-gray-700">语法高亮</h4>
        </div>
        <div class="flex-1 h-96">
          <CodeViewer 
            :code="codeLines" 
            :plugins="[createLineBgColorPlugin(), createSyntaxHighlightPlugin()]" 
            language="javascript" 
            size="medium" 
          />
        </div>
      </div>
      
      <div class="border border-gray-200 rounded-md overflow-hidden flex flex-col">
        <div class="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <h4 class="text-sm font-medium text-gray-700">原始代码（无高亮）</h4>
        </div>
        <div class="flex-1 h-96">
          <CodeViewer 
            :code="codeLines" 
            size="medium" 
          />
        </div>
      </div>
    </div>
  </div>
</template>
