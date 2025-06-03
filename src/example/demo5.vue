<template>
  <div class="demo-container">
    <h2>ScrollToLine 功能演示</h2>
    <p>这个演示展示了如何使用 scrollToLine 方法滚动到指定的代码行</p>

    <div class="controls">
      <div class="control-group">
        <label for="lineInput">跳转到行号:</label>
        <input id="lineInput" v-model.number="targetLine" type="number" min="1" :max="codeLines.length" placeholder="输入行号" />
        <button @click="scrollToTargetLine" :disabled="!isValidLine">跳转</button>
      </div>

      <div class="quick-actions">
        <button @click="scrollToLine(1)">跳转到第1行</button>
        <button @click="scrollToLine(50)">跳转到第50行</button>
        <button @click="scrollToLine(100)">跳转到第100行</button>
        <button @click="scrollToLine(codeLines.length)">跳转到最后一行</button>
      </div>
    </div>

    <div class="code-container">
      <CodeViewer ref="codeViewerRef" :code="codeLines" :plugins="plugins" size="medium" language="javascript" />
    </div>

    <div class="info">
      <p>总行数: {{ codeLines.length }}</p>
      <p>当前输入: {{ targetLine }}</p>
      <p>有效范围: 1 - {{ codeLines.length }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CodeViewer } from 'lib/core'
import { createLineBgColorPlugin } from 'lib/plugin/line-bg-color'
import type { RawCodeLine } from 'lib/core/types'

// 生成测试代码行
const generateCodeLines = (count: number): RawCodeLine[] => {
  const lines: RawCodeLine[] = []

  for (let i = 1; i <= count; i++) {
    const line: RawCodeLine = {
      id: `line-${i}`,
      content: `// 第 ${i} 行 - function example${i}() { console.log('这是第${i}行代码'); return ${i}; }`,
      meta: {
        // 每10行设置一个背景色，方便识别
        bgColor: i % 10 === 0 ? '#fff3cd' : i % 25 === 0 ? '#d1ecf1' : i % 50 === 0 ? '#d4edda' : undefined
      }
    }
    lines.push(line)
  }

  return lines
}

const codeLines = ref<RawCodeLine[]>(generateCodeLines(200))
const plugins = ref([createLineBgColorPlugin()])
const codeViewerRef = ref<InstanceType<typeof CodeViewer> | null>(null)
const targetLine = ref<number>(1)

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
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.control-group label {
  font-weight: 500;
  min-width: 100px;
}

.control-group input {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 120px;
}

.control-group button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.control-group button:hover:not(:disabled) {
  background: #0056b3;
}

.control-group button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.quick-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.quick-actions button {
  padding: 6px 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.quick-actions button:hover {
  background: #1e7e34;
}

.code-container {
  height: 500px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.info {
  padding: 15px;
  background: #e9ecef;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.info p {
  margin: 5px 0;
  font-size: 14px;
  color: #495057;
}

h2 {
  color: #495057;
  margin-bottom: 10px;
}

p {
  color: #6c757d;
  margin-bottom: 20px;
}
</style>
