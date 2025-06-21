<!-- 行号插件示例 -->

<script setup lang="ts">
import { CodeViewer } from 'lib/core'
import { createLineNumberPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'
import lineNumberCodeRaw from '../code-examples/line-number-code.txt?raw'

const codeLines: RawCodeLine[] = lineNumberCodeRaw.split('\n').map((line, index) => ({
  id: `line-${index + 1}`,
  content: line
}))
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">行号插件</h3>
      <p class="text-sm text-gray-600">这个示例展示了代码行号功能。</p>
    </div>

    <div class="h-96">
      <CodeViewer :code="codeLines" :plugins="[createLineNumberPlugin()]" language="javascript" size="medium" />
    </div>
  </div>
</template>
