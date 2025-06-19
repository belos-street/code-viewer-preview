<!-- 虚拟滚动示例 -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CodeViewer, createLineBgColorPlugin, type RawCodeLine } from 'lib/index'
import virtualScrollCodeRaw from '../code-examples/virtual-scroll-code.txt?raw'

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

const codeLines = ref<RawCodeLine[]>([])
const showSampleCode = ref(true)

onMounted(() => {
  // 首先显示示例代码
  codeLines.value = virtualScrollCodeRaw.split('\n').map((line, index) => ({
    id: `line${index + 1}`,
    content: line
  }))
})

const toggleCodeView = () => {
  if (showSampleCode.value) {
    // 切换到大量生成的代码
    codeLines.value = generateLargeCode(1000)
  } else {
    // 切换回示例代码
    codeLines.value = virtualScrollCodeRaw.split('\n').map((line, index) => ({
      id: `line${index + 1}`,
      content: line
    }))
  }
  showSampleCode.value = !showSampleCode.value
}
</script>

<template>
  <div class="p-4">
    <div class="mb-4 flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-800 mb-2">虚拟滚动</h3>
        <p class="text-sm text-gray-600">这个示例展示了处理大量代码行时的虚拟滚动功能。</p>
      </div>
      <button
        @click="toggleCodeView"
        class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
      >
        {{ showSampleCode ? '生成1000行代码' : '显示示例代码' }}
      </button>
    </div>

    <div class="h-96 border border-gray-200 rounded-md overflow-hidden">
      <CodeViewer :code="codeLines" :plugins="[createLineBgColorPlugin()]" />
    </div>
  </div>
</template>
