<!-- 虚拟滚动示例 -->

<script setup lang="ts">
import { CodeViewer, type RawCodeLine } from 'lib/index'

// 生成大量代码行以测试虚拟滚动
const generateLargeCode = (count: number): RawCodeLine[] => {
  const code: RawCodeLine[] = []
  for (let i = 1; i <= count; i++) {
    code.push({
      id: `line${i}`,
      content: `const line${i} = "This is line ${i}";`
    })
  }
  return code
}

const codeLines: RawCodeLine[] = generateLargeCode(10000)
</script>

<template>
  <div class="p-4">
    <div class="mb-4 flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-800 mb-2">虚拟滚动</h3>
        <p class="text-sm text-gray-600">这个示例展示了处理大量代码行时的虚拟滚动功能。</p>
      </div>
    </div>

    <div class="h-96 border border-gray-200">
      <CodeViewer :code="codeLines" />
    </div>
  </div>
</template>
