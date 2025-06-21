<!-- 语法高亮插件示例 -->

<script setup lang="ts">
import { CodeViewer } from 'lib/core'
import { createSyntaxHighlightPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'
import syntaxHighlightCodeRaw from '../code-examples/syntax-highlight-code.txt?raw'

const codeLines: RawCodeLine[] = syntaxHighlightCodeRaw.split('\n').map((line, index) => ({
  id: `line-${index + 1}`,
  content: line
}))
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">语法高亮插件</h3>
      <p class="text-sm text-gray-600">这个示例展示了代码语法高亮功能。</p>
    </div>
    <div class="h-96">
      <CodeViewer :code="codeLines" :plugins="[createSyntaxHighlightPlugin()]" language="javascript" size="medium" />
    </div>
  </div>
</template>
