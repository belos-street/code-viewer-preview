<!-- 滚动到指定行示例 -->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CodeViewer } from 'lib/core'
import type { RawCodeLine } from 'lib/core/types'
import scrollToLineCodeRaw from '../code-examples/scroll-to-line-code.txt?raw'

// 生成测试代码行
const generateCodeLines = (count: number): RawCodeLine[] => {
  const lines: RawCodeLine[] = []

  for (let i = 1; i <= count; i++) {
    const line: RawCodeLine = {
      id: `line-${i}`,
      content: `// 第 ${i} 行 - function example${i}() { console.log('这是第${i}行代码'); return ${i}; }`
    }
    lines.push(line)
  }

  return lines
}

const codeLines = ref<RawCodeLine[]>([])
const codeViewerRef = ref<InstanceType<typeof CodeViewer> | null>(null)
const targetLine = ref<number>(1)
const useRawCode = ref(true)

onMounted(() => {
  // 首先加载示例代码
  if (useRawCode.value) {
    codeLines.value = scrollToLineCodeRaw.split('\n').map((line, index) => ({
      id: `line-${index + 1}`,
      content: line
    }))
  } else {
    codeLines.value = generateCodeLines(200)
  }
})

// 检查输入的行号是否有效
const isValidLine = computed(() => {
  return targetLine.value >= 1 && targetLine.value <= codeLines.value.length
})

// 滚动到目标行
const scrollToTargetLine = () => {
  if (isValidLine.value && codeViewerRef.value) {
    codeViewerRef.value.scrollToLine(targetLine.value)
  }
}

// 直接滚动到指定行的便捷方法
const scrollToLine = (lineNumber: number) => {
  if (codeViewerRef.value) {
    codeViewerRef.value.scrollToLine(lineNumber)
    targetLine.value = lineNumber
  }
}

// 切换代码生成方式
const toggleCodeGeneration = () => {
  useRawCode.value = !useRawCode.value
  if (useRawCode.value) {
    codeLines.value = scrollToLineCodeRaw.split('\n').map((line, index) => ({
      id: `line-${index + 1}`,
      content: line
    }))
  } else {
    codeLines.value = generateCodeLines(200)
  }
}
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-medium text-gray-800">滚动到指定行</h3>
        <button
          @click="toggleCodeGeneration"
          class="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs transition-colors"
        >
          {{ useRawCode ? '使用生成代码' : '使用示例代码' }}
        </button>
      </div>
      <p class="text-sm text-gray-600 mb-4">这个示例展示了如何使用 scrollToLine 方法滚动到指定的代码行。</p>

      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <div class="flex flex-wrap items-center gap-3 mb-4">
          <div class="flex items-center">
            <label for="lineInput" class="text-sm font-medium text-gray-700 mr-2">跳转到行号:</label>
            <input
              id="lineInput"
              v-model.number="targetLine"
              type="number"
              min="1"
              :max="codeLines.length"
              placeholder="输入行号"
              class="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
          <button
            @click="scrollToTargetLine"
            :disabled="!isValidLine"
            class="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded text-sm transition-colors"
          >
            跳转
          </button>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            @click="scrollToLine(1)"
            class="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs transition-colors"
          >
            跳转到第1行
          </button>
          <button
            @click="scrollToLine(Math.floor(codeLines.length / 4))"
            class="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs transition-colors"
          >
            跳转到1/4处
          </button>
          <button
            @click="scrollToLine(Math.floor(codeLines.length / 2))"
            class="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs transition-colors"
          >
            跳转到中间
          </button>
          <button
            @click="scrollToLine(Math.floor((codeLines.length * 3) / 4))"
            class="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs transition-colors"
          >
            跳转到3/4处
          </button>
          <button
            @click="scrollToLine(codeLines.length)"
            class="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs transition-colors"
          >
            跳转到最后一行
          </button>
        </div>
      </div>
    </div>

    <div class="h-96 border border-gray-200 rounded-md overflow-hidden">
      <CodeViewer ref="codeViewerRef" :code="codeLines" language="javascript" />
    </div>

    <div class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
      <p>总行数: {{ codeLines.length }}</p>
      <p>当前输入: {{ targetLine }}</p>
      <p>有效范围: 1 - {{ codeLines.length }}</p>
    </div>
  </div>
</template>
