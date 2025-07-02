<!-- 语法高亮插件示例 -->

<script setup lang="ts">
import { CodeViewer } from 'lib/core'
import { SyntaxHighlightPlugin } from 'lib/plugin'
import type { RawCodeLine } from 'lib/core/types'
import syntaxHighlightCodeRaw from '../code-examples/syntax-highlight-code.txt?raw'
import typescriptHighlightCodeRaw from '../code-examples/typescript-highlight-code.txt?raw'
import pythonHighlightCodeRaw from '../code-examples/python-highlight-code.txt?raw'

const jsCodeLines: RawCodeLine[] = syntaxHighlightCodeRaw.split('\n').map((line, index) => ({
  id: `js-line-${index + 1}`,
  content: line
}))

const tsCodeLines: RawCodeLine[] = typescriptHighlightCodeRaw.split('\n').map((line, index) => ({
  id: `ts-line-${index + 1}`,
  content: line
}))

const pyCodeLines: RawCodeLine[] = pythonHighlightCodeRaw.split('\n').map((line, index) => ({
  id: `py-line-${index + 1}`,
  content: line
}))
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-800 mb-2">语法高亮插件</h3>
      <p class="text-sm text-gray-600">这个示例展示了代码语法高亮功能。</p>
    </div>

    <!-- JavaScript 示例 -->
    <div class="mb-8">
      <h4 class="text-md font-medium text-gray-700 mb-2">JavaScript</h4>
      <div class="h-96">
        <CodeViewer :code="jsCodeLines" :plugins="[SyntaxHighlightPlugin]" language="javascript" size="medium" />
      </div>
    </div>

    <!-- TypeScript 示例 -->
    <div class="mb-8">
      <h4 class="text-md font-medium text-gray-700 mb-2">TypeScript</h4>
      <div class="h-96">
        <CodeViewer :code="tsCodeLines" :plugins="[SyntaxHighlightPlugin]" language="typescript" size="medium" />
      </div>
    </div>

    <!-- Python 示例 -->
    <div class="mb-8">
      <h4 class="text-md font-medium text-gray-700 mb-2">Python</h4>
      <div class="h-96">
        <CodeViewer :code="pyCodeLines" :plugins="[SyntaxHighlightPlugin]" language="python" size="medium" />
      </div>
    </div>
  </div>
</template>
